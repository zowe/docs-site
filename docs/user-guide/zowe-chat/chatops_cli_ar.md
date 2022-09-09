# @botname automation-resource

This command is used to operate on `automation resource` to show status, members, relations, requests or restart, start, stop, suspend, resume resources.

## Syntax

```

1 @*botname*
1 automation-resource
1 ar
1   list
2.1 ? status? *resource\_name* 
2.2.1 --domain-name
2.2.1 --dn
2.1 *domain\_name*? 
2.2.1 --system-name
2.2.1 --sn
2.1 *system\_name*? 
2.2.1 --compound-state
2.2.1 --cs
2.2.1 ok
2.2.1 warning
2.2.1 error
2.2.1 fatal? 
2.2.1 --observed-state
2.2.1 --os
2.2.1 unknown
2.2.1 available
2.2.1 unavailable
2.2.1 stopping
2.2.1 starting ? 
2.2.1 --resource-type
2.2.1 --rt
2.2.2.1 apl
2.2.2.1 apg
2.2.2.1 mtr
2.2.2.1 ref
2.1 
2.2.1  member? *member\_name* 
2.2.2.1 --domain-name
2.2.2.1 --dn
2.2.1 *domain\_name*? 
2.2.2.1 --system-name
2.2.2.1 --sn
2.2.1 *system\_name* 
2.2.2.1 resources-name
2.2.2.1 --rn
2.2.2.1 *resource\_name* 
2.1 
2.2.1  relation? *target* 
2.2.2.1 --domain-name
2.2.2.1 --dn
2.2.1 *domain\_name*? 
2.2.2.1 --system-name
2.2.2.1 --sn
2.2.1 *system\_name* 
2.2.2.1 resources-name
2.2.2.1 --rn
2.2.2.1 *resource\_name* 
2.1 
2.2.1  request? *requested\_action\_name* 
2.2.2.1 --domain-name
2.2.2.1 --dn
2.2.1 *domain\_name*? 
2.2.2.1 --system-name
2.2.2.1 --sn
2.2.1 *system\_name* 
2.2.2.1 resources-name
2.2.2.1 --rn
2.2.1 *resource\_name* 
1  
2.1 restart
2.1 start
2.1 stop
2.1 suspend
2.1 resume  ? resource *resource\_name* 
2.1 --domain-name
2.1 --dn
1 *domain\_name*?  
2.1 --system-name
2.1 --sn
1 *system\_name*
3?  --limit *number*
```



## Usage

