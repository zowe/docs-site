# UNIX System Services considerations for Zowe

The Zowe z/OS component runtime requires USS to be configured. As shown in the [Zowe architecture](../getting-started/zowe-architecture.md), a number of servers run under UNIX System Services (USS) on z/OS. Review this topic for knowledge and considerations about USS when you install and configure Zowe. 

- [Introduction](#introduction)
- [Setting up USS for the first time](#setting-up-uss-for-the-first-time)
- [Language environment](#language-environment)
- [OMVS segment](#omvs-segment)
- [Address space region size](#address-space-region-size)

## What is USS?

The UNIX System Services element of z/OS® is a UNIX operating environment, which is implemented within the z/OS operating system. It is also known as z/OS UNIX. z/OS UNIX files are organized in a hierarchy, as in a UNIX system.  All files are members of a directory, and each directory in turn is a member of another directory at a higher level in the hierarchy. The highest level of the hierarchy is the *root* directory. The z/OS UNIX files system is also known as zFS.   

For more information on USS, see the following resources: 
- [Introduction to z/OS UNIX for z/OS 2.2](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.2.0/com.ibm.zos.v2r2.bpxb200/int.htm)
- [Introduction to z/OS UNIX for z/OS 2.3](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.3.0/com.ibm.zos.v2r3.bpxb200/int.htm)
- [Introduction to z/OS UNIX for z/OS 2.4](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.4.0/com.ibm.zos.v2r4.bpxb200/int.htm)

## Setting up USS for the first time

If you have not enabled USS for your z/OS environment before, the SMP/E distribution of Zowe provides a number of JCL jobs to assist with this purpose. You can consult with your USS administrator if you need more information such as the USS file system. 

## Language environment

To ensure that Zowe has enough memory, the recommended HEAP64 site should be large enough.
```
HEAP64(512M,4M,KEEP,256M,4M,KEEP,OK,FREE)
```

## OMVS segment

Users who install Zowe to run Zowe scripts need to have an OMVS segment. If the user profile doesn't have OMVS segment, the following situations might occur:

- When you access USS through TSO OMVS, you will see the following message: 

   ```
   FSUM2057I No session was started. This TSO/E user ID does not have access to OpenMVS.+
   FSUM2058I Function = sigprocmask, return value = FFFFFFFF, return code = 0000009C, reason code = 0B0C00FB

   Action: Create an OMVS segment with a UID.
   ```

- When you access USS through SSH, you will see the following message: 

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

- ASSIZEMAX parameter

   The ASSIZEMAX parameter is the maximum size of the process's virtual memory (address space) in bytes. 
   
   To specify the JVM maximum address space size on a per-user basis, set the ASSIZEMAX configuration parameter to the value of `2147483647`.

   **Note:** Running a shell script via TSO OMVS will run the shell in the TSO address space, unless you specify `_BPX_SHAREAS=NO` when invoking OMVS. If you are using TSO OMVS to install Zowe, you will need `export _BPX_SHAREAS=NO` to make the ASSIZEMAX change effective.

- SIZE parameter of TSO segment

   Set SIZE operand of TSO segment to the value of `2096128`.
    
   **Note:** If you set `export _BPX_SHAREAS=YES` in your shell setup as recommended, Java will run in the TSO address space and the SIZE change will work.

- `ulimit -A` 

   The maximum address space size for the process should be at least 250 M, in units of 1024 bytes. For example, `ulimit -A 250000`.
    
   **Note:** Running `ulimit -a` displays the current process limits.
