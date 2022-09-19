# @botname automation-domain list resource

List automation-domain resource.

## Usage

`@botname automation-domain(ad) list resource \*resourcename options`

**Note:** You can type either `automation-domain` or `ad` in the command.

## Positional arguments

-   **\*resourcename**

    Positional arguments are used to specify the name of resource object.


## Options

-   **--domain-name \(dn\) domain-name --compound-state \(cs\) compoundstate --resource-class \(rc\) apl \| apg \| mtr --automation-nature \(an\) basic \| move \| server**

    Options are used to specify the location of resource object. In the option item, `--domain-name (dn) domain-name` is required.


## Examples

-   **`@bnz automation-domain list resource --domain-name “LPAR400J INGXSGSA” --compound-state error --resource-class apg --automation-nature basic`**

    List the resource which is basic apg in error state on automation-domain “LPAR400J INGXSGSA”.

-   **`@bnz ad list resource AM2--dn “LPAR400J INGXSGSA” --cs error --rc apg --an basic`**

    List the resource AM2 which is basic apg in error state on automation-domain “LPAR400J INGXSGSA”.

-   **`@bnz ad list resource AM*--dn “LPAR400J INGXSGSA” --cs error --rc apg --an basic`**

    List the resource whose name starts with AM and is basic apg in error state on automation-domain “LPAR400J INGXSGSA”.


