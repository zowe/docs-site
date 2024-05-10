# Diagnosing Return Codes

If one of the Zowe servers ends abnormally with a return code, then this return code may be used as a clue to determine the cause of the failure. The meaning of a return code depends upon which program generated it; many return codes can originate from operating system utilities rather than from Zowe itself, but some may originate from Zowe too. Knowing which program generated the return code is important to finding the relevant documentation on the code. For example, if you tried to run the `app-server` and received a return code from a failure, it could have originated from, in order of execution, the Launcher, shell code and shell utilities such as `cat` or `mkdir`, `zwe`, and finally the app-server itself.

Return codes that can arise from any of the servers due to the chain of events that start Zowe may be found in the following documentation:

* [Zowe launcher error codes](../launcher/launcher-error-codes)
* The z/OS shell and programs called from the shell such as `cat`, `mkdir`, `node` or `java`:
    * Return codes ("errno"): https://www.ibm.com/docs/en/zos/2.5.0?topic=codes-return-errnos
    * Reason codes ("errnojr"): https://www.ibm.com/docs/en/zos/2.5.0?topic=codes-reason-errnojrs
* `zwe` error codes are documented specific to each `zwe` subcommand visible within the `--help` option of `zwe` or [on the zwe reference page](../../appendix/zwe_server_command_reference/zwe/zwe). Searching for "ZWEL" plus your error code in the search bar of the documentation website will likely bring you to the appropriate page.

Error codes for the specific Zowe servers may be found in their own troubleshooting sections.
