# Configuring Zowe certificates 

Zowe uses a certificate to encrypt data for communication across secure sockets. An instance of Zowe references a USS directory referred to as a KEYTORE_DIRECTORY which contains information about where the certificate is located.  More than one instance of Zowe can share the same KEYSTORE_DIRECTORY, which is defined by the variable `KEYSTORE_DIRECTORY` in the `instance.env` file, see [Creating and configuring the Zowe instance directory](./configure-instance-directory.md).  

The `KEYSTORE_DIRECTORY` is created by running the script `<ROOT_DIR>/bin/zowe-setup-certificates.sh`.  This script has a number of input parameters that are specified in the configuration file `<ROOT_DIR>/bin/zowe-setup-certificates.env`.  When the script has executed successfully a USS `KEYSTORE_DIRECTORY` is generated containing the runtime files.  One of these files is `zowe-certificates.env` which is executed when a Zowe instance is started and sets a number of USS shell variables, see [Creating and configuring the Zowe instance directory](../user-guide/configure-instance-directory.md#keystore-configuration).	

## Northbound Certificate

The Zowe certificate is used by the API Mediation Layer on its northbound edge when identifying itself and encrypting https:// traffic to web browsers or REST client applications.  

## Southbound Certificate

As well as being a server, Zowe itself is a client to services on the southbound edge of its API Mediation Layer that it communicates to over secure sockets.  These southbound services use certificates to encrypt their data, and Zowe uses a trust store to store its relationship to these certificates.  The southbound services that are started by Zowe itself and run as address spaces under its `ZWESVSTC` started task (such as the API discovery service, the explorer JES REST API server) re-use the same Zowe certificate used by the API Mediation Layer on its northbound client edge.  

## Trust store

As well as Zowe using its certificates intra-address space,  to encrypt messages between its servers, Zowe uses external services on z/OS (such as z/OSMF or Zowe conformant extensions that have registered themselves with the API Mediation Layer).  These services will present their own certificate to the API Mediation Layer, in which case the trust store is used to capture the relationship between Zowe's southbound edge and these external certificates.  

If you wish to disable the trust store validation of southbound certificates the value `VERIFY_CERTIFICATES=true` can be set to `false` in the `zowe-setup-certificates.env` file in the `KEYSTORE_DIRECTORY`.  A scenario when this is recommended is if certificate being presented to the API Mediation Layer is self signed (i.e. from an unknown certificate authority).  For example, the z/OSMF certificate may be self signed in which case the Zowe API Mediation Layer will not recognize the signing authority.  


<!--
<img src="../images/common/zowe-ssl.png" alt="Zowe SSL" width="700px"/> 
-->

## Keystore versus Keyring

Zowe supports certificates being stored either in a in a USS direectory **Java KeyStore** format or else held in a **z/OS Keyring**.  z/OS keystore are the preferred choice for storing certificates where system programmers are already familiar with their operation and usage.  The user ID setting up a keystore and connecting it with certificates requires elevated permissions, and in scenarios where you need to create a Zowe sandbox environment or for testing purposes and your TSO user ID doesn't have authority to manipulate keyrings, USS keystores are a good alternative.  

If you are just using a USS keystore then the script `zowe-setup-certificates.env` is the only configuration step required.  This is described in detail in [Configuring Zowe certificates in a USS KeyStore](./configure-certificates-keystore.md).

If you are using a keyring the sample JCL member `ZWEKRING` provided in the PDS library `SZWESAMP` contains the security commands to create a keyring and manage its associated certificates. This is described in [Configuring Zowe certificates in a key ring](./configure-certificates-keyring.md).  

For both scenarios, where the certificate is held in a USS JavaKeystore or a z/OS keyring, the USS `KEYSTORE_DIRECTORY` is still required which is created with the script `zowe-setup-certificates.sh`  

