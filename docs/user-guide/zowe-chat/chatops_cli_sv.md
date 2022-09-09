# @botname storage-volume

This command is used to operate on `storage volume` to show the status or data sets.

## Syntax

```

1  @*botname*
2.1 stoage-volume
2.1 sv
1  list
2.1  status? *storage\_volume\_name* 
2.2.1 --storage-group-name
2.2.1 --sgn
2.1 *storage\_group\_name*
2.1  dataset? *dataset\_name* 
2.2.1 --storage-volume-name
2.2.1 --svn
2.1 *storage\_volume\_name*
1 
2.1 --address-space-name
2.1 --asn
1 *address\_space\_name*
1 
2.1 --smf-id
2.1 --si
1 *smf\_id*
1?  --limit *number*
```



## Usage

-   **list**

    Shows the status or data sets of storage volume.

    -   **status**

        Shows the status or details of storage volume. To narrow down returned results, you can specify the following positional argument.

        -   **storage\_volume\_name**

            This argument is OPTIONAL. It specifies the name of the target storage volume that you want to show. Wildcard character **\*** is supported.

        You can also specify the following option.

        -   **--storage-group-name\|--sgn storage\_group\_name**

            This option is REQUIRED. It specifies the storage group name of target resource to narrow down the result.

        -   **--address-space-name\|asn address\_space\_name**

            This option is REQUIRED. It specifies the name of the managed system address space of target resource to narrow down the result.

        -   **--smf-id\|si smf\_id**

            This option is REQUIRED. It specifies the SMF ID of target resource to narrow down the result.

    -   **dataset**

        Shows the data sets of storage volume. To narrow down returned results, you can specify the following positional argument.

        -   **dataset\_name**

            This argument is OPTIONAL. It specifies the name of the target data set that you want to show. Wildcard character **\*** is supported.

        You can also specify the following option.

        -   **--storage-volume-name\|--svn storage\_volume\_name**

            This option is REQUIRED. It specifies the storage volume name of target resource to narrow down the result.

        -   **--address-space-name\|asn address\_space\_name**

            This option is REQUIRED. It specifies the name of the managed system address space of target resource to narrow down the result.

        -   **--smf-id\|si smf\_id**

            This option is REQUIRED. It specifies the SMF ID of target resource to narrow down the result.


## Examples

-   **`@bnz storage-volume list status --storage-group-name DMGROUP --address-space-name CXEGDSST --smf-id MVST`**

    Shows the status of storage volume on the storage group DMGROUP of the managed system address space CXEGDSST on the system node MVST.

-   **`@bnz sv list status DMTD11 --sgn DMGROUP --asn CXEGDSST --si MVST`**

    Shows the status of the storage volume DMTD1 on the storage group DMGROUP of the managed system address space CXEGDSST on the system node MVST.

-   **`@bnz sv list status DMT* --sgn DMGROUP --asn CXEGDSST --si MVST`**

    Shows the status of the storage volume whose name starts with DMT on the storage group DMGROUP of the managed system address space CXEGDSST on the system node MVST.

-   **`@bnz storage-volume list dataset --storage-volume-name DMTD11 --address-space-name CXEGDSST --smf-id MVST`**

    Shows the data set of the storage volume DMTD11 of the managed system address space CXEGDSST on the system node MVST.

-   **`@bnz sv list dataset DLIB.IOA.AIOAWIN --svn DMTD11 --asn CXEGDSST --si MVST`**

    Shows the data set named DLIB.IOA.AIOAWIN of the storage volume DMTD11 of the managed system address space CXEGDSST on the system node MVST.

-   **`@bnz sv list dataset DLIB* --svn DMTD11 --asn CXEGDSST --si MVST`**

    Shows the data set whose name starts with DLIB of the storage volume DMTD11 of the managed system address space CXEGDSST on the system node MVST.


