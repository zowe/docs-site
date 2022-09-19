# @botname db2 list buffer-pool

List Db2 buffer-pools.

## Usage

`@botname db2 list buffer-pool(bp) \*poolid options`

**Note:** You can type either `buffer-pool` or `bp` in the command.

## Positional arguments

-   **\*poolid**

    Positional arguments are used to specify the name of resource object.

    **Note:** **\*** is a wildcard character that you can use to search for buffer-pool with certain characters in the name. **\*** refers to unlimited characters.


## Options

-   **--db2-id \(di\) db2 id**

    Options are used to specify the location of resource object. Options are required for this command.


## Examples

-   **`@bnz db2 list buffer-pool --db2-id DSNT`**

    List all the buffer-pool of db2 DSNT.

-   **`@bnz db2 list bp BP32K --di DSNT`**

    List the buffer-pool named BP32K of db2 DSNT.

-   **`@bnz db2 list bp BP32* --di DSNT`**

    List the buffer-pool of db2 DSNT whose name starts with BP32.


