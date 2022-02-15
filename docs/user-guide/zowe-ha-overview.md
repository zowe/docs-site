# Zowe high availability overview

Zowe has high availability feature build-in, but there are configuration steps need to be done to enable it properly.

- Sysplex is required to make sure multiple Zowe instances can work together. Check [Configuring Sysplex for high availability](./configure-sysplex) for more details.
- z/OSMF is an optional prerequisite of Zowe. If your Zowe instance works with z/OSMF, it's recommended to [Configuring z/OSMF for high availability in Sysplex](./systemrequirements-zosmf-ha).
- `haInstances` section must be defined in Zowe YAML configuration. Check [Zowe YAML Configuration File Reference](../appendix/zowe-yaml-configuration.md) for more details.
- Zowe caching service is required to convert stateful component to stateless. Check [Configuring the Caching Service for HA](./configure-caching-service-ha) for details.
