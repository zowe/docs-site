# Using strict URL validation

:::info Role: system programmer
:::

By default, API ML strictly validates request URLs and rejects requests whose path contains encoded characters. Encoded characters include:

* encoded slashes (`%2F`)
* encoded double slashes (`%2F%2F`)
* backslashes (`%5C`)
* encoded percent signs (`%25`)
* encoded periods (`%2E`)
* semicolons (`;`).

:::note Behavior change in Zowe v3.6:
Prior to Zowe v3.6, API ML allowed encoded slashes by default. The property that controlled this (`components.gateway.apiml.service.allowEncodedSlashes`) was removed and replaced with `components.gateway.apiml.security.enableStrictUrlValidation`. Because strict validation is now **enabled** by default, requests with encoded characters that were previously accepted will now be rejected. If your southbound services require these characters, you must explicitly set `enableStrictUrlValidation` to `false` to restore the pre-v3.6 behavior.
:::

If you are onboarding applications that expose endpoints which expect any of these characters (for example, encoded slashes) in the URL path, you can relax validation for routed traffic. We recommend that you keep the default strict validation unless you have applications that require these characters.

Use the following procedure to relax URL validation.

1. Open the file `zowe.yaml`.
2. Find or add the property `components.gateway.apiml.security.enableStrictUrlValidation` and set the value to `false`.
   
    ```yaml
    components:
      gateway:
        apiml:
          security:
            enableStrictUrlValidation: false
    ```

3. Restart Zowe.

Requests routed through the Gateway that contain these characters are now accepted. Gateway-internal endpoints continue to be strictly validated regardless of this setting.