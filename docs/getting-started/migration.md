# Migration from Zowe v1.x

## Component packaging and lifecycle scripts

To make component compatible with Zowe version 2, there are several changes should be applied.

### Component manifest

Component must define a manifest file and package it into the extension root directory. This manifest file is used by Zowe to understand how this component should be installed, configured, and started. For detail references of this file, please check [Server Component Manifest File Reference](../appendix/server-component-manifest.md).

### Lifecycle scripts

With Zowe v2, lifecycle scripts can be located anywhere in your component directory, but they must be explicitly defined in `commands` section of component manifest file.

### Environment variables

Please be aware that Zowe v1 and v2 environment variables are not one-to-one match. Some variables in Zowe v1 are removed completely, some are separated into 2 or more variables. Please check below mapping table of Zowe v1 and v2 variables.

FIXME: jack

| Zowe v1 Variable |  Zowe v2 YAML Configuration | Zowe v2 Variable | Notes |
| --- |  --- | --- | --- |
| `APIML_ALLOW_ENCODED_SLASHES` | `zowe.` | `ZWE_` | |
| `APIML_CORS_ENABLED` | `zowe.` | `ZWE_` | |
| `APIML_DEBUG_MODE_ENABLED` | `zowe.` | `ZWE_` | |
| `APIML_ENABLE_SSO` | `zowe.` | `ZWE_` | |
| `APIML_GATEWAY_EXTERNAL_MAPPER` | `zowe.` | `ZWE_` | |
| `APIML_GATEWAY_INTERNAL_HOST` | `zowe.` | `ZWE_` | |
| `APIML_GATEWAY_INTERNAL_PORT` | `zowe.` | `ZWE_` | |
| `APIML_GATEWAY_TIMEOUT_MILLIS` | `zowe.` | `ZWE_` | |
| `APIML_MAX_CONNECTIONS_PER_ROUTE` | `zowe.` | `ZWE_` | |
| `APIML_MAX_TOTAL_CONNECTIONS` | `zowe.` | `ZWE_` | |
| `APIML_PREFER_IP_ADDRESS` | `zowe.` | `ZWE_` | |
| `APIML_SECURITY_AUTH_PROVIDER` | `zowe.` | `ZWE_` | |
| `APIML_SECURITY_AUTHORIZATION_ENDPOINT_URL` | `zowe.` | `ZWE_` | |
| `APIML_SECURITY_X509_ENABLED` | `zowe.` | `ZWE_` | |
| `APIML_SECURITY_ZOSMF_APPLID` | `zowe.` | `ZWE_` | |
| `CATALOG_PORT` | `zowe.` | `ZWE_` | |
| `DISCOVERY_PORT` | `zowe.` | `ZWE_` | |
| `EXTERNAL_CERTIFICATE_AUTHORITIES` | `zowe.` | `ZWE_` | |
| `EXTERNAL_COMPONENTS` | `zowe.` | `ZWE_` | |
| `EXTERNAL_COMPONENTS` | `zowe.` | `ZWE_` | |
| `FILES_API_PORT` | `zowe.` | `ZWE_` | |
| `GATEWAY_PORT` | `zowe.` | `ZWE_` | |
| `JAVA_HOME` | `zowe.` | `ZWE_` | |
| `JES_EXPLORER_UI_PORT` | `zowe.` | `ZWE_` | |
| `JOBS_API_PORT` | `zowe.` | `ZWE_` | |
| `KEY_ALIAS` | `zowe.` | `ZWE_` | |
| `KEYSTORE_CERTIFICATE_AUTHORITY` | `zowe.` | `ZWE_` | |
| `KEYSTORE_CERTIFICATE` | `zowe.` | `ZWE_` | |
| `KEYSTORE_DIRECTORY` | `zowe.` | `ZWE_` | |
| `KEYSTORE_KEY` | `zowe.` | `ZWE_` | |
| `KEYSTORE_PASSWORD` | `zowe.` | `ZWE_` | |
| `KEYSTORE_TYPE` | `zowe.` | `ZWE_` | |
| `KEYSTORE` | `zowe.` | `ZWE_` | |
| `LAUNCH_COMPONENT_GROUPS` | `zowe.` | `ZWE_` | |
| `MVS_EXPLORER_UI_PORT` | `zowe.` | `ZWE_` | |
| `PKCS11_TOKEN_LABEL` | `zowe.` | `ZWE_` | |
| `PKCS11_TOKEN_NAME` | `zowe.` | `ZWE_` | |
| `ROOT_DIR` | `zowe.` | `ZWE_` | |
| `SKIP_NODE` | `zowe.` | `ZWE_` | |
| `STATIC_DEF_CONFIG_DIR` | `zowe.` | `ZWE_` | |
| `TRUSTSTORE` | `zowe.` | `ZWE_` | |
| `USS_EXPLORER_UI_PORT` | `zowe.` | `ZWE_` | |
| `ZOSMF_HOST` | `zowe.` | `ZWE_` | |
| `ZOSMF_PORT` | `zowe.` | `ZWE_` | |
| `ZOWE_APIM_NONSTRICT_VERIFY_CERTIFICATES` | `zowe.` | `ZWE_` | |
| `ZOWE_APIM_VERIFY_CERTIFICATES` | `zowe.` | `ZWE_` | |
| `ZOWE_EXPLORER_FRAME_ANCESTORS` | `zowe.` | `ZWE_` | |
| `ZOWE_EXPLORER_HOST` | `zowe.` | `ZWE_` | |
| `ZOWE_INSTANCE` | `zowe.` | `ZWE_` | |
| `ZOWE_IP_ADDRESS` | `zowe.` | `ZWE_` | |
| `ZOWE_LOOPBACK_ADDRESS` | `zowe.` | `ZWE_` | |
| `ZOWE_PREFIX` | `zowe.` | `ZWE_` | |
| `ZOWE_ZLUX_SECURITY_TYPE` | `zowe.` | `ZWE_` | |
| `ZOWE_ZLUX_SERVER_HTTPS_PORT` | `zowe.` | `ZWE_` | |
| `ZOWE_ZLUX_SSH_PORT` | `zowe.` | `ZWE_` | |
| `ZOWE_ZLUX_TELNET_PORT` | `zowe.` | `ZWE_` | |
| `ZOWE_ZSS_SERVER_PORT` | `zowe.` | `ZWE_` | |
| `ZOWE_ZSS_SERVER_TLS` | `zowe.` | `ZWE_` | |
| `ZOWE_ZSS_XMEM_SERVER_NAME` | `zowe.` | `ZWE_` | |
| `ZWE_CACHING_EVICTION_STRATEGY` | `zowe.` | `ZWE_` | |
| `ZWE_CACHING_SERVICE_PERSISTENT` | `zowe.` | `ZWE_` | |
| `ZWE_CACHING_SERVICE_PORT` | `zowe.` | `ZWE_` | |
| `ZWE_CACHING_SERVICE_VSAM_DATASET` | `zowe.` | `ZWE_` | |
| `ZWE_CACHING_STORAGE_SIZE` | `zowe.` | `ZWE_` | |
| `ZWE_DISCOVERY_SERVICES_LIST` | `zowe.` | `ZWE_` | |
| `ZWE_DISCOVERY_SERVICES_REPLICAS` | `zowe.` | `ZWE_` | |
| `ZWE_EXTENSION_DIR` | `zowe.` | `ZWE_` | |
| `ZWE_EXTERNAL_HOSTS` | `zowe.` | `ZWE_` | |
| `ZWE_EXTERNAL_PORT` | `zowe.` | `ZWE_` | |
| `ZWE_LAUNCH_COMPONENTS` | `zowe.` | `ZWE_` | |
| `ZWE_LOG_LEVEL_ZWELS` | `zowe.` | `ZWE_` | |
| `ZWE_REFERRER_HOSTS` | `zowe.` | `ZWE_` | |
| `ZWEAD_EXTERNAL_STATIC_DEF_DIRECTORIES` | `zowe.` | `ZWE_` | |
| `ZWES_ZIS_LOADLIB` | `zowe.` | `ZWE_` | |
| `ZWES_ZIS_PARMLIB_MEMBER` | `zowe.` | `ZWE_` | |
| `ZWES_ZIS_PARMLIB` | `zowe.` | `ZWE_` | |
| `ZWES_ZIS_PLUGINLIB` | `zowe.` | `ZWE_` | |


