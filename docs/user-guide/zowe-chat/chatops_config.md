# Configuring Zowe Chat

You must properly configure Zowe Chat before you can ask the bot to operate on Z.

-   **[Configuring Zowe Chat server environment](chatops_config_server_environment.md)**  
To configure Zowe Chat server environment, you must configure Zowe Chat certificate and the Zowe Chat server.
-   **[Configuring SMU data provider for Zowe Chat](chatops_config_connect_l2_smu.md)**  
You must configure the IBM® Service Management Unite \(SMU\) data provider for Zowe Chat to get the monitor data on z/OS®.
-   **[Configuring ZWS data provider for Zowe Chat](configuring_z_chatops_data_provider_zws.md)**  
You must configure the IBM Z Workload Scheduler \(ZWS\) data provider for Zowe Chat to get the monitor data on z/OS®.
-   **[Configuring the chat tool-Microsoft Teams](chatops_config_chattool.md)**  
This step is for Microsoft™ Teams users only. You can configure your chat platform by editing the msteams.yaml file.
-   **[Configuring the chat tool-Slack](configuring_the_chat_tool_slack.md)**  
This step is for Slack users only. You can configure your chat platform by editing the slack.yaml file.
-   **[Configuring the chat tool-Mattermost](configuring_the_chat_tool_mattermost.md)**  
This step is for Mattermost™ users only. You can configure your chat platform by editing the mottermost.yaml file.
-   **[Configuring allow list](configuring_allow_list_configuration.md)**  
You can configure bot allow list by editing the bnzbot-allow-list.json file.
-   **[Configuring the access rate limit of Microservice](chatops_brute_force_attack.md)**  
Zowe Chat Microservice limits the number of requests submitted from the same IP address to provide protection against DDoS attacks, and the number of login attempts from a user or a host before the user or the host becomes locked out to provide protection against brute-force attacks. You can modify these limits by configuring bnz-rate-limit.yaml.
-   **[Configuring TLS cipher suites](cipher_suite.md)**  
You can use cipher suite configuration file to customize your own list of cipher suites based on your needs.

