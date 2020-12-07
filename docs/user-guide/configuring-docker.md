# Configuring Zowe runtime Docker Container

Configuring the Zowe runtime Docker Image has similarities to [configuring runtime instance on z/OS](configure-instance-directory.md). However, there are three major differences:

- Ports are managed between Docker and the host rather than in instance.env
- Plugins can be added from the host by using a Docker mount
- External certificates can be used from a Docker mount

## Working with Docker mounts

Docker has a feature called a "mount", which allows you to share a folder from the host system into one or more containers.
Zowe can use the mount feature in order to share important settings and content, such as certificates and plugins between multiple instances of Zowe. Additionally, mounts keep these objects intact when upgrading between Zowe versions.

## Quick start for the Zowe runtime in Docker

The Zowe Docker Image comes with a sample script for starting a container of Zowe, plus a basic instance configuration.

1. Note the ID of the image.

```
# docker images
REPOSITORY                         TAG                 IMAGE ID            CREATED             SIZE
ompzowe/zowe-v1-lts                amd64               ceb8c50d2381        2 hours ago         1.27GB
```

2. Start a container of the image without starting Zowe yet by using the environment value `ZOWE_START=0`

```
# docker run -it --env ZOWE_START=0 ceb8c50d2381 &
```

3. Make note of the new container's ID.

```
# docker container list
CONTAINER ID        IMAGE                      COMMAND               CREATED             STATUS              PORTS                                                            NAMES
7664336131e9        ceb8c50d2381               "/root/zowe/run.sh"   3 minutes ago       Up 3 minutes        7553-7554/tcp, 8544/tcp    
```

4. Copy the samples out.

```
# docker cp 7664336131e9:/root/zowe/samples/start.sh .
# docker cp 7664336131e9:/root/zowe/instance .
```

This will generate a sample script for running docker containers, `start.sh`, and a sample instance as the folder `instance`.

