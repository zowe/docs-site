# Preparing for installation

Review this overview article to familiarize yourself with key concepts used in the Zowe server-side installation process. After you get familiar with these key concepts, review the articles in this section to prepare your system for installation. 

:::info Required roles: system programmer, security administrator, storage administrator
:::

To prepare for Zowe server-side installation, we recommend that your installation team review the installation and configuration tasks and the indicated required roles to perform specific procedures. Doing so can help you complete the process without encountering delays waiting for tasks to be completed at the last minute.

## Key concepts in Zowe server-side installation

Before you begin the installation process, it is useful to understand the following key concepts and features used to perform the installation.

### z/OS UNIX System Services (USS)

zFS is a UNIX file system where Zowe runtime files and folders are installed. Zowe uses a zFS directory to contain its northbound certificate keys as well as a truststore for its southbound keys if the administrator chooses to use PKCS#12 keystore for certificate storage. 

For more information about USS, see [Addressing UNIX System Servies (USS) Requirements](./configure-uss.md).

:::tip
Zowe runs in USS and makes heavy use of shell scripts and TCP/IP sockets, which creates temporary files and ENQUEUES within the /tmp directory. It is not likely that the increased volume of temporary files and ENQUEUES will impact your system, as this volume is on the scale of a few thousand temporary files and ENQUEUES, which are subsequently freed after configuration and startup. 

If, in your specific case, this increase in the /tmp directory results in impacts to your system, or you are concerned about the possible impact of this increased volume in the /tmp directory, we recommend you update the following property in the zowe.yaml to move the created files and ENQUEUES to different directory:

```
environments:
  TMPDIR: /your_path_to/zowe/tmp1
  TEMP_DIR: /your_path_to/zowe/tmp2
  CATALINA_TMPDIR: /your_path_to/zowe/tmp3
```
:::

### Runtime directory  
The runtime directory contains the binaries, executable files, scripts, and other elements that are run when Zowe is started. Creating a Zowe runtime directory involves setting up the necessary environment for Zowe to run on your system. 

You can create a runtime directory in one of the following ways:

* Create a directory and extract Zowe convenience build into this directory.
* Install the Zowe SMP/E FMID AZWE002 using the JCL members in the REL4 member.
* Execute the z/OSMF workflow script ZWERF01 contained in the SMP/E FMID AZWE002.

During execution of Zowe, the runtime directory contents are not modified. Maintenance or Zowe APAR releases replaces the contents of the runtime directory.

:::note
- Multiple instances of Zowe can be started from the same Zowe z/OS runtime. Each launch of Zowe has its own configuration, usually mentioned as Zowe YAML configuration file or zowe.yaml, and zFS directory that is known as a workspace directory.
:::

**Example of a runtime directory:**

- For Zowe in a high availability configuration, there will be only one workspace directory which must be created on a shared file system (zFS directory) where all LPARs in a Sysplex can access.

- (If not using containerization) Zowe optionally uses a zFS directory to contain its northbound certificate keys as well as a truststore for its southbound keys if the administrator chooses to use PKCS#12 keystore for certificate storage. Northbound keys are one presented to clients of the Zowe desktop or Zowe API Gateway, and southbound keys are for servers that the Zowe API gateway connects to.  The certificate directory is not part of the Zowe runtime so that it can be shared between multiple Zowe runtimes and have its permissions secured independently. 

- Zowe has the following started tasks:
   - `ZWESISTC` is a cross memory server that the Zowe desktop uses to perform APF-authorized code. More details on the cross memory server are described in [Configuring the Zowe cross memory server](./configure-xmem-server.md).
   - `ZWESASTC` is a cross memory Auxiliary server that is used under some situations in support of a Zowe extension. Auxiliary server is started, controlled, and stopped by the cross memory server, so no need to start it manually. More details are described in [Zowe auxiliary service](./configure-xmem-server.md)
   - `ZWESLSTC` brings up other parts of the Zowe runtime on z/OS as requested. This may include Desktop, API mediation layer, ZSS, and more, but when using containerization likely only ZSS will be used here. It can be used for a single Zowe instance deployment and can also be used for Zowe high availability deployment in Sysplex. It brings up and stops Zowe instances, or specific Zowe components without restarting the entire Zowe instances.
   
     In order for above started tasks to run correctly, security manager configuration needs to be performed.  This is documented in [Configuring the z/OS system for Zowe](./configure-zos-system.md) and a sample JCL member `ZWESECUR` is shipped with Zowe that contains commands for RACF, TopSecret, and ACF2 security managers.  

  **Notes:**
  
  - To start the API Mediation Layer as a standalone component, see [API Mediation Layer as a standalone component](./api-mediation/configuration-api-mediation-standalone.md).
  
  - If you plan to use only the API ML components and you will not be using x509 client-side certificate authentication, you do not need to run or set up ZWESISTC and ZWESASTC. Only ZWESLSTC will  be used.

