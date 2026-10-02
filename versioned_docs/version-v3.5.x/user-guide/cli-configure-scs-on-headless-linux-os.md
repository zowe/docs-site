# Configuring secure credential storage on headless Linux operating systems

Perform the following configurations on headless Linux or z/Linux operating systems.

:::info Required role: systems administrator
:::

:::note

For CI/CD pipelines, we recommend using the credential management provided by the CI/CD tool (for example, Jenkins credentials or GitHub secrets) to store credentials and load them into environment variables in the pipeline. See [Using environment variables](../user-guide/cli-using-using-environment-variables.md#store-credentials-securely-in-cicd-pipelines) for more information.

:::

## Headless Linux operating systems

### Requirements for headless Linux operating systems

- Ensure that you installed the secure credential storage requirements that are described in [Zowe CLI software requirements](../user-guide/systemrequirements-cli.md#secure-credential-storage).
- Unlock the Gnome keyring to allow you to load and store credentials on headless Linux operating systems. You can unlock the keyring manually or automatically, see the following instructions.

### Unlocking the keyring manually

You must unlock the keyring in each user session.

To unlock the keyring manually, open the command prompt and issue the following command:

```bash
export $(dbus-launch)
gnome-keyring-daemon -r --unlock --components=secrets
```

:::note

The `gnome-keyring-daemon -r --unlock --components=secrets` command can appear to hang, but it is waiting for you to enter a password. Type your keyring password (typically the same as your Linux user password), then press `Ctrl`+`D` twice to continue the terminal session.

:::

### Unlocking the keyring automatically

When you are using SSH or TTY to log in to Linux, you can configure the Gnome keyring to unlock automatically when you log in.

:::note

The following steps were tested on CentOS, SUSE, and Ubuntu operating systems. The steps do not work on WSL (Windows Subsystem for Linux) because it bypasses TTY login. Results may vary on other Linux distributions.

:::

To unlock the Gnome keyring automatically when you log in:

1. Follow instructions for your Linux distribution on installing the PAM module for Gnome keyring. The package name depends on your distribution:

    - `gnome-keyring-pam`: CentOS, Fedora, SUSE
    - `libpam-gnome-keyring`: Debian, Ubuntu

2. Use a text editor or the applicable command to edit the files `/etc/pam.d/login` (for TTY login) and `/etc/pam.d/sshd`, if it exists (for SSH login).

    - Add the following statement to the end of the `auth` section:
    
        ```
        auth optional pam_gnome_keyring.so
        ```

    - Add the following statement to end of the `session` section:
    
        ```
        session optional pam_gnome_keyring.so auto_start
        ```

3. Use a text editor or the applicable command to add the following commands to the `~/.bashrc` file:

    ```bash
    if [[ $- == *i* ]]; then  # Only run in interactive mode
      if test -z "$DBUS_SESSION_BUS_ADDRESS" ; then
        exec dbus-run-session -- $SHELL
      fi

      gnome-keyring-daemon --start --components=secrets
    fi
    ```

    The first command launches DBus, which the Gnome keyring requires. The second command starts the keyring daemon so that it is ready to be used by Zowe CLI commands.

4. Restart your computer.

    You have successfully completed the configuration to unlock the Gnome keyring automatically.

5. Issue a Zowe CLI command that uses secure credentials to validate the automatic keyring unlock.

## z/Linux operating systems

### Configuring z/Linux

Zowe CLI does not contain the  native, pre-built binaries that are required to access the credential vault on z/Linux operating systems. Developers must build the credential manager binaries on z/Linux systems during the Zowe CLI installation process.

For instructions to set up the credential manager binaries for Red Hat Enterprise Linux (RHEL) V8.X and Ubuntu z/Linux systems, refer to this section. For instructions specific to RHEL V7.X, see [Configuring RHEL V7.X](#configuring-rhel-v7x).

To install and build the credential storage binaries on z/Linux RHEL V8.X and Ubuntu systems:

1. Use the command prompt to install the following Linux packages on the z/Linux system:
    - `make`
    - `gcc-c++` (sometimes available as `g++`)
    - `gnome-keyring`
    - `libsecret` (sometimes available as `libsecret-1-0`)
    - `libsecret-devel` (sometimes available as `libsecret-1-dev`)
    - Python 3.6 or later

    :::note
    
    If you are installing the Linux packages on a z/Linux system, the system where you are configuring secure credential storage might require Internet access. When a site hosts its own package repositories, the repositories might not contain all of the packages that are required to configure the secure credential storage. In this scenario, the z/Linux system requires Internet access to install the required packages.

    :::

2. If you are configuring secure credential storage on a Ubuntu z/Linux operating system, install Zowe CLI.

    For all other platforms (RHEL), continue to the next step.

3. Enable the `rhel-#-for-system-z-optional-rpms` repository to download libsecret-devel.

    If your license entitles you to this repository, open the command prompt and issue the following command to enable it:
    
    ```
    subscription-manager repos —-enable rhel-#-for-system-z-optional-rpms
    ```

    Replace `#` with the major version of RHEL that is running on the z/Linux system.

4. [Unlock the keyring manually](#unlocking-the-keyring-manually) or [unlock the keyring automatically](#unlocking-the-keyring-automatically) to load and store credentials.

5. If you are configuring secure credential storage to run on RHEL V8.x or later, install Zowe CLI.

## Configuring RHEL V7.X

To install and build the credential storage binaries on z/Linux RHEL V7.X:

1. Use the command prompt to install the following Linux packages on the z/Linux system:
    - `make`
    - `gcc-c++` (sometimes available as `g++`)
    - `gnome-keyring`
    - `libsecret` (sometimes available as `libsecret-1-0`)
    - `libsecret-devel` (sometimes available as `libsecret-1-dev`)
    - Python 3.6 or later

    :::note
    
    If you are installing the Linux packages on a z/Linux system, the system where you are configuring secure credential storage might require Internet access. When a site hosts its own package repositories, the repositories might not contain all of the packages that are required to configure the secure credential storage. In this scenario, the z/Linux system requires Internet access to install the required packages.

    :::

2. Enable the `rhel-#-for-system-z-optional-rpms` repository to download libsecret-devel.

    If your license entitles you to this repository, open the command prompt and issue the following command to enable it:
    
    ```
    subscription-manager repos —-enable rhel-#-for-system-z-optional-rpms
    ```

    Replace `#` with the major version of RHEL that is running on the z/Linux system.

3. Install the Red Hat Developer Toolset to ensure that you are running a version of the gcc-c++ compiler that can build the secure credential storage native binaries.
    
    Issue the following commands to enable the repositories that are required to install the toolset:
    ```
    subscription-manager repos --enable rhel-7-server-for-system-z-rhscl-rpms
    subscription-manager repos --enable rhel-7-server-for-system-z-rhscl-source-rpms
    subscription-manager repos --enable rhel-7-server-for-system-z-rhscl-debug-rpms
    subscription-manager repos --enable rhel-7-for-system-z-optional-source-rpms
    subscription-manager repos --enable rhel-7-for-system-z-optional-debug-rpms
    ```
6. Install the toolset by issuing the following command:
    ```
    yum install devtoolset-11
    ```
7. Install Zowe CLI.

8. [Unlock the keyring manually](#unlocking-the-keyring-manually) or [unlock the keyring automatically](#unlocking-the-keyring-automatically)to load and store credentials.

    :::info important
    
    The secure credential storage capability is installed every time that you install or update Zowe CLI. On RHEL V7.x, ensure that the Red Hat Developer Toolset is enabled every time you install or update Zowe CLI. When you do not enable the toolset, secure credential management is not available on the system. To ensure that the toolset is enabled when you install Zowe CLI, issue the following commands instead of the standard `npm install` commands.
    
    ```
    scl enable devtoolset-11 ‘npm install -g @zowe/cli@next’
    scl enable devtoolset-11 ‘npm install -g zowe-cli.tgz’
    ```
    When you run these commands, Zowe CLI installs globally and the system uses the latest version of the C++ compiler to build the native components. Refer back to the keyring unlocking instructions to set up the the Zowe CLI secure credential storage.

    :::
