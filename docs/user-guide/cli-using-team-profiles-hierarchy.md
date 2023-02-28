# Understanding the hierarchy of team profiles in Zowe CLI

When you run a command, Zowe CLI needs specific information, or *properties*, in order to perform the action.

There are two **[two correct?]** ways that properties and their values can be provided to Zowe CLI. One method is to manually include this information with each command when it is issued, as in the example command below:

```
A COMPLICATED EXAMPLE
```

Including properties with every command can be tedious, because there can be a lot of information required. This can lead to typos and mistakes.

The second way of specifying configurations -- using team profiles -- can make things easier. A team profile is part of a configuration file and houses the properties and property values that Zowe CLI needs to run a command. When you have configuration files and you issue a command, Zowe CLI automatically applies the needed properties it finds. **[I've  noticed in our other documentation that we always stress team profiles, but seem to not emphasize user profiles as much. Why is this? In this paragraph, it seems odd to just talk about team profiles when the same]**

If team profiles were used in the example above, the user would have needed to issue only the command: `example`.

## Learning the terminology

Zowe version 2.0 introduces the use of team profiles. In practice, however, you can have a *team* profile or a *user* profile. Moreover, you can use a *global* profile or a *project* profile. It is important to know how these differ. **[is it weird to keep talking about "profiles" when this also applies to config files?]**

- A **user profile** is stored in a *user configuration file* and is used by one person who needs their own unique properties to run commands.

- A **team profile** is stored in a *team configuration file* and is used by a group of people who need the same properties to run commands.

- A **global profile** resides in the `ZOWE_CLI_HOME` directory (YourUserHomeDirectory/.zowe, by default) and it can be saved in either a global *user configuration file* or a global *team configuration file*.

- A **project profile** resides in a directory of your choice. It can be saved in either a project *user configuration file* or a project *team configuration file*. It applies only when you run a CLI command in that project directory or subdirectory.

All configuration files are saved in `.json` format. 

## How configuration files work together

There may be instances where a user has all four types of files in their system, and all four configurations are referred to simultaneously by Zowe CLI for a particular command.

This can result in files with contradictory configurations. One file can specify that a certain property has a value of `ABC`, while another file uses `XYZ` as a value.

When the same properties have different values across multiple configuration files, how does Zowe CLI know which configuration to use and which to ignore?

**[IMAGE GOES HERE]**

Configurations are applied according to a hierarchy of specificity. When multiple configuration files include the same profile but each with different properties and values, Zowe CLI commands use the most specific configuration and ignore the less specific configurations. **[I am introducing this "specificity" concept -- not sure if it's appropriate or not.]**

Zowe CLI considers a user config file to be more specific that a team config file, and a project config file to be more specific than a global config file.

Out of all possible configuration files, Zowe CLI commands use the following hierarchy:

- **Most specific:** project user configuration file
- **Slightly less specific:** project team configuration file
- **Much less specific:** global user configuration file
- **Least specific:** global team configuration file

This simple hierarchy is applied no matter the directory you issue a Zowe CLI command in.

When there are multiple configuration files with different profiles, the hierarchy can suddenly seem more complicated.

## Using a profile found in multiple configuration files

Consider a user that has all configuration file types as in the following scenario:

| specificity level | configuration | profile | property | value |
|----------- | ----------- | ----------- | ----------- | ----------- |
| Most specific | project user file | One | ABC | red |
| Slightly less specific | project team file | Two | XYZ | yellow |
| Much less specific | global user file | Three | MNO | green |
|Least specific | global team file | Two | XYZ | blue |

In the case above, if Zowe CLI needs the `MNO` property to carry out a command, it refers to the global user configuration to apply the `green` value because it is the only configuration file that has this particular property. Specificity does not matter here.

On the other hand, if a Zowe CLI command needs the information in the `Two` profile, it can seem like there are two possible values, `yellow` and `blue`. In this case Zowe CLI knows to use `yellow` by following the rules of specificity: The project team file is more specific than the global team file.

Zowe CLI takes the following steps: **[is this correct? I kind of just inferred this.]**

1. Finds the `XYZ` property in both Two profiles.

2. Ignores the `blue` value for the `XYZ` property because the global team configuration is less specific.

3. Uses the `yellow` value for the `XYZ` property because the project team configuration is more specific.

## Using multiple properties found in multiple profiles

Consider a more layered scenario. Again, assume you have all four configuration file types, but the following conditions apply:

- There are multiple profiles across all four configuration file types.
- Some profiles appear in multiple configurations. Other profiles show up in only one file.
- There are multiple properties shared across several profiles.
- Some properties are found in only one profile.

In this scenario, the following profiles, properties, and values exist, displayed in the format **profile:** *property:* value:

| Project User <br/> Configuration File |  Project Team <br/> Configuration File | Global User <br/> Configuration File |  Global Team <br/> Configuration File |
| :----------------------  | :------------------------ | :---------------------- | :----------------------- |
| **abc:** *direction:* north     | **abc:** *direction:* east       | **abc:** *direction:*  south   | **abc:** *direction:* west     |
| **def:** *shape:* triangle  | **def:** *shape:* square        | **def:** *shape:* circle     |                                |
|                                |                                 |                              | **ghi:** *texture:* bumpy      |
| **jkl:** *temperature:* cold   |                                 |                              |                                |
|                                | **mno:** *fruit:* banana        |                              |                                |
|                                |                                 | **pqr:** *distance:* near    |                                |

The following table shows how Zowe CLI determines which profiles, properties, and values to use in a command.

| Configuration files in use &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | Specificity hierarchy rules | Profiles, properties and values used &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|
| :--------- | :------------ |:------------ |
| - global user profile <br/> - global team profile | - When the same property exists within the same profile in both config files, the property value from the global user config is used. <br/> - When the same profile exists in both config files, but a property of that profile exists in only one configuration, that property is used. <br/> - If a profile exists in only one config file, that profile is used in its entirety. | **abc:** *direction:* south <br/> **def:** *shape:* circle <br/> **ghi:** *texture:* bumpy <br/> **pqr:** *distance:* near |
| - project team profile <br/> - global user profile <br/> - global team profile | - When a profile exists in all three config files, the project team config is used. <br/> - If a profile exists in only one config file, that profile is used in its entirety. | **abc:** *direction:* east <br/> **def:** *shape:* square <br/> **ghi:** *texture:* bumpy <br/> **mno:** *fruit:* banana <br/> **pqr:** *distance:* near |
| - project user team profile <br/> - project team profile <br/> - global user profile <br/> - global team profile | - When the same prop erty exists in all four config files, the property value from the project user config is used. <br/> - When the same profile exists in all four config files, but a property of that profile exists in only one configurations, that property is used. <br/> - If a profile exists in only one config file, that profile is used in its entirety. |  **abc:** *direction:* north <br/> **def:** *shape:* triangle <br/> **ghi:** *texture:* bumpy <br/> **jkl:** *temperature:* cold <br/> **mno:** *fruit:* banana <br/> **pqr:** *distance:* near |

**Note:** The rules above apply when profiles have the same name. To maintain the same set of properties in two different profiles, give each profile a different names so that Zowe CLI use a specific profile, if needed.

Zowe CLI provides this information from configurations stored in team profiles. These configurations are stored as properties and property values. **[I think I have this wrong. Here, I want to explain that you can differentiate two profiles w/ the same name by changing the name (if this is even possible)]**

**[Question for Gene: This article mentions base profiles and service profiles? How do those fit in w/ the team/user profiles?]** https://docs.zowe.org/stable/user-guide/cli-using-using-profiles

**[Question for Gene: is it possible to have the same profile twice in the same config file but w/ different values?]**