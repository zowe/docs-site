# Introduction

Zowe (server) containers are available for download as an alternative to running Zowe servers on z/OS through the convenience pax and SMPE releases. You can choose the appropriate installation type for your use case. There are several advantages for containers wherein you can:

* Run Zowe servers on other platforms including Linux on Z and your PC.
* Run Zowe servers local to your system for rapid development
* Run redundant copies of servers for scaling capacity to meet workload requirements
* Leverage container monitoring tools

The Zowe containers are designed to be run together with extensions and Zowe utilities, and therefore are built for orchestration software that can manage the relationship and lifecycle of the containers. The following guide covers how to use Zowe's containers with the Kubernetes orchestration software. If you are new to containers, you can learn about the concepts from the [Kubernetes website](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

