# Issue #4361: Issue with docs.zowe.org/stable/user-guide/authenticating-with-client-certificates/

**URL:** https://github.com/zowe/docs-site/issues/4361

**Created:** 2025-05-04T17:20:34Z

**Updated:** 2025-12-16T10:21:23Z

**Labels:** area: apiml, priority-high, Size: S

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
it says

:7554/gatew

the doc should say where 7554 is the port allocated the gateway in the .yaml file - defaulting to 7554

## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

---

## Validation Status: ❌ STILL OPEN

**Validation Date:** 2026-05-22

**Validator:** Mistral Vibe

**Findings:** The issue is **VALID**. The user wants clarification about port 7554 - specifically that it's the port allocated to the gateway in the zowe.yaml file and defaults to 7554.

**User's Request:**
> "it says :7554/gatew"
> "the doc should say where 7554 is the port allocated the gateway in the .yaml file - defaulting to 7554"

**Current Documentation State:**
The file `docs/user-guide/authenticating-with-client-certificates.md` contains this example and note:

```bash
curl -X POST \
--cert /path/to/cert.pem \
--key /path/to/key.pem \
https://api-mediation-layer:7554/gateway/api/v1/auth/login -v
```

With the note:
```
* **7554**  
  This value is a place holder. Replace this value with the configured API Gateway port in the instance
```

**What's Missing:**
The current note says "Replace this value with the configured API Gateway port in the instance" but doesn't explain:
1. WHERE this port is configured (in zowe.yaml)
2. WHAT the property name is
3. WHAT the default value is

**Investigation Results:**

The gateway port is configured in `zowe.yaml` as:
```yaml
components:
  gateway:
    port: 7554
```

The default port is indeed **7554** for HTTPS.

**Assessment:**
This is a **documentation completeness issue**. The note about port 7554 exists but is incomplete - it doesn't tell users where to find or configure this port.

**Recommendation:**

1. **Update the note** in `authenticating-with-client-certificates.md`:
   ```markdown
   * **7554**  
     This value is a placeholder. Replace this value with the API Gateway port configured in your `zowe.yaml` file under `components.gateway.port`. The default port is 7554.
   ```

2. **Add a reference link** to the system requirements or configuration documentation:
   ```markdown
   For more information about gateway port configuration, see [System requirements - Ports](../../user-guide/systemrequirements-zos.md).
   ```

3. **Ensure consistency** across all examples that mention port 7554:
   - Add similar notes to other files using port examples
   - Standardize the port placeholder format (consider `{gateway-port}`)

**Impact:**
- **Severity:** MEDIUM
- **User Impact:** Users don't know where to configure the gateway port
- **Configuration Impact:** Users may not realize they can/should change the port
- **Clarity Impact:** Incomplete information about configuration location

**Technical Clarification:**

**Q: Where is the gateway port configured?**
A: In the `zowe.yaml` configuration file, under `components.gateway.port`

**Q: What's the default gateway port?**
A: **7554** (HTTPS)

**Q: Can I change the gateway port?**
A: Yes, you can change it in `zowe.yaml`. After changing, update your curl commands and any client configurations to use the new port.

**Q: Where can I find more information about port configuration?**
A: See the [System requirements - Ports](../../user-guide/systemrequirements-zos.md) documentation.

**Related Documentation:**
- `docs/user-guide/authenticating-with-client-certificates.md` (primary - needs fix)
- `docs/user-guide/systemrequirements-zos.md` (port defaults reference)
- `docs/user-guide/configure-zos-system.md` (zowe.yaml configuration)

