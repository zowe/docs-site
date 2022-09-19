# @botname automation-domain list status

List automation-domain status.

## Usage

`@botname automation-domain(ad) list status \*domainname options`

**Note:** You can type either `automation-domain` or `ad` in the command.

## Positional arguments

-   **\*domainname**

    Positional arguments are used to specify the name of resource object.


## Options

-   **--adapter e2e \| uaa**

    Options are used to specify the location of resource object.


## Examples

-   **`@bnz automation-domain list status`**

    List automation-domain status on all adapters.

-   **`@bnz ad list status --adaper e2e`**

    List automation-domain status on adapter e2e.

-   **`@bnz ad list status --adapter uaa`**

    List automation-domain status on adapter uaa.


