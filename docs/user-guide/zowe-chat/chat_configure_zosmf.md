# Configuring the z/OSMF server

You can configure the z/OSMF server by editing the `zosmfServer.yaml` configuration file.

1. Go to the z/OSMF server configuration directory by running the following command. 

   ```
   cd $ZOWE_CHAT_HOME/config
   ```

2. Edit the `zosmfServer.yaml` configuration file. Customize the default values based on your needs. 

   ```
   # Specify the protocol of your Z/OSMF server. The value can be https or http.
   # The default value is https.
   protocol: https

   # Specify the host name or IP address of your Z/OSMF server.
   hostName: <Your host name>

   # Specify the port number of your z/OSMF server.
   # The default value is 443.
   port: 443

   # Specify whether self-signed certificates are rejected or not. The value can be true or false.
   # The default value is true
   rejectUnauthorized: true

   # Specify authentication type. The value can be token or password
   # The default value is password
   authType: password

   # If you prefer all bot requests against mainframe services to use a single service account, set to true
   serviceAccount: 
     # Enable or disable the service account. The value can be true or false.
     # The default value is false.
     enabled: false

     # Service account id. if service account is enabled, this information is required.
     user: <Service account ID>

    # Service account password. if service account is enabled, this information is required.
     password: <Service account password>
    ```
