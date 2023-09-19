# Install server-side components using containers

As a system programmer, you can download Zowe (server) containers as an alternative to running Zowe servers on z/OS through the Zowe convenience and SMP/E builds. Choose the appropriate installation type for your use case. Using containers has numerous advantaages:

* You can run Zowe servers on other platforms including Linux on Z and your PC.
* You can run Zowe servers local to your system for rapid development.
* You cn run redundant copies of servers for scaling capacity to meet workload requirements
* You can leverage container monitoring tools.

If you are new to containers, you can learn about the key concepts at the [Kubernetes website](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/).

## End-to-end container installation

Zowe containers are designed to run together with extensions and Zowe utilities, and therefore are built for orchestration software that can manage the relationship and lifecycle of the containers. The following topics guide you to set up and use Zowe's containers with the Kubernetes orchestration software.

### Stage 1: Plan and prepare for the installation

<figure>
  <image usemap="#home_map1" border="0" id="container-install-flow" src={require("../images/install/container-install-1.png").default} width="850" alt="See each step to get more details on the flow." />
  <figcaption></figcaption>
</figure>

Stage 1 ensures that your software and hardware are prepared for installation. For more information, see [Prerequisites for Zowe server containers](k8s-prereqs.md).

### Stage 2: Download Zowe containers

<figure>
  <image usemap="#home_map1" border="0" id="container-install-flow" src={require("../images/install/container-install-2.png").default} width="850" alt="See each step to get more details on the flow." />
  <figcaption></figcaption>
</figure>

In Stage 2, you download the Zowe containers. Two downloading methods are available.
* [Download Configuration samples](../user-guide/k8s-downloading#downloading-configuration-samples).(This is the recommended method) 
* [Download container images](../user-guide/k8s-downloading#downloading-container-images).

### Stage 3 & 4: Install and configure Zowe containers

<figure>
  <image usemap="#home_map1" border="0" id="container-install-flow" src={require("../images/install/container-install-34.png").default} width="850" alt="See each step to get more details on the flow." />
  <figcaption></figcaption>
</figure>

At Stage 3, you do not need to install the Zowe containers if you use Zowe's Kubernetes configuration samples. If you download container images, an could be considered "installed" when it is findable by Kubernetes. See more information [here](../user-guide/k8s-downloading/#installing).

At Stage 4, you [configure the Zowe container environment](../user-guide/k8s-config.md). Follow these steps:

1. [Create namespace and service account](../user-guide/k8s-config#1-create-namespace-and-service-account)
2. [Create Persistent Volume Claim (PVC)](../user-guide/k8s-config#2-create-persistent-volume-claim-pvc)
3. [Create and modify ConfigMaps and Secrets (Manually creating ConfigMaps and Secrets)](../user-guide/k8s-config#3-create-and-modify-configmaps-and-secrets)
4. [Expose API Mediation Layer components](../user-guide/k8s-config#4-expose-api-mediation-layer-components)

### Stage 5: Start Zowe containers

In Stage 5, you [start Zowe containers](../user-guide/k8s-using/#starting-zowe-containers). 
Follow these steps:
1. [Apply the deployment files to start Zowe containers](../user-guide/k8s-using#starting-zowe-containers). 
2. After you start Zowe containers, [verify that Zowe containers are started](../user-guide/k8s-using#verifying-zowe-containers).

<figure>
  <image usemap="#home_map1" border="0" id="container-install-flow" src={require("../images/install/container-install-5.png").default} width="850" alt="See each step to get more details on the flow." />
  <figcaption></figcaption>
</figure>

### (Optional) Stage 6: Monitor Zowe containers

In Stage 6, [monitor your containers](../user-guide/k8s-using#monitoring-zowe-containers) to verify that it is functioning properly.

<figure>
  <image usemap="#home_map1" border="0" id="container-install-flow" src={require("../images/install/container-install-6.png").default} width="850" alt="See each step to get more details on the flow." />
  <figcaption></figcaption>
</figure>


## Known limitations

* You may encounter an issue that some plugins are not showing up in Zowe Desktop. You can try the **Refresh Applications** icon showing up in Desktop start menu.
* You may encounter an issue that some services are not showing up in Zowe API Catalog. You can try the **Refresh Static APIs** button showing up in upper-right corner of API Catalog web page.
* `useConfigmgr` is disabled within containers, therefore yaml schema validation is not yet supported.
