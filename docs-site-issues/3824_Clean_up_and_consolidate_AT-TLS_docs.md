# Issue #3824: Clean up and consolidate AT-TLS docs

**URL:** https://github.com/zowe/docs-site/issues/3824

**Created:** 2024-08-22T14:21:49Z

**Updated:** 2025-05-13T09:54:26Z

**Labels:** area: install and config, release: V3, priority-high, Size: L

---

Notes from Sean:

1) AT-TLS assigns a behavior to a socket, based on a filter to match such sockets
2) We have known job prefixes (literally, zowe.job.prefix) plus server codes such as ZWE1SZ as seen here https://github.com/zowe/zowe-install-packaging/blob/feature/v3/jcl/INSTALLATION.md#networking
3) We have known ports, as in above
4) We must avoid double-TLS. TLS wraps HTTP to become HTTPS. If the stream of data is already TLS (HTTPS), then adding AT-TLS to it will be double TLS, causing an HTTP parsing error on the other side because when they strip the first layer of TLS, they expect HTTP underneath and will not get it.
4) there is inbound (server) and outbound (client) traffic for any webserver. but, to what extent do our servers send HTTP only (not HTTPS) when using AT-TLS?
4a) app-server: 100% HTTP when requested to do so. server and client TLS are individually configurable.
4b) zss: the same
4c) apiml: i am concerned that some client behavior is incorrect. at least for zosmf, they control whether they talk to zosmf via http or https via a yaml parameter zosmf.scheme=http/https
https://docs.zowe.org/stable/user-guide/api-mediation/configuration-at-tls
this then alters what goes into the static registration of apiml.
this implies to me that apiml does NOT disable native TLS for the servers that it talks to? or only for static routes? or only for zosmf specifically?
its something i want to know more about.
if apiml is not 100% HTTP when using AT-TLS, the rules become complex and confusing.
they also disagreed with me about that server TLS and client TLS should be individually configurable.
Despite that this is how AT-TLS rules work from my understanding.
5) APIML requires servers to send certificates, to be able to perform client certificate authentication on them. This requires Inbound rule type to be "ServerWithClientAuth", not "Server", for server-to-server traffic
6) The same is not required of clients. Users that wish to avoid client certificates can set just "Server" type for source IPs that are not from the mainframe. Then, you get 2 rules... one for internal IPs and one for external.
7) Should z/OSMF even be covered by AT-TLS rules? In my testing, I have been unable to get APIML to work with z/OSMF under AT-TLS, so I did the OPPOSITE of their documentation, kept scheme as https, excluded zosmf from the rules, and it worked. But this means APIML then is doing Native TLS to zosmf, and I presume AT-TLS for everything else. Which is weird and not helpful for controlling TLS settings.
8) APIML still needs to see the truststore according to them, even when AT-TLS should be handling the TLS, because they do some client certificate stuff that requires them to review the certificate (which you can read off an AT-TLS socket) and compare it to CAs. This means even with AT-TLS, zowe certificate setup is still required.