### Packaging one component deliverable for both Zowe v1 and v2

We recommend extensions create a dedicated package for Zowe v2 - this is the most straight-forward way to address all of the breaking changes. We recognize this presents the challenge of maintaining 2 sets of packages. If you prefer not to maintain 2 sets of packages, we believe it's possible to maintain one version of an extension which works for both Zowe v1 and v2. However, the lifecycle code will be complicated - comprehensive testing should be performed. 

PLEASE BE AWARE The Zowe V2 app framework desktop upgraded from angular version 6 to angular version 12 for support & security -  websites have  a "1 version of a library" limitation. This means that plugins dependent upon angular must be coded for either v6 or v12 [not both] thus the single version approach is not applicable.

If the lifecycle scripts are the main concern, the following steps outline requirements and our recommendations for the single version approach:

- Package manifest.yaml is required. This is a hard requirement for Zowe v2. If you define lifecycle scripts with default names, for example, use bin/start.sh as `commands.start`, it should work for v1.
- Revisit all environment variables used in the lifecycle scripts and apply fallback variables. For example, if you use $ROOT_DIR in Zowe v1, this should be changed to ${ZWE_zowe_runtimeDirectory:-${ROOT_DIR}} to make it compatible with both versions. Other variables like $EXPLORER_HOST should be changed to ${ZWE_haInstance_hostname:-${EXPLORER_HOST}} or ${ZWE_externalDomains_0:-${EXPLORER_HOST}} based on purpose.
- A Zowe v2 recommendation is defining extension configurations in the  manifest.yaml "configs" section and use ${ZWE_configs_*} variables to access them. This feature does not exist in Zowe v1. So if you use ${ZWE_configs_*} variables, it should fall back to the matching environment variable used in v1.
- For installation, Zowe v2 recommends defining a "commands.install" lifecycle script to handle Extension installation. This lifecycle script will be executed by `zwe components install`. In v1, this also exists if the end-user uses zowe-install-components.sh utility to install an Extension. So if we consider one Extension package working for both Zowe v1 and v2, this install lifecycle script should also be compatible with both v1 and v2. Or consider instructing the user to not use zowe-install-components.sh with Zowe v1.
- As discussed in slack, a new v2 variable ${ZWE_VERSION} may help you determine if the user is using Zowe v2 or v1. This variable does not exist in Zowe v1.
  * By knowing the Zowe version, the lifecycle scripts can implement logic to source v1 or v2 dedicated scripts to avoid handling fallbacks in the same script. This could be a cleaner way to avoid complicated compatibility version checks, and it could be easier in the future should you decide to drop Zowe v1 support.
