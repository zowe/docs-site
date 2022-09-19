# @botname application list relation

List application relation.

## Usage

`@botname application list relation \*target options`

## Positional arguments

-   **\*target**

    Positional arguments are used to specify the name of resource object.


## Options

-   **'--domain-name \(dn\) domain-name --system-name \(sn\) system-name --application-name \(an\) application name**

    Options are used to specify the location of resource object. Options are required for this command.


## Examples

-   **`@bnz application list relation --domain-name “LPAR400J INGXSGSA” --system-name AOBC --application-name AM`**

    List the relation of application AM on automation-domain “LPAR400J INGXSGSA” and system AOBC.

-   **`@bnz application list relation --dn “LPAR400J INGXSGSA” -sn AOBC --an AM`**

    List the relation of application AM on automation-domain “LPAR400J INGXSGSA” and system AOBC.

-   **`@bnz application list relation AM2 --dn “LPAR400J INGXSGSA” --sn AOBC --an AM`**

    List the relation of application AM on automation-domain “LPAR400J INGXSGSA” and system AOBC which target is AM2.

-   **`@bnz application list relation A*1 --dn “LPAR400J INGXSGSA” --sn AOBC --an AM`**

    List the relation of application AM on automation-domain “LPAR400J INGXSGSA” and system AOBC, which target name starts with A and ends with 1.


