# @botname help

This command is used to show inline help for commands.

## Syntax

```

1 @*botname*  help 
2.1?  list
2.2.1?  command? *resource\_name*
2.2.2.1 version
```



## Usage

-   **list**

    Shows available commands or version details.

    -   **command**

        Shows the list of available commands for all resources. To see the usage and examples of specific resource, you can click the resource item to filter or to specify the available resource with the resource name in the command directly.

        -   **resource\_name**

            This value is OPTIONAL. It specifies the name of the target resource that you want to show.

            **Note:** You can see the usage and examples of the specified command. In the **Usage** section, values in the square brackets are optional for this command.

    -   **version**

        Shows the version, build number and build date of the current version of product.


## Example

-   **`@bnz help`**

    Shows all resources.

-   **`@bnz help list command`**

    Shows all resources.

-   **`@bnz help list command system`**

    Shows usage and examples of the system commands.

-   **`@bnz help list command automation-domain`**

    Shows usage and examples of the automation domain commands.

-   **`@bnz help list version`**

    Shows the version, build number and build date of the current version of product.


**Parent topic:**[IBM Z ChatOps Commands](chatops_cli_cli.md)

