# Static APIs refresh functionality in the API Catalog

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