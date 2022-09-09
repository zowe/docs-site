# @botname cicsplex

This command is used to operate on `CICSplex` to show the status.

## Syntax

```

1 @*botname*
1 cicsplex
1 cp
2  list
2?  status? *cicsplex\_name*
2?  --limit *number*
```



## Usage

-   **list**

    Shows the status of CICSplex.

    -   **status**

        Shows the status or details of CICSplex. To narrow down returned results, you can specify the following positional argument.

        -   **cicsplex\_name**

            This argument is OPTIONAL. It specifies the name of the target CICSplex that you want to show. Wildcard character **\*** is supported.


## Examples

-   **`@bnz cicsplex list`**

    Shows the status of CICSplex.

-   **`@bnz cp list`**

    Shows the status of CICSplex.

-   **`@bnz cp list status`**

    Shows the status of CICSplex.

-   **`@bnz cp list status OMEGPLEX`**

    Shows the status of CICSplex whose name is OMEGPLEX.

-   **`@bnz cp list status *PLX`**

    Shows the status of CICSplex whose name ends with PLX.


