# @botname credential-store

This command is used to operate on credential store to list, add, update or delete credentials.

## Syntax

```

1  @*botname*
2.1 credential-store
2.1   list
2.2.1   credential? 
2.2.2.1 --operator-account
2.2.2.1 --oa
2.2.1 *operator\_account*? 
2.2.2.1 --sysplex-name
2.2.2.1 --spn
2.2.1 *sysplex\_name*? 
2.2.2.1 --domain-name
2.2.2.1 --dn
2.2.1 *domain\_name*? 
2.2.2.1 --system-name
2.2.2.1 --sn
2.2.1 *system\_name*? 
2.2.2.1 --application-name
2.2.2.1 --an
2.2.2.1 *SA*
2.2.2.1 *NetView*
2.2.2.1 *ZWS*
2.1   add
2.2.1   credential? 
2.2.2.1 --sysplex-name
2.2.2.1 --spn
2.2.1 *sysplex\_name*? 
2.2.2.1 --domain-name
2.2.2.1 --dn
2.2.1 *domain\_name*? 
2.2.2.1 --system-name
2.2.2.1 --sn
2.2.1 *system\_name*? 
2.2.2.1 --application-name
2.2.2.1 --an
2.2.2.1 *SA*
2.2.2.1 *NetView*
2.2.2.1 *ZWS*
2.1   update
2.2.1   credential? 
2.2.2.1 --sysplex-name
2.2.2.1 --spn
2.2.1 *sysplex\_name*? 
2.2.2.1 --domain-name
2.2.2.1 --dn
2.2.1 *domain\_name*? 
2.2.2.1 --system-name
2.2.2.1 --sn
2.2.1 *system\_name*? 
2.2.2.1 --application-name
2.2.2.1 --an
2.2.2.1 *SA*
2.2.2.1 *NetView*
2.2.2.1 *ZWS*
2.1   delete
2.2.1   credential 
2.2.2.1 --operator-account
2.2.2.1 --oa
2.2.1 *operator\_account*? 
2.2.2.1 --sysplex-name
2.2.2.1 --spn
2.2.1 *sysplex\_name*? 
2.2.2.1 --domain-name
2.2.2.1 --dn
2.2.1 *domain\_name*? 
2.2.2.1 --system-name
2.2.2.1 --sn
2.2.1 *system\_name*? 
2.2.2.1 --application-name
2.2.2.1 --an
2.2.2.1 *SA*
2.2.2.1 *NetView*
2.2.2.1 *ZWS*
1?  --limit *number*
```



## Usage

-   **list**

    Shows the credentials.

    -   **credential**

        Shows the status or details of credentials. To narrow down returned results, you can specify the following option.

        -   **--operator-account\|--oa operator\_account**

            This option is OPTIONAL. It specifies the operator account of the target resource to narrow down the result.

        -   **--sysplex-name\|--spn sysplex\_name**

            This option is OPTIONAL. It specifies the sysplex name of the target resource to narrow down the result.

        -   **--domain-name\|--dn domain\_name**

            This option is OPTIONAL. It specifies the domain name of the target resource to narrow down the result.

        -   **--system-name\|--sn system\_name**

            This option is OPTIONAL. It specifies the system name of the target resource to narrow down the result.

        -   **--application-name\|--an SA\|NetView\|ZWS**

            This option is OPTIONAL. It specifies the application name of the target resource to narrow down the result.


-   **add**

    Adds the credentials in credential-store.

    -   **credential**

        Adds the credentials. To narrow down returned results, you can specify the following option.

        -   **--sysplex-name\|--spn sysplex\_name**

            This option is OPTIONAL. It specifies the sysplex name of the target resource to narrow down the result.

        -   **--domain-name\|--dn domain\_name**

            This option is OPTIONAL. It specifies the domain name of the target resource to narrow down the result.

        -   **--system-name\|--sn system\_name**

            This option is OPTIONAL. It specifies the system name of the target resource to narrow down the result.

        -   **--application-name\|--an SA\|NetView\|ZWS**

            This option is OPTIONAL. It specifies the application name of the target resource to narrow down the result.


