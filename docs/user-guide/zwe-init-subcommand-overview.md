# zwe init subcommand overview

Review this article to learn about the individual subcommands executed in `zwe init`. Based on your use case, you may choose to run the subcommands of `zwe init` individually rather than running all of these commands together. Review this article to get started with using `zwe init` subcommands.

:::important
Some of the following `zwe init` subcommands require elevated permissions. See the required roles associated with each of these commands.
:::

- [Initializing Zowe custom data sets (`zwe init mvs`)](#initializing-zowe-custom-data-sets-zwe-init-mvs)
  - [Procedure to initialize Zowe custom data sets](#procedure-to-initialize-zowe-custom-data-sets)
- [Initializing Zowe security configurations (`zwe init security`)](#initializing-zowe-security-configurations-zwe-init-security)
- [Performing APF authorization of load libraries (`zwe init apfauth`)](#performing-apf-authorization-of-load-libraries-zwe-init-apfauth)
- [Configuring Zowe to use TLS certificates (`zwe init certificate`)](#configuring-zowe-to-use-tls-certificates-zwe-init-certificate)
- [Installing Zowe main started tasks (`zwe init stc`)](#installing-zowe-main-started-tasks-zwe-init-stc)


## Initializing Zowe custom data sets (`zwe init mvs`)

Use the `zwe init mvs` command to intialize Zowe custom MVS data sets. 

:::info Required role: system programmer
:::

During the installation of Zowe, the following data sets are created and populated with members copied across from the Zowe installation files:
* `SZWEAUTH`
* `SZWEEXEC`
* `SZWELOAD`
* `SZWESAMP`

The contents of these data sets represent the original files that were provided as part of the Zowe installation and are not meant to be modified.

For modification and execution, it is necessary to create custom data sets by using the `zwe init mvs` command. For detailed information about this command, see the [`zwe init mvs` command reference](../appendix/zwe_server_command_reference/zwe/init/zwe-init-mvs.md).

The following `zowe.yaml` section contains the parameters for the data set names:

```yaml
zowe:
  setup:
    dataset:
      prefix: IBMUSER.ZWE
      parmlib: IBMUSER.ZWE.CUST.PARMLIB
      jcllib: IBMUSER.ZWE.CUST.JCLLIB
      authLoadlib: IBMUSER.ZWE.SZWEAUTH
      authPluginLib: IBMUSER.ZWE.CUST.ZWESAPL
```

Review the following table for storage requirements for the three data sets:

Library DDNAME | Member Type | zowe.yaml | Target Volume | Type | Org | RECFM | LRECL | No. of 3390 Trks | No. of DIR Blks
---|---|---|---|---|---|---|---|---|--
CUST.PARMLIB | PARM Library Members | zowe.setup.dataset.parmlib | ANY | U | PDSE | FB | 80 | 15 | 5
CUST.JCLLIB | JCL Members | zowe.setup.dataset.jcllib | ANY | U | PDSE | FB | 80 | 15 | 5
CUST.ZWESAPL | CLIST copy utilities | zowe.setup.dataset.authPluginLib | ANY | U | PDSE | U | 0 | 15 | N/A

### Procedure to initialize Zowe custom data sets

To initialize Zowe custom data sets, run the following command: 

```
zwe init mvs -c /path/to/zowe.yaml
```

The following output is an example of running `zwe init mvs`.  

**Example:**

```
#>zwe init mvs -c ./zowe.yaml
-------------------------------------------------------------------------------
>> Initialize Zowe custom data sets

Create data sets if they do not exist
Creating IBMUSER.ZWE.CUST.PARMLIB
Creating IBMUSER.ZWE.CUST.JCLLIB
Creating IBMUSER.ZWE.CUST.ZWESALL
Creating IBMUSER.ZWE.CUST.ZWESAPL

Copy IBMUSER.ZWE.CUST.SZWESAMP(ZWESIP00) to IBMUSER.ZWE.CUST.PARMLIB(ZWESIP00)
Copy components/zss/LOADLIB/ZWESIS01 to IBMUSER.ZWE.CUST.ZWESALL(ZWESIS01)
Copy components/zss/LOADLIB/ZWESAUX to IBMUSER.ZWE.CUST.ZWESALL(ZWESAUX)
Copy components/zss/LOADLIB/ZWESISDL to IBMUSER.ZWE.CUST.ZWESALL(ZWESISDL)
Copy components/launcher/bin/zowe_launcher to IBMUSER.ZWE.CUST.ZWESALL(ZWELNCH)

>> Zowe custom data sets are initialized successfully.
```

Successful execution of `zwe init mvs` has the following results:

* In the `zowe.yaml` file, custom data sets are created that have matching values with the following libraries:
   * `zowe.setup.dataset.parmlib`
   * `zowe.setup.dataset.jcllib`
   * `zowe.setup.dataset.authLoadlib`
   * `zowe.setup.dataset.authPluginLib`. 

* The member `ZWESIP00` is contained in `CUST.PARMLIB`. `JCLLIB` and `ZWESAPL` are empty.

## Initializing Zowe security configurations (`zwe init security`)

This subcommand creates the user IDs and security manager settings.

:::info Required role: security administrator
:::

If Zowe has already been launched on a z/OS system from a previous release of Zowe v2 or later, you can skip this security configuration step unless told otherwise in the release documentation.

The JCL member `.SZWESAMP(ZWESECUR)` is provided to assist with the security configuration. Before submitting the `ZWESECUR` JCL member, customize this member to match site security rules. For script driven scenarios, you can run the command `zwe init security` which uses `ZWESECUR` as a template to create a customized member in `.CUST.JCLLIB`.  This member contains the commands required to perform the security configuration. 

For more information about `zwe init security`, see:

* _Configure with `zwe init security` command_ in [Configuring security](./configuring-security.md).
* [`zwe init security`](../appendix/zwe_server_command_reference/zwe/init/zwe-init-security.md) in the Reference section.

:::tip

To avoid having to run the `init security` command, you can specify the flag `--security-dry-run`. This flag enables you to construct a JCL member containing the security commmands without running the member. This is useful for previewing commands and can also be used to copy and paste commands into a TSO command prompt for step by step manual execution. 

**Example:**

```
#>zwe init security -c ./zowe.yaml --security-dry-run
-------------------------------------------------------------------------------
>> Run Zowe security configurations

Modify ZWESECUR
- IBMUSER.ZWE.CUST.JCLLIB(ZW134428) is prepared

Dry-run mode, security setup is NOT performed on the system.
Please submit IBMUSER.ZWE.CUST.JCLLIB(ZW134428) manually.
>> Zowe security configurations are applied successfully.

#>
```
For production environments, inform your security administrator to re-submit the `init security` command with proper authorization.

:::


## Performing APF authorization of load libraries (`zwe init apfauth`)

Zowe contains load modules that require access to make privileged z/OS security manager calls. These load modules are held in two load libraries which must be APF authorized. 

:::info Required roles: security administrator
:::

The command `zwe init apfauth` reads the PDS names for the following load libraries from zowe.yaml and performs the APF authority commands.

* **zowe.setup.dataset.authLoadLib**  
Specifies the user custom load library containing the load modules.
* **zowe.setup.dataset.authPluginLib**  
References the load library for ZIS plugins.

For more information about `zwe init apfauth` see:
* [Performing APF authorization of load libraries](./apf-authorize-load-library.md).
* [`zwe init apfauth`](../appendix/zwe_server_command_reference/zwe/init/zwe-init-apfauth.md) in the Reference section.


## Configuring Zowe to use TLS certificates (`zwe init certificate`)

Zowe uses digital certificates for secure, encrypted network communication over Secure Sockets Layer/Transport Layer Security (SSL/TLS) and HTTPS protocols. 

:::info Required roles: system programmer, security administrator
:::

Zowe supports using either file-based (PKCS12) or z/OS key ring-based (when on z/OS) keystores and truststores, and can reuse compatible stores. You can use the `zwe init certificate` command to create keystores and truststores by either generating certificates or by allowing users to import their own compatible certificates.

For more information about `init certificate`, see:
* [Configuring certificates](./configure-certificates.md).
* [`zwe init certificate`](../appendix/zwe_server_command_reference/zwe/init/zwe-init-certificate.md) in the Reference section.

## Installing Zowe main started tasks (`zwe init stc`)

Execute the subcommand `zwe init stc` to install Zowe main started tasks.

Installation of Zowe main started tasks requires that JCL members for each of Zowe's started tasks be present on the JES proclib concatenation path. 

Once you have completed security configuration, you can install the Zowe main started tasks. 

:::info Required role: system programmer
:::

The JCL members for each of Zowe's started tasks need to be present on the JES proclib concatenation path. The command `zwe init stc` copies these members from the install source location `.SZWESAMP` to the targted PDS specified in the `zowe.setup.dataset.proclib` value `USER.PROCLIB`. The three proclib member names are specified in `zowe.yaml` arguments.  

```yaml
zowe:
  setup:
    dataset:
      prefix: IBMUSER.ZWE
      proclib: USER.PROCLIB
      parmlib: IBMUSER.ZWE.CUST.PARMLIB
      jcllib: IBMUSER.ZWE.CUST.JCLLIB
      authLoadlib: IBMUSER.ZWE.CUST.ZWESALL
      authPluginLib: IBMUSER.ZWE.CUST.ZWESPLUG
    security:
      stcs:
        zowe: ZWESLSTC
        zis: ZWESISTC
        aux: ZWESASTC
```

The `zwe init stc` command uses the `CUST.JCL` LIB data sets as a staging area to contain intermediatory JCL which are transformed version of the originals that are shiped in `.SZWESAMP` with paths, PDS locations, and other runtime data updated.  If you wish to just generate the `CUST.JCLLIB` members without having them copied to  `USER.PROCLIB`, specify `--security-dry-run`.  If the JCL members are already in the target PROCLIB, specify `--allow-overwritten`.   

**Example:**

```
#>zwe init stc -c ./zowe.yaml
-------------------------------------------------------------------------------
>> Install Zowe main started task

Modify ZWESLSTC and save as IBMUSER.ZWE.CUST.JCLLIB(ZWESLSTC)
CONFIG path defined in ZWESLSTC is converted into absolute path and may contain SYSNAME.
Please manually verify if this path works for your environment, especially when you are working in Sysplex environment.
Modify ZWESISTC and save as IBMUSER.ZWE.CUST.JCLLIB(ZWESISTC)
Modify ZWESASTC and save as IBMUSER.ZWE.CUST.JCLLIB(ZWESASTC)

Copy IBMUSER.ZWE.CUST.JCLLIB(ZWESLSTC) to USER.PROCLIB(ZWESLSTC)
Copy IBMUSER.ZWE.CUST.JCLLIB(ZWESISTC) to USER.PROCLIB(ZWESISTC)
Copy IBMUSER.ZWE.CUST.JCLLIB(ZWESASTC) to USER.PROCLIB(ZWESASTC)

>> Zowe main started tasks are installed successfully.
```

## (Deprecated) Creating VSAM caching service datasets (`zwe init vsam`)

This command is no longer required as the Caching service by default uses Infinispan instead. You only need to run this command if you wish the Caching service to use VSAM for its storage medium.

Zowe can work in a high availability (HA) configuration where multiple instances of the Zowe launcher are started, either on the same LPAR or different LPARs connected through sysplex distributor. If you are only running a single Zowe instance on a single LPAR you do not need to create a caching service so you may skip this step.

:::info Required roles: system programmer
:::

The command `zwe init vsam` uses the template JCL in `SZWESAMP(ZWECSVSM)` to copy the source template member from `zowe.setup.mvs.hlq.SZWESAMP(ZWECVCSM)` and creates a target JCL member in `zowe.setup.mvs.jcllib(ZWECVSCM)` with values extracted from the `zowe.yaml` file.

For more information about `zwe init vsam`, see [Creating VSAM caching service datasets](./configure-caching-service-ha.md)


## Next steps

After each of the `zwe init` subcommands run successfully, the next step is to complete [configuring security](./configuring-security.md).
