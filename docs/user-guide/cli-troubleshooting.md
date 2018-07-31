# Troubleshooting installing Zoe Brightside
The following topics contain information that can help you troubleshoot problems when you encounter unexpected behavior.

## `npm install -g `Command Fails Due to an EPERM Error

**Valid on Windows**

**Symptom:**

This behavior is due to a problem with Node Package Manager (npm). There
is an open issue on the npm GitHub repository to fix the defect.

**Solution:**

If you encounter this problem, some users report that repeatedly
attempting to install CA Brightside yields success. Some users also
report success using the following workarounds:

  - Issue the `npm cache clean` command.

  - Uninstall and reinstall CA Brightside. For more information,
    see [Install CA
    Brightside](Install-CA-Brightside_473021289.html).**  
    **

  - `Add the --no-optional` flag to the end of the `npm
    install` command.

## `Sudo` Syntax Required to Complete Some Installations

**Valid on Linux**

**Symptom:** 

The installation fails on Linux. 

**Solution:**

Depending on how you configured Node.js on Linux or Mac, you might need
to add the prefix `sudo `before the `npm install -g` command or the `npm
uninstall -g` command. This step gives Node.js write access to the
installation directory.

## `sudo npm install -g` Command Fails with an `EPERM` Error 

**Valid on Linux**

**Symptom:**

You receive an `EPERM` error after appending `sudo` to the install
command.

**Solution:**

You can run a script on your Linux PC to resolve the problem. The script
performs the following actions:

1.  Verifies that the CA Brightside prerequisites are installed.
2.  Prompts you to specify a directory location to which to install
    global node modules.
3.  Creates the specified directory.
4.  Sets the npm global install directory to the new directory.
5.  Adds the new directory to the $PATH environmental variable.  
    You can install CA Brightside.

**Follow these steps:**

1.  [Download the setup-node.sh shell
    script](attachments/478937201/478937202.sh)

2.  Issue the following command to add executable permissions for all
    users on the` setup-node.sh` shell script:
    
    <div class="code panel caCodePanel">
    
    <div class="codeContent panelContent">
    
    ``` ca-code-default
    chmod +x setup-node.sh
    ```
    
    </div>
    
    </div>

3.  Execute the shell script.

4.  Follow the prompts to enter a new directory location for global node
    modules.   
    If the script runs successfully, you can install CA Brightside on
    your PC. See[Install CA
    Brightside](Install-CA-Brightside_473021289.html) for more
    information. 

<div class="confluence-information-macro confluence-information-macro-tip">

<span class="aui-icon aui-icon-small aui-iconfont-approve confluence-information-macro-icon"></span>

<div class="confluence-information-macro-body">

**Tip:** If the script fails, rerun the script. If the script fails
again on the same step, you can perform the script operations manually.
See the npm documentation about [how to change the default global node
module
directory](https://docs.npmjs.com/getting-started/fixing-npm-permissions#option-two-change-npms-default-directory)
manually.

</div>

</div>

## `npm install -g` command fails due to `npm ERR! Cannot read property 'pause' of undefined` error

**Valid on Windows or Linux**

**Symptom:**

You receive the error message `npm ERR! Cannot read property 'pause' of
undefined` when you attempt to install the product. 

**Solution:**

This behavior is due to a problem with Node Package Manager (npm). If
you encounter this problem, revert to a previous version of npm that
does not contain this defect. To revert to a previous version of npm,
issue the following command:

`npm install npm@5.3.0 -g`

## Node.js Commands Do Not Respond as Expected

**Valid on Windows or Linux**

**Symptom:**

You attempt to issue node.js commands and you do not receive the
expected output.

**Solution:**

There might be a program that is named *node* on your path. The Node.js
installer automatically adds a program that is named *node* to your
path. When there are pre-existing programs that are named *node* on your
computer, the program that appears first in the path is used. To correct
this behavior, change the order of the programs in the path so that
Node.js appears first.

## Unable to Create a `zosmf` Profile

**Valid on Windows or Linux**

**Symptom:**

When you attempt to create a `zosmf` profile, the following message
displays:

<div class="code panel caCodePanel">

<div class="codeContent panelContent">

``` ca-code-default
Expect Error: A meta profile of type "zosmf", does NOT supply a configuration.
```

</div>

</div>

**Solution:**

This behavior affects only customers that installed CA Brightside from
media that was acquired during the *CA Brightside Early Access Preview.*

To correct this behavior, browse to and delete the following directory
from your
PC:

<div class="code panel caCodePanel">

<div class="codeContent panelContent">

``` ca-code-default
C:\Users\<user_name>\.brightside
```

</div>

</div>

<div class="confluence-information-macro confluence-information-macro-note">

<span class="aui-icon aui-icon-small aui-iconfont-warning confluence-information-macro-icon"></span>

<div class="confluence-information-macro-body">

**Note:** The `C:\Users\<user_name>\.brightside` directory contains CA
Brightside log files and other miscellaneous files that were generated
when you used the Early Access Preview version of the product. Deleting
the directory does not harm your PC.

</div>

</div>

After you delete the directory, you can create a `zosmf` profiles
successfully. For more information, see [Create a
Profile](Create-a-Profile_473021290.html).

##Installation Fails on Oracle Linux 6

**Valid on Oracle Linux 6**

**Symptom:**

You recieve error messages when you attempt to install the product on an
Oracle Linux 6 operating system. 

**Solution:**

Install the product on Oracle Linux 7 or another Linux or Windows OS. CA
Brightside is not compatible with Oracle Linux 6.

