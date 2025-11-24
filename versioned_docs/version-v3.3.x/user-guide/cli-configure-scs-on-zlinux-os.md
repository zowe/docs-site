# Configure Secure Credential Store on z/Linux operating systems

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
