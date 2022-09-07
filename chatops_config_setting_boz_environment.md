# Setting BoZ environment variables

Setting BoZ environment variables before you start to use .

1.  On the server `BOZSRV`, change directory to BOZSRV\_INSTROOT/bozbeta/bin and open the shell script `bozenv.sh` to change the following environment variables.

    |**Environment Variable**|**Purpose**|**Example**|
    |------------------------|-----------|-----------|
    |EEZ\_BOZ\_WEBHOOK\_BASE\_URL|The URL of the EEZ web hook.|`http://BOT\_SERVER:8080/boz/API/v1`**Attention:** Use the IP address for BOT\_SERVER instead of local host. Otherwise, Hubot may be unavailable on other machines.

|
    |EEZ\_BOZ\_SA\_ServiceBaseURL|The URL of the Microservice.|`https://BOZSMUSRV:PORT/ibm/boz/v1/operation/sa`|
    |EEX\_BOZ\_WHITELIST|The white list configuration file path.|`INSTALL\_ROOT/config/bozWhiteList.json`|
    |EEZ\_BOZ\_IBM\_KC\_ServiceBaseURL|The URL of the Knowledge Center search service.|[https://www.ibm.com/support/knowledgecenter/v1/search](https://www.ibm.com/support/knowledgecenter/v1/search)|
    |EEZ\_BOZ\_IBM\_KC\_WebBaseURL|The URL of the Knowledge Center.|[https://www.ibm.com/support/knowledgecenter](https://www.ibm.com/support/knowledgecenter)|
    |EEZ\_BOZ\_DEFAULT\_DOMAIN|The default domain that are used to search for objects.| |
    |EEZ\_BOZ\_DEFAULT\_SYSTEM|The default system that are used to search for objects.| |
    |EEZ\_BOZ\_MAX\_RESOURCES\_TO\_DISPLAY|The maximum number of resources that the chat tool can display.|30|
    |EEZ\_BOZ\_MAX\_RELATIONS\_TO\_DISPLAY|The maximum number of resource relations that the chat tool can display.|10|
    |EEZ\_BOZ\_ENABLE\_HEAR\_FOR\_MESSAGE\_IDS|Enable BoZ to hear for message IDs or not.|true|
    |EEZ\_BOZ\_ENABLE\_PARSE\_FOR\_MESSAGE\_IDS|Enable BoZ to parse for message IDs or not.|false|

2.  Stop and start your Hubot for the configuration to take effect.


