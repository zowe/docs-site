# ZSS Error Message Codes

The following error message codes may appear on ZSS log. Use the following message code references and the corresponding reasons and actions to help troubleshoot issues.

## ZSS informational messages

### ZWES1007I

  webContent was not found in plugin definition for '%s'

  **Reason:**

  The `webContent` was not found in plugin definition for `<plugin-ID>`.

  **Action:**

  No action required.

### ZWES1008I

  libraryVersion was not found in plugin definition for '%s'

  **Reason:**

  The `libraryVersion` was not found in plugin definition for `<plugin-ID>`.

  **Action:**

  No action required.

### ZWES1010I

  Plugin ID and/or location was not found in '%s'

  **Reason:**

  The plugin ID and/or location was not found in `<path>`.

  **Action:**

  No action required.

### ZWES1013I

  ZSS Server has started. Version '%s' '%s'

  **Reason:**

  ZSS Server has started. Version is `<zowe-version>` `<addressing-mode>`.
  
  `<addressing-mode>` is either `31-bit` or `64-bit`.

  **Action:**

  No action required.

### ZWES1014I

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

### ZWES1035I

  ZSS Server settings: Address='%s', port='%d', protocol='%s'

  **Reason:**

  Server is starting using Address=`<IP address>`, port=`<port>`, protocol=`http` or `https`

  **Action:**

  No action required.

### ZWES1038I

  Server timeouts file '%s' either not found or invalid JSON. ZSS sessions will use the default length of one hour.

  **Reason:**

  The server timeouts file `<path>` either was not found or is invalid JSON. ZSS sessions uses the default length of one hour.

  **Action:**

  No action required.

### ZWES1039I

  Installing '%s' service...

  **Reason:**

  `<Service>` is about to install. 

  **Action:**

  No action required.

### ZWES1061I

  TLS settings: keyring '%s', label '%s', password '%s', stash '%s'

  **Reason:**

  ZSS uses TLS settings: keyring `<keyring>` or `<p12-file>`, label `<cert-label>`, password `"****"` or `(no password)`, stash `<stash-file>` or `(no stash)`.

  **Action:**

  No action required.
  
### ZWES1063I

  Caching Service settings: gateway host '%s', port %d

  **Reason:**

  Caching Service settings are gateway host `<Gateway-host>`, port `<Gateway-port>`. HA mode is enabled.

  **Action:**

  No action required.

### ZWES1064I

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

### ZWES1001E

  Log level '%d' is incorrect.

  **Reason:**

  The logging level `<log-level>` is incorrect.

  **Action:**

  Verify the `<log-level>` is in range `0..5`.

### ZWES1002E

  Error in timeouts file: Could not parse config file as a JSON object.

  **Reason:**

  There is an error in timeouts file: could not parse config file as a JSON object.

  **Action:**

  Verify the timeouts file is a valid JSON.

### ZWES1006E

  Error while parsing plugin definition file '%s': '%s'.

  **Reason:**

  An error occurred while parsing `<plugin-definition-file>`: `<error-details>`.

  **Action:**

  If you are a plugin developer check `<error-details>` and fix the error by editing `<plugin-definition-file>`, otherwise, report the error to the plugin vendor.

### ZWES1011E

  Error while parsing: '%s'

  **Reason:**

  There is an error while parsing: `<json-statement>`.

  **Action:**

  Review the `<json-statement>` and correct it.

### ZWES1016E

  Cannot validate file permission, path is not defined.

  **Reason:**

  Cannot validate the file permission, path is not defined.

### ZWES1017E

  Could not get file info on config path='%s': Ret='%d', res='%d'

  **Reason:**

  Could not get the file information on config path=`<path>`: Ret=`<return-code>`, res=`<reason-code>`

  **Action:**

  Contact support.

### ZWES1020E

  Skipping validation of file permissions: Disabled during compilation, using file '%s'.

  **Reason:**

  Skipping validation of file permissions: disabled during compilation, using the file `<file>`.

  **Action:**

  Contact support.

### ZWES1021E

  Cannot validate file permissions: Path is not defined.

  **Reason:**

  Cannot validate the file permissions: path is not defined.

