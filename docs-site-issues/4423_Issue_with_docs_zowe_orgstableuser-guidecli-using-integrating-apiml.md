# Issue #4423: Issue with docs.zowe.org/stable/user-guide/cli-using-integrating-apiml/

**URL:** https://github.com/zowe/docs-site/issues/4423

**Created:** 2025-05-10T07:57:33Z

**Updated:** 2025-06-25T19:26:48Z

**Labels:** area: cli, priority-low

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

It says

 Use zosmf_thru_apiml to connect to z/OSMF with API ML and zosmf_direct to connect to z/OSMF directly.


I could not find where you specify this.   please give an example of the zowe cli command using zosmf_thru_apiml

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

**Findings:** The issue is **VALID**. The user cannot find where to specify the connection type (zosmf_thru_apiml vs zosmf_direct) in Zowe CLI commands.

**User's Question:**
> "It says: Use zosmf_thru_apiml to connect to z/OSMF with API ML and zosmf_direct to connect to z/OSMF directly."
> "I could not find where you specify this. Please give an example of the zowe cli command using zosmf_thru_apiml"

**Current Documentation State:**

The file `docs/user-guide/cli-using-integrating-apiml.md` (around line 208) does mention:

```
Use `zosmf_thru_apiml` to connect to z/OSMF with API ML and `zosmf_direct` to connect to z/OSMF directly.
```

And provides a configuration example (lines 221-260) showing:

```json
{
    "$schema": "./zowe.schema.json",
    "defaults": {
        "zosmf": "zosmf_thru_apiml"
    },
    "profiles": {
        "zosmf_thru_apiml": {
            "type": "zosmf",
            "properties": {
                "basePath": "ibmzosmf/api/v1"
            },
            "secure": []
        },
        "zosmf_direct": {
            "type": "zosmf",
            "properties": {
                "port": 1234
            },
            "secure": ["user", "password"]
        }
    }
}
```

**What's Missing:**

The documentation does **NOT** explain:

1. **WHERE to specify which profile to use:**
   - Users don't know they need to use the `--zosmf-profile` option (or rely on defaults)
   - The example shows the configuration but not how to use it in commands

2. **HOW to use these profiles in actual commands:**
   - No example of `zowe zos-files list data-set "DS.*" --zosmf-profile zosmf_thru_apiml`
   - No explanation of the defaults system

3. **WHAT the difference is in practice:**
   - When to use each type
   - What happens if you use the wrong one

**Technical Clarification:**

**Q: Where do I specify zosmf_thru_apiml vs zosmf_direct?**
A: You specify which z/OSMF profile to use in TWO ways:

1. **In your configuration file** (set as default):
   ```json
   "defaults": {
       "zosmf": "zosmf_thru_apiml"  // This makes zosmf_thru_apiml the default
   }
   ```

2. **On the command line** (override the default):
   ```bash
   zowe zos-files list data-set "DS.*" --zosmf-profile zosmf_thru_apiml
   ```

**Q: What's the difference between the two profiles?**
A:
- **zosmf_thru_apiml**: Routes through API ML. Uses `basePath` to identify the service. Requires an API ML token (from `zowe auth login apiml`). Does NOT store username/password in the profile.
- **zosmf_direct**: Connects directly to z/OSMF. Uses `host` and `port` (from base profile) and `port` (can override in service profile). Requires username/password in the profile's `secure` array.

**Q: Can you give me an example command using zosmf_thru_apiml?**
A: Here's a complete example:

```bash
# First, login to API ML to get a token
zowe auth login apiml --host myapiml.example.com --port 7554 \
  --user myuser --password mypassword --base-profile my_apiml

# Then use the zosmf_thru_apiml profile (either as default or explicitly)
zowe zos-files list data-set "COLIN.C.*" --zosmf-profile zosmf_thru_apiml

# Or if zosmf_thru_apiml is set as default in your config:
zowe zos-files list data-set "COLIN.C.*"
```

**Assessment:**
This is a **documentation gap issue**. The configuration example exists but there's no clear explanation of HOW to use these profiles in actual CLI commands.

**Recommendation:**

1. **Add a "Using the Profiles" section** after the configuration example:
   ```markdown
   ### Using zosmf_thru_apiml vs zosmf_direct
   
   After configuring your profiles, you can use them in commands:
   
   **To connect through API ML:**
   ```bash
   # Explicitly specify the profile
   zowe zos-files list data-set "DS.*" --zosmf-profile zosmf_thru_apiml
   
   # Or set it as default in your configuration
   ```
   
   **To connect directly to z/OSMF:**
   ```bash
   zowe zos-files list data-set "DS.*" --zosmf-profile zosmf_direct
   ```
   
   **To check which profile is being used:**
   ```bash
   zowe config list --zosmf
   ```
   ```

2. **Add a comparison table:**
   ```markdown
   | Feature | zosmf_thru_apiml | zosmf_direct |
   |---------|------------------|--------------|
   | Connection | Through API ML Gateway | Direct to z/OSMF |
   | Authentication | API ML token (from base profile) | Username/password (in profile) |
   | Host/Port | From base profile | From base profile + service profile port |
   | Base Path | Required (`ibmzosmf/api/v1`) | Not used |
   | Token Required | ✅ Yes (stored in base profile) | ❌ No |
   | Username/Password in Profile | ❌ No | ✅ Yes (in secure array) |
   | When to Use | When using API ML SSO | When connecting directly to z/OSMF |
   ```

3. **Add a decision tree:**
   ```markdown
   **Should I use zosmf_thru_apiml or zosmf_direct?**
   
   Use **zosmf_thru_apiml** if:
   - You're using API Mediation Layer
   - You want single sign-on (SSO) across multiple services
   - Your z/OSMF is registered with API ML
   - You have a valid API ML token
   
   Use **zosmf_direct** if:
   - You're NOT using API Mediation Layer
   - You want to connect directly to z/OSMF
   - Your z/OSMF is not registered with API ML
   - You need to bypass API ML for some reason
   ```

4. **Clarify the defaults system:**
   ```markdown
   :::info
   **About Defaults**
   
   In Zowe CLI, you can set default profiles for each service type in your configuration file:
   
   ```json
   "defaults": {
       "zosmf": "zosmf_thru_apiml",
       "base": "my_apiml_profile"
   }
   ```
   
   When you issue a command without specifying a profile, Zowe CLI uses the default profile for that service type.
   
   You can override the default at any time using the `--<service>-profile` option:
   ```bash
   zowe zos-files list data-set "DS.*" --zosmf-profile zosmf_direct
   ```
   :::
   ```

**Impact:**
- **Severity:** MEDIUM
- **User Impact:** Users don't know how to use the different profile types
- **Beginner Impact:** HIGH - Beginners won't understand the profile system
- **Configuration Impact:** MEDIUM - Users might configure profiles incorrectly

**Related Documentation:**
- `docs/user-guide/cli-using-integrating-apiml.md` (primary - needs enhancement)
- `docs/user-guide/cli-using-using-team-profiles.md` (profile usage)
- `docs/user-guide/cli-using-understand-profiles-configs.md` (profile system explanation)

