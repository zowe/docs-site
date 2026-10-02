# Zowe V2 FAQs

## Where can I find the V1 and V2 LTS conformance criteria? 

The Zowe Squads have prepared XLS spreadsheets with conformance criteria for all Zowe extensions including: CLI, APIs, App Framework, and Explorer for VS Code. The spreadsheets clearly show the prior / V1 criteria alongside the new / V2 criteria. Please be aware, there are additions, deletions, and CHANGES to the criteria. In some cases, the change is simply that a BEST PRACTICE has been deemed REQUIRED. Use the included fill color key to identify new changes for V2, reworded changes, or changes from V1 removed in V2. See the Changes to the [Conformance Criteria](https://www.zowe.org/vnext#conformance-changes) section at Zowe.org/vNext.

## Whats the difference between "server.json" and "example-zowe.yaml"?

The previous Zowe V1.x config, "server.json", has been removed from V2 and has been replaced with a new yaml configuration file. The app server will no longer support instances/workspaces which only contain a "server.json" config file and will fallback to a default configuration. In addition to the app server, ZSS will no longer support "server.json".

The yaml Zowe configuration file contains configurations for the setup, install, and initialization of Zowe as well as for individual components. This file allows users to customize dataset names, security related configs, certificate setup/config, job name & job prefix, various runtime configs, high availability config, as well as individual component configurations.

For more information on Zowe setup and the yaml configuration, run the following command in the command line:

```zwe init --help```

## What are the new default ports?

Four of the default Zowe ports have changed for the app server, and ZSS. The new default app server port is 7556 (previously 8544) and the new ZSS port is 7557 (previously 8542). The JES/USS/MVS Explorer UI servers have been removed, and thus no longer require port configurations.

## How do I access Zowe through the API Mediation Layer in V2?

In previous V1.X versions of Zowe, the desktop could be accessed via the API Mediation Layer by navigating to `https://${zowe.externalDomains[0]}:{zowe.externalPort}//ui/v1/zlux`. In Zowe V2, the route to access the desktop has changed to `https://${zowe.externalDomains[0]}:{zowe.externalPort}/zlux/ui/v1`. Such routing structure is applicable to other clients connected to the API Gateway. For example, the API Catalog may be accessed via `https://${zowe.externalDomains[0]}:{zowe.externalPort}/apicatalog/ui/v1`.

## What new frameworks are supported in V2?

The Zowe app framework now supports the more modern Angular 12, Corejs 3 and Typescript 4.

## Why aren't the explorers appearing on my desktop anymore?

By default, the explorers will not longer appear on the desktop if the instance is not configured to use the API Mediation Layer.