# High Availability

A production instance of Zowe needs to run in a High Availability setup to achieve the necessary availability.
To deploy Zowe in high availability (HA) mode, it is necessary to set up a Parallel Sysplex® environment. A Parallel Sysplex is a cluster of z/OS® systems that cooperatively use certain hardware and software components to achieve a high-availability workload processing environment.

## Sysplex architecture and configuration

Sysplex is required to make sure multiple Zowe instances can work together. For more information, see [Configuring Sysplex for high availability](../user-guide/configure-sysplex).

To enable high availability when Zowe runs in Sysplex, it is necessary to meet the following requirements:

- The Zowe instance with should be installed on every LPAR.
- The API services must be registered to each Zowe instance.
- A shared file system should be created between LPARs in Sysplex. See [How to share file systems in a Sysplex](https://www.ibm.com/docs/en/zos/2.4.0?topic=planning-sharing-file-systems-in-sysplex).
- z/OSMF High Availability mode should be configured. See [Configuring z/OSMF high availability in Sysplex](../user-guide/systemrequirements-zosmf-ha).

- The instance on every LPAR is started.

**Configuration**

The configuration for the specific instance is composed of the defaults in the main section and the overrides in the `haInstances` section of the `zowe.yaml` configuration file.

In this section, `ha-instance` represents any Zowe high availability instance ID. Every instance has an internal id and a section with overrides compared to the main configuration in the beginning of the `zowe.yaml` file. For more information, see [Zowe YAML configuration reference](../appendix/zowe-yaml-configuration#yaml-configurations---hainstances).

## Caching service setup and configuration

Zowe uses the Caching Service to centralize the state data persistent in high availability (HA) mode. This service can be used to share information between services.

If you are runnning the Caching Service on z/OS, there are three storage methods with their own characteristics:

- [VSAM](../user-guide/configure-caching-service-ha)
    - Familiar to zOS engineers.
    - Slow.
- [Redis](../extend/extend-apiml/api-mediation-redis#redis-configuration)
    - Needs to run in Distributed world separately.
    - Good for Kubernetes deployment.
- [Infinispan (*recommended*)](../extend/extend-apiml/api-mediation-infinispan#infinispan-configuration)
    - Part of the Caching service.
    - Does not need separate processes.
    - Highly performant.

