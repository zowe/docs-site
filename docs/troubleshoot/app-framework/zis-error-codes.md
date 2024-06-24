# ZIS Error Message Codes

The following codes can appear in either the ZIS SYSPRINT or JESMSGLG log, or
both. Use the following message code references and the corresponding reasons
and actions to help troubleshoot issues.

## ZIS cross-memory server messages

### ZWES0001I

ZSS Cross-Memory Server starting, version is _major_._minor_._patch_+_datestamp_

**Reason:**

The cross-memory server with the specified version is starting.

**Action:**

No action required.

### ZWES0002I

Input parameters at _address_:

_hex_dump_

**Reason:**

The message shows a hex dump of the parameters passed in the started task JCL.

**Action:**

No action required.

### ZWES0003I

Server name not provided, default value '_name_' will be used

**Reason:**

The user did not provide a server name.

**Action:**

The cross-memory server uses the indicated default value _name_. If needed,
specify a server name either via the `NAME` parameter in the JCL or via
the `ZWES.NAME` parameter in the PARMLIB member; the JCL parameter takes
precedence.

### ZWES0004I

Server name is '_name_'

**Reason:**

The message indicates this server's name.

**Action:**

No action required.

### ZWES0005E

ZSS Cross-Memory server not created, RSN = _reason_code_

**Reason:**

The cross-memory server failed to create the cross-memory server's data
structure.

**Action:**

The cross-memory server terminates. Contact support.

### ZWES0006E

ZSS Cross-Memory server resource not allocated (_resource_name_)

**Reason:**

The cross-memory server failed to allocate storage for a resource.

**Action:**

The cross-memory server terminates. Contact support.

### ZWES0007E

ZSS Cross-Memory server PARMLIB member suffix is incorrect - '_suffix_'

**Reason:**

The cross-memory's PARMLIB member suffix is invalid.

**Action:**

The cross-memory server terminates. Ensure that the suffix consists
of two characters that are allowed in a member name.

### ZWES0008E

ZSS Cross-Memory server configuration not read, member = '_member_name_', RC =
_return_code_1_ (_return_code_2_, _reason_code_2_)

**Reason:**

The cross-memory server failed to read the specified PARMLIB member.

**Action:**

The cross-memory server terminates. Review the error codes and contact support
if you cannot resolve the issue.

Possible return codes and the corresponding actions:

| _return_code_1_                         | _return_code_2_                                | _reason_code_2_                                | Action                                     |
|-----------------------------------------|------------------------------------------------|------------------------------------------------|--------------------------------------------|
| RC_ZISPARM_MEMBER_NOT_FOUND(2)          | N/A                                            | N/A                                            | Ensure the member exists                   |
| RC_ZISPARM_DDNAME_TOO_LONG(8)           | N/A                                            | N/A                                            | Contact support                            |
| RC_ZISPARM_MEMBER_NAME_TOO_LONG(9)      | N/A                                            | N/A                                            | Contact support                            |
| RC_ZISPARM_PARMLIB_ALLOC_FAILED(10)     | Return code from `IEFPRMLB REQUEST=ALLOCATE`   | Reason code from `IEFPRMLB REQUEST=ALLOCATE`   | Review the IEFPMLB return and reason codes |
| RC_ZISPARM_READ_BUFFER_ALLOC_FAILED(11) | N/A                                            | N/A                                            | Contact support                            |
| RC_ZISPARM_PARMLIB_READ_FAILED(12)      | Return code from `IEFPRMLB REQUEST=READMEMBER` | Reason code from `IEFPRMLB REQUEST=READMEMBER` | Review the IEFPMLB return and reason codes |
| RC_ZISPARM_PARMLIB_FREE_FAILED(13)      | Return code from `IEFPRMLB REQUEST=FREE`       | Reason code from `IEFPRMLB REQUEST=FREE`       | Review the IEFPMLB return and reason codes |
| RC_ZISPARM_SLH_ALLOC_FAILED(16)         | Start line number                              | End line number                                | Contact support                            |
| RC_ZISPARM_CONTINUATION_TOO_LONG(19)    | Start line number                              | End line number                                | Review the lines and fix continuation      |

### ZWES0009E

ZSS Cross-Memory server configuration not found, member = '_member_name_', RC =
_return_code_

**Reason:**

The cross-memory server could not find the specified PARMLIB member.

**Action:**

The cross-memory server terminates. Ensure that the name is correct and the
member is available.

### ZWES0010E

ZSS Cross-Memory server configuration not loaded, RC = _return_code_, RSN =
_reason_code_

**Reason:**

The cross-memory server failed to load the configuration.

**Action:**

The cross-memory server terminates. Contact support.

### ZWES0011E

ZSS Cross-Memory server not started, RC = _return_code_

**Reason:**

The cross-memory server could not start.

**Action:**

The cross-memory server terminates. Review the messages preceding this message.
If you cannot resolve the issue, contact support.

### ZWES0012I

ZSS Cross-Memory Server terminated

**Reason:**

