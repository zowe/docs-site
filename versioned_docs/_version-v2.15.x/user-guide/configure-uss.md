# Addressing UNIX System Services (USS) Requirements

The Zowe z/OS component runtime requires UNIX System Services (USS) to be configured. As shown in the [Zowe architecture](../getting-started/zowe-architecture.md), a number of servers run under UNIX System Services (USS) on z/OS. Review this topic for knowledge and considerations about USS when you install and configure Zowe.

:::info Required role: security administrator
:::

## What is USS?

The UNIX System Services element of z/OS® is a UNIX operating environment, which is implemented within the z/OS operating system. It is also known as z/OS UNIX. z/OS UNIX files are organized in a hierarchy, as in a UNIX system.  All files are members of a directory, and each directory in turn is a member of another directory at a higher level in the hierarchy. The highest level of the hierarchy is the *root* directory. The z/OS UNIX files system is also known as zFS. This zFS directory is the location where the Zowe runtime files and folders are installed.

For more information on USS, see the [Introduction to z/OS UNIX](https://www.ibm.com/support/knowledgecenter/SSLTBW_3.1.0/com.ibm.zos.v3r1.bpxb200/int.htm)

## Setting up USS for the first time

If you have not enabled USS for your z/OS environment before, the SMP/E distribution of Zowe provides a number of JCL jobs to assist with this purpose. You can consult with your USS administrator if you need more information such as the USS file system.

## Language environment

The following Language Environment options should be set for Zowe.

| Name | Value | Description |
|------|-------|-------------|
| HEAP64 | HEAP64(4M,4M,KEEP,1M,1M,KEEP,0K,0K,FREE) | You need to have HEAP64 large enough that Zowe has enough memory allocated to run. |
| HEAPPOOLS | HEAPPOOLS(OFF) | Some parts of Zowe cannot run when HEAPPOOLS is enabled. |
| HEAPPOOLS64 | HEAPPOOLS64(OFF) | Some parts of Zowe cannot run when HEAPPOOLS64 is enabled. |

## OMVS segment

An OMVS segment is required for users (`ZWESVUSR` or `ZWESIUSR`) who install Zowe to run Zowe scripts. 

:::tip
For information about OMVS segments, see the article _The OMVS segment in user profiles_ in the IBM documentation. 
::: 

If the user profile does not have an OMVS segment, the following messages can occur:

- When you access USS through TSO OMVS, the following message is thrown:

   ```
   FSUM2057I No session was started. This TSO/E user ID does not have access to OpenMVS.+
   FSUM2058I Function = sigprocmask, return value = FFFFFFFF, return code = 0000009C, reason code = 0B0C00FB

   Action: Create an OMVS segment with a UID.
   ```

- When you access USS through SSH, the following message is thrown:

   ```
   Access denied with SSH
   ```

## Address space region size

Java as a prerequisite for Zowe requires a suitable z/OS region size to operate successfully while you install and configure Zowe. It is suggested that you do not restrict the region size, but allow Java to use what is necessary. Restricting the region size might cause failures with storage-related error messages such as the following one:

```
JVMJ9VM015W Initialization error for library j9gc29(2)
Error: Could not create the Java Virtual Machine.
Error: A fatal exception has occurred. Program will exit
```

You can fix the storage-related issue by making one of the following changes:

-  **ASSIZEMAX** parameter  
   The ASSIZEMAX parameter is the maximum size of the process's virtual memory (address space) in bytes.

   To specify the JVM maximum address space size on a per-user basis, set the `ASSIZEMAX` configuration parameter to the value `2147483647`.

   :::note
   Running a shell script via TSO OMVS will run the shell in the TSO address space, unless you specify `_BPX_SHAREAS=NO` when invoking OMVS. If you are using TSO OMVS to install Zowe, you will need `export _BPX_SHAREAS=NO` to make the ASSIZEMAX change effective.
   :::

-  **SIZE** parameter of TSO segment  
   Set `SIZE` operand of TSO segment to the value `2096128`.

   :::note
   If you set `export _BPX_SHAREAS=YES` in your shell setup as recommended, Java will run in the TSO address space and the SIZE change will work.
   :::

- **ulimit -A**  
   The maximum address space size for the process should be at least 250 M, in units of 1024 bytes. For example, `ulimit -A 250000`.

   :::note
   Running `ulimit -a` displays the current process limits.
   :::

## Temporary files management

Zowe server components require the use of temporary files. By default, these temporary files are written to the global `/tmp` directory in the USS file system.
This section describes options to customize the destination directory for all Zowe server components.

### How to customize temporary files

Three environment variables control the directory used to place these temporary files:

- **`TMPDIR`**  
 This is the main environment variable, it controls the directory used for most USS operations.
- **`TEMP_DIR`**  
 This variable controls some installation specific files, such as the location to perform transformations on zowe.yaml.
- **`CATALINA_TMPDIR`**  
 This variable controls the destination directory of Tomcat java servers used in some core components.

#### Customizing temporary files in STC

Global environment variables can be customized directly in the Zowe STC, `zowe.setup.security.stcs.zowe` in the `zowe.yaml`. The default started task name value is `ZWESLSTC`.

To add environment variables, follow these steps:

1. Open the STC.

2. Find `STDENV DD` inline statements.

3. Add a new line for each environment variable.  
**Example:**
  
   ```text
   TMPDIR=<path to directory>
   ```

#### Customizing temporary files in zowe.yaml

Edit your installation `zowe.yaml` file and add values under property `zowe.environments`. 

**Example:**

```yaml
zowe:
 environments:
   TMPDIR: <path to directory>
   TEMP_DIR: <path to directory>
   CATALINA_TMPDIR: <path to directory>
```

:::note
If the variable is defined in both the `zowe.yaml` and the STC member, the definition from `zowe.yaml` has priority.
:::
