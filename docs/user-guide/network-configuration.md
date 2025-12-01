# Network configuration

**Note:** The following attributes are to be defined in the Zowe configuration file.

The App Server and ZSS both can be accessed over HTTPS, either natively or via AT-TLS by setting appropriate AT-TLS rules and Zowe YAML assignments. When using native HTTPS, the TLS properties can be further customized within the YAML.

## Port configuration

The Zowe YAML property `components.<component-name>.port` can be used to set the port for any Zowe server. By default, the following is used but can be overridden:

```yaml
components:
  app-server:
    port: 7556
  zss:
    port: 7557
```

## IP configuration

By default, all Zowe servers listen on the IP address `0.0.0.0`. This can be customized.
The Zowe YAML property `zowe.network.server.tls.listenAddresses` can be used to instruct both `app-server` and `zss` of which IP to listen on. This property can be nested within each component if it is desired to customize them individually. Alternatively, TCPIP port rules can be used to control the assignment of `0.0.0.0` into a particular alternative IP address.
[You can read more about this in the network requirements page](./address-network-requirements.md).

## Native TLS

Both `app-server` and `zss` server components default to using HTTPS without the need for AT-TLS. AT-TLS is also possible. When using the native TLS, attributes such as TLS version and ciphers can be customized within the `zowe.network.server.tls` and `zowe.network.client.tls` objects of the Zowe configuration. These objects can also be placed within the `components.zss` and `components.app-server` objects, such as `components.zss.zowe.network.server.tls` in order to individually customize each server TLS configuration. For more information, read [TLS configuration](./tls-configuration.md).


## AT-TLS

You can instruct Zowe servers to expect TLS using the property `zowe.network.server.tls.attls: true`. Use this property is to set AT-TLS for all Zowe servers. For more granular control, you can set the following section in the yaml file:

```yaml
components:
  app-server:
    zowe:
      network:
        server:
          tls:
            attls: true
        client:
          tls:
            attls: true
```

This configuration instructs only the `app-server` component to expect AT-TLS for both inbound and outbound traffic. Similarly, set the parameter `zowe.network.server.tls.attls` to `true` for the `zss` component. Use `zowe.network.server.tls.attls: true` to instruct both servers to expect AT-TLS altogether. For more information, see [Configuring AT-TLS for Zowe server](./configuring-at-tls-for-zowe-server.md).

### AT-TLS Rule Suggestions

The `app-server` and `zss` components of Zowe are servers that may accept incoming connections from each other, other Zowe servers, and clients outside z/OS such as browsers either directly or indirectly such as when API ML is used.

As such, both Inbound and Outbound direction AT-TLS rules are needed for these servers.
The Inbound rules can be filtered by the listening ports of the servers, but Outbound rules may need to be set by either jobnames or destination ports.

The ports and jobnames can be found in the [Addressing network requirements](./address-network-requirements.md) documentation.

The Outbound rules can have HandshakeRole of Client, but when API ML is enabled, it is required that `app-server` and `zss` include their server certificates as client certificates using the `CertificateLabel` property of a `TTLSConnectionAdvancedParms` rule. For more information, see [Configuring AT-TLS for Zowe server](./configuring-at-tls-for-zowe-server.md#outbound-rule-for-communication-between-api-gateway-and-southbound-services).

The Inbound rules can have a HandshakeRole of Server or ServerWithClientAuth.



## Native TLS

The configuration object `zowe.network.server.tls` and `zowe.network.client.tls` can be set to control all Zowe components, or just `app-server` or `zss` but nesting the object within them. This object can control ciphers by listing IANA cipher names, minimum and maximum TLS levels, and for some servers even curves can be customized via a list.

An example for configuration is given below, but the specification for all options is found [within the Zowe YAML schema](https://github.com/zowe/zowe-install-packaging/blob/fdcdb2618080cf87031c070aed7e90503699ab5f/schemas/zowe-yaml-schema.json#L939)

```yaml
zowe:
  network:
    server:
      tls: # This sets all servers to default only to use TLSv1.3, with only specific ciphers
        minTls: "TLSv1.3"
        maxTls: "TLSv1.3"
        ciphers:
        - "TLS_AES_128_GCM_SHA256"
        - "TLS_AES_256_GCM_SHA384"
components:
  app-server:
    zowe:
      network:
        client:
          tls: # This customizes the app-server specifically to have a different minimum TLS for client requests
            minTls: "TLSv1.2"
```


