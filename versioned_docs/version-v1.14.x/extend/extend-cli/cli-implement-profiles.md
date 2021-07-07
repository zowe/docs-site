# Implementing profiles in a plug-in
You can use this profile template to create a profile for your product.  

The profile definition is placed in the `imperative.ts` file.

`someproduct` will be the profile name that you might require on various commands to have credentials loaded 
from a secure credential manager and retain host/port information (so that you can easily swap to different servers)
from the CLI).

By default, if your plug-in is installed into Zowe&trade; CLI that contains a profile definition like this, commands will automatically 
be created under `zowe profiles ...` to create, validate, set default, list, etc... for your profile.

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
              required: true,
              description: "Host name of your SOME PRODUCT REST API server"
            }
          },
          port: {
            type: "number",
            optionDefinition: {
              type: "number",
              name: "port",
               alias:["P"],         
              required: true,
              description: "Port number of your SOME PRODUCT REST API server"
            }
          },
          user: {
            type: "string",
            optionDefinition: {
              type: "string",
              name: "user",
              alias:["u"],          
              required: true,
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
              required: true,
              description: "Password to authenticate to your SOME PRODUCT REST API server"
            },
            secure: true
          },
        },
        required: ["host", "port", "user", "password"],
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

## Next steps
If you completed all previous tutorials, you now understand the basics of extending and developing plug-ins for Zowe CLI. Next, we recommend reviewing the project [contribution guidelines](cli-devTutorials.md#contribution-guidelines) and [Imperative CLI Framework documentation](cli-devTutorials.md#imperative-cli-framework-documentation) to learn more.