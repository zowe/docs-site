# @botname storage storage-volume list status

List storage-volume status.

## Usage

`@botname storage-volume(sv) list status\*storagevolumename options`

**Note:** You can type either `storage-volume` or `sv` in the command.

## Positional arguments

-   **\*storagevolumename**

    Positional arguments are used to specify the name of resource object.


## Options

-   **--storage-group-name \(sgn\) storage group name**

    Options are used to specify the location of resource object. Options are required for this command.


## Examples

-   **`@bnz storage-volume list status --storage-group-name DMGROUP`**

    List storage-volume status of storage-group DMGROUP.

-   **`@bnz sv list status DMTD11 --sgn DMGROUP`**

    List the status of storage-volume DMTD1 of storage-group DMGROUP.

-   **`@bnz sv list status DMT* --sgn DMGROUP`**

    List the status of storage-volume whose name starts with DMT of storage-group DMGROUP.


