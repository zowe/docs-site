The App framework's logger allows for messages to have IDs that can be used to find the right version of a message for foreign languages or to quickly find documentation for a message. More information about ID messages can be found here:
 
https://github.com/zowe/zlux/wiki/Logging#logger-message-substitution-using-ids

The IDs are per-logger, where loggers for plugins are automatically made and given to the plugin code at runtime. During that time, the messages that map to each ID is found in a JSON file relative to the plugin & part of the plugin. All router dataservices share a file, and the web code has another file.

Logs always include the name of the plugin, but it is good practice to make the IDs unique relative to other software. For example, all of Zowe's own code has IDs starting with ZWE. These are documented here: 

https://github.com/zowe/zlc/blob/master/process/messageManagement.md

# How to add new IDs to app framework code
All code in the app server or app framework must conform to the following formatting guidelines: 

- The code must start with ZWED 
- The code must have 4 numbers 
- The code must end with a letter that signifies the level of message. 

Therefore the format is ZWEDnnnnL where the n is number, and the L is level. Levels such as I for info, W for warning, and E for error are expected.

Server-side code should have a number between **0000** and **4999**, whereas web code can be between **5000** and **9999**. This is to make it easier to prevent accidental duplication.

Messages must be added in specific places relative to the part of the codebase, explained below.

**NOTE: There should be no duplication of ZWED IDs among the framework because it will create inaccuracies in the documentation**



## Adding messages to plugins
### Web
If you are editing web code (/web or /webClient), then at runtime the file must be located at 

`PLUGIN/web/assets/i18n/messages_LANG.json`

Such as: /web/assets/i18n/messages_en.json for english.

### Router Dataservice
Router (javascript) dataservices can have their message files at 

`PLUGIN/lib/assets/i18n/log/messages_LANG.json`

Such as: 
https://github.com/zowe/zlux-server-framework/blob/v2.x/master/plugins/config/lib/assets/i18n/log/messages_en.json

## Adding messages to the app server
Since the app server is not a plugin, it has its logs in a specific place.
The message file is located here: 

https://github.com/zowe/zlux-server-framework/blob/v2.x/master/lib/assets/i18n/log/messages_en.json

## Adding messages to the app manager
The app manager also has parts that are not plugins, such as the dispatcher code found in zlux-platform, or the bootstrap code. For these, we use the bootstrap plugin's web JSON files, such as the English one at

 `/zlux-app-manager/bootstrap/web/assets/i18n/messages_en.json`

**NOTE: Plugins do not need to share the same ZWED prefix that the framework MUST share, but some parts of the framework are organized as plugins, such as `zlux-app-manager/virtual-desktop` being a plugin.**

