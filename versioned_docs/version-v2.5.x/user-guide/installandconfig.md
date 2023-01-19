# Planning the installation

The following information is required during the Zowe installation process. Software and hardware prerequisites are covered in the next section.

- The zFS directory where you will install the Zowe runtime files and folders. For more details of setting up and configuring the UNIX Systems Services (USS) environment, see [UNIX System Services considerations for Zowe](configure-uss.md).

- A HLQ that the installation can create a load library and samplib containing load modules and JCL samples required to run Zowe.

- Multiple instances of Zowe can be started from the same Zowe z/OS runtime. Each launch of Zowe has its own configuration, usually mentioned as Zowe YAML configuration file or zowe.yaml, and zFS directory that is known as a workspace directory.

- For Zowe in a high availability configuration, there will be only one workspace directory which must be created on a shared file system (zFS directory) where all LPARs in a Sysplex can access.

- (If not using containerization) Zowe optionally uses a zFS directory to contain its northbound certificate keys as well as a truststore for its southbound keys if the administrator chooses to use PKCS#12 keystore for certificate storage. Northbound keys are one presented to clients of the Zowe desktop or Zowe API Gateway, and southbound keys are for servers that the Zowe API gateway connects to.  The certificate directory is not part of the Zowe runtime so that it can be shared between multiple Zowe runtimes and have its permissions secured independently. 

- Zowe has the following started tasks:
   - `ZWESISTC` is a cross memory server that the Zowe desktop uses to perform APF-authorized code. More details on the cross memory server are described in [Configuring the Zowe cross memory server](configure-xmem-server.md).
   - `ZWESASTC` is a cross memory Auxiliary server that is used under some situations in support of a Zowe extension. Auxiliary server is started, controlled, and stopped by the cross memory server, so no need to start it manually. More details are described in [Zowe auxiliary service](configure-xmem-server.md)
   - `ZWESLSTC` brings up other parts of the Zowe runtime on z/OS as requested. This may include Desktop, API mediation layer, ZSS, and more, but when using containerization likely only ZSS will be used here. It can be used for a single Zowe instance deployment and can also be used for Zowe high availability deployment in Sysplex. It brings up and stops Zowe instances, or specific Zowe components without restarting the entire Zowe instances.
   
     In order for above started tasks to run correctly, security manager configuration needs to be performed.  This is documented in [Configuring the z/OS system for Zowe](configure-zos-system.md) and a sample JCL member `ZWESECUR` is shipped with Zowe that contains commands for RACF, TopSecret, and ACF2 security managers.  

  **Notes:**
  
  - To start the API Mediation Layer as a standalone component, see [API Mediation Layer as a standalone component](api-mediation-standalone.md).
  
  - If you plan to use API ML with basic authentication and JSON web token authentication, you need to run only `ZWESLSTC`. No need to run `ZWESISTC` and `ZWESASTC`.
  
  - If you plan to use API ML with x509 client-side certificate authentication, you need to run `ZWESISTC` and `ZWESLSTC`.

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

#### `zwe` server command

The `zwe` command is provided in the `<RUNTIME_DIR>/bin` directory. You can use this command and sub-commands to initialize Zowe, manage Zowe instances and fulfill common tasks.

