# Zowe and Unix System Services (USS)

## Introduction

The Zowe z/OS component runtime has a pre-requisite on Unix System Services (USS) being configured.  For more detail on which components run under USS see [Zowe architecture](../getting-started/zowe-architecture.md).

The UNIX System Services element of z/OS® is a UNIX operating environment, implemented within the z/OS operating system. It is also known as z/OS UNIX. z/OS UNIX files are organized in a hierarchy, as in a UNIX system.  All files are members of a directory, and each directory in turn is a member of another directory at a higher level in the hierarchy. The highest level of the hierarchy is the *root* directory. The z/OS UNIX files system is also known as zFS.   

For more information on USS see Introduction to z/OS UNIX for [z/OS 2.2](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.2.0/com.ibm.zos.v2r2.bpxb200/int.htm), [z/OS 2.3](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.3.0/com.ibm.zos.v2r3.bpxb200/int.htm), or [z/OS 2.4](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.4.0/com.ibm.zos.v2r4.bpxb200/int.htm).  

### Setting up USS for the first time

If you have not enabled USS for your z/OS environment before, the Zowe SMP/E distribution of Zowe contains a number of JCL jobs that are provided to assist with this purpose.  

### Language Environment

To ensure that Zowe has enough memory the recommended HEAP64 site should be large enough.
```
HEAP64(512M,4M,KEEP,256M,4M,KEEP,OK,FREE)
```

### OMVS segment

Users installing Zowe to run Zowe scripts need to have an OMVS segment. If the user profile doesn't have OMVS segment, accessing USS through:

- TSO OMVS will result in

```
FSUM2057I No session was started. This TSO/E user ID does not have access to OpenMVS.+
FSUM2058I Function = sigprocmask, return value = FFFFFFFF, return code = 0000009C, reason code = 0B0C00FB

Action: Create an OMVS segment with a UID.
```

- SSH will result in

```
Access denied with SSH
```

### Address Space Region Size

Java as a prerequisite for Zowe requires a suitable z/OS region size to operate successfully while installing/configuring Zowe. It is suggested that you do not restrict the region size, but allow Java to use what is necessary. Restricting the region size might cause failures with storage-related error messages such as
```
JVMJ9VM015W Initialization error for library j9gc29(2)
Error: Could not create the Java Virtual Machine.
Error: A fatal exception has occurred. Program will exit
```
The storage-related issue should be fixed by one of the following changes:

- *ASSIZEMAX parameter*

    **ASSIZEMAX** parameter is the maximum size of the process's virtual memory (address space) in bytes. 
    To specify the JVM maximum address space size on a per-user basis, set ASSIZEMAX configuration parameter to value 2147483647.

    **Note:** Running a shell script via TSO OMVS will run the shell in the TSO address space, unless you specify `_BPX_SHAREAS=NO` when invoking OMVS. If you are using TSO OMVS to install Zowe, you will need `export _BPX_SHAREAS=NO` to make ASSIZEMAX change effective.

- SIZE parameter of TSO segment

    Set SIZE operand of TSO segment to value 2096128.
    
    **Note:** If you have the recommended `export _BPX_SHAREAS=YES` in your shell setup, java will run in the TSO address space and the SIZE change will work.

- ulimit -A 

    The maximum address space size for the process should be at least 250M, in units of 1024 bytes. (eg. `ulimit -A 250000`)
    
    **Note:** `ulimit -a` will display the currrent process limits
