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

If wanted, you can download Zowe's container images manually by using the `docker pull` or `docker load` commands. This allows you to get an image from a registry or attach an image that you have downloaded directly. You can find Zowe's container images in the following location:

- **Registry**: zowe-docker-release.jfrog.io
- **Organization**: ompzowe

Full image addresses include,

- `zowe-docker-release.jfrog.io/ompzowe/gateway-service:latest-ubuntu`  
- `zowe-docker-release.jfrog.io/ompzowe/app-server:latest-ubuntu`  
- `zowe-docker-release.jfrog.io/ompzowe/explorer-jes:latest-ubuntu`

Therefore, you can download these manually with the `docker pull` commands. For example,

`docker pull zowe-docker-release.jfrog.io/ompzowe/app-server:latest-ubuntu`

## Installing

You do not need to install the Zowe containers if you use Zowe's Kubernetes configuration samples. The installation is automatic.

An image could be considered "installed" when it is findable by Kubernetes. Just like downloading, this is done automatically by Kubernetes but commands such as `docker pull` or `docker load` accomplishes the same task.
