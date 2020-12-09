​
# Install CLI from Online Registry Via Proxy
​This topic describes how to install Zowe CLI using the NPM install command when you are working behind a proxy server. You will need to use this installation method if your site blocks access to public NPM.
​​
You can install Zowe CLI from an online registry via proxy on Windows, macOS, or Linux operating systems:
*  This method requires access to an internal server that will allow you to connect to the appropriate registries. For other installation methods, see Installing CLI.
*  Your default registry must be public npm (or a mirror of public npm).
*  If you previously installed the CLI and want to update to a current version, see Update Zowe CLI.
​
​Follow these steps: 
​
1. Install Zowe CLI and open-source plug-ins.
    * To obtain login credentials, open a Broadcom Support ticket under the category for the mainframe product that you are licensed for (for example, CA File Master Plus).
    * In the ticket, request access to the following Private Bintray registry URL: https://api.bintray.com/npm/ca/brightside-enterprise-npm/
    * Identify the proxy server.​
    * If your proxy server **does not** require login credentials, issue the following commands to add the proxy URL to the NPM config file:
    
        `npm config set https-proxy http://proxy.[proxy_name].com:8080`
        `npm config set proxy http://proxy.[proxy_name].com:8080`
        
        where [proxy_name] is the name of the proxy server.
    * If your proxy server **does** require login credentials, issue the following commands to add the proxy URL, with login credentials, to the NPM config file:
        
        `npm config set https-proxy http://[username]:[password]@proxy.[proxy_name].com:8080`
        
        `npm config set proxy http://[username]:[password]@proxy.[proxy_name].com:8080`
        
        where [username] and [password] are the required login credentials and [proxy_name] is the name of the proxy server.
    * Issue the following command to target the online registry:
    
        Windows:
        `curl -su "[givenUserID]@ca:[givenToken]" https://api.bintray.com/npm/ca/brightside-enterprise-npm/auth/scope/zowe >> %homepath%/.npmrc`
        
        Linux/Mac:
        `curl -su "[givenUserID]@ca:[givenToken]" https://api.bintray.com/npm/ca/brightside-enterprise-npm/auth/scope/zowe >> ~/.npmrc`
    * Ensure that you meet the Software Requirements for CLI.
    * To install Zowe CLI, issue the following command. On Linux, you might need to prepend sudo to your npm commands:
    `npm install @zowe/cli@zowe-v1-lts -g`
    * Install the Secure Credential Store, which lets you store your username, password, and other sensitive information in the credential vault on your computer instead of plaintext. Issue the following command: `zowe plugins install @zowe/secure-credential-store-for-zowe-cli@zowe-v1-lts`
​   
   * (Optional) To install open-source Zowe plug-ins, issue the following command: `zowe plugins install @zowe/cics-for-zowe-cli@zowe-v1-lts @zowe/ims-for-zowe-cli@zowe-v1-lts @zowe/mq-for-zowe-cli@zowe-v1-lts @zowe/zos-ftp-for-zowe-cli@zowe-v1-lts @zowe/db2-for-zowe-cli@zowe-v1-lts`
    
        Zowe CLI is installed.

2. (Optional) Install Broadcom plug-ins, which include integrations with Broadcom products (CA Endevor SCM, CA OPS/MVS, and more) and innovations (z/OS-Extended Files and Extended-Jobs):
   * Target @broadcom scoped packages on the Private Bintray registry. Issue the following command: `npm config set @broadcom:registry https://api.bintray.com/npm/ca/brightside-enterprise-npm/`
   * Install all Broadcom plug-ins.

            Note: You must meet the requirements for the IBM Db2 plug-ins before you issue this installation command. Meet the Software Requirements for all other plug-ins before you use them to interact with the mainframe.

        `zowe plugins install @broadcom/file-master-plus-for-zowe-cli@zowe-v1-lts @broadcom/endevor-for-zowe-cli@zowe-v1-lts @broadcom/endevor-bridge-for-git-for-zowe-cli@zowe-v1-lts @broadcom/idms-for-zowe-cli@zowe-v1-lts @broadcom/jclcheck-for-zowe-cli@zowe-v1-lts @broadcom/ops-for-zowe-cli@zowe-v1-lts @broadcom/caview-for-zowe-cli@zowe-v1-lts @broadcom/mat-analyze-for-zowe-cli@zowe-v1-lts @broadcom/mat-detect-for-zowe-cli@zowe-v1-lts @broadcom/caspool-for-zowe-cli@zowe-v1-lts @broadcom/sysview-for-zowe-cli@zowe-v1-lts @broadcom/ca7-for-zowe-cli@zowe-v1-lts @broadcom/zos-extended-files-for-zowe-cli@zowe-v1-lts @broadcom/zos-extended-jobs-for-zowe-cli@zowe-v1-lts`
        
        The Broadcom plug-ins are installed. 
​
3. (Optional) Verify that a Zowe plug-in is operating correctly. 
​

    `zowe plugins validate [my-plugin]`
    
    where [my-plugin] is the syntax for the plugin such as @broadcom/endevor-for-zowe-cli@zowe-v1-lts
​
4. (Optional) Test the connection to z/OSMF. See Testing Connection to z/OSMF. 
5. (Optional) Access the Zowe CLI Help (`zowe --help`) or the Zowe CLI Web Help for a complete reference of Zowe.
​
​

After you install the CLI, you can connect to the mainframe directly issuing a command, by creating user profiles and making use of them on commands, or by using environment variables. For more information, see Using CLI.
​
​
​