# Pre-flight Checks and Validation Utilities

Pre-flight checks validate configuration and the runtime environment during Zowe startup,
before components are launched. They cover certificates, runtime dependencies, component
manifests, ports, AT-TLS policies, user identity, and z/OSMF connectivity.

This document describes the checks performed during startup and the utilities available
for manual validation. Several checks also have standalone `zwe validate` commands, and
lower-level tools are packaged in `<zowe.runtimeDirectory>/bin/utils`.

## How pre-flight checks work

The startup preparation phase (`zwe internal start prepare`) loads the configuration,
validates it, prepares directories and environment variables, and runs component validation
and configuration scripts. It can stop startup when a required check fails.

### Check lifecycle

The following shows the main sequence for a non-container startup. Configuration loading
and dependency helpers can perform additional validation before these phases complete.

```text
Load and validate core Zowe YAML
  |
  +-- Check current process UID [user]
  +-- Validate certificates [certificate]
  +-- Prepare log and workspace directories and environment
  +-- Global validations
  |     +-- Workspace writability
  |     +-- Enabled component directories/manifests [components]
  |     +-- Node.js for app-server [nodeMin, nodeMax]
  |     +-- Java for API Mediation Layer components [javaMin, javaMax]
  |     +-- z/OSMF availability [zosmf]
  |           +-- z/OSMF JWT support, when applicable [zosmfjwt]
  +-- Component validations
  |     +-- Port bind checks [ports]
  |     +-- Inbound AT-TLS policy checks [attls]
  |     +-- Component configuration schemas (schemas.configs)
  |     +-- Component commands.validate scripts
  +-- Component commands.configure scripts
```

In container mode, the global Java/Node checks and the component-validation phase are
skipped. Other preparation and global validations still run.

### Controlling check behavior

Named checks use `zowe.launchScript.startupChecks`:

| Value | Intended behavior for the named check |
|---|---|
| `exit` | Run the check and stop startup on failure. |
| `warn` | Report check failures and allow startup to continue. Some diagnostics still use error-level logging. |
| `disabled` | Skip the named check in the startup flow. See dependency caveats below. |

The effective action is resolved in this order:

1. The individual check's configured value.
2. `zowe.launchScript.startupChecks.default`.
3. The check's built-in action shown in the next section.

For example:

```yaml
zowe:
  launchScript:
    startupChecks:
      default: exit
      ports: warn
      certificate: warn
      zosmfjwt: disabled
```

Here, all unspecified named checks use `exit`, including those whose built-in action is
`warn`. To retain the built-in behavior of unspecified checks, omit `default`.
The startup log prints the effective actions and their origins.

These controls do not bypass core YAML/schema errors, log/workspace permission errors,
component schema errors, or failures returned by component `commands.validate` scripts.
Some helpers also have fatal prerequisites: for example, certificate validation requires
Java, `zowe.certificate`, and `zowe.externalDomains`, even in `certificate: warn` mode.

## Built-in Zowe startup checks

Defaults below apply when neither the individual check nor `startupChecks.default` is set.
Checks run only when their applicability conditions are met.

| Check | YAML key | Built-in action | What it checks / when it runs | Manual command |
|---|---|---|---|---|
| User identity | `user` | `exit` | Detects whether the current process has UID 0, using `id -u`. | No dedicated command |
| Component manifests | `components` | `warn` | Checks enabled components for an installed directory and a manifest path. | `zwe validate components` |
| Java minimum | `javaMin` | `exit` | Minimum major version 17 for enabled `apiml`, `gateway`, `discovery`, `zaas`, `api-catalog`, or `caching-service`. | `zwe validate dependencies java` |
| Java maximum | `javaMax` | `warn` | Maximum major version 21 for the same components. | `zwe validate dependencies java` |
| Node.js minimum | `nodeMin` | `exit` | Minimum major version 18 when `app-server` is enabled. | `zwe validate dependencies node` |
| Node.js maximum | `nodeMax` | `warn` | Maximum major version 24 when `app-server` is enabled. | `zwe validate dependencies node` |
| z/OSMF availability | `zosmf` | `exit` | Probes `/zosmf/info` when host/port are configured and discovery or apiml is enabled. | No dedicated command |
| z/OSMF JWT support | `zosmfjwt` | `warn` | Uses the analyser's JWT mode under the additional conditions below. | `zwe validate zosmf jwt` |
| Port availability | `ports` | `exit` | Attempts to bind configured component ports with the component jobname. | `zwe validate port bind` |
| Certificates | `certificate` | `warn` | Checks configured keystore/truststore, certificate properties, and external domains. | `zwe validate certificate` |
| AT-TLS policies | `attls` | `warn` | Compares inbound policy detection with the configured server AT-TLS setting. | No dedicated `zwe validate` command; uses `attls-test` |

