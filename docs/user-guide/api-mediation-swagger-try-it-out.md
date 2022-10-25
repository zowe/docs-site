# Swagger "Try it out" functionality in the API Catalog

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

## Make a request

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