# Issue #4421: Issue with docs.zowe.org/stable/user-guide/cli-using-integrating-apiml/

**URL:** https://github.com/zowe/docs-site/issues/4421

**Created:** 2025-05-10T06:55:57Z

**Updated:** 2026-04-16T18:54:47Z

**Labels:** area: cli, priority-medium

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

Logging in with a client certificate:
zowe auth login apiml --host <APIML Host> --port <APIML Port> --cert-file <PEM Public Certificate Path> --cert-key-file <PEM Private Certificate Path> --base-profile <profile_name>

I used the base-profile, I do not see why I need I need to specify _--host <APIML Host> --port <APIML Port> --cert-file <PEM Public Certificate Path> --cert-key-file <PEM Private Certificate Path>_  all over again.  I was expecting to do 

**zowe zos-files list data-set "COLIN.C.*" --base-profile global_base  --reject-unauthorized false** 
and have it remember  the host,port and certificate.

Please add more explaination.. on what this section is telling me.  Also please explain what I need to do to get my
**zowe zos-files list data-set "COLIN.C.*" --base-profile global_base  --reject-unauthorized false** 

to work.






## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

---

## Validation Status: ✅ STILL OPEN

**Validation Date:** 2026-05-22

**Validator:** Mistral Vibe

**Findings:** The issue is **VALID**. The user is confused about why they need to specify connection parameters (host, port, certificate files) when using `--base-profile` for authentication, and how to make subsequent commands work with the stored profile.

**User's Confusion:**
> "I used the base-profile, I do not see why I need to specify `--host <APIML Host> --port <APIML Port> --cert-file <PEM Public Certificate Path> --cert-key-file <PEM Private Certificate Path>` all over again."
> "I was expecting to do `zowe zos-files list data-set "COLIN.C.*" --base-profile global_base --reject-unauthorized false` and have it remember the host, port and certificate."

**Current Documentation State:**

The file `docs/user-guide/cli-using-integrating-apiml.md` (around line 107) documents:

```bash
zowe auth login apiml --host <APIML Host> --port <APIML Port> --cert-file <PEM Public Certificate Path> --cert-key-file <PEM Private Certificate Path> --base-profile <profile_name>
```

And later (around line 138):
```bash
zowe zos-files list data-set <searchPattern> --base-profile <profile_name>
```

**What's Missing:**

The documentation does **NOT** clearly explain:

1. **Why certificate parameters are required for login even with --base-profile:**
   - The `--base-profile` option specifies WHERE to store the token/credentials
   - The `--host`, `--port`, `--cert-file`, `--cert-key-file` parameters are the actual credentials needed TO OBTAIN the token
   - These are NOT stored in the base profile - they are used once to authenticate and get a token

2. **What actually gets stored in the base profile:**
   - The API ML token (JWT/LTPA)
   - The token type
   - The host and port of the API ML instance
   - BUT NOT the certificate private key (for security reasons)

3. **How subsequent commands work:**
   - After login, the token is stored in the base profile
   - Commands can use `--base-profile` to reference the stored token
   - The certificate is NOT needed for subsequent commands because the token is used instead

4. **The `--reject-unauthorized false` flag:**
   - This is for TLS certificate validation, not for client certificate authentication
   - It controls whether the CLI verifies the server's TLS certificate
   - It has nothing to do with the client certificate used for authentication

**Technical Clarification:**

**Q: Why do I need to specify host, port, cert-file, cert-key-file if I'm using --base-profile?**
A: The `--base-profile` tells Zowe CLI WHERE to store the authentication token after login. The other parameters (host, port, certificate files) are the actual authentication credentials needed to OBTAIN that token from API ML. The base profile doesn't contain your private key - it only contains the token that API ML returns after validating your certificate.

**Q: Can I avoid specifying the certificate paths on every command?**
A: YES! After you run `zowe auth login apiml --cert-file ... --cert-key-file ... --base-profile myprofile`, you only need to specify `--base-profile myprofile` on subsequent commands. The token stored in the profile is used for authentication, so you don't need the certificate files again until the token expires.

**Q: Where is the certificate information stored?**
A: The certificate public/private key paths are NOT stored persistently. They are only used during the login command to obtain a token. The token (not the certificate) is what gets stored in your base profile configuration file.