Although the configuration schema describes the `zosmfjwt` default as `exit`, its effective
built-in action is `warn`, as shown in the table above.

Log directory writability (when configured) and workspace definition/writability are also
checked and can stop startup. They have no `startupChecks` key. Running as `IZUSVR` produces
an additional warning independently of the UID 0 check.

### Java and Node.js checks

In addition to enforcing the version limits above, the checks verify that the configured
runtime exists and can execute. Node.js additionally runs a short script and explicitly
rejects version `v18.12.1`.

`warn` relaxes version-bound failures; it does not make a missing or unusable runtime valid.
Both minimum and maximum checks must be disabled to skip that runtime's global validation.
If only one is disabled, the shared validator can still report the disabled bound as a
nonfatal diagnostic. Other checks, including certificate checks and component scripts, can
still require Java or Node.js even when these global checks are disabled.

### z/OSMF availability and JWT support

The availability check runs when:

- `zOSMF.host` and `zOSMF.port` are set.
- `discovery` or `apiml` is enabled.
- `startupChecks.zosmf` is not `disabled`.

It uses the bundled `curl` to request `/zosmf/info`, with a ten-second timeout, and accepts
HTTP 200 or 401. It passes `-k`, so this probe does not validate the server certificate.
The jobname is the configured prefix (default `ZWE1`) plus `AG`, or `AZ` when `zaas` is
enabled and `apiml` is not. HTTPS is the default; startup uses HTTP when
apiml/gateway is enabled and client AT-TLS is active. `ZOSMF_SCHEME`, then
`ZWE_zOSMF_scheme`, can override that selection.

The JWT startup check runs as part of the availability check. Disabling `zosmf`
therefore also prevents the startup JWT check, even if `zosmfjwt` is enabled. In addition:

- `startupChecks.zosmfjwt` must not be `disabled`.
- `components.gateway.apiml.security.auth.provider` must be `zosmf` (case-insensitive).
  Other providers cause the JWT check to return successfully without probing.
- If `components.gateway.apiml.security.auth.zosmf.jwtAutoconfiguration` is `ltpa`, a failed
  JWT probe is reported as a warning and treated as success. Other values use the selected
  JWT check action.

The JWT command invokes `certificate-analyser.jar --zosmf-jwt-check`, passing the z/OSMF
host/port, verification mode, and truststore settings. Unlike the availability probe, the
JWT command does not set the component jobname or pass a scheme override.

When a gateway uses z/OSMF authentication with discovery and apiml both disabled, the
availability check reports a fatal validation error if host/port are set and `zosmf` is
not disabled; this configuration error is not downgraded by `zosmf: warn`.

### Port availability and AT-TLS checks

The bind check uses the first component-specific `zowe.network.server.listenAddresses`
entry, otherwise the first global entry, otherwise `0.0.0.0`. It sets `_BPX_JOBNAME` for
the component and invokes `bind-test`. Components without a port are skipped. With the
APIML modulith enabled, the bind check handles gateway/discovery specially, using
`components.apiml.port` for gateway when set and skipping other individual APIML services.
It does not probe every possible auxiliary port or every listen address.

The AT-TLS check uses `attls-test --direction 1` (inbound) for enabled components with
ports. Component server AT-TLS settings override the global setting. It reports both
missing policies when AT-TLS is requested and detected policies when it is not requested.
It handles APIML gateway/discovery ports and the caching service's Infinispan JGroups and
key-exchange ports specially.

## Component startup checks

### Configuration schemas and validation scripts

Component schema validation and script execution are separate steps. A manifest can declare
both:

```yaml
schemas:
  configs: schemas/component-schema.json
commands:
  validate: bin/validate.sh
```

