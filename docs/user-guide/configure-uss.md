# Zowe and Unix System Services (USS)

## Introduction

The Zowe z/OS component runtime has a pre-requisite on Unix System Services (USS) being configured.  For more detail on which components run under USS see [Zowe architecture](../getting-started/zowe-architecture.md).

The UNIX System Services element of z/OS® is a UNIX operating environment, implemented within the z/OS operating system. It is also known as z/OS UNIX. z/OS UNIX files are organized in a hierarchy, as in a UNIX system.  All files are members of a directory, and each directory in turn is a member of another directory at a higher level in the hierarchy. The highest level of the hierarchy is the *root* directory. The z/OS UNIX files system is also known as zFS.   

For more information on USS see Introduction to z/OS UNIX for [z/OS 2.2](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.2.0/com.ibm.zos.v2r2.bpxb200/int.htm), [z/OS 2.3](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.3.0/com.ibm.zos.v2r3.bpxb200/int.htm), or [z/OS 2.4](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.4.0/com.ibm.zos.v2r4.bpxb200/int.htm).  

### Setting up USS for the first time

If you have not enabled USS for your z/OS environment before, the Zowe SMP/E distribution of Zowe contains a number of JCL jobs that are provided to assist with this purpose.  

<<TODO - We need to doc these - help from Onno, Nayer and John>>

### Language Environment

To ensure that Zowe has enough memory the recommended HEAP64 site should be large enough.
```
HEAP64(512M,4M,KEEP,256M,4M,KEEP,OK,FREE)
```

### OMVS segment

Users installing Zowe need to have an OMVS segment.  The recommended MEMLIMIT for these should be ????

<<TODO - Input from Onno, Nayer and John here>>