-   **update**

    Updates the credentials in credential-store.

    -   **credential**

        Updates the credentials. To narrow down returned results, you can specify the following option.

        -   **--sysplex-name\|--spn sysplex\_name**

            This option is OPTIONAL. It specifies the sysplex name of the target resource to narrow down the result.

        -   **--domain-name\|--dn domain\_name**

            This option is OPTIONAL. It specifies the domain name of the target resource to narrow down the result.

        -   **--system-name\|--sn system\_name**

            This option is OPTIONAL. It specifies the system name of the target resource to narrow down the result.

        -   **--application-name\|--an SA\|NetView\|ZWS**

            This option is OPTIONAL. It specifies the application name of the target resource to narrow down the result.


-   **delete**

    Deletes the credentials in credential-store.

    -   **credential**

        Deletes the credentials. To narrow down returned results, you can specify the following option.

        -   **--operator-account\|--oa operator\_account**

            This option is REQUIRED. It specifies the sysplex name of target resource to narrow down the result.

        -   **--sysplex-name\|--spn sysplex\_name**

            This option is OPTIONAL. It specifies the sysplex name of target resource to narrow down the result.

        -   **--domain-name\|--dn domain\_name**

            This option is OPTIONAL. It specifies the domain name of target resource to narrow down the result.

        -   **--system-name\|--sn system\_name**

            This option is OPTIONAL. It specifies the system name of target resource to narrow down the result.

        -   **--application-name\|--an SA\|NetView\|ZWS**

            This option is OPTIONAL. It specifies the application name of the target resource to narrow down the result.


## Examples

|Action|Object|Command|Explanation|
|------|------|-------|-----------|
|list|credential|`@bnz credential-store list credential --operator-account annette --application-name SA --domain-name “LPAR400J INGXSGSA”`|Shows the credential of the operator account whose name is Annette for application SA on domain LPAR400J INGXSGSA.|
|`@bnz credential-store list credential --oa annette --spn LOCAL --sn AOBC`|Shows the credential of the operator account whose name is Annette for system AOBC on sysplex LOCAL.|
|`@bnz credential-store list credential --oa annette --spn LOCAL`|Shows the credential of the operator account whose name is Annette for sysplex LOCAL.|
|`@bnz credential-store list credential --oa annette`|Shows the credential of the operator account whose name is Annette.|
|add|credential|`@bnz credential-store add credential --application-name SA --domain-name “LPAR400J INGXSGSA”`|Adds the credential of the operator account and password provided by popup dialog for application SA on domain LPAR400J INGXSGSA.|
|`@bnz credential-store add credential --spn LOCAL --sn AOBC`|Adds the credential of the operator account and password provided by popup dialog for system AOBC on sysplex LOCAL.|
|`@bnz credential-store add credential --sn LOCAL`|Adds the credential of the operator account and password provided by popup dialog for application for sysplex LOCAL.|
|`@bnz credential-store add credential`|Adds the credential of the operator account and password provided by popup dialog.|
|update|credential|`@bnz credential-store update credential --application-name SA --domain-name “LPAR400J INGXSGSA”`|Updates the credential of the operator account and password provided by popup dialog for application SA on domain LPAR400J INGXSGSA.|
|`@bnz credential-store update credential --spn LOCAL --sn AOBC`|Updates the credential of the operator account and password provided by popup dialog for system AOBC on sysplex LOCAL.|
|`@bnz credential-store update credential --spn LOCAL`|Updates the credential of the operator account and password provided by popup dialog for application for sysplex LOCAL.|
|`@bnz credential-store update credential`|Updates the credential of the operator account and password provided by popup dialog.|
|delete|credential|`@bnz credential-store delete credential --operator-account annette --application-name SA --domain-name “LPAR400J INGXSGSA”`|Deletes the credential which operator account name is Annette for application SA on domain LPAR400J INGXSGSA.|
|`@bnz credential-store delete credential --oa annette --spn LOCAL --sn AOBC`|Deletes the credential which operator account name is Annette for system AOBC on sysplex LOCAL.|
|`@bnz credential-store delete credential --oa annette --spn LOCAL`|Deletes the credential which operator account name is Annette for sysplex LOCAL.|
|`@bnz credential-store delete credential --oa annette`|Deletes the credential which operator account name is Annette.|

