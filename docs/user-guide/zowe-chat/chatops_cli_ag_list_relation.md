# @botname application-group list relation

List application-group relation.

## Usage

`@botname application-group(ag) list relation \*target options`

**Note:** You can type either `automation-group` or `ag` in the command.

## Positional arguments

-   **\*target**

    Positional arguments are used to specify the name of resource object.


## Options

-   **'--domain-name \(dn\) domain-name --system-name \(sn\) system-name --application-group-name \(agn\) application group name**

    Options are used to specify the location of resource object. Options are required for this command.


## Examples

-   **`@bnz application-group list relation --domain-name “LPAR400J INGXSGSA” --system-name AOBC --application-group-name R#C16G1`**

    List the relation of application-group R\#C16G1 on automation-domain “LPAR400J INGXSGSA” and system AOBC.

-   **`@bnz ag list relation --dn “LPAR400J INGXSGSA” --sn AOBC --agn R#C16G1`**

    List the relation of application-group R\#C16G1 on automation-domain “LPAR400J INGXSGSA” and system AOBC.

-   **`@bnz ag list relation AM2 --dn “LPAR400J INGXSGSA” --sn AOBC --agn R#C16G1`**

    List the relation of application-group R\#C16G1 on automation-domain “LPAR400J INGXSGSA” and system AOBC which target is AM2.

-   **`@bnz ag list relation AM* --dn “LPAR400J INGXSGSA” --sn AOBC --agn R#C16G1`**

    List the relation of application-group R\#C16G1 on automation-domain “LPAR400J INGXSGSA” and system AOBC, which target name starts with AM.


