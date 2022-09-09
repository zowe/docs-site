# @botname jvm list lock

List jvm lock.

## Usage

`@botname jvm list lock \*jobname options`

## Positional arguments

-   **\*jobname**

    Positional arguments are used to specify the name of resource object.


## Options

-   **--jvm-process-id \(jpi\) jvm process id**

    Options are used to specify the location of resource object. Options are required for this command.


## Examples

-   **`@bnz jvm list lock --jvm-process-id 121273`**

    List the lock of jvm-process-id 121273.

-   **`@bnz jvm list lock ING3 --jpi 121273`**

    List the lock ING3 of jvm-process-id 121273.

-   **`@bnz jvm list lock ING* --jpi 121273`**

    List the lock of jvm-process-id 121273 whose name start with ING.


