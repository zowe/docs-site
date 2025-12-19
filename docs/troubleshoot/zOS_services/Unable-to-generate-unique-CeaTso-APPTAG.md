# Troubleshooting z/OS Services

The following topics contain information that can help you troubleshoot problems when you encounter unexpected behavior with z/OS services while installing and using Zowe™.

### ISSUE: Unable to generate unique CeaTso APPTAG

**Symptom:**
When you request a Zowe data set or z/OS Files API, you receive a response code 500 - 'Internal Server Error', with a message "Unable to generate unique CeaTso APPTAG".

**Solution:**
Check the z/OSMF settings of REST API of file. You must define `RESTAPI_FILE` in `IZUPRMxx` by the following statement:
`RESTAPI_FILE ACCT(IZUACCT) REGION(32768) PROC(IZUFPROC)`
The default `IZUFPROC` can be found in `SYS1.PPROCLIB`. And the proper authorization is needed to get `IZUFPROC` to work successfully.


### ISSUE: z/OSMF JVM cache corruption

**Symptom:**

When you work with Zowe, there are situations when z/OSMF abends.
The following is a snippet from the Java core dump.

```
CEE3DMP V2 R4.0: Condition processing resulted in the unhandled condition.
...
Condition Information for Active Routines
Condition Information for (DSA address 0000005F026FDE40)
CIB Address: 0000005F026FA1E8
Current Condition:
CEE0198S The termination of a thread was signaled due to an
unhandled condition.
Original Condition:
CEE3250C The system or user abend SDC2 R=4A001620 was issued.
Location:
Program Unit: Entry: ntv_createJoinWorkUnit
Statement: Offset: +000ABD14
Machine State:
ILC..... 0002 Interruption Code..... 000D
PSW..... 0785240180000000 000000003825D954

```

**Solution:**
The error occurs when the Java runtime being used by the z/OSMF Liberty server and the Java runtimes being used
by Zowe share a user ID of IZUSVR1, which results in a collision. To resolve this issue, review the following steps:
1. Isolate the started task user IDs
2. Update z/OSMF to not use JVM class caching

#### Isolate the started task user IDs
The z/OSMF started task `IZUSVR1` runs under the user ID of `IZUUSER`. Before version 1.9 of Zowe, its started task `ZWESVSTC` also ran under the same user ID. With Zowe 1.9, the default configuration changed to use a new user ID of `ZWESVUSR` and group of `ZWEADMIN`. If your started task `ZWESVSTC` is configured to run under the user ID `IZUUSER`, change it to run under user ID `ZWESVUSR`.

#### Update z/OSMF to not use JVM class caching
If you need to run `ZWESVSTC` under the same user ID as z/OSMF for your environment, you can update the z/OSMF configuration to switch off shared class caching which stops the crash from occurring. Disabling shared class caching reduces the performance of z/OSMF so the preferred fix is to change the user ID of `ZWESVSTC` away from `IZUUSER` to `ZWESVUSR` as described above.
Navigate to the file `/var/zosmf/configuration/local_override.cfg`. This contains the startup
arguments for the Java runtime used by z/OSMF. Add the following line:

```
JVM_OPTIONS=-Xshareclasses:none
```
You will need to recycle the z/OSMF server running, which by default will be running under the started task `IZUSVR1`.
