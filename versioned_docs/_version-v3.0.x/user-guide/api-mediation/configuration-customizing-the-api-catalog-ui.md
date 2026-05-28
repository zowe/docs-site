# Customizing the API Catalog UI

:::info Role: system administrator
:::

As a system administrator, you can customize the API Catalog UI to have a similar interface to your organization's service, or with your existing visualization portal.

* To customize the logotype and selected syle options in the zowe.yaml file, see [API Catalog branding](#api-catalog-branding).
* To replace or remove the API Catolog service from the Gateway home page and health checks, see [Replace or remove the Catalog with another service](../api-mediation/configuration-customizing-the-api-catalog-ui/#replace-or-remove-the-catalog-with-another-service).

## API Catalog branding

It is possible to customize the logotype and selected style options directly in `zowe.yaml`.

1. Open the file `zowe.yaml`.
2. Configure the following properties by setting them under `configs.apiml.catalog.customStyles`:

   - **logo**  
   Specifies the location of the logo that will replace the default Zowe logo in the API Catalog header. The supported image formats are: `svg`, `png` and `jpg/jpeg`.
   - **titlesColor**  
   Specifies the title color.
   - **fontFamily**  
   Specifies the font family to use across the API Catalog.
   - **headerColor**  
   Specifies the HTML color of the header element in the API Catalog home page
   - **backgroundColor**  
   Specifies the HTML color of the main background across the API Catalog
   - **textColor**  
   Specifies the HTML color of the main text across the API Catalog
   - **docLink**  
   Specifies a custom link to be displayed in the header. Use this property to refer to applicable documentation. The format is `<link_name>|<link_url>`  
       **Example:** `docLink: Custom Documentation|https://somedoc.com`

     Follow this example to define this parameter globally.

     **Example:**

       ```yaml
         configs:
            apiml:
               catalog:
                   customStyles:
                       logo: /path/to/logo.png
                       titlesColor: #F7190E
                       fontFamily: Roboto
                       headerColor: grey
                       backgroundColor: #FFFFFF
                       textColor: blue
                       docLink: Custom Documentation|https://somedoc.com
       ```
  
      Properties in the example that are not set default to Zowe API Catalog css values.
3. Restart Zowe.

## Replace or remove the Catalog with another service

By default, the API Mediation Layer contains the API Catalog as a service showing available services. As the API Mediation Layer can be successfully run without this component it is possible to replace or remove the service from the Gateway home page and health checks. The following section describes the behavior of the Gateway home page and health checks. 

The default option displays the API Catalog.

A value can also be applied to `components.gateway.apiml.catalog.serviceId`.

**Examples:**

- **none**  
Nothing is displayed on the Gateway home page and the Catalog is removed from `/application/health`

- **alternative-catalog**   
An alternative to the API Catalog is displayed

:::note Notes:
- If the application contains the `homePageUrl` and `statusPageRelativeUrl`, then the full set of information is displayed.
- If the application contains the `homePageUrl` the link is displayed without the `UP` information.
- If the application contains the `statusPageRelativeUrl` then `UP` or `DOWN` is displayed based on the `statusPage` without the link.
:::

Use the following procedure to change or replace the Catalog service.

1. Open the file `zowe.yaml`.
2. Find or add the property `components.gateway.apiml.catalog.serviceId`. Set the value with the following options:

    - Set the value to `none` to remove the Catalog service.
    - Set the value to the ID of the service that is onboarded to the API Mediation Layer. 
3. Restart Zowe.