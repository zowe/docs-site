# Introduction

Zowe (server) containers are available for download as an alternative to running Zowe servers on z/OS through the Zowe convenience and SMP/E builds. You can choose the appropriate installation type for your use case. There are several advantages of using containers wherein you can:

* Run Zowe servers on other platforms including Linux on Z and your PC
* Run Zowe servers local to your system for rapid development
* Run redundant copies of servers for scaling capacity to meet workload requirements
* Leverage container monitoring tools

If you are new to containers, you can learn about the concepts from the [Kubernetes website](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/).

The Zowe containers are designed to be run together with extensions and Zowe utilities, and therefore are built for orchestration software that can manage the relationship and lifecycle of the containers. The following topics guide you to set up and use Zowe's containers with the Kubernetes orchestration software. 

1. [Prerequisites](k8s-prereqs.md)
2. [Downloading and installing](k8s-downloading.md)
3. [Configuring the Zowe container environment](k8s-config.md)
4. [Starting, stopping, and monitoring](./k8s-using)
5. [Known limitations](#known-limitations)

## Known limitations

- IP Explorer App Framework application is not currently available in Kubernetes deployment.
- You may have an issue that API Catalog is not showing up in Zowe Desktop. Temporary mitigation is restarting the api-catalog Pod.
- You may have issue to use API Catalog Try Out function. The test server is not reachable from your browser.
