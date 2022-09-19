# Configuring Zowe Chat Chatbot server

Configure Zowe Chat Chatbot server before you start to use Zowe Chat.

Because Zowe Chat Microservice supports only HTTPS protocol, you need one private key as well as one signed certificate, both of which are of the self-signed certificate for your SSL connection in PEM format before you can configure it. If you have your own certificate and key, you can use them directly. Otherwise, you can create one self-signed certificate using the following configuration script provided by Zowe Chat.

1.  **Attention:** If you installed Zowe Chat with Docker image, you must go to the directory where you extract the Zowe Chat Docker archive before you perform the following steps. Run command `./bnzDocker.sh shell` to open an interactive bash shell on the running Zowe Chat Docker container using Docker Command Line Utility.

2.  Go to the Zowe Chat home directory.

    ```
    cd $ZCHATOPS\_HOME
    ```

3.  Go to the ZCHATOPS\_HOME/chatbot/install folder of your Zowe Chat server, where your Zowe Chat Chatbot is installed.

4.  Run the following command to configure your Zowe Chat Chatbot component.

    Using your own SSL certificate and private key:

    ```
    ./config.sh chatbot server -h Your\_chatbot\_server\_host\_name -p 5001 -b bnz/api/v1 -t your\_chat\_tool -n bnz -c Your\_certificate\_file\_path -k Your\_key\_file\_path -r https
    ```

    Using the self-signed certificate and private key created by Zowe Chat:

    ```
    ./config.sh chatbot server -h Your\_chatbot\_server\_host\_name -p 5001 -b bnz/api/v1 -t your\_chat\_tool -n bnz -r https
    ```

    Where,

    -   -h: \(Required\) Specify the host name of Zowe Chat Chatbot server.
    -   -p: Specify the port number of Zowe Chat Chatbot web hook. Default is 5001.
    -   -b: Specify the base path of Zowe Chat Chatbot web hook. Default is bnz/api/v1.
    -   -t: \(Required\) Specify the chat tool that Hubot connects with. The value can be mattermost or slack.
    -   -n: \(Required\) Specify the bot account or user in your chat platform.
    -   -c: Specify the SSL certificate file path for Zowe Chat Chatbot web hook. The certificate and key files will be generated automatically if no certificate or key file is specified.
    -   -k: Specify the SSL key file path for Zowe Chat Chatbot web hook.
    -   -r: Specify the protocol of Zowe Chat Chatbot web hook. Default is https.
    **Note:**

    1.  You can ignore -c and -k option if you specify `http` as the value for -r option.
    2.  You can change your Zowe Chat Chatbot server configuration file ZCHATOPS\_HOME/chatbot/config/bnzbot-server.yaml directly, or replace the certificate and private key file content in ZCHATOPS\_HOME/chatbot/config/ssl folder with your own ones.
    ```
    # This file controls all configurations of the chat bot server for Zowe Chat
    
    # Specify the log level of chat bot server, the value can be error, warn, info, verbose, debug or silly.
    # The deafult value is info.
    logLevel: info
    
    # Specify the chat tool that is integrated with your Hubot, the value can be mattermost or slack.
    # The default value is mattermost.
    chatTool: mattermost
    
    # Specify the bot user name or account that is configured in your chat tool server.
    # The default value is bnz.
    chatbotUserName: bnz
    
    # Specify the protocol of chat bot web hook. The value can be https or http.
    # The default value is https.
    webHookProtocol: https
    
    # Specify the host name or IP address of chatbot web hook.
    webHookHostName: Host\_name
    
    # Specify the port number of your chatbot web hook.
    # The default value is 5001.
    webHookPort: 5001
    
    # Specify the base path of chatbot web hook.
    # The default value is /bnz/api/v1.
    webHookBasePath: /bnz/api/v1
    
    # Specify the maximum number of resources that chatbot can retrieve for you
    limit: 10
    
    # Specify the query interval to check incoming incidents and post to target channel in second. Set to 0 to disable it to improve system performance if no any incoming incident in your environment
    # The default value is 0.
    incidentQueryInterval: 0
    
    ```

5.  Stop and start your Chatbot server to make your changes effective. See [Starting and stopping Zowe Chat Chatbot](chatops_install_start_stop_Hubot.md) for specific steps.


