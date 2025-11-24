# Using the prompt feature

Zowe CLI uses a command-line "prompt" feature to request you to provide required option values. The CLI always prompts for host, port, username, and password information if not supplied in commands or profile configuration.

You can also manually enable the prompt for any option. This is helpful to mask sensitive information on the screen while you type. You can enable a one-time prompt, or you can choose to always prompt for a particular option.

### Enabling a one-time prompt

To enable a one-time prompt:

1. Open the Zowe CLI command prompt.

2. Specify an option or positional argument as `prompt*`:

    ```
    zowe files download data-set "prompt*"
    ```
    Zowe CLI responds with a prompt for the information.
   

3. Enter the correct value at the prompt.

    ```
    zowe files download data-set prompt*
    "dataSetName" Description: The name of the data set that you want to download
    Please enter "dataSetName":
    ```

     The prompt hides the user's input as it is entered into the command line.

### Always prompting for a particular option

Always prompting can be a good practice when your environment's security protocols prevent storing credentials on a personal computer, or expire passwords frequently (as with multi-factor authentication).

To always prompt for a particular option:

1. Use a text editor to open the configuration file that contains the profile to be modified.

2. In the profile, save `prompt*` as the plain-text value for the profile properties for which you want to be prompted:

    ```
    "zosmf": {
        "type": "zosmf",
        "properties": {
            "host": "lpar.with.zosmf",
            "port": 1234,
            "user": "prompt*",
            "password": "prompt*"
        },
        "secure": []
    },
    ```

3. Test the prompt by running a command using the modified profile.

    Zowe CLI prompts for the configured properties, such as the user ID and password in the following example:

    ```
    zowe files list ds cust009.public.demo
    "user" Description: Mainframe (z/OSMF) user name, which can be the same as your TSO login.
    Please enter "user": 
    "password" Description: Mainframe (z/OSMF) password, which can be the same as your TSO password.
    Please enter "password": 
    CUST009.PUBLIC.DEMO
    ```
    The prompt hides the user's input as it is entered into the command line.
