# Overriding untrusted TLS certificates

If the CMCI connection uses a TLS certificate that does not exist in your PC's trust store, then by default the connection is rejected because the certificate could be from an unsafe site.

To override this behavior, set the `Only accept trusted TLS certificates` field to `False` on the form when creating or updating the profile. This is the same as setting `rejectUnauthorized=false` on the Zowe CICS CLI profile.

If you define a profile to accept trusted TLS certificates only when the Zowe Explorer first connects, it detects the mismatch and display a message. You can select **Yes** to override the profile's setting to accept the untrusted certificate authority.  

![Image that shows how to accept untrusted TLS certificate](../images/ze-cics/untrusted-cert.gif)