Startup first validates the component configuration against `schemas.configs`, then runs
its `commands.validate` script if present. Schema failure or a script's nonzero return code
contributes to a fatal component-validation result. These failures are not governed by
`startupChecks.components`; that setting only controls the directory/manifest check.

When `zowe.configmgr.validation` is `COMPONENT-COMPAT` (the fallback), a missing
`schemas.configs` declaration produces a diagnostic and skips that component's schema
validation. Other validation modes reject the missing declaration.

When `apiml` is enabled, startup skips individual validation/configuration of `gateway`,
`discovery`, `api-catalog`, `caching-service`, and `zaas` during these startup phases.

`zwe validate config --components` runs component **schema validation only**. It does not
execute `commands.validate` or `commands.configure` scripts. Configuration scripts run in
a later startup phase; their failure handling is controlled separately by
`zowe.launchScript.onComponentConfigureFail`.

### ZIS reachability

The packaged `zis-test` utility checks whether a named ZIS cross-memory server is accessible.
It is not part of the central pre-flight checks. Any automatic use depends on the separately
packaged ZSS component's startup scripts.

## `zwe validate` commands

These commands run checks manually without starting Zowe. The startup switches determine
how startup calls the validators; they are not a universal way to skip manually requested
validation.

| Command | Purpose |
|---|---|
| `zwe validate config` | Validates core Zowe YAML; can also validate component schemas. |
| `zwe validate components` | Checks enabled component directories/manifests, or an explicit list. |
| `zwe validate dependencies` | Validates both Java and Node.js. |
| `zwe validate dependencies java` | Validates Java installation and version bounds. |
| `zwe validate dependencies node` | Validates Node.js installation, version bounds, and execution. |
| `zwe validate certificate` | Validates configured stores and certificate properties. |
| `zwe validate port bind` | Tests configured component ports. |
| `zwe validate zosmf jwt` | Checks z/OSMF JWT support when z/OSMF authentication is configured. |

There is no aggregate `zwe validate` command that runs all checks, and no dedicated
availability or AT-TLS validation subcommand.

Use `-c` / `--config` for a YAML file or a colon-separated list using `FILE()` and/or
`PARMLIB()` syntax:

```sh
zwe validate config -c /path/to/zowe.yaml
zwe validate config -c 'FILE(/custom/zowe.yaml):FILE(/defaults/zowe.yaml)'
zwe validate config -c 'FILE(/path/to/zowe.yaml):PARMLIB(ZOWE.PARMLIB(YAML))'
```

### Configuration and component manifests

```sh
# Core schema only
zwe validate config -c /path/to/zowe.yaml

# Core and enabled component schemas
zwe validate config -c /path/to/zowe.yaml --components

# Core and all component schemas, including disabled components
zwe validate config -c /path/to/zowe.yaml --components --all

# Enabled component directories/manifests
zwe validate components -c /path/to/zowe.yaml

# Explicit components, including disabled ones if requested
zwe validate components -c /path/to/zowe.yaml --components gateway,zss
```

`--all` only changes the selection when `--components` is also supplied to `validate config`.
The `components` option is a boolean for `validate config` but a comma-separated list for
`validate components`.

### Runtime dependencies

```sh
zwe validate dependencies -c /path/to/zowe.yaml
zwe validate dependencies java -c /path/to/zowe.yaml
zwe validate dependencies node -c /path/to/zowe.yaml
```

The manual commands check the requested runtimes even if no enabled component needs them,
and explicitly enforce both version bounds. Startup's `warn` or `disabled` version settings
do not relax that final manual validation.

### Certificates

```sh
zwe validate certificate -c /path/to/zowe.yaml
zwe validate certificate -c /path/to/zowe.yaml --level STRICT
```

The command passes the configured stores, alias, passwords, and `zowe.externalDomains` to
the analyser. It interprets diagnostics such as inaccessible stores, expiration, missing
client/server extended key usage, hostname mismatches, and missing trust. `--level` accepts
`STRICT`, `NONSTRICT`, or `DISABLED`; it defaults to `zowe.verifyCertificates`. Even with
`DISABLED`, store access is still checked. The command does not request the analyser's
optional local handshake or remote URL test.

### Ports and z/OSMF JWT

