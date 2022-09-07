# @botname system

This command is used to operate on `system` to show status or resources.

## Syntax

```

1  @*botname*
2.1 system
1  list
2.1  status? *system\_name*? 
2.2.1 --domain-name
2.2.1 --dn
2.1 *domain\_name*
2.1  resource? *resource\_name* %options_for_resource
1?  --limit *number*
```

options\_for\_resource```

1 
2.1 --domain-name
2.1 --dn
1 *domain\_name* 
2.1 --system-name
2.1 --sn
1 *system\_name*
1 ? 
2.1 --compound-state
2.1 --cs
2.1 ok
2.1 warning
2.1 error
2.1 fatal? 
2.1 --observed-state
2.1 --os
2.1 unknown
2.1 available
2.1 unavailable
2.1 stopping
2.1 starting? 
2.1 --resource-type
2.1 --rt
2.1 apl
2.1  apg
2.1 mtr
2.1 ref
```



## Usage

-   **list**

    Shows the status or resources of system.

    -   **status**

        Shows the status or details of system. To narrow down returned results, you can specify the following positional argument.

        -   **system\_name**

            This argument is OPTIONAL. It specifies the name of the target system that you want to show. Wildcard character **\*** is supported.

        You can also specify the following options.

        -   **--domain-name\|--dn domain\_name**

            This option is OPTIONAL. It specifies the domain name of target resource to narrow down the result.

    -   **resource**

        Shows all resources of one system. To narrow down returned results, you can specify the following positional argument.

        -   **resource\_name**

            This argument is OPTIONAL. It specifies the name of the target resource that you want to show. Wildcard character **\*** is supported. This positional argument resource\_name follows a pattern in command as `resource_name/resource_type/system_name`, where system\_name is optional here, for example, `AM2/APG/AOBC` and `AM2/APG` both work.

        You can also specify the following options.

        -   **--domain-name\|--dn domain\_name**

            This option is REQUIRED. It specifies the domain name of target resource to narrow down the result.

        -   **--system-name\|--sn system\_name**

            This option is REQUIRED. It specifies the system name of target resource to narrow down the result. If you specified the system name in the positional argument resource\_name above, you don't have to specify this option again here, otherwise it will be ignored.

        -   **--compound-state\|--cs ok\|warning\|error\|fatal**

            This option is OPTIONAL. It specifies the compound state of the target resource to narrow down the result.

        -   **--observed-state\|--os unknown\|available\|unavailable\|stopping\|starting**

            This option is OPTIONAL. It specifies the observed state of the target resource to narrow down the result.

        -   **--resource-type\|--rt apl\|apg\|mtr\|ref**

            This option is OPTIONAL. It specifies the resource type of target resource to narrow down the result. You can only choose among `apl`, `apg`, `mtr`, and `ref`. If you specified the resource type in the positional argument resource\_name above, you don't have to specify this option again here, otherwise it will be ignored.

            -   **apl**

                Filters out resource whose type is application.

            -   **apg**

                Filters out resource whose type is application group.

            -   **mtr**

                Filters out resource whose type is a monitor.

            -   **ref**

                Filters out resource whose type is reference.


## Examples

|Object|Command|Explanation|
|------|-------|-----------|
|status|`@bnz system list status`|Shows the status of all systems on all domains.|
|`@bnz system list status --domain-name “LPAR400J INGXSGSA”`|Shows the status of all systems on the automation domain LPAR400J INGXSGSA.|
|`@bnz system list status AOBC --dn “LPAR400J INGXSGSA”`|Shows the status of the system AOBC on the automation domain LPAR400J INGXSGSA.|
|`@bnz system list status AOB* --dn “LPAR400J INGXSGSA”`|Shows the status of the system whose name starts with AOB on the automation domain LPAR400J INGXSGSA.|
|resource|`@bnz system list resource --domain-name “LPAR400J INGXSGSA” --system-name AOBC --compound-state error --resource-type apg`|Shows all resources which are application groups in error state on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|`@bnz system list resource AM --dn “LPAR400J INGXSGSA” --sn AOBC --cs error --rt apl`|Shows the automation resource AM which is an application in error state on the automation domain LPAR400J INGXSGSA and system AOBC.|
|`@bnz system list resource AM/APL --dn “LPAR400J INGXSGSA” --sn AOBC --cs error`|Shows the automation resource AM/APL in error state on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|`@bnz system list resource AM/APL/AOBC --dn “LPAR400J INGXSGSA” --cs error`|Shows the automation resource AM/APL/AOBC in error state on the automation domain LPAR400J INGXSGSA.|
|`@bnz system list resource AM* --dn “LPAR400J INGXSGSA” --sn AOBC --cs error`|Shows the automation resource whose name starts with AM in error state on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|`@bnz system list resource AM*/APL --dn “LPAR400J INGXSGSA” --sn AOBC --cs error`|Shows the automation resource whose name starts with AM in error state on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|`@bnz system list resource AM*/APL/AOBC --dn “LPAR400J INGXSGSA” --sn AOBC --cs error`|Shows the automation resource whose name starts with AM in error state on the automation domain LPAR400J INGXSGSA and the system AOBC.|

