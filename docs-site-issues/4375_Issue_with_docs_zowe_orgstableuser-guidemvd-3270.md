# Issue #4375: Issue with docs.zowe.org/stable/user-guide/mvd-3270/

**URL:** https://github.com/zowe/docs-site/issues/4375

**Created:** 2025-05-06T08:00:05Z

**Updated:** 2025-05-09T07:52:20Z

**Labels:** area: webui

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
I see in /appServer-2025-05-06-07-42.log

"zowe": { 
  "workspaceDirectory": "/u/tmp/zowec/workspace", 
  "externalDomains": [ 
    "10.1.1.2" 
  ], 
  "environments": { 
    "ZWED_SSH_PORT": 22, 
    "ZWED_TN3270_PORT": 23, 
    "ZWED_TN3270_SECURITY": "telnet", 
    "ZWED_SSH_HOST": "10.1.1.2", 
    "ZWED_TN3270_HOST": "10.1.1.2", 
    "ZWED_TN3270_ROW": 24, 
    "ZWED_TN3270_COL": 80, 
    "ZWED_TN3270_MOD": "5" 
  }, 

But I cannot find these mentioned in the doc ( I searched for ZWED_TN3270_MOD) 
Are these user specifiable? If so please document them.


## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

---

## Validation Status: ✅ CAN BE CLOSED (Partially)

**Validation Date:** 2026-05-22

**Validator:** Mistral Vibe

**Findings:** The issue is **PARTIALLY RESOLVED**. The user asked about environment variables like `ZWED_TN3270_MOD`, `ZWED_TN3270_ROW`, `ZWED_TN3270_COL`, etc., which they found in logs but not in documentation.

**User's Discovery:**
> "I see in /appServer-2025-05-06-07-42.log:"
> ```json
> "zowe": { 
>   "environments": { 
>     "ZWED_SSH_PORT": 22, 
>     "ZWED_TN3270_PORT": 23, 
>     "ZWED_TN3270_SECURITY": "telnet", 
>     "ZWED_SSH_HOST": "10.1.1.2", 
>     "ZWED_TN3270_HOST": "10.1.1.2", 
>     "ZWED_TN3270_ROW": 24, 
>     "ZWED_TN3270_COL": 80, 
>     "ZWED_TN3270_MOD": "5" 
>   } 
> }```
> "Are these user specifiable? If so please document them."

**Current Documentation State:**

The file `docs/user-guide/mvd-3270.md` **DOES document these environment variables** (lines 14-36):

```markdown
You can customize the preferences in the yaml configuration via environment variables:
* `ZWED_TN3270_PORT`: port number
* `ZWED_TN3270_SECURITY`: `telnet` or `tls`
* `ZWED_TN3270_HOST`: host name 
* `ZWED_TN3270_ROW`: alternate rows
* `ZWED_TN3270_COL`: alternate columns  
* `ZWED_TN3270_MOD`: screen mode, following values are supported
  * `1`: 24x80
  * `2`: 32x80
  * `3`: 43x80
  * `4`: 27x132
  * `5`: Dynamic    
* `ZWED_TN3270_CODEPAGE`: CCSID, following values are supported
  * `037`, `1047`, `273`, `277`, `278`, `280`, `284`, `290`, `297`, `420`, `424`, `500`, `838`, `870`, `875`, `918`, `924`, `937`, ` 935`, `930`

Example of environment variables:
```yaml
zowe:
  environments:
    ZWED_TN3270_PORT: "23"
    ZWED_TN3270_SECURITY: "telnet"
    ZWED_TN3270_HOST: "lpar1.example.com"
    ZWED_TN3270_ROW: "24"
    ZWED_TN3270_COL: "80"
    ZWED_TN3270_MOD: "5"
    ZWED_TN3270_CODEPAGE: "1047"
```
```

**Assessment:**

**✅ THE DOCUMENTATION NOW EXISTS** - The user's concern has been addressed. The documentation now clearly lists:
1. All the TN3270 environment variables
2. Their valid values
3. How to configure them in zowe.yaml
4. Example configuration

However, the issue was opened on **2025-05-06** and the documentation may have been missing at that time, or the user may have been looking at an older version.

**What's Still Missing:**

| Environment Variable | Documented? | Issue |
|---------------------|-------------|-------|
| `ZWED_SSH_PORT` | ❌ NO | Not in mvd-3270.md |
| `ZWED_SSH_HOST` | ❌ NO | Not in mvd-3270.md |

The user also found `ZWED_SSH_PORT` and `ZWED_SSH_HOST` in the logs, which are **NOT documented** in `mvd-3270.md`. These appear to be for the SSH terminal (vt-ng2), not the TN3270 terminal.

**Recommendation:**

1. **The main issue (TN3270 variables) is RESOLVED** - The documentation now covers these.

2. **Document SSH variables** in the VT Terminal documentation:
   - Add `ZWED_SSH_PORT` and `ZWED_SSH_HOST` to the VT Terminal documentation
   - Or create a combined "Terminal Environment Variables" reference

3. **Add a cross-reference** in `mvd-3270.md` pointing to SSH/VT documentation for related variables

4. **Consider adding a table** of all terminal-related environment variables in one place for easy reference

**Impact:**
- **Severity:** LOW (for TN3270) / MEDIUM (for SSH variables)
- **User Impact:** TN3270 variables are now documented
- **Remaining Gap:** SSH terminal variables still undocumented

**Technical Clarification:**

**Q: Are the TN3270 environment variables user-specifiable?**
A: **YES** - They are documented and can be configured in `zowe.yaml` under `zowe.environments`

**Q: What does ZWED_TN3270_MOD=5 mean?**
A: It sets the screen mode to **Dynamic** (5). Other values: 1=24x80, 2=32x80, 3=43x80, 4=27x132

**Q: Where are ZWED_SSH_PORT and ZWED_SSH_HOST documented?**
A: Currently **NOT documented** in the stable docs. These need to be added.

**Q: Why are these in the log file?**
A: These are the resolved environment variables being used by the terminal application. They come from the `zowe.yaml` configuration or defaults.

**Related Documentation:**
- `docs/user-guide/mvd-3270.md` (TN3270 - now complete)
- `docs/user-guide/mvd-configuration.md` (VT Terminal - needs SSH variables)
- Consider a unified terminal configuration reference

**Conclusion:**
The main issue (TN3270 variables) can be **CLOSED**. However, a follow-up issue should be opened to document the SSH terminal environment variables.

