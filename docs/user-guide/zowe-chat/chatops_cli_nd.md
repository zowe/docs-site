# @botname netview-domain

This command is used to operate on `NetView domain` to show status or canzlog.

## Syntax

```

1  @*botname*
2.1 netview-domain
2.1 nd
1  list
2.1?  status
2.1 
2.2.1 canzlog
2.1? *message*
2.1 
2.2.1 --domain-name
2.2.1 --dn
2.1 *domain\_name*
1?  --limit *number*
```



## Usage

-   **list**

    Shows the status or canzlog of NetView® domain.

    -   **status**

        Shows the status or details of NetView® domain. To narrow down returned results, you can specify the following positional argument.

        -   **domain\_name**

            This argument is OPTIONAL. It specifies the name of the target NetView® domain that you want to show. Wildcard character **\*** is supported.

    -   **canzlog**

        Shows all canzlogs on one NetView® domain. To narrow down returned results, you can specify the following positional argument.

        -   **message**

            This argument is OPTIONAL. It specifies the name of the target message that you want to show. Wildcard character **\*** is supported.

        You can also specify the following options.

        -   **--domain-name\|--dn domain\_name**

            This option is REQUIRED. It specifies the domain name of the target resource to narrow down the result.


## Examples

|Object|Command|Explanation|
|------|-------|-----------|
|status|`@bnz netview-domain list`|Shows the status of NetView domain.|
|`@bnz nd list status`|Shows the status of NetView domain.|
|canzlog|`@bnz netview-domain list canzlog --domain-name CNM19`|Shows the canzlog on the NetView domain CNM19.|
|`@bnz nd list canzlog --dn CNM19`|Shows the canzlog on the NetView domain CNM19.|
|`@bnz nd list canzlog IEC070I ICFCAT.VCAN001 --dn CNM19`|Shows the canzlog whose message is IEC070I ICFCAT.VCAN001 on the NetView domain CNM19.|
|`@bnz nd list canzlog IEC070I* --dn CNM19`|Shows the canzlog whose message starts with IEC070I on the NetView domain CNM19.|

