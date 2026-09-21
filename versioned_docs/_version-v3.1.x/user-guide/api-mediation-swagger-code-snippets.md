# Using Swagger Code Snippets in the API Catalog

As part of the *Try it out* functionality, the API Catalog provides **Code Snippets** in different languages for each service API operation. The following languages are supported:

* C
* C#
* Go
* Java
* JavaScript
* Node.js
* PHP
* Python
* cURL

Each of these languages supports a specific HTTP Snippet library (i.e. Java Unirest, Java okhttp etc.).

The basic code snippets provide REST API call samples. To show to the user the real usage of the SDKs, the service onboarder can specify a customized snippet as part of the service configuration:

**Example:**
```yaml
apiInfo:
  -   apiId: zowe.apiml.discoverableclient.rest
      version: 1.0.0
      gatewayUrl: api/v1
      swaggerUrl: ${apiml.service.scheme}://${apiml.service.hostname}:${apiml.service.port}${apiml.service.contextPath}/v3/api-docs/apiv1
      documentationUrl: https://www.zowe.org
      defaultApi: true
      codeSnippet:
        - endpoint: /greeting
          language: java
          codeBlock: |
            System.out.println("Greeting code snippet");
        - endpoint: /{yourName}/greeting
          language: javascript
          codeBlock: |
            console.log("Your name greeting code snippet");
```

**Example:**

<img src={require("../images/api-mediation/customized-code-snippets.png").default} alt="basic code snippets" width="700px"/>

## Generate the code snippets

Use the following procedure to generate code snippets:

Click **Try it out** and execute the request, as described in the previous section.

The API Catalog generates the basic code snippets, shown under the code snippet tab. If the service onboarder has also provided customized code snippets, these snippets are displayed in the snippet bar under a title prefixed with `Customized`.

**Example:**
<img src={require("../images/api-mediation/basic-code-snippets.png").default} alt="basic code snippets" width="700px"/>