# Implementing profiles in a plug-in
You can use this profile template to create a profile for your product.  

The profile definition is placed in the `imperative.ts` file.

The `type: "someproduct"` property represents the profile name that you might require on various commands to have credentials loaded 
from a secure credential manager and retain the host/port information, so that you can easily swap to different servers from the CLI.

 By default, if your plug-in that is installed into Zowe™ CLI contains a profile definition that is similar to the following example, a profile template is added automatically to team config JSON when you run the `zowe config init` command. Any properties for which `includeInTemplate` is true are included in the template. Additionally, commands that manage V1 profiles are created automatically under `zowe profiles`. For example, `create`, `validate`, `set-default`, `list`, and so on.


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
      createProfileExamples: [
        {
         options: "spprofile --host zos123 --port 1234 --user ibmuser --password myp4ss",
         description: "Create a SOME PRODUCT profile named 'spprofile' to connect to SOME PRODUCT at host zos123 and port 1234"
        }
      ]
    }
]
```

**Next steps**

If you completed all previous tutorials, you now understand the basics of extending and developing plug-ins for Zowe CLI. Next, we recommend reviewing the project [contribution guidelines](cli-devTutorials.md#contribution-guidelines) and [Imperative CLI Framework documentation](cli-devTutorials.md#imperative-cli-framework-documentation) to learn more.