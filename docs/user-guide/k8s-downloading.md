# Downloading and installing

## Downloading

### Downloading configuration samples

The easiest way to install and run Zowe's containers is by using the configuration samples provided on Zowe's website. If you don't already have these samples, you can download them by:

1) [Downloading a ZIP of the packaging repository](https://github.com/zowe/zowe-install-packaging/archive/refs/heads/master.zip)
2) Extracting it to the system that will run the containers
3) Finding the samples within the extracted folder "containers/kubernetes"

### Downloading container images

Downloading Zowe's container images manually is not required, since this can be done automatically when applying a Kuberentes [deployment configuration](#apply-zowe-core-components-and-start-zowe).

If desired, you can download Zowe's container images manually by using the `docker pull` or `docker load` commands. This allows you to get an image from a registry or attach an image that you have downloaded directly. You can find Zowe's container images at:

Registry: zowe-docker-release.jfrog.io
Organization: ompzowe

Full image addresses include,
zowe-docker-release.jfrog.io/ompzowe/gateway-service:latest-ubuntu
zowe-docker-release.jfrog.io/ompzowe/app-server:latest-ubuntu
zowe-docker-release.jfrog.io/ompzowe/explorer-jes:latest-ubuntu

So, it is possible to download these manually with commands such as

`docker pull zowe-docker-release.jfrog.io/ompzowe/app-server:latest-ubuntu`


## Installing

You do not need to do any install task if using Zowe's Kubernetes configuration samples, it is automatic.

An image could be considered "Installed" when it is findable by Kubernetes. Just like downloading, this is done automatically by Kubernetes but commands such as `docker pull` or `docker load` will accomplish the same task.
