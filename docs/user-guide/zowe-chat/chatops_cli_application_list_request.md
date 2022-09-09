# @botname application list request

List application request.

## Usage

`@botname application list request \*requestuserid options`

## Positional arguments

-   **\*requestuserid**

    Positional arguments are used to specify the name of resource object.


## Options

-   **'--domain-name \(dn\) domain-name --system-name \(sn\) system-name --application-name \(an\) application name**

    Options are used to specify the location of resource object. Options are required for this command.


## Examples

-   **`@bnz application list request --domain-name “LPAR400J INGXSGSA” --system-name AOBC --application-name AM`**

    List the request of application AM on automation-domain “LPAR400J INGXSGSA” and system AOBC.

-   **`@bnz application list request --dn “LPAR400J INGXSGSA” --sn AOBC--an AM`**

    List the request of application AM on automation-domain “LPAR400J INGXSGSA” and system AOBC.

-   **`@bnz application list request KE2EUSR --dn“LPAR400J INGXSGSA” --sn AOBC --an AM`**

    List the request whose request-user-id is KE2EUSR of application AM on automation-domain “LPAR400J INGXSGSA” and system AOBC.

-   **`@bnz application list request KE2EUS* --dn“LPAR400J INGXSGSA” --sn AOBC --an AM`**

    List the request whose request-user-id starts with KE2EUS of application AM on automation-domain “LPAR400J INGXSGSA” and system AOBC.


