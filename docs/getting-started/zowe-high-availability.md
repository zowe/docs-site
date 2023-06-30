# High Availability

A production instance of Zowe needs to run in a High Availability setup to achieve the necessary availability.
To deploy Zowe in high availability (HA) mode, you must set up a Parallel Sysplex® environment. A Parallel Sysplex is a cluster of z/OS® systems that cooperatively use certain hardware and software components to achieve a high-availability workload processing environment.

## Sysplex architecture and configuration

Sysplex is required to make sure multiple Zowe instances can work together. Check [Configuring Sysplex for high availability](../user-guide/configure-sysplex) for more details.

To enable high availability when Zowe runs in Sysplex, you need to meet the following requirements:

- Zowe instance with should be installed on every LPAR.
- The API services must be registered to each Zowe instance.
- Shared File system should be created between LPARs in Sysplex. See [How to share file systems in a Sysplex](https://www.ibm.com/docs/en/zos/2.4.0?topic=planning-sharing-file-systems-in-sysplex).
- z/OSMF High Availability mode should be configured. See [Configuring z/OSMF high availability in Sysplex](../user-guide/systemrequirements-zosmf-ha).

Instance on every LPAR is started.

**Configuration**

The configuration for the specific instance is composed of the defaults in the main section and the overrides in the `haInstances` section of the `zowe.yaml` configuration file.

In this section, `ha-instance` represents any Zowe high availability instance ID. Every instance has internal id and a section with overrides compared to the main configuration in the beginning of the `zowe.yaml` file. Check the [Zowe YAML configuration reference](../appendix/zowe-yaml-configuration#yaml-configurations---hainstances) for details.

## Caching service setup and configuration

Zowe uses the Caching Service to centralize the state data persistent in high availability (HA) mode. It can be used to share information between services.

If you are runnning the caching service on z/OS, there are three storage methods with their own characteristics:

- [VSAM](../user-guide/configure-caching-service-ha)
    - Familiar to zOS engineers.
    - Slow.
- [Redis](../extend/extend-apiml/api-mediation-redis#redis-configuration)
    - Needs to run in Distributed world separately.
    - Good for Kubernetes deployment.
- [Infinispan (*recommended*)](../extend/extend-apiml/api-mediation-infinispan#infinispan-configuration)
    - Part of the Caching service.
    - Doesn’t need separate processes.
    - Highly performant.