The `zwe` command has built in help that can be retrieved with the `-h` suffix. For example, type `zwe -h` to display all of the supported commands. These are broken down into a number of sub-commands, and all of the help can also be found on this website, in ([the zwe appendix](../appendix/zwe_server_command_reference/zwe/zwe.md)  

```
zwe -h
 ...
Available sub-command(s):
  - certificate
  - components
  - init
  - install
  - internal
  - sample
  - start
  - stop
  - version
```

Other useful global parameters are:

- `--debug` or `-v` to enable verbose mode.
- `--trace` or `-vv` to enable trace mode for current command.
- `--log-dir` or `-l` to also write output to log files.

#### Add the `zwe` command to your PATH

If you expect to only have one copy of the Zowe runtime on your system, it is convenient to be able to access its copy of `zwe` from your user at any location within USS.
You can add this Zowe bin directory to your `PATH` environment variable so you can execute the `zwe` command without having to fully qualify its location. To update your PATH, run the following command:

```
export PATH=${PATH}:<RUNTIME_DIR>/bin
```

This will update the `PATH` for the current shell. To make this update persistent, you can add the line to your `~/.profile` file, or the `~/.bash_profile` file if you are using a bash shell. To make this update system wide, you can update the `/etc/.profile` file. Once the PATH is updated, you can execute the `zwe` command from any USS directory. For the remainder of the documentation when `zwe` command is referenced, it is assumed that it has been added to your `PATH`. 

*Note: You may not want to add `zwe` to your PATH if you have multiple copies of the Zowe runtime, as this can confuse which one you are utilizing*

### z/OS Data sets used by Zowe

After Zowe is properly installed, you should have these data sets created on z/OS under the prefix you defined:

- `<prefix>.SZWEAUTH` contains authorized binaries used by Zowe components. In particular, ZIS needs this to run.
- `<prefix>.SZWELOAD` contains binaries that do not need authorization. In particular, this contains a version of config manager that can be accessed within REXX.
- `<prefix>.SZWEEXEC` contains few utility executables will be used by Zowe.
- `<prefix>.SZWESAMP` contains sample JCLs to help you configure or start Zowe.

If you install Zowe with convenience build, these data sets will be created by [`zwe install` command](../appendix/zwe_server_command_reference/zwe/zwe-install.md). If you install Zowe with SMPE or equivalent methods, these data sets will be created during install and you are not required to run `zwe install` command. The above data sets will be overwritten during upgrade process.

Zowe configuration and runtime also use few other data sets to store customization. These data sets will not be overwritten during upgrade.

- `zowe.setup.datasets.parmlib` defined in Zowe configuration, which contains user customized PARMLIB members.
- `zowe.setup.datasets.jcllib` defined in Zowe configuration, which contains user customized JCLs or JCLs generated by [`zwe init` command](../appendix/zwe_server_command_reference/zwe/init/zwe-init.md).
- `zowe.setup.datasets.authLoadlib` defined in Zowe configuration is optional. If the user choose to copy out load libraries from `<prefix>.SZWEAUTH`, they will be placed here. With this option, you have better control on what will be APF authorized other than authorize whole `<prefix>.SZWEAUTH`.
- `zowe.setup.datasets.authPluginLib` defined in Zowe configuration contains extra load libraries used by ZIS plugins.
- `zowe.setup.datasets.loadlib` defined in zowe configuration contains load libraries that do not need authorization, such as a version of the configuration manager that can be used within REXX.

### Zowe configuration file

Zowe uses a YAML format configuration. If you store the configuration on USS, this file is usually referred as `zowe.yaml`.

This configuration file can be placed on a location with these requirements:

- Zowe runtime user, usually referred as `ZWESVUSR`, must have read permission to this file.
- If you plan to run Zowe in Sysplex, all Zowe high availability instances must share the same configuration file. That means this configuration file should be placed in a shared file system (zFS directory) where all LPARs in a Sysplex can access.
- Zowe configuration file may contain sensitive configuration information so it should be protected against malicious accessing.

To create this configuration, you can copy from `example-zowe.yaml` located in Zowe runtime directory. Please be aware of the `zowe.runtimeDirectory` definition in the configuration file, it should match the Zowe runtime directory mentioned above.

To learn more about this configuration, please check [Zowe YAML configuration file reference](../appendix/zowe-yaml-configuration.md).

When you execute the `zwe` command, the `--config` or `-c` argument is used to pass the location of a `zowe.yaml` file.

:::tip
To avoid passing `--config` or `-c` to every `zwe` commands, you can define `ZWE_CLI_PARAMETER_CONFIG` environment variable points to location of zowe.yaml.

For example, after defining `export ZWE_CLI_PARAMETER_CONFIG=/path/to/my/zowe.yaml`, you can simply type `zwe start` instead of full command `zwe start -c /path/to/my/zowe.yaml`.
:::

:::tip
If you are new to the `example-zowe.yaml` configuration file, you can start with entries that are marked with `COMMONLY_CUSTOMIZED`. It highlights most of the common configurations, such as directories, host and domain name, service ports, certificate setup, and z/OSMF, which are critical for standing a new Zowe instance.
:::

### Workspace directory

The workspace directory is required to launch Zowe. It is automatically created when you start Zowe. More than one workspace directory can be created and used to launch multiple instances of Zowe sharing the same runtime directory. It's not recommended to create workspace directory manually in order to avoid permission conflicts.

Zowe instances are started by running the server command `zwe start`. This creates a started task with the PROCLIB member `ZWESLSTC` that is provided with the samplib `SZWESAMP` created during the installation of Zowe. The JCL member `ZWESLSTC` starts Zowe launcher under which it launches Zowe components address spaces.  

Zowe enables read and write permission to both Zowe runtime user (`ZWESVUSR` by default) and Zowe admin group (`ZWEADMIN` by default) for Zowe workspace directory.

If you plan to run Zowe in Sysplex, all Zowe high availability instances must share the same workspace directory, which means it should be placed in a shared file system (zFS directory) where all LPARs in a Sysplex can access.

The workspace directory should be defined in your Zowe configuration file as `zowe.workspaceDirectory`.

### Log directory

Some Zowe components will write logs to file system. The directory will be created automatically when you start Zowe and the content will be automatically managed by Zowe components. It's not recommended to create log directory manually in order to avoid permission conflicts.

Multiple Zowe instances can define different log directories, they are not necessary to be shared in Sysplex deployment like workspace directory.

The log directory should be defined in your Zowe configuration file as `zowe.logDirectory`.

### Keystore directory

Zowe uses certificates to enable transport layer security. The system administrator can choose to use z/OS Keyring or PKCS#12 keystore for certificate storage. A keystore directory will be created and used if PKCS#12 keystore is chosen.

A typical PKCS#12 keystore directory looks like:

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

To generate keystore directory, you need proper `zowe.setup.certificate` configuration defined in Zowe configuration file and then execute server command `zwe init certificate`. To learn more about this command, check [Reference of zwe init certificate](../appendix/zwe_server_command_reference/zwe/init/zwe-init-certificate.md).

### Extension directory

Zowe allows server extensions to expand its core functionalities. The extensions are required to be installed in a central location so Zowe runtime can find and recognize them.

Similar to Zowe runtime directory, this extension directory should be created by the administrators perform Zowe installation and configuration task. Zowe runtime user, typically `ZWESVUSR` requires read-only permission to this directory.

The extension directory should be created by system administrator and defined in your Zowe configuration file as `zowe.extensionDirectory`.

Zowe uses [`zwe components install` command](../appendix/zwe_server_command_reference/zwe/components/install/zwe-components-install.md) to install Zowe server extensions. This command will create sub-directories or symbolic links under the extension directory.
