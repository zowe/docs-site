## Import New Component

### Build and Push Component Image

Component must create container image and the component image must follow Zowe Containerization Conformance to make sure it can be started within a Zowe cluster.

Zowe core components define component Dockerfiles and use Github Actions to build images. For example, `explorer-jes` component

- has Dockerfile defined at https://github.com/zowe/explorer-jes/blob/master/container/Dockerfile,
- and defines Github Actions workflow https://github.com/zowe/explorer-jes/blob/master/.github/workflows/explorer-jes-images.yml to build the image.

There are several shared Github Actions may help you build your own image:

- `zowe-actions/shared-actions/docker-prepare` will prepare required environment variables used by following steps.
- `zowe-actions/shared-actions/docker-build-local` can build docker image directory on Github Actions virtual machine. By default it will be `ubuntu-latest`. This action can be used to build image for `amd64` CPU architecture.
- `zowe-actions/shared-actions/docker-build-zlinux` can build docker image on a `Linux on Z` virtual machine. This is useful if you want to build image for `s390x` CPU architecture.
- `zowe-actions/shared-actions/docker-manifest` can collect all related images and define them as docker manifests. This is useful for end-user to automatically pull the correct image based on cluster node CPU architecture, and also pull images based on popular tags like `latest`, `latest-ubuntu`, etc.

Component image must be pushed to a container image registry.
### Define `Deployment` Object

In order to start your component in Kubernetes, you need to define a `Deployment` object. To define `Deployment` for your component, you can copy from `samples/sample-deployment.yaml` and modify all occurrences of these variables:

- `<my-component-name>`: this is your component name. For example, `sample-node-api`.
- `<my-component-image>`: this is your component image described in the above [section](#build-and-push-component-image). For example, `zowe-docker-release.jfrog.io/ompzowe/sample-node-api:latest-ubuntu`.
- `<my-component-port>`: this is the port of your service. For example, `8080`.

Continue to customize the specification to fit in your component requirements:

- `spec.replicas`: adjust how many pods you wish to start for your component,
- `spec.template.spec.containers[0].resources`: adjust the memory and CPU resource required to start the container,
- `metadata.annotations`, `spec.template.spec.volumes` and `spec.template.spec.securityContext` etc.

### Start Your Component

Once you defined your component `Deployment` object, you can run `kubectl apply -f /path/to/your/component-deployment.yaml` to apply it to Kubernetes cluster running Zowe. Now you can follow common Kubernetes practice to mange your component workload.