# Extending API Meditation Layer checklist

| Phase | Task | Description & Reference Links | Status |
| ----- | ----- | ----- | ----- | 
| **1. Prerequisites** | **Verify Zowe Access** | Ensure access to a running instance of Zowe (required for static service definitions). [See Onboarding Overview](https://docs.zowe.org/stable/extend/extend-apiml/onboard-overview#prerequisites). | \[ \] |
|  | **Configure Certificates** | Set up a certificate compatible with TLSv1.2, ensure it has a valid Common Name (CN), and is trusted by Zowe. | \[ \] |
|  | **Prepare REST API** | Have a REST API-enabled service ready. (You can use the Spring Boot Petstore sample service if needed). | \[ \] |
|  | **Document API** | Ensure your service documentation is in a valid OpenAPI 2.0 or 3.0 Swagger JSON format. | \[ \] |
|  | **Verify Artifactory** | Confirm your build environment has access to the Zowe artifactory: `https://zowe.jfrog.io/zowe/libs-release`. | \[ \] |
|  | **Build Automation** | Ensure you are using either Gradle or Maven as your build system. | \[ \] |
| **2. Dev Environment** | **Establish API ML Instance** | Validate your service against a running API ML instance (Zowe instance, Codespace, local machine, Docker, or z/OS Java services). [See Quick Start for Development](https://docs.zowe.org/stable/extend/extend-apiml/quick-start-for-development). | \[ \] |
| **3. Onboarding** | **Select Enabler Library** | Choose an onboarding method (v1.3+). Options include Plain Java (PJE), Spring Boot, Micronaut, Node.js, Python, or Static/Direct call methods. [See Libraries for Onboarding APIs](https://docs.zowe.org/stable/extend/extend-apiml/libraries-for-onboarding-apis). | \[ \] |
| **4. Verification** | **Verify Discovery Service** | Issue a GET request to `/eureka/apps/{serviceId}` and confirm metadata returns an `UP` status. [See Verification Guide](https://docs.zowe.org/stable/extend/extend-apiml/onboard-overview#verify-successful-onboarding-to-api-ml). | \[ \] |
|  | **Verify API Catalog** | Wait \~2 minutes, then check the API Catalog UI to confirm the API is displayed and Swagger documentation renders. | \[ \] |
|  | **Test Gateway Routing** | Access your API endpoints through the Gateway to ensure requests are routed successfully. [See API Mediation Routing](https://docs.zowe.org/stable/extend/extend-apiml/api-mediation-routing). | \[ \] |
| **5. Advanced (Optional)** | **Implement SSO** | Integrate your extended service with Single Sign-On (SSO) authentication. [See SSO Integration for Extenders](https://docs.zowe.org/stable/extend/extend-apiml/api-medation-sso-integration-extenders). | \[ \] |
|  | **Create Extensions** | Build custom Java extensions to enhance the core functionality of the API ML. [See Create an API ML Extension](https://docs.zowe.org/stable/extend/extend-apiml/create-apiml-extension). | \[ \] |