-   **list**

    Shows the status of automation resources.

    -   **status**

        Shows the status or details of the automation resources. To narrow down returned results, you can specify the following positional argument.

        -   **resource\_name**

            This argument is OPTIONAL. It specifies the name of the target resource that you want to show. Wildcard character **\*** is supported. This positional argument resource\_name follows a pattern in command as `resource_name/resource_type/system_name`, where system\_name is optional here, for example, `AM2/APG/AOBC` and `AM2/APG` both work.

        You can also specify the following options.

        -   **--domain-name\|--dn domain\_name**

            This option is REQUIRED. It specifies the domain name of target resource to narrow down the result.

        -   **--system-name\|--sn system\_name**

            This option is OPTIONAL. It specifies the system name of target resource to narrow down the result. If you specified the system name in the positional argument resource\_name above, you don't have to specify this option again here, otherwise it will be ignored.

        -   **--compound-state\|--cs ok\|warning\|error\|fatal**

            This option is OPTIONAL. It specifies the compound state of the target resource to narrow down the result.

        -   **--observed-state\|--os unknown\|available\|unavailable\|stopping\|starting**

            This option is OPTIONAL. It specifies the compound state of the target resource to narrow down the result.

        -   **--resource-type\|--rt apl\|apg\|mtr\|ref**

            This option is OPTIONAL. It specifies the resource type of target resource to narrow down the result. You can only choose among `apl`, `apg`, `mtr`, and `ref`. If you specified the resource type in the positional argument resource\_name above, you don't have to specify this option again here, otherwise it will be ignored.

            -   **apl**

                Filters out resource whose type is application.

            -   **apg**

                Filters out resource whose type is application group.

            -   **mtr**

                Filters out resource whose type is monitor.

            -   **ref**

                Filters out resource whose type is reference.

    -   **member**

        Shows all members of one automation resource. To narrow down returned results, you can specify the following positional argument.

        -   **member\_name**

            This argument is OPTIONAL. It specifies the name of the target member that you want to show. Wildcard character **\*** is supported. This positional argument member\_name follows a pattern in command as `member_name/resource_type/system_name`, where system\_name is optional here, for example, `AM2/APG/AOBC` and `AM2/APG` both work.

        You can also specify the following options.

        -   **--resource-name\|--rn resource\_name**

            This option is REQUIRED. It specifies the application group name of target resource to narrow down the result. This option resource\_name follows a pattern in command as `resource_name/resource_type/system_name`, where system\_name is optional here, for example, `AM2/APG/AOBC` and `AM2/APG` both work.

        -   **--domain-name\|--dn domain\_name**

            This option is REQUIRED. It specifies the domain name of target resource to narrow down the result.

        -   **--system-name\|--sn system\_name**

            This option is OPTIONAL. It specifies the system name of target resource to narrow down the result. If you specified the system name before, you don't have to specify this option again here, otherwise it will be ignored.

    -   **relation**

        Shows all relations of one automation resource. To narrow down returned results, you can specify the following positional argument.

        -   **target**

            This argument is OPTIONAL. It specifies the name of the target relations that you want to show. Wildcard character **\*** is supported. This positional argument target follows a pattern in command as `target_name/resource_type/system_name`, where system\_name is optional here, for example, `AM2/APG/AOBC` and `AM2/APG` both work.

        You can also specify the options. The options are the same as those of member. See [options of member](#member_options).

    -   **request**

        Shows all requests of one automation resource. To narrow down returned results, you can specify the following positional argument.

        -   **requested\_action\_name**

            This argument is OPTIONAL. It specifies the name of the requested action that you want to show. Wildcard character **\*** is supported.

        You can also specify the options. The options are the same as those of member. See [options of member](#member_options).

-   **restart/start/stop/suspend/resume**

    Restart, start, stop, suspend or resume the automation resource.

    -   **resource**

        Restart, start, stop, suspend or resume the automation resource. To narrow down returned results, you can specify the following positional argument.

        -   **resource\_name**

            This argument is REQUIRED. It specifies the name of the target resource that you want to show. This positional argument resource\_name follows a pattern in command as `resource_name/resource_type/system_name`, where system\_name is optional here, for example, `AM2/APG/AOBC` and `AM2/APG` both work.

        You can also specify the following options.

        -   **--domain-name\|--dn domain\_name**

            This option is REQUIRED. It specifies the domain name of the target resource to narrow down the result.

        -   **--system-name\|--sn system\_name**

            This option is OPTIONAL. It specifies the system name of target resource to narrow down the result. If you specified the system name in the positional argument resource\_name above, you don't have to specify this option again here, otherwise it will be ignored.


## Examples

|Action|Object|Command|Explanation|
|------|------|-------|-----------|
|list|status|`@bnz automation-resource list status --domain-name “LPAR400J INGXSGSA” --system-name AOBC --compound-state error --resource-type apg`|Shows the status of the automation resource that is an application group in error state on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|`@bnz ar list status --dn “LPAR400J INGXSGSA” --sn AOBC`|Shows the status of the automation resource on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|`@bnz ar list status R#C16G1 --dn “LPAR400J INGXSGSA” --sn AOBC`|Shows the status of the automation resource R\#C16G1 on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|`@bnz ar list status R#C16G1/APG --dn “LPAR400J INGXSGSA” --sn AOBC`|Shows the status of the automation resource R\#C16G1/APG on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|`@bnz ar list status R#C16G1/APG/AOBC --dn “LPAR400J INGXSGSA”`|Shows the status of the automation resource R\#C16G1/APG/AOBC on the automation domain LPAR400J INGXSGSA.|
|`@bnz ar list status R#C16G* --dn “LPAR400J INGXSGSA”`|Shows the status of the automation resource whose name starts with R\#C16G on the automation domain LPAR400J INGXSGSA.|
|`@bnz ar list status R#C16G*/APG --dn “LPAR400J INGXSGSA” --sn AOBC`|Shows the status of the automation resource whose name starts with R\#C16G on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|`@bnz ar list status R#C16G*/APG/AOBC --dn “LPAR400J INGXSGSA”`|Shows the status of the automation resource whose name starts with R\#C16G on the automation domain LPAR400J INGXSGSA.|
|member|`@bnz automation-resource list member --domain-name “LPAR400J INGXSGSA” --system-name AOBC --resource-name R#C16G1/APG`|Shows the member of the automation resource R\#C16G1/APG on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|`@bnz ar list member --dn “LPAR400J INGXSGSA” --rn R#C16G1/APG`|Shows the member of the automation resource R\#C16G1/APG on the automation domain LPAR400J INGXSGSA.|
|`@bnz ar list member AM2 --dn “LPAR400J INGXSGSA” --rn R#C16G1/APG`|Shows the member AM2 of the automation resource R\#C16G1/APG on the automation domain LPAR400J INGXSGSA.|
|`@bnz ar list member AM2/APL --dn “LPAR400J INGXSGSA” --rn R#C16G1/APG/AOBC`|Shows the member AM2/APL of the automation resource R\#C16G1/APG/AOBC on the automation domain LPAR400J INGXSGSA.|
|`@bnz ar list member AM* --dn “LPAR400J INGXSGSA” --sn AOBC --rn R#C16G1/APG`|Shows the member of the automation resource R\#C16G1/APG whose name starts with AM on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|`@bnz ar list member AM*/APL --dn “LPAR400J INGXSGSA” --rn R#C16G1/APG/AOBC`|Shows the member of the automation resource R\#C16G1/APG/AOBC whose name starts with AM on the automation domain LPAR400J INGXSGSA.|
|relation|`@bnz automation-resource list relation --domain-name “LPAR400J INGXSGSA” --system-name AOBC --resource-name R#C16G1/APG`|Shows the relation of the automation resource R\#C16G1/APG on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|`@bnz ar list relation --dn “LPAR400J INGXSGSA” --sn AOBC --rn R#C16G1/APG`|Shows the relation of the automation resource R\#C16G1/APG on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|`@bnz ar list relation AM2 --dn “LPAR400J INGXSGSA” --rn R#C16G1/APG/AOBC`|Shows the relation of the automation resource R\#C16G1/APG/AOBC whose target is AM2 on the automation domain LPAR400J INGXSGSA.|
|`@bnz ar list relation AM2/APL --dn “LPAR400J INGXSGSA” --rn R#C16G1/APG/AOBC`|Shows the relation of the automation resource R\#C16G1/APG/AOBC whose target is AM2/APL on the automation domain LPAR400J INGXSGSA.|
|`@bnz ar list relation AM* --dn “LPAR400J INGXSGSA” --rn R#C16G1/APG`|Shows the relation of the automation resource R\#C16G1/APG whose target name starts with AM on the automation domain LPAR400J INGXSGSA.|
|`@bnz ar list relation AM*/APL --dn “LPAR400J INGXSGSA” --sn AOBC--rn R#C16G1/APG`|Shows the relation of the automation resource R\#C16G1/APG whose target name starts with AM on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|`@bnz ar list relation AM*/APL --dn “LPAR400J INGXSGSA” --rn R#C16G1/APG/AOBC`|Shows the relation of the automation resource R\#C16G1/APG/AOBC whose target name starts with AM on the automation domain LPAR400J INGXSGSA.|
|request|`@bnz automation-resource list request --domain-name “LPAR400J INGXSGSA” --system-name AOBC --resource-name R#C16G1/APG`|Shows the request of the automation resource R\#C16G1/APG on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|`@bnz ar list request --dn “LPAR400J INGXSGSA” --sn AOBC --rn R#C16G1/APG`|Shows the request of the automation resource R\#C16G1/APG on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|`@bnz ar list request START --dn “LPAR400J INGXSGSA” --rn R#C16G1/APG/AOBC`|Shows the request of the automation resource R\#C16G1/APG/AOBC whose requested action is START on the automation domain LPAR400J INGXSGSA.|
|`@bnz ar list request S* --dn “LPAR400J INGXSGSA” --rn R#C16G1/APG/AOBC`|Shows the request of the automation resource R\#C16G1/APG/AOBC whose requested action name starts with S on the automation domain LPAR400J INGXSGSA.|
|restart/start/stop/suspend/resume|resource|`@bnz automation-resource restart resource AM/APL --dn “LPAR400J INGXSGSA” --sn AOBC`|Restarts the automaton resource AM/APL on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|`@bnz ar stop resource AM/APL --dn “LPAR400J INGXSGSA” --sn AOBC`|Stops the automaton resource AM/APL on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|`@bnz ar suspend resource AM/APL/AOBC --dn “LPAR400J INGXSGSA”`|Suspends the automaton resource AM/APL/AOBC on the automation domain LPAR400J INGXSGSA.|
|`@bnz ar resume resource AM/APL/AOBC --dn “LPAR400J INGXSGSA”`|Suspends the automaton resource AM/APL/AOBC on the automation domain LPAR400J INGXSGSA.|

