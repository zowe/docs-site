# @botname db2

This command is used to operate on `Db2` to show the status or buffer pools.

## Syntax

```

1  @*botname*
2.1 db2
1  list
2.1?  status? *db2\_id*
2.1 
2.2.1 buffer-pool
2.2.1 bp
2.1? *pool\_id*
2.1 
2.2.1 --db2-id
2.2.1 --di
2.1 *db2\_id*
2.1 
2.2.1 --smf-id
2.2.1 --si
2.1 *smf\_id*
1?  --limit *number*
```



## Usage

-   **list**

    Shows Db2® status or buffer pools.

    -   **status**

        Shows the status or details of Db2®. To narrow down returned results, you can specify the following positional argument.

        -   **db2\_id**

            This argument is OPTIONAL. It specifies the ID of the target Db2® that you want to show. Wildcard character **\*** is supported.

    -   **buffer-pool\|bp**

        Shows the buffer pools on Db2®. To narrow down returned results, you can specify the following positional argument.

        -   **pool\_id**

            This argument is OPTIONAL. It specifies the ID of the target pool that you want to show. Wildcard character **\*** is supported.

        You can also specify the following option.

        -   **--db2-id\|--di db2\_id**

            This option is REQUIRED. It specifies the Db2® ID of target resource to narrow down the result.

        -   **--smf-id\|si smf\_id**

            This option is REQUIRED. It specifies the SMF ID of target resource to narrow down the result.


## Examples

-   **`@bnz db2 list`**

    Shows the status of Db2®.

-   **`@bnz db2 list status`**

    Shows the status of Db2®.

-   **`@bnz db2 list status DSNT`**

    Shows the status of the Db2® whose ID is DSNT.

-   **`@bnz db2 list status D*T`**

    Shows the status of the Db2® whose ID starts with D and ends with T.

-   **`@bnz db2 list buffer-pool --db2-id DSNT --smf-id MVST`**

    Shows all the buffer pools on the Db2® whose ID is DSNT on the system node MVST.

-   **`@bnz db2 list bp BP32K --di DSNT --si MVST`**

    Shows the buffer pool whose ID is BP32K on the Db2® whose ID is DSNT on the system node MVST.

-   **`@bnz db2 list bp BP32* --di DSNT --si MVST`**

    Shows the buffer pool whose ID starts with BP32 on the Db2® whose ID is DSNT on the system node MVST.


