# Zowe SDKs installation

Leverage the Zowe Client Software Development Kits (SDKs) to build client applications and scripts that interface with the mainframe.

The SDKs include programmatic APIs, each of which performs a particular mainframe task. For example, one API package provides the ability to upload and download z/OS data sets. You can leverage that package to rapidly build a client application that interacts with data sets.

The following SDKs are available.
- Zowe Client Java SDK
- Zowe Client Kotlin SDK
- Zowe Client Node.js SDK
- Zowe Client Python SDK *technical preview*

## SDK documentation

For detailed SDK documentation, see the following:
- [Zowe Client Java SDK](https://github.com/Zowe-Java-SDK)
- [Zowe Client Kotlin SDK](https://for-mainframe.github.io/r2z/)
- [Zowe Client Node.js SDK](https://docs.zowe.org/stable/typedoc/index.html)
- [Zowe Client Python SDK](https://zowe-client-python-sdk.readthedocs.io/en/latest/) *technical preview*

## Installation and software requirements

### Java SDK

Requires Java Runtime Environment (JRE) 17.

To install this library in your project, use a build tool such as Maven, Gradle or Ant. Use the following link to get necessary artifacts: https://mvnrepository.com/artifact/org.zowe.client.java.sdk/zowe-client-java-sdk.

For a Maven project, add the SDK as a dependency by updating the `pom.xml` file:

```
<dependency>
    <groupId>org.zowe.client.java.sdk</groupId>
    <artifactId>zowe-client-java-sdk</artifactId>
    <version>2.2.0</version>
</dependency>  
```

For a Gradle project, add the SDK as a dependency by updating the `build.gradle` file:

```
implementation group: 'org.zowe.client.java.sdk', name: 'zowe-client-java-sdk', version: '2.2.0'  
```

### Kotlin SDK

Requires Java Runtime Environment (JRE) 17.

To install this library in your project, use a build tool such as Maven, Gradle or Ant. Use the following link to get necessary artifacts: https://zowe.jfrog.io/artifactory/libs-release/org/zowe/sdk/zowe-kotlin-sdk/.

For a Maven project, add the SDK as a dependency by updating the `pom.xml` file:

```
<dependency>
  <groupId>org.zowe.sdk</groupId>
  <artifactId>zowe-kotlin-sdk</artifactId>
  <version>{version}</version>
</dependency>
```

For a Gradle project, add the SDK as a dependency by updating the `build.gradle.kts` file:

```
implementation("org.zowe.sdk:zowe-kotlin-sdk:$version")
```

To use:

```
import org.zowe.kotlinsdk
```

### Node.js SDK

If you install Node SDK packages from the online registry, the required dependencies are installed automatically.

If you download Node SDK packages from Zowe.org, the folder contains dependencies that you must install manually. Extract the `TGZ` files from the folder, copy the files to your project, and issue the following commands to install the dependencies.

```
npm install imperative.tgz
```

```
npm install core-for-zowe-sdk.tgz
```

### Python SDK *technical preview*

If you install Python SDK packages from the online registry, the required dependencies are installed automatically.

If you download the Python SDK packages from Zowe.org, the downloaded folder contains dependencies that you must install manually. Extract the `WHL` files from the folder, copy the files to your project, and issue the following command for each dependency:

```
pip install <fileName>.whl
```

## Getting started

To get started, import the SDK packages to your project. You can pull the packages from an online registry, or download the packages from Zowe.org to install locally.
