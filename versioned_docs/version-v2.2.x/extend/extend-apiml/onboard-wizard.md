# Onboarding a REST API service with the YAML Wizard

As an API developer, you can use the Yaml Onboarding Wizard to simplify the process of onboarding new REST API services to the Zowe API Mediation Layer. The wizard offers a walkthrough of the required steps to create a correct configuration file which is used to set the application properties and Eureka metadata.

## Onboarding your REST service with the Wizard

The following procedure describes how to onboard your REST service with the Wizard.

**Follow these steps:**

1. In the dashboard of the API Catalog, click the **Onboard New API** dropdown located in the navbar.  
   ![Onboarding](../../images/api-mediation/wizard-onboard-button.png)
2. Choose the type of onboarding according to your preference (static or via enablers).
   ![Enablers](../../images/api-mediation/wizard-enablers.png)
3. (Optional) To prefill the fields, click **Choose File** to upload a complete or partial YAML file. The YAML file is validated and the form fields are populated.

   ![YAML Prefill](../../images/api-mediation/wizard-yaml-prefill.png)  
4. Fill in the input fields according to your service specifications.
5. Address each of the categories in the dialog dropdown. 
   ![Categories](../../images/api-mediation/wizard-categories.png)
6. Click **Save** to apply your changes.
7. Validate successful onboarding with the following step according to your onboarding method.
   * For static onboarding, the following validation message appears after successful onboarding:  
   ![Validation](../../images/api-mediation/wizard-validation.png)  
   * For onboarding using an enabler, click **Copy** to save the generated yaml file to your clipboard. Then paste this yaml file in your project's service-configuration.yml file.   
   ![Validation](../../images/api-mediation/wizard-save-button.png)  
   
If you see your service in the list of API Catalog available services, you have onboarded your service successfully.
