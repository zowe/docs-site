# Prerequisites

* [Zowe installed on z/OS](install-zos.md) for users of ZSS & ZIS (default when using `app-server`, the Zowe Desktop, or products based on either)

* z/OSMF installed on z/OS for users of it (default when using `gateway`, API Mediation Layer, Web Explorers, or products based on them)

* A [container runtime](https://kubernetes.io/docs/setup/production-environment/container-runtimes/), such as:
  * Docker
  * CRI-O
  * containerd

* [Kubernetes Cluster software](#kubernetes-cluster)

* [kubectl](#kubectl-tool), for initial setup and management of the cluster

**Note**: This documentation uses container terminology that may be explained within the [Kubernetes Glossary](https://kubernetes.io/docs/reference/glossary/?fundamental=true)

### Kubernetes Cluster

You can prepare a Kubernetes cluster based on your requirements in many different ways.

For development purpose, you can setup a Kubernetes cluster on your local computer by:

* [enabling Kubernetes shipped with Docker Desktop](https://docs.docker.com/desktop/kubernetes/)
* or [setting up minikube](https://minikube.sigs.k8s.io/docs/start/)

For production purpose, you can:

* bootstrap your own cluster by following this official document [Installing Kubernetes with deployment tools](https://kubernetes.io/docs/setup/production-environment/tools/).

* or provision a Kubernetes cluster from popular Cloud vendors:
  * [Amazon Elastic Kubernetes Service](https://aws.amazon.com/eks/)
  * [Microsfot Azure Kubernetes Service](https://docs.microsoft.com/en-us/azure/aks/intro-kubernetes)
  * [IBM Cloud Kubernetes Service](https://www.ibm.com/ca-en/cloud/kubernetes-service)
  * [Google Cloud Kubernetes Engine](https://cloud.google.com/kubernetes-engine)

### `kubectl` Tool

You need `kubectl` CLI tool installed on your local computer where you want to manage the Kubernetes cluster. For instructions on how to install the kubectl tool, see [Install Tools](https://kubernetes.io/docs/tasks/tools/).
