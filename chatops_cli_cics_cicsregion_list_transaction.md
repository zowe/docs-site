# @botname cics cics-region list transaction

List the transaction of cics-region.

## Usage

`@botname cics-region(cr) list status \*transactionId options`

**Note:** You can type either `cics-region` or `cr` in the command.

## Positional arguments

-   **\*transactionId**

    Positional arguments are used to specify the name of resource object.


## Options

-   **--cicsplex-name \(cpn\) cicsplex name --cics-region-name \(crn\) region name**

    Options are used to specify the location of resource object. Options are required for this type of command.


## Examples

-   **`@bnz cics-region list transaction --cicsplex-name CICSPLX1 --cics-region-name CICSAOR1`**

    List all the transactions of cics-region CICSAOR1 on cicsplex CICSPLX1.

-   **`@bnz cr list transaction DBIC --cpn CICSPLX1 --crn CICSAOR1`**

    List the transaction DBIC of cics-region CICSAOR1 on cicsplex CICSPLX1.

-   **`@bnz cr list transaction DBI* ---cpn CICSPLX1 --crn CICSAOR1`**

    List the transaction of cics-region CICSAOR1 on cicsplex CICSPLX1 whose name starts with DBI.


