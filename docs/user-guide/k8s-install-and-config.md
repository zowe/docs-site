## Introduction

Zowe (server) containers are available for download as an alternative to running Zowe servers on z/OS through the convenience pax and SMPE releases. You can choose which installation type is right for your use case, and for containers there are several advantages:

* Being able to run Zowe servers on other platforms including Linux on Z and your PC
    * Running Zowe servers local to your system for rapid development
* Running redundant copies of servers for scaling capacity to meet workload requirements
* Being able to leverage container monitoring tools

The Zowe containers are designed to be run together with extensions and Zowe utilities, and therefore are built for orchestration software that can manage the relationship and lifecycle of the containers. The following guide covers how to use Zowe's containers with the Kubernetes orchestration software. If you are new to containers, you can learn about the concepts from the [Kubernetes website](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

## Prerequisites

* Zowe installed on z/OS for users of ZSS & ZIS (default when using `app-server`, the Zowe Desktop, or products based on either)

* z/OSMF installed on z/OS for users of it (default when using `gateway`, API Mediation Layer, Web Explorers, or products based on them)

* A [container runtime](https://kubernetes.io/docs/setup/production-environment/container-runtimes/), such as:
    * Docker
    * CRI-O
    * containerd

* [Kubernetes Cluster software](#kubernetes-cluster)

* [kubectl](#kubectl-tool), for initial setup and management of the cluster

## Terminology

This documentation uses container terminology that may be explained within the [Kubernetes Glossary](https://kubernetes.io/docs/reference/glossary/?fundamental=true)

### Kubernetes Cluster

There are many ways to prepare a Kubernetes cluster based on your requirements.

For development purpose, you can setup a Kubernetes cluster on your local computer by:

- [enabling Kubernetes shipped with Docker Desktop](https://docs.docker.com/desktop/kubernetes/)
- or [setting up minikube](https://minikube.sigs.k8s.io/docs/start/)

For production purpose, you can:

- bootstrap your own cluster by following this official document [Installing Kubernetes with deployment tools](https://kubernetes.io/docs/setup/production-environment/tools/).
- or provision a Kubernetes cluster from popular Cloud vendors:
  * [Amazon Elastic Kubernetes Service](https://aws.amazon.com/eks/)
  * [Microsfot Azure Kubernetes Service](https://docs.microsoft.com/en-us/azure/aks/intro-kubernetes)
  * [IBM Cloud Kubernetes Service](https://www.ibm.com/ca-en/cloud/kubernetes-service)
  * [Google Cloud Kubernetes Engine](https://cloud.google.com/kubernetes-engine)

### `kubectl` Tool

You need `kubectl` CLI tool installed on your local computer where you want to manage the Kubernetes cluster. Please follow appropriate steps from official documentation [Install Tools](https://kubernetes.io/docs/tasks/tools/).

## Downloading

Downloading Zowe's container images manually is not required, since this can be done automatically when applying a Kubernetes [deployment configuration](#apply-zowe-core-components-and-start-zowe).

However, it is possible to get the images without letting Kubernetes do the download. Using commands such as `docker pull` or `docker load` can allow you to get an image from a registry or attach an image you have downloaded directly. Zowe's container images can be found at:

Registry: zowe-docker-release.jfrog.io
Organization: ompzowe

Full image addresses include,
zowe-docker-release.jfrog.io/ompzowe/gateway-service:latest-ubuntu
zowe-docker-release.jfrog.io/ompzowe/app-server:latest-ubuntu
zowe-docker-release.jfrog.io/ompzowe/explorer-jes:latest-ubuntu

## Installing

You do not need to do any install task if using Zowe's Kubernetes configuration samples, it is automatic.

An image could be considered "Installed" when it is findable by Kubernetes. Just like downloading, this is done automatically by Kubernetes but commands such as `docker pull` or `docker load` will accomplish the same task.

## Configuring

Zowe provides sample configurations that make it easy to get Zowe running in Kubernetes.
You can use these directly, or as a reference.
If you'd like to customize the configuration, note the following objects that are expected by the container deployments:

|    Kind   | Name | Note |
|-----------|------|------|
| Namespace | zowe | |
| ServiceAccount | zowe-sa | |
| ConfigMap | zowe-certificates-cm | Contains zowe-certificates.env with the same format as seen on z/OS keystore |
| Secret | zowe-certificates-secret | Contains the base64 PEM and P12 data for keystore and truststore |
| Ingress | discovery-ingress | Used for external access to the Discovery service |
| Ingress | gateway-ingress | Used for external access to the Gateway service |
| Route | discovery | Used for external access to the Discovery service |
| Route | gateway | Used for external access to the Gateway service |
| Service | discovery-service | Used for external access to the Discovery service |
| Service | gateway-service | Used for external access to the Gateway service |
| PersistentVolumeClaim | zowe-workspace-pvc | |

### 1. Create Namespace and Service Account

This creates Zowe's namespace `zowe` with service account `zowe-sa`.
Please note that by default, `zowe-sa` service account has `automountServiceAccountToken` disabled for security purpose.

```
kubectl apply -f common/zowe-ns.yaml
kubectl apply -f common/zowe-sa.yaml
```

To verify:

- `kubectl get namespaces` should show a Namespace `zowe`.
- `kubectl get serviceaccounts --namespace zowe` should show a ServiceAccount `zowe-sa`.

### 2. Create Persistent Volume Claim (PVC)

Zowe's PVC has a default StorageClass value that may not apply to all Kubernetes clusters. Check and customize the `storageClassName` value of `samples/workspace-pvc.yaml` as needed, using `kubectl get sc` to confirm which StorageClass you can use. Then apply the result:

```
kubectl apply -f samples/workspace-pvc.yaml
```

To verify:

- `kubectl get pvc --namespace zowe` should show `STATUS` as `Bound`

### 3. Create And Modify ConfigMaps and Secrets

The Kubernetes environment can re-use instance and keystore configuration from a pre-existing Zowe z/OS install (v1.24+).
If you want to manually create, or later customize the ConfigMaps and Secrets, [read this section about customization](#customizing-or-manually-creating-configmaps-and-secrets)
On z/OS, run this command:

```
cd <instance-dir>
./bin/utils/convert-for-k8s.sh > zowe-config-exported-k8s.yaml
```

This creates a file, `zowe-config-exported-k8s.yaml`.
It contains ConfigMaps (`zowe-config`, `zowe-certificates-cm`) and Secrets (`zowe-certificates-secret`) Kubernetes objects which are based upon the Zowe instance and keystore used. The content should looks similar to `samples/config-cm.yaml`, `samples/certificates-cm.yaml` and `samples/certificates-secret.yaml` but with real values.

Copy the file over to the computer with Kubernetes, and remove the .yaml file from z/OS for security.
Then, apply the file into Kubernetes:

```
`kubectl apply -f /path/to/your/zowe-config-exported-k8s.yaml`
```

To verify:

- `kubectl get configmaps --namespace zowe` should show two ConfigMaps `zowe-config` and `zowe-certificates-cm`.
- `kubectl get secrets --namespace zowe` should show a Secret `zowe-certificates-secret`.


### 4. Expose Gateway and Discovery

This step varies depending upon your Kubernetes cluster configuration. If you are uncertain about this section, please contact your Kubernetes administrator or reach out to the Zowe community.

#### Create Service

You can setup either a `LoadBalancer` or `NodePort` type Service.
`LoadBalancer`: A good Service choice when using Kubernetes provided by:
  * Cloud Vendors
  * Docker Desktop

`NodePort`: A good Service choice when using Kubernetes running on your server hardware, such as with minikube, or if you don't have a load balancer.


*Option 1 - Applying LoadBalancer Service*

Run:

```
kubectl apply -f samples/gateway-service-lb.yaml
kubectl apply -f samples/discovery-service-lb.yaml
```

*Option 2 - Applying NodePort Service*

Check `samples/gateway-service-np.yaml` and `samples/discovery-service-np.yaml` to verify or change these values:

- `spec.type`.
- `spec.ports[0].nodePort`, this will be the port be exposed to external. Which means, if you are using `NodePort` service, the default gateway port is not `7554` but `32554`. You can use `https://<your-k8s-node>:32554/` to access APIML Gateway.

Then run:

```
kubectl apply -f samples/gateway-service-lb.yaml
kubectl apply -f samples/discovery-service-lb.yaml
```


To Verify:
- `kubectl get services --namespace zowe` should show two Services `gateway-service` and `discovery-service`.

#### Create Ingress

You may not need to define an `Ingress` if:

- You choose `NodePort` for the Services and, 
- The Kubernetes cluster is from a Cloud vendor or Docker Desktop.

Before applying, check and set the value of `spec.rules[0].http.host` in `samples/gateway-ingress.yaml` and `samples/discovery-ingress.yaml`.

Then run:

```
kubectl apply -f samples/gateway-ingress.yaml
kubectl apply -f samples/discovery-ingress.yaml
```

To verify:

- `kubectl get ingresses --namespace zowe` should show two Ingresses `gateway-ingress` and `discovery-ingress`.

#### Create Route

If you are using OpenShift, usually you need to define `Route` instead of `Ingress`.

Before applying, check and set the value of `spec.port.targetPort` in `samples/gateway-route.yaml` and `samples/discovery-route.yaml`.

Then run:

```
oc apply -f samples/gateway-route.yaml
oc apply -f samples/discovery-route.yaml
```

To verify:

- `oc get routes --namespace zowe` should show two Services `gateway` and `discovery`.

### 5. Port forwarding

For debugging or development, you may wish to port forward to make Zowe gateway or discovery service available externally quickly. You can try this command:

```
kubectl port-forward -n zowe svc/gateway-service --address=<your-ip> <external-port>:<internal-port, such as 7554> &`
```

The `&` at the command will run the command as a background process, as otherwise it will occupy the terminal indefintely until canceled as a foreground service.


## Starting Zowe containers

The Kubernetes cluster will automatically start as many containers as needed per service according to the Deployment configuration.
Applying the deployment files will therefore start the containers right away.

Run:

```
kubectl apply -f workloads/
```

To verify:

- `kubectl get deployments --namespace zowe` should show you a list of deployments including `explorer-jes`, `gateway-service`, `app-server`, etc. Each deployment should show `1/1` in `READY` column. It could take a moment before all deployments say `1/1`.
- `kubectl get statefulsets --namespace zowe` should show you a StatefulSet `discovery` which `READY` column should be `1/1`.
- `kubectl get cronjobs --namespace zowe` should show you a CronJob `cleanup-static-definitions` which `SUSPEND` should be `False`.

## Monitoring Zowe containers

### By UI

Kubernetes provides a container that allows you to manage your cluster through a web browser. When using Docker Desktop, it is already installed in the namespace `kubernetes-dashboard`.  [See the Kubernetes website for install instructions.](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/)

[Metrics Server](https://github.com/kubernetes-sigs/metrics-server) is also recommended and is required if you want to define [Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/). Check if you have `metrics-server` `Service` in `kube-system` namespace with this command `kubectl get services --namespace kube-system`. If you don't have, you can follow this [Installation](https://github.com/kubernetes-sigs/metrics-server#installation) instruction to install.

### By CLI

`kubectl` allows you to see the status of any Kind of object with `get`. This applys to the [table in the configuring section](#configuring) but also for the pods that run the Zowe containers.

Try some of these commands:

* `kubectl get pods -n zowe` lists the status of the components of Zowe
* `kubectl describe pods -n zowe <podid>` can see more details about each pod
* `kubectl logs -n zowe <podid>` will show you the terminal output of a particular pod, with `-f` allowing you to keep the logs open as new messages are added.
* `kubectl get nodes -n zowe -owide` will tell you more about the environment you're running, in case


## Stopping, pausing, or removing Zowe containers

To temporarily stop a component, you can find the component `Deployment` and scale down to `0`. To use `jobs-api` as example, run this command:

```
kubectl scale -n zowe deployment jobs-api --replicas=0
```

Scaling the component back to 1 or more to re-enable the component.

If you want to permanently remove a component, you can delete the component `Deployment`. To use `jobs-api` as example, run this command:

```
kubectl delete -n zowe deployment jobs-api
```

#### Customizing or manually creating ConfigMaps and Secrets

If you instead want to manually create the ConfigMaps and Secrets used by Zowe containers, 3 objects must be made:

1. A ConfigMap, with values based upon a Zowe instance's `instance.env` and similar to the example `samples/config-cm.yaml`, with the following differences to the values seen on a z/OS install:

- `ZOWE_EXPLORER_HOST`, `ZOWE_IP_ADDRESS`, `ZWE_LAUNCH_COMPONENTS`, `ZWE_DISCOVERY_SERVICES_LIST` and `SKIP_NODE` are not needed for Zowe running in Kubernetes and will be ignored. You can remove them.
- `JAVA_HOME` and `NODE_HOME` are not usually needed if you are using Zowe base images.
- `ROOT_DIR` must be set to `/home/zowe/runtime`.
- `KEYSTORE_DIRECTORY` must be set to `/home/zowe/keystore`.
- `ZWE_EXTERNAL_HOSTS` is suggested to define as a list domains you are using to access your Kubernetes cluster.
- `ZOWE_EXTERNAL_HOST=$(echo "${ZWE_EXTERNAL_HOSTS}" | awk -F, '{print $1}' | tr -d '[[:space:]]')` is needed to define after `ZWE_EXTERNAL_HOSTS`. It's the primary external domain.
- `ZOWE_ZOS_HOST` is recommended to be set to where the z/OS system where your Zowe ZSS/ZIS is running.
- `ZWE_DISCOVERY_SERVICES_REPLICAS` should be set to same value of `spec.replicas` defined in `workloads/discovery-statefulset.yaml`.
- All components running in Kubernetes should use default ports:
  * `CATALOG_PORT` is `7552`,
  * `DISCOVERY_PORT` is `7553`,
  * `GATEWAY_PORT` is `7554`,
  * `ZWE_CACHING_SERVICE_PORT` is `7555`,
  * `JOBS_API_PORT` is `8545`,
  * `FILES_API_PORT` is `8547`,
  * `JES_EXPLORER_UI_PORT` is `8546`,
  * `MVS_EXPLORER_UI_PORT` is `8548`,
  * `USS_EXPLORER_UI_PORT` is `8550`,
  * `ZOWE_ZLUX_SERVER_HTTPS_PORT` is `8544`.
- `ZOWE_ZSS_SERVER_PORT` should be set to the port where your Zowe ZSS is running on `ZOWE_ZOS_HOST`.
- `APIML_GATEWAY_EXTERNAL_MAPPER` should be set to `https://${GATEWAY_HOST}:${GATEWAY_PORT}/zss/api/v1/certificate/x509/map`.
- `APIML_SECURITY_AUTHORIZATION_ENDPOINT_URL` should be set to `https://${GATEWAY_HOST}:${GATEWAY_PORT}/zss/api/v1/saf-auth`.
- `ZOWE_EXPLORER_FRAME_ANCESTORS` should be set to `${ZOWE_EXTERNAL_HOST}:*`
- `ZWE_CACHING_SERVICE_PERSISTENT` should NOT be set to `VSAM`. `redis` is suggested. Follow [Redis configuration](https://docs.zowe.org/stable/extend/extend-apiml/api-mediation-redis/#redis-configuration) documentation to customize other redis related variables. Leave the value to empty for debugging purpose.
- Must append and customize these 2 values:
  * `ZWED_agent_host=${ZOWE_ZOS_HOST}`
  * `ZWED_agent_https_port=${ZOWE_ZSS_SERVER_PORT}`

2. A ConfigMap, with values based upon a Zowe keystore's `zowe-certificates.env` and similar to the example `samples/certificates-cm.yaml`.

3. A Secret, with values based upon a Zowe keystore's files, and similar to the example `samples/certificates-secret.yaml`.
