# @botname default

This command is used to operate on default settings to show default status or set the value of automation domains, netview domains, engines or systems.

## Syntax

```

1 @*botname*  default 
2.1  list?  status? *keyname*
2.1  set
2.2.2.1 automation-domain
2.2.2.1 ad
2.2.2.1 netview-domain
2.2.2.1 nd
2.2.1 engine
2.2.1 system
2.1 *value*?  --limit *number*
```



## Usage

-   **list**

    Shows default status or details.

    -   **status**

        Shows the default status or details. To narrow down returned results, you can specify the following positional argument.

        -   **keyname**

            This positional argument is OPTIONAL. It specifies the name of the target key that you want to show.

-   **Set**

    Sets the default automation domain, netview domain, engine or system.

    -   **automation-domain\|ad**

        Sets the default automation domain. You must specify the following positional argument.

        -   **value**

            This argument is REQUIRED. It specifies the value of the automation domain.

    -   **netview-domain\|nd**

        Sets the default netview domain. You must specify the positional argument `value`.

        -   **value**

            This argument is REQUIRED. It specifies the value of the netview domain.

    -   **engine**

        Sets the default engine. You must specify the positional argument `value`.

        -   **value**

            This argument is REQUIRED. It specifies the value of the engine.

    -   **system**

        Sets the default system. You must specify the positional argument `value`.

        -   **value**

            This argument is REQUIRED. It specifies the value of the system.


## Example

-   **`@bnz default list`**

    Shows all defaults.

-   **`@bnz default list status`**

    Shows all defaults.

-   **`@bnz default list status smuAutomationDomain`**

    Shows specified default smuAutomationDomain.

-   **`@bnz default set automation-domain “LPAR400J INGXSGSA”`**

    Sets automation-domain LPAR400J INGXSGSA.

-   **`@bnz default set ad “LPAR400J INGXSGSA”`**

    Sets automation-domain LPAR400J INGXSGSA.

-   **`@bnz default set netview-domain NTV68`**

    Sets netview-domain NTV68.

-   **`@bnz default set nd NTV68`**

    Sets netview-domain NTV68.

-   **`@bnz default set engine IZWS`**

    Sets engine IZWS.

-   **`@bnz default set system SYSG`**

    Sets system SYSG.


