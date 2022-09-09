# @botname automation-domain list system

List automation-domain system.

## Usage

`@botname automation-domain(ad) list system \*systemname options`

**Note:** You can type either `automation-domain` or `ad` in the command.

## Positional arguments

-   **\*systemname**

    Positional arguments are used to specify the name of resource object.


## Options

-   **--domain-name \(dn\) domain-name**

    Options are used to specify the location of resource object. Options are required for this command.


## Examples

-   **`@bnz automation-domain list system --domain-name “LPAR400J INGXSGSA”`**

    List all systems on automation-domain “LPAR400J INGXSGSA”.

-   **`@bnz ad list system AOBC --dn “LPAR400J INGXSGSA”`**

    List system AOBC on automation-domain “LPAR400J INGXSGSA”.

-   **`@bnz ad list system AO* --dn “LPAR400J INGXSGSA”`**

    List system whose name start with AO on automation-domain “LPAR400J INGXSGSA”.