## Topology of the Zowe z/OS launch process

### Runtime directory

The runtime directory contains the binaries and executable files. You can create a runtime directory in one of the following ways:

- Create a directory and extract Zowe convenience build into it.
- Installing the Zowe SMP/E FMID AZWE002 using the JCL members in the REL4 member.
- Executing the z/OSMF worklow script `ZWERF01` contained in the SMP/E FMID AZWE002.

During execution of Zowe, the runtime directory contents are not modified.  Maintenance or APAR release for Zowe replaces the contents of the runtime directory and are rollup PTFs.

A typical Zowe runtime directory looks like this:

```
├── bin/                             - Zowe launch scripts
│   ├── commands/                    - Sub-commands of zwe server command
│   │   ├── **/*/index.sh
│   ├── libs/                        - Common shell function library
│   ├── utils/                       - Miscellaneous utilities
│   ├── zwe                          - zwe server command
│   └── README.md                    - Information on zwe server command
├── components/                      - Zowe core components runtime
│   ├── api-catalog/                 - Zowe core component - API Catalog as example
│   │   ├── bin/
│   │   ├── manifest.yaml            - Zowe component manifest file
|   │   └── catalog-schema.json      - This component's schema file
│   ├── ...
│   └── zss/
├── schemas/
│   ├── manifest-schema.json         - The json schema describing component manifest files
│   ├── server-common.json           - The json schema describing common schema types such as dataset names
│   ├── trivial-component-schema.json - A trivial component json schema for extenders to get started with
│   └── zowe-yaml-schema.json        - The json schema describing the core properties of the Zowe configuration file.
├── files/                           - Other support files to setup, configure and start Zowe
│   ├── SZWEEXEC/                    - USS copy of <prefix>.SZWEEXEC data set
│   ├── SZWESAMP/                    - USS copy of <prefix>.SZWESAMP data set
│   └── workflows/                   - Files to install and configure Zowe with z/OSMF workflow
│       └── **/*.xml
├── fingerprint/                     - Zowe runtime fingerprints contains hashes of all files in runtime directory
├── licenses/                        - Zowe license notice
├── DEVELOPERS.md                    - Information for Zowe developers
├── example-zowe.yaml                - Example Zowe configuration file
├── manifest.json                    - Zowe manifest which contains definition of this build and current version
└── README.md                        - Quick introduction of Zowe and quick start guide
```

### `zwe` command
The `zwe` command is provided in the `<RUNTIME_DIR>/bin` directory.

The zwe init command is a combination of the following subcommands. Each subcommand defines a configuration.

* **mvs**  
Copies the data sets provided with Zowe to custom data sets.
* **security**  
Creates the user IDs and security manager settings.
* **apfauth**  
APF authorizes the LOADLIB containing the modules that need to perform z/OS privileged security calls.
* **certificate**  
Configures Zowe to use TLS certificates.
* **vsam**  
Configures the VSAM files needed to run the Zowe caching service used for high availability (HA)
* **stc**  
Configures the system to launch the Zowe started task.

In combination, these commands initialize Zowe, manage Zowe instances, and perform common tasks.

:::tip Tips:
* The `zwe` command has built in help that can be retrieved with the `-h` suffix. Use `zwe -h` to see all supported `zwe` commands.

  For more information about `zwe` see [zwe](../appendix/zwe_server_command_reference/zwe/zwe.md) in the appendix.

* If you expect to have only one copy of the Zowe runtime on your system, it is convenient to be able to access a copy of `zwe` from your user at any location within USS.
Add this Zowe bin directory to your `PATH` environment variable to execute the `zwe` command without having to fully qualify its location. To update your PATH, run the following command:

  ```
  export PATH=${PATH}:<RUNTIME_DIR>/bin
  ```

  This command updates the `PATH` for the current shell. To make this update persistent, you can add the line to your `~/.profile` file, or the `~/.bash_profile` file if you are using a bash shell. To make this update system wide, update the `/etc/.profile` file. Once the PATH is updated, you can execute the `zwe` command from any USS directory. For the remainder of the documentation when `zwe` command is referenced, it is assumed that it has been added to your `PATH`. 

  You may not want to add `zwe` to your PATH if you have multiple copies of the Zowe runtime, as this can confuse which one you are utilizing.
