# Zowe SDKs installation

Leverage the Zowe Client Software Development Kits (SDKs) to build client applications and scripts that interface with the mainframe.

The SDKs include programmatic APIs, each of which performs a particular mainframe task. For example, one API package provides the ability to upload and download z/OS data sets. You can leverage that package to rapidly build a client application that interacts with data sets.

The following SDKs are available.
- Zowe Client Java SDK
- Zowe Client Kotlin SDK
- Zowe Client Node.js SDK
- Zowe Client Python SDK *technical preview*

## Fundamentals

- New to Zowe Client SDKs? This [Zowe Client SDK overview](overview.md#zowe-client-software-development-kits-sdks) briefly introduces the SDKs.

- The blog [Zowe SDKs - Build z/OS Connected Applications Faster](https://medium.com/zowe/zowe-sdks-build-z-os-connected-applications-faster-b786ba7bb0d9) introduces Zowe SDKs and their benefits.

## SDK documentation

For detailed SDK documentation, see the following:
- [Zowe Client Java SDK](https://github.com/Zowe-Java-SDK)
- [Zowe Client Kotlin SDK](https://zowe.github.io/zowe-client-kotlin-sdk/)
- [Zowe Client Node.js SDK](https://docs.zowe.org/stable/typedoc/index.html)
- [Zowe Client Python SDK](https://zowe-client-python-sdk.readthedocs.io/en/latest/) *technical preview*
- [Zowe SDK Sample Scripts](https://github.com/zowe/zowe-sdk-sample-scripts/)

## SDK software requirements and dependencies

### Java SDK

Requires Java Runtime Environment (JRE) 17.

To install this library in your project, use a build tool such as Maven, Gradle, or Ant. Get the necessary artifacts from the [Java SDK repository](https://mvnrepository.com/artifact/org.zowe.client.java.sdk/zowe-client-java-sdk).

If you add the Java SDK as a dependency to your project, Maven or Gradle automatically downloads any additional dependencies needed to use the SDK.

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

For detailed information about how to install the library, refer to [the official installation guide for Zowe Client Kotlin SDK](https://zowe.github.io/zowe-client-kotlin-sdk/#installation)

### Node.js

If you install Node SDK packages from the [online registry](#installing-an-sdk-from-an-online-registry), the required dependencies are installed automatically.

If you download Node SDK packages from Zowe.org, the downloaded folder contains dependencies that you must install manually. Extract the `TGZ` files from the folder, copy the files to your project, and issue the following commands to install the dependencies:

```
npm install imperative.tgz
```

```
npm install core-for-zowe-sdk.tgz
```

### Python SDK *technical preview*

If you install Python SDK packages from the [online registry](#installing-an-sdk-from-an-online-registry), the required dependencies are installed automatically.

If you download the Python SDK packages from Zowe.org, the downloaded folder contains dependencies that you must install manually. Extract the `WHL` files from the folder, copy the files to your project, and issue the following command for each dependency:

```
pip install <fileName>.whl
```

## Installing a Zowe Client SDK

To get started, import the SDK package to your project. You can pull the packages from an online registry, or download the packages from Zowe.org to install locally.

### Installing an SDK from an online registry

Pull the packages from an online registry such as npm or PyPi:

1. In command-line window, navigate to your project directory. Issue the following command to install a package from the registry:

   - To import a Node.js package: `npm install <PackageName>`
   - To import a Python package: `pip install <PackageName>`

      - `<packageName>`
      The name of the SDK package that you want to install, such as `zos-files-for-zowe-sdk`.

    The package is installed.
      
      - Node packages are defined in `package.json` in your project.
      - Python packages are installed by default to `$PYTHONPATH/Lib/site-packages` (Linux) or to the Python folder in your local `/AppData` folder (Windows).
      - For the Java and Kotlin SDKs, Maven puts libraries in the `~/.m2/repository` directory and Gradle puts libraries in the `~/.gradle/caches/modules-2/files-2.1` directory, where `~` represents the path to the user's home directory.

2. **(Optional)** You might want to automatically update the SDK version when updates become available, or you might want to prevent automatic updates.

    - To define the versioning scheme for Node packages, use [semantic versioning](https://docs.npmjs.com/about-semantic-versioning).

    - To define versioning for Python packages, specify versions or version ranges in a `requirements.txt` file checked-in to your project. For more information, see [pip install](https://pip.pypa.io/en/stable/cli/pip_install/) in the pip documentation.

   - To define versioning for Python packages, specify versions or version ranges in the `pom.xml` or `build.gradle` files checked-in to your project.
   
      - In Maven, versioning ranges can be [specified in the `pom.xml` file](https://cwiki.apache.org/confluence/display/MAVENOLD/Dependency+Mediation+and+Conflict+Resolution#DependencyMediationandConflictResolution-DependencyVersionRanges).

      - In Gradle, versioning ranges can be [specified in the `build.gradle` file](https://docs.gradle.org/current/userguide/single_versions.html).

### Installing an SDK from a local package

Download and install the packages:

1. Navigate to [Zowe.org Downloads](https://www.zowe.org/download.html). Select your desired programming language in the **Zowe Client SDKs** section.

   The SDK is downloaded to your computer.

2. Unzip the SDK folder, which contains the packages for each set of functionality (such as z/OS Jobs). Copy each file that you want to install and paste them into your project directory.

3. Install required dependencies, which are included in the bundle. See [Software requirements and dependencies](#sdk-software-requirements-and-dependencies) for more information.

4. In a command-line window, navigate to your project directory. Issue *one* of the following commands.

   - To install a Node.js package: `npm install <packageName>.tgz`
   - To install a Python package: `pip install <packageName>.whl`

      -`<packageName>`
      The name of the package that you want to install, such as `zos-files-for-zowe-sdk`.

5. Repeat the command for each package that you need.

    Packages are now installed.
