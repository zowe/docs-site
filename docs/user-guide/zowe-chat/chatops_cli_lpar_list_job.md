# @botname lpar list job

List lpar job.

## Usage

`@botname lpar list job \*jobname options`

## Positional arguments

-   **\*jobname**

    Positional arguments are used to specify the name of resource object.


## Options

-   **--lpar-name \(ln\) lpar name**

    Options are used to specify the location of resource object. Options are required for this command.


## Examples

-   **`@bnz lpar list job --lpar-name EXT1MVS`**

    List all jobs.

-   **`@bnz lpar list job ENQ2 --ln EXT1MVS`**

    List the job named ENQ2on lpar EXT1MVS.

-   **`@bnz lpar list job ENQ* --ln EXT1MVS`**

    List the job of lpar EXT1MVS whose name starts with ENQ.


