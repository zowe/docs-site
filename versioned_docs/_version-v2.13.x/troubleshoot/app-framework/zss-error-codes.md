# ZSS Error Message Codes

The following error message codes may appear on ZSS log. Use the following message code references and the corresponding reasons and actions to help troubleshoot issues.

## ZSS informational messages

### ZWES0013I

  ZSS Server has started. Version '%s' '%s'

  **Reason:**

  ZSS Server has started.

  **Action:**

  No action required.

### ZWES0014I

  ZIS status - '%s' (name='%.16s', cmsRC='%d', description='%s', clientVersion='%d')

  **Reason:**

  The message shows status of the connection to Privileged Server: ZIS status - `<OK or Failure>` (name=`<Privileged Server Name>`, cmsRC=`<RC>`, description=`<description`, clientVersion=`<version>`)

  **Action:**

  if Status is `OK` then no action required. If Status is `Failure` see check `<cmsRC>` and description.
  In the cases listed below check that the ZWESISTC started task is running. If not, start it with the TSO command `/S ZWESISTC`:
  - `cmsRC=12`, description=`'Global area address is NULL'`
  - `cmsRC=39`, description=`'Cross-memory server abended'`
  - `cmsRC=47`, description=`'ZVT is NULL'`
  - `cmsRC=64`, description=`'PC is unavailable'`

### ZWES0035I

  ZSS Server settings: Address='%s', port='%d', protocol='%s'

  **Reason:**

  Server is starting using Address=`<IP address>`, port=`<port>`, protocol=`http` or `https`

  **Action:**

  No action required.
### ZWES0039I

  Installing '%s' service...

  **Reason:**

  `<Service>` is about to install. 

  **Action:**

  No action required.

### ZWES0061I

  TLS settings: keyring '%s', label '%s', password '%s', stash '%s'

  **Reason:**

  ZSS uses TLS settings: keyring `<keyring>` or `<p12-file>`, label `<cert-label>`, password `"****"` or `(no password)`, stash `<stash-file>` or `(no stash)`.

  **Action:**

  No action required.
### ZWES0063I

  Caching Service settings: gateway host '%s', port %d

  **Reason:**

  Caching Service settings are gateway host `<Gateway-host>`, port `<Gateway-port>`. HA is mode enabled.

  **Action:**

  No action required.

### ZWES0064I

  Caching Service not configured

  **Reason:**

  Caching Service not configured. HA mode is disabled.

  **Action:**

  No action required.
### ZWES1100I

  Product Registration is enabled.

  **Reason:**

  Product Registration is enabled.

  **Action:**

  No action required.

### ZWES1101I

  Product Registration is disabled.

  **Reason:**

  Product Registration is disabled.

  **Action:**

  No action required.

### ZWES1102I

  Product Registration successful.

  **Reason:**

  Product Registration successful.

  **Action:**

  No action required.

### ZWES1600I

  JWT will be configured using JWK URL '%s'

  **Reason:**

  JWT will be configured using JSON Web Key(JWK) at URL `<url>`.

  **Action:**

  No action required.

### ZWES1601I

  Server is ready to accept JWT `with`(or `without`) fallback to legacy tokens

  **Reason:**

  Server is ready to accept JWT `with` or `without` fallback to legacy tokens.

  **Action:**

  No action required.

## ZSS error messages


### ZWES1006E

  Error while parsing plugin definition file '%s': '%s'.

  **Reason:**

  An error occurred while parsing `<plugin-definition-file>`: `<error-details>`.
  

  **Action:**

  If you are a plugin developer check `<error-details>` and fix the error by editing `<plugin-definition-file>`, otherwise, report the error to the plugin vendor.

### ZWES1034E

  Server startup problem: Address '%s' not valid.

  **Reason:**

  IP address nor hostname is not valid.

  **Action:**

  Use valid IP address or hostname, e.g. `0.0.0.0`.

