# @botname application list status

List application status.

## Usage

`@botname application list status \*applicationname options`

## Positional arguments

-   **\*applicationname**

    Positional arguments are used to specify the name of resource object.


## Options

-   **--domain-name \(dn\) domain-name --system-name \(sn\) system-name**

    Options are used to specify the location of resource object. Options are required for this command.


## Examples

-   **`@bnz application list status --domain-name “LPAR400J INGXSGSA” --system-name AOBC`**

    List application status on automation-domain “LPAR400J INGXSGSA” and system AOBC.

-   **`@bnz application list status AM --dn “LPAR400J INGXSGSA” --sn AOBC`**

    List the status of application AM on automation-domain “LPAR400J INGXSGSA” and system AOBC.

-   **`@bnz application list status A* --dn “LPAR400J INGXSGSA” --sn AOBC`**

    List the status of application on automation-domain “LPAR400J INGXSGSA” and system AOBC whose name starts with A.


