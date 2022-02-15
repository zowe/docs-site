# Zowe high availability overview

Zowe has high availability feature build-in, but there are configuration steps need to be done to enable it properly.

## Enable high availability when Zowe is running in Sysplex

- Sysplex is required to make sure multiple Zowe instances can work together. Check [Configuring Sysplex for high availability](./configure-sysplex) for more details.
- z/OSMF is an optional prerequisite of Zowe. If your Zowe instance works with z/OSMF, it's recommended to [Configuring z/OSMF for high availability in Sysplex](./systemrequirements-zosmf-ha).
- `haInstances` section must be defined in Zowe YAML configuration. Check [Zowe YAML Configuration File Reference](../appendix/zowe-yaml-configuration.md) for more details.
- Zowe caching service is required to convert stateful component to stateless. Check [Configuring the Caching Service for HA](./configure-caching-service-ha) for details.

### Known limitations

- To allow Sysplex Distributor to route traffic to the Gateway, you can only start one Gateway in each LPAR within the Sysplex. All Gateways instances should be started on the same port configured on Sysplex Distributor.
- Zowe App Server should be accessed through the Gateway with a URL like `https://<dvipa-domain>:<external-port>/zlux/ui/v1`.

## High availability explained when Zowe is running in Kubernetes

FIXME: jack
