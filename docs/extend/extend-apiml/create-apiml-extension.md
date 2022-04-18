# Create an Extension for API ML

Zowe allows extenders to define their own extension for API ML. Follow the steps in this article to create your extension and add it to the
API Gateway classpath.

**Note:** The `api-sample-extension-package` contains a sample `manifest.yml` and the `apiml-sample-extension` JAR that contains the extension.

**Follow these steps:**

1. Create a JAR file from your extension. See the [API ML sample extension](https://github.com/zowe/api-layer/blob/master/apiml-sample-extension) to model the format of the JAR.
2. Create a `manifest.yml` with the following structure. See the sample [`manifest.yml`](https://github.com/zowe/api-layer/blob/master/apiml-sample-extension-package/src/main/resources/manifest.yaml) to model the format of the yaml file.     

For more information, see [Packaging z/OS extensions](../packaging-zos-extensions.md).

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

The extension directory `<instance>/workspace/gateway/sharedLibs/` is then added to the API Gateway class path as part of the Zowe instance preparation.

**Note:** The paths defined under `gatewaySharedLibs` can either be a path to the directory where the extensions JARs are located, or a path to the files. 

**Example:**
   ```yaml
    gatewaySharedLibs:
      - path/to/my/lib1/extension1.jar
      - path/to/my/lib2/extension2.jar
   ```

After the JAR file and `manifest.yml` are customized according to your application, the extension is extracted, scanned and added to the extension directory during the Zowe instance preparation. When the API Gateway starts, the the API Gateway consumes the sample extension. 

The extension should now be correctly added to the API Gateway classpath. 

## Call the REST endpoint for validation 

Follow these steps to validate that you can call the REST endpoint defined in the controller via the API Gateway:

1. Call the `https://<hostname>:<gatewayPort>/api/v1/greeting` endpoint though Gateway.
2. Verify that you receive the message, `Hello, I'm a sample extension!` as the response.