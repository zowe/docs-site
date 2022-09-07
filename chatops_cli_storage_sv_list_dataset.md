# @botname storage storage-volume list dataset

List storage-volume dataset.

## Usage

`@botname storage-volume(sv) list dataset\*datasetname options`

**Note:** You can type either `storage-volume` or `sv` in the command.

## Positional arguments

-   **\*datasetname**

    Positional arguments are used to specify the name of resource object.


## Options

-   **--storage-group-name \(sgn\) storage group name --storage-volume-name \(svn\) storage volume name**

    Options are used to specify the location of resource object. Options are required for this command.


## Examples

-   **`@bnz storage-volume list dataset --storage-group-name DMGROUP --storage-volume-name DMTD11`**

    List the dataset of storage-volume DMTD11 of storage-group DMGROUP.

-   **`@bnz sv list dataset DLIB.IOA.AIOAWIN --sgn DMGROUP --svn DMTD11`**

    List the dataset DLIB.IOA.AIOAWIN of storage-volume DMTD11 of storage-group DMGROUP.

-   **`@bnz sv list dataset DLIB* --sgn DMGROUP --svn DMTD11`**

    List the dataset that name starts with DLIB of storage-volume DMTD11 of storage-group DMGROUP.


