# Pre-flight Checks and Validation Utilities

Pre-flight checks are configuration and environmental verifications that happen automatically
during Zowe startup to surface problems before they cause harder-to-diagnose failures at
runtime. Zowe also ships the standalone utilities that power these checks as reusable tools in
`<runtimeDirectory>/bin/utils`, where they can be invoked directly by administrators,
developers, and other products under the terms of the EPL-2.0 license.

- [How pre-flight checks work](#how-pre-flight-checks-work) — the lifecycle and control knobs
- [Built-in Zowe startup checks](#built-in-zowe-startup-checks) — checks keyed under `zowe.launchScript.startupChecks`
- [Component startup checks](#component-startup-checks) — checks contributed by individual components
- [`zwe validate` commands](#zwe-validate-commands) — the user-facing commands that expose these checks
- [Standalone utilities](#standalone-utilities) — the lower-level tools that the checks are built on

---

## How pre-flight checks work

When `zwe start` (or the Zowe STC) runs, the internal command
[`zwe internal start prepare`](commands/internal/start/prepare/index.ts) executes before any
Zowe component is launched. It performs a sequence of checks and, depending on their outcome
and configuration, either continues, prints a warning, or exits with an error.

### Check lifecycle

```
zwe start
  └─ zwe internal start prepare
       ├─ Global validations   (applies to the whole Zowe installation)
       |    ├─ YAML schema validation (Is the YAML valid)
       │    ├─ Workspace directory writability
       │    ├─ Java validity (if APIML / Gateway components are enabled)
       │    ├─ Node validity (if app-server is enabled)
       |    ├─ Certifivate validity [zowe.launchScript.startupChecks.certificate]
       │    ├─ z/OSMF reachability  [zowe.launchScript.startupChecks.zosmf]
       └─ Component validations (one pass per enabled component)
            ├─ Port bind check  (Is each server's port available) [zowe.launchScript.startupChecks.ports]
            ├─ Schema validation via the component's commands.validate script
            └─ Component-specific checks (e.g. ZSS runs zis-test)
```

### Controlling check behavior

Every named startup check supports three behaviors, controlled via Zowe YAML:

| Behavior | Meaning |
|---|---|
| `exit` | Run the check; stop Zowe startup if it fails. This is the default. |
| `warn` | Run the check; print a warning if it fails, but continue startup. |
| `disabled` | Skip the check entirely. |

A global default applies to all named checks, and individual checks can override it:

```yaml
zowe:
  launchScript:
    startupChecks:
      default: exit       # applies to every named check unless overridden
      ports: warn         # override: port conflicts become warnings, not errors
      zosmf: exit
      user: exit
      certificate: exit
```

If a per-check key is absent, `default` is used. If `default` is also absent, `exit` is
assumed.

> **Note:** Not every startup check is individually controllable. Some, such as the workspace
> writability check, are unconditional and always stop startup on failure. Named checks are those
> with explicit `zowe.launchScript.startupChecks.*` YAML keys.

---

## Built-in Zowe startup checks

These checks run every startup as part of `zwe internal start prepare`. Each one has a
corresponding `zwe validate` command that can be run manually at any time.

| Check | YAML key | Default | What it verifies | Underlying mechanism | Manual command |
|---|---|---|---|---|---|
| User identity | *(unconditional)* | always runs | Warns if Zowe is running as `root`. | `id -u` | — |
| Workspace writability | *(unconditional)* | always exits | `zowe.workspaceDirectory` is writable. | filesystem check | — |
| Java validity | *(unconditional when APIML/Gateway enabled)* | always exits | A usable JVM is available. | `java -version` | — |
| Node validity | *(unconditional when app-server enabled)* | always exits | A usable Node.js is available. | `node --version` | — |
| z/OSMF reachability | `zosmf` | `exit` | z/OSMF at `zOSMF.host:zOSMF.port` accepts HTTPS connections. | HTTP(S) probe via Gateway jobname | `zwe validate` *(no dedicated subcommand; logic is inline)* |
| Port availability | `ports` | `exit` | Each enabled component can bind to its configured TCP port. | [`bind-test`](#bind-test) | [`zwe validate port bind`](#zwe-validate-port-bind) |
| Certificates | `certificate` | `exit` | Keystore and truststore are valid and meet Zowe requirements. | [`certificate-analyser.jar`](#certificate-analyserjar) | [`zwe validate certificate`](#zwe-validate-certificate) |

### z/OSMF reachability check

Runs when all three conditions are true:
- `zOSMF.host` and `zOSMF.port` are set in the Zowe YAML
- `components.discovery.enabled: true` or `components.apiml.enabled: true`
- `zowe.launchScript.startupChecks.zosmf` is not `disabled`

The check makes an HTTPS connection (or HTTP if AT-TLS is active) to z/OSMF using the
Gateway's jobname so that TCP/IP permissions are evaluated correctly.


### Port availability check

Runs once per enabled Zowe component that has a `port` value. Each component is tested with
the jobname Zowe will use for that component so that TCP/IP profile permissions are evaluated
accurately — not just the network address.

---

## Component startup checks

Beyond the built-in Zowe checks, individual Zowe components can contribute their own startup
validation logic in two ways.

### Schema-driven validation via `commands.validate`

A component can declare a `commands.validate` script in its `manifest.yaml`. Zowe calls this
script for every enabled component during `zwe internal start prepare`. If the script exits
non-zero, the component's configuration is considered invalid and startup stops.

Example manifest snippet:
```yaml
commands:
  validate: bin/validate.sh
```

`zwe validate config --components` exercises all of these `commands.validate` scripts on
demand without actually starting Zowe.

### Custom component checks

Components can also run arbitrary checks inside their `commands.validate` script (or even in
`commands.configure`) that go beyond YAML schema validation. ZSS is a well-known example.

**ZSS and `zis-test`**

ZSS requires the Zowe ZIS cross-memory server (`ZWESISTC`) to be running before ZSS itself
can start. As part of its startup sequence, ZSS runs [`zis-test`](#zis-test) to confirm ZIS
is reachable. If ZIS is not running, the test fails and ZSS reports it clearly before
aborting, rather than failing silently at runtime.

```
# ZSS internally runs something equivalent to:
zis-test --zis ZWESIS01
```

This kind of component-level check is not governed by any `zowe.launchScript.startupChecks`
YAML key — it is the component's own responsibility and runs unconditionally as part of the
component's startup logic.

---

## `zwe validate` commands

The `zwe validate` commands expose the most important pre-flight checks as user-facing
commands that can be run manually at any time — useful for troubleshooting or for confirming
configuration correctness before attempting a full Zowe start.

| Command | What it checks | Auto-runs at startup? | Controlling YAML key |
|---|---|---|---|
| `zwe validate config` | Zowe YAML schema correctness; optionally component YAML too | No | — |
| `zwe validate certificate` | Keystore, truststore, and TLS connectivity | Via component `commands.validate` | — |
| `zwe validate port bind` | TCP port availability for each enabled component | Yes | `zowe.launchScript.startupChecks.ports` |

All commands accept a `-c / --config` option to point at the Zowe YAML file or a colon-separated
list of files (supporting `FILE()` and `PARMLIB()` syntax):

```sh
zwe validate <subcommand> -c /path/to/zowe.yaml
zwe validate <subcommand> -c 'FILE(/custom/zowe.yaml):FILE(/defaults/zowe.yaml)'
zwe validate <subcommand> -c 'FILE(/path/to/zowe.yaml):PARMLIB(ZOWE.PARMLIB(YAML))'
```

### `zwe validate config`

Validates the Zowe YAML against the published JSON schema. Optionally validates enabled
component configuration too.

```sh
# Validate core Zowe YAML only
zwe validate config -c /path/to/zowe.yaml

# Also validate all enabled components
zwe validate config -c /path/to/zowe.yaml --components

# Validate all components (including disabled ones)
zwe validate config -c /path/to/zowe.yaml --all
```

### `zwe validate certificate`

Validates that Zowe's keystore and truststore are present, readable, and meet TLS
requirements. Uses [`certificate-analyser.jar`](#certificate-analyserjar) internally.

```sh
zwe validate certificate -c /path/to/zowe.yaml
```

### `zwe validate port bind`

Checks whether each enabled Zowe component can successfully bind to its configured TCP port,
using the same jobname that Zowe will use for that component at runtime. This catches
permission problems and port conflicts before startup.

```sh
# Check all enabled components
zwe validate port bind -c /path/to/zowe.yaml

# Check a single component
zwe validate port bind -c /path/to/zowe.yaml -o gateway
```

Example output when a port is already in use:
```
ZWEL0357E: gateway Port 7554 not available for jobname ZWE1AG or command failed.
ZWEL0358E: 1 port bind validation(s) failed, review output for action items before running Zowe.
```

Example output on success:
```
Checking ports of 5 enabled components
Zowe port bind validation passed.
```


---

## Standalone utilities

These utilities are distributed in `<zowe.runtimeDirectory>/bin/utils`. They are used internally
by Zowe's pre-flight checks but are designed as general-purpose tools that can be used
independently — in system administration scripts, product prerequisites, CI pipelines, or
other software that runs on z/OS.

| Utility | Language | Primary use inside Zowe | `zwe validate` command that uses it |
|---|---|---|---|
| `bind-test` | C | TCP port availability for each component | `zwe validate port bind` |
| `zis-test` | C | ZIS (cross-memory server) reachability check by ZSS | — (component-driven) |
| `certificate-analyser.jar` | Java | Keystore/truststore and TLS connectivity validation | `zwe validate certificate` |
| `configmgr` | C | YAML merging, schema validation, template evaluation | `zwe validate config` |

---

### `bind-test`

[GitHub source code](https://github.com/zowe/zss/blob/v3.x/staging/c/bindTest.c)

Opens a TCP socket on a specified host and port without sending or receiving data, then
reports on success or failure. When run under the right user and jobname, this accurately
simulates whether a server started with those same credentials will be able to bind.

#### Usage

```sh
[_BPX_JOBNAME=<jobname>] bind-test --host <hostname_or_ipv4> --port <tcp_port>
```

| Option | Description |
|---|---|
| `--host` | A hostname or IPv4 address. DNS resolution is performed if a hostname is given. |
| `--port` | Any TCP port. Ports below 1024 typically require elevated permissions. |
| `_BPX_JOBNAME` | Setting the jobname (environment variable) ensures TCP/IP profile rules for that jobname are evaluated. |

#### Examples

Checking whether port 7554 is available for the Gateway's jobname:
```sh
_BPX_JOBNAME=ZWE1AG bind-test --host 0.0.0.0 --port 7554
```

Successful result (return code 0):
```
Bind succeeded (pointer=0x2D601098, rc=0x0, rsn=0x0)
```

Port already occupied (return code 4):
```
Error: Bind failed (rc=0xN, rsn=0xM)
Error: Port 7554 was already occupied
```

Permission denied for the jobname (return code 4):
```
Error: Bind failed (rc=0xN, rsn=0xM)
Ensure jobname ZWE1AG for the Zowe STC id (possibly the current user: ZWESVUSR) has permission to make TCPIP binds to 0.0.0.0
```

---

### `zis-test`

[GitHub source code](https://github.com/zowe/zss/blob/v3.x/staging/c/zisTest.c)

Checks whether a Zowe ZIS (Zowe Cross-Memory Server) instance is running and reachable via
the cross-memory interface. ZSS runs this automatically during its startup to confirm ZIS is
available before proceeding. It can also be used standalone by system programmers to verify
that `ZWESISTC` is active and properly authorized.

#### Usage

```sh
zis-test --zis <crossMemoryServerName>
```

| Option | Description |
|---|---|
| `--zis` | The name of the cross-memory server. This is `components.zss.crossMemoryServerName` in the Zowe YAML, typically `ZWESIS01`. |

#### Examples

```sh
zis-test --zis ZWESIS01
```

Successful result (return code 0):
```
ZIS Ok (rc=0, description='Ok', clientVersion='2')
```

ZIS not running or not reachable (non-zero return code):
```
ZIS Failure (rc=39, description='PC call failed', clientVersion='2')
```

---

### `certificate-analyser.jar`

[GitHub source code](https://github.com/zowe/api-layer/tree/v3.x.x/certificate-analyser)

A Java utility that validates keystores and truststores and optionally tests TLS connectivity
to a remote server. Supports both PKCS12 files and z/OS SAF keyrings. Used by
`zwe validate certificate` to confirm Zowe's TLS configuration before startup.

#### Usage

```sh
java -Djava.protocol.handler.pkgs=com.ibm.crypto.provider \
     -jar certificate-analyser.jar \
     [-hl] [-kp[=<keyPasswd>]] [-tp[=<trustPasswd>]] \
     [-a=<keyAlias>] [-k=<keyStore>] [-kt=<keyStoreType>] \
     [-r=<remoteUrl>] [-t=<trustStore>] [-tt=<trustStoreType>]
```

| Flag | Long form | Description |
|---|---|---|
| `-a` | `--keyalias` | Alias under which the key is stored in the keystore. |
| `-h` | `--help` | Display help. |
| `-k` | `--keystore` | Path to a PKCS12 file or SAF keyring (`safkeyring[jce\|cca\|hybrid]://USER/RingName`). |
| `-kp` | `--keypasswd` | Keystore password. For SAF keyrings use the literal `password`. |
| `-kt` | `--keystoretype` | One of: `PKCS12`, `JCERACFKS`, `JCECCARACFKS`, `JCEHYBRIDRACFKS`. |
| `-t` | `--truststore` | Path to the truststore file or SAF keyring. |
| `-tp` | `--trustpasswd` | Truststore password. |
| `-tt` | `--truststoretype` | One of: `PKCS12`, `JCERACFKS`, `JCECCARACFKS`, `JCEHYBRIDRACFKS`. |
| `-l` | `--local` | Perform a local TLS handshake using the keystore and truststore. |
| `-r` | `--remoteurl` | Use the truststore to verify TLS connectivity to a remote URL. |

#### Examples

Verify a SAF keyring truststore and test connectivity to z/OSMF:
```sh
java -Djava.protocol.handler.pkgs=com.ibm.crypto.provider \
     -jar certificate-analyser.jar \
     -tt=JCERACFKS \
     -t="safkeyring://ZWESVUSR/ZOWERING" \
     -tp=password \
     -r=https://zos.example.com:443/zosmf/info
```

Successful result (return code 0):
```
Certificate analysis completed successfully. Remote connection verified.
```

Failure — certificate not trusted (non-zero return code):
```
Error: Remote connection failed: PKIX path building failed: unable to find valid certification path to requested target
```


---

### `configmgr`

[GitHub source code](https://github.com/zowe/zowe-common-c/blob/v3.x/staging/c/configmgr.c)

Reads one or more Zowe YAML configuration files (from USS files or PARMLIB members), merges
them in priority order, validates the merged result against the Zowe JSON schema, evaluates
any `${{ }}` template expressions, and returns the final configuration. It is the engine
behind every `zwe` command that reads Zowe YAML, including `zwe validate config`.

See [Using the configmgr](https://docs.zowe.org/stable/user-guide/configmgr-using/) for
full documentation.

#### Usage

```sh
configmgr -script <path_to_script.js>
```

`configmgr` is not typically run directly by end users. It is invoked by `zwe` commands
through the shell launcher scripts (`index.sh`) in each command directory. The `-script`
argument points to a compiled TypeScript entry point (`cli.js`) that implements the
command's actual logic.
