# @botname was

This command is used to show the status or application on WebSphere Application Server.

## Syntax

```

1  @*botname*
2.1 was
1  list
2.1?  status? *was\_server\_name*
2.1 
2.2.1 application
2.1? *application\_name*
2.1 
2.2.1 --was-server-name
2.2.1 --wsn
2.1 *was\_server\_name*
1?  --limit *number*
```



## Usage

-   **list**

    Shows the status or application of WAS servers.

    -   **status**

        Shows the status or details of WAS servers. To narrow down returned results, you can specify the following positional argument.

        -   **was\_server\_name**

            This argument is OPTIONAL. It specifies the name of the target WAS server that you want to show. Wildcard character **\*** is supported.

    -   **application**

        Shows the applications on WAS servers. To narrow down returned results, you can specify the following positional argument.

        -   **application\_name**

            This argument is OPTIONAL. It specifies the name of the target application that you want to show. Wildcard character **\*** is supported.

        You can also specify the following option.

        -   **--was-server-name\|--wsn was\_server\_name**

            This option is REQUIRED. It specifies the WAS server name of target resource to narrow down the result.


## Examples

-   **`@bnz was list`**

    Lists the status of all WAS servers.

-   **`@bnz was list status`**

    Lists the status of all WAS servers.

-   **`@bnz was list status AQSR00A`**

    Lists the status of the WAS server named AQSR00A.

-   **`@bnz was list status AQ*`**

    Lists the status of the WAS server whose name starts with AQ.

-   **`@bnz was list application --was-server-name AQSR00A`**

    Lists the applications on the WAS server named AQSR00A.

-   **`@bnz was list application SCA --wsn AQSR00A`**

    Lists the application named SCA on the WAS server named AQSR00A.

-   **`@bnz was list application S* --wsn AQSR00A`**

    Lists the application whose name starts with S on the WAS server AQSR00A.