:::

### Zowe started tasks

Zowe has the following started tasks:
   - **`ZWESISTC`**  
   This started task corresponds to a cross memory server that the Zowe desktop uses to perform APF-authorized code. For more information about the cross memory server, and the cross memory auxiliary server `ZWESASTC` see [Configuring the Zowe cross memory server](./configure-xmem-server.md).
   - **`ZWESASTC`**  
   This started task corresponds to a cross memory auxiliary server that is used under some situations in support of a Zowe extension. The auxiliary server is started, controlled, and stopped by the cross memory server, and does not need to be started manually. 
   - **`ZWESLSTC`**  
   This started task brings up other features of the Zowe runtime on z/OS upon request. Features may include Desktop, API Mediation Layer, ZSS, and more. When using containerization, it is likely that the only feature will be ZSS. This task can be used for a single Zowe instance deployment, and can also be used for Zowe high availability deployment in Sysplex. This task brings up and stops Zowe instances, or specific Zowe components without restarting the entire Zowe instances.
   
:::info Important
* In order for the above started tasks to run correctly, the security administrator permissions are required. For more information, see [Configuring the z/OS system for Zowe](./configure-zos-system.md).
* Note that the sample JCL member `ZWESECUR` is shipped with Zowe and contains commands for RACF, TopSecret, and ACF2 security managers.
:::

### z/OS Data sets used by Zowe

After Zowe is properly installed, the following data sets are created on z/OS under the prefix you defined:

- **`<prefix>.SZWEAUTH`**  
This data set contains authorized binaries used by Zowe components. In particular, ZIS needs this data set to run.
- **`<prefix>.SZWELOAD`**  
This data set contains binaries that do not need authorization. In particular, this data set contains a version of configuration manager that can be accessed within REXX.
- **`<prefix>.SZWEEXEC`**  
This data set contains few utility executables will be used by Zowe.
- **`<prefix>.SZWESAMP`**  
This data set contains sample JCLs to help you configure or start Zowe.

If you install Zowe with the convenience build, these data sets are created by [`zwe install` command](../appendix/zwe_server_command_reference/zwe/zwe-install.md). If you install Zowe with SMP/E or equivalent methods, these data sets are created during installation and you are not required to run the `zwe install` command. Note that the aforementioned data sets are overwritten during the upgrade process.

Zowe configuration and runtime also use other data sets to store customization. These data sets are not overwritten during upgrade.

- **`zowe.setup.datasets.parmlib`**  
This data set defined in Zowe configuration contains user customized PARMLIB members.
- **`zowe.setup.datasets.jcllib`**  
This data set defined in Zowe configuration contains user customized JCLs or JCLs generated by [`zwe init` command](../appendix/zwe_server_command_reference/zwe/init/zwe-init.md).
- **`zowe.setup.datasets.authLoadlib`**  
This data set defined in Zowe configuration is optional. If the user chooses to copy out load libraries from `<prefix>.SZWEAUTH`, these libraries are placed here. With this option, you have better control on what will be APF authorized other than authorize whole `<prefix>.SZWEAUTH`.
- **`zowe.setup.datasets.authPluginLib`**  
This data set defined in Zowe configuration contains extra load libraries used by ZIS plugins.
- **`zowe.setup.datasets.loadlib`**  
This data set defined in Zowe configuration contains load libraries that do not need authorization, such as a version of the configuration manager that can be used within REXX.

### Zowe configuration file (`zowe.yaml`)

Zowe uses a YAML format configuration. If you store the configuration on USS, this file is usually referred as `zowe.yaml`.

This configuration file has the following  requirements:

- The Zowe runtime user, usually referred as `ZWESVUSR`, must have read permission to this file.
- If you plan to run Zowe in Sysplex, all Zowe high availability instances must share the same configuration file. As such, this configuration file should be placed in a shared file system (zFS directory) where all LPARs in a Sysplex can access.
- The Zowe configuration file may contain sensitive configuration information so it should be protected against malicious access.

To create this configuration, you can copy from `example-zowe.yaml` located in Zowe runtime directory. Note that the `zowe.runtimeDirectory` definition in the configuration file should match the Zowe runtime directory mentioned previously.

