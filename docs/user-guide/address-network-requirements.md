# Addressing network requirements

Review the following table during installation of Zowe server-side components to determine which TCP ports are required.
Values presented in the table are default values. You can change the values by updating variable values in the `zowe.yaml` file.

:::info Required roles: network administrator, system programmer
:::

For more information about variable names in the following table, see the [Zowe YAML configuration file reference](../appendix/zowe-yaml-configuration.md) in the References section.

## Component Ports

Most Components of Zowe are HTTPS servers. The ports of each and their default jobnames are listed below.
The ports can be customized for each component by editing the value of `components.component-name.port` within the Zowe YAML file.
Each Jobname has a default prefix of ZWE1, but that can be customized via the `zowe.job.prefix` value in the Zowe YAML file. The ports used are different between single-service API ML deployment and multi-service API ML deployment.

:::note
**Internal and External Port Isolation**

Zowe v3 supports the use of separate internal and external listeners to isolate service-to-service communication from external traffic. For information on how to configure these listeners and their associated ports, see [Interface Binding and Traffic Isolation](#interface-binding-and-traffic-isolation) later in this article.
:::

### Single-service deployment

| Port number | Category | Component(s) | Default Jobname     | Log Suffix | Purpose                                                                                                                                                                                                              |
|------|------|--------------|---------------------|------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 7553 | API Mediation Layer | discovery    | ZWE1**AG**          | AGW        | Discovery server port which dynamic API services can issue APIs to register or unregister themselves.                                                                                                                |
| 7554 | API Mediation Layer | gateway      | ZWE1**AG**          | AGW        | The northbound edge of the API Gateway used to accept client requests.  This port must be exposed outside the z/OS network so clients (web browsers, VS Code, processes running the Zowe CLI) can reach the gateway. |
| 7556 | App Framework | app-server   | ZWE1**DS** & ZWE1SV | D          | The Zowe Desktop (also known as ZLUX) port used to log in through web browsers.                                                                                                                                      |
| 7557 | App Framework | zss          | ZWE1**SZ**          | SZ         | Z Secure Services (ZSS) provides REST API services to ZLUX, used by the File Editor application and other ZLUX applications in the Zowe Desktop.                                                                     |

### Multi-service deployment

| Port number | Category | Component | Default Jobname | Log Suffix | Purpose |
|------|------|------|------|------|------|
| 7552 | API Mediation Layer | api-catalog | ZWE1**AC** | AAC | Used to view API swagger / openAPI specifications for registered API services in the API Catalog. |
| 7553 | API Mediation Layer | discovery | ZWE1**AD** | ADS | Discovery server port which dynamic API services can issue APIs to register or unregister themselves. |
| 7554 | API Mediation Layer | gateway | ZWE1**AG** | AGW | The northbound edge of the API Gateway used to accept client requests before routing them to registered API services.  This port must be exposed outside the z/OS network so clients (web browsers, VS Code, processes running the Zowe CLI) can reach the gateway. |
| 7555 | API Mediation Layer | Caching Service | ZWE1**CS** | ACS | Port of the Caching Service that is used to share state between different Zowe instances in a high availability topology. |
| 7558 | API Mediation Layer | zaas | ZWE1**AZ** | AZ | Used for the Zowe Authentication and Authorization Service. This port receives internal connections only. |
| 7556 | App Framework | app-server | ZWE1**DS** & ZWE1SV | D | The Zowe Desktop (also known as ZLUX) port used to log in through web browsers. |
| 7557 | App Framework | zss | ZWE1**SZ** | SZ | Z Secure Services (ZSS) provides REST API services to ZLUX, used by the File Editor application and other ZLUX applications in the Zowe Desktop. |

## Application Server Jobname for Port

The jobnames associated with the component "app-server" varies depending on whether cluster mode is enabled or not (default: enabled).

| Cluster mode | Jobname for listener port | Jobname for worker processes |
|---|---|---|
| Enabled (Default) | Name of STC (default: ZWE1SV) | `zowe.job.prefix` + DS (default: ZWE1**DS**) |
| Disabled | `zowe.job.prefix` + DS (default: ZWE1**DS**) | Not Applicable |

To enable or disable cluster mode, see the [Advanced Application Framework Configuration Guide](./mvd-configuration.md).

## Caching Service Infinispan ports

The Caching Service will use these additional ports if enabled (`components.caching-service.enabled: true`) and set to use infinispan (the default, `components.caching-service.storage.mode: infinispan`).

| Port number | zowe.yaml variable name | Purpose |
|-------------|------|------|
| 7601        | zowe.components.caching-service.storage.infinispan.jgroups.keyExchange.port | The port at which the key server in Infinispan is listening. If the port is not available, the next port is probed, up to port+5. Used by the key server (server) to create an SSLServerSocket and by clients to connect to the key server. |
| 7600        | zowe.components.caching-service.storage.infinispan.jgroups.port | Bind port for the socket that is used to form an Infinispan cluster. |

## Network Configuration

Configure how Zowe identifies and binds to network interfaces on your system. The default behavior binds to all interfaces, but it is possible to configure binding to just a specific subset of available Network Interfaces (NIC).

### Interface Binding and Traffic Isolation

By default, Zowe binds to the wildcard address `0.0.0.0`, making Zowe services available on all network interfaces. This configuration is recommended for environments where strict interface isolation is not required.

Zowe V3 uses two listeners to separate internal traffic from external traffic:

* **Internal Port**  
Used for services to register themselves with the API Mediation Layer. This traffic is typically restricted to the internal network.

* **External Port**  
The primary access point for all external user access (Web UI, CLI, VS Code) and onboarded services. This is the port used for opening firewalls and defining external access rules.

If you need to restrict Zowe to specific TCP/IP stacks or separate internal service traffic from external traffic, use the following properties in zowe.yaml:

* **zowe.network.server.listenAddresses**  
Defines the specific IP address or a comma-separated list of addresses for the server to bind to (replacing the default `0.0.0.0` wildcard).

* **components.apiml.internal.discovery.address**  
Defines the address used specifically for internal listeners (service-to-service communication). Configuring this parameter ensures that internal discovery traffic remains on a protected or local interface.

* **zowe.externalPort**  
Specifies the primary port number (default `7554`) used for external user access to Zowe services. This value defines the entry point for end-user traffic.

* **zowe.externalDomains**    
Specifies authorized domain names or hostnames through which Zowe expects to be contacted. 

**Example:**
```yaml
zowe:
  network:
    server:
      # Binds to two of the Network Interfaces available on the system.
      listenAddresses: "10.11.12.13, 11.12.13.14"
  
  # The main external port for incoming traffic
  externalPort: 7554

  # List of valid domains for the Zowe instance
  externalDomains: 
    - "zowe.example.com"

components:
  apiml:
    internal:
      # Defines the address for the communication from z/OS services to the endpoint managing registration of the services. 
      discovery:
        address: "127.0.0.1"    
```

:::note Binding to Multiple TCP/IP Stacks 

In environments with multiple TCP/IP stacks, you can bind Zowe to specific addresses across those stacks by providing a comma-separated list in the `zowe.network.server.listenAddresses` property. Zowe startup scripts automatically parse this list to ensure the services bind correctly to every specified interface.
:::

### TCP/IP Port Reservations

The best practice is to use TCP/IP port assignment statements to restrict the IP and ports of each server by their jobnames. The jobnames of each Zowe component is derived from the property `zowe.job.prefix` and `component-suffix`. For details, see the topic _PROFILE.TCPIP port assignments_ in the IBM documentation.

When `zowe.job.prefix` is set to `ZWE1`, the external IP is `10.11.12.13`. The port reservations should be configured to reflect traffic isolation.

**Single-Service Deployment**

In a single-service deployment, API ML sub-components run under a single started task jobname (default `ZWE1AG`).

**Example:**

```plaintext
   7553 TCP ZWE1AG BIND 10.11.12.13 ; Zowe Discovery
   7554 TCP ZWE1AG BIND 10.11.12.13 ; Zowe Gateway
   7556 TCP ZWE1DS BIND 10.11.12.13 ; Zowe App Server without Cluster
   7556 TCP ZWE1SV BIND 10.11.12.13 ; Zowe App Server with Cluster (Default)
   7557 TCP ZWE1SZ BIND 10.11.12.13 ; Zowe ZSS
```

**Multi-Service Deployment**

In a multi-service deployment, each component runs in its own address space with a unique jobname suffix.

**Example:**

```plaintext
   7552 TCP ZWE1AC BIND 10.11.12.13 ; Zowe API Catalog
   7553 TCP ZWE1AD BIND 10.11.12.13 ; Zowe Discovery
   7554 TCP ZWE1AG BIND 10.11.12.13 ; Zowe Gateway
   7555 TCP ZWE1CS BIND 10.11.12.13 ; Zowe Caching Service
   7556 TCP ZWE1DS BIND 10.11.12.13 ; Zowe App Server without Cluster
   7556 TCP ZWE1SV BIND 10.11.12.13 ; Zowe App Server with Cluster (Default)
   7557 TCP ZWE1SZ BIND 10.11.12.13 ; Zowe ZSS
   7558 TCP ZWE1AZ BIND 10.11.12.13 ; Zowe ZAAS
```

:::note

This TCP/IP setting is valid for the Zowe Server started with `JOBNAME=` parameter to match the prefix. For example `S ZWESLSTC,JOBNAME=ZWE1SV`.
:::



