# Overriding untrusted TLS certificates

There are occasions where a user would want to override a rejected TLS certificate.

By default, if the CICS Management Client Interface (CMCI) connection uses a TLS certificate that does not exist in your PC's trust store, Zowe Explorer rejects the connection because the certificate could originate from an unsafe site.

You might want to override this behavior if you are using certificates not signed by a recognized certificate-issuing authority. For instance, z/OSMF might only have certificates created on the mainframe, resulting in self-signed certificates. Zowe Explorer rejects these types of certificates by default as a security measure.

To override this behavior, set the `Only accept trusted TLS certificates` field to `False` for the **[CICS?]** profile in the team configuration file. This is the same as setting `rejectUnauthorized=false` on the Zowe CICS CLI profile.

![Image that shows how to accept untrusted TLS certificate](../images/ze-cics/untrusted-cert.gif)
