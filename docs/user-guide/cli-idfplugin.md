# IDF Plug-in for Zowe CLI

The IDF Plug-in for Zowe CLI lets you extend Zowe CLI to make it easier to map mainframe users with an identity provided by an external identity provider.

The plug-in is designed to work with the ESMs: IBM RACF, ACF/2, and Top Secret.

## Use case

For a system administrator for the Zowe API Mediation Layer, the IDF Plug-in for Zowe CLI can help facilitate the mapping of an external identity from a distributed identity provider to mainframe users administered by the system ESM.

## Commands

The plug-in provides the `map` command. For details about the map command, see [Using](#using).

:::note

The plug-in `help` command includes specific parameters of Zowe-profiles which are not used.

:::

## Software requirements

Before you install the plug-in, ensure that you meet the software requirements in [Software requirements for Zowe CLI plug-ins](cli-swreqplugins.md).

## Installing

Use one of the following methods to install or update the plug-in:

- [Installing plug-ins from an online registry](cli-installplugins.md#installing-plug-ins-from-an-online-registry)

- [Installing plug-ins from a local package](cli-installplugins.md#installing-plug-ins-from-a-local-package)

Use the following Plug-in ID with either of these installation methods:

| Plug-in | Syntax |
|---------|-----------------------------|
| IDF Plugin for Zowe CLI | `@zowe/id-federation-for-zowe-cli` |

## Using

Currently, the plug-in does not interface with the mainframe system, so no Zowe CLI profile configuration is required.

For the most up-to-date details of required parameters, use the `help` command:

 `zowe idf map --help`.

Use the following command to enable Zowe to generate a JCL. A security administrator can then submit this JCL to create a mapping.

`zowe idf map <csv-file> --esm <esm> --registry <registry> --system <system>`

- **csv-file**  
The path to the input CSV-formatted file, see below for the details of the format.

- **esm**  
The identifier of the target external security manager, one of ACF2, RACF, or TSS.

- **registry**  
The registry to identify the distributed identity provider, for example LDAP `ldap://12.34.56.78:389`

- **system**  
This is an optional parameter, system identifier for JCL purposes. Ensure that this value matches the system name defined in JES.

### CSV Format

For proper functionality of the plug-in, ensure that the CSV input file has the following format without a header:

```csv
name, dist_id, mf_id
```

- **name**  
The descriptive name of the user.

- **dist_id**  
The distributed identity of the user.

- **mf_id**  
The mainframe id of the user.

### Output

The `map` command generates an output file with a valid JCL. The output file name has the following pattern:

`idf_$ESM$SYSTEM.jcl`

- **$SYSTEM**  
 This parameter is omitted if it is not provided.
