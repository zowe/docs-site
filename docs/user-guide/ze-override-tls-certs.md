# Overriding untrusted TLS certificates

There are times when a user might want to override a rejected TLS certificate.

By default, if the CICS Management Client Interface (CMCI) connection uses a TLS certificate that does not exist in your PC's trust store, Zowe Explorer rejects the connection because the certificate could originate from an unsafe site.

You might want to override this behavior if you are using certificates not signed by a recognized certificate-issuing authority. For instance, z/OSMF might only have certificates created on the mainframe, resulting in self-signed certificates. Zowe Explorer rejects these types of certificates by default as a security measure.

There are two ways to override a rejected TLS certificate.

## Updating the CICS profile with Zowe Explorer

1. Attempt the CMCI connection.

    Zowe Explorer rejects the TLS certificate and displays a pop-up message warning about the certificate.

2. Select the **Yes** option on the warning.

    Zowe Explorer updates the `rejectUnauthorized` property in the respective CICS profile to `false` and updates the **CICS** tree with the modified profile.

    ![Image that shows how to accept untrusted TLS certificate](../images/ze-cics/untrusted-cert.gif)

## Updating the CICS profile manually

1. Expand the **CICS** tree in the Visual Studio Code **Side Bar**, and right-click a profile to open up the profile menu actions.

2. Select the **Update Profile** option.

   The associated configuration file opens in an **Editor**.

3. Edit the configuration file to set the `rejectUnauthorized` property in the respective CICS profile to `false`.

4. Save the configuration file.

5. Refresh the Zowe Explorer for IBM CICS extension. Either click the **Refresh** icon at the top of the **CICS** tree in the **Side Bar**, or select the `Zowe Explorer for IBM CICS: Refresh` option in the **Command Palette**.