The cross-memory server fully terminated.

**Action:**

No action required.

### ZWES0013E

ZSS Cross-Memory Server terminated due to an error, status = _status_code_

**Reason:**

The cross-memory server terminated due to an error.

**Action:**

The cross-memory server terminates. Review the messages preceding this message.
If you cannot resolve the issue, contact support.

### ZWES0014E

Fatal config error - _details_, RC = _return_code_

**Reason:**

A fatal error occurred during processing of the configuration.

**Action:**

The cross-memory server terminates. Review the messages preceding this message.
If you cannot resolve the issue, contact support.

### ZWES0015E

LPA _lpa_action_ failed for module _module_name_, RC = _csvdylpa_return_code_,
RSN = _csvdylpa_reason_code_

**Reason:**

The cross-memory server failed to perform the specified link pack area (LPA)
action for a plug-in module.

**Action:**

The cross-memory server terminates. Review the provided CSVDYLPA return and
reason codes (see "z/OS MVS Programming: Authorized Assembler Services Reference
ALE-DYN") and contact support if you cannot resolve the issue.

### ZWES0016I

Service '_plug-in_name_':'_service_name_' _version_ has been added

**Reason:**

The cross-memory server successfully added the specified service.

**Action:**

No action required.

### ZWES0017W

Plug-in '_plug-in_name_' failure - _details_

**Reason:**

One of the callbacks of a plug-in failed.

**Action:**

Depending on the stage, some of the plug-in functionality might be impacted.
Contact support if you cannot resolve the issue.

### ZWES0018W

Plug-in '_plug-in_name_' version _plug-in_version_ doesn't match anchor version
_anchor_version_, LPA module discarded

**Reason:**

The cross-memory server detected that a plug-in module was outdated; this
usually happens when a plug-in gets updated.

**Action:**

The cross-memory server discards the old module and loads the latest version to
the link pack area (LPA).

### ZWES0019W

Parameter '_parameter_name_' has an invalid value

**Reason:**

The cross-memory server detected an invalid parameter.

**Action:**

The cross-memory server uses the default parameter. Fix the reported parameter
and restart the cross-memory server.

### ZWES0020E

ZSS Cross-Memory server PARMLIB member name not determined, RC = _return_code_

**Reason:**

The cross-memory server could not determine which PARMLIB member to use.

**Action:**

The cross-memory server terminates. Contact support.

### ZWES0021E

ZSS Cross-Memory server module member name not determined, RC =
_csvquery_return_code_

**Reason:**

The cross-memory server could not determine its module name.

**Action:**

The cross-memory server terminates. Review the provided CSVQUERY return code
(see "z/OS MVS Programming: Assembler Services Reference ABE-HSP") and
contact support if you cannot resolve the issue.

### ZWES0098I

_debug_message_

**Reason:**

This is a debug message.

**Action:**

No action required.

### ZWES0099I

_hex_dump_

**Reason:**

This is a debug hex dump.

**Action:**

No action required.

## ZIS Auxiliary Server messages

### ZWES0050I

ZIS AUX Server starting, version is _major_._minor_._patch_+_datestamp_

**Reason:**

The cross-memory auxiliary server with the specified version is starting.

**Action:**

No action required.

### ZWES0051I

ZIS AUX Server terminated

**Reason:**

The cross-memory auxiliary server fully terminated.

**Action:**

No action required.

### ZWES0052I

Input parameters at _address_:

**Reason:**

The message shows a dump of the parameters passed to this address space.

**Action:**

No action required.

### ZWES0053E

Not APF-authorized (_testauth_status_)

**Reason:**

One or more data sets in the STEPLIB concatenation is not APF-authorized.

**Action:**

The cross-memory auxiliary server terminates. Ensure that all the STEPLIB data
sets are APF-authorized.

### ZWES0054E

ZIS AUX Server started in wrong key _key_

**Reason:**

The cross-memory auxiliary server detected that it was running in the wrong key.

**Action:**

The cross-memory auxiliary server terminates. Ensure that you have added the
correct PPT-entry
(see [the documentation](../../user-guide/configure-xmem-server.md))
for the ZIS AUX module.

### ZWES0055E

ZIS AUX Server resource not allocated (_resource_name_)

**Reason:**

The cross-memory auxiliary server failed to allocate storage for a resource.

**Action:**

Depending on the location of the failure some functionality might be affected.
Contact support.

### ZWES0056E

RESMGR failed, RC = _return_code_, service RC = _resmgr_return_code_

**Reason:**

The cross-memory auxiliary server failed to install the task resource manager.

**Action:**

The cross-memory auxiliary server terminates. Review the RESMGR ADD service
return code value in _resmgr_return_code_ (see "z/OS MVS Programming: Authorized
Assembler Services Reference LLA-SDU"). If you cannot resolve the issue, contact
support.

### ZWES0057E

PC not established, RC = _return_code_, RSN = _reason_code_

**Reason:**

The cross-memory auxiliary server failed to set up the communication Program
Call (PC) routine.

**Action:**

The cross-memory auxiliary server terminates. Contact support.

### ZWES0058E

Communication area failure - _details_

**Reason:**

The cross-memory auxiliary server could not establish the communication area.

**Action:**

The cross-memory auxiliary server terminates. Review the details. If you cannot
resolve the issue, contact support.

### ZWES0059E

Address space extract RC = _return_code_, RSN = _reason_code_

**Reason:**

The cross-memory auxiliary server could not extract its address space
parameters.

**Action:**

Contact support.

### ZWES0060E

Fatal config error - _details_, RC = _return_code_

**Reason:**

A fatal error occurred when processing the configuration.

**Action:**

The cross-memory auxiliary server terminates. Review the details. If you cannot
resolve the issue, contact support.

### ZWES0061E

ZIS AUX Server configuration not read, member = '_member_name_', RC =
_return_code_1_ (_return_code_2_, _reason_code_2_)

**Reason:**

The cross-memory auxiliary server failed to read the specified PARMLIB member.

**Action:**

The cross-memory auxiliary server terminates. Review the error codes and contact
support if you cannot resolve the issue.

Possible return codes and the corresponding actions:

| _return_code_1_                         | _return_code_2_                                | _reason_code_2_                                | Action                                     |
|-----------------------------------------|------------------------------------------------|------------------------------------------------|--------------------------------------------|
| RC_ZISPARM_MEMBER_NOT_FOUND(2)          | N/A                                            | N/A                                            | Ensure the member exists                   |
| RC_ZISPARM_DDNAME_TOO_LONG(8)           | N/A                                            | N/A                                            | Contact support                            |
| RC_ZISPARM_MEMBER_NAME_TOO_LONG(9)      | N/A                                            | N/A                                            | Contact support                            |
| RC_ZISPARM_PARMLIB_ALLOC_FAILED(10)     | Return code from `IEFPRMLB REQUEST=ALLOCATE`   | Reason code from `IEFPRMLB REQUEST=ALLOCATE`   | Review the IEFPMLB return and reason codes |
| RC_ZISPARM_READ_BUFFER_ALLOC_FAILED(11) | N/A                                            | N/A                                            | Contact support                            |
| RC_ZISPARM_PARMLIB_READ_FAILED(12)      | Return code from `IEFPRMLB REQUEST=READMEMBER` | Reason code from `IEFPRMLB REQUEST=READMEMBER` | Review the IEFPMLB return and reason codes |
| RC_ZISPARM_PARMLIB_FREE_FAILED(13)      | Return code from `IEFPRMLB REQUEST=FREE`       | Reason code from `IEFPRMLB REQUEST=FREE`       | Review the IEFPMLB return and reason codes |
| RC_ZISPARM_SLH_ALLOC_FAILED(16)         | Start line number                              | End line number                                | Contact support                            |
| RC_ZISPARM_CONTINUATION_TOO_LONG(19)    | Start line number                              | End line number                                | Review the lines and fix continuation      |

### ZWES0062E

ZIS AUX Server configuration not found, member = '_member_name_', RC =
_return_code_

**Reason:**

The cross-memory auxiliary server could not find the specified PARMLIB member.

**Action:**

The cross-memory auxiliary server terminates. Ensure that the name is correct
and the member is available.

### ZWES0063E

User module failure - _details_

**Reason:**

One of the callbacks of the user module failed.

**Action:**

Depending on the stage, some of the user module functionality might be impacted.
Contact support if you cannot resolve the issue.

### ZWES0064W

Unsafe function _function_name_ failed, ABEND _abend_code_-_reason_code_
(recovery RC = _recovery_return_code_)

**Reason:**

An abend occurred in one of the callbacks of the user module.

**Action:**

Depending on the stage, some of the user module functionality might be impacted.
Contact support if you cannot resolve the issue.

### ZWES0065W

Caller not released, RC = _return_code_

**Reason:**

A synchronization error occurred when communicating with the parent address
space of this auxiliary address space.

**Action:**

Communication between the parent and auxiliary address spaces might be impacted.
Contact support.

### ZWES0066E

AUX host server ABEND _abend_code_-_reason_code_ (recovery RC =
_recovery_return_code_)

**Reason:**

An abend occurred in one of the components of the cross-memory auxiliary server.

**Action:**

The cross-memory auxiliary server terminates. Contact support.

### ZWES0067E

Main loop unexpectedly terminated

**Reason:**

The cross-memory auxiliary server detected an incorrect state in the main loop.

**Action:**

The cross-memory auxiliary server terminates. Contact support.

### ZWES0068W

Command too long (_length_)

**Reason:**

The provided modify command is too long.

**Action:**

The cross-memory auxiliary server ignores the command.

### ZWES0069W

Command not tokenized

**Reason:**

The cross-memory auxiliary server failed to tokenize the provided modify
command.

**Action:**

The cross-memory auxiliary server ignores the command. Review the messages
preceding this message and contact support if you cannot resolve the issue.

### ZWES0070I

Modify command '_command_' received

**Reason:**

The cross-memory auxiliary server received a modify command.

**Action:**

The cross-memory auxiliary server proceeds to handle the command.

### ZWES0071I

Termination command received

**Reason:**

An operator issued the termination command and the cross-memory auxiliary server
successfully received it.

**Action:**

The cross-memory auxiliary server starts the termination sequence.

### ZWES0072I

Modify command '_command_' accepted

**Reason:**

The cross-memory auxiliary server accepted a modify command.

**Action:**

No action required.

### ZWES0073I

Modify command '_command_' not recognized

**Reason:**

The cross-memory sever did not recognize a modify command.

**Action:**

The cross-memory auxiliary server ignores the command.

### ZWES0074W

Modify command '_command_' rejected

**Reason:**

The cross-memory auxiliary server rejected the provided modify command because
it was either incorrect or the server was not ready to process it.

**Action:**

The cross-memory auxiliary server ignores the command.

### ZWES0075W

'_command_' expects _expected_arg_number_ args, _provided_arg_number_ provided,
command ignored

**Reason:**

The modify command _command_ was used with an incorrect number of arguments.

**Action:**

The cross-memory auxiliary server ignores the command.

### ZWES0076W

Log component '_component_' not recognized, command ignored

**Reason:**

An operator passed an invalid log component in the LOG modify command.

**Action:**

The cross-memory auxiliary server ignores the command.

### ZWES0077W

Log level '_level_' not recognized, command ignored

**Reason:**

An operator passed an invalid log level in the LOG modify command.

**Action:**

The cross-memory auxiliary server ignores the command.

### ZWES0078I

_response_text_

**Reason:**

This message contains the response of a DISPLAY modify command.

**Action:**

No action required.

### ZWES0079I

Response message - '_response_text_'

**Reason:**

This message contains the response of a modify command.

**Action:**

No action required.

### ZWES0080I

Termination signal received (_signal_)

**Reason:**

The parent address space issued a termination signal and the cross-memory
auxiliary server successfully received it.

**Action:**

The cross-memory auxiliary server starts the termination sequence.

### ZWES0081E

Bad dub status _bpx4qdb_status_ (_bpx4qdb_return_code_,_bpx4qdb_reason_code_),
verify that the started task user has an OMVS segment

**Reason:**

The cross-memory auxiliary server detected an invalid dub status.

**Action:**

The cross-memory auxiliary server terminates. Ensure that the user under which
the cross-memory auxiliary server's started task runs has an OMVS segment.

### ZWES0082W

Legacy API has been detected, some functionality may be limited

**Reason:**

The cross-memory auxiliary server detected a legacy communication area.

**Action:**

Some functionality might not be available. Update the parent address space to
use a more modern AUX API version.

## Core cross-memory server messages

### ZWES0100I

_debug_message_

**Reason:**

This is a debug message.

**Action:**

No action required.

### ZWES0101I

_hex_dump_

**Reason:**

This is a debug hex dump.

**Action:**

No action required.

### ZWES0102E

Initialization step '_step_name_' failed, RC = _return_code_

**Reason:**

A cross-memory server's initialization step failed. The initialization process
stops.

**Action:**

The cross-memory server terminates. Review the messages preceding this message.
If you cannot resolve the issue, contact support.

### ZWES0103I

Initialization step '_step_name_' successfully completed

**Reason:**

A cross-memory server's initialization step completed successfully.

**Action:**

No action required.

### ZWES0104I

About to start console task

**Reason:**

The cross-memory server is starting the console listener task which handles
operator commands.

**Action:**

No action required.

### ZWES0105I

Core server initialization started

**Reason:**

The cross-memory server is starting initialization.

**Action:**

No action required.

### ZWES0106E

Core server initialization failed, RC = _return_code_

**Reason:**

The initialization process failed.

**Action:**

The cross-memory server terminates. Review the messages preceding this message.
If you cannot resolve the issue, contact support.

### ZWES0107I

Cold start initiated

**Reason:**

An operator started the server with the cold start option.

**Action:**

The cross-memory server discards its global resources and performs a clean
start.

### ZWES0108W

Global resources clean up RC = _return_code_

**Reason:**

The global resource clean-up process failed.

**Action:**

The cross-memory server continues running. Review _return_code_ and contact
support if needed.

Possible return codes:

| _return_code_                      | Action                                        |
|------------------------------------|-----------------------------------------------|
| RC_CMS_GLOBAL_AREA_NULL(12)        | Ignore if you have not run this ZIS after IPL |
| RC_CMS_ZVT_NULL(47)                | Ignore if you have not run any ZIS after IPL  |
| RC_CMS_ZVTE_CHAIN_LOOP(66)         | Contact support                               |
| RC_CMS_ZVTE_CHAIN_NOT_LOCKED(67)   | Contact support                               |
| RC_CMS_ZVTE_CHAIN_NOT_RELEASED(68) | Contact support                               |

### ZWES0109I

Core server ready

**Reason:**

The cross-memory server initialized and it is ready to accept program calls.

**Action:**

No action required.

### ZWES0110E

Main loop unexpectedly terminated

**Reason:**

The cross-memory server detected an incorrect state in the main loop.

**Action:**

The cross-memory server terminates. Contact support.

### ZWES0111I

Main loop terminated

**Reason:**

The main loop of this cross-memory server successfully terminated upon shutdown.

**Action:**

No action required.

### ZWES0112E

Termination step '_step_name_' failed, RC = _return_code_

**Reason:**

A cross-memory server's termination step failed.

**Action:**

The termination process continues. Review the messages preceding this message.
If you cannot resolve the issue, contact support.

### ZWES0113I

Termination step '_step_name_' successfully completed

**Reason:**

A cross-memory server's termination step completed successfully.

**Action:**

No action required.

### ZWES0114I

Core server stopped

**Reason:**

The cross-memory server successfully stopped.

**Action:**

No action required.

### ZWES0115E

Core server stopped with an error, status = _status_code_

**Reason:**

The cross-memory server stopped with a non-zero status.

**Action:**

Review the messages preceding this message. Contact support if you cannot
resolve the issue.

### ZWES0116E

Core server is abnormally terminating

**Reason:**

An abend occurred in this cross-memory server.

**Action:**

Review any messages and errors preceding this message and contact support if you
cannot resolve the issue.

### ZWES0117E

Not APF-authorized (_testauth_status_)

**Reason:**

One or more data sets in the STEPLIB concatenation is not APF-authorized.

**Action:**

The cross-memory server terminates. Ensure that all the STEPLIB data sets are
APF-authorized.

### ZWES0118E

Core server started in wrong key _key_

**Reason:**

The cross-memory server detected that it was running in the wrong key.

**Action:**

The cross-memory server terminates. Ensure that you have added the correct
PPT-entry
(see [the documentation](../../user-guide/configure-xmem-server.md))
for the main ZIS module.

### ZWES0200I

_modify_commands_

**Reason:**

This message lists the modify commands supported by this cross-memory server
(not including the plug-ins).

**Action:**

No action required.

### ZWES0201E

Service ID _service_id_ is out of range

**Reason:**

The cross-memory server detected an invalid service ID.

**Action:**

The cross-memory server terminates. Contact support.

### ZWES0202E

A duplicate server is running

**Reason:**

A cross-memory server with the same server name is already running.

**Action:**

The cross-memory server terminates. Specify a different server name in the
cross-memory server's JCL or the PARMLIB member.

### ZWES0203E

Server not locked, ISGENQ RC = _return_code_, RSN = _reason_code_

**Reason:**

An internal synchronization error occurred.

**Action:**

The cross-memory server terminates. Contact support.

### ZWES0204E

Global area address in NULL

**Reason:**

The global anchor of this cross-memory server is zero.

**Action:**

The cross-memory server terminates. Contact support.

### ZWES0205E

Relocation failed for _service_id_ (_function_address_ not in
[_module_start_address_, _module_end_address_])

**Reason:**

An error occurred during the relocation of one of the services in the server
module.

**Action:**

The cross-memory server terminates. Contact support.

### ZWES0206E

_parameter_name_ (_parameter_address_) has invalid eyecatcher

**Reason:**

The print or dump service received a request with an invalid eyecatcher.

**Action:**

The service ignores the request. Correct the parameter list if your application
initiated the request, otherwise contact support.

### ZWES0207E

_resource_name_ (_resource_size_) not allocated

**Reason:**

The cross-memory server failed to allocate storage for a resource.

**Action:**

Depending on the location of the failure some functionality might be affected.
Contact support.

### ZWES0208E

Module not loaded into LPA, RC = _csvdylpa_return_code_, RSN =
_csvdylpa_reason_code_

**Reason:**

The cross-memory server failed to add its main module to the link pack area
(LPA).

**Action:**

The cross-memory server terminates. Review the provided CSVDYLPA return and
reason codes (see "z/OS MVS Programming: Authorized Assembler Services Reference
ALE-DYN") and contact support if you cannot resolve the issue.

### ZWES0209E

Module not deleted from LPA, RC = _csvdylpa_return_code_, RSN =
_csvdylpa_reason_code_

**Reason:**

The cross-memory server failed to delete its main module from the link pack
area (LPA).

**Action:**

The cross-memory server terminates with a non-zero status. Review the provided
CSVDYLPA return and reason codes (see "z/OS MVS Programming: Authorized
Assembler Services Reference ALE-DYN") and contact support if you cannot resolve
the issue.

### ZWES0210W

No valid LPMEA in global area

**Reason:**

The cross-memory server detected an invalid LPMEA area for its main module.

**Action:**

The cross-memory server continues running. If the error occurred in the
development mode ignore it, otherwise contact support.

### ZWES0211E

Name/Token delete failed, RC = _ieantdl_return_code_

**Reason:**

The cross-memory server failed to delete the cross-memory server's global area's
name/token.

**Action:**

The cross-memory server terminates with a non-zero status. Review the provided
IEANTDL return code (see "z/OS MVS Programming: Assembler Services Reference
IAR-XCT") and contact support if you cannot resolve the issue.

### ZWES0212E

RACROUTE LIST failed (_saf_return_code_, _racf_return_code_, _racf_reason_code_)

**Reason:**

The cross-memory server failed to perform RACROUTE LIST on the FACILITY class.

**Action:**

The cross-memory server terminates. The message contains the SAF return code,
RACF return and reason codes (see "z/OS Security Server RACROUTE Macro
Reference"); review the codes. If you cannot resolve the issue, contact support.

### ZWES0213E

ZVT not populated, RC = _return_code_

**Reason:**

The cross-memory server failed to populate the Zowe vector table.

**Action:**

The cross-memory server terminates. Contact support.

### ZWES0214E

Global area not set, RC = _return_code_

**Reason:**

The cross-memory server could not set the cross-memory server's global area.

**Action:**

The cross-memory server terminates. Contact support.

### ZWES0215E

Global area not retrieved, RC = _return_code_

**Reason:**

The cross-memory server could not retrieve the cross-memory server's global
area.

**Action:**

The cross-memory server terminates. Contact support.

### ZWES0216E

PC-_type_ not set, step = _step_name_ (_return_code_ _reason_code_)

**Reason:**

The cross-memory server failed to set up a Program Call (PC) routine.

**Action:**

Contact support.

### ZWES0217E

Too many tokens in command

**Reason:**

The provided modify command has too many tokens.

**Action:**

The cross-memory server ignores the command.

### ZWES0218E

Command too long (_command_length_)

**Reason:**

The provided modify command is too long.

**Action:**

The cross-memory server ignores the command.

### ZWES0219E

Command not tokenized

**Reason:**

The cross-memory server failed to tokenize the provided modify command.

**Action:**

The cross-memory server ignores the command. Review the messages preceding this
message and contact support if you cannot resolve the issue.

### ZWES0220I

Modify _command_verb_ command received

**Reason:**

The cross-memory server received a modify command with verb _command_verb_.

**Action:**

The cross-memory server proceeds to handle the command.

### ZWES0221I

Modify _command_verb_ command accepted

**Reason:**

The cross-memory server accepted a modify command with verb _command_verb_.

**Action:**

No action required.

### ZWES0222I

_response_text_

**Reason:**

This message contains the response of a successful modify command.

**Action:**

No action required.

### ZWES0223I

Termination command received

**Reason:**

An operator issued the termination command and the cross-memory server
successfully received it.

**Action:**

The cross-memory server starts the termination sequence.

### ZWES0224W

_command_verb_ expects _expected_arg_number_ args, _provided_arg_number_
provided, command ignored

**Reason:**

A modify command with verb _command_verb_ was used with an incorrect number of
arguments.

**Action:**

The cross-memory server ignores the command.

### ZWES0225W

Log component '_component_name_' not recognized, command ignored

**Reason:**

An operator passed an invalid log component in the LOG modify command.

**Action:**

The cross-memory server ignores the command.

### ZWES0226W

Log level '_level_'  not recognized, command ignored

**Reason:**

An operator passed an invalid log level in the LOG modify command.

**Action:**

The cross-memory server ignores the command.

### ZWES0227W

Modify _command_verb_ command not recognized

**Reason:**

The cross-memory server did not recognize a modify command with verb
_command_verb_.

**Action:**

The cross-memory server ignores the command.

### ZWES0228W

Empty modify command received, command ignored

**Reason:**

The cross-memory server received an empty modify command.

**Action:**

The cross-memory server ignores the command.

### ZWES0229W

Server not ready for command _command_verb_

**Reason:**

The cross-memory server is being either initialized or terminated and isn't
ready to accept the provided modify command.

**Action:**

The cross-memory server ignores the command. Re-issue the command later.

### ZWES0230W

Display option '_option_name_' not recognized, command ignored

**Reason:**

The cross-memory server did not recognize a DISPLAY modify command.

**Action:**

The cross-memory server ignores the command.

### ZWES0231E

RESMGR version _resource_manager_version_ not locked, ISGENQ RC = _return_code_,
RSN = _reason_code_

**Reason:**

The cross-memory's address space resource manager serialization failed (lock not
acquired)

**Action:**

The cross-memory server terminates. Contact support.

### ZWES0232E

RESMGR version _resource_manager_version_ not released, ISGENQ RC =
_return_code_, RSN = _reason_code_

**Reason:**

The cross-memory's address space resource manager serialization failed (lock not
released).

**Action:**

The cross-memory server continues running. Contact support.

### ZWES0233E

RESMGR ECSA storage not allocated, size = _requested_size_

**Reason:**

The cross-memory server could not obtain common storage for the cross-memory
server's address space resource manager.

**Action:**

The cross-memory server terminates. Ensure that there is no shortage of the
extended common service area (ECSA) storage on your system. If you cannot
resolve the issue, contact support.

### ZWES0234E

RESMGR NAME/TOKEN not created, RC = _ieantcr_return_code_

**Reason:**

The cross-memory server failed to create the resource manager name/token pair.

**Action:**

The cross-memory server terminates. Review the provided IEANTCR return code
(see "z/OS MVS Programming: Assembler Services Reference IAR-XCT") and
contact support if you cannot resolve the issue.

### ZWES0235E

RESMGR NAME/TOKEN not retrieved, RC = _ieantrt_return_code_

**Reason:**

The cross-memory server failed to retrieve the resource manager name/token pair.

**Action:**

The cross-memory server terminates. Review the provided IEANTRT return and
reason (see "z/OS MVS Programming: Assembler Services Reference IAR-XCT") codes
and contact support if you cannot resolve the issue.

### ZWES0236E

RESMGR not added for ASID = _hex_asid_number_, RC = _return_code_, manager RC =
_resmgr_return_code_

**Reason:**

The cross-memory server could not add the resource manager.

**Action:**

The cross-memory server terminates. Review the RESMGR ADD service return code
value in _resmgr_return_code_ (see "z/OS MVS Programming: Authorized Assembler
Services Reference LLA-SDU"). If you cannot resolve the issue, contact support.

### ZWES0237E

RESMGR not removed for ASID = _hex_asid_number_, RC = _return_code_, manager
RC = _resmgr_return_code_

**Reason:**

The cross-memory server could not delete the resource manager.

**Action:**

The cross-memory server terminates with a non-zero status. Review the RESMGR
DELETE service return code in _resmgr_return_code_ (see "z/OS MVS Programming:
Authorized Assembler Services Reference LLA-SDU"). If you cannot resolve the
issue, contact support.

### ZWES0238E

_rname_value_ RNAME not created, _failure_reason_

**Reason:**

The cross-memory server failed to create an RNAME.

**Action:**

The cross-memory server terminates. Contact support.

### ZWES0239E

_nametoken_name_ NAME (NT) not created, _failure_reason_

**Reason:**

The cross-memory server failed to create a name-token name.

**Action:**

The cross-memory server terminates. Contact support.

### ZWES0240W

Discarding outdated LPA module at _module_address_ (_current_module_timestamp_ -
_new_module_timestamp_)

**Reason:**

The cross-memory server detected that the current link pack area (LPA) module
was outdated; this usually happens when the cross-memory server gets updated.

**Action:**

The cross-memory server discards the old module and loads the latest version to
LPA.

### ZWES0241E

Service with ID _service_id_ not relocated, _function_address_ not in range
[_module_start_address_, _module_end_address_]

**Reason:**

An error occurred during the relocation of a cross-memory service.

**Action:**

The cross-memory server terminates. Contact support.

### ZWES0242W

Modify _command_verb_ command rejected

**Reason:**

The cross-memory server rejected the provided modify command because it was
either incorrect or the server was not ready to process it.

**Action:**

The cross-memory server ignores the command.

### ZWES0243W

Server busy, modify commands are rejected

**Reason:**

An operator issued too many commands in a short period and the cross-memory
server was not able to process the provided modify command.

**Action:**

The cross-memory server ignores the command.

### ZWES0244E

Resource '_resource_name_' not created, RC = _return_code_

**Reason:**

The cross-memory server failed to create an internal resource.

**Action:**

Depending on the location either the cross-memory server terminates or some
functionality is impacted. Contact support.

### ZWES0245E

ABEND _abend_code_-_reason_code_ averted in step '_step_name_' (recovery RC =
_recovery_return_code_)

**Reason:**

An abend occurred in a component of the cross-memory server.

**Action:**

Depending on the location either the cross-memory server terminates or some
functionality is impacted. Contact support.

### ZWES0246E

Service entry _service_id_ is occupied

**Reason:**

The cross-memory server made an attempt to install a cross-memory service in an
already occupied slot.

**Action:**

The cross-memory server terminates. Contact support.

### ZWES0247W

Development mode is enabled

**Reason:**

The user enabled one or more of the development modes.

**Action:**

Ensure it was done intentionally, otherwise disable any development mode.

### ZWES0248W

Address space is not reusable, start with REUSASID=YES to prevent an ASID
shortage

**Reason:**

An operator started the cross-memory server's address space as a non-reusable
address space.

**Action:**

Use RESUASID=YES when starting the cross-memory server, otherwise starting it
without that parameter can cause an address space identifier (ASID) shortage.

### ZWES0249E

Module _module_name_ is loaded from common storage, ensure _module_name_ is
valid in the STEPLIB

**Reason:**

The cross-memory server detected that its module was located in common storage.

**Action:**

The cross-memory server terminates. Ensure that the module is in a STEPLIB data
set.

### ZWES0250E

Bad dub status _bpx4qdb_status_ (_bpx4qdb_return_code_,_bpx4qdb_reason_code_),
verify that the started task user has an OMVS segment

**Reason:**

The cross-memory server detected an invalid dub status.

**Action:**

The cross-memory server terminates. Ensure that the user under which the
cross-memory server's started task runs has an OMVS segment.

### ZWES0251I

Look-up routine anchor has been created at _address_

**Reason:**

The cross-memory server created a cross-memory server look-up routine anchor.

**Action:**

No action required.

### ZWES0252I

Look-up routine anchor at _address_ has been reused

**Reason:**

The cross-memory server found and reused an existing look-up routine anchor.

**Action:**

No action required.

### ZWES0253I

Look-up routine anchor at _address_ has been deleted

**Reason:**

The cross-memory server deleted a look-up routine anchor.

**Action:**

No action required.

### ZWES0254W

Look-up routine anchor at _address_ has been discarded due to _reason_:

**Reason:**

The cross-memory server discarded a look-up routine anchor.

**Action:**

The cross-memory server creates a new anchor. Review the reason and contact
support if the reason is not one of the following:

* Incompatible version
* Insufficient size
* Outdated look-up routine

### ZWES0255E

Look-up routine anchor has not been created

**Reason:**

The cross-memory server could not create a look-up routine anchor.

**Action:**

The cross-memory server terminates. Ensure there is no shortage of the extended
common service area (ECSA) storage on your system. Contact support if you cannot
resolve the issue.

### ZWES0256I

Look-up routine anchor at _address_ has been explicitly discarded

**Reason:**

The user forced the cross-memory server to discard the current look-up routine
anchor via a parameter.

**Action:**

No action required.

### ZWES0257W

Look-up routine anchor discard RC = _return_code_

**Reason:**

The cross-memory server could not discard the current look-up routine anchor.

**Action:**

The cross-memory server continues running. Review _return_code_ and contact
support if needed.

Possible return codes:

| _return_code_       | Action                                       |
|---------------------|----------------------------------------------|
| RC_CMS_ZVT_NULL(47) | Ignore if you have not run any ZIS after IPL |

## ZIS Dynamic Linkage Base plug-in messages

### ZWES0700I

ZIS Dynamic Base plug-in starting, version _major_._minor_._patch_+_datestamp_,
stub version _stub_version_

**Reason:**

The dynamic linkage base plug-in with the specified plug-in and stub versions is
starting.

**Action:**

No action required.

### ZWES0701I

ZIS Dynamic Base plug-in successfully started

**Reason:**

The dynamic linkage base plug-in successfully started.

**Action:**

No action required.

### ZWES0702E

ZIS Dynamic Base plug-in startup failed, status = _status_code_

**Reason:**

The dynamic linkage base plug-in failed to start.

**Action:**

The dynamic linkage functionality will not be available. Review the messages
preceding this message and contact support if you cannot resolve the issue.

### ZWES0703E

ZIS Dynamic Base plug-in init error - _details_

**Reason:**

The dynamic linkage base plug-in failed during initialization.

**Action:**

The dynamic linkage functionality will not be available. Review the details and
contact support if you cannot resolve the issue.

### ZWES0704I

ZIS Dynamic Base plug-in terminating

**Reason:**

The plug-in is terminating.

**Action:**

No action required.

### ZWES0705I

ZIS Dynamic Base plug-in successfully terminated

**Reason:**

The plug-in successfully terminated.

**Action:**

No action required.

### ZWES0706E

ZIS Dynamic Base plug-in terminated with error

**Reason:**

The dynamic linkage base plug-in terminated with errors.

**Action:**

Review the details and contact support if you cannot resolve the issue.

### ZWES0707I

_response_text_

**Reason:**

This message contains a response from a modify command of the dynamic linkage
base plug-in.

**Action:**

No action required.

### ZWES0708I

Stub vector has been created at _address_

**Reason:**

The dynamic linkage base plug-in created a new stub vector at the specified
address.

**Action:**

No action required.

### ZWES0710I

Stub vector at _address_ has been reused

**Reason:**

The dynamic linkage base plug-in reused the stub vector at the specified
address.

**Action:**

No action required.

### ZWES0711I

Stub vector at _address_ has been deleted

**Reason:**

The dynamic linkage base plug-in deleted the stub vector at the specified
address.

**Action:**

No action required.

### ZWES0712W

Stub vector at _address_ is discarded due to _reason_:

**Reason:**

The dynamic linkage base plug-in discarded an existing stub vector because it
was invalid.

**Action:**

The dynamic linkage base plug-in creates a new vector. Review the reason and
contact support if the reason is not one of the following:

* Incompatible version
* Insufficient size

### ZWES0713W

ZIS Dynamic base plug-in development mode is enabled

**Reason:**

The user enabled the development mode.

**Action:**

Ensure it was done intentionally, otherwise disable any development mode.

### ZWES0714E

Bad cross-memory server version: expected [_min_major_._min_minor_._min_patch_,
_max_major_._max_minor_._max_patch_), found
_current_major_._current_minor_._current_patch_

**Reason:**

The dynamic linkage base plug-in detected that it was running in an unsupported
cross-memory server.

**Action:**

The dynamic linkage functionality will not be available. Use a supported version of the cross-memory server.

