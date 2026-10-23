# Zowe server 3.6.0

Welcome to the Zowe server 3.6.0 release!

See [New features and enhancements](#new-features-and-enhancements) for a full list of changes to the functionality. See [Bug fixes](#bug-fixes) for a list of issues addressed in this release.

For upgrade instructions, see [Upgrading from 3.5.x to 3.6.x](../../upgrade/upgrading-zowe.md#upgrading-from-35x-to-36x).

**Download v3.6.0 build**: Want to try new features as soon as possible? You can download the v3.6.0 build from [Zowe.org](https://www.zowe.org/download.html).

The release schedule is available at the [Zowe release stream](https://www.zowe.org/vnext) at Zowe.org.

## New features and enhancements

Zowe server 3.6.0 contains the enhancements that are described in the following topics.

### Zowe installation and packaging

- Added the `zowe.network.allowedDomains` property. API Mediation Layer uses it to validate the hostnames, IP addresses, and CIDR ranges in service registration metadata. Defaults include `zowe.network.server.externalDomains` and the `haInstances` hostnames. For more information, see [Configuring allowed domains and IP addresses for service registration](../../user-guide/api-mediation/config-allowed-domains-for-service-reg.md). ([#4801](https://github.com/zowe/zowe-install-packaging/pull/4801))
- Added the `zwe validate zosmf jwt` command, which checks that the z/OSMF JWT is usable when Zowe is configured to use z/OSMF JWT authentication. The check runs at startup, and its behavior is controlled by `zowe.launchScript.startupChecks.zosmfjwt` (`exit`, `warn`, or `disabled`; default `exit`). ([#4727](https://github.com/zowe/zowe-install-packaging/pull/4727))
- At startup in high availability (HA) mode, Zowe now writes a merged configuration file for each HA instance, `.zowe-<haInstance>-merged.yaml`, to the workspace `.env` directory. Its location is available in the `ZWE_HA_INSTANCE_CONFIG` environment variable. ([#4759](https://github.com/zowe/zowe-install-packaging/pull/4759))
- `zwe init certificate` now generates random passwords for PKCS#12 keystores when `zowe.setup.certificate.pkcs12.password` or `zowe.setup.certificate.pkcs12.caPassword` is left at the default value, instead of using the literal default. Keyring scenarios are not affected. Update any automation that relies on the default password. ([#4866](https://github.com/zowe/zowe-install-packaging/pull/4866))
- Added the API Mediation Layer logging level configuration, `components.apiml.logging.level`, to `example-zowe.yaml`. ([#4827](https://github.com/zowe/zowe-install-packaging/pull/4827))
- Improved the handling of temporary files and directories. ([#4820](https://github.com/zowe/zowe-install-packaging/pull/4820))
- Updated the PSWI workflow sequence. ([#4854](https://github.com/zowe/zowe-install-packaging/pull/4854))
- Log files created by `zwe` commands now have restricted permissions. ([#4807](https://github.com/zowe/zowe-install-packaging/pull/4807))

### API Mediation Layer

- Requests to the `/application/info` and `/application/version` endpoints now require authentication. Unauthenticated requests receive HTTP 401. To update your monitoring, see [Configuring health check, information, and version endpoint protection](../../user-guide/api-mediation/configuration-health-endpoint-protection.md). ([#4917](https://github.com/zowe/api-layer/pull/4917))
- Added the `storage.infinispan.useVirtualThreads` property for the Infinispan virtual threads feature, which requires Java 21 or later. The default is `false`. ([#4731](https://github.com/zowe/api-layer/pull/4731))
- Removed the Spring profile `https`. ([#4933](https://github.com/zowe/api-layer/pull/4933))

## Bug fixes

- Fixed the passwords that were exposed in process arguments or logs by `zwe` commands. ([#4883](https://github.com/zowe/zowe-install-packaging/pull/4883))
- Fixed the safkeyring URL used by `zwe validate certificate`, which caused a protocol error on IBM Java 17 and 21. ([#4795](https://github.com/zowe/zowe-install-packaging/pull/4795))