It is recommended to customize `start.sh`, however test installs can skip to [Starting the container](#starting-the-container).

Within `start.sh`, you will be able to see parameters to customize ports, specify which Zowe components to start, specify where the z/OS system is located, and more.

**Note: The Zowe keystore cannot be copied in this way because it does not exist initially. If you need to initialize a keystore, you can start Zowe in the container temporarily by omitting `ZOWE_START=0` and run a `docker cp` command to copy out `/global/zowe/keystore` to make desired edits.**

### Customizing Zowe container start script
There are many different ways to configure a Zowe docer container:

- `-h <hostname>` - hostname of docker host (hostname of your laptop eg: myhost.acme.net)
- `--env ZOWE_IP_ADDRESS=<ip>` - The IP which the servers should bind to. Should not be a loopback address.
- `--env ZOSMF_HOST=<zosmf_hostname>` - z/OSMF hostname (eg mf.acme.net)
- `--env ZOSMF_PORT=<zosmf_port>` - z/OSMF port eg (1443)
- `--env ZWED_agent_host=<zss_hostname>` - ZSS host (eg mf.acme.net)
- `--env ZWED_agent_http_port=<zss_port>` - ZSS port z/OSMF port eg (60012)
- `--env LAUNCH_COMPONENT_GROUPS=<DESKTOP or GATEWAY>` - what do you want to start
  - DESKTOP - only desktop
  - GATEWAY - only GATEWAY + explorers
  - GATEWAY,DESKTOP - both
- `-v [LOCAL_KEYSTORE]:/root/zowe/certs:rw` - Uses external keys and certificates for HTTPS. Keystore directory structure is the same as with Zowe on z/OS.
- `--env EXTERNAL_CERTIFICATE=<keystore.p12>` - location of p12 keystore. (optional)
- `--env EXTERNAL_CERTIFICATE_ALIAS=<alias>` - valid alias within keystore. (optional)
- `--env EXTERNAL_CERTIFICATE_AUTHORITIES=<CA.cer>` - location of x509 Certificate Authority (optional)
- `-v [LOCAL_APPS_DIR]:/root/zowe/apps:ro` - Adds App Framework Apps to the container
- `-v [LOCAL_INSTANCE_DIR]:/root/zowe/external_instance:rw` - (Recommended) Uses a Zowe instance directory from outside the container. Recommended to save preferences between upgrades and to have multiple containers of Zowe sharing configurations.
- `--env EXTERNAL_INSTANCE=/root/zowe/external_instance` - Used together with the `-v` command to use an external instance directory.
- 

**Note: External certificates are optional, but recommended to resolve self-signed certificate warnings.**

### Using an instance directory external to the Zowe container
Each Zowe container comes with a simple instance directory setup, but it is recommended that this only be used for development, as changes made to the instance will not remain after upgrade and it prevents sharing configuration across multiple containers.

Instead, having an instance directory external to the container solve these issues.

If you have migrated the instance directory from z/OS, copied the simple instance directory from the container, or otherwise have a pre-existing instance directory, you can use it with a Zowe container by using a volume mount command in the start script.

```
-v [LOCAL_INSTANCE_DIR]:/root/zowe/external_instance:rw \
--env EXTERNAL_INSTANCE=/root/zowe/external_instance \
```

See [Creating and configuring the Zowe instance directory](configure-instance-directory.md#reviewing-the-instance-env-file) to review options for instance directory configuration.


### Using external certificates
Zowe's keystore can be used to configure which keys and ceritificates will be used by Zowe for HTTPS connections.

The keystore directory configuration and functionality for Docker is identical to the configuration and functionality on z/OS, except for limitations on storage types.
Currently, the Zowe bundle Docker image only supports file-based keys and certificates, such as P12 and PEM files.

To use external certificates, the [external instance](#using-an-instance-directory-external-to-the-zowe-container) must set the value of `KEYSTORE_DIRECTORY` to `/root/zowe/certs`, and the keystore directory should exist outside of Docker but mounted to each Docker container via the `-v` docker command, for example `-v [LOCAL_KEYSTORE]:/root/zowe/certs:rw`

See [Configuring Zowe certificates](configure-certificates.md) for more information.

### Starting the container
The recommended way to start your first container is by running the `start.sh` script.
You can choose to run it with `nohup`, `&`, or the docker `--detach` command as ways to run the container independent of the terminal.

When the container is running, the servers' log output may be printed to the screen depending on the above commands, but the servers will also log to a folder within the instance directory, `$INSTANCE_DIR/logs`.

After startup, you can verify that Zowe is running by opening the browser to:

 - API Mediation Layer: https://your_hostname:7554
 - App Framework: https://your_hostname:8544

Or, if the ports were modified, `https://your_hostname:$GATEWAY_PORT` and `https://your_hostname:$APP_SERVER_PORT`

## Using Zowe-based products, plugins and apps 
To use Zowe-based software with the docker container, you must make that software visible to the Zowe that is within Docker by mapping a folder on your host machine to a folder visible within the docker container.

To share a host directory *HOST_DIR* into the docker container destination directory *CONTAINER_DIR* with read-write access, simply add this line to your docker run command: `-v [HOST_DIR]:[CONTAINER_DIR]:ro`
You can have multiple such volumes, but for Zowe Application Framework plugins, the value of *CONTAINER_DIR* must be `/root/zowe/apps`

Application Framework plugins within the root directory of ```/root/zowe/apps``` will be automatically installed at start up, but if you have a product which has subdirectories of plugins, it may need manual installation or configuration.

For those plugins, you can run their scripts or Zowe's own `install-app.sh` script by executing a command in Docker, such as:
```docker exec -it [CONTAINER_ID] /root/zowe/instance/bin/install-app.sh [APPLICATION_DIR]```

**Note: When installing Application Framework plugins, you can attempt to load them without a server restart via either clicking "Refresh Applications" in the launchbar menu of the Zowe Desktop, or by doing an HTTP GET call to /plugins?refresh=true to the app server. Some plugins may still need a server restart. Consult product documentation for specifics**

## Zowe's docker mount locations

When attempting to share certificates, plugins, or instance configuration to a Zowe container, the mount desination is fixed and therefore the following must be used:

- Certificates: The Zowe keystore destination must be `/root/zowe/certs`
- App framework plugins: The folder that contains all plugins must be `/root/zowe/apps`
- Instance configuration: The folder that contains the contents of a Zowe `$INSTANCE_DIR` must be `/root/zowe/external_instance`