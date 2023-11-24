# AT-TLS Configuration for API Mediation Layer

The communication server on z/OS provides a functionality to encrypt HTTP communication for on-platform running jobs. This functionality is refered to as Application Transparent Transport Layer Security (AT-TLS). Starting with Zowe version 1.24, it is possible to leverage AT-TLS within the API Mediation Layer. Each API ML component can run with AT-TLS rules applied. Some components, such as the Discovery service, can be made AT-TLS aware by enabling the AT-TLS profile, whereby TLS information can be utilized. Such information could be a client certificate. To enable the AT-TLS profile and disable the TLS application in API ML, update `zowe.yaml` with following values under the respective component in the `components` section:
```
components.*.spring.profiles.active=attls
components.*.server.ssl.enabled=false
components.*.server.internal.ssl.enabled=false
```
While API ML can not handle TLS on its own, the Mediation Layer needs information about the server certificate that is defined in the AT-TLS rule. Update the `zowe.yaml` file for each respective APIML component in the `components` sections with the path to the SAF Key ring from the AT-TLS rule and specify the alias that is used for Inbound communication:
```
components.*.certificate.keystore.file=<SAF-key-ring-from-AT-TLS-rule>
components.*.certificate.keystore.type=JCERACFKS
components.*.certificate.keystore.password=<keyring-password>
components.*.certificate.keystore.alias=<certificate-alias-from-AT-TLS-rule>
```
**Note:** This procedure does not configure AT-TLS on z/OS, but rather enables API ML to work with AT-TLS in place.