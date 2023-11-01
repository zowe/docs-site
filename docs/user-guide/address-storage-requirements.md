# Addressing storage requirements 

:::info Roles required: storage administrator, system programmer
:::

Ensure that you have sufficient storage depending on the installation method. Review the storage requirements according to your installation method as presented in this article. 

## Installing with SMP/E

Before installing Zowe SMP/E, review the [DASD storage requirements](../user-guide/install-zowe-smpe/#dasd-storage-requirements).

## Installing Zowe runtime from a convenience build

Before installing Zowe runtime from a convenience build, see the [storage requirements associated with MVS datasets](../user-guide/install-zowe-zos-convenience-build/#step-5-install-the-mvs-data-sets). 

### Memory requirements for API Mediation Layer

Zowe API ML components have following memory requirements:

Component name | Memory usage
---|---
Gateway service | 256MB
Discovery service | 256MB
API Catalog | 512MB
Metrics service | 512MB
Caching service | 512MB

