# Configure daemon mode on z/Linux operating systems

Currently, Zowe does not offer a prebuilt daemon that can run on z/Linux operating systems. However, developers can build the daemon binary from source.

The following steps describe how to install and build the daemon binary on z/Linux systems and the technical limitations.

1. Ensure that the z/Linux system can communicate using the Internet.
2. Install Zowe CLI on the z/Linux system.
3. Install the following Linux packages on the z/Linux system:

    - make
    - gcc-c++ (or g++)
    - git
    - Rust
      
      For information about how to install Rust, see the [Rust documentation](https://forge.rust-lang.org/infra/other-installation-methods.html).
4. Shallow clone the Zowe CLI Git repository for the version of CLI that you installed. Issue the following command:

    ```
    git clone https://github.com/zowe/zowe-cli –depth 1 –branch v$(zowe –version)
    ```

5. Change to the following directory:

   ```
   zowe-cli/zowex
   ```

6. Build the daemon binary. Issue the following command from the `zowe-cli/zowex` directory:

   ```
   cargo build —-release
   ```

   After the command completes successfully, the Zowe daemon binary is a file named `zowe` that can be found in the `target/release` directory.

7. Copy the binary to another location on the system and add it to your PATH.
8. (Optional) Modify the file permissions to allow others to use the same binary:

   ```
   chmod <permission OCTAL> zowe
   chown <user>:<group> zowe
   ```

   **Example:** The following example illustrates the command to allow all users to run the Zowe binary. However, only the user that created the binary can overwrite the binary.

   ```
   chmod 755 zowe
   ```

   **Note:** You can delete the `.zowe-cli` folder that was created in **Step 4** after the binary builds successfully. The Zowe daemon commands will not function, and the daemon will need to be rebuilt for all new versions of Zowe CLI.