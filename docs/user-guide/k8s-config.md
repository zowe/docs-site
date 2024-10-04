# Configuring Zowe containers

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

Note that by default, `zowe-sa` service account has `automountServiceAccountToken` disabled for security purposes.

### Verification
To verify, check the following configurations.

* `kubectl get namespaces` should show a Namespace `zowe`.
   
   This displays the default Namespace zowe, if not set.

* `kubectl get serviceaccounts --namespace zowe` should show a ServiceAccount `zowe-sa`.

   This displays the default ServiceAccount zowe-sa, if not set.

## 2. Create Persistent Volume Claim (PVC)

Zowe's [PVC](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) has a default StorageClass value that may not apply to all Kubernetes clusters. Check and customize the `storageClassName` value of `samples/workspace-pvc.yaml` as needed. You can use `kubectl get sc` to confirm which StorageClass you can use.

After you customize the `storageClassName` value, apply the result by issuing the following commands:

```
kubectl apply -f samples/workspace-pvc.yaml
```

### Verification
To verify, run the following commands and check if the `STATUS` of line item `zowe-workspace-pvc` shows as `Bound`.

```
kubectl get pvc --namespace zowe
```

:::danger Important: 
`zowe-workspace-pvc` `PersistentVolumeClaim` must be declared in access mode `ReadWriteMany` to allow the workspace be shared by all Zowe components.
:::

In some Kubernetes environment, you may need to define `PeristentVolume` and define `volumeName` in `PersistentVolumeClaim` instead of defining `storageClassName`. Please consult your Kubernetes administrator to confirm the appropriate way for your environment. This is an example to configure `PersistentVolumeClaim` with pre-configured `zowe-workspace-pv` `PeristentVolume`.

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: zowe-workspace-pvc
  namespace: zowe
  labels:
    app.kubernetes.io/name: zowe
    app.kubernetes.io/instance: zowe
    app.kubernetes.io/managed-by: manual
spec:
  storageClassName: ""
  volumeName: zowe-workspace-pv
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 50Mi
```

## 3. Create and modify ConfigMaps and Secrets

Similarly, to run Zowe services on z/OS, you can use the Zowe `zowe.yaml` configuration file to customize Zowe in Kubernetes.

You can modify `samples/config-cm.yaml` and `samples/certificates-secret.yaml` directly. Or more conveniently, if you have Zowe ZSS/ZIS running on z/OS, the Kubernetes environment can reuse instance and keystore configuration from that installation. Ensure that the verify certificate setting of your existing keystore configuration is set to `STRICT` mode. Otherwise, update your `zowe.yaml` configuration file to change the setting to `STRICT` mode and generate a new set of certificates. 

If you want to manually create, or later customize the ConfigMaps and Secrets, see [Customizing or manually creating ConfigMaps and Secrets](#customizing-or-manually-creating-configmaps-and-secrets) for details.

To create and modify [ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/) and [Secrets](https://kubernetes.io/docs/concepts/configuration/secret/) by using the migrate configuration script, complete the following steps:

a. To make Zowe v2 certificates work in Kubernetes, in your `zowe.yaml` (in runtime directory), you need to:

- set `zowe.verifyCertificate` to `STRICT` mode.
- set `zowe.setup.certificate.pkcs12.caAlias`. Default alias is `local_ca`.
- set `zowe.setup.certificate.pkcs12.caPassword`. Default CA password is `local_ca_password`.
- make sure the certificate that you are using have defined the following domains in certificate Subject Alt Name (SAN):

  - your external domains to access Zowe APIML Gateway Service running in Kubernetes cluster
  - `*.<k8s-namespace>.svc.<k8s-cluster-name>`
  - `*.discovery-service.<k8s-namespace>.svc.<k8s-cluster-name>`
  - `*.gateway-service.<k8s-namespace>.svc.<k8s-cluster-name>`
  - `*.<k8s-namespace>.pod.<k8s-cluster-name>`

  where, 
  - `<k8s-namespace>` is the Kubernetes Namespace you installed Zowe into
  - `<k8s-cluster-name>` is the Kubernetes cluster name, which usually should be `cluster.local`. Note that the following command will automatically add the k8s internal domain into SAN.

Next, on z/OS, run the following command:

```
cd <runtime-dir> 
./bin/zwe migrate for kubernetes --config /path/to/my/zowe.yaml --domains "my-k8s-cluster.company.com"
``` 

For more detailed explaination of zwe migrate command parameters, see [zwe migrate for kubernetes](../appendix/zwe_server_command_reference/zwe/migrate/for/zwe-migrate-for-kubernetes.md).

As a result, it displays ConfigMaps `zowe-config` and Secrets (`zowe-certificates-secret`) Kubernetes objects which are based on the Zowe instance and keystore used. The content looks similar to `samples/config-cm.yaml` and `samples/certificates-secret.yaml` but with real values.

b. Follow the instructions in the script output to copy the output and save it as a YAML file `configs.yaml` on your computer where you manage Kubernetes.

c. Apply the file into Kubernetes:

```
`kubectl apply -f /path/to/your/configs.yaml`
```

d. Remove the previously saved `configs.yaml` file from all systems for security.

### Verification
To verify, run the following commands and check the results.

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

**Note:** Because `NodePort` cannot be used together with `NetworkPolicies`, `LoadBalancer` and `Ingress` is preferred configuration option.

Review the following table for steps you may take depending on the Kubernetes provider you use. If you don't need additional setups, you can skip steps 4b, 4c and jump directly to the [Apply zowe](k8s-using.md) section.

| Kubernetes provider       | Service                  | Additional setups required                                 |
| :------------------------ | :----------------------  | :--------------------------------------------------------- |
| minikube                  | LoadBalancer or NodePort | Port Forward (on next section Starting, stopping, and monitoring)|
| docker-desktop            | LoadBalancer             | none                                                       |
| bare-metal                | LoadBalancer or NodePort | [Create Ingress](#4b-create-ingress-bare-metal)            |
| cloud-vendors             | LoadBalancer             | none                                                       |
| OpenShift                 | LoadBalancer or NodePort | [Create Route](#4c-create-route-openshift)                 |


#### Defining api-catalog service

`api-catalog-service` is required by Zowe, but not necessarily exposed to external users. Therefore, `api-catalog-service` is defined as type `ClusterIP`. 

To define this service, run the command:

```
kubectl apply -f samples/api-catalog-service.yaml
```

**To verify**, You should see the following output: 

```
service/api-catalog-service created
```

Then, you can proceed with creating the Gateway and Discovery services according to your environment.

#### Applying Gateway Service

If using `LoadBalancer`, run the command:

```
kubectl apply -f samples/gateway-service-lb.yaml
```

Or if using `NodePort` instead, first check `spec.ports[0].nodePort` as this will be the port to be exposed to external. In this case, the default gateway port is not 7554 but 32554. You will need to use `https://<your-k8s-node>:32554/` to access APIML Gateway. To apply `NodePort` type `gateway-service`, run the following command:

```
kubectl apply -f samples/gateway-service-np.yaml
```

**To verify either case**, run the following command and check that the command displays the service `gateway-service`.

```
kubectl get services --namespace zowe
```

#### Applying Discovery service

Exposing the Discovery service is only required when there is a Zowe service or extension which needs to be registered to the API Mediation Layer but is running outside of Kubernetes, such as on z/OS. Otherwise, the discovery service can remain accessible only within the Kubernetes environment.

**Optional:** To set up the discovery service without exposing it externally, edit `samples/discovery-service-lb.yaml` if using `LoadBalancer` type services, or `samples/discovery-service-np.yaml` if using `NodePort` type services. In either file, specify `ClusterIP` as the type, replacing the `NodePort` or `LoadBalancer` value.

To enable the service externally when using `LoadBalancer` services, run the command:

```
kubectl apply -f samples/discovery-service-lb.yaml
```

Or if using `NodePort` instead, first check `spec.ports[0].nodePort` as this will be the port to be exposed to external. In this case, the default discovery port is not 7553 but 32553. And you will need to use `https://<your-k8s-node>:32553/` to access APIML Discovery. To apply `NodePort` type `discovery-service`, run the following command:

```
kubectl apply -f samples/discovery-service-np.yaml
```

**To verify either case**, run the following command and check that this command displays the service `discovery-service`:

```kubectl get services --namespace zowe``` 

Upon completion of all the preceding steps in this [4a. Create service](#4a-create-service) section, you may need to run additional setups. Refer to "Additional setups required" in the table. If you don't need additional setups, you can skip 4b, 4c, 4d, and jump directly to Apply Zowe section.

### 4b. Create Ingress (Bare-metal)

An [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) gives Services externally-reachable URLs and may provide other abilities such as traffic load balancing.

To create Ingress, perform the following steps:

a. Edit `samples/gateway-ingress.yaml` and `samples/discovery-ingress.yaml` before applying them, by uncommenting the lines (19 and 20) for defining `spec.rules[0].host` and `http:`, and then commenting out the line below, `- http:` 

b. Run the following commands:

```
kubectl apply -f samples/bare-metal/gateway-ingress.yaml
kubectl apply -f samples/bare-metal/discovery-ingress.yaml
```

**To verify**, run the following commands:

```kubectl get ingresses --namespace zowe```

This command must display two Ingresses `gateway-ingress` and `discovery-ingress`.

Upon completion, you can finish the setup by [applying zowe and starting it](./k8s-using).

### 4c. Create Route (OpenShift)

If you are using OpenShift and choose to use `LoadBalancer` services, you may already have an external IP for the service. You can use that external IP to access Zowe APIML Gateway. To verify your service external IP, run:

```
oc get svc -n zowe
```

If you see an IP in the `EXTERNAL-IP` column, that means your OpenShift is properly configured and can provision external IP for you. If you see `<pending>` and it does not change after waiting for a while, that means you may not be able to use `LoadBalancer` services with your current configuration. Try `ClusterIP` services and define `Route`. A [Route](https://docs.openshift.com/enterprise/3.0/architecture/core_concepts/routes.html) is a way to expose a service by giving it an externally reachable hostname. 

To create a route, perform the following steps:

a. Check and set the value of `spec.port.targetPort` in `samples/gateway-route.yaml` and `samples/discovery-route.yaml` before applying the changes.

b. Run the following commands:

```
oc apply -f samples/openshift/gateway-route.yaml
oc apply -f samples/openshift/discovery-route.yaml
```

**To verify**, run the following commands:

```oc get routes --namespace zowe```

This command must display the two Services `gateway` and `discovery`.

Upon completion, you can finish the setup by [applying zowe and starting it](./k8s-using).

## Customizing or manually creating ConfigMaps and Secrets

[The z/OS to k8s convert tool](#3-create-and-modify-configmaps-and-secrets) can automatically create a config map and secret. However, if you want to customize or create your own, review the instructions in this section.

To make certificates work in Kubernetes, make sure the certificate you are using have defined the following domains in certificate Subject Alt Name (SAN):

- your external domains to access Zowe APIML Gateway Service running in Kubernetes cluster
- `*.<k8s-namespace>.svc.<k8s-cluster-name>`
- `*.discovery-service.<k8s-namespace>.svc.<k8s-cluster-name>`
- `*.gateway-service.<k8s-namespace>.svc.<k8s-cluster-name>`
- `*.<k8s-namespace>.pod.<k8s-cluster-name>`

`<k8s-namespace>` is the Kubernetes Namespace you installed Zowe into. And `<k8s-cluster-name>` is the Kubernetes cluster name, which usually should be `cluster.local`.

Without the additional domains in SAN, you may see warnings/errors related to certificate validation.

:::caution

It's not recommended to disable `zowe.verifyCertificates`.

:::

**Notes**: When the following conditions are true, this migration script will regenerate a new set of certificates for you with proper domain names listed above.

- You use `zwe init` command to initialize Zowe
- You use `PKCS#12` format keystore by defining `zowe.setup.certificate.type: PKCS12`
- You did not define `zowe.setup.certificate.pkcs12.import.keystore` and let `zwe` command to generate PKCS12 keystore for you
- You enabled `STRICT` mode `zowe.verifyCertificates`

To manually create the [ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/) and [Secrets](https://kubernetes.io/docs/concepts/configuration/secret/) used by Zowe containers, you must create the following objects:

1. A ConfigMap, with values based upon a Zowe configuration `zowe.yaml` and similar to the example `samples/config-cm.yaml` with the following differences to the values seen on a z/OS installation:

   * `zowe.setup` and `haInstances` are not needed for Zowe running in Kubernetes and will be ignored. You can remove them.
   * `java.home` and `node.home` are not usually needed if you are using Zowe base images.
   * `zowe.runtimeDirectory` must be set to `/home/zowe/runtime`.
   * `zowe.externalDomains` is suggested to define as a list of domains you are using to access your Kubernetes cluster.
   * `zowe.externalPort` must be the port you expose to end-user. This value is optional if it's same as default APIML Gateway service port `7554`. With default settings,
     * if you choose `LoadBalancer` `gateway-service`, this value is optional, or set to `7554`,
     * if you choose `NodePort` `gateway-service` and access the service directly, this value should be same as `spec.ports[0].nodePort` with default value `32554`,
     * if you choose `NodePort` `gateway-service` and access the service through port forwarding, the value should be the forwarded port you set.
   * `components.discovery.replicas` should be set to same value of `spec.replicas` defined in `workloads/discovery-statefulset.yaml`.
   * All components running in Kubernetes should use default ports:
     * `components.api-catalog.port` is `7552`,
     * `components.discovery.port` is `7553`,
     * `components.gateway.port` is `7554`,
     * `components.caching-service.port` is `7555`,
     * `components.app-server.port` is `7556`.
   * `components.caching-service.storage.mode` should NOT be set to `VSAM`. `redis` is suggested. Follow [Redis configuration](https://docs.zowe.org/stable/extend/extend-apiml/api-mediation-redis/#redis-configuration) documentation to customize other Redis related variables. Leave the value to empty for debugging purposes.
   * Must append and customize these 2 values into `zowe.environments` section:
     * `ZWED_agent_host=<ZOWE_ZOS_HOST>`
     * `ZWED_agent_https_port=<ZOWE_ZSS_SERVER_PORT>`

2. A Secret, with values based upon a Zowe keystore's files, and similar to the example `samples/certificates-secret.yaml`.

    You need 2 entries under the `data` section:

    - `keystore.p12`: which is base64 encoded PKCS#12 keystore,
    - `truststore.p12`: which is base64 encoded PKCS#12 truststore.

    And 3 entries under `stringData` section:

    - `keystore.key`: is the PEM format of certificate private key,
    - `keystore.cer`: is the PEM format of the certificate,
    - `ca.cer`: is the PEM format of the certificate authority.

## `PodDisruptionBudget`

Zowe provides optional `PodDisruptionBudget` which can provide high availability during upgrade. By default, Zowe defines `minAvailable` to be `1` for all deployments. This configuration is optional but recommended. To apply `PodDisruptionBudget`, run this command:

```
kubectl apply -f samples/pod-disruption-budget/
```

**To verify this step**, run:

```bash
kubectl get pdb --namespace zowe
```

This should show you a list of `PodDisruptionBudget` like this:

```
NAME               MIN AVAILABLE   MAX UNAVAILABLE   ALLOWED DISRUPTIONS   AGE
api-catalog-pdb    1               N/A               0                     1d
app-server-pdb     1               N/A               0                     1d
caching-pdb        1               N/A               0                     1d
discovery-pdb      1               N/A               0                     1d
explorer-jes-pdb   1               N/A               0                     1d
explorer-mvs-pdb   1               N/A               0                     1d
explorer-uss-pdb   1               N/A               0                     1d
gateway-pdb        1               N/A               0                     1d
```

## `HorizontalPodAutoscaler`

Zowe provides optional `HorizontalPodAutoscaler` which can automatically scale Zowe components based on resource usage. By default, each workload has a minimum of 1 replica and a maximum of 3 to 5 replicas based on CPU usage. This configuration is optional but recommended. `HorizontalPodAutoscaler` relies on Kubernetes [Metrics server](https://github.com/kubernetes-sigs/metrics-server) monitoring to provide metrics through the [Metrics API](https://github.com/kubernetes/metrics). To learn how to deploy the metrics-server, see the [metrics-server documentation](https://github.com/kubernetes-sigs/metrics-server#deployment). Please adjust the `HorizontalPodAutoscaler` definitions based on your cluster resources, then run this command to apply them to your cluster:

```
kubectl apply -f samples/horizontal-pod-autoscaler/
```

**To verify this step**, run:

```bash
kubectl get hpa --namespace zowe
```

This should show you a list of `HorizontalPodAutoscaler` like this:

```
NAME               REFERENCE                 TARGETS   MINPODS   MAXPODS   REPLICAS   AGE
api-catalog-hpa    Deployment/api-catalog    60%/70%   1         3         1          20m
app-server-hpa     Deployment/app-server     2%/70%    1         5         1          9m59s
caching-hpa        Deployment/caching        7%/70%    1         3         1          9m59s
discovery-hpa      StatefulSet/discovery     34%/70%   1         3         1          8m15s
explorer-jes-hpa   Deployment/explorer-jes   10%/70%   1         3         1          9m59s
explorer-mvs-hpa   Deployment/explorer-mvs   10%/70%   1         3         1          9m59s
explorer-uss-hpa   Deployment/explorer-uss   10%/70%   1         3         1          9m59s
gateway-hpa        Deployment/gateway        20%/60%   1         5         1          9m59s
```

## Kubernetes v1.21+

If you have Kubernetes v1.21+, several optional changes are recommended based on [Deprecated API Migration Guide](https://kubernetes.io/docs/reference/using-api/deprecation-guide/).

- Kind `CronJob`: change `apiVersion: batch/v1beta1` to `apiVersion: batch/v1` on `workloads/zowe-yaml/cleanup-static-definitions-cronjob.yaml` and `workloads/instance-env/cleanup-static-definitions-cronjob.yaml`. `apiVersion: batch/v1beta1` will stop working on Kubernetes v1.25.
- Kind `PodDisruptionBudget`: change `apiVersion: policy/v1beta1` to `apiVersion: policy/v1` on all files in `samples/pod-disruption-budget/`. `apiVersion: policy/v1beta1` will stop working on Kubernetes v1.25.