```sh
zwe validate port bind -c /path/to/zowe.yaml
zwe validate port bind -c /path/to/zowe.yaml -o gateway
zwe validate zosmf jwt -c /path/to/zowe.yaml
```

The JWT command requires configured z/OSMF host/port and enabled discovery or apiml. It
applies the authentication-provider and LTPA behavior described above, but is callable
independently of the startup `zosmf` switch.

**Exit-code limitation:** the manual port-bind and JWT commands can print failed checks
and still exit zero. Component schema errors reported by `validate config --components`
also do not set a failing exit status. Inspect the diagnostics; a zero status alone is
insufficient for these commands.
Early fatal errors, such as failure to load the core configuration, can still exit nonzero.

## Standalone utilities

These tools are distributed in `<runtimeDirectory>/bin/utils`. Run them with an appropriate
user and environment for the resource being checked; changing `_BPX_JOBNAME` does not
change the process's user identity. Utility implementations come from other Zowe projects,
so use the installed version's help for its exact interface and output.

| Utility | Use |
|---|---|
| `bind-test` | TCP bind availability and permissions. |
| `attls-test` | AT-TLS policy detection. |
| `zis-test` | Named ZIS server accessibility. |
| `certificate-analyser.jar` | Certificate/store analysis, optional TLS tests, and embedded z/OSMF JWT check. |
| `configmgr` | Configuration loading, merging, template evaluation, schema validation, and JavaScript command execution. |

### `bind-test`

```sh
_BPX_JOBNAME=ZWE1AG /path/to/zowe/bin/utils/bind-test --host 0.0.0.0 --port 7554
```

The tool resolves a hostname or IPv4 address, attempts a TCP bind, and closes the socket on
success. It returns **0 on success and 8 on failure**, including an occupied port or
permission failure. IPv6 resolution is not supported.

### `attls-test`

```sh
_BPX_JOBNAME=ZWE1AG /path/to/zowe/bin/utils/attls-test \
  --serverHost 0.0.0.0 --serverPort 7554 --direction 1
```

Direction `1` means inbound and `2` means outbound. The startup caller uses inbound
queries and interprets return code zero as a detected AT-TLS policy, then compares it with
the configured setting.

### `zis-test`

```sh
/path/to/zowe/bin/utils/zis-test --zis ZWESIS01
```

`--zis` identifies the cross-memory server name (`components.zss.crossMemoryServerName`),
not the started-task jobname. The tool checks server status and accessibility to the caller.
It returns **0 on success and 8 on failure**; its printed
cross-memory status code is separate from the process exit code.

### `certificate-analyser.jar`

The analyser supports file stores and SAF key rings, certificate inspection, optional local
TLS handshakes (`-l`) and remote tests (`-r`). Its embedded JWT mode probes
`/jwt/ibm/api/zOSMFBuilder/jwk`. Use the installed JAR's help:

```sh
java -jar /path/to/zowe/bin/utils/certificate-analyser.jar --help
java -jar /path/to/zowe/bin/utils/certificate-analyser.jar --zosmf-jwt-check --help
```

The startup certificate check supplies `-k`, `-kt`, `-kp`, and `-a` for the keystore,
`-t`, `-tt`, and `-tp` for the truststore, and `-d` for external domains. Its JVM invocation
also supplies the IBM protocol handler and the packaged security override properties.

For example, a standalone SAF truststore/remote test using the same JVM setup is:

```sh
java -Djava.protocol.handler.pkgs=com.ibm.crypto.provider \
  -Djava.security.properties=/path/to/zowe/components/apiml-common-lib/bin/jvm.security.override.properties \
  -jar /path/to/zowe/bin/utils/certificate-analyser.jar \
  -tt=JCERACFKS -t=safkeyring://ZWESVUSR/ZOWERING -tp=password \
  -r=https://zos.example.com:443/zosmf/info
```

Use the installed analyser's `--help` output for the available standalone options.

### `configmgr`

`configmgr` loads YAML from USS files or PARMLIB members, merges configuration layers,
evaluates `${{ }}` expressions, and validates against schemas. It also runs the compiled
JavaScript entry points behind the TypeScript-based `zwe` commands:

```sh
/path/to/zowe/bin/utils/configmgr -script /path/to/script.js
```

Normally, use the `zwe` command instead: its shell launcher supplies the required environment
and script path.