### ZWES1022E

  Cannot validate file permissions: Path is for a directory and not a file.

  **Reason:**

  Cannot validate the file permissions. Given path is a directory path only without a file.

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

  If the next message is `ZWES1037E` then refer [ZWES1037E](#zwes1037e). Otherwise, examine the reason code with [`bpxmtext`](https://www.ibm.com/docs/en/zos/2.4.0?topic=descriptions-bpxmtext-display-reason-code-text) command, e.g. use `bpxmtext 744c7247` if you got `res='0x744c7247'`

### ZWES1037E

  This is usually because the server port '%d' is occupied. Is ZSS running twice?

  **Reason:**

  ZSS port number is already occupied. 

  **Action:**

  Check if another ZSS instance is already running, or chose another free port number and restart Zowe.

### ZWES1065E

  Failed to configure https server, check agent https settings

  **Reason:**

  Failed to configure https server. 

  **Action:**

  Check agent https settings.

### ZWES1500E

  Failed to generate PassTicket - userId='%s', applId='%s', %s

  **Reason:**

  Failed to generate the PassTicket for userId=`<user-id>`, applId=`<application-name>`, `<error-text>`.

  **Action:**

  Review your security product to determine that it meets all passTickets requirements.

## ZSS warning messages

### ZWES1000W

  Privileged server name not provided, falling back to default.

  **Reason:**

  Privileged server name not defined in configuration file.

  **Action:**

  If your privileged server name is `ZWESIS_STD` then no action required. Otherwise set `components.zss.crossMemoryServerName` property in configuration to the correct name.

### ZWES1004W

  Expected plugin ID '%s', instead received '%s'

  **Reason:**

  Expected plugin ID is `<plugin-ID>`, but it was received `<wrong-plugin-ID>`.

  **Action:**

  Verify the plugin JSON definition.

### ZWES1005W

  Plugin ID was not found in '%s'

  **Reason:**

  `pluginId` property wasn't found in `<path-to-pluginDefinition.json>` file. The plugin skipped.

  **Action:**

  If you are a plugin developer add the `pluginId` property to the `<path-to-pluginDefinition.json>` file. Otherwise, contact the plugin vendor.

### ZWES1009W

  Plugin ID '%s' is NULL and cannot be loaded.

  **Reason:**

  The plugin with `<plugin-ID>` was not succesfully created and cannot be loaded.

  **Action:**

  Verify the plugin JSON definition.

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

  Ensure that the ZSS certificate is configured correctly. Check GSKit return code and description for additional information. 

### ZWES1103W

  Product Registration failed, RC = %d

  **Reason:**

  Failed to register ZSS.

  **Action:**

  Examine the return code at [https://www.ibm.com/docs/en/zos/2.2.0?topic=requeststatus-return-codes] and correct the error.

### ZWES1200W

  Could not %s file '%s': Ret='%d', res='%d'

  **Reason:**

  Could not `<action>` file `<file>`, return code is `<return-code>`, resason code is `<reason-code>`.

  `<action>` specifies for which file operation a problem was detected.

  **Action:**

  No action required.

### ZWES1201W

  Could not %s file '%s': Ret='%d', res='%d'

  **Reason:**

  Unixfile REST Service could not `<action>` file `<filename>`: Ret=`<return-code>`, res=`<reason-code>`

  **Action:**

  Action depends on return/reason code. For additional information examine the reason code with the [`bpxmtext`](https://www.ibm.com/docs/en/zos/2.4.0?topic=descriptions-bpxmtext-display-reason-code-text) command.

### ZWES1202W

  Transfer type has not been set.

  **Reason:**

  The transfer type was not set.

  **Action:**

  No action required.

### ZWES1103W

  Could not get metadata for file '%s': Ret='%d', res='%d'

  **Reason:**

  Unixfile REST Service could not get metadata for file `<filename>`: Ret=`<return-code>`, res=`<reason-code>`

  **Action:**

  Action depends on return/reason code. For additional information examine the reason code with [`bpxmtext`](https://www.ibm.com/docs/en/zos/2.4.0?topic=descriptions-bpxmtext-display-reason-code-text) command.

### ZWES1200W

  Could not %s file '%s': Ret='%d', res='%d'

  **Reason:**

  Could not `<action>` file `<file>`, return code is `<return-code>`, resason code is `<reason-code>`.
  
  `<action>` specifies for which file operation a problem was detected.

  **Action:**

  No action required.

### ZWES1202W

  Transfer type has not been set.

  **Reason:**

  The transfer type was not set.

  **Action:**

  No action required.

### ZWES1400W

  Non standard class provided for '%s' '%s', ending request...

  **Reason:**

  Non standard class was provided for `<HTTP-setting>` `<HTTP-method>`, the request was ended.

### ZWES1401W

  Profile not provided for profiles GET, ending request...

  **Reason:**

  The profile not provided for profiles GET, the request was ended.

### ZWES1402W

  Profile name required for '%s' '%s'

  **Reason:**

  The profile name is required for `<HTTP-setting>` `<HTTP-method>`

### ZWES1403W

  User ID required for user POST/PUT

  **Reason:**

  The user ID is required for user POST or PUT.

### ZWES1404W

  Body not provided for user POST/PUT, ending request...

  **Reason:**

  The body was not provided for user POST or PUT, the request was ended.

### ZWES1406W

  Unknown access type '%d' provided for user POST/PUT, ending request...

  **Reason:**

  Unknown access type `<access-type>` provided for user POST or PUT, the request was ended.

### ZWES1407W

  Access list can only be retrieved in bulk, ending request...

  **Reason:**

  The access list can only be retrieved in bulk, the request was ended.

### ZWES1408W

  Access list buffer with size '%u' not allocated, ending request...

  **Reason:**

  The access list buffer with size `<size>` was not allocated, the request was ended.

### ZWES1409W

  Access list size out of range '%u', ending request...

  **Reason:**

  The size of access list is out of range `<number>`, the request was ended.

### ZWES1410W

  Access list entry name required for access list DELETE

  **Reason:**

  The access list entry name is required for access list `DELETE`.

### ZWES1411W

  Class-mgmt query string is invalid, ending request...

  **Reason:**

  `Class-mgmt`` query string is invalid, the request was ended.

### ZWES1412W

  Group name required for '%s' '%s'

  **Reason:**

  The group name required for `<HTTP-setting>` `<HTTP-method>`.

### ZWES1413W

  Body not provided for group POST, ending request...

  **Reason:**

  The body was not provided for group `POST`, the request was ended.


### ZWES1414W

  Superior not provided for group POST, ending request...

  **Reason:**

  Superior not provided for group `POST`, the request was ended.

### ZWES1415W

  Bad superior group provided for group POST, ending request...

  **Reason:**

  Bad superior group was provided for group `POST`, the request was ended.

### ZWES1416W

  Access type not provided for user POST/PUT, ending request...

  **Reason:**

  The access type was not provided for user `POST` or `PUT`, the request was ended.

### ZWES1417W

  Unknown access type, use [USE, CREATE, CONNECT, JOIN]

  **Reason:**

  Unknown access type, use `USE`, `CREATE`, `CONNECT` or `JOIN`.

### ZWES1418W

  Access list will be re-allocated with capacity '%u'

  **Reason:**

  The access list will be re-allocated with capacity `<size>`.

  **Action:**

  No action required.  

### ZWES1419W

  Group-mgmt query string is invalid, ending request...

  **Reason:**

  `<Group-mgmt>` query string is invalid and the requested was ended.

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
  
  * This message is repeated each `<n>` seconds. After a succesfull attempt, the message `ZWES1601I` is displayed and no action is required.
  * If message `ZWES1601I` does not appear, but rather the message `ZWES1606W Failed to get JWK. rc=failed to init HTTP request (9), rsn=TLS error (17). Retry in 10 seconds`, consider the following:
    * TLSv1.3 recommends encryption `ChaCha20-Poly1305`. However, this encryption may be restricted by the `ICSF FIPS 140-2` policy. When ZSS requests `ChaCha20-Poly1305`, such request will fail.
    * Modify the `zowe.yaml` to use TLSv1.2 to avoid the problem with `ChaCha20-Poly1305`:
```
zowe:
  network:
    server:
      tls:
        maxTls: "TLSv1.2"
    client:
      tls:
        maxTls: "TLSv1.2"
```

### ZWES0054E

  ZIS AUX Server started in wrong key 8

  **Reasons:**

  authPluginLib was missing in the `ZWESASTC` JCL and the `ZWESISTC` JCL.

  **Action:**
 
  When the Zowe STC userid has read access to the profile SAF `OMVSAPPL`, the `ZWESASTC` task will be able to successfully be started on an as-needed basis from `ZWESISTC`.
