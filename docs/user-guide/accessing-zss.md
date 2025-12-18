# Accessing ZSS

The `zss` server should be accessed through the `gateway` when both are present. When both are ready, ZSS can be accessed from the API Mediation Layer Gateway, such as

`https://<zowe.externalDomain>:<components.gateway.port>/zss/api/v1/`.

Although you access the ZSS server via the Gateway port, the ZSS server still needs a port assigned to it, which is the value of the *components.zss.port* variable in the Zowe configuration file.

If API ML is not used, you can access ZSS directly at `https://<zowe.externalDomain>:<components.zss.port>/`.

