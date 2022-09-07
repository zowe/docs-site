# @botname lpar

This command is used to operate on `LPAR` to show the status or jobs.

## Syntax

```

1 @*botname*
1 lpar
2  list
1?  status? *lpar\_name*
1 
2.1 job
1? *job\_name*
1 
2.1 --lpar-name
2.1 --ln
1 *lpar\_name*
1 
2.1 --sysplex-name
2.1 --spn
1 *sysplex\_name*
1 
2.1 --smf-id
2.1 --si
1 *smf\_id*
3?  --limit *number*
```



## Usage

-   **list**

    Shows the status or jobs of LPAR.

    -   **status**

        Shows the status or details of LPAR. To narrow down returned results, you can specify the following positional argument.

        -   **lpar\_name**

            This argument is OPTIONAL. It specifies the name of the target LPAR that you want to show. Wildcard character **\*** is supported.

    -   **job**

        Shows the jobs on LPAR. To narrow down returned results, you can specify the following positional argument.

        -   **job\_name**

            This argument is OPTIONAL. It specifies the name of the target job that you want to show. Wildcard character **\*** is supported.

        You can also specify the following option.

        -   **--lpar-name\|--ln lpar\_name**

            This option is REQUIRED. It specifies the LPAR name of target resource to narrow down the result.

        -   **--sysplex-name\|spn sysplex\_name**

            This option is REQUIRED. It specifies the sysplex name of target resource to narrow down the result.

        -   **--smf-id\|si smf\_id**

            This option is REQUIRED. It specifies the SMF ID of target resource to narrow down the result.


## Examples

-   **`@bnz lpar list`**

    Shows the status of LPAR.

-   **`@bnz lpar list status`**

    Shows the status of LPAR.

-   **`@bnz lpar list status ext1mvs`**

    Shows the status of the LPAR named EXT1MVS.

-   **`@bnz lpar list status ext1*vs`**

    Shows the status of the LPAR whose name starts with EXT1 and ends with VS.

-   **`@bnz lpar list job --lpar-name EXT1MVS --sysplex-name TESTPLX --smf-id MVST`**

    Shows all jobs on the LPAR named EXT1MVS of the sysplex named TESTPLX on the system node MVST.

-   **`@bnz lpar list job ENQ2 --ln EXT1MVS --spn TESTPLX --si MVST`**

    Shows the job named ENQ2 on the LPAR named EXT1MVS of the sysplex named TESTPLX on the system node MVST.

-   **`@bnz lpar list job ENQ* --ln EXT1MVS --spn TESTPLX --si MVST`**

    Shows the job whose name starts with ENQ on the LPAR named EXT1MVS of the sysplex named TESTPLX on the system node MVST.


