# @botname command

This command is used to issue commands directly in your chat platform channels.

## Syntax

```

1  @*botname*
2.1 command
2.1   execute
2.2.1  ? smu *real SA/MVS/NV
command*? 
2.2.2.1 --domain-name
2.2.2.1 --dn
2.2.1 *domain\_name*? 
2.2.2.1 --system-name
2.2.2.1 --sn
2.2.1 *system\_name*? 
2.2.2.1 --domain-type
2.2.2.1 --dt
2.2.2.1 *SA*
2.2.2.1 *NetView*
1?  --limit *number*
```



## Usage

-   **execute**

    Execute the commands.

    -   **smu**

        Execute the commands via SMU. To specify the real command, you must specify the following positional argument.

        -   **real SA/MVS/NV command**

            This positional argument is REQUIRED. It specifies the command that you want to execute.

        You can also specify the following option.

        -   **--domain-name\|--dn domain\_name**

            This option is OPTIONAL. It specifies the domain name of the target resource to narrow down the result.

        -   **--system-name\|--sn system\_name**

            This option is OPTIONAL. It specifies the system name of the target resource to narrow down the result.

        -   **--domain-type\|--dt SA\|NetView**

            This option is OPTIONAL. It specifies the application name of the target resource to narrow down the result.


## Examples

|Action|Object|Command|Explanation|
|------|------|-------|-----------|
|execute|smu|`@bnz command exectue ipl --system-name AOBC`|Execute the command "ipl" for system AOBC via SMU.|
|`@bnz command exectue smu br --domain-name “LPAR400J INGXSGSA” --domain-type NetView`|Execute the command "br" for NetView® Domain “LPAR400J INGXSGSA” via SMU.|

