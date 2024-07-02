# Enabling AT-TLS across your Zowe environment

The communication server on z/OS provides functionality to encrypt HTTP communication for on-platform jobs. This functionality is referred to as Application Transparent Transport Layer Security (AT-TLS).

:::info Required roles: security administrator
:::

## Zowe Configuration Parameters

To enable AT-TLS for Zowe components, configure the following parameters:
```yaml
zowe:
  network:
    server:
      tls:
        attls: true
```

## AT-TLS Rule Concepts

Zowe networking involves communication between Zowe's servers and clients outside of z/OSMF, as well as server-to-server communication, including that Zowe often is setup to communicate with z/OSMF. To setup AT-TLS rules for Zowe, you must have different types of rules that cover all of these types of communication.

### AT-TLS Jobname filters for Zowe

AT-TLS rules can apply based upon jobname filters as desired. Zowe has several jobs, and the jobnames depend upon the value of "job.prefix" from the Zowe YAML, as well as individual server suffixes, as seen in this table with the example value of "ZWE1" for "job.prefix"

|Component|Component Category|TCP Port|Job Suffix|Default Job Name|Note|
|---|---|---|---|---|---|
|api-catalog|API Mediation Layer|7552|AC|ZWE1AC|Provides API documentation|
|discovery|API Mediation Layer|7553|AD|ZWE1AD|Used by the gateway to discover presence and health each server in a Zowe instance for routing|
|gateway|API Mediation Layer|7554|AG|ZWE1AG|When enabled, the port chosen should also be the value of `zowe.externalPort`. Zowe can be configured to have this port as the only externally-accessible port as the gateway can proxy the other Zowe servers.|
|caching-service|API Mediation Layer|7555|ZWE1CS|ACS|Provides a cache for high-availability/fault-tolerant operation|
|app-server|App Framework|7556|DS|ZWE1DS|Provides the Desktop, requires NodeJS|
|zss|App Framework|7557|SZ|ZWE1SZ|Provides APIs|


### Inbound Rules

Traffic coming into Zowe, either by a client off of z/OS, or by another server on z/OS, must have an AT-TLS "Inbound" Direction rule, and you can target the rule by the Zowe ports defined in the Zowe YAML using the "LocalPortRange" filters, as well as Jobname filters.

The following is an example rule that covers all inbound traffic from any source, filtered by jobname and port range:

```pagent
TTLSRule ZoweServerRule
{
  LocalAddr All
  RemoteAddr All
  LocalPortRange 7551-7557
  Jobname ZWE*
  Direction Inbound
  TTLSGroupActionRef ServerGroupAction
  TTLSEnvironmentActionRef ZoweServerEnvironmentAction
  TTLSConnectionActionRef ZoweServerConnectionAction
}

TTLSGroupAction ServerGroupAction
{
  TTLSEnabled On
}

TTLSEnvironmentAction ZoweServerEnvironmentAction
{
  HandshakeRole ServerWithClientAuth
  EnvironmentUserInstance 0
  TTLSEnvironmentAdvancedParmsRef ServerEnvironmentAdvParms
  TTLSKeyringParmsRef ZoweKeyring
}

TTLSConnectionAction ZoweServerConnectionAction
{
  HandshakeRole ServerWithClientAuth
  TTLSCipherParmsRef CipherParms
  TTLSConnectionAdvancedParmsRef ZoweConnectionAdvParms
}
```

#### Server Handshake Roles

In the above example, the HandshakeRole is set to "ServerWithClientAuth".
This is a good default, and is mandatory for connections between each Zowe server.
However, if you need to turn off client certificate authentication elsewhere, then you'll want to split the rules such that communication between RemoteAddr=<internal ip> remains "ServerWithClientAuth" while RemoteAddr=<external ip> can be simply "Server"


### Outbound Rules

Traffic leaving the Zowe servers, either to a client off z/OS, or to another server on z/OS, including possibly z/OSMF, must have an AT-TLS "Outbound" Direction rule. Because the port is unknown, you must use jobname filters for these rules.

The below example sets outbound rules for all of Zowe via the jobname prefix "ZWE1" which must match the value of "job.name" in the Zowe YAML.

```pagent
TTLSRule ZoweZosmfClientRule
{
  LocalAddr All
  LocalPortRange 1024-65535
  RemoteAddr All
  RemotePortRange All
  Jobname ZWE1*
  Direction Outbound
  TTLSGroupActionRef ClientGroupAction
  TTLSEnvironmentActionRef ZoweClientEnvironmentAction
  TTLSConnectionActionRef ZoweNoX509ClientConnAction
}

TTLSGroupAction ClientGroupAction
{
  TTLSEnabled ON
}

TTLSEnvironmentAction ZoweClientEnvironmentAction
{
  HandshakeRole Client
  TTLSKeyringParmsRef ZoweKeyring
  TTLSCipherParmsRef CipherParms
  TTLSEnvironmentAdvancedParmsRef ClientEnvironmentAdvParms
}
```


