# Downloading and installing

Learn how to download and install Zowe's containers.  

## Downloading

You can download Zowe's containers in one of the following ways: 

- [Downloading configuration samples](#downloading-configuration-samples)
- [Downloading container images](#downloading-container-images)

### Downloading configuration samples

The easiest way to install and run Zowe's containers is by using the configuration samples that are provided on Zowe's website. If you don't already have these samples, you can download them by completing the following tasks:

1. [Download the Zowe `zowe-install-packaging` repository as a .zip file](https://github.com/zowe/zowe-install-packaging/archive/refs/heads/master.zip).  
2. Extract the compressed file to the system where you will run the Zowe containers.  
3. Find the samples within the extracted folder `containers/kubernetes`.

### Downloading container images

Downloading Zowe's container images manually is not required because this can be done automatically when applying a Kubernetes deployment configuration.

If wanted, you can download Zowe's container images manually by using the `docker pull` commands. This allows you to get an image from a registry or attach an image that you have downloaded directly. You can find Zowe's container images in [https://zowe.jfrog.io/ui/repos/tree/General/docker-release%2Fompzowe](https://zowe.jfrog.io/ui/repos/tree/General/docker-release%2Fompzowe):

- **Registry**: zowe-docker-release.jfrog.io
- **Organization**: ompzowe

Full image addresses include,

- `zowe-docker-release.jfrog.io/ompzowe/gateway-service:latest-ubuntu`  
- `zowe-docker-release.jfrog.io/ompzowe/app-server:latest-ubuntu`  
- `zowe-docker-release.jfrog.io/ompzowe/explorer-jes:latest-ubuntu`

Therefore, you can download these manually with the `docker pull` commands. For example,

`docker pull zowe-docker-release.jfrog.io/ompzowe/app-server:latest-ubuntu`

## Installing

You do not need to install the Zowe containers if you use Zowe's Kubernetes configuration samples. By default, these sample configurations will pull Zowe component images from the public Zowe docker release registry `zowe-docker-release.jfrog.io` directly and then start them. Your Kubernetes nodes require  an Internet connection that can reach this registry.

If your Kubernetes nodes do not have an Internet connection, you can follow the instruction of the previous step to manually pull all images into all your Kubernetes nodes. After you have done this, you need to modify all occurrences of `imagePullPolicy: Always` in the sample configurations and replace them with `imagePullPolicy: Never` before applying them.
