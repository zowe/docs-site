# Deploy API Mediation Layer locally

## General information

The instructions for local deployment are avilable within: [https://github.com/zowe/api-layer/?tab=readme-ov-file#run-api-mediation-layer-locally](https://github.com/zowe/api-layer/?tab=readme-ov-file#run-api-mediation-layer-locally)

## Dummy Authentication Provider

The `Dummy Authentication Provider` implements simple authentication for development purposes using dummy credentials (username:  `user`, password `user`). The `Dummy Authentication Provider` makes it possible for the API Gateway to run without authenticating with the z/OSMF service.

Use the following property of the API Gateway to enable the `Dummy Authentication Provider`:
```
apiml.security.auth.provider: dummy
```
