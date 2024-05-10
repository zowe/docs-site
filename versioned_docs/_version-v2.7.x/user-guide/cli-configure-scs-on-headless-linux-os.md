# Configuring Secure Credential Store on headless Linux operating systems

Perform the following configurations on headless and z/Linux operating systems.

## Headless Linux requirements

- Ensure that you installed the Secure Credential Store requirements that are described in [System Requirements](../user-guide/systemrequirements-cli.md).
- Unlock the Gnome keyring to allow you to load and store credentials on headless Linux operating systems. You can unlock the keyring manually or automatically.

**Note:** On z/Linux operating systems, complete the steps in [Configuring z/Linux](#configuring-zlinux) before you continue.  

### Unlocking the keyring manually

Issue the following commands to unlock the keyring manually. You must unlock the keyring in each user session.

```bash
export $(dbus-launch)
gnome-keyring-daemon -r --unlock --components=secrets
```

**Note:** The `gnome-keyring-daemon -r --unlock --components=secrets` prompts you to specify a password. Press `Ctrl+D` twice after you specify the password. 

### Unlocking the keyring automatically

When you are using SSH or TTY to log in to Linux, you can configure the Gnome keyring to unlock automatically when you log in.

**Note:** The following steps were tested on CentOS, SUSE, and Ubuntu operating systems. The steps do not work on WSL (Windows Subsystem for Linux) because it bypasses TTY login. Results may vary on other Linux distributions. 

**Follow these steps:**

1. Install the PAM module for Gnome keyring. The package name depends on your distribution:

    - `gnome-keyring-pam`: CentOS, Fedora, SUSE
    - `libpam-gnome-keyring`: Debian, Ubuntu

2. Apply the following edits to the files `/etc/pam.d/login` (for TTY login), and `/etc/pam.d/sshd` if it exists (for SSH login).

    - Add the following statement to the end of the `auth` section:
    
        ```
        auth optional pam_gnome_keyring.so
        ```

    - Add the following statement to end of the `session` section:
    
        ```
        session optional pam_gnome_keyring.so auto_start
        ```

3. Add the following statements to `~/.bashrc`. The statement lets you launch DBus, which the Gnome keyring requires. Also the statement lets the keyring daemon start so that it is ready to be used by Zowe CLI commands.
    ```bash
    if test -z "$DBUS_SESSION_BUS_ADDRESS" ; then
      exec dbus-run-session -- $SHELL
    fi
    ```

4. Start the Gnome keyring daemon:
    ```
    gnome-keyring-daemon --start --components=secrets
    ```

5. Restart your computer.

    Issue a Zowe CLI command that uses secure credentials to test that automatic unlock of the keyring works.

## Configuring z/Linux

The Secure Credential Store (SCS) does not contain the  native, pre-built binaries that are required to access the credential vault on z/Linux operating systems.

Because the credential manager is now a built-in function of Zowe CLI, developers must build the credential mananger binaries on z/Linux systems during the Zowe CLI installation process.

The following steps describe how to install and build the credential store binaries on z/Linux (Red Hat Enterprise Linux (RHEL) and Ubuntu) systems.

1. Install the following Linux packages on the z/Linux system:
    - make
    - gcc-c++ (sometimes available as g++)
    - gnome-keyring
    - libsecret (sometimes available as libsecret-1-0)
    - libsecret-devel (sometimes available as libsecret-1-dev)
    - Python 3.6 or later

    **Note:** If you are installing the Linux packages on a z/Linux system, the system where you are configuring SCS might require Internet access. When a site hosts its own package repositories, the repositories might not contain all of the packages that are required to configure the SCS. In this scenario, the z/Linux system requires Internet access to install the required packages.

2. If you are configuring SCS on a Ubuntu z/Linux operating system, no further action is required. You can now install Zowe CLI. For all other platforms (RHEL), continue to the next step.

3. Enable the `rhel-#-for-system-z-optional-rpms` repository to download libsecret-devel.

    Replace ***#*** with the major version of RHEL that is running on the z/Linux system.

    If your license entitles you to this repository, issue the following command to enable it:
    
    ```
    subscription-manager repos —-enable rhel-#-for-system-z-optional-rpms
    ```

4. If you are configuring SCS to run on RHEL V8.x or later, no further action is required. You can now install Zowe CLI. For RHEL V7.x, continue to the next step.
5. Install the Red Hat Developer Toolset to ensure that you are running a version of the gcc-c++ compiler that can build the SCS native binaries.
    
    Issue the following commands to enable the repositories that are required to install the toolset:
    ```
    subscription-manager repos --enable rhel-7-server-for-system-z-rhscl-rpms
    subscription-manager repos --enable rhel-7-server-for-system-z-rhscl-source-rpms
    subscription-manager repos --enable rhel-7-server-for-system-z-rhscl-debug-rpms
    subscription-manager repos --enable rhel-7-for-system-z-optional-source-rpms
    subscription-manager repos --enable rhel-7-for-system-z-optional-debug-rpms
    ```
6. Install the toolset:
    ```
    yum install devtoolset-11
    ```
7. After you install the toolset on RHEL V7.x, you can install Zowe CLI.

    **Important:** The SCS is installed every time that you install or update Zowe CLI. On RHEL V7.x, ensure that the Red Hat Developer Toolset is enabled every time you install or update Zowe CLI. When you do not enable the toolset, secure credential management is not available on the system. To ensure that the toolset is enabled when you install Zowe CLI, issue the following commands instead of the standard NPM install commands. For example:
    ```
    scl enable devtoolset-11 ‘npm install -g @zowe/cli@next’
    scl enable devtoolset-11 ‘npm install -g zowe-cli.tgz’
    ```
    When you run these commands, Zowe CLI is installed globally and the system will use the latest version of the C++ compiler to build the native components. Refer back to the instructions to set up the Secure Credential Storage component of the Zowe CLI.