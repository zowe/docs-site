# Server component schemas

Starting with Zowe v2.0, each Component in Zowe must contain a [json schema](https://json-schema.org/) describing the configuration parameters that are valid for its component section in Zowe's server configuration. If a component does not have anything that can be configured, this file can just be boilerplate specifying that it fully inherits generic Component parameters and nothing more.

The server infrastructure will utilize each components' schema files to validate a Zowe instance configuration every startup, so this requirement is enforced by code.

## Requirements

* Server component json schema files must follow the json schema [spec 2019-09](https://json-schema.org/draft/2019-09/schema).
* Each component must state where its base schema file is located by the manifest parameter "schemas.configs"
* The schema file must use and/or extend the Zowe Component base schema by use of the "allOf" attribute.
* The schema must have an `$id` property which is a URI that has a domain related to the entity that developed the Component.
* The file should be tagged on z/OS but elsewhere must at least be encoded as ASCII-subset of UTF-8

## Additional information

* The schema file can reference other schema files within the component if compartmentalization of definitions are desired


## Example

Below is an example manifest and schema for a Component named "component1". The manifest file specifies the location of the schema file, and the schema file specifies the configuration parameters that are valid for this Component.

### Example manifest

```
name: component1
id: com.abcdef.component1
title: component1
description: An example component with a simple configuration.
license: ABCDEF Company License
schemas:
  configs: schema.json
```


### Example schema

Below is an example of the "schema.json" file referenced above. In it, we have 1 special property, "my-custom-prop", which is just a boolean that can be true or false.

```
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "$id": "https://abcdef.com/schemas/v2/component1",
  "allOf": [
    { "$ref": "https://zowe.org/schemas/v2/server-base" },
    { "type": "object",
      "properties": {
        "components": {
          "type": "object",
          "additionalProperties": true,
          "properties": {
            "component1": {
              "allOf": [
                { "$ref": "https://zowe.org/schemas/v2/server-base#zoweComponent"},
                { 
                  "type": "object",
                  "properties": {
                    "my-custom-prop": {
                      "type": "boolean",
                      "default": true,
                      "description": "This is a property unique to this component, as opposed to the Zowe Component base that this schema extends"
                    }
                  }
                }
              ]
            }
          }
        }
      }
    }
  ]
}
```

## Validation

Zowe server infrastructure will validate that a user's server configuration is correct by checking every schema file found in every component. If invalid, the servers will not start until the configuration is corrected. Developers may wish to confirm their schema and there are several tools available such as Microsoft Visual Studio Code for validating schema syntax is correct and jsonschemavalidator.net for testing a configuration against a schema.
