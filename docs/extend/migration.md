# Migration Zowe v1.x component to v2.x

## Server component packaging and lifecycle scripts

To make Zowe server component compatible with Zowe version 2, there are several changes should be applied.

### Component manifest

Component must define a manifest file and package it into the extension root directory. This manifest file is used by Zowe to understand how this component should be installed, configured, and started. For detail references of this file, please check [Server Component Manifest File Reference](../appendix/server-component-manifest.md).

### Lifecycle scripts

With Zowe v2, lifecycle scripts can be located anywhere in your component directory, but they must be explicitly defined in `commands` section of component manifest file.

### Environment variables

Please be aware that Zowe v1 and v2 environment variables are not one-to-one match. Some variables in Zowe v1 are removed completely, some are separated into 2 or more variables, and v2 defines more configuration options than v1. Please check below mapping table of Zowe v1 and v2 variables.

| Zowe v1 Variable |  Zowe v2 YAML Configuration | Zowe v2 Variable | Notes |
| --- |  --- | --- | --- |
| `APIML_ALLOW_ENCODED_SLASHES` | `components.gateway.apiml.service.allowEncodedSlashes` | `ZWE_components_gateway_apiml_service_allowEncodedSlashes` | |
| `APIML_CORS_ENABLED` | `components.gateway.apiml.service.corsEnabled` | `ZWE_components_gateway_apiml_service_corsEnabled` | |
| `APIML_DEBUG_MODE_ENABLED` | `components.gateway.debug`, etc | `ZWE_components_gateway_debug`, etc | In v2, you can enabled debug mode for APIML components separately. The `gateway` place holder can be `discovery`, `api-catalog`, or `metrics-service`, etc. |
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
| `EXTERNAL_COMPONENTS` | Removed in v2 | Removed in v2 | Zowe v2 configuration does not distinguish core components and extensions on how to enable them. They all use same `components.<component>.enabled` configuration. |
| `FILES_API_PORT` | `components.files-api.port` | `ZWE_components_files_api_port` | |
| `GATEWAY_PORT` | `components.gateway.port` | `ZWE_components_gateway_port` | |
| `INSTANCE_DIR` | Removed in v2 | `ZWE_zowe_workspaceDirectory` or `ZWE_zowe_logDirectory` | Instance directory has been broken down into workspace and logs directory in v2. |
| `JAVA_HOME` | `java.home` | `JAVA_HOME` | |
| `JES_EXPLORER_UI_PORT` | Removed in v2 | Removed in v2 | In v2, explorer-jes re-uses web server provided by App Server, will not start independent web server. |
| `JOBS_API_PORT` | `components.jobs-api.port` | `ZWE_components_jobs_api_port` | |
| `KEY_ALIAS` | `zowe.certificate.keystore.alias` | `ZWE_zowe_certificate_keystore_alias` | |
| `KEYSTORE_CERTIFICATE_AUTHORITY` | `zowe.certificate.pem.certificateAuthorities` | `ZWE_zowe_certificate_pem_certificateAuthorities` | |
| `KEYSTORE_CERTIFICATE` | `zowe.certificate.pem.certificate` | `ZWE_zowe_certificate_pem_certificate` | |
| `KEYSTORE_DIRECTORY` | `zowe.setup.certificate.pkcs12.directory` | `ZWE_zowe_setup_certificate_pkcs12_directory` | This is a setup variable in v2, it is optional and may not have a value if the end-user manually prepares keystores by themselves. |
| `KEYSTORE_KEY` | `zowe.certificate.pem.key` | `ZWE_zowe_certificate_pem_key` | |
| `KEYSTORE_PASSWORD` | `zowe.certificate.keystore.password` and `zowe.certificate.truststore.password` | `ZWE_zowe_certificate_keystore_password` and `ZWE_zowe_certificate_truststore_password` | |
| `KEYSTORE_TYPE` | `zowe.certificate.keystore.type` and `zowe.certificate.truststore.type` | `ZWE_zowe_certificate_keystore_type` and `ZWE_zowe_certificate_truststore_type` | |
| `KEYSTORE` | `zowe.certificate.keystore.file` | `ZWE_zowe_certificate_keystore_file` | |
| `LAUNCH_COMPONENT_GROUPS` | Removed in v2 | Removed in v2 | Zowe v2 doesn't group several components together. Enable or disable individual component is suggested. |
| `MVS_EXPLORER_UI_PORT` | Removed in v2 | Removed in v2 | In v2, explorer-mvs re-uses web server provided by App Server, will not start independent web server. |
| `PKCS11_TOKEN_LABEL` | Removed in v2 | Removed in v2 | |
| `PKCS11_TOKEN_NAME` | Removed in v2 | Removed in v2 | |
| `ROOT_DIR` | `zowe.runtimeDirectory` | `ZWE_zowe_runtimeDirectory` | |
| `SKIP_NODE` | Removed in v2 | Removed in v2 | |
| `STATIC_DEF_CONFIG_DIR` | - | `ZWE_STATIC_DEFINITIONS_DIR` | Value is always `${ZWE_zowe_workspaceDirectory}/api-mediation/api-defs`. |
| `TRUSTSTORE` | `zowe.certificate.truststore.file` | `ZWE_zowe_certificate_truststore_file` | |
| `USS_EXPLORER_UI_PORT` | Removed in v2 | Removed in v2 | In v2, explorer-uss re-uses web server provided by App Server, will not start independent web server. |
| `ZOSMF_HOST` | `zOSMF.host` | `ZOSMF_HOST` | |
| `ZOSMF_PORT` | `zOSMF.port` | `ZOSMF_PORT` | |
| `ZOWE_APIM_NONSTRICT_VERIFY_CERTIFICATES` | `zowe.verifyCertificates` | `ZWE_zowe_verifyCertificates` | `zowe.verifyCertificates` has 3 options: `STRICT`, `NONSTRICT`, and `DISABLED`. |
| `ZOWE_APIM_VERIFY_CERTIFICATES` | `zowe.verifyCertificates` | `ZWE_zowe_verifyCertificates` | `zowe.verifyCertificates` has 3 options: `STRICT`, `NONSTRICT`, and `DISABLED`. |
| `ZOWE_EXPLORER_FRAME_ANCESTORS` | Removed in v2 | Removed in v2 | |
| `ZOWE_EXPLORER_HOST` | `zowe.externalDomains` or `haInstances.<ha-instance>.hostname` | `ZWE_zowe_externalDomains`, `ZWE_zowe_externalDomains_0`, `ZWE_haInstance_hostname` or `ZWE_haInstances_<ha-instance>_hostname` | Zowe v2 separate external domain name from internal host name. Choose the appropriate variable by northbound or southbound facing. |
| `ZOWE_INSTANCE` | Removed in v2 | Removed in v2 | Use `ZWE_zowe_job_prefix` or `ZWE_zowe_job_name` instead. |
| `ZOWE_IP_ADDRESS` | Removed in v2 | Removed in v2 | If you don't have a hostname but using IP to access Zowe, you can put IP into `zowe.externalDomains` |
| `ZOWE_PREFIX` | `zowe.job.prefix` | `ZWE_zowe_job_prefix` | The meaning of this variable changed in v2. In v1, this combine with `ZOWE_INSTANCE` makes job prefix. In v2, `ZOWE_INSTANCE` is removed and this only affects the address space names under Zowe job. V2 variable `ZWE_zowe_job_name` defines the full job name for Zowe. |
| `ZOWE_ZLUX_SECURITY_TYPE` | - | - | |
| `ZOWE_ZLUX_SERVER_HTTPS_PORT` | - | - | |
| `ZOWE_ZLUX_SSH_PORT` | - | - | |
| `ZOWE_ZLUX_TELNET_PORT` | - | - | |
| `ZOWE_ZSS_SERVER_PORT` | - | - | |
| `ZOWE_ZSS_SERVER_TLS` | - | - | |
| `ZOWE_ZSS_XMEM_SERVER_NAME` | - | - | |
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
| `ZWES_ZIS_LOADLIB` | `zowe.setup.mvs.authLoadlib` | `ZWE_zowe_setup_mvs_authLoadlib` | |
| `ZWES_ZIS_PARMLIB_MEMBER` | - | - | |
| `ZWES_ZIS_PARMLIB` | `zowe.setup.mvs.parmlib` | `ZWE_setup_mvs_parmlib` | |
| `ZWES_ZIS_PLUGINLIB` | `zowe.setup.mvs.authPluginLib` | `ZWE_zowe_setup_mvs_authPluginLib` | |


