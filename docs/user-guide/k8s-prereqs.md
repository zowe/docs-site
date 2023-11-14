# Preparing for Zowe server containers installation

Before you install the Zowe server container, make sure that you have the required software and environments.

* [Zowe installed on z/OS](install-zos.md) for users of ZSS and ZIS (default when you use the Zowe Application Framework `app-server`, the Zowe Desktop, or products that are based on them)

* z/OSMF installed on z/OS for users of it (default when you use `gateway`, API Mediation Layer, Web Explorers, or products that are based on them)

* A [container runtime](https://kubernetes.io/docs/setup/production-environment/container-runtimes/), such as:
  * Docker
  * CRI-O
  * containerd

* [Kubernetes Cluster software](#kubernetes-cluster)

* [kubectl](#kubectl-tool), for initial setup and management of the cluster

**Note**: This documentation uses container terminology that may be explained within the [Kubernetes Glossary](https://kubernetes.io/docs/reference/glossary/?fundamental=true).

## Kubernetes cluster

The Zowe containerization solution is compatible with Kubernetes v1.19+ or OpenShift v4.6+.

You can prepare a Kubernetes cluster based on your requirements in many different ways.

* For development purposes, you can set up a Kubernetes cluster on your local computer in one of the following ways:

  * [Enable Kubernetes shipped with Docker Desktop](https://docs.docker.com/desktop/kubernetes/)
  * [Set up minikube](https://minikube.sigs.k8s.io/docs/start/)  

  **Attention!** You must make sure that the Kubernetes cluster you have created has a minimum RAM of 3GB in order for Zowe to start.

* For production purposes, you can set up a Kubernetes cluster in one of the following ways:

  * Bootstrap your own cluster by following instructions in [Installing Kubernetes with deployment tools](https://kubernetes.io/docs/setup/production-environment/tools/) in the Kubernetes documentation.

  * Provision a Kubernetes cluster from popular Cloud vendors:
    * [Amazon Elastic Kubernetes Service](https://aws.amazon.com/eks/)
    * [Microsoft Azure Kubernetes Service](https://docs.microsoft.com/en-us/azure/aks/intro-kubernetes)
    * [IBM Cloud Kubernetes Service](https://www.ibm.com/ca-en/cloud/kubernetes-service)
    * [Google Cloud Kubernetes Engine](https://cloud.google.com/kubernetes-engine)

## `kubectl` tool

You need `kubectl` CLI tool installed on your local computer where you want to manage the Kubernetes cluster. For instructions on how to install the kubectl tool, see [Install Tools](https://kubernetes.io/docs/tasks/tools/) in the Kubernetes documentation.
