# Implementing profiles in a plug-in

Users of your plug-in communicate with the mainframe by specifying connection information in a configuration profile.

For profiles to work with services other than z/OSMF, SSH, and TSO, developers must define profile types and the profile structure for their plug-in in a special file. This plug-in definition file ultimately allows an end user to add the plug-in profile &mdash; and its connection details &mdash; to their team configuration.

When creating profile types for a plug-in, apply the following code as a template to the plug-in definition file. Modify the template as necessary by changing values and/or adding more properties.

## Editing the plug-in definition file

You can specify the plug-in definition file name and location in your plug-in's `package.json` file. For example:

```
"imperative": {
    "configurationModule": "lib/pluginDef.js"
  },
```

  - `pluginDef.js`
    
    The runtime file

  - `src/pluginDef.ts`
  
    Location of your definition source

Edit the `pluginDef.ts` file (or your equivalent) to define profile types for your plug-in:

1. Use a text editor to open the `pluginDef.ts` file.

2. In the `pluginDef.ts` file, add the following profile definition:

    ```typescript
    profiles: [
        {
          type: "someproduct",
          schema: {
            type: "object",
            title: "Configuration profile for SOME PRODUCT",
            description: "Configuration profile for SOME PRODUCT ",
            properties: {
              host: {
                type: "string",
                optionDefinition: {
                  type: "string",
                  name: "host",
                  alias:["H"],
                  description: "Host name of your SOME PRODUCT REST API server"
                }
              },
              port: {
                type: "number",
                optionDefinition: {
                  type: "number",
                  name: "port",
                  alias:["P"],         
                  includeInTemplate: true,
                  description: "Port number of your SOME PRODUCT REST API server"
                }
              },
              user: {
                type: "string",
                optionDefinition: {
                  type: "string",
                  name: "user",
                  alias:["u"],          
                  description: "User name to authenticate to your SOME PRODUCT REST API server"
                },
                secure: true
              },
              password: {
                type: "string",
                optionDefinition: {
                  type: "string",
                  name: "password",
                  alias:["p"],          
                  description: "Password to authenticate to your SOME PRODUCT REST API server"
                },
                secure: true
              },
            },
          },
        }
    ]
    ```
3. Replace `someproduct` in `type: "someproduct"` with your plug-in profile name.

    This property represents the name of the profile type option that might be required on commands that allow users to select a profile from their team configuration. (Zowe CLI has profile types for z/OSMF, SSH, and TSO.)

      - For example, the `zowe zosmf check status --zosmf-profile` command includes an option that specifies a z/OSMF profile from the user's team configuration. For your plug-in, the profile type that you define can be used in a commands to specify a profile for your plug-in.
    
    This value is used in team configuration to create a plug-in profile to connect to the mainframe.

4. Update the title and description for your plug-in.

5. Add any needed properties to allow users to configure plug-in settings.

    Each option property in the template includes an `optionDefinition`. For a reference of `optionDefinition` attributes, see the [`ICommandOptionDefinition` interface](https://github.com/zowe/zowe-cli/blob/master/packages/imperative/src/cmd/src/doc/option/ICommandOptionDefinition.ts).

6. Set the `includeInTemplate` property to `true` to dictate that this property is included in any generated team configuration.

    If set to `false` or not included, end users will have to add the property themselves when editing their team configuration.

7. Set the `secure` property to `true` to ensure that any value the end user specifies for this property is stored by default in their secure credential store. Otherwise the value is stored as plain text.

    The profile has been defined as needed.
