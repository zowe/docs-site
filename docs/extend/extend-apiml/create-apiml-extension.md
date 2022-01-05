# Create an Extension for API ML

Zowe allows extenders to define their own extension for API ML. Follow the steps in this article to create your extension and include it to the
API Gateway classpath:

1. Create a JAR file from your extension.
2. Create a `manifest.yml` with the following structure (check out [Packaging z/OS extensions](../packaging-zos-extensions.md) for more information):

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
3. Define the `ZWE_GATEWAY_SHARED_LIBS` environment variable in the `instance.env`. This variable points to the 
   extension directory.
   
   **Example:** `<instance>/workspace/gateway/sharedLibs/<extension_id>`

The extension directory is then added to the API Gateway class path as part of the Zowe instance preparation.
**Note:** The paths defined under `gatewaySharedLibs` can either be a path to the directory where the
extensions JARs are located, or a path to the files. 

**Example:**
   ```yaml
    gatewaySharedLibs:
      - path/to/my/lib1/extension1.jar
      - path/to/my/lib2/extension2.jar
   ```

## API ML sample extension

There is an [API ML sample extension](https://github.com/zowe/api-layer/blob/master/apiml-sample-extension) that contains a simple controller for testing
and which is packaged in Zowe.

The extension is extracted, scanned and added to the extension directory during the Zowe instance preparation, and afterwards the sample extension will be consumed 
by the API Gateway once it is started.
If the extension is correctly added to the API Gateway classpath, it will be possible to
call the REST endpoint defined in the controller via API Gateway.

1. Call the `https://<hostname>:<gatewayPort>/api/v1/greeting` endpoint though Gateway
2. Verify that you get the message `Hello, I'm a sample extension!` as response