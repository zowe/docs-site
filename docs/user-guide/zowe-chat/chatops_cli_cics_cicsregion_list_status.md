# @botname cics cics-region list status

List the status of cics-region.

## Usage

`@botname cics-region(cr) list status \*regionname options`

**Note:** You can type either `cics-region` or `cr` in the command.

## Positional arguments

-   **\*regionname**

    Positional arguments are used to specify the name of resource object.


## Options

-   **--cicsplex-name \(cpn\) cicsplex name**

    Options are used to specify the location of resource object. Options are required for this command.


## Examples

-   **`@bnz cics-region list status --cicsplex-name CICSPLX1`**

    List cics-region status on cicsplex CICSPLX1.

-   **`@bnz cr list status CICSAOR1 --cpn CICSPLX1`**

    List the status of cics-region CICSAOR1 on cicsplex CICSPLX1.

-   **`@bnz cr list status CICSAOR* --cpn CICSPLX1`**

    List the status of cics-region whose name starts with CICSAOR on cicsplex CICSPLX1.


