# Using API Catalog

As an application developer, use the API Catalog to view what services are running in the
 API Mediation Layer. Through the API Catalog, you can also view the associated API documentation
  corresponding to a service, descriptive information about the service, and the current state
   of the service. The tiles in the API Catalog can be customized by changing values in
   the `apiml.catalog.tile` section defined in the application.yml of a service. A microservice that
   is onboarded to the API Mediation Layer and configured appropriately, registers automatically with the API Catalog
   and a tile for that service is added to the Catalog.

**Note:** For more information about how to configure the API Catalog in the application.yml, see: [Add API Onboarding Configuration](../extend/extend-apiml/onboard-spring-boot-enabler.md).

## API Versioning

See [API Catalog and Versioning](../extend/extend-apiml/api-mediation-versioning.md) for more information about the API versioning.

## View Service Information and API Documentation in the API Catalog

Use the API Catalog to view services, API documentation, descriptive information about the service, the current state of the service, service endpoints, and detailed descriptions of these endpoints.

**Note:** Verify that your service is running. At least one started and registered instance with the Discovery Service
           is needed for your service to be visible in the API Catalog.

**Follow these steps:**

1. Use the search bar to find the service that you are looking for.
Services that belong to the same product family are displayed on the same tile.

   **Example:** `Sample Applications, Endevor, SDK Application`

2. Click the tile to view header information, the registered services under that family ID,
 and API documentation for that service.

   **Notes:**

   * The state of the service is indicated in the service tile on the dashboard page.
    If no instances of the service are currently running, the tile displays a message that no services are running.
   * At least one instance of a service must be started and registered with the Discovery Service for it to be visible
    in the API Catalog. If the service that you are onboarding is running, and
    the corresponding API documentation is displayed, this API documentation is cached and remains visible
    even when the service and all service instances stop.
   * Descriptive information about the service and a link to the home page of the service are displayed.

   **Example:**

   <img src={require("../images/api-mediation/newswagger.png").default} alt="controller detail" width="500px"/>

3. Select the version (**v1**, **v2**) to view the documentation of a specific API version.

    **Example:**

    <img src={require("../images/api-mediation/discoverableclient-apiv1.png").default} alt="discoverable client api v1" width="500"/>

    <img src={require("../images/api-mediation/discoverableclient-apiv2.png").default} alt="discoverable client api v2" width="500"/>

4. Expand the endpoint panel to see a detailed summary with responses and parameters of each endpoint,
 the endpoint description, and the full structure of the endpoint.

   **Example:**

   <img src={require("../images/api-mediation/expanded.png").default} alt="endpoint detail" width="500px"/>

   **Notes:**

   * If a lock icon is visible on the right side of the endpoint panel, the endpoint requires authentication.
   * The structure of the endpoint is displayed relative to the base URL.
   * The URL path of the abbreviated endpoint relative to the base URL is displayed in the following format:

   **Example:**

    `/{yourServiceId}/api/v1/{endpointName}`

    The path of the full URL that includes the base URL is also displayed in the following format:

    `https://hostName:basePort/{yourServiceId}/api/v1/{endpointName}`

    Both links target the same endpoint location.

## Swagger "Try it out" functionality in the API Catalog

The API Catalog enables users to call service APIs through the **Try it out** functionality. There are 2 types of endpoints:

- **Public endpoints**

  Endpoints that are accessible without entering user credentials.
  
- **Protected endpoints** 

  Endpoints that are only accessible by entering user credentials. These endpoints are marked with a lock icon.

    **Example:**

    <img src={require("../images/api-mediation/catalog_proctected_endpoints_swagger_lock.png").default} alt="endpoint detail" width="1000px"/>

    **Note:** Before making requests to protected endpoints, authorize your session by clicking the lock icon and complete the required information in the Authorization modal shown below:

    **Example:**

    <img src={require("../images/api-mediation/catalog_proctected_endpoints_swagger_auth.png").default} alt="endpoint detail" width="300px"/>

To demonstrate **Try it out**, we use the example of the Swagger Petstore.

**Example:**

<img src={require("../images/api-mediation/discoverable_clien_pet_swagger.png").default} alt="endpoint detail" width="700px"/>

### Make a request

This section outlines the process for making a request.

**Follow these steps:**

1. Expand the **POST Pet** endpoint.

2. Click **Try it out**.

   **Example:**

    <img src={require("../images/api-mediation/discoverable_clien_pet_swagger_expanded.png").default} alt="endpoint detail" width="700px"/>

    After you click **Try it out**, the example value in the **Request Body** field becomes editable.

3. In the **Example Value** field, change the first `id` value to a random value. Change the second `name` value to a value of your choice, such as the name of a pet.

4. Click **Execute**.

   **Example:**

    <img src={require("../images/api-mediation/discoverable_clien_pet_swagger_execute.png").default} alt="endpoint detail" width="700px"/>

    The API Catalog Swagger UI submits the request and shows the _curl_ that was submitted. The Responses section shows the response. 

   **Example:**

    <img src={require("../images/api-mediation/discoverable_clien_pet_swagger_response.png").default} alt="endpoint detail" width="700px"/>


## Static APIs refresh functionality in the API Catalog

The API Catalog enables users to manually refresh static service APIs. Use the **Refresh Static APIs** option if you change a static service API and want these changes to be visible in the API Catalog without restarting the Discovery Service.

**Example:**

<img src={require("../images/api-mediation/api_refresh_button.png").default} alt="api refresh" width="700px"/>

To refresh the status of a static service, click the **Refresh** option located in the upper right-hand side of the API Catalog UI. 
Successful requests return a pop-up notification that displays the message, `The refresh of static APIs was successful!`.
 
**Example:**

<img src={require("../images/api-mediation/api_refresh_success.png").default} alt="api refresh success" width="700px"/>


 If the request fails, a dialog appears with an error message that describes the cause of the fail. 

**Example:**

<img src={require("../images/api-mediation/api_refresh_error.png").default} alt="api refresh error" width="700px"/>

**Note:** The manual **Refresh Static APIs** option applies only to static service APIs. Changes to the status of services that are onboarded to allow for dynamic discovery require a restart of the specific services where changes are applied. It is not necessary to restart the API Catalog or the Discovery Service.

## Change password via API Catalog

In case expiration of a mainframe password, the API Catalog offers the possibility to set a new password, using either the SAF or the z/OSMF provider.
For more information about the password change functionality, see [Advanced Gateway features configuration](../user-guide/api-mediation/api-gateway-configuration.md).
