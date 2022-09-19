# @botname system list resource

List system resource.

## Usage

`@botname system list resource \*resourcename options`

## Positional arguments

-   **\*resourcename**

    Positional arguments are used to specify the name of resource object.


## Options

-   **--domain-name \(dn\) domain-name --system-name \(sn\) system-name --compoundstate \(cs\) compound-state --resource-class \(rc\) apl \| apg \| mtr**

    Options are used to specify the location of resource object. In the option item, `--domain-name (dn) domain-name --system-name (sn) system-name` is required.


## Examples

-   **`@bnz system list resource --domain-name “LPAR400J INGXSGSA” --system-name AOBC --compound-state error --resource-class apg --automation-nature basic`**

    List the resource which is basic apg in error state on automation-domain “LPAR400J INGXSGSA” and system AOBC.

-   **`@bnz system list resource AM --dn “LPAR400J INGXSGSA” --sn AOBC --cs error --rc apg --an basic`**

    List the resource AM which is basic apg in error state on automation-domain “LPAR400J INGXSGSA”.

-   **`@bnz system list resource AM* --dn “LPAR400J INGXSGSA” --sn AOBC --cs error --rc apg --an basic`**

    List the resource whose name starts with AM and is basic apg in error state on automation-domain “LPAR400J INGXSGSA” and system AOBC.


