# @botname automation-domain

This command is used to operate on `automation domain` to show status, resources, or systems.

## Syntax

```

1  @*botname*
2.1 automation-domain
2.1 ad
1  list
2.1?  status? *domain\_name*?  --adapter
2.2.1 e2e
2.2.1 uaa
2.1 
2.2.1 resource
2.1? *resource\_name*
2.1 %options_for_resource
2.1  system? *system\_name*? 
2.2.1 --domain-name
2.2.1 --dn
2.1 *domain\_name*
1?  --limit *number*
```

options\_for\_resource```

1  
2.1 --domain-name
2.1 --dn
1 *domain\_name*? 
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
2.1 apg
2.1 mtr
2.1 ref
```



## Usage

-   **list**

    Shows the status, resources, or systems of automation domain.

    -   **status**

        Shows the status or details of automation domain. To narrow down returned results, you can specify the following positional argument.

        -   **domain\_name**

            This argument is OPTIONAL. It specifies the name of the target automation domain that you want to show. Wildcard character **\*** is supported.

        You can also specify the following options.

        -   **--adapter e2e\|uaa**

            This option is OPTIONAL. It specifies where the automation domain data comes from. You can only choose between `e2e` and `uaa`.

            -   **e2e**

                End to end adapter where z/OS® automation domain can be retrieved.

            -   **uaa**

                Universal automation adapter where non-z/OS® automation domain can be retrieved.

    -   **resource**

        Shows all resources of one automation domain. To narrow down returned results, you can specify the following positional argument.

        -   **resource\_name**

            This argument is OPTIONAL. It specifies the name of the target resource that you want to show. Wildcard character **\*** is supported. This positional argument resource\_name follows a pattern in command as `resource_name/resource_type/system_name`, where system\_name is optional here, for example, `AM2/APG/AOBC` and `AM2/APG` both work.

        You can also specify the following options.

        -   **--domain-name\|--dn domain\_name**

            This option is REQUIRED. It specifies the domain name of target resource to narrow down the result.

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

                Filters out resource whose type is monitor.

            -   **ref**

                Filters out resource whose type is reference.

    -   **system**

        Shows all systems of one automation domain. To narrow down returned results, you can specify the following positional argument.

        -   **system\_name**

            This argument is OPTIONAL. It specifies the name of the target system that you want to show. Wildcard character **\*** is supported.

        You can also specify the following options.

        -   **--domain-name\|--dn domain\_name**

            This option is OPTIONAL. It specifies the domain name of target resource to narrow down the result.


## Examples

|Object|Command|Explanation|
|------|-------|-----------|
|status|`@bnz automation-domain list status`|Shows the status of automation domain on all adapters.|
|`@bnz ad list status --adaper e2e`|Shows the status of automation domain on adapter e2e.|
|`@bnz ad list status --adapter uaa`|Shows the status of automation domain on adapter uaa.|
|resource|`@bnz automation-domain list resource --domain-name “LPAR400J INGXSGSA” --compound-state error --observed-state unavaliable --resource-type apg`|Shows the automation resource which is an application group with the compound state of error and the observed state of unavailable on the automation domain LPAR400J INGXSGSA.|
|`@bnz ad list resource AM2 --dn “LPAR400J INGXSGSA” --cs error --os unavaliable --rt apg`|Shows the automation resource AM2 which is an application group with the compound state of error and the observed state of unavailable on the automation domain LPAR400J INGXSGSA.|
|`@bnz ad list resource AM2/APG --dn “LPAR400J INGXSGSA” --cs warning --os stopping`|Shows the automation resource AM2/APG whose compound state is warning and observed state is stopping on the automation domain LPAR400J INGXSGSA.|
|`@bnz ad list resource AM2/APG/AOBC --dn “LPAR400J INGXSGSA” --cs warning --os stopping`|Shows the automation resource AM2/APG/AOBC whose compound state is warning and observed state is stopping on the automation domain LPAR400J INGXSGSA.|
|`@bnz ad list resource AM* --dn “LPAR400J INGXSGSA” --cs warning --os stopping --rt apg`|Shows the automation resource whose name starts with AM and is an application group with the compound state of warning and the observed state of stopping on the automation domain LPAR400J INGXSGSA.|
|`@bnz ad list resource AM*/APG/AOBC --dn “LPAR400J INGXSGSA” --cs warning --os stopping`|Shows the automation resource whose name starts with AM with the compound state of warning and the observed state of stopping on the automation domain LPAR400J INGXSGSA.|
|`@bnz ad list resource AM*/APG --dn “LPAR400J INGXSGSA” --cs warning --os stopping`|Shows the automation resource whose name starts with AM with the compound state of warning and the observed state of stopping on the automation domain LPAR400J INGXSGSA.|
|system|`@bnz automation-domain list system`|Shows all systems on all automation domain.|
|`@bnz automation-domain list system --domain-name “LPAR400J INGXSGSA”`|Shows all systems on the automation domain LPAR400J INGXSGSA.|
|`@bnz ad list system AOBC --dn “LPAR400J INGXSGSA”`|Shows system AOBC on the automation domain LPAR400J INGXSGSA.|
|`@bnz ad list system AO* --dn “LPAR400J INGXSGSA”`|Shows system whose name starts with AO on the automation domain LPAR400J INGXSGSA.|

