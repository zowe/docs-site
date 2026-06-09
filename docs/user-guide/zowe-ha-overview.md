# Configuring high availability (optional)

Zowe has a high availability feature built-in.
For Zowe in a high availability configuration, one workspace directory is required. This workspace directory must be created on a shared file system (zFS directory) which all LPARs in a Sysplex can access. Review this article and the following articles in this section for the configuration steps to enable the high availability feature. 
:::note
Configuring high availability is optional.
Do not attempt a Zowe HA setup until you have a non-HA Zowe setup that works.
:::
:::info Required role: system programmer
:::

## Enable high availability when Zowe runs in Sysplex

- Sysplex is required to make sure multiple Zowe instances can work together. Check [Configuring Sysplex for high availability](./configure-sysplex.md) for more details.
- z/OSMF is an optional prerequisite of Zowe. If your Zowe instance works with z/OSMF, it's recommended to [configure z/OSMF for high availability in Sysplex](./systemrequirements-zosmf-ha.md).
- The `haInstances` section must be defined in the Zowe YAML configuration. Check [Zowe YAML Configuration File Reference](../appendix/zowe-yaml-configuration.md) for more details.
- Zowe caching service is required to convert stateful component to stateless component. Check [Configuring the Caching Service for HA](./configure-caching-service-ha.md) for details.
- For DVIPA hot-standby deployments, API ML services must be configured with the `advertisedIpAddress` property to decouple the listen address from the Eureka registration address. See [Configuring API ML for DVIPA hot-standby](./configure-sysplex.md#configuring-api-ml-for-dvipa-hot-standby) for the setup procedure.

### Known limitations

- To allow Sysplex Distributor to route traffic to the Gateway, you can only start one Gateway in each LPAR within the Sysplex. All Gateways instances should be started on the same port configured on Sysplex Distributor.
- Zowe App Server should be accessed through the Gateway with a URL like `https://<dvipa-domain>:<external-port>/zlux/ui/v1`.
- **Hot-standby only:** Only one Gateway instance serves traffic at a time (the preferred LPAR). The backup Gateway instance is registered in Eureka but does not receive requests unless the preferred LPAR fails.

## Enable high availability when Zowe runs in Kubernetes

If you deploy Zowe into Kubernetes, all components can also achieve high availability if you enable more than one replicas for each component.

- [HorizontalPodAutoscaler](./k8s-config.md#horizontalpodautoscaler) is recommanded to let Kubernetes scales the component based on workdload.
- [PodDisruptionBudget](./k8s-config.md#poddisruptionbudget) is recommended to let Kubernetes automatically handles disruptions like upgrade.
