# Generating command responses in JSON format

Imperative CLI Framework lets plug-in developers build plug-ins that generate command responses in JSON format. With this capability, developers can build plug-ins that generate command execution results that can be consumed programmatically from other languages, such as Python, Java, and any language that can parse JSON.

By default, all commands build on Imperative CLI Framework contain a `--response-format-json` option. When you use this option, the command prints the command execution results in JSON format, rather than writing directly to `stdout` and `stderr`.

**Example:** The sample-cli contains the following example about how you can build CLIs that generate command responses in JSON format:

```typescript
sample-cli goodbye bud --name yodo --response-format-json: 
{
  "success": true,
  "message": "",
  "stdout": "Goodbye yodo\n",
  "stderr": "",
  "responseObject": [],
  "errors": []
}
```
