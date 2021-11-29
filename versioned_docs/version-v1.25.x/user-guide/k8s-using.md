# Starting, stopping, and monitoring

After Zowe's containers are installed and configured, you can refer to the following topics that help you manage your installation.

## Starting Zowe containers

The Kubernetes cluster will automatically start as many containers as needed per service according to the Deployment configuration.

To apply the deployment files, run the command:

```
kubectl apply -f workloads/
```

The containers will start soon after applying the deployments.

To verify:

1. `kubectl get deployments --namespace zowe`
   
   This command must show you a list of deployments including `explorer-jes`, `gateway-service`, `app-server`, etc. Each deployment should show `1/1` in `READY` column. It could take a moment before all deployments say `1/1`.

2. `kubectl get statefulsets --namespace zowe`

   This command must show you a StatefulSet `discovery` which `READY` column should be `1/1`.

3. `kubectl get cronjobs --namespace zowe`
   
   This command must show you a CronJob `cleanup-static-definitions` which `SUSPEND` should be `False`.

## Monitoring Zowe containers

You can monitor Zowe containers using a UI or CLI.

### Monitoring Zowe containers via UI

Kubernetes provides a container that allows you to manage your cluster through a web browser. When using Docker Desktop, it is already installed in the namespace `kubernetes-dashboard`. See the [Kubernetes website](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/) for install instructions.

[Metrics Server](https://github.com/kubernetes-sigs/metrics-server) is also recommended and is required if you want to define [Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/). Check if you have `metrics-server` `Service` in `kube-system` namespace with this command `kubectl get services --namespace kube-system`. If you don't have, you can follow this [Installation](https://github.com/kubernetes-sigs/metrics-server#installation) instruction to install it.

### Monitoring Zowe containers via CLI

`kubectl` allows you to see the status of any kind of object with the `get` command. This applies to the [table in the configuring section](#configuring) but also for the pods that run the Zowe containers.

Here are a few commands you can use to monitor your environment:

* `kubectl get pods -n zowe` lists the status of the components of Zowe.
* `kubectl describe pods -n zowe <podid>` can see more details about each pod.
* `kubectl logs -n zowe <podid>` will show you the terminal output of a particular pod, with `-f` allowing you to keep the logs open as new messages are added.
* `kubectl get nodes -n zowe -owide` will tell you more about the environment you're running.

## Stopping, pausing, or removing Zowe containers

To temporarily stop a component, locate the `Deployment` component and scale down to `0`. For example, if you want to stop the `jobs-api` container, run this command:

```
kubectl scale -n zowe deployment jobs-api --replicas=0
```

You can later re-enable a component by scaling the component back to 1 or more.

If you want to permanently remove a component, you can delete the component `Deployment`. To use `jobs-api` as example, run this command:

```
kubectl delete -n zowe deployment jobs-api
```
