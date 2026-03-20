# Configuring and deploying Zowe Remote SSH

Use Zowe Remote SSH in Zowe Explorer to perform z/OS mainframe operations with minimal server-side configuration.

## Configuration methods

Create an SSH Zowe profile in your Zowe [team configuration](../ppendix/zowe-glossary.md#team-configuration) to connect to z/OS and deploy to the z/OS system.

## Preface step

Open ZE, open the command palette, search **Zowe-Explorer: Connect to Host...***


### Connecting with an SSH command

Create an SSH profile faster by using an SSH command to authenticate and deploy to the server. The user included in the command is used to search the local SSH configuration file for host directives that match the host in the command. 

When there is a match, Zowe Remote SSH attempts public-private key authentication in three ways, in the following order:

1. Using the IdentityFile (private key path) option in the command, if provided.
2. Locating the first IdentityFile that follows naming conventions of common encryption algorithms. File names are searched in the order `id_ed25519`, `id_rsa`, `id_ecdsa`, and `id_dsa`.
3. Locating the IdentityFile from the SSH config entry that matches the submitted hostname.

If an IdentityFile is found and fails to authenticate, or no IdentityFile is found, you are prompted for basic credentials.

Use an SSH command to connect and deploy to the server:

1. Enter an SSH connection command in the **Quick Pick**:

    ```
    ssh <user@example.net>
    ```
    - \<user@example.net>
    
        Specifies the user ID and hostname.

     Include an IdentityFile and/or port by including flags:

    ```
    ssh <user@example.net> -i "/Users/local/.ssh/id_rsa" -p 443
    ```
    - `-i`

        Specifies the IdentityFile to use for authentication. 
    - `-p`

        Specifies the port number for the SSH connection. 

2. Answer any prompts in the **Quick Pick** to provide any additional credentials required for authentication.

 A new SSH profile is added to the corresponding Zowe team configuration file in your system and the Zowe Remote SSH binary is uploaded to your mainframe host to be used with this new profile.

 You can now interact with this SSH profile in one of the Zowe Explorer tree views (Data Sets, USS, or Jobs) to start using ZRS.

### Connecting with an existing SSH configuration file

Use an existing SSH configuration file to create a new `ssh` profile in your client-side team configuration. 

To create a new SSH profile in your team configuration:

1. In the **Command Palette**, search for **Zowe-SSH: Connect to Host...**.
2. Select a profile listed **below** the **Migrate From SSH Config** separator in the drop-down.
3. Answer any prompts to provide any additional credentials required for authentication.

    The user's existing SSH host directive in their SSH configuration file remains unchanged. A new SSH profile is added to the corresponding Zowe team configuration file in your system and the Zowe Remote SSH binary is uploaded to your mainframe host to be used with this new profile.

    You can now interact with this SSH profile in one of the Zowe Explorer tree views (Data Sets, USS, or Jobs) to start using ZRS.

### Connecting with an existing team configuration profile

Use an existing SSH profile from a Zowe team configuration file to deploy Zowe Remote SSH:

1. In the **Command Palette**, search for **Zowe-SSH: Connect to Host...**.
2. Select a profile listed **above** the **Migrate From SSH Config** separator in the drop-down.
3. Answer any prompts to provide any additional credentials required for authentication.

    The Zowe Remote SSH binary is uploaded to your mainframe host to be used with this new profile. 

    You can now interact with this SSH profile in one of the Zowe Explorer tree views (Data Sets, USS, or Jobs) to start using ZRS.


=======

ignore this:

the server is ZRS, a process that's running on the mainframe that we can call a server

order: (1) if use -i, (2) common names, (3) looks for match


The client pieces (VS Code extension, CLI plug-in) communicate with the ZRS binary using the SSH protocol. So the client sends a command over SSH to that binary, and the binary responds with some data the client can parse/understand.
You could mention that the clients communicate with the ZRS binary using JSON-RPC, if you want to be specific on the underlying technology.