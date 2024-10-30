# Customizing Native TLS

Zowe's servers have built-in TLS support to enable HTTPS connections.

This is the default, and an alternative to using AT-TLS which is [documented here](./at-tls-configuration).

:::info Required role: security administrator
:::

## Server Parameters

Each Zowe server can be customized either by defining attributes within the `zowe.network.server` object of the Zowe YAML configuration file. The same object can be put within an individual component's configuration, such as `components.zss.zowe.network.server` for ZSS, which will allow you to customize each component separate from others.

Extensions are recommended to adhere to this configuration, but you must check with documentation for extensions to be sure.

### IP Addresses

Zowe's servers by default use the TCP IP address `0.0.0.0` which assigns the servers to be available on all network interfaces available to the jobs.

If this default is not desired, you can either change it either within Zowe or by setting [TCPIP port assignment statements](./address-network-requirements#ip-addresses).

To customize this within Zowe, define the parameter `zowe.network.server.listenAddresses`. For example, to have all Zowe servers use IP `1.2.3.4`, except for App Server which will use IP `2.3.4.5`, set the following in your Zowe YAML:

```yaml
zowe:
  network:
    server:
      listenAddresses:
      - 1.2.3.4
components:
  app-server:
    zowe:
      network:
        server:
          listenAddresses:
          - 2.3.4.5
```


### TLS Versions

By default, Zowe servers use TLSv1.3.

To customize this, you can use the parameters `zowe.network.server.tls.minTls` and `zowe.network.server.tls.maxTls`. The following values are allowed:

* TLSv1.2
* TLSv1.3

Zowe defaults to the following configuration:

```yaml
zowe:
  network:
    tls:
      minTls: "TLSv1.2"
      maxTls: "TLSv1.3"
```

### TLS Ciphers

Zowe is always updating the ciphers used to follow industry best practice. 

Usually, the ciphers used by Zowe will match Mozilla's recommendations: https://wiki.mozilla.org/Security/Server_Side_TLS

To customize which ciphers Zowe uses, you can define a list of IANA cipher names within the Zowe YAML parameter `zowe.network.server.tls.ciphers`. A list of [IANA ciphers can be found here](https://testssl.sh/openssl-iana.mapping.html).


## Client parameters

The properties within `zowe.network.server.tls` can also be specified within `zowe.network.client.tls`.

## Default and example
The default TLS configuration changes regularly as needed for industry standards, however below is an example of the defaults:

```yaml
zowe:
  network:
    server:
      listenAddresses:
      - "0.0.0.0"
      tls:
        maxTls: "TLSv1.3"
        minTls: "TLSv1.2"
        ciphers:
        - "TLS_AES_128_GCM_SHA256"
        - "TLS_AES_256_GCM_SHA384"
        - "TLS_CHACHA20_POLY1305_SHA256"
    client: # Template below assigns same attributes as seen in server section
      tls: ${{ zowe.network.server.tls }}
```
