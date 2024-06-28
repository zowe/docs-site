# Zowe SDKs installation

Leverage the Zowe Client Software Development Kits (SDKs) to build client applications and scripts that interface with the mainframe.

The SDKs include programmatic APIs, each of which performs a particular mainframe task. For example, one API package provides the ability to upload and download z/OS data sets. You can leverage that package to rapidly build a client application that interacts with data sets.

The following SDKs are available.
- Zowe Client Node.js SDK
- Zowe Client Python SDK *technical preview*
- Zowe Client Kotlin SDK *technical preview*
- Zowe Client Java SDK *under development*

## SDK documentation

For detailed SDK documentation, see the following:
- [Zowe Node.js SDK](https://docs.zowe.org/stable/typedoc/index.html)
- [Zowe Client Python SDK](https://zowe-client-python-sdk.readthedocs.io/en/latest/)

## Software requirements

### Node.js

If you install Node SDK packages from the online registry, the required dependencies are installed automatically.

If you download Node SDK packages from Zowe.org, the folder contains dependencies that you must install manually. Extract the `TGZ` files from the folder, copy the files to your project, and issue the following commands to install the dependencies.

```
npm install imperative.tgz
```

```
npm install core-for-zowe-sdk.tgz
```

### Python *technical preview*

If you install Python SDK packages from the online registry, the required dependencies are installed automatically.

If you download the Python SDK packages from Zowe.org, the downloaded folder contains dependencies that you must install manually. Extract the `WHL` files from the folder, copy the files to your project, and issue the following command for each dependency:

```
pip install <fileName>.whl
```

### Kotlin *technical preview*

If you install Kotlin SDK packages from the online registry, the required dependencies are installed automatically.

### Java *under development*

If you install Java SDK packages from the online registry, the required dependencies are installed automatically.

## Getting started

To get started, import the SDK packages to your project. You can pull the packages from an online registry, or download the packages from Zowe.org to install locally.