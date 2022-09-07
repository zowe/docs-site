# @botname application-group list request

List application-group request.

## Usage

`@botname application-group(ag) list request \*requestuserid options`

**Note:** You can type either `automation-group` or `ag` in the command.

## Positional arguments

-   **\*requestuserid**

    Positional arguments are used to specify the name of resource object.


## Options

-   **'--domain-name \(dn\) domain-name --system-name \(sn\) system-name --application-group-name \(agn\) application group name**

    Options are used to specify the location of resource object. Options are required for this command.


## Examples

-   **`@bnz application-group list request --domain-name “LPAR400J INGXSGSA” --system-name AOBC --application-group-name R#C16G1`**

    List the request of application-group R\#C16G1 on automation-domain “LPAR400J INGXSGSA” and system AOBC.

-   **`@bnz ag list request --dn “LPAR400J INGXSGSA” --sn AOBC --agn R#C16G1`**

    List the request of application-group R\#C16G1 on automation-domain “LPAR400J INGXSGSA” and system AOBC.

-   **`@bnz ag list request KE2EUSR --dn “LPAR400J INGXSGSA” --sn AOBC --agn R#C16G1`**

    List the request of application-group R\#C16G1 on automation-domain “LPAR400J INGXSGSA” and system AOBC whose request-user-id is KE2EUSR.


