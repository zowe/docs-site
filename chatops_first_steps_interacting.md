# Interacting with Zowe Chat

There are four ways to interact with IBM Z® ChatOps: chatting, mouse navigation, lauch-in-context \(LIC\) link and message code preview, and inbound web hook.

## Chatting with the bot user

You can @ the bot user and talk with it in the chat platform, and the bot can respond with answers.

-   **Using Simple Formed Sentences**

    Simple Formed Sentences are natural language styled sentences with fixed form for simple communication. If you are a non-experienced user and only want to check the overview data, you can use this form of sentences. For specific usage concerning grammar and syntax, see [IBM Z® ChatOps Simple Formed Sentences](chatops_sfs.md).

-   **Using Commands**

    Commands have enhanced capabilities such as filtering and sorting of the output that can meet your needs of looking at more specific and detailed results. If you are familiar with command lines and want to check detailed data, you can use commands as a more powerful way of inquiring information. To learn about the command usage of Zowe Chat, see [IBM Z® ChatOps Commands](chatops_cli_cli.md).


## Mouse navigation

Almost all the answers provided by the bot user bnz in the chat platform are presented with hyperlinks or action buttons. A simple click on the links or buttons by any user in the chat channel can make the bot user bnz to answer with more details.

## Launch in context \(LIC\) link and message code preview

The bot user constantly listens to everything that is posted in the chat channel that it is invited in. When the bot user hears a URL and finds it related to an SMU resource, domain, or system, the bot user automatically follows the link and presents the available information about the linked target as a response in the chat channel. To learn more about the usage of this function, see [Sharing IBM® Service Management Unite links to channel](chatops_first_steps_smu_links.md).

## Inbound web hook

Zowe Chat provides one incident web hook that can be called by other products to send events, incidents, and alerts to Zowe Chat. The bot user will post the received incidents to the specified chat channel and present those events, incidents, and alerts to the team of SMEs in the channel.

**Parent topic:**[Using Zowe Chat](chatops_first_steps.md)

