# @botname application

This command is used to operate on applications to show status, relations, or requests.

## Syntax

```

1 @*botname*
1 application
2  list
2 
3.1  status? *application\_name* 
3.2.1 --compound-state
3.2.1 --cs
3.1 *compound\_state*
3.1 
3.2.1 
3.2.2.1 relation
3.2.1? *target*
3.2.1 
3.2.2.1 request
3.2.1? *requested\_action\_name*
3.1  
3.2.1 --application-name
3.2.1 --an
3.1 *application\_name*
3.1  
3.2.1 --domain-name
3.2.1 --dn
3.1 *domain\_name*? 
3.2.1 --system-name
3.2.1 --sn
3.1 *system\_name*
2?  --limit *number*
```



## Usage

-   **list**

    Shows the status, relations, or requests of applications.

    -   **status**

        Shows the status or details of applications. To narrow down returned results, you can specify the following positional argument.

        -   **application\_name**

            This argument is OPTIONAL. It specifies the name of the target application that you want to show. Wildcard character **\*** is supported.

        You can also specify the following options.

        -   **--domain-name\|--dn domain\_name**

            This option is REQUIRED. It specifies the domain name of target resource to narrow down the result.

        -   **--system-name\|--sn system\_name**

            This option is OPTIONAL. It specifies the system name of target resource to narrow down the result.

        -   **--compound-state\|--cs compound\_state**

            This option is OPTIONAL. It specifies the compound state of the target resource to narrow down the result.

    -   **relation**

        Shows all relations of the application. To narrow down returned results, you can specify the following positional argument.

        -   **target**

            This argument is OPTIONAL. It specifies the name of the target relations that you want to show. Wildcard character **\*** is supported.

        You can also specify the following options.

        -   **--application-name\|--an application\_name**

            This option is REQUIRED. It specifies the application name of target resource to narrow down the result.

        -   **--domain-name\|--dn domain\_name**

            This option is REQUIRED. It specifies the domain name of target resource to narrow down the result.

        -   **--system-name\|--sn system\_name**

            This option is OPTIONAL. It specifies the system name of target resource to narrow down the result.

    -   **request**

        Shows all requests of the application. To narrow down returned results, you can specify the following positional argument.

        -   **requested\_action\_name**

            This argument is OPTIONAL. It specifies the name of the requested action that you want to show. Wildcard character **\*** is supported.

        You can also specify the options. The options are the same as those of relation. See [Options of relation](#relation_option).


## Examples

|Object|Command|Explanation|
|------|-------|-----------|
|status|`@bnz application list status --domain-name “LPAR400J INGXSGSA” --system-name AOBC`|Shows the status of application on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|`@bnz application list status AM --dn “LPAR400J INGXSGSA” --sn AOBC`|Shows the status of application AM on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|`@bnz application list status A* --dn “LPAR400J INGXSGSA” --sn AOBC`|Shows the status of application whose name starts with A on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|relation|`@bnz application list relation --domain-name “LPAR400J INGXSGSA” --system-name AOBC --application-name AM`|Shows the relation of application AM on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|`@bnz application list relation --dn “LPAR400J INGXSGSA” -sn AOBC --an AM`|Shows the relation of application AM on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|`@bnz application list relation AM2 --dn “LPAR400J INGXSGSA” --sn AOBC --an AM`|Shows the relation of application AM whose target is AM2 on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|`@bnz application list relation A*1 --dn “LPAR400J INGXSGSA” --sn AOBC --an AM`|Shows the relation of application AM whose target name starts with A and ends with 1 on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|request|`@bnz application list request --domain-name “LPAR400J INGXSGSA” --system-name AOBC --application-name AM`|Shows the request of application AM on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|`@bnz application list request --dn “LPAR400J INGXSGSA” --sn AOBC--an AM`|Shows the request of application AM on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|`@bnz application list request START --dn“LPAR400J INGXSGSA” --sn AOBC --an AM`|Shows the request of the application AM whose requested action is START on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|`@bnz application list request S* --dn“LPAR400J INGXSGSA” --sn AOBC --an AM`|Shows the request of the application AM whose requested action name starts with S on the automation domain LPAR400J INGXSGSA and the system AOBC.|

