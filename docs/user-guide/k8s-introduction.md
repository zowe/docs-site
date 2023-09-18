# Introduction

Zowe (server) containers are available for download as an alternative to running Zowe servers on z/OS through the Zowe convenience and SMP/E builds. You can choose the appropriate installation type for your use case. There are several advantages of using containers wherein you can:

* Run Zowe servers on other platforms including Linux on Z and your PC
* Run Zowe servers local to your system for rapid development
* Run redundant copies of servers for scaling capacity to meet workload requirements
* Leverage container monitoring tools

If you are new to containers, you can learn about the concepts from the [Kubernetes website](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/).

## End-to-end installation diagram

The Zowe containers are designed to be run together with extensions and Zowe utilities and therefore are built for orchestration software that can manage the relationship and lifecycle of the containers. The following topics guide you to set up and use Zowe's containers with the Kubernetes orchestration software.

### Stage 1: Plan and prepare for the installation

<figure>
  <image usemap="#home_map1" border="0" id="container-install-flow" src={require("../images/install/container-install-1.png").default} width="850" alt="See each step to get more details on the flow." />
  <figcaption></figcaption>
</figure>

At Stage 1, you are going to make sure you have prepare your sofeware and hardware ready for installation, see details in [Prerequisites](k8s-prereqs.md).

### Stage 2: Download Zowe containers

<figure>
  <image usemap="#home_map1" border="0" id="container-install-flow" src={require("../images/install/container-install-2.png").default} width="850" alt="See each step to get more details on the flow." />
  <figcaption></figcaption>
</figure>

At Stage 2, you are going to download Zowe containers. Two downloading methods are available. The recommended one is to [download Configuration samples](../user-guide/k8s-downloading#downloading-configuration-samples). Another method is to [download container images](../user-guide/k8s-downloading#downloading-container-images).

### Stage 3 & 4: Install and configure Zowe containers

<figure>
  <image usemap="#home_map1" border="0" id="container-install-flow" src={require("../images/install/container-install-34.png").default} width="850" alt="See each step to get more details on the flow." />
  <figcaption></figcaption>
</figure>

At Stage 3, you do not need to install the Zowe containers if you use Zowe's Kubernetes configuration samples. If you download container images, an could be considered "installed" when it is findable by Kubernetes. See more information [here](../user-guide/k8s-downloading/#installing).

At Stage 4, you need to [configure Zowe container environment](../user-guide/k8s-config.md). And you can follow the steps.

**Step 1** [Create namespace and service account](../user-guide/k8s-config#1-create-namespace-and-service-account)
**Step 2** [Create Persistent Volume Claim (PVC)](../user-guide/k8s-config#2-create-persistent-volume-claim-pvc)
**Step 3** [Create and modify ConfigMaps and Secrets (Manually creating ConfigMaps and Secrets)](../user-guide/k8s-config#3-create-and-modify-configmaps-and-secrets)
**Step 4** [Expose API Mediation Layer components](../user-guide/k8s-config#4-expose-api-mediation-layer-components)

### Stage 5: Start Zowe containers

At Stage 5, you are supposed to [start Zowe containers](../user-guide/k8s-using/#starting-zowe-containers). You can [apply the deployment files to start Zowe containers](../user-guide/k8s-using#starting-zowe-containers). After starting Zowe containers, you can [veryify that Zowe containers are started](../user-guide/k8s-using#verifying-zowe-containers).

<figure>
  <image usemap="#home_map1" border="0" id="container-install-flow" src={require("../images/install/container-install-5.png").default} width="850" alt="See each step to get more details on the flow." />
  <figcaption></figcaption>
</figure>

### (Optional) Stage 6: Monitor Zowe containers

At Stage 6, you can [monitor your containers](../user-guide/k8s-using#monitoring-zowe-containers) and see if it works well.

<figure>
  <image usemap="#home_map1" border="0" id="container-install-flow" src={require("../images/install/container-install-6.png").default} width="850" alt="See each step to get more details on the flow." />
  <figcaption></figcaption>
</figure>


## Known limitations

* You may encounter an issue that some plugins are not showing up in Zowe Desktop. You can try the **Refresh Applications** icon showing up in Desktop start menu.
* You may encounter an issue that some services are not showing up in Zowe API Catalog. You can try the **Refresh Static APIs** button showing up in upper-right corner of API Catalog web page.
* `useConfigmgr` is disabled within containers, therefore yaml schema validation is not yet supported.
