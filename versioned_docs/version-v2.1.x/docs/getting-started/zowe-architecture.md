# Zowe architecture

Zowe&trade; is a collection of components that together form a framework that makes Z-based functionality accessible across an organization. Zowe functionality includes exposing Z-based components, such as z/OSMF, as REST APIs. The Zowe framework provides an environment where other components can be included and exposed to a broader non-Z based audience.

The following diagram illustrates the high-level Zowe architecture.

![Zowe Architecture Diagram](../images/common/zowe-architecture.png)

The diagram shows the default port numbers that are used by Zowe. These are dependent on each instance of Zowe and are held in the Zowe YAML configuration file.

Zowe components can be categorized by location: server or client. While the client is always an end-user tool such as a PC, browser, or mobile device, the server components can be further categorized by what machine they run on.

Zowe server components can be installed and run entirely on z/OS, but a subset of the components can alternatively run on Linux or z/Linux via Docker. While on z/OS, many of these components run under UNIX System Services (USS). The components that do not run under USS must remain on z/OS when using Docker in order to provide connectivity to the mainframe.

## Zowe architecture with high availability enablement on Sysplex

The following diagram illustrates the difference in locations of Zowe components when deploying Zowe into a Sysplex with high availability enabled as opposed to running all components on a single z/OS system.  

![Zowe Architecture Diagram with High Availability Enablement](../images/common/zowe-architecture-lpar.png)

Zowe has high availability feature build-in. To enable this feature, you can define `haInstances` section in your YAML configuration file.

The diagram above shows that `ZWESLSTC` has started two Zowe instances running on two separate LPARs that can be on the same or different sysplexes.  

- The Sysplex distributor port sharing enables the API Gateway 7554 ports to be shared so that incoming requests can be routed to either the gateway on LPAR A or LPAR B.
- The discovery servers on each LPAR communicate with each other and share their registered instances, which allows the API gateway on LPAR A to dispatch APIs to components either on its own LPAR, or alternatively to components on LPAR B. As indicated on the diagram, each component has two input lines: one from the API gateway on its own LPAR and one from the gateway on the other LPAR.  When one of the LPARs goes down, the other LPAR remains operating within the sysplex providing high availability to clients that connect through the shared port irrespective of which Zowe instance is serving the API requests.

The `zowe.yaml` file can be configured to start Zowe instances on more than two LPARS, and also to start more than one Zowe instance on a single LPAR, thereby providing a grid cluster of Zowe components that can meet availability and scalability requirements.  

The configuration entries of each LPAR in the `zowe.yaml` file control which components are started. This configuration mechanism makes it possible to start just the desktop and API Mediation Layer on the first LPAR, and start all of the Zowe components on the second LPAR. Because the desktop on the first LPAR is available to the gateway of the second LPAR, all desktop traffic is routed there.  

The caching services for each Zowe instance, whether on the same LPAR, or distributed across the sysplex, are connected to each other by the same shared VSAM data set.  This arrangement allows state sharing so that each instance behaves similarly to the user irrespective of where their request is routed.  

For simplification of the diagram above, the Jobs and Files API servers are not shown as being started. If the user defines Jobs and Files API servers to be started in the `zowe.yaml` configuration file, these servers behave the same as the servers illustrated. In other words, these services register to their API discovery server which then communicates with other discovery servers on other Zowe instances on either the same or other LPARs. The API traffic received by any API gateway on any Zowe instance is routed to any of the Jobs or Files API components that are available.  

To learn more about Zowe with high availability enablement, see [Configuring Sysplex for high availability](../user-guide/configure-sysplex.md).

## Zowe architecture when running in Kubernetes cluster

The following diagram illustrates the difference in locations of Zowe components when deploying Zowe into a Kubernetes cluster as opposed to running all components on a single z/OS system.

![Zowe Architecture Diagram in Kubernetes](../images/common/zowe-architecture-k8s.png)

When deploying other server components into container orchestration software like Kubernetes, Zowe follows standard Kubernetes practices. The cluster can be monitored and managed with common Kubernetes administration methods.

