# Addressing storage requirements 

:::info Roles required: storage administrator, system programmer
:::

Ensure that you have sufficient storage depending on the installation method. Review the storage requirements according to your installation method as presented in this article. 

## Installing Zowe Server Rutntime

Before installing Zowe, review the reference for [Zowe's server datasets](../appendix/server-datasets.md)

### Installing with SMP/E

Additionally, when installing Zowe with SMP/E, review the [DASD storage requirements](../user-guide/install-zowe-smpe-overview.md#dasd-storage-requirements).

## Memory requirements for API Mediation Layer

Zowe API ML components have following memory requirements:

Component name | Memory usage
---|---
Gateway service | 256MB
Discovery service | 256MB
API Catalog | 512MB
Caching service | 512MB

