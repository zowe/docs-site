# @botname default

This command is used to show default status and set the value of automation domain, netview domain and system.

## Syntax

```

1 @*botname*  default 
2.1  list?  status? *keyname*
2.1  set
2.2.2.1 automation-domain
2.2.2.1 ad
2.2.2.1 netview-domain
2.2.2.1 nd
2.2.1 system
2.1 *value*?  --limit *number*
```



## Action

The commands to interact with the default resource support the following `action` elements.

-   **list**

    Lists the default information

-   **set**

    Sets the default information


## Object

The command action `list` can be followed by the following `object` element.

-   **status**

    Lists default status.


The command action `set` must be followed by one of the following `object` elements.

-   **automation-domain**

    Sets default automation-domain.

-   **ad**

    Sets default automation-domain. It has the same function as `--automation-domain`.

-   **netview-domain**

    Sets netview-domain.

-   **nd**

    Sets netview-domain. It has the same function as `--netview-domain`.

-   **system**

    Sets system.


## Positional arguments

-   **keyname**

    Specifies the name of the `status` object. You can specify this positional argument after the command object `status`. If this positional argument is not specified, the object `status` can be omitted for listing all defaults.

-   **value**

    Specifies the name of the object following the command action `set`.


## Example

-   **`@bnz default list`**

    Lists all defaults.

-   **`@bnz default list status`**

    Lists all defaults.

-   **`@bnz default list status smuAutomationDomain`**

    Lists specified default smuAutomationDomain.

-   **`@bnz default set automation-domain “LPAR400J INGXSGSA”`**

    Sets automation-domain “LPAR400J INGXSGSA”.

-   **`@bnz default set ad “LPAR400J INGXSGSA”`**

    Sets automation-domain “LPAR400J INGXSGSA”.

-   **`@bnz default set netview-domain NTV68`**

    Sets netview-domain NTV68.

-   **`@bnz default set nd NTV68`**

    Sets netview-domain NTV68.

-   **`@bnz default set system SYSG`**

    Sets system SYSG.


