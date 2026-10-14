# Choosing an Identification

Components and extensions within the Zowe server install are distinguished by their package ID, package name, log ID and jobname suffixes. This page documents each and provides recommendations.

## Packaging

### Manifest

An extension's manifest file starts with `name` and `id` fields such as in this example

```yaml
name: log-viewer
id: com.example.logview
description: Log viewing product from Example Company
```

These fields should align with other extension content, such as Application Framework pluginDefinition.json fields or API Mediation Layer registration and API Catalog fields.

See more about the manifest fields within the [Server component manifest file reference](../appendix/server-component-manifest.md).

### Application Framework pluginDefinition.json

Application Framework plug-ins have pluginDefinition.json files which describe their properties. Each plug-in is identified by the `identifier` field within that file, and it is recommended that this field be related to the manifest `id` field.

See more about the pluginDefinition.json fields within the [Plug-ins definition and structure](./extend-desktop/mvd-plugindefandstruct.md).

## Job Identification

On z/OS, the Zowe servers have jobnames derived from the Zowe YAML property `zowe.job.prefix` and a jobname suffix that is related to the section of Zowe that each server belongs to, such as 'A' for APIML, and 'D' for the app-server component that provides the Desktop. You can see more about 

Given the default job prefix of "ZWE1", the APIML gateway job would be named "ZWE1AG", and the app-server Desktop component would be named "ZWE1DS".

The letter 'X' is reserved for eXtensions. You may have a job named for example ZWE1XABC.

## Log Identification

Similar to job identification, Zowe server components have log IDs that begin with "ZWE" and a letter related to the section of Zowe the server belongs to, such as where logs beginning with "ZWEA" belonging to the APIML components.

Extension log IDs are recommended to start with the 3 letter prefix of their z/OS product code. The prefix "ZWEX" is also reserved for extension use if needed.