**Q: What does `--reject-unauthorized false` do?**
A: This flag tells Zowe CLI to NOT validate the TLS/SSL certificate of the API ML server. This is useful for testing with self-signed certificates, but should NOT be used in production. It has nothing to do with client certificate authentication.

**Q: How do I make `zowe zos-files list data-set "COLIN.C.*" --base-profile global_base --reject-unauthorized false` work?**
A: First, you need to authenticate and store the token:
```bash
zowe auth login apiml --host <APIML_Host> --port <APIML_Port> \
  --cert-file <Public_Cert.pem> --cert-key-file <Private_Key.pem> \
  --base-profile global_base --reject-unauthorized false
```
Then you can run your command:
```bash
zowe zos-files list data-set "COLIN.C.*" --base-profile global_base
```
The `--reject-unauthorized false` is only needed on the login command if your API ML server uses a self-signed certificate.

**Assessment:**
This is a **documentation clarity issue**. The current documentation shows the commands but doesn't explain:
- The difference between authentication parameters (used once to get token) and profile parameters (used to store/retrieve token)
- That certificates are only needed for login, not for subsequent commands
- The purpose of `--reject-unauthorized` vs client certificate authentication

**Recommendation:**

1. **Add a "How it works" section** before the login examples explaining:
   - Base profiles store tokens, not certificates
   - Certificates are used once to obtain a token
   - Tokens are used for subsequent API calls
   - `--reject-unauthorized` controls server certificate validation, not client cert auth

2. **Add a troubleshooting tip** explaining common mistakes:
   ```markdown
   :::tip Common Mistakes
   - **Mistake:** Trying to use `--cert-file` on every command
     **Fix:** Only use certificate parameters with `zowe auth login apiml`. Use `--base-profile` for subsequent commands.
   
   - **Mistake:** Using `--reject-unauthorized false` to "enable" client certificates
     **Fix:** `--reject-unauthorized false` only disables server certificate validation. Client certificates are specified with `--cert-file` and `--cert-key-file` on the login command.
   
   - **Mistake:** Not specifying `--base-profile` on subsequent commands
     **Fix:** Always use `--base-profile <name>` to tell Zowe CLI which stored token to use.
   :::
   ```

3. **Add a complete example workflow:**
   ```markdown
   ### Complete Client Certificate Authentication Workflow
   
   1. **Login with client certificate (one time):**
      ```bash
      zowe auth login apiml \
        --host myapiml.example.com \
        --port 7554 \
        --cert-file /path/to/client-cert.pem \
        --cert-key-file /path/to/client-key.pem \
        --base-profile my_apiml_profile \
        --reject-unauthorized false  # Only if using self-signed cert
      ```
   
   2. **Use the stored token for subsequent commands:**
      ```bash
      # No certificate parameters needed - token is used
      zowe zos-files list data-set "COLIN.C.*" --base-profile my_apiml_profile
      
      # Or with server certificate validation disabled
      zowe zos-files list data-set "COLIN.C.*" \
        --base-profile my_apiml_profile \
        --reject-unauthorized false
      ```
   
   3. **When the token expires, repeat Step 1**
   ```

4. **Clarify the difference between authentication and connection parameters:**
   Add a table showing:
   | Parameter | Used For | Stored In Profile? | Needed Every Command? |
   |-----------|----------|-------------------|----------------------|
   | `--host`, `--port` | Connecting to API ML | ✅ Yes | ❌ No (from profile) |
   | `--cert-file`, `--cert-key-file` | Client cert authentication | ❌ No (security) | ❌ No (token used) |
   | `--base-profile` | Specifying which profile to use | N/A | ✅ Yes |
   | `--reject-unauthorized false` | Disabling server cert validation | ❌ No | ✅ Yes (if needed) |

**Impact:**
- **Severity:** MEDIUM
- **User Impact:** Users are confused about how client certificate authentication works with profiles
- **Beginner Impact:** HIGH - Beginners will struggle to get client certificate auth working
- **Security Impact:** MEDIUM - Users might store private keys insecurely trying to make it work

**Related Documentation:**
- `docs/user-guide/cli-using-integrating-apiml.md` (primary - needs enhancement)
- `docs/user-guide/cli-using-creating-global-user-profiles.md` (profile creation)
- `docs/user-guide/cli-using-understand-profiles-configs.md` (how profiles work)

