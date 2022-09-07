# @botname ims

This command is used to operate on `Information Management System`\(IMS\) to show the status or regions.

## Syntax

```

1  @*botname*
2.1 ims
1  list
2.1?  status? *ims\_id*
2.1 
2.2.1 region
2.1? *ims\_region\_name*
2.1 
2.2.1 --ims-id
2.2.1 --ii
2.1 *ims\_id*
1?  --limit *number*
```



## Usage

-   **list**

    Shows IMS status or regions.

    -   **status**

        Shows the status or details of IMS. To narrow down returned results, you can specify the following positional argument.

        -   **ims\_id**

            This argument is OPTIONAL. It specifies the ID of the target IMS that you want to show. Wildcard character **\*** is supported.

    -   **region**

        Shows the regions of IMS. To narrow down returned results, you can specify the following positional argument.

        -   **ims\_region\_name**

            This argument is OPTIONAL. It specifies the name of the target IMS region that you want to show. Wildcard character **\*** is supported.

        You can also specify the following option.

        -   **--ims-id\|--ii ims\_id**

            This option is REQUIRED. It specifies the IMS ID of target resource to narrow down the result.


## Examples

-   **`@bnz ims list`**

    Shows the status of IMS.

-   **`@bnz ims list status`**

    Shows the status of IMS.

-   **`@bnz ims list status IMSA`**

    Shows the status of the IMS whose ID is IMSA.

-   **`@bnz ims list status IMS*`**

    Shows the status of the IMS whose ID starts with IMS.

-   **`@bnz ims list region --ims-id IMSA`**

    Shows all regions of the IMS whose ID is IMSA.

-   **`@bnz ims list region IMSADLI --ii IMSA`**

    Shows the region named IMSADLI of the IMS whose ID is IMSA.

-   **`@bnz ims list region IMS* --ii IMSA`**

    Shows the region whose name starts with IMS of the IMS whose ID is IMSA .


