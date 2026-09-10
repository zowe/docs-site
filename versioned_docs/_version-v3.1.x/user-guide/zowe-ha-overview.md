# Configuring high availability (optional)

Zowe has a high availability feature built-in.
For Zowe in a high availability configuration, one workspace directory is required. This workspace directory must be created on a shared file system (zFS directory) which all LPARs in a Sysplex can access. Review this article and the following articles in this section for the configuration steps to enable the high availability feature. Note that configuring high availability is optional.

:::info Required role: system programmer
:::

## Enable high availability when Zowe runs in Sysplex

- Sysplex is required to make sure multiple Zowe instances can work together. Check [Configuring Sysplex for high availability](./configure-sysplex.md) for more details.
- z/OSMF is an optional prerequisite of Zowe. If your Zowe instance works with z/OSMF, it's recommended to [configure z/OSMF for high availability in Sysplex](./systemrequirements-zosmf-ha.md).
- The `haInstances` section must be defined in the Zowe YAML configuration. Check [Zowe YAML Configuration File Reference](../appendix/zowe-yaml-configuration.md) for more details.
- Zowe caching service is required to convert stateful component to stateless component. Check [Configuring the Caching Service for HA](./configure-caching-service-ha.md) for details.

### Known limitations

- To allow Sysplex Distributor to route traffic to the Gateway, you can only start one Gateway in each LPAR within the Sysplex. All Gateways instances should be started on the same port configured on Sysplex Distributor.
- Zowe App Server should be accessed through the Gateway with a URL like `https://<dvipa-domain>:<external-port>/zlux/ui/v1`.

## Enable high availability when Zowe runs in Kubernetes

If you deploy Zowe into Kubernetes, all components can also achieve high availability if you enable more than one replicas for each component.

- [HorizontalPodAutoscaler](./k8s-config.md#horizontalpodautoscaler) is recommanded to let Kubernetes scales the component based on workdload.
- [PodDisruptionBudget](./k8s-config.md#poddisruptionbudget) is recommended to let Kubernetes automatically handles disruptions like upgrade.
