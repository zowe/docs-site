# Deploying API Mediation Layer locally

## Prerequisites

Before deploying API Mediation Layer on your local machine, ensure you have the following installed:

* Java 8 or 11
* Node.js
* Gradle

## Certificate generation for local development

The `zowe/api-layer` repository no longer supplies checked-in development certificates or private keys. These single-purpose artifacts must be generated on demand. They form a local security boundary explicitly intended for source development, and do not represent an installed Zowe environment.

For complete details on the local certificate architecture, see [TLS certificates for local development and testing](https://github.com/zowe/api-layer/blob/v2.x.x/keystore/README.md).

## Starting the API Mediation Layer

Depending on your development workflow, you can start the API Mediation Layer components using Gradle, or directly via your IDE or npm.

### Starting via Gradle

When you run Gradle test or Jib image tasks, certificate generation occurs automatically. You can start the services using standard Gradle commands.

**Example:**
``` 
./gradlew bootRun
```

### Starting directly via IDE or npm

If you are launching the services directly from your IDE (such as IntelliJ or Eclipse), running sample applications, or using direct npm commands that bypass Gradle tasks, you must explicitly generate the certificates before starting the services.

To generate the certificates, run the following command from the repository root:

```
./gradlew generateCertificates
```
Once the generation script completes successfully, you can proceed with your direct IDE or npm launches. If you do not run this step, the services will fail to start due to missing keystore and truststore artifacts.

## Dummy Authentication Provider

The `Dummy Authentication Provider` implements simple authentication for development purposes using dummy credentials (username:  `user`, password `user`). The `Dummy Authentication Provider` makes it possible for the API Gateway to run without authenticating with the z/OSMF service.

Use the following property of the API Gateway to enable the `Dummy Authentication Provider`:
```
components.gateway.security.auth.provider: dummy
```
