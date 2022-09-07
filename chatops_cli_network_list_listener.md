# @botname network list listener

List network listeners.

## Usage

`@botname network list listener \*portnumber options`

## Positional arguments

-   **\*portnumber**

    Positional arguments are used to specify the name of resource object.


## Options

-   **--network-job-name \(njn\) network job name**

    Options are used to specify the location of resource object. Options are required for this command.


## Examples

-   **`@bnz network list listener --network-job-name IBMSM`**

    List all listeners of network job IBMSM.

-   **`@bnz network list listener 4035 --njn IBMSM`**

    List the listener 4035 of network job IBMSM.

-   **`@bnz network list listener 403* --njn IBMSM`**

    List the listener which name starts with 403 of network job IBMSM.


