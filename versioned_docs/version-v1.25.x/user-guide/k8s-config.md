# Configuring

Zowe provides sample configurations that make it easy for you to run Zowe in Kubernetes. You can use them directly or as a reference.

You can customize the configuration or make your own. If you do so, note the following objects that are expected by the container deployments:

|    Kind   | Name | Note |
|-----------|------|------|
| [Namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/) | zowe | |
| [ServiceAccount](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/) | zowe-sa | |
| [ConfigMap](https://kubernetes.io/docs/concepts/configuration/configmap/) | zowe-certificates-cm | Contains `zowe-certificates.env` with the same format as seen on z/OS keystore |
| [Secret](https://kubernetes.io/docs/concepts/configuration/secret/) | zowe-certificates-secret | Contains the base64 PEM and P12 data for keystore and truststore |
| [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) | discovery-ingress | Used for external access to the Discovery service |
| [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) | gateway-ingress | Used for external access to the Gateway service |
| [Route](https://docs.openshift.com/enterprise/3.0/architecture/core_concepts/routes.html) | discovery | Used for external access to the Discovery service |
| [Route](https://docs.openshift.com/enterprise/3.0/architecture/core_concepts/routes.html) | gateway | Used for external access to the Gateway service |
| [Service](https://kubernetes.io/docs/concepts/services-networking/service/) | discovery-service | Used for internal or external access to the Discovery service |
| [Service](https://kubernetes.io/docs/concepts/services-networking/service/) | gateway-service | Used for external access to the Gateway service |
| [Service](https://kubernetes.io/docs/concepts/services-networking/service/) | catalog-service | Used for access to the Catalog service |
| [PersistentVolumeClaim](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) | zowe-workspace-pvc | |
| [HorizontalPodAutoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/) | * | Autoscalers exist for the various pods |
| [PodDisruptionBudget](https://kubernetes.io/docs/tasks/run-application/configure-pdb/) | * | Disruption budgets exist for the various pods |

To configure the Zowe container environment, complete the following procedure.

## 1. Create namespace and service account

Run the following commands to create Zowe's [Namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/) `zowe` with [Service Account](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/) `zowe-sa`.

```
kubectl apply -f common/zowe-ns.yaml
kubectl apply -f common/zowe-sa.yaml
```

Note that by default, `zowe-sa` service account has `automountServiceAccountToken` disabled for security purpose.

To verify, check the following configurations.

* `kubectl get namespaces` should show a Namespace `zowe`.
   
   This displays the default Namespace zowe, if not set.

* `kubectl get serviceaccounts --namespace zowe` should show a ServiceAccount `zowe-sa`.

   This displays the default ServiceAccount zowe-sa, if not set.

## 2. Create Persistent Volume Claim (PVC)

Zowe's [PVC](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) has a default StorageClass value that may not apply to all Kubernetes clusters. Check and customize the `storageClassName` value of [samples/workspace-pvc.yaml](https://raw.githubusercontent.com/zowe/zowe-install-packaging/master/containers/kubernetes/samples/workspace-pvc.yaml) as needed. You can use `kubectl get sc` to confirm which StorageClass you can use. 

After you customize the `storageClassName` value, apply the result by issuing the following commands:

```
kubectl apply -f samples/workspace-pvc.yaml
```

To verify, run the following commands and check that `STATUS` shows as `Bound`.

```
kubectl get pvc --namespace zowe
``` 

## 3. Create and modify ConfigMaps and Secrets

Similarly, to running Zowe services on z/OS, you can use either `instance.env` or `zowe.yaml` to customize Zowe.

You can modify `samples/config-cm.yaml`,  , and `samples/certificates-secret.yaml` directly. Or more conveniently, if you have Zowe ZSS/ZIS running on z/OS, the Kubernetes environment can reuse instance and keystore configuration from that installation (supported in v1.25 and later).

If you want to manually create, or later customize the ConfigMaps and Secrets, see [Customizing or manually creating ConfigMaps and Secrets](#customizing-or-manually-creating-configmaps-and-secrets) for details.

To create and modify [ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/) and [Secrets](https://kubernetes.io/docs/concepts/configuration/secret/) by using the migrate configuration script, complete the following steps:

a. On z/OS, run the following command:

```
cd <instance-dir> 
./bin/utils/convert-for-k8s.sh -x "my-k8s-cluster.company.com,9.10.11.12"
o
``` 

This migration script supports these parameters:

- `-x`: is a comma-separated list of domains you will use to visit the Zowe Kubernetes cluster. These domains and IP addresses will be added to your new certificate if needed. This is optional. The default value is `localhost`.
- `-n`: is the Zowe Kubernetes cluster namespace. This is optional. The default value is `zowe`.
- `-u`: is the Kubernetes cluster name. This is optional. The default value is `cluster.local`.
- `-p`: is the password of local certificate authority PKCS#12 file. This is optional. The default value is `local_ca_password`.
- `-a`: is the certificate alias of local certificate authority. This is optional. The default value is `localca`.
- `-v`: is a switch to enable verbose mode which will display more debugging information.

As a result, it displays ConfigMaps (`zowe-config`, `zowe-certificates-cm`) and Secrets (`zowe-certificates-secret`) Kubernetes objects which are based on the Zowe instance and keystore used. The content looks similar to `samples/config-cm.yaml`, `samples/certificates-cm.yaml` and `samples/certificates-secret.yaml` but with real values. Follow the instructions in the script output to copy the output and save as a YAML file `configs.yaml` on your server where you have set up Kubernetes.

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


## 4. Expose API Mediation Layer components

This step makes Zowe's Gateway, Discovery, and API Catalog servers available over a network.

The Gateway is always required to be externally accessible, and depending upon your environment the Discovery service may also need to be externally accessible.

The actions you need to take in this step vary depending upon your Kubernetes cluster configuration. If you are uncertain about this section, please contact your Kubernetes administrator or the Zowe community.

### 4a. Create service

You can set up either a `LoadBalancer` or `NodePort` type [Service](https://kubernetes.io/docs/concepts/services-networking/service/).

**Note:** Because `NodePort` cannot be used together with `NetworkPolicies`, `LoadBalancer` and `Ingress` is a preferred configuration option.

Review the following table for steps you may take depending on the Kubernetes provider you use. If you don't need additional setups, you can skip steps 4b, 4c, 4d and jump directly to the [Apply zowe](./k8s-using) section.

| Kubernetes provider       | Service                  | Additional setups required                                 |
| :------------------------ | :----------------------  | :--------------------------------------------------------- |
| minikube                  | LoadBalancer or NodePort | [Port Forward](#4b-port-forward-for-minikube-only)         |
| docker-desktop            | LoadBalancer             | none                                                       |
| bare-metal                | LoadBalancer or NodePort | [Create Ingress](#4c-create-ingress-for-bare-metal-only)   |
| cloud-vendors             | LoadBalancer             | none                                                       |
| OpenShift                 | LoadBalancer or NodePort | [Create Route](#4d-create-route-for-openshift-only)        |


#### Defining api-catalog service

`api-catalog-service` is required by Zowe, but not necessarily exposed to external users. Therefore, `api-catalog-service` is defined as type ClusterIP. 

To define this service, run the command:

```
kubectl apply -f samples/api-catalog-service.yaml
```

Upon success, you should see the following output: 

```
service/api-catalog-service created
```

Then, you can proceed with creating the Gateway and Discovery services according to your environment.

#### Applying Gateway Service

If using `LoadBalancer`, run the command:

```
kubectl apply -f samples/gateway-service-lb.yaml
```

Or if using `NodePort` instead, first check `spec.ports[0].nodePort` as this will be the port to be exposed to external. The default gateway port is not 7554 but 32554. You can use `https://<your-k8s-node>:32554/` to access APIML Gateway. Then, run the following command:

```
kubectl apply -f samples/gateway-service-np.yaml
```

To verify either case, run the following command and check that the command displays the service `gateway-service`.

```
kubectl get services --namespace zowe
```

#### Applying Discovery service

Exposing the Discovery service is only required when there is a Zowe service or extension which needs to be registered to the API Mediation Layer but is running outside of Kubernetes, such as on z/OS. Otherwise, the discovery service can remain accessible only within the Kubernetes environment.

**Optional:** To setup the discovery service without exposing it externally, edit `samples/discovery-service-lb.yaml` if using `LoadBalancer` type services, or `samples/discovery-service-np.yaml` if using `NodePort` type services. In either file, specify `ClusterIP` as the type, replacing the `NodePort` or `LoadBalancer` value.

To enable the service externally when using `LoadBalancer` services, run the command:

```
kubectl apply -f samples/discovery-service-lb.yaml
```

Or if using `NodePort` instead, first check `spec.ports[0].nodePort` as this will be the port to be exposed to external. The default discovery port is not 7553 but 32553. You can use `https://<your-k8s-node>:32553/` to access APIML Discovery. Then, run the following command:

```
kubectl apply -f samples/discovery-service-np.yaml
```

To verify either case, run the following command and check that this command displays the service `discovery-service`:

```kubectl get services --namespace zowe``` 

Upon completion of all the preceding steps in this [a. Create service](#a-create-service) section, you may need to run additional setups. Refer to "Additional setups required" in the table. If you don't need additional setups, you can skip 4b, 4c, 4d and jump directly to Apply Zowe section.

### 4b. Port forwarding (minikube)

[Kubectl port-forward](https://kubernetes.io/docs/tasks/access-application-cluster/port-forward-access-application-cluster/) allows you to access and interact with internal Kubernetes cluster processes from your localhost. For debugging or development, you may wish to port forward to make Zowe gateway or discovery service available externally quickly.

To use port-forward, run the command: 

```
kubectl port-forward -n zowe svc/gateway-service --address=<your-ip> <external-port>:<internal-port, such as 7554> &
kubectl port-forward -n zowe svc/discovery-service --address=<your-ip> <external-port>:<internal-port, such as 7553> &
```

The `&` at the command will run the command as a background process, as otherwise it will occupy the terminal indefinitely until canceled as a foreground service.

Upon completion, you can finish the setup by [applying zowe and starting it](./k8s-using).

### 4c. Create Ingress (Bare-metal)

An [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) gives Services externally-reachable URLs, and may provide other abilities such as traffic load balancing.

To create Ingress, perform the following steps:

a. Edit `samples/gateway-ingress.yaml` and `samples/discovery-ingress.yaml` before applying them, by uncommenting the lines (19 and 20) for defining `spec.rules[0].host` and `http:`, and then commenting out the line below, `- http:` 

b. Run the following commands:

```
kubectl apply -f samples/bare-metal/gateway-ingress.yaml
kubectl apply -f samples/bare-metal/discovery-ingress.yaml
```

To verify, run the following commands:

```kubectl get ingresses --namespace zowe```

This command must display two Ingresses `gateway-ingress` and `discovery-ingress`.

Upon completion, you can finish the setup by [applying zowe and starting it](./k8s-using).

### 4d. Create Route (OpenShift)

If you are using OpenShift container platform, you must define `Route` instead of `Ingress`.

A [Route](https://docs.openshift.com/enterprise/3.0/architecture/core_concepts/routes.html) is a way to expose a service by giving it an externally-reachable hostname. 

To create a route, perform the following steps:

a. Check and set the value of `spec.port.targetPort` in `samples/gateway-route.yaml` and `samples/discovery-route.yaml` before applying the changes.

b. Run the following commands:

```
oc apply -f samples/openshift/gateway-route.yaml
oc apply -f samples/openshift/discovery-route.yaml
```

To verify, run the following commands:

```oc get routes --namespace zowe```

This command must displays the two Services `gateway` and `discovery`.

Upon completion, you can finish the setup by [applying zowe and starting it](./k8s-using).

## Customizing or manually creating ConfigMaps and Secrets

[The z/OS to k8s convert tool](#3-create-and-modify-configmaps-and-secrets) can automatically create a config map and secret. However, if you want to customize or create your own, review the instructions in this section.

To manually create the [ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/) and [Secrets](https://kubernetes.io/docs/concepts/configuration/secret/) used by Zowe containers, you must create the following objects:

1. A ConfigMap, with values based upon a Zowe instance's `instance.env` and similar to the example `samples/config-cm.yaml` with the following differences to the values seen on a z/OS install:

   * `ZOWE_EXPLORER_HOST`, `ZOWE_IP_ADDRESS`, `ZWE_LAUNCH_COMPONENTS`, `ZWE_DISCOVERY_SERVICES_LIST` and `SKIP_NODE` are not needed for Zowe running in Kubernetes and will be ignored. You can remove them.
   * `JAVA_HOME` and `NODE_HOME` are not usually needed if you are using Zowe base images.
   * `ROOT_DIR` must be set to `/home/zowe/runtime`.
   * `KEYSTORE_DIRECTORY` must be set to `/home/zowe/keystore`.
   * `ZWE_EXTERNAL_HOSTS` is suggested to define as a list domains you are using to access your Kubernetes cluster.
   * `ZOWE_EXTERNAL_HOST=$(echo "${ZWE_EXTERNAL_HOSTS}" | awk -F, '{print $1}' | tr -d '[[:space:]]')` is needed to define after `ZWE_EXTERNAL_HOSTS`. It's the primary external domain.
   * `ZWE_EXTERNAL_PORT` (or `zowe.externalPort` if you are using `zowe.yaml`) must be the port you expose to end-user. This value is optional if it's same as default `GATEWAY_PORT` `7554`. With default settings,
     * if you choose `LoadBalancer` `gateway-service`, this value is optional, or set to `7554`,
     * if you choose `NodePort` `gateway-service` and access the service directly, this value should be same as `spec.ports[0].nodePort` with default value `32554`,
     * if you choose `NodePort` `gateway-service` and access the service through port forwarding, the value should be the forwarded port you set.
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

   If you are using `zowe.yaml`, the above configuration items are still valid, but should use the matching `zowe.yaml` configuration entries. Check [Updating the zowe.yaml configuration file](configure-instance-directory#updating-the-zoweyaml-configuration-file) for more details.

2. A ConfigMap, with values based upon a Zowe keystore's `zowe-certificates.env` and similar to the example `samples/certificates-cm.yaml`.

3. A Secret, with values based upon a Zowe keystore's files, and similar to the example `samples/certificates-secret.yaml`.
