# Configuring

Zowe provides sample configurations that make it easy to run Zowe in Kubernetes.
You can use them directly or as a reference.

You can customize the configuration or make your own. If you do, note that the following objects that are expected by the container deployments:

|    Kind   | Name | Note |
|-----------|------|------|
| [Namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/) | zowe | |
| [ServiceAccount](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/) | zowe-sa | |
| [ConfigMap](https://kubernetes.io/docs/concepts/configuration/configmap/) | zowe-certificates-cm | Contains zowe-certificates.env with the same format as seen on z/OS keystore |
| [Secret](https://kubernetes.io/docs/concepts/configuration/secret/) | zowe-certificates-secret | Contains the base64 PEM and P12 data for keystore and truststore |
| [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) | discovery-ingress | Used for external access to the Discovery service |
| [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) | gateway-ingress | Used for external access to the Gateway service |
| [Route](https://docs.openshift.com/enterprise/3.0/architecture/core_concepts/routes.html) | discovery | Used for external access to the Discovery service |
| [Route](https://docs.openshift.com/enterprise/3.0/architecture/core_concepts/routes.html) | gateway | Used for external access to the Gateway service |
| [Service](https://kubernetes.io/docs/concepts/services-networking/service/) | discovery-service | Used for external access to the Discovery service |
| [Service](https://kubernetes.io/docs/concepts/services-networking/service/) | gateway-service | Used for external access to the Gateway service |
| [PersistentVolumeClaim](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) | zowe-workspace-pvc | |

The following tasks are a step-by-step list that can be used to configure the Zowe container environment:

### 1. Create Namespace and Service Account

Run the commands:

```
kubectl apply -f common/zowe-ns.yaml
kubectl apply -f common/zowe-sa.yaml
```

This creates Zowe's [Namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/) `zowe` with [Service Account](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/) `zowe-sa`.
Note that by default, `zowe-sa` service account has `automountServiceAccountToken` disabled for security purpose.

To verify:

* `kubectl get namespaces` should show a Namespace `zowe`
   This displays the default Namespace zowe, if not set.

* `kubectl get serviceaccounts --namespace zowe` should show a ServiceAccount `zowe-sa`
   This displays the default ServiceAccount zowe-sa, if not set.

### 2. Create Persistent Volume Claim (PVC)

Zowe's [PVC](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) has a default StorageClass value that may not apply to all Kubernetes clusters. Check and customize the `storageClassName` value of `samples/workspace-pvc.yaml` as needed, using `kubectl get sc` to confirm which StorageClass you can use. Then apply the result:

```
kubectl apply -f samples/workspace-pvc.yaml
```

To verify:

- `kubectl get pvc --namespace zowe` should show `STATUS` as `Bound`

### 3. Create And Modify ConfigMaps and Secrets

The Kubernetes environment can re-use instance and keystore configuration from a pre-existing Zowe z/OS install (v1.24+).

If you want to manually create, or later customize the ConfigMaps and Secrets, [read this section about customization](#customizing-or-manually-creating-configmaps-and-secrets)

To create and modify [ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/) and [Secrets](https://kubernetes.io/docs/concepts/configuration/secret/), perform the following steps:

a. On z/OS, run the following command:

```
cd <instance-dir> 
./bin/utils/convert-for-k8s.sh > zowe-config-exported-k8s.yaml
o
``` 

This creates a file, `zowe-config-exported-k8s.yaml`.
It contains ConfigMaps (`zowe-config`, `zowe-certificates-cm`) and Secrets (`zowe-certificates-secret`) Kubernetes objects which are based upon the Zowe instance and keystore used. The content should look similar to `samples/config-cm.yaml`, `samples/certificates-cm.yaml` and `samples/certificates-secret.yaml` but with real values.

b. Copy the file over to the computer with Kubernetes.

c. Remove the .yaml file from z/OS for security.

d. Apply the file into Kubernetes:

```
`kubectl apply -f /path/to/your/zowe-config-exported-k8s.yaml`
```

To verify:

* `kubectl get configmaps --namespace zowe`
   This command must display the two ConfigMaps `zowe-config` and `zowe-certificates-cm`.

* `kubectl get secrets --namespace zowe`
   This command must display a Secret `zowe-certificates-secret`.


### 4. Expose Gateway and Discovery

This step makes Zowe's Gateway and Discovery servers available over a network. The step varies depending upon your Kubernetes cluster configuration. If you are uncertain about this section, please contact your Kubernetes administrator or reach out to the Zowe community.

#### Create Service

You can setup either a `LoadBalancer` or `NodePort` type [Service](https://kubernetes.io/docs/concepts/services-networking/service/).

`LoadBalancer` is a good choice for Service when Kuberenetes is being provided by:
  * Cloud Vendors
  * Docker Desktop

`NodePort` is an alternative for when:
  * Kubenetes is running on your own server hardware, for example with minikube
  * You don't have a load balancer

*Option 1 - Applying LoadBalancer Service*

Run the commands:


```
kubectl apply -f samples/gateway-service-lb.yaml
kubectl apply -f samples/discovery-service-lb.yaml
```

To verify:

`kubectl get services --namespace zowe`
 This command must display the two Services `gateway-service` and `discovery-service`.


*Option 2 - Applying NodePort Service*

To apply a `NodePort` Service, make the following changes:

a. Check the `samples/gateway-service-np.yaml` and `samples/discovery-service-np.yaml` files to verify or change the following values:

* `spec.type`.
* `spec.ports[0].nodePort` - this will be the port exposed externally, meaning if you are using `NodePort` service, the default gateway port is not `7554` but `32554`. You can use `https://<your-k8s-node>:32554/` to access APIML Gateway.

b. Run the commands:

```
kubectl apply -f samples/gateway-service-lb.yaml
kubectl apply -f samples/discovery-service-lb.yaml
```

To verify:

`kubectl get services --namespace zowe`
 This command must display the two Services `gateway-service` and `discovery-service`.

#### Create Ingress

You may not need to define an `Ingress` if:
  * You choose `NodePort` for the Services
  * The Kubernetes cluster is from a Cloud vendor or Docker Desktop.
  * You are using OpenShift

An [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) gives Services externally-reachable URLs, and may provide other abilities such as traffic load balancing.

To create Ingress, perform the following steps:

a. Check and set the values of `spec.rules[0].http.host` in `samples/gateway-ingress.yaml` and `samples/discovery-ingress.yaml` before applying them.

b. Run the following commands:

```
kubectl apply -f samples/gateway-ingress.yaml
kubectl apply -f samples/discovery-ingress.yaml
```

To verify:

`kubectl get ingresses --namespace zowe`
This command must display two Ingresses `gateway-ingress` and `discovery-ingress`.

#### Create Route

If you are using OpenShift container platform, you must define `Route` instead of `Ingress`.

A [Route](https://docs.openshift.com/enterprise/3.0/architecture/core_concepts/routes.html) is a way to expose a service by giving it an externally-reachable hostname. 

To create a route, perform the following steps:

a. Check and set the value of `spec.port.targetPort` in `samples/gateway-route.yaml` and `samples/discovery-route.yaml`before applying the changes.

b. Run the commands:

```
oc apply -f samples/gateway-route.yaml
oc apply -f samples/discovery-route.yaml
```

To verify:

`oc get routes --namespace zowe`
This command must displays the two Services `gateway` and `discovery`.

### 5. Port forwarding

[Kubectl port-forward](https://kubernetes.io/docs/tasks/access-application-cluster/port-forward-access-application-cluster/) allows you to access and interact with internal Kubernetes cluster processes from your localhost. For debugging or development, you may wish to port forward to make Zowe gateway or discovery service available externally quickly.

To use port-forward, run the command: 

```
kubectl port-forward -n zowe svc/gateway-service --address=<your-ip> <external-port>:<internal-port, such as 7554> &`
```

The `&` at the command will run the command as a background process, as otherwise it will occupy the terminal indefintely until canceled as a foreground service.



## Customizing or manually creating ConfigMaps and Secrets

[The z/OS to k8s convert tool](#3.-create-and-modify-configmaps-and-secrets) can automatically create a config map and secret, but this section covers if you want to customize or create your own.

To manually create the [ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/) and [Secrets](https://kubernetes.io/docs/concepts/configuration/secret/) used by Zowe containers, you must create the following three objects:

1. A ConfigMap, with values based upon a Zowe instance's `instance.env` and similar to the example `samples/config-cm.yaml` with the following differences to the values seen on a z/OS install:

* `ZOWE_EXPLORER_HOST`, `ZOWE_IP_ADDRESS`, `ZWE_LAUNCH_COMPONENTS`, `ZWE_DISCOVERY_SERVICES_LIST` and `SKIP_NODE` are not needed for Zowe running in Kubernetes and will be ignored. You can remove them.

* `JAVA_HOME` and `NODE_HOME` are not usually needed if you are using Zowe base images.

* `ROOT_DIR` must be set to `/home/zowe/runtime`.

* `KEYSTORE_DIRECTORY` must be set to `/home/zowe/keystore`.

* `ZWE_EXTERNAL_HOSTS` is suggested to define as a list domains you are using to access your Kubernetes cluster.

* `ZOWE_EXTERNAL_HOST=$(echo "${ZWE_EXTERNAL_HOSTS}" | awk -F, '{print $1}' | tr -d '[[:space:]]')` is needed to define after `ZWE_EXTERNAL_HOSTS`. It's the primary external domain.

* `ZOWE_ZOS_HOST` is recommended to be set to where the z/OS system where your Zowe ZSS/ZIS is running.

* `ZWE_DISCOVERY_SERVICES_REPLICAS` should be set to same value of `spec.replicas` defined in `workloads/discovery-statefulset.yaml`.

* All components running in Kubernetes should use default ports:
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

* `ZOWE_ZSS_SERVER_PORT` should be set to the port where your Zowe ZSS is running on `ZOWE_ZOS_HOST`.

* `APIML_GATEWAY_EXTERNAL_MAPPER` should be set to `https://${GATEWAY_HOST}:${GATEWAY_PORT}/zss/api/v1/certificate/x509/map`.

* `APIML_SECURITY_AUTHORIZATION_ENDPOINT_URL` should be set to `https://${GATEWAY_HOST}:${GATEWAY_PORT}/zss/api/v1/saf-auth`.

* `ZOWE_EXPLORER_FRAME_ANCESTORS` should be set to `${ZOWE_EXTERNAL_HOST}:*`

* `ZWE_CACHING_SERVICE_PERSISTENT` should NOT be set to `VSAM`. `redis` is suggested. Follow [Redis configuration](https://docs.zowe.org/stable/extend/extend-apiml/api-mediation-redis/#redis-configuration) documentation to customize other redis related variables. Leave the value to empty for debugging purpose.

* Must append and customize these 2 values:
  * `ZWED_agent_host=${ZOWE_ZOS_HOST}`
  * `ZWED_agent_https_port=${ZOWE_ZSS_SERVER_PORT}`

2. A ConfigMap, with values based upon a Zowe keystore's `zowe-certificates.env` and similar to the example `samples/certificates-cm.yaml`.

3. A Secret, with values based upon a Zowe keystore's files, and similar to the example `samples/certificates-secret.yaml`.
