# Overview

Zowe has high availability feature built-in. This doc guides you through the configuration steps to enable this feature.

## Enable high availability when Zowe runs in Sysplex

- Sysplex is required to make sure multiple Zowe instances can work together. Check [Configuring Sysplex for high availability](./configure-sysplex) for more details.
- z/OSMF is an optional prerequisite of Zowe. If your Zowe instance works with z/OSMF, it's recommended to [configure z/OSMF for high availability in Sysplex](./systemrequirements-zosmf-ha).
- The `haInstances` section must be defined in the Zowe YAML configuration. Check [Zowe YAML Configuration File Reference](../appendix/zowe-yaml-configuration.md) for more details.
- Zowe caching service is required to convert stateful component to stateless component. Check [Configuring the Caching Service for HA](./configure-caching-service-ha) for details.

### Known limitations

- To allow Sysplex Distributor to route traffic to the Gateway, you can only start one Gateway in each LPAR within the Sysplex. All Gateways instances should be started on the same port configured on Sysplex Distributor.
- Zowe App Server should be accessed through the Gateway with a URL like `https://<dvipa-domain>:<external-port>/zlux/ui/v1`.

## Enable high availability when Zowe runs in Kubernetes

If you deploy Zowe into Kubernetes, all components can also achieve high availability if you enable more than one replicas for each component.

- [HorizontalPodAutoscaler](./k8s-config#horizontalpodautoscaler) is recommanded to let Kubernetes scales the component based on workdload.
- [PodDisruptionBudget](./k8s-config#poddisruptionbudget) is recommended to let Kubernetes automatically handles disruptions like upgrade.
