# Configuring the certificate

After you install Zowe Chat, you need to configure your certificate before you start to use Zowe Chat. You can use your own certificate or the tool that Zowe Chat provides to generate a self-assigned certificate.

Make sure that you have successfully installed Zowe Chat.

-   For Container users:

    1.  If you don't have your own certificate, you can generate a self-assigned certificate with the following steps.

        1.  Go to the directory where you extract the Zowe Chat Container archive.
        2.  Use the following command to generate a self-assigned certificate. Replace the host name and IP address with the values of your Zowe Chat server.

            ```
            ./tools/generateCert.sh host\_name IP\_address
            ```

        A folder named with your hostname will be created. You can find the generated certificate bnzsvr-server.crt and the key file bnzsvr-server.key in that folder.

    2.  Upload your certificate and key file with your <Container\_management\_tool\>,

        for example, docker.

        1.  Get your container ID.

            ```
            docker container ls --all -q --filter name="zchatops"
            ```

        2.  Upload your certificate to overwrite the default one.

            ```
            docker cp <certificate\_file\_path\> <chatops\_container\_id\>:/opt/ibm/zchatops/config/ssl/bnzsvr-server.crt
            ```

            **Note:** The file path should contain the file name. The following is the same.

        3.  Upload your key file to overwrite the default one.

            ```
            docker cp <key\_file\_path\> <chatops\_container\_id\>:/opt/ibm/zchatops/config/ssl/bnzsvr-server.key
            ```

-   For Native installation package users:

    1.  If you don't have your own certificate, you can generate a self-assigned certificate with the following steps.

        1.  Go to the directory where you extract the Zowe Chat package.
        2.  Use the following command to generate a self-assigned certificate. Replace the host name and IP address with the values of your Zowe Chat server.

            ```
            ./tools/generateCert.sh host\_name IP\_address
            ```

        A folder with the name of your hostname will be created. You can find the generated certificate bnzsvr-server.crt and the key file bnzsvr-server.key in that folder.

    2.  Upload your certificate and key file.

        1.  Upload your certificate to overwrite the default one.

            ```
            cp -f <certificate\_file\_path\> $ZCHATOPS\_HOME/config/ssl/bnzsvr-server.crt
            ```

            **Note:** The file path should contain the file name. The following is the same.

        2.  Upload your key file to overwrite the default one.

            ```
            cp -f <key\_file\_path\> $ZCHATOPS\_HOME/config/ssl/bnzsvr-server.key
            ```


