# Introduction

Zowe (server) containers are available for download as an alternative to running Zowe servers on z/OS through the Zowe convenience and SMP/E builds. You can choose the appropriate installation type for your use case. There are several advantages of using containers wherein you can:

* Run Zowe servers on other platforms including Linux on Z and your PC
* Run Zowe servers local to your system for rapid development
* Run redundant copies of servers for scaling capacity to meet workload requirements
* Leverage container monitoring tools

If you are new to containers, you can learn about the concepts from the [Kubernetes website](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/).

## End-to-end diagram

<figure>
  <image usemap="#home_map1" border="0" id="container-install-flow" src={require("../images/install/containerization-install.png").default} width="850" alt="Click each step to get more details on the flow." />
  <figcaption></figcaption>
</figure>
<map name="home_map1" id="home_map1">
  <area href="https://docs.zowe.org/stable/user-guide/k8s-prereqs" target="_blank" alt="Prerequistes" title="Prerequistes" shape="rect" coords="63, 162, 240, 128" />
  <area href="https://docs.zowe.org/stable/user-guide/systemrequirements-zos/" target="_blank" alt="Plan and prepare for the installation" title="Plan and prepare for the installation" shape="rect" coords="785, 208, 1047, 248" />
  <area href="https://www.zowe.org/download.html" target="_blank" alt="Download Zowe SMP/E build" title="Download the Zowe SMP/E build from zowe.org" shape="rect" coords="22, 330, 195, 375" />
  <area href="https://docs.zowe.org/stable/user-guide/install-zowe-smpe" target="_blank" alt="Install the Zowe SMP/E build using JCLs" title="Install the Zowe SMP/E build using JCLs" shape="rect" coords="38, 399, 180, 460" />

  <area href="https://www.zowe.org/download.html" target="_blank" alt="Download the Zowe convenience build" title="Download the Zowe convenience build from zowe.org" shape="rect" coords="277, 331, 461, 375" />
  <area href="https://docs.zowe.org/stable/user-guide/install-zowe-zos-convenience-build/#obtaining-and-preparing-the-convenience-build" target="_blank" alt="Verify, transfer, and expand the PAX file on z/OS" title="Verify, transfer, and expand the PAX file on z/OS" shape="rect" coords="278, 391, 460, 434" />

  <area href="https://docs.zowe.org/stable/user-guide/install-zowe-zos-convenience-build/#installing-the-zowe-runtime" target="_blank" alt="Install the Zowe runtime using shell script" title="Install the Zowe runtime using shell script" shape="rect" coords="171, 516, 304, 574" />
  <area href="https://docs.zowe.org/stable/user-guide/install-zowe-zos-convenience-build/#installing-the-zowe-runtime" target="_blank" alt="Install the Zowe runtime with z/OSMF workflow" title="Install the Zowe runtime with z/OSMF workflow" shape="rect" coords="425, 513, 560, 572" />

  <area href="https://docs.zowe.org/stable/user-guide/configure-zos-system" target="_blank" alt="Configure the z/OS system for Zowe using ZWESECUR" title="Configure the z/OS system for Zowe using ZWESECUR" shape="rect" coords="11, 801, 383, 847" />
  <area href="https://docs.zowe.org/stable/user-guide/configure-certificates" target="_blank" alt="Configure Zowe certificates using shell script" title="Create the Zowe certificates keystore directory using shell script" shape="rect" coords="11, 882, 383, 925" />
  <area href="https://docs.zowe.org/stable/user-guide/configure-xmem-server" target="_blank" alt="Configure the Zowe cross memory server using shell script" title="Install and configure the Zowe cross memory server (ZWESISTC) using shell script" shape="rect" coords="11, 962, 384, 1007" />
  <area href="https://docs.zowe.org/stable/user-guide/configure-instance-directory" target="_blank" alt="Create and configure the Zowe instance directory using shell script" title="Create and configure the Zowe instance directory using shell script" shape="rect" coords="12, 1041, 383, 1081" />
  <area href="https://docs.zowe.org/stable/user-guide/configure-zowe-server" target="_blank" alt="Install and start the Zowe started task using shell script" title="Install and start the Zowe started task (ZWESVSTC) using shell script" shape="rect" coords="10, 1117, 381, 1161" />

  <area href="https://docs.zowe.org/stable/user-guide/configure-zowe-zosmf-workflow/#configure-z-os-security-manager" target="_blank" alt="Configure Zowe security manager with z/OSMF workflow" title="Configure Zowe security manager with z/OSMF workflow" shape="rect" coords="486, 802, 774, 847" />
  <area href="https://docs.zowe.org/stable/user-guide/configure-zowe-zosmf-workflow/#configure-zowe-certificates" target="_blank" alt="Configure Zowe certificates with z/OSMF workflow" title="Configure Zowe certificates with z/OSMF workflow" shape="rect" coords="486, 883, 778, 927" />
  <area href="https://docs.zowe.org/stable/user-guide/configure-zowe-zosmf-workflow/#configure-zowe-cross-memory-server" target="_blank" alt="Configure Zowe Cross Memory Server with z/OSMF workflow" title="Configure Zowe Cross Memory Server with z/OSMF workflow" shape="rect" coords="486, 962, 776, 1008" />
  <area href="https://docs.zowe.org/stable/user-guide/configure-zowe-zosmf-workflow/#create-and-configure-the-zowe-instance-directory-and-start-the-zowe-started-task" target="_blank" alt="Create and configure the Zowe instance directory and start Zowe with z/OSMF workflow" title="Create and configure the Zowe instance directory and start Zowe with z/OSMF workflow" shape="rect" coords="486, 1043, 774, 1081" />

  <area href="https://www.zowe.org/download.html" target="_blank" alt="Download the PSWI build" title="Download the PSWI build" shape="rect" coords="595, 333, 770, 374" />
  <area href="https://docs.zowe.org/stable/user-guide/install-zowe-pswi-acquire" target="_blank" alt="Verify, transfer, and expand the PAX file on z/OS" title="Verify, transfer, and expand the PAX file on z/OS" shape="rect" coords="593, 397, 770, 442" />
  <area href="https://docs.zowe.org/stable/user-guide/install-zowe-pswi-deployment" target="_blank" alt="Install the Zowe SMP/E using PSWI" title="Install the Zowe SMP/E using PSWI" shape="rect" coords="593, 464, 770, 504" />
  <area href="https://docs.zowe.org/stable/user-guide/install-zowe-pswi-deployment" target="_blank" alt="Mount Zowe zFS workflow ZWE9MNT" title="Mount Zowe zFS workflow ZWE9MNT" shape="rect" coords="593, 527, 770, 570" />

  <area href="https://docs.zowe.org/stable/user-guide/verify-zowe-runtime-install" target="_blank" alt="Verify Zowe installation on z/OS" title="Verify Zowe installation on z/OS" shape="rect" coords="191, 1232, 602, 1269" />
</map>

The Zowe containers are designed to be run together with extensions and Zowe utilities and therefore are built for orchestration software that can manage the relationship and lifecycle of the containers. The following topics guide you to set up and use Zowe's containers with the Kubernetes orchestration software.

1. [Prerequisites](k8s-prereqs.md)
2. [Downloading and installing](k8s-downloading.md)
3. [Configuring the Zowe container environment](k8s-config.md)
4. [Starting, stopping, and monitoring](k8s-using.md)
5. [Known limitations](#known-limitations)

## Known limitations

* You may encounter an issue that some plugins are not showing up in Zowe Desktop. You can try the **Refresh Applications** icon showing up in Desktop start menu.
* You may encounter an issue that some services are not showing up in Zowe API Catalog. You can try the **Refresh Static APIs** button showing up in upper-right corner of API Catalog web page.
* `useConfigmgr` is disabled within containers, therefore yaml schema validation is not yet supported.
