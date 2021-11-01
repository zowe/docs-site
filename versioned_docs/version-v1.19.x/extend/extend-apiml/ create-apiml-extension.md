# Create extension for API ML

Zowe allows extenders to define their own extension for API ML. Follow the steps below to create your extension and include it to the
API Gateway classpath:

1. Create a JAR file from your extension
2. Create a `manifest.yml` with the following structure:

   **Example:**
    ```yaml
    ---
    name: apiml-extension
    # Component identifier. This identifier matches artifact path in Zowe Artifactory https://zowe.jfrog.io/.
    id: org.zowe.apiml.sdk.apiml-extension-package
    # Component version is defined in gradle.properties for Gradle project
    # Human readable component name
    title: Your extension for API ML
    # Human readable component description
    description: JAR that contains the API ML extension.
    license: EPL-2.0
    repository:
    type: git
    url: https://github.com/zowe/api-layer.git
    build:
    branch: "{{build.branch}}"
    number: "{{build.number}}"
    commitHash: "{{build.commitHash}}"
    timestamp: "{{build.timestamp}}"
    # The following block contains all the extensions directory path
    # (or file path) that will be included in the API ML
    gatewaySharedLibs:
      - path/to/my/lib1/
      - path/to/my/lib2/
    ```
3. Define the `ZWE_GATEWAY_SHARED_LIBS` environment variable in the `instance.env`. This variable will point to the 
   extension directory, that will be like `<instance>/workspace/gateway/sharedLibs/<extension_id>`

The extension directory will be then added to the API Gateway class path as part of the Zowe instance preparation.
**Note:** The paths defined under `gatewaySharedLibs` can be either path to the directory where the
extensions JARs are located, or path to the files. 

**Example:**
   ```yaml
    gatewaySharedLibs:
      - path/to/my/lib1/extension1.jar
      - path/to/my/lib2/extension2.jar
   ```
