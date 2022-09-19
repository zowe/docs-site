# @botname system list status

List system status.

## Usage

`@botname system list status \*systemname options`

## Positional arguments

-   **\*systemname**

    Positional arguments are used to specify the name of resource object.


## Options

-   **--domain-name \(dn\) domain-name**

    Options are used to specify the location of resource object. Options are required for this command.


## Examples

-   **`@bnz system list status --domain-name “LPAR400J INGXSGSA”`**

    List system status on automation-domain “LPAR400J INGXSGSA”.

-   **`@bnz system list status AOBC --dn “LPAR400J INGXSGSA”`**

    List the status of system AOBC on automation-domain “LPAR400J INGXSGSA”.


