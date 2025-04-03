# Creating and adding Zowe extension containers

Zowe extensions can be used within a Zowe container environment. To do this, you must deliver the extension as a container image that is compatible with Zowe containers. Zowe server extensions such as services or app framework plugins must be packaged as components to work in the container environment. You can follow Zowe's container conformance criteria to understand and achieve compatibility.

**Note**: Container code may depend on z/OS code, and it is recommended that components state these dependencies in their [manifest](https://docs.zowe.org/stable/appendix/server-component-manifest). Users should verify these dependencies to ensure a correctly configured Zowe container environment. 

You can add extension containers to a Zowe container environment the same way as Zowe's core components by completing the following steps. 

1. Build and publish an extension image to a registry. For details, see [Build and publish an extension image to a registry](#1-build-and-publish-an-extension-image-to-a-registry). 
2. Define a [deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) or [job](https://kubernetes.io/docs/concepts/workloads/controllers/job/) object. For details, see [Define Deployment or Job object](#2-define-deployment-or-job-object).
3. Start the extension from the deployment or job definition. For details, see [Start your component](#3-start-your-component).

## 1. Build and publish an extension image to a registry

An extension must have a container image to run in a Zowe container environment. To create such images, you can use a Dockerfile and refer to the following examples of building images for Zowe core components. 

**Examples:**

The core components define component Dockerfiles and use GitHub Actions to build images. For example,

- `explorer-jes` is a Zowe App Server Framework plug-in but does not have a built-in web service. It follows Zowe's [container conformance criteria](https://github.com/zowe/zowe-install-packaging/blob/v2.x/staging/containers/conformance.md). It defines a Dockerfile at https://github.com/zowe/explorer-jes/blob/v2.x/master/container/Dockerfile. It also defines a GitHub Actions workflow at https://github.com/zowe/explorer-jes/blob/v2.x/master/.github/workflows/build_test.yml to build the images.

The following GitHub Actions are used by the core components to build conformant images. They might not be completely reusable for you, but are provided as an example.

- [zowe-actions/shared-actions/docker-prepare](https://github.com/zowe-actions/shared-actions/blob/main/docker-prepare/action.yml) will prepare required environment variables used by following steps.
- [zowe-actions/shared-actions/docker-build-local](https://github.com/zowe-actions/shared-actions/blob/main/docker-build-local/action.yml) can build the Docker image directory on the GitHub Actions virtual machine. By default, the Docker image directory is `ubuntu-latest`. You can use this action to build images for `amd64` CPU architecture.
- [zowe-actions/shared-actions/docker-build-zlinux](https://github.com/zowe-actions/shared-actions/blob/main/docker-build-zlinux/action.yml) can build Docker image on a `Linux on Z` virtual machine. This is useful if you want to build images for `s390x` CPU architecture.
- [zowe-actions/shared-actions/docker-manifest](https://github.com/zowe-actions/shared-actions/blob/main/docker-manifest/action.yml) can collect all related images and define them as Docker manifests. This is useful for users to automatically pull the correct image based on cluster node CPU architecture, and also pull images based on popular tags such as `latest` and `latest-ubuntu`.

After a component image is built, it is recommended that you publish it to a container registry before adding it to the Zowe container environment. Alternatively, you can use `docker save` and `docker load` commands to copy the offline images to your Kubernetes nodes.

## 2. Define `Deployment` or `Job` object

To start your component in Kubernetes, you must define a [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) if your extension has built-in web services, or a [Job](https://kubernetes.io/docs/concepts/workloads/controllers/job/) object if your extension is a Zowe Application Framework plug-in without built-in web services. 

To define `Deployment` for your component, you can copy from `samples/sample-deployment.yaml` and modify all occurrences of the following variables:

- `<my-component-name>`: this is your component name. For example, `sample-node-api`.
- `<my-component-image>`: this is your component image described in [Build and publish an extension image to a registry](#1-build-and-publish-an-extension-image-to-a-registry). For example, `zowe-docker-release.jfrog.io/ompzowe/sample-node-api:latest-ubuntu`.
- `<my-component-port>`: this is the port of your service. For example, `8080`.

Continue to customize the specification to fit in your component requirements:

- `spec.template.spec.containers[0].resources`: defines the memory and CPU resource required to start the container.
- `metadata.annotations`, `spec.template.spec.volumes` and `spec.template.spec.securityContext` and so on.

To define `Job` for your component, you can also copy from `samples/sample-deployment.yaml`. Then, modify all entries mentioned above and make the following changes:

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

After you define your component `Deployment` or `Job` object, you can run `kubectl apply -f /path/to/your/component.yaml` to apply it to the Kubernetes cluster that runs Zowe. 

- If it's a `Deployment`, you should be able to see that the component pod is started and eventually reached the `Running` status. 
- If it's a `Job`, you should be able to see that the plug-in pod is started and eventually reached the `Completed` status.

Now you can follow common Kubernetes practice to manage your component workload.