### Packaging one component deliverable for both Zowe v1 and v2

We recommend extensions create a dedicated package for Zowe v2 - this is the most straight-forward way to address all of the breaking changes. We recognize this presents the challenge of maintaining 2 sets of packages. If you prefer not to maintain 2 sets of packages, we believe it's possible to maintain one version of an extension which works for both Zowe v1 and v2. However, the lifecycle code will be complicated - comprehensive testing should be performed. 

**PLEASE BE AWARE** The Zowe V2 app framework desktop upgraded from angular version 6 to angular version 12 for support & security -  websites have  a "1 version of a library" limitation. This means that plugins dependent upon angular must be coded for either v6 or v12 [not both] thus the single version approach is not applicable.

If the lifecycle scripts are the main concern, the following steps outline requirements and our recommendations for the single version approach:

- Package manifest.yaml is required. This is a hard requirement for Zowe v2. If you define lifecycle scripts with default names, for example, use bin/start.sh as `commands.start`, it should work for v1.
- Revisit all environment variables used in the lifecycle scripts and apply fallback variables. For example, if you use `$ROOT_DIR` in Zowe v1, this should be changed to `${ZWE_zowe_runtimeDirectory:-${ROOT_DIR}}` to make it compatible with both versions. Other variables like `$EXPLORER_HOST` should be changed to `${ZWE_haInstance_hostname:-${EXPLORER_HOST}}` or `${ZWE_externalDomains_0:-${EXPLORER_HOST}}` based on purpose.
- A Zowe v2 recommendation is defining extension configurations in the manifest.yaml `configs` section and use `${ZWE_configs_*}` variables to access them. This feature does not exist in Zowe v1. So if you use `${ZWE_configs_*}` variables, it should fall back to the matching environment variable used in v1.
- For installation, Zowe v2 recommends defining a `commands.install` lifecycle script to handle Extension installation. This lifecycle script will be executed by `zwe components install`. In v1, this also exists if the end-user uses `zowe-install-components.sh` utility to install an Extension. So if we consider one Extension package working for both Zowe v1 and v2, this install lifecycle script should also be compatible with both v1 and v2. Or consider instructing the user to not use `zowe-install-components.sh` with Zowe v1.
- As discussed in slack, a new v2 variable `${ZWE_VERSION}` may help you determine if the user is using Zowe v2 or v1. This variable does not exist in Zowe v1.
  * By knowing the Zowe version, the lifecycle scripts can implement logic to source v1 or v2 dedicated scripts to avoid handling fallbacks in the same script. This could be a cleaner way to avoid complicated compatibility version checks, and it could be easier in the future should you decide to drop Zowe v1 support.
