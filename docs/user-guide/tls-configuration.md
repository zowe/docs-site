# Customizing HTTPS connections for Zowe servers

Zowe's servers have built-in TLS support to enable HTTPS connections.
This is the default, and an alternative to using AT-TLS which is [documented here](./at-tls-configuration)

:::info Required roles: security administrator
:::

## Configuration Parameters

By default, Zowe servers will listen on IP address "0.0.0.0" and use TLSv1.3 with industry standard ciphers.
You may wish to change this behavior, and can do so globally by editing the `zowe.network` configuration of the Zowe YAML file, or locally by editing `zowe.network` within a component, such as `components.zss.zowe.network` for ZSS.

**Note: The parameters are recommended for servers to use, but some servers may support some parameters, and not others, or none at all. It is good to verify that the settings are taking effect by for example checking the connection in your browser, as well as checking the documentation of extensions of Zowe.**

Below is a list of parameters you can set.

`zowe.network.server.listenAddresses`: This is an array of strings of IPv4 or IPv6 addresses that servers will be instructed to listen on.
Default: `- "0.0.0.0"`

`zowe.network.server.tls.maxTls`: This is a string stating which TLS version to use as a maximum. The value can be one of "TLSv1.2", "TLSv1.3".
Default: `TLSv1.3"

`zowe.network.server.tls.minTls`: This is a string stating which TLS version to use as a minimum. The value can be one of "TLSv1.2", "TLSv1.3".
Default: `TLSv1.2"

`zowe.network.server.tls.ciphers`: This is an array of strings in the format of IANA cipher names. There are many possible values as seen here: https://testssl.sh/openssl-iana.mapping.html
Default: Changes regularly as needed for industry standards. A reference for likely ciphers is here: https://wiki.mozilla.org/Security/Server_Side_TLS

### Client parameters

The properties within `zowe.network.server.tls` can also be specified within `zowe.network.client.tls`.

### Default and example
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