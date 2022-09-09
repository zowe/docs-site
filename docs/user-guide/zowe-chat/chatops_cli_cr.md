# @botname cics-region

This command is used to operate on `CICS region` to show the status or transactions.

## Syntax

```

1  @*botname*
2.1 cics-region
2.1 cr
1  list
2.1  status? *region\_name*
2.1  transaction? *transaction\_id* 
2.2.1 --cics-region-name
2.2.1 --crn
2.1 *region\_name* 
2.2.1 --smf-id
2.2.1 --si
2.1 *smf\_id*
1 
2.1 --cicsplex-name
2.1 --cpn
1 *cicsplex\_name*
1?  --limit *number*
```



## Usage

-   **list**

    Shows the status or transactions of CICS® region.

    -   **status**

        Shows the status or details of CICS® region. To narrow down returned results, you can specify the following positional argument.

        -   **region\_name**

            This argument is OPTIONAL. It specifies the name of the CICS® region that you want to show. Wildcard character **\*** is supported.

        You can also specify the following option.

        -   **--cicsplex-name\|--cpn cicsplex\_name**

            This option is REQUIRED. It specifies the CICSplex name of target resource to narrow down the result.

    -   **transaction**

        Shows all transactions of CICS® region. To narrow down returned results, you can specify the following positional argument.

        -   **transaction\_id**

            This argument is OPTIONAL. It specifies the name of the transaction that you want to show. Wildcard character **\*** is supported.

        You can also specify the following options.

        -   **--cicsplex-name\|--cpn cicsplex\_name**

            This option is REQUIRED. It specifies the CICSplex name of target resource to narrow down the result.

        -   **--cics-region-name\|--crn region\_name**

            This option is REQUIRED. It specifies the CICS® region name of target resource to narrow down the result.

        -   **--smf-id\|si smf\_id**

            This option is REQUIRED. It specifies the SMF ID of target resource to narrow down the result.


## Examples

-   **`@bnz cics-region list status --cicsplex-name CICSPLX1`**

    Shows the status of CICS® region on the CICSplex named CICSPLX1.

-   **`@bnz cr list status CICSAOR1 --cpn CICSPLX1`**

    Shows the status of the CICS® region named CICSAOR1 on the CICSplex named CICSPLX1.

-   **`@bnz cr list status CICSAOR* --cpn CICSPLX1`**

    Shows the status of the CICS® region whose name starts with CICSAOR on the CICSplex named CICSPLX1.

-   **`@bnz cics-region list transaction --cicsplex-name CICSPLX1 --cics-region-name CICSAOR1 --smf-id MVST`**

    Shows all the transactions of the CICS® region named CICSAOR1 on the CICSplex named CICSPLX1 on the system node MVST.

-   **`@bnz cr list transaction DBIC --cpn CICSPLX1 --crn CICSAOR1 --si MVST`**

    Shows the transaction whose ID is DBIC of the CICS® region named CICSAOR1 on the CICSplex named CICSPLX1 on the system node MVST.

-   **`@bnz cr list transaction DBI* ---cpn CICSPLX1 --crn CICSAOR1 --si MVST`**

    Shows the transaction, whose ID starts with DBI, of the CICS® region named CICSAOR1 on the CICSplex named CICSPLX1 on the system node MVST.


