# Zowe server 3.6.0 (November 2026)

Welcome to the Zowe server Version 3.6.0 release for server components!

See [New features and enhancements](#new-features-and-enhancements) for a full list of changes to the functionality. See [Bug fixes](#bug-fixes) for a list of issues addressed in this release.

**Download v3.6.0 build**: Want to try new features as soon as possible? You can download the v3.6.0 build from [Zowe.org](https://www.zowe.org/download.html).

## New features and enhancements

Zowe Version 3.6.0 server components contain the enhancements that are described in the following topics.

### Zowe installation and packaging

- Expanded the example `zowe.yaml` configuration file with APIML modulith logging options, including feature-specific debug logging and file-only DEBUG/TRACE output, helping administrators troubleshoot APIML while reducing messages sent to the console or spool. ([#4913](https://github.com/zowe/zowe-install-packaging/pull/4913))
- In high availability (HA) mode, Zowe now creates a merged YAML configuration file in the `workspace.env` directory for each instance, applies that instance’s overrides, and exposes the file path through `ZWE_HA_INSTANCE_CONFIG` so components can load the correct settings. ([#4759](https://github.com/zowe/zowe-install-packaging/pull/4759))
- Added a property `zowe.network.allowedDomains` to control which domains are accepted in API URLs during Discovery Service onboarding. By default, the list includes external domains and HA LPAR hostnames but rejects URLs which use other domains. ([#4801](https://github.com/zowe/zowe-install-packaging/pull/4801))
- Added a command `zwe validate zosmf jwt` to verify that z/OSMF JWT authentication works when Zowe is configured to use it. The check runs at startup by default and can be changed to a warning or disabled with `zowe.launchScript.startupChecks.zosmfjwt`. ([#4727](https://github.com/zowe/zowe-install-packaging/pull/4727))
- Updated the example `example-zowe.yaml` file to document APIML logging levels (`quiet`, `info`, or `debug`), which let administrators control log verbosity globally or for individual APIML components. The default level is `info`. ([#4827](https://github.com/zowe/zowe-install-packaging/pull/4827))
- Improved the handling of temporary files and directories to restrict unauthorized access. ([#4820](https://github.com/zowe/zowe-install-packaging/pull/4820))
- Updated the sequence of workflows in PSWI. The reordered PSWI workflows now set up key rings and certificates then create and sign certificate requests and then load the signed certificate. ([#4854](https://github.com/zowe/zowe-install-packaging/pull/4854))
- `zwe init certificate` now generates a random password when `password` or `caPassword` is at its default value. This enhancement is only for `PKCS12` based certificate. Key ring setup scenarios are unaffected. ([#4866](https://github.com/zowe/zowe-install-packaging/pull/4866))

#### Zowe Launcher
- Improved `CHANGELOG` automation to identify version headings with or without a leading `v` and generate Markdown links, making release notes easier to maintain. ([#231](https://github.com/zowe/launcher/pull/231))
- Updated the `QuickJS` attribution and build example to reference `zowe/quickjs-portable`, keeping the source information in project notices accurate and consistent. ([#228](https://github.com/zowe/launcher/pull/228))
- Updated the Launcher build to use the same `QuickJS` engine as `configmgr` from `zowe/quickjs-portable` and included its required `libbf` and `debugutil` sources, keeping the components aligned on the same version of the engine. ([#222](https://github.com/zowe/launcher/pull/222))
- Replaced regex-based detection of the standard date prefix in the Launcher system messages with an internal routine, removing the regex library dependency while preserving message filtering. ([#206](https://github.com/zowe/launcher/pull/206))
- Set the Launcher STC’s default umask to `0022`, so newly created files use `644` permissions and directories use `755`, restricting write access to their owner. ([#212](https://github.com/zowe/launcher/pull/212))

### Zowe Application Framework

#### Zlux Editor
-	Added element IDs to all UI components (dialogs, menu bar, tabs, nav, file explorer) for Selenium test automation. ([#387](https://github.com/zowe/zlux-editor/pull/387))
-	Added an enhancement so that the Editor now saves your open tabs and restores them after you reopen the Editor, so you can resume where you left off. ([#386](https://github.com/zowe/zlux-editor/pull/386))
-	Enhanced the Session picker dialog on startup to let users choose which session to restore, create new sessions, or start empty. ([#386](https://github.com/zowe/zlux-editor/pull/386))
-	Added support for multiple sessions. Users can now organize tabs by project or task and switch between them via Session menu. ([#386](https://github.com/zowe/zlux-editor/pull/386))
-	Enhanced the editor to back up each session before saving, so your open tabs can be restored if the session file corrupts. ([#386](https://github.com/zowe/zlux-editor/pull/386))
-	Enhanced the editor so that if a session file is corrupted, the editor can restore your open tabs from a backup file. ([#386](https://github.com/zowe/zlux-editor/pull/386))
-	Added an enhancement so that you can quickly open file paths, datasets, and URLs from editor text with Ctrl+Click (Cmd+Click on macOS). ([#373](https://github.com/zowe/zlux-editor/pull/373))
-	Added an enhancement so that AT-TLS files highlight automatically, with hover help for keywords and referenced rules. ([#380](https://github.com/zowe/zlux-editor/pull/380))
-	Added an enhancement so that you can now navigate AT-TLS policies faster by going from a reference to its declaration or finding all its references. ([#380](https://github.com/zowe/zlux-editor/pull/380))


### Zlux App Server
-	Added the optional `requiresRbac` setting to dataservice definitions, so services can return `403` when `RBAC` is disabled. ([#419](https://github.com/zowe/zlux-app-server/pull/419))
-	Added `components.app-server.node.mediationLayer.server.userid` and `.password`, which default to the Discovery service `apiml.discovery` credentials. These are required to register to the API Mediation Layer when `zowe.verifyCertificates` is `DISABLED`.
-	Plug-in preferences are copied into instances without shell parsing, reducing command-injection risk. ([#378](https://github.com/zowe/zlux-app-server/pull/378))
-	Plug-ins now provide launch-menu folders that appear automatically in the desktop, including in development environments. ([#695](https://github.com/zowe/zlux-app-manager/pull/695))
- Administrators can now configure the server to register statically with API Mediation Layer instead of Eureka, supporting deployments that require static registration. To opt-in to this behavior, set YAML property `components.app-server.node.mediationLayer.static` to `true`. ([#358](https://github.com/zowe/zlux-app-server/pull/358))


### Zlux Server Framework

- Enhancement: RBAC can now be used on for WebSocket dataservices, which will use the 'GET' method for SAF profiles. ([#710](https://github.com/zowe/zlux-server-framework/pull/710))
- Enhancement: Added RBAC support for WebSocket dataservices so that administrators can control who can access them. ([#704](https://github.com/zowe/zlux-server-framework/pull/704))
- Enhancement: Added authenticated access to the agent hostname so administrators can securely configure plugins to connect to the correct host. ([#703](https://github.com/zowe/zlux-server-framework/pull/703))
- Enhancement: Added optional per-component host allowlists in zowe.yaml so administrators can restrict TN3270 and VT connections to approved hosts. ([#702](https://github.com/zowe/zlux-server-framework/pull/702))


### Zowe Common C

- Bugfix: Fixed z/OS IPv4 host lookups to handle failures and empty address lists safely, preventing invalid memory access and improving socket trace diagnostics.
-	Bugfix: Fixed dataset cleanup so callers can safely release entries early without risking memory corruption on z/OS or freeing those entries again.
- Bugfix: `tlsInit()` now disables GSKit's session ID/ticket cache (`GSK_V3_SIDCACHE_SIZE=0`). Without this, a TLS 1.3 client on some z/OS releases sends a `ClientHello` that certain TLS 1.3 peers (e.g. api-layer on Java 17) mishandle, causing subsequent reads to fail with an SSL protocol violation. For example, `ZSS` failed to fetch the `JWKS` from the APIML Gateway.
- Bugfix: Fixed the overlong-key warning on z/OS so administrators can identify and correct the YAML key that exceeded the limit.
- Bugfix: Fixed Base64 uploads to return an HTTP error when memory is unavailable, preventing memory corruption on z/OS and clearly reporting the failure.
- Bugfix: Fixed script evaluation to report “cannot allocate the evaluation heap” when memory runs out, preventing crashes and memory corruption.
- Bugfix: Fixed configmgr startup to report “cannot allocate the logging context” and exit cleanly when memory is unavailable, instead of crashing or corrupting memory.
- Chore: configmgr and the REXX configmgr build take QuickJS from zowe/quickjs-portable staging, the Open Mainframe Project home of the z/OS port, instead of a personal fork; the configmgr build scripts now label the engine 2024-01-13, which is what they have built since March, instead of 2021-03-27.
-	Bugfix: Fixed ZSS startup diagnostics for ICSF random-number failures to report meaningful error codes and log the CSFRNG error details, helping administrators identify issues such as missing CSFRNG access or why the server failed to start.
-	Bugfix: Fixed Base64 uploads to correctly size decode buffers for large payloads, preventing buffer overruns that could corrupt memory or crash the server.
-	Bugfix: Fixed the Linux configmgr build so developers can compile and run the CLI again.
-	Bugfix: Fixed component-level logging on Linux so configured log levels affect only the intended component and its children, preventing unrelated Zowe components from producing excessive trace logs.
-	Bugfix: Fixed configmgr -script to report top-level script errors and exit with ZCFG_EVAL_FAILURE instead of 0, so automation can detect failed scripts rather than treating them as successful.
- Chore:  the configmgr-rexx build (ZWERXCFG) now uses the same QuickJS as configmgr.
- Bugfix: Fixed character translation in Open XL builds to prevent crashes and unexpected behavior caused by incorrect register handling.
-	Bugfix: Fixed enum and const validation messages to show the correct expected type, helping users diagnose configuration errors instead of being misled by “integer.”
-	Bugfix: Fixed cfgSetConfigPath() so a new configuration path replaces the previous one, preventing stale settings from being merged and array values from being duplicated when configuration loads.
-	Bugfix: Fixed embedded JavaScript startup on z/OS to require key 8 problem state and reject SRB, cross-memory, or lock-held callers, reporting setup failures instead of proceeding with an invalid runtime.
-	Bugfix: Fixed embedded JavaScript console.log() to print long messages without truncation, use less memory for typical short messages, and raise an out-of-memory error if a large-message buffer cannot be allocated.
-	Bugfix: Fixed SHA-256 hashing through ICSF so applications can generate SHA-256 digests instead of failing with an invalid rule-array error.
-	Bugfix: Fixed ICSF digest buffer sizing so SHA-384 and SHA-512 hashes can be generated without buffer overflows or memory corruption.
-	Enhancement: Added SHA-3 support to the ICSF digest wrapper, enabling applications to calculate SHA3-224, SHA3-256, SHA3-384, and SHA3-512 digests.
-	Bugfix: Fixed logging component-ID traversal to prevent an out-of-bounds memory read on every call on little-endian systems, avoiding undefined behavior.
-	Bugfix: Fixed this non-z/OS linking failure by implementing the missing POSIX inode and device-ID accessors and the Windows device-ID accessor, allowing file-identity operations such as ETag generation to link successfully.
- Bugfix: directoryMakeDirectoryRecursive() now publishes the required size of its path-out buffer as USS_MKDIR_PATH_BUFFER_SIZE and rejects a messageLength below it, returning -1 before anything is created.
-	Bugfix: Fixed recursive directory creation to support valid USS paths up to 1,023 characters and reject only longer paths, preventing the buffer overrun and 0C4 ABEND that occurred above 255 characters.
-	Enhancement: utils.c gains bounded string helpers strcpySafe, strncpySafe, strcatSafe, strncatSafe and strlenSafe. They follow the argument shape of the C11 Annex K _s functions, so each buffer is followed immediately by its own size, treat that size as the size of the buffer, always null-terminate, and return -1 when the destination was too small to hold the whole result. They are deliberately not named _s: Annex K is optional, z/OS does not provide it, those identifiers are reserved for it, and these do not implement its semantics (constraint handlers, errno_t, rsize_t).
-	Bugfix: Previously, during recursive directory copying or deletion, the program would follow symbolic links to operate on the actual files they pointed to; this has been changed so that only the symbolic links themselves are copied or deleted.
-	Bugfix: Fixed a buffer overflow issue in directory-related APIs that, in rare cases, caused incorrect directory listing.
-	Bugfix: Fixed duplicate YAML key handling so configmgr and the launcher use the same configuration: the first value is kept with a warning, preventing silent value changes or template-evaluation failures.
-	Bugfix: Fixed configmgr to run pending JavaScript signal handlers, timers, and Promise jobs after script evaluation, enabling graceful SIGTERM shutdown without changing synchronous scripts.
-	Bugfix: Fixed URI parsing to return HTTP 414 for oversized requests, preventing buffer overflows and giving clients a clear error.
-	Bugfix: Fixed XML parsing and error reporting to safely handle long messages, excessive nesting, and EOF in comments, preventing buffer overflows, out-of-bounds access, and crashes.
-	Enhancement: made zowe-common-c compatible with clang/llvm on z/OS and Linux.
-	Enhancement: Kept configmgr validate output concise by showing JSON debug details only when tracing is enabled.
-	Bugfix: Fixed configmgr checks for schema and configuration paths so missing, empty, or invalid inputs report errors instead of causing an ABEND.
-	Enhancement: Added active PC caller tracking so termination rejects new calls, waits for existing callers before freeing server resources, and reports the caller count to prevent ABENDs during shutdown.
-	Bugfix: Fixed zosResolveSymbol() to read only the specified symbol-name length, preventing ABENDs caused by overreading.
-	Bugfix: Fixed 64-bit ZSS recovery so service-handler ABENDs are logged as averted, keeping the server process running instead of crashing.
-	Bugfix: Fixed z/OS /unixfile target-encoding selection to follow the caller-specified or file-tagged source CCSID, preserving non-Latin-1 characters by returning UTF-8 for multibyte sources while retaining ISO-8859-1 for single-byte sources.
-	Enhancement: Added isMultiByteCCSID() on z/OS, Linux, and AIX so file serving can detect multibyte CCSIDs and use UTF-8 for those files, preventing character corruption while preserving existing single-byte behavior.
-	Enhancement: Added parseEncodingValue() on z/OS, Linux, and AIX so callers can provide charset names or decimal CCSIDs, request raw-byte handling with the binary sentinel value, and detect unrecognized inputs.
-	Enhancement: Added IANA-listed IBM-NNNN codepages and the IBM1047 and IBM-819 (ISO-8859-1) aliases to charset lookup, and made auto valid for sourceEncoding and targetEncoding so callers can use more IBM encodings or explicitly select the existing automatic defaults.
- Enhancement: Added independent sourceEncoding and targetEncoding options to /unixfile requests, so callers can override either value, use the tagged or native source CCSID and automatic web target by default or with auto, stream raw bytes with binary, and keep using legacy aliases.
-	Bugfix: Fixed /unixfile charset conversion so multibyte characters are handled across reads, unmappable characters are substituted instead of aborting, and ISO-8859-1 files no longer produce empty or truncated responses on z/OS.
-	Bugfix: Fixed /unixfile charset handling, including Open XL routing, so unsupported forced conversions return HTTP 400 before the response starts, unconvertible tagged files fall back to raw bytes with a warning, and supported streaming conversions return complete data without truncation.
-	Bugfix: Fixed Open XL (ibm-clang64) charset conversion so text- and mixed-conversion file downloads return complete, correct contents, including multibyte and streamed data, with checksums matching the source files.
-	Enhancement: Added a new function cmsTestAuth2 so core services can test any SAF authorization level in XMEM and corrected the ALTER level value so checks use the proper permission.
-	Enhancement: Added support for STRICT and NONSTRICT mode in TLS HTTP client.
-	Bugfix: Fixed this CSI memory leak and entry-buffer sizing issue so repeated dataset searches release allocated memory correctly and return entries without memory-management errors.
- Bugfix: Fixed JSON responses being truncated by unmappable characters, allowing output to continue and keeping the response valid.









### Zowe API Mediation Layer

:::warning Breaking changes

The following changes in API ML 3.6.0 can affect existing deployments. Review each change before you upgrade.

* Actuator endpoints now require authentication. ([#4917](https://github.com/zowe/api-layer/issues/4917))
* Simple requests are no longer allowed for login, which strengthens protection against cross-site request attacks. ([#4823](https://github.com/zowe/api-layer/issues/4823))
* The `apiml.service.allowEncodedSlashes` property has been removed in favor of `enableStrictUrlValidation`. ([#4830](https://github.com/zowe/api-layer/issues/4830))
* Strict URL validation is now kept as the default behavior. ([#4812](https://github.com/zowe/api-layer/issues/4812))

For required configuration changes and mitigation steps, see [API ML v3.6 upgrade and security enhancements](../api-ml-v3.6-upgrade-and-security-enhancements.md). For all breaking changes in Zowe v3, see [Breaking changes](../breaking-changes-v3.md).

:::

#### New features

* Added enhanced logging options for the modulith (single-service) deployment. ([#5002](https://github.com/zowe/api-layer/issues/5002))
* Added an environment variable configuration layer for the Eureka client intervals. ([#4794](https://github.com/zowe/api-layer/issues/4794))
* The API Catalog can now use a client certificate to obtain API documentation from services. ([#4844](https://github.com/zowe/api-layer/issues/4844))
* Added the ability to define a local address binding for outbound connections. ([#4815](https://github.com/zowe/api-layer/issues/4815))
* Implemented an allowlist for URL domains. ([#4656](https://github.com/zowe/api-layer/issues/4656))
* Domain allowlist validations now support IP masks. ([#4898](https://github.com/zowe/api-layer/issues/4898))
* Added a `quiet` logging level. ([#4760](https://github.com/zowe/api-layer/issues/4760))
* Permissions are now required to use debug mode with the modifiable actuator. ([#4820](https://github.com/zowe/api-layer/issues/4820))
* OIDC validation now returns the token claims. ([#4641](https://github.com/zowe/api-layer/issues/4641))
* Added support for Java 25 in API ML v3.x.x. ([#4728](https://github.com/zowe/api-layer/issues/4728))
* Allow both environment variables and zowe.yaml mapped properties to influence the domain allow list. ([#5006](https://github.com/zowe/api-layer/issues/5006))
* Multiple public keys can now be used for signature verification of PATs. ([#5015](https://github.com/zowe/api-layer/issues/5015))
* Added a z/OSMF JWT preflight check. ([#4531](https://github.com/zowe/api-layer/issues/4531))
* Added OpenTelemetry log signals for invalid authentication attempts. ([#4551](https://github.com/zowe/api-layer/issues/4551))

## Bug fixes

Zowe server Version 3.6.0 contains the bug fixes that are described in the following topics.

### Zowe installation and packaging

- Updated `zwe` to create command log files with `0640` permissions, allowing the owner to read and write and the group to read, while preventing access by others. ([#4807](https://github.com/zowe/zowe-install-packaging/pull/4807))
- Updated `zwe validate certificate` to load the SAF keyring URL handlers on IBM Java 17 and 21, preventing `MalformedURLException: unknown protocol: safkeyring` when validating certificates stored in SAF keyrings. ([#4795](https://github.com/zowe/zowe-install-packaging/pull/4795))
- Fixed the zwe certificate, migrate, and configuration commands to no longer expose passwords in process arguments, console output, or logs. ([#4883](https://github.com/zowe/zowe-install-packaging/pull/4883))
- Improved RACF sample job security permissions to protect Zowe data sets from unauthorized access. ([#4879](https://github.com/zowe/zowe-install-packaging/pull/4879))
- Corrected the `cli.js` script path in the ZIS register `index.sh` files (`zis`, `zis/loadlib`, `zis/parmlib`) so each points to its own command directory instead of the non-existent `install/zis-plugin/cli.js`. ([#4917](https://github.com/zowe/zowe-install-packaging/pull/4917))
- Allow dynamic zFS expansion for STC group in RACF, TSS and ACF2 ([#4916](https://github.com/zowe/zowe-install-packaging/pull/4916)), ([#4882](https://github.com/zowe/zowe-install-packaging/pull/4882)), ([#4886](https://github.com/zowe/zowe-install-packaging/pull/4886))

#### Zowe Launcher
- Fixed Launcher startup to load `zowe.sysMessages` only after configuration validation, so unvalidated message settings are not applied. ([#208](https://github.com/zowe/launcher/pull/208))
- Added a bounds check when building the component list, preventing names from being truncated and displayed incorrectly after the list exceeds its buffer capacity. ([#195](https://github.com/zowe/launcher/pull/195))


### Zowe Application Framework

#### Zlux Editor
-	Fixed Editor tabs to show the correct file content when you switch between them. ([#410](https://github.com/zowe/zlux-editor/pull/410))
-	Improved editor security by removing runtime code evaluation from menu actions. ([#401](https://github.com/zowe/zlux-editor/pull/401))
-	Fixed LSP settings to reject unencrypted WebSocket URLs, helping protect language-server traffic. ([#400](https://github.com/zowe/zlux-editor/pull/400))
-	Fixed `Open in new tab` and `Copy permalink` to open the intended file or dataset, even when its name contains special characters. ([#396](https://github.com/zowe/zlux-editor/pull/396))
-	Removed internal hostnames from the editor bundle, protecting details of the internal infrastructure from exposure. ([#398](https://github.com/zowe/zlux-editor/pull/398))
-	Prevented editor URL formatting from disrupting other zLUX plugins. ([#397](https://github.com/zowe/zlux-editor/pull/397))
-	Fixed overlapping dialog input labels, making fields easier to read. ([#387](https://github.com/zowe/zlux-editor/pull/387))

#### Zlux App Manager

##### Security
-	Removed the vulnerable browser app to prevent its proxy from making unauthorized requests to internal services. ([#722](https://github.com/zowe/zlux-app-manager/pull/722))
-	Fixed the iframe bridge to check each message’s sender and origin, blocking untrusted windows from accessing Zowe APIs. ([#727](https://github.com/zowe/zlux-app-manager/pull/727))
-	Fixed iframe message checks to accept messages only from the desktop and send them only to its origin, protecting Zowe APIs from untrusted windows. ([#732](https://github.com/zowe/zlux-app-manager/pull/732))
-	Fixed iframe mode checks so plugins hosted on another origin can load without browser errors. ([#732](https://github.com/zowe/zlux-app-manager/pull/732))
- Fixed iframe applications to be framed with a restricted capability set. The applications cannot redirect the desktop or see its full URL but retain the capabilities they need. ([#733](https://github.com/zowe/zlux-app-manager/pull/733))
- 
##### Allowlists and registration validation
- Security: The browser-preferences dataservice now only sets an allowlist of preference cookies (language and locale). Preference cookies are now set with `secure` (over HTTPS) and `sameSite=strict`, and oversized values are rejected. ([#729](https://github.com/zowe/zlux-app-manager/pull/729))


### Zlux App Server
-	Startup logs no longer reveal the names of sensitive environment variables. ([#390](https://github.com/zowe/zlux-app-server/pull/390))
-	TN3270 terminals now default to port 992 with TLS, enabling secure connections without manual configuration. ([#387](https://github.com/zowe/zlux-app-server/pull/387))

##### Security
-	APIML registration values can no longer trigger unintended shell commands during substitution. ([#403](https://github.com/zowe/zlux-app-server/pull/403))
-	Startup logs no longer expose passwords, passphrases, or secrets from configuration or sensitive command-line arguments. ([#399](https://github.com/zowe/zlux-app-server/pull/399))

### Zlux Server Framework
- Fixed an authentication gap that could allow unauthenticated access to external plugin services. ([#715](https://github.com/zowe/zlux-server-framework/pull/715))
- Removed the unauthenticated `/server/proxies` endpoint, which has been replaced with the `/server/environment` values. This fixed an information exposure that allowed unauthenticated users to retrieve the ZSS hostname and port. ([#703](https://github.com/zowe/zlux-server-framework/pull/703))

#### Security
- Improved how the server derives its internal secrets, so that unpredictable values are always used. ([#718](https://github.com/zowe/zlux-server-framework/pull/718))
- Kept insecure, development-only authentication plugins such as `trivial-auth` and `internal-auth` authentication  out of production distributions to reduce exposure to known vulnerabilities. ([#700](https://github.com/zowe/zlux-server-framework/pull/700))
- Removed the obsolete encryption wrapper so users can migrate to supported `Node.js` crypto APIs and avoid compatibility issues with newer `Node.js` versions. ([#705](https://github.com/zowe/zlux-server-framework/pull/705))













### Zowe API Mediation Layer

#### Security

* Added a content security policy to the API Catalog for enhanced security. ([#4926](https://github.com/zowe/api-layer/issues/4926))
* Updated the default content security policy. ([#4964](https://github.com/zowe/api-layer/issues/4964))
* Made fetch metadata validation more restrictive. ([#4908](https://github.com/zowe/api-layer/issues/4908))
* Forced HSTS to be enabled. ([#4802](https://github.com/zowe/api-layer/issues/4802))
* Set frame options to same origin. ([#4799](https://github.com/zowe/api-layer/issues/4799))
* HTTP requests are now redirected to HTTPS. ([#5036](https://github.com/zowe/api-layer/issues/5036))
* Sanitized the OIDC `returnUrl` to prevent open redirects. ([#4813](https://github.com/zowe/api-layer/issues/4813))
* Fixed the sanitization of HTML code that is injected into the API Catalog web UI. ([#5027](https://github.com/zowe/api-layer/issues/5027))
* Removed unverified LTPA token extraction paths. ([#4816](https://github.com/zowe/api-layer/issues/4816))
* JSON Web Tokens (JWT) are now passed as a header rather than as a request parameter. ([#4818](https://github.com/zowe/api-layer/issues/4818))
* The full JWT is no longer shown in debug messages. ([#5024](https://github.com/zowe/api-layer/issues/5024))
* Passwords are now masked in `toString` methods. ([#4992](https://github.com/zowe/api-layer/issues/4992))
* Eureka credentials are now verified in constant time. ([#4831](https://github.com/zowe/api-layer/issues/4831))
* Basic authentication is now required for `/eureka` when TLS validation is disabled. ([#4734](https://github.com/zowe/api-layer/issues/4734))
* Explicit SnakeYAML constructors are now used for security. ([#4786](https://github.com/zowe/api-layer/issues/4786))
* Updated `markdown-it` to 14.3.0 and `linkify-it` to 5.0.2 to address CVE-2026-48988 and CVE-2026-59887. ([#4875](https://github.com/zowe/api-layer/issues/4875))
* Fixed the security rule in the Caching Service when certificate validation is relaxed. ([#4632](https://github.com/zowe/api-layer/issues/4632))
* Items are now cached only when they come from a trusted proxy. ([#4651](https://github.com/zowe/api-layer/issues/4651))
* The relaxed firewall is now used only for routed requests. ([#4643](https://github.com/zowe/api-layer/issues/4643))
* Added negative tests for the SAF resource check. ([#4889](https://github.com/zowe/api-layer/issues/4889))

#### Allowlists and registration validation

* Added port validation to the allowed domains list. ([#4934](https://github.com/zowe/api-layer/issues/4934))
* Added a default allowlist. ([#4692](https://github.com/zowe/api-layer/issues/4692))
* Added the Broadcom TechDocs domain to the default allowlist. ([#4730](https://github.com/zowe/api-layer/issues/4730))
* Loopback and local addresses are no longer automatically allowed. ([#4892](https://github.com/zowe/api-layer/issues/4892))
* Local IP addresses are now allowed during validation of an onboarding service. ([#4887](https://github.com/zowe/api-layer/issues/4887))
* Added validation of the hostname of a registered service against the allowed list. ([#4833](https://github.com/zowe/api-layer/issues/4833))
* Added validation of the IP address of a registered service against the allowed list. ([#4837](https://github.com/zowe/api-layer/issues/4837))
* Added scheme validation to registration metadata. ([#4835](https://github.com/zowe/api-layer/issues/4835))
* Fixed metadata validation on intermediate segments. ([#4915](https://github.com/zowe/api-layer/issues/4915))
* The API Catalog now validates metadata as well. ([#4922](https://github.com/zowe/api-layer/issues/4922))
* Fixed handling of the metadata validation exception. ([#4888](https://github.com/zowe/api-layer/issues/4888))
* Added a debug message for when registration to the Discovery Service is not allowed. ([#5009](https://github.com/zowe/api-layer/issues/5009))

#### Authentication and CORS

* Added a CSRF token header when one is available. ([#4675](https://github.com/zowe/api-layer/issues/4675))
* Changed the behavior when CORS is disabled. ([#4848](https://github.com/zowe/api-layer/issues/4848))
* Fixed the CORS defaults. ([#4758](https://github.com/zowe/api-layer/issues/4758))
* Restored the default for allow credentials to `true`. ([#4872](https://github.com/zowe/api-layer/issues/4872))
* Improved handling of personal access tokens (PAT). ([#4971](https://github.com/zowe/api-layer/issues/4971))
* Fixed handling of OIDC errors. ([#5018](https://github.com/zowe/api-layer/issues/5018))
* Added a retry for authentication calls routed through the Gateway. ([#4899](https://github.com/zowe/api-layer/issues/4899))
* Added a z/OSMF retry during authentication. ([#4928](https://github.com/zowe/api-layer/issues/4928))
* Added support for both `zOSMF` and `zosmf` as the property name. ([#4903](https://github.com/zowe/api-layer/issues/4903))

#### Infinispan, Eureka, and high availability

* Fixed an Infinispan issue in high availability on Java 21 and later, auto-constructed the initial hosts, and made Infinispan configurable. ([#4731](https://github.com/zowe/api-layer/issues/4731))
* Added recovery from a corrupted Infinispan global state. ([#4827](https://github.com/zowe/api-layer/issues/4827))
* Added a log message for when an Infinispan exception occurs because the cache is corrupted. ([#4867](https://github.com/zowe/api-layer/issues/4867))
* Fixed the caching storage mode validation for the modulith and the Caching Service so that an empty keyring password is accepted. ([#4805](https://github.com/zowe/api-layer/issues/4805))
* Fixed an issue with Eureka replicas when using AT-TLS with high availability. ([#4628](https://github.com/zowe/api-layer/issues/4628))
* Eureka peer communication now uses a host verifier based on the configuration. ([#4633](https://github.com/zowe/api-layer/issues/4633))
* Peer read timeouts are now escalated after the maximum number of retries. ([#4780](https://github.com/zowe/api-layer/issues/4780))
* Stale client connections are now closed when the z/OS TCP/IP stack restarts. ([#4792](https://github.com/zowe/api-layer/issues/4792))
* The Eureka wrapper now calls the correct method. ([#4952](https://github.com/zowe/api-layer/issues/4952))
* Added a check for null entries in the Eureka properties. ([#4829](https://github.com/zowe/api-layer/issues/4829))
* The Eureka client now falls back to native IP address discovery when the IP address is not set. ([#4873](https://github.com/zowe/api-layer/issues/4873))
* Fixed a deadlock that could occur during static registration of services. ([#4657](https://github.com/zowe/api-layer/issues/4657))
* The shared connection manager is now used. ([#4883](https://github.com/zowe/api-layer/issues/4883))
* Turbo filters now run only when they are required. ([#4909](https://github.com/zowe/api-layer/issues/4909))

#### Logging and diagnostics

* Added `reason` and `action` fields to 10 log messages. ([#4745](https://github.com/zowe/api-layer/issues/4745))
* Fixed missing OpenTelemetry logs at the info level. ([#4955](https://github.com/zowe/api-layer/issues/4955))
* Reduced logging of conformance criteria violations. ([#4627](https://github.com/zowe/api-layer/issues/4627))

#### API Catalog and other fixes

* Fixed the API Catalog Vite dev server and added HTTPS support. ([#4851](https://github.com/zowe/api-layer/issues/4851))
* Ensured safe behavior when using `BASE` within Vite. ([#4788](https://github.com/zowe/api-layer/issues/4788))
* Removed the tile fields from the onboarding wizard in the API Catalog UI. ([#4987](https://github.com/zowe/api-layer/issues/4987))
* Added support for wildcards in the SAN during certificate validation by the certificate analyzer. ([#4676](https://github.com/zowe/api-layer/issues/4676))
* Added support for Java 21 by removing the encoding setting. ([#4659](https://github.com/zowe/api-layer/issues/4659))
* Added a check for whether a directory exists. ([#4615](https://github.com/zowe/api-layer/issues/4615))
* Replaced the string matcher with a pattern. ([#4897](https://github.com/zowe/api-layer/issues/4897))
