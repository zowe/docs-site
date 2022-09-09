# @botname storage-group

This command is used to operate on `storage group` to show the status.

## Syntax

```

1 @*botname*
1 storage-group
1 sg
2  list
2?  status? *storage\_group\_name*
2?  --limit *number*
```



## Usage

-   **list**

    Shows the status of storage group.

    -   **status**

        Shows the status or details of storage group. To narrow down returned results, you can specify the following positional argument.

        -   **storage\_group\_name**

            This argument is OPTIONAL. It specifies the name of the target storage group that you want to show. Wildcard character **\*** is supported.


## Examples

-   **`@bnz storage-group list`**

    Shows the status of storage group.

-   **`@bnz sg list`**

    Shows the status of storage group.

-   **`@bnz sg list status`**

    Shows the status of storage group.

-   **`@bnz sg list status DMGROUP`**

    Shows the status of the storage group whose name is DMGROUP.

-   **`@bnz sg list status *GROUP`**

    Shows the status of the storage group whose name ends with GROUP.


