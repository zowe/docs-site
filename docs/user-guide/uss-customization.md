# Customize the USS directory for temporary files

- [Customize the USS directory for temporary files](#customize-the-uss-directory-for-temporary-files)
  - [How to customize](#how-to-customize)
    - [In STC](#in-stc)
    - [In zowe.yaml](#in-zoweyaml)

Zowe server components require the use of temporary files. By default, these are written to the global `/tmp` directory in USS file system.
This article describes options to customise the destination directory for all Zowe server components.

## How to customize

There are three environment variables that control the directory used to place these temporary files:

- `TMPDIR`: This is the main environment variable, it controls the directory used for most USS operations.
- `TEMP_DIR`: This variable controls...
- `CATALINA_TMPDIR`: This variable controls the destination directory of Tomcat java servers used in some core components.

### In STC

Global environment variables can be customised directly in the Zowe STC, `zowe.setup.security.stcs.zowe` in `zowe.yaml` is the Zowe started task name. Default value is `ZWESLSTC`.

To add environment variables, follow these steps:

1. Open the STC

2. Find STDENV DD inline statements

3. Add a new line for each environment variable, for example:
  
  ```text
  TMPDIR=<path to directory>
  ```

### In zowe.yaml

Edit your installation `zowe.yaml` file and add values under property `zowe.environments`. For example:

```yaml
zowe:
 environments:
   TMPDIR: <path to directory>
   TEMP_DIR: <path to directory>
   CATALINA_TMPDIR: <path to directory>
```

**Note:** If the variable is defined in both, the definition from `zowe.yaml` has priority.
