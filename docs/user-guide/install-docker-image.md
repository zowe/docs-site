# Installing Zowe runtime Docker Image

Docker is a way to create a pre-packaged set of software and configuration called an "Image". Images are used to create Docker "Containers", which run the Image contents in isolation from the other software running on the same system. Docker containers are the runtime environment, and Images are what they are crated from.

The majority of the Zowe server runtime is available in the form of a Docker Image, among other options.
To use this image, you must have set up the Zowe server runtime on z/OS, z/OSMF, or both depending on which Zowe components you will use.

If you have not set up the Zowe server runtime on z/OS, please follow the steps found in [Docker Installation Roadmap](install-docker.md).

This guide assumes you are using Linux or zLinux and have already downloaded Docker itself. If you have not yet done so, please review [System Requirements](systemrequirements.md).

## Installing via Docker Hub

Zowe's Docker Image is hosted on [Docker Hub](https://hub.docker.com), which is the default location from which you can use the Docker command line utility to download and update Docker Images. On Docker Hub, the Zowe server runtime image is named [ompzowe/zowe-v1-lts](https://hub.docker.com/r/ompzowe/zowe-v1-lts).

You can download a Docker Image by using the Docker command line utility `docker pull imagename` where _imagename_ is one of the following:

- The latest version of zowe, `ompzowe/zowe-v1-lts:latest`
- The latest version for the platform you are running on, such as `ompzowe/zowe-v1-lts:amd64` for Linux
- A specific version by referencing the verion's digest, such as `ompzowe/zowe-v1-lts@sha256:bdbc0617b02e16a452f6d4de50b8b13e56592e309b4c68f9ea52c82303ad57ec`

The latest digests can be seen on the [image's tags page](https://hub.docker.com/r/ompzowe/zowe-v1-lts/tags).

## Installing via direct download

You can install a Docker Image that has been downloaded as a `.tar` archive from anywhere, such as Zowe.org.

### Loading an image from tarball

To install a Docker Image that you have downloaded as a tar file from somewhere, transfer the file to the destination host and then run `docker image load -i path_to_tar`

## Confirming the installation

The `docker images` command lists the images a system currently has, which make them available for creating containers from.

```
# docker images
REPOSITORY                         TAG                 IMAGE ID            CREATED             SIZE
ompzowe/zowe-v1-lts                amd64               ceb8c50d2381        2 hours ago         1.27GB
```

## Upgrading

Once installed, it is possible to upgrade an image by using `docker pull` with the same _imagename_ as before, or by using `docker image load` to load another image of the same type.
Newer containers can be created from newer images. In Zowe, configuration can be persisted between containers. More information on this subject can be found in [Configuring Docker Container](configuring-docker.md) documentation.

When upgrading, it is possible that the previous image may persist.
You may see the old image tagged as `<none>`.

```
# docker images
REPOSITORY                         TAG                 IMAGE ID            CREATED             SIZE
ompzowe/zowe-v1-lts                amd64               ceb8c50d2381        2 hours ago         1.27GB
<none>                             <none>              1e52fadc2918        2 weeks ago         3.03GB
```

If you see this and want to clean up the older images to preserve storage space, you can run the command `docker rmi IMAGE_ID` to remove an image, where IMAGE_ID is the code seen from the `images` command.
