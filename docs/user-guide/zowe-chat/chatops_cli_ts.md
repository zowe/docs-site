# @botname teps-server

This command is used to operate on `Tivoli Enterprise Portal Server`\(TEPS\) server to show the status.

## Syntax

```

1 @*botname*
1 teps-server
1 ts
2  list
2 
3.1?  status? *teps\_server\_name*
2?  --limit *number*
```



## Usage

-   **list**

    Shows the status of TEPS servers.

    -   **status**

        Shows the status or details of TEPS servers. To narrow down returned results, you can specify the following positional argument.

        -   **teps\_server\_name\|ts**

            This argument is OPTIONAL. It specifies the name of the target TEPS server that you want to show. Wildcard character **\*** is supported.


## Examples

-   **`@bnz teps-server list`**

    Shows the status of the TEPS server.

-   **`@bnz ts list`**

    Shows the status of the TEPS server.

-   **`@bnz ts list status`**

    Shows the status of the TEPS server.

-   **`@bnz ts list status “Server #2”`**

    Shows the status of the TEPS server whose name is Server \#2.

-   **`@bnz ts list status S*`**

    Shows the status of all the TEPS server whose names start with S.


