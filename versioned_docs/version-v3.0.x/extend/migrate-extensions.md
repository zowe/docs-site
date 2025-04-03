# Migrating from Zowe V1 to Zowe V2

This doc guides you through migrating an existing Zowe server component from version 1 to version 2. 

To make Zowe server component compatible with Zowe version 2, you must update the following configurations.

- [Component manifest](#component-manifest)
- [Lifecycle scripts](#lifecycle-scripts)
- [Environment variables](#environment-variables)
- [Packaging one component deliverable for both Zowe v1 and v2](#packaging-one-component-deliverable-for-both-zowe-v1-and-v2)

## Component manifest

In Zowe v2, the component must define a manifest file and package it into the extension's root directory. This manifest file is used by Zowe to understand how this component should be installed, configured, and started. For detailed information of this file, see [Server Component Manifest File Reference](../appendix/server-component-manifest.md).

## Lifecycle scripts

In Zowe v2, lifecycle scripts can be located anywhere in your component directory. However, you must explicitly define them in the `commands` section of the component manifest file.

## Environment variables

Zowe v1 and v2 environment variables are not exact match. There are the following differences:

- Some variables in Zowe v1 are removed in v2. 
- Some are separated into two or more variables. 
- Zowe v2 defines more configuration options than v1.

Review the following table for a detailed mapping of Zowe v1 and v2 variables. 

| Zowe v1 Variable |  Zowe v2 YAML Configuration | Zowe v2 Variable | Notes |
| --- |  --- | --- | --- |
| `APIML_ALLOW_ENCODED_SLASHES` | `components.gateway.apiml.service.allowEncodedSlashes` | `ZWE_components_gateway_apiml_service_allowEncodedSlashes` | |
| `APIML_CORS_ENABLED` | `components.gateway.apiml.service.corsEnabled` | `ZWE_components_gateway_apiml_service_corsEnabled` | |
| `APIML_DEBUG_MODE_ENABLED` | `components.gateway.debug`, etc | `ZWE_components_gateway_debug`, etc | In v2, you can enable debug mode for APIML components separately. The `gateway` placeholder can be `discovery`, `api-catalog`, and so on. |
| `APIML_ENABLE_SSO` | Removed in v2 | Removed in v2 | |
| `APIML_GATEWAY_EXTERNAL_MAPPER` | `components.gateway.apiml.security.x509.externalMapperUrl` | `ZWE_components_gateway_apiml_security_x509_externalMapperUrl` | |
| `APIML_GATEWAY_INTERNAL_HOST` | Not configurable in v2 | Not configurable in v2 | |
| `APIML_GATEWAY_INTERNAL_PORT` | `components.gateway.server.internal.port` | `ZWE_components_gateway_server_internal_port` | |
| `APIML_GATEWAY_TIMEOUT_MILLIS` | `components.gateway.apiml.gateway.timeoutMillis` | `ZWE_components_gateway_apiml_gateway_timeoutMillis` | |
| `APIML_MAX_CONNECTIONS_PER_ROUTE` | `components.gateway.server.maxConnectionsPerRoute` | `ZWE_components_gateway_server_maxConnectionsPerRoute` | |
| `APIML_MAX_TOTAL_CONNECTIONS` | `components.gateway.server.maxTotalConnections` | `ZWE_components_gateway_server_maxTotalConnections` | |
| `APIML_PREFER_IP_ADDRESS` | Removed in v2 | Removed in v2 | |
| `APIML_SECURITY_AUTH_PROVIDER` | `components.gateway.apiml.security.auth.provider` | `ZWE_components_gateway_apiml_security_auth_provider` | |
| `APIML_SECURITY_AUTHORIZATION_ENDPOINT_URL` | `components.gateway.apiml.security.authorization.endpoint.url` | `ZWE_components_gateway_apiml_security_authorization_endpoint_url` | |
| `APIML_SECURITY_X509_ENABLED` | `components.gateway.apiml.security.x509.enabled` | `ZWE_components_gateway_apiml_security_x509_enabled` | |
| `APIML_SECURITY_ZOSMF_APPLID` | `zOSMF.applId` | `ZOSMF_APPLID` | |
| `CATALOG_PORT` | `components.api-catalog.port` | `ZWE_components_api_catalog_port` | |
| `DISCOVERY_PORT` | `components.discovery.port` | `ZWE_components_discovery_port` | |
| `EXTERNAL_CERTIFICATE_AUTHORITIES` | `zowe.certificate.pem.certificateAuthorities` | `ZWE_zowe_certificate_pem_certificateAuthorities` | |
| `EXTERNAL_COMPONENTS` | Removed in v2 | Removed in v2 | Zowe v2 configuration does not distinguish core components and extensions on how to enable them. They  use the same `components.<component>.enabled` configuration. |
| `GATEWAY_PORT` | `components.gateway.port` | `ZWE_components_gateway_port` | |
| `INSTANCE_DIR` | Removed in v2 | `ZWE_zowe_workspaceDirectory` or `ZWE_zowe_logDirectory` | The instance directory is split into workspace and logs directory in v2. |
| `JAVA_HOME` | `java.home` | `JAVA_HOME` | |
| `JES_EXPLORER_UI_PORT` | Removed in v2 | Removed in v2 | In v2, explorer-jes reuses the web server provided by App Server. It does not start independent web server. |
| `KEY_ALIAS` | `zowe.certificate.keystore.alias` | `ZWE_zowe_certificate_keystore_alias` | |
| `KEYSTORE_CERTIFICATE_AUTHORITY` | `zowe.certificate.pem.certificateAuthorities` | `ZWE_zowe_certificate_pem_certificateAuthorities` | |
| `KEYSTORE_CERTIFICATE` | `zowe.certificate.pem.certificate` | `ZWE_zowe_certificate_pem_certificate` | |
| `KEYSTORE_DIRECTORY` | `zowe.setup.certificate.pkcs12.directory` | `ZWE_zowe_setup_certificate_pkcs12_directory` | This is a setup variable in v2. It is optional and may not have a value if you manually prepare keystores by yourself. |
| `KEYSTORE_KEY` | `zowe.certificate.pem.key` | `ZWE_zowe_certificate_pem_key` | |
| `KEYSTORE_PASSWORD` | `zowe.certificate.keystore.password` and `zowe.certificate.truststore.password` | `ZWE_zowe_certificate_keystore_password` and `ZWE_zowe_certificate_truststore_password` | |
| `KEYSTORE_TYPE` | `zowe.certificate.keystore.type` and `zowe.certificate.truststore.type` | `ZWE_zowe_certificate_keystore_type` and `ZWE_zowe_certificate_truststore_type` | |
| `KEYSTORE` | `zowe.certificate.keystore.file` | `ZWE_zowe_certificate_keystore_file` | |
| `LAUNCH_COMPONENT_GROUPS` | Removed in v2 | Removed in v2 | Zowe v2 doesn't group several components together. It us suggested that you enable or disable component individually. |
| `MVS_EXPLORER_UI_PORT` | Removed in v2 | Removed in v2 | In v2, explorer-mvs reuses web server provided by App Server. It will not start independent web server. |
| `PKCS11_TOKEN_LABEL` | Removed in v2 | Removed in v2 | |
| `PKCS11_TOKEN_NAME` | Removed in v2 | Removed in v2 | |
| `ROOT_DIR` | `zowe.runtimeDirectory` | `ZWE_zowe_runtimeDirectory` | |
| `SKIP_NODE` | Removed in v2 | Removed in v2 | |
| `STATIC_DEF_CONFIG_DIR` | - | `ZWE_STATIC_DEFINITIONS_DIR` | Value is always `${ZWE_zowe_workspaceDirectory}/api-mediation/api-defs`. |
| `TRUSTSTORE` | `zowe.certificate.truststore.file` | `ZWE_zowe_certificate_truststore_file` | |
| `USS_EXPLORER_UI_PORT` | Removed in v2 | Removed in v2 | In v2, explorer-uss reuses web server provided by App Server. It does not start independent web server. |
| `ZOSMF_HOST` | `zOSMF.host` | `ZOSMF_HOST` | |
| `ZOSMF_PORT` | `zOSMF.port` | `ZOSMF_PORT` | |
| `ZOWE_APIM_NONSTRICT_VERIFY_CERTIFICATES` | `zowe.verifyCertificates` | `ZWE_zowe_verifyCertificates` | `zowe.verifyCertificates` has 3 options: `STRICT`, `NONSTRICT`, and `DISABLED`. |
| `ZOWE_APIM_VERIFY_CERTIFICATES` | `zowe.verifyCertificates` | `ZWE_zowe_verifyCertificates` | `zowe.verifyCertificates` has 3 options: `STRICT`, `NONSTRICT`, and `DISABLED`. |
| `ZOWE_EXPLORER_FRAME_ANCESTORS` | Removed in v2 | Removed in v2 | |
| `ZOWE_EXPLORER_HOST` | `zowe.externalDomains` or `haInstances.<ha-instance>.hostname` | `ZWE_zowe_externalDomains`, `ZWE_zowe_externalDomains_0`, `ZWE_haInstance_hostname` or `ZWE_haInstances_<ha-instance>_hostname` | Zowe v2 separates external domain name from internal host name. Choose the appropriate variable by northbound or southbound facing. |
| `ZOWE_INSTANCE` | Removed in v2 | Removed in v2 | Use `ZWE_zowe_job_prefix` or `ZWE_zowe_job_name` instead. |
| `ZOWE_IP_ADDRESS` | Removed in v2 | Removed in v2 | If you don't have a hostname but use IP to access Zowe, you can put IP into `zowe.externalDomains` |
| `ZOWE_PREFIX` | `zowe.job.prefix` | `ZWE_zowe_job_prefix` | The meaning of this variable is changed in v2. In v1, this combines with `ZOWE_INSTANCE` as the job prefix. In v2, `ZOWE_INSTANCE` is removed and this affects only the address space names under Zowe job. V2 variable `ZWE_zowe_job_name` defines the full job name for Zowe. |
| `ZOWE_ZLUX_SECURITY_TYPE` | - | - | (Coming soon) |
| `ZOWE_ZLUX_SERVER_HTTPS_PORT` | - | - | (Coming soon) |
| `ZOWE_ZLUX_SSH_PORT` | - | - | (Coming soon) |
| `ZOWE_ZLUX_TELNET_PORT` | - | - | (Coming soon) |
| `ZOWE_ZSS_SERVER_PORT` | - | - | (Coming soon) |
| `ZOWE_ZSS_SERVER_TLS` | - | - | (Coming soon) |
| `ZOWE_ZSS_XMEM_SERVER_NAME` | - | - | (Coming soon) |
| `ZWE_CACHING_EVICTION_STRATEGY` | `components.caching-service.storage.evictionStrategy` | `ZWE_components_caching_service_storage_evictionStrategy` | |
| `ZWE_CACHING_SERVICE_PERSISTENT` | `components.caching-service.storage.mode` | `ZWE_components_caching_service_storage_mode` | |
| `ZWE_CACHING_SERVICE_PORT` | `components.caching-service.port` | `ZWE_components_caching_service_port` | |
| `ZWE_CACHING_SERVICE_VSAM_DATASET` | `components.caching-service.storage.vsam.name` | `ZWE_components_caching_service_storage_vsam_name` | |
| `ZWE_CACHING_STORAGE_SIZE` | `components.caching-service.storage.size` | `ZWE_components_caching_service_storage_size` | |
| `ZWE_DISCOVERY_SERVICES_LIST` | - | `ZWE_DISCOVERY_SERVICES_LIST` | |
| `ZWE_DISCOVERY_SERVICES_REPLICAS` | `components.discovery.replicas` | `ZWE_components_discovery_replicas` | This is only available for Zowe Kubernetes deployment. |
| `ZWE_EXTENSION_DIR` | `zowe.extensionDirectory` | `ZWE_zowe_extensionDirectory` | |
| `ZWE_EXTERNAL_HOSTS` | `zowe.externalDomains` | `ZWE_zowe_externalDomains` | |
| `ZWE_EXTERNAL_PORT` | `zowe.externalPort` | `ZWE_zowe_externalPort` | |
| `ZWE_LAUNCH_COMPONENTS` | Combined information of `components.<component>.enabled` with value of `true` | `ZWE_ENABLED_COMPONENTS` or `ZWE_LAUNCH_COMPONENTS` | Depends on the purpose, in v2, `ZWE_ENABLED_COMPONENTS` are list of components with `enabled` status `true`. `ZWE_LAUNCH_COMPONENTS` in v2 is a subset of `ZWE_ENABLED_COMPONENTS` which components also have `commands.start` lifecycle script. |
| `ZWE_LOG_LEVEL_ZWELS` | `zowe.launchScript.logLevel` | `ZWE_zowe_launchScript_logLevel` | |
| `ZWEAD_EXTERNAL_STATIC_DEF_DIRECTORIES` | Removed in v2 | Removed in v2 | Use `ZWE_STATIC_DEFINITIONS_DIR` instead. |
| `ZWES_ZIS_LOADLIB` | `zowe.setup.dataset.authLoadlib` | `ZWE_zowe_setup_dataset_authLoadlib` | |
| `ZWES_ZIS_PARMLIB_MEMBER` | - | - | |
| `ZWES_ZIS_PARMLIB` | `zowe.setup.dataset.parmlib` | `ZWE_zowe_setup_dataset_parmlib` | |
| `ZWES_ZIS_PLUGINLIB` | `zowe.setup.dataset.authPluginLib` | `ZWE_zowe_setup_dataset_authPluginLib` | |


## Packaging one component deliverable for both Zowe v1 and v2

It is recommended that you create a dedicated package of extensions for Zowe v2, which is the most straight-forward way to address all of the breaking changes introduced in v2. We understand that this method presents the challenge of maintaining two sets of packages. If you prefer not to maintain two sets of packages, it's still possible to maintain one version of an extension which works for both Zowe v1 and v2. However, the lifecycle code will be complicated and in this case, comprehensive testing should be performed. 

:::caution

The Zowe v2 App Framework desktop is upgraded from Angular version 6 to angular version 12 for support and security -  websites have a "1 version of a library" limitation. This means that plug-ins dependent upon Angular must be coded for either v6 or v12 [not both] thus the single version approach is not applicable.

:::

If the lifecycle scripts are the main concern, the following steps outline requirements and recommendations for the single version approach:

- Packaging `manifest.yaml` is required. This is a hard requirement for Zowe v2. If you define lifecycle scripts with default names, for example, use `bin/start.sh` as `commands.start`, it should work for v1.
- Revisit all environment variables used in the lifecycle scripts and apply fallback variables. For example, if you use `$ROOT_DIR` in Zowe v1, this should be changed to `${ZWE_zowe_runtimeDirectory:-${ROOT_DIR}}` to make it compatible with both versions. Other variables like `$EXPLORER_HOST` should be changed to `${ZWE_haInstance_hostname:-${EXPLORER_HOST}}` or `${ZWE_externalDomains_0:-${EXPLORER_HOST}}` based on purpose.
- In Zowe v2, we recommend you to define extension configurations in the manifest.yaml `configs` section and use `${ZWE_configs_*}` variables to access them. This feature does not exist in Zowe v1. So if you use `${ZWE_configs_*}` variables, it should fall back to the matching environment variable used in v1.
- In Zowe v2, we recommend you to define a `commands.install` lifecycle script to handle extension installation. This lifecycle script will be executed by `zwe components install`. In v1, this also exists if you use the `zowe-install-components.sh` utility to install a Zowe extension. So if you want one extension package to work for both Zowe v1 and v2, this install lifecycle script should also be compatible with both v1 and v2. <!--Or consider not using `zowe-install-components.sh` with Zowe v1.-->
- A new v2 variable `${ZWE_VERSION}` may help you determine the Zowe version number. This variable does not exist in Zowe v1. By knowing the Zowe version, the lifecycle scripts can implement logic to source v1 or v2 dedicated scripts to avoid handling fallbacks in the same script. This could help avoid complicated compatibility version checks, and it could be easier in the future if you decide to drop Zowe v1.