### ZWES1036E

  Server startup problem: Ret='%d', res='0x%x'

  **Reason:**

  Server has failed to start.

  **Action:**

  If the next message is `ZWES1037E` then refer [ZWES1037E](###ZWES1037E). Otherwise, examine the reason code with [`bpxmtext`](https://www.ibm.com/docs/en/zos/2.4.0?topic=descriptions-bpxmtext-display-reason-code-text) command, e.g. use `bpxmtext 744c7247` if you got `res='0x744c7247'`

### ZWES1037E

  This is usually because the server port '%d' is occupied. Is ZSS running twice?

  **Reason:**

  ZSS port number is already occupped. 

  **Action:**

  Check if another ZSS instance is already running, or chose another free port number and restart Zowe.

### ZWES1065E

  Failed to configure https server, check agent https settings

  **Reason:**

  Failed to configure https server. 

  **Action:**

  Check agent https settings.


## ZSS warning messages

### ZWES1000W

  Privileged server name not provided, falling back to default.

  **Reason:**

  Privileged server name not defined in configuration file.

  **Action:**

  If your privileged server name is `ZWESIS_STD` then no action required. Otherwise set `components.zss.crossMemoryServerName` property in configuration to the correct name.

### ZWES1005W

  Plugin ID was not found in '%s'

  **Reason:**

  `pluginId` property wasn't found in `<path-to-pluginDefinition.json>` file. The plugin skipped.

  **Action:**

  If you are a plugin developer add `pluginId` property into `<path-to-pluginDefinition.json>` file. Otherwise, contact the plugin vendor.

### ZWES1012W

  Could not open pluginsDir '%s': Ret='%d', res='0x%x'

  **Reason:**

  Could not open `<pluginsDir>`: Ret=`<return-code>`, res=`<reason-code>`

  **Action:**

  Check that `<pluginsDir>` exists and allows reading. Examine the reason code with [`bpxmtext`](https://www.ibm.com/docs/en/zos/2.4.0?topic=descriptions-bpxmtext-display-reason-code-text) command for additional information.

### ZWES1060W

  Failed to init TLS environment, rc=%d(%s)

  **Reason:**

  Failed to initialized TLS environment GSKit return code `<rc>`(`<description>`)

  **Action:**

  Ensure that ZSS certificate is configured correctly. Check GSKit return code and description for additional information. 

### ZWES1103W

  Product Registration failed, RC = %d

  **Reason:**

  Failed to register ZSS.

  **Action:**

  Examine the return code at [https://www.ibm.com/docs/en/zos/2.2.0?topic=requeststatus-return-codes] and correct the error.

### ZWES1201W

  Could not %s file '%s': Ret='%d', res='%d'

  **Reason:**

  Unixfile REST Service could not `<action>` file `<filename>`: Ret=`<return-code>`, res=`<reason-code>`

  **Action:**

  Action depends on return/reason code. For additional information examine the reason code with [`bpxmtext`](https://www.ibm.com/docs/en/zos/2.4.0?topic=descriptions-bpxmtext-display-reason-code-text) command.

### ZWES1103W

  Could not get metadata for file '%s': Ret='%d', res='%d'

  **Reason:**

  Unixfile REST Service could not get metadata for file `<filename>`: Ret=`<return-code>`, res=`<reason-code>`

  **Action:**

  Action depends on return/reason code. For additional information examine the reason code with [`bpxmtext`](https://www.ibm.com/docs/en/zos/2.4.0?topic=descriptions-bpxmtext-display-reason-code-text) command.

### ZWES1602W

  JWK is in unrecognized format

  **Reason:**

  JSON Web Key(JWK) is in unrecognized format. 

  **Action:**

  Report an issue at [https://github.com/zowe/zlux/issues]

### ZWES1603W

  Failed to construct public key using JWK

  **Reason:**

  JSON Web Key(JWK) has invalid public key info. 

  **Action:**

  Report an issue at [https://github.com/zowe/zlux/issues]

### ZWES1604W

  JWK: failed to init HTTP context, ensure that APIML and TLS settings are correct

  **Reason:**

  Failed to init HTTP context for requesting JSON Web Key(JWK).

  **Action:**

  Check the zowe keystore configuration and specification of it within the zowe server config.

### ZWES1605W

  Server will not accept JWT

  **Reason:**

  ZSS Server will not accept JWT.

  **Action:**

  No action required.

### ZWES1606W

  Failed to get JWK - %s, retry in %d seconds

  **Reason:**

  Failed to get JWK - `<reason>`, retry in `<n>` seconds. ZSS Server was unable to get JSON Web Key(JWK), it will try to repeat the attempt in `<n>` seconds.


  **Action:**

No action required.

