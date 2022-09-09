# @botname application-group \(original\)

This command is used to operate on application groups to show status, member, relations, or requests.

## Syntax

```

1 @*botname*
1 application-group
1 ag
2  list
2 
3.1  status? *application\_group\_name*
3.1 
3.2.1 
3.2.2.1 member
3.2.1? *member\_name*
3.2.1 
3.2.2.1 relation
3.2.1? *target*
3.2.1 
3.2.2.1 request
3.2.1? *request\_user\_id*
3.1 
3.2.1 --application-group-name
3.2.1 --agn
3.1 *application\_group\_name*
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

-   **List**

    Shows the status, members, relations, or requests of application groups.

    -   **status**

        Shows the status or details of application groups. To narrow down returned results, you can specify the positional argument `application\_group\_name` and the options `--domain-name`, `--system-name`, and `--compound-state`.

        -   **application\_group\_name**

            Specifies the name of the target application group that you want to show. This positional argument is optional. Wildcard character **\*** is supported.

        -   **--domain-name\|dn domain\_name**

            Specifies the domain name of target resource to narrow down the result. This option is required.

        -   **--system-name\|sn system\_name**

            Specifies the system name of target resource to narrow down the result. This option is optional.

        -   **--compound-state\|cs compound\_state**

            Specifies the compound state of the target resource to narrow down the result. This option is optional.

    -   **member**

        Shows all members of the application group. To narrow down returned results, you can specify the positional argument `member\_name` and the options `--domain-name`, `--system-name`, and `--application-group-name`.

        -   **member\_name**

            Specifies the name of the target member that you want to show. This positional argument is optional. Wildcard character **\*** is supported.

        -   **--domain-name\|dn domain\_name**

            Specifies the domain name of target resource to narrow down the result. This option is required.

        -   **--system-name\|sn system\_name**

            Specifies the system name of target resource to narrow down the result. This option is optional.

        -   **--application-group-name\|agn application\_group\_name**

            Specifies the application group name of target resource to narrow down the result. This option is required.

    -   **relation**

        Shows all relations of the application group. To narrow down returned results, you can specify the positional argument `target` and the options `--domain-name`, `--system-name`, and `--application-group-name`.

        -   **target**

            Specifies the name of the target relations that you want to show. This positional argument is optional. Wildcard character **\*** is supported.

        -   **--domain-name\|dn domain\_name**

            Specifies the domain name of target resource to narrow down the result. This option is required.

        -   **--system-name\|sn system\_name**

            Specifies the system name of target resource to narrow down the result. This option is optional.

        -   **--application-group-name\|agn application\_group\_name**

            Specifies the application group name of target resource to narrow down the result. This option is required.

    -   **request**

        Shows all requests of the application group. To narrow down returned results, you can specify the positional argument `member\_name` and the options `--domain-name`, `--system-name`, and `--application-group-name`.

        -   **request\_user\_id**

            Specifies the name of the target request that you want to show. This positional argument is optional for the object `request`. Wildcard character **\*** is supported.

        -   **--domain-name\|dn domain\_name**

            Specifies the domain name of target resource to narrow down the result. This option is required.

        -   **--system-name\|sn system\_name**

            Specifies the system name of target resource to narrow down the result. This option is optional.

        -   **--application-group-name\|agn application\_group\_name**

            Specifies the application group name of target resource to narrow down the result. This option is required.


## Examples

|Object|Command|Explanation|
|------|-------|-----------|
|status|`@bnz application-group list status --domain-name “LPAR400J INGXSGSA” --system-name AOBC`|Lists the status of the application group on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|`@bnz ag list status --dn “LPAR400J INGXSGSA” --sn AOBC`|Lists the status of the application group on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|`@bnz ag list statusR#C16G1 --dn “LPAR400J INGXSGSA” --sn AOBC`|Lists the status of the application group "R\#C16G1" on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|`@bnz ag list status R#C16G* --dn “LPAR400J INGXSGSA” --sn AOBC`|Lists the status of the application group on the automation domain LPAR400J INGXSGSA and the system AOBC whose name starts with R\#C16G.|
|member|`@bnz application-group list member --domain-name “LPAR400J INGXSGSA” --system-name AOBC --application-group-name R#C16G1`|Lists the member of the application group R\#C16G1 on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|`@bnz ag list member --dn “LPAR400J INGXSGSA” --sn AOBC --agn R#C16G1`|Lists the member of the application group R\#C16G1 on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|`@bnz ag list member AM2 --dn “LPAR400J INGXSGSA” --sn AOBC --agn R#C16G1`|Lists the member AM2 of the application-group R\#C16G1 on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|`@bnz ag list member AM* --dn “LPAR400J INGXSGSA” --sn AOBC --agn R#C16G1`|Lists the member of the application group R\#C16G1 whose name starts with AM on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|relation|`@bnz application-group list relation --domain-name “LPAR400J INGXSGSA” --system-name AOBC --application-group-name R#C16G1`|Lists the relation of the application group R\#C16G1 on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|`@bnz ag list relation --dn “LPAR400J INGXSGSA” --sn AOBC --agn R#C16G1`|Lists the relation of the application group R\#C16G1 on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|`@bnz ag list relation AM2 --dn “LPAR400J INGXSGSA” --sn AOBC --agn R#C16G1`|Lists the relation of the application group R\#C16G1 which target is AM2 on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|`@bnz ag list relation AM* --dn “LPAR400J INGXSGSA” --sn AOBC --agn R#C16G1`|Lists the relation of the application group R\#C16G1, which target name starts with AM, on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|request|`@bnz application-group list request --domain-name “LPAR400J INGXSGSA” --system-name AOBC --application-group-name R#C16G1`|Lists the request of the application group R\#C16G1 on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|`@bnz ag list request --dn “LPAR400J INGXSGSA” --sn AOBC --agn R#C16G1`|Lists the request of the application group R\#C16G1 on the automation domain LPAR400J INGXSGSA and the system AOBC.|
|`@bnz ag list request KE2EUSR --dn “LPAR400J INGXSGSA” --sn AOBC --agn R#C16G1`|Lists the request of the application group R\#C16G1 whose request-user-id is KE2EUSR on the automation domain LPAR400J INGXSGSA and the system AOBC.|