To learn more about this Zowe configuration file, see the [Zowe YAML configuration file reference](../appendix/zowe-yaml-configuration.md).


:::tip zowe.yaml configuration tips:  

When you execute the `zwe` command, the `--config` or `-c` argument is used to pass the location of a `zowe.yaml` file.

* To avoid passing `--config` or `-c` to every `zwe` command, you can define `ZWE_CLI_PARAMETER_CONFIG` environment variable points to the location of zowe.yaml.

  For example, after defining `export ZWE_CLI_PARAMETER_CONFIG=/path/to/my/zowe.yaml`, you can simply type `zwe start` instead of the full command `zwe start -c /path/to/my/zowe.yaml`.

* If you are new to the `example-zowe.yaml` configuration file, you can start with entries that are marked with `COMMONLY_CUSTOMIZED`. It highlights most of the common configurations, such as directories, host and domain name, service ports, certificate setup, and z/OSMF, which are critical for standing a new Zowe instance.
:::

### Workspace directory

The workspace directory is required to launch Zowe. It is automatically created when you start Zowe. More than one workspace directory can be created and used to launch multiple instances of Zowe sharing the same runtime directory. It is not recommended to create workspace directory manually in order to avoid permission conflicts.

Zowe instances are started by running the server command `zwe start`. This creates a started task with the PROCLIB member `ZWESLSTC` that is provided with the samplib `SZWESAMP` created during the installation of Zowe. The JCL member `ZWESLSTC` starts Zowe launcher under which it launches Zowe components address spaces.  

Zowe enables read and write permission to both Zowe runtime user (`ZWESVUSR` by default) and Zowe admin group (`ZWEADMIN` by default) for Zowe workspace directory.

If you plan to run Zowe in Sysplex, all Zowe high availability instances must share the same workspace directory, which means it should be placed in a shared file system (zFS directory) where all LPARs in a Sysplex can access.

The workspace directory should be defined in your Zowe configuration file as `zowe.workspaceDirectory`.

### Log directory

Some Zowe components write logs to a file system. The directory is created automatically when you start Zowe and the content is automatically managed by Zowe components. It is not recommended to create a log directory manually in order to avoid permission conflicts.

Multiple Zowe instances can define different log directories. It is not necessary that these log directories be shared in Sysplex deployment like the workspace directory.

The log directory should be defined in your Zowe configuration file as `zowe.logDirectory`.

### Keystore directory

Zowe uses certificates to enable transport layer security. The system administrator can choose to use z/OS Keyring or PKCS#12 keystore for certificate storage. A keystore directory is created and used if PKCS#12 keystore is chosen.

**Example of a PKCS#12 keystore directory:**

```
├── local_ca/                             - Zowe generated certificate authority
│   ├── local_ca.cer                      - Zowe CA certificate in PEM format
│   └── local_ca.keystore.p12             - Zowe CA (both certificate and private key) in PKCS#12 format
└── localhost/                            - Zowe generated certificates
    ├── local_ca.cer                      - Zowe CA certificate in PEM format
    ├── localhost.cer                     - Default Zowe certificate in PEM format
    ├── localhost.key                     - Default Zowe certificate private key in PEM format
    ├── localhost.keystore.p12            - Zowe certificates in PKCS#12 format
    └── localhost.truststore.p12          - Zowe trusted certificate authorities in PKCS#12 format
```

To generate a keystore directory, you need proper `zowe.setup.certificate` configuration defined in the Zowe configuration file. Execute the server command `zwe init certificate`. To learn more about this command, see the [Reference of zwe init certificate](../appendix/zwe_server_command_reference/zwe/init/zwe-init-certificate.md) in the appendix.

### Extension directory

Zowe allows server extensions to expand Zowe core functionalities. The extensions are required to be installed in a central location so Zowe runtime can find and recognize them.

Similar to Zowe runtime directory, this extension directory should be created by the administrators perform Zowe installation and configuration task. Zowe runtime user, typically `ZWESVUSR` requires read-only permission to this directory.

The extension directory should be created by system administrator and defined in your Zowe configuration file as `zowe.extensionDirectory`.

Zowe uses [`zwe components install` command](../appendix/zwe_server_command_reference/zwe/components/install/zwe-components-install.md) to install Zowe server extensions. This command creates sub-directories or symbolic links under the extension directory.

## Next step

Review and address the specific requirements in the Prepare for Installation section before beginning installation of Zowe server-side components for z/OS.
