# Configuration file

### app-server configuration

The app-server uses the Zowe server configuration file for customizing server behavior. For a full list of parameters, requirements, and descriptions, see [the json-schema document for the app-server](https://github.com/zowe/zlux-app-server/blob/v3.x/staging/schemas/app-server-config.json) which describes attributes that can be specified within the configuration file section `components.app-server`

### zss configuration

ZSS shares some parameters in common with the app-server, so you can consult the above json-schema document to find out which parameters are valid within `components.zss` of the Zowe configuration file. However, some parameters within the app-server schema are not used by ZSS, such as the `node` section. A ZSS-centric schema will be available soon. 


