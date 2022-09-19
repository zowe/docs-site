# @botname engine

This command is used to operate on engine to show the status.

## Syntax

```

1 @*botname*  engine 
2.1  list
2.2.1?  status? *engine\_name*?  --limit *number*
```



## Usage

-   **list**

    Shows the status of engines.

    -   **status**

        Shows the status or details of engines. To narrow down returned results, you can specify the following positional argument.

        -   **engine\_name**

            This argument is OPTIOINAL. It specifies the name of the target engine that you want to show. Wildcard character **\*** is supported.


## Example

-   **`@bnz engine list`**

    Shows the status of the engine.

-   **`@bnz engine list status`**

    Shows the status of the engine.

-   **`@bnz engine list status SAT1IWS`**

    Shows the status of the engine whose name is SAT1IWS.

-   **`@bnz engine list status SAT1IW*`**

    Shows the status of all the engines whose names start with SAT1IW.