- All Zowe workloads run on a dedicated namespace (`zowe` by default) to distinguish from other workloads in same Kubernetes cluster.
- Zowe has its own `ServiceAccount` to help with managing permissions.
- Server components use similar `zowe.yaml` on z/OS, which are stored in `ConfigMap` and `Secret`, to configure and start.
- Server components can be configured by using the same certificates used on z/OS components.
- Zowe claims its own `Persistent Volume` to share files across components.
- Each server component runs in separated containers.
- Components may register themselves to Discovery with their own `Pod` name within the cluster.
- Zowe workloads use the `zowe-launch-scripts` `initContainers` step to prepare required runtime directories.
- Only necessary components ports are exposed outside of Kubernetes with `Service`.
## App Server

The App Server is a node.js server that is responsible for the Zowe Application Framework. This server provides the Zowe desktop, which is accessible through a web browser via port 7556. The Zowe desktop includes a number of applications that run inside the Application Framework such as a 3270 emulator and a File Editor.

![Zowe Desktop Diagram](../images/mvd/zowe-desktop.png)

The App Server server logs write to `<zowe.logDirectory>/appServer-yyyy-mm-dd-hh-mm.log`.  The Application Framework provides REST APIs for its services that are included on the API catalog tile `Zowe Application Framework` that can be viewed at `https://<ZOWE_HOST_IP>:7554/apicatalog/ui/v1/#/tile/ZLUX/zlux`.

## ZSS

The Zowe desktop delegates a number of its services to the ZSS server which it accesses through the http port 7557. ZSS is written in C and has native calls to z/OS to provide its services. ZSS logs write to `STDOUT` and `STDERR` for capture into job logs, but also as a file into `<zowe.logDirectory>/zssServer-yyyy-mm-dd-hh-mm.log`.  

## API Gateway

The API Gateway is a proxy server that routes requests from clients on its northbound edge, such as web browsers or the Zowe command line interface, to servers on its southbound edge that are able to provide data to serve the request. The API Gateway is also responsible for generating the authentication token used to provide single sign-on (SSO) functionality. The API Gateway homepage is `https://<ZOWE_HOST_IP>:7554`. Following authentication, this URL enables users to navigate to the API Catalog.

![Zowe API Mediation Layer](../images/api-mediation/api-mediationlayer.png)

## API Catalog

The API Catalog provides a list of the API services that have registered themselves as catalog tiles. These tiles make it possible to view the available APIs from Zowe's southbound servers, as well as test REST API calls.  

![Zowe API Catalog](../images/api-mediation/api-catalog.png)

## API Discovery

The API Discovery server acts as the registration service broker between the API Gateway and its southbound servers. This server can be accessed through the URL `https://<ZOWE_HOST_IP>:7552` making it possible to view a list of registered API services on the API discovery homepage.

![Zowe API Discovery](../images/api-mediation/api-discovery.png)

## Caching service

The Caching service aims to provide an API which offers the possibility to store, retrieve, and delete data associated with keys. The service is used only by internal Zowe applications and is not exposed to the internet. The Caching service URL is `https://<ZOWE_HOST_IP>:7555`.
For more information about the Caching service, see the [Caching service documentation](../extend/extend-apiml/api-mediation-caching-service.md).

## Desktop Apps

Zowe provides a number of rich GUI web applications for working with z/OS. Such applications include the Editor for files and datasets, the JES Explorer for jobs, and the IP Explorer for the TCPIP stack. You can access them through the Zowe desktop.

![Zowe Desktop Explorers](../images/mvd/desktop-explorers.png)

### File API and JES API

The File API server provides a set of REST APIs for working with z/OS data sets and Unix files. These APIs can be abled in zowe server configuration.  

The JES API server provides a set of REST APIs for working with JES. These APIs can be abled in zowe server configuration.

Both the File API and JES API servers are registered as tiles on the API Catalog, so users can view the Swagger definition and test API requests and responses.

## Cross Memory server

The Cross Memory server is a low-level privileged server for managing mainframe data securely.
For security reasons, it is not an HTTP server. Instead, this server has a trust relationship with ZSS. Other Zowe components can work through ZSS in order to handle z/OS data that would otherwise be unavailable or insecure to access from higher-level languages and software.

Unlike all of the servers described above which run under the `ZWESLSTC` started task as address spaces for USS processes, the Cross Memory server has its own separate started task `ZWESISTC` and its own user ID `ZWESIUSR` that runs the program `ZWESIS01`.
