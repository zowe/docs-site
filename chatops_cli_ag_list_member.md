# @botname application-group list member

List application-group member.

## Usage

`@botname application-group(ag) list member \*membername options`

**Note:** You can type either `automation-group` or `ag` in the command.

## Positional arguments

-   **\*membername**

    Positional arguments are used to specify the name of resource object.


## Options

-   **--domain-name \(dn\) domain-name --system-name \(sn\) system-name --application-group-name \(agn\) application group name**

    Options are used to specify the location of resource object. Options are required for this command.


## Examples

-   **`@bnz application-group list member --domain-name “LPAR400J INGXSGSA” --system-name AOBC --application-group-name R#C16G1`**

    List the member of application-group R\#C16G1 on automation-domain “LPAR400J INGXSGSA” and system AOBC.

-   **`@bnz ag list member --dn “LPAR400J INGXSGSA” --sn AOBC --agn R#C16G1`**

    List the member of application-group R\#C16G1 on automation-domain “LPAR400J INGXSGSA” and system AOBC.

-   **`@bnz ag list member AM2 --dn “LPAR400J INGXSGSA” --sn AOBC --agn R#C16G1`**

    List the member AM2 of application-group R\#C16G1 on automation-domain “LPAR400J INGXSGSA” and system AOBC.

-   **`@bnz ag list member AM* --dn “LPAR400J INGXSGSA” --sn AOBC --agn R#C16G1`**

    List the member of application-group R\#C16G1 on automation-domain “LPAR400J INGXSGSA” and system AOBC, whose name starts with AM.


