# Viewing Service Information and API Documentation in the API Catalog

Use the API Catalog to view services, API documentation, descriptive information about the service, the current state of the service, service endpoints, and detailed descriptions of these endpoints.

:::note
Verify that your service is running. At least one started and registered instance with the Discovery Service is needed for your service to be visible in the API Catalog.
:::

**Follow these steps:**

1. Use the search bar to find the service that you are looking for.
Services that belong to the same product family are displayed on the same tile.

   **Example:** `Sample Applications, Endevor, SDK Application`

2. Click the tile to view header information, the registered services under that family ID,
 and API documentation for that service.

   :::note Notes:
   * The state of the service is indicated in the service tile on the dashboard page.
    If no instances of the service are currently running, the tile displays a message that no services are running.
   * At least one instance of a service must be started and registered with the Discovery Service for it to be visible
    in the API Catalog. If the service that you are onboarding is running, and
    the corresponding API documentation is displayed, this API documentation is cached and remains visible
    even when the service and all service instances stop.
   * Descriptive information about the service and a link to the home page of the service are displayed.
   :::

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

   :::note Notes:
   * If a lock icon is visible on the right side of the endpoint panel, the endpoint requires authentication.
   * The structure of the endpoint is displayed relative to the base URL.
   * The URL path of the abbreviated endpoint relative to the base URL is displayed in the following format:
   :::
   
   **Example:**

    `/{yourServiceId}/api/v1/{endpointName}`

    The path of the full URL that includes the base URL is also displayed in the following format:

    `https://hostName:basePort/{yourServiceId}/api/v1/{endpointName}`

    Both links target the same endpoint location.
