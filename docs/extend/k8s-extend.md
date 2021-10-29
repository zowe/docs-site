# Creating and adding Zowe extension containers

Zowe extensions such as services and plug-ins that use Zowe component packaging can be used within a Zowe container environment. To do this, the extension must be delivered as a container image that is compatible with Zowe containers. Following Zowe's [container conformance criteria](https://github.com/zowe/zowe-install-packaging/blob/master/containers/conformance.md) is recommended to make compatibility easy to accomplish and understand.

You can add extension containers to a Zowe container environment the same way as Zowe's core components.

1. Build and publish an extension image to a registry.
2. Define a [deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) or [job](https://kubernetes.io/docs/concepts/workloads/controllers/job/) object 
3. Start the extension from the deployment or job definition.

## 1. Build and publish an extension image to a registry

An extension must have a container image to run in a Zowe container environment.

You can use a Dockerfile to create such images, and can follow some examples of how the Zowe core components are built. The core components define component Dockerfiles and use GitHub Actions to build images.

For example, `explorer-jes` is a component which has build-in web service. It has a Dockerfile defined at <https://github.com/zowe/explorer-jes/blob/master/container/Dockerfile> and defines a GitHub Actions workflow <https://github.com/zowe/explorer-jes/blob/master/.github/workflows/build_test.yml> to build the images.

Another example, `explorer-ip` is a Zowe App Server Framework plug-in but does not have a web service build-in. It also follows Zowe's [container conformance criteria](https://github.com/zowe/zowe-install-packaging/blob/master/containers/conformance.md) and has a Dockerfile defined at <https://github.com/zowe/explorer-ip/blob/master/container/Dockerfile>. Similar to `explorer-jes`, it also has a Github Actions workflow <https://github.com/zowe/explorer-ip/blob/master/.github/workflows/explorer-ip-images.yml> to build the images.

The following are Actions used by the core components to build conformant images. They may not be completely reusable for extenders, but are provided as an example.

- [zowe-actions/shared-actions/docker-prepare](https://github.com/zowe-actions/shared-actions/blob/main/docker-prepare/action.yml) will prepare required environment variables used by following steps.
- [zowe-actions/shared-actions/docker-build-local](https://github.com/zowe-actions/shared-actions/blob/main/docker-build-local/action.yml) can build docker image directory on GitHub Actions virtual machine. By default it will be `ubuntu-latest`. This action can be used to build image for `amd64` CPU architecture.
- [zowe-actions/shared-actions/docker-build-zlinux](https://github.com/zowe-actions/shared-actions/blob/main/docker-build-zlinux/action.yml) can build docker image on a `Linux on Z` virtual machine. This is useful if you want to build image for `s390x` CPU architecture.
- [zowe-actions/shared-actions/docker-manifest](https://github.com/zowe-actions/shared-actions/blob/main/docker-manifest/action.yml) can collect all related images and define them as docker manifests. This is useful for end user to automatically pull the correct image based on cluster node CPU architecture, and also pull images based on popular tags like `latest` and `latest-ubuntu`.

Once a component image is built, it's recommended to publish it to a container registry before it can be added to the Zowe container environment. Or you can use `docker save` and `docker load` commands to copy the offline images to your Kubernetes nodes.

## 2. Define `Deployment` or `Job` object

To start your component in Kubernetes, you need to define a [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) if your extension has build-in web service, or a [Job](https://kubernetes.io/docs/concepts/workloads/controllers/job/) object if your extension is a Zowe App Server Framework plugin without build-in web service. 

To define `Deployment` for your component, you can copy from `samples/sample-deployment.yaml` and modify all occurrences of the following variables:

- `<my-component-name>`: this is your component name. For example, `sample-node-api`.
- `<my-component-image>`: this is your component image described in the above [section](#build-and-push-component-image). For example, `zowe-docker-release.jfrog.io/ompzowe/sample-node-api:latest-ubuntu`.
- `<my-component-port>`: this is the port of your service. For example, `8080`.

Continue to customize the specification to fit in your component requirements:

- `spec.template.spec.containers[0].resources`: defines the memory and CPU resource required to start the container,
- `metadata.annotations`, `spec.template.spec.volumes` and `spec.template.spec.securityContext` and so on.


To define `Job` for your component, you can also copy from `samples/sample-deployment.yaml` and modify all entries mentioned above with these extra:

- Change `kind: Deployment` to `kind: Job`,
- Add `restartPolicy: OnFailure` under `spec.template.spec` like this:

  ```yaml
  kind: Job
  spec:
    template:
      spec:
        restartPolicy: OnFailure
        securityContext:
          ...
  ``` 

## 3. Start your component

After you define your component `Deployment` or `Job` object, you can run `kubectl apply -f /path/to/your/component.yaml` to apply it to Kubernetes cluster that runs Zowe. 

If it's a `Deployment`, you should be able to the component pod is started and eventually reached `Running` status. And if it's a `Job`, you should be able to see the plugin pod is started and eventually reached `Completed` status.

Now you can follow common Kubernetes practice to manage your component workload.
