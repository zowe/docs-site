# @botname application-group list status

List application-group status.

## Usage

`@botname application-group(ag) list status \*applicationgroupname options`

**Note:** You can type either `automation-group` or `ag` in the command.

## Positional arguments

-   **\*applicationgroupname**

    Positional arguments are used to specify the name of resource object.


## Options

-   **--domain-name \(dn\) domain-name --system-name \(sn\) system-name**

    Options are used to specify the location of resource object. Options are required for this command.


## Examples

-   **`@bnz application-group list status --domain-name “LPAR400J INGXSGSA” --system-name AOBC`**

    List application-group status on automation-domain “LPAR400J INGXSGSA” and system AOBC.

-   **`@bnz ag list status --dn “LPAR400J INGXSGSA” --sn AOBC`**

    List application-group status on automation-domain “LPAR400J INGXSGSA” and system AOBC.

-   **`@bnz ag list statusR#C16G1--dn “LPAR400J INGXSGSA” --sn AOBC`**

    List the status of application-group "R\#C16G1" on automation-domain “LPAR400J INGXSGSA” and system AOBC.

-   **`@bnz ag list status R#C16G* --dn “LPAR400J INGXSGSA” --sn AOBC`**

    List the status of application-group on automation-domain “LPAR400J INGXSGSA” and system AOBC whose name starts with R\#C16G.


