<!-- omit in toc -->
# Advanced API Catalog features configuration

As a system programmer who wants to configure advanced API Catalog features of the API Mediation Layer, you can customize API Catalog parameters by modifying the `zowe.yaml` file.

**Note:** Restart Zowe to apply changes to the parameter.

Follow the procedures in the following sections to customize API Catalog parameters according to your preferences:

- [Hide service information](#hide-service-information)
- [API Catalog branding](#api-catalog-branding)

## Hide service information

1. Open the file `zowe.yaml`.
2. Configure the following properties:

   * **apiml.catalog.hide.serviceInfo**

     This parameter is used to hide the instance URL value of all services registered to the API ML in the API Catalog. This customization can be useful when the service owner does not want to expose sensitive information such as the hostname.  

     Set the value of the `*apiml.catalog.hide.serviceInfo` parameter to `true` to hide the instance URL for all services registered to the API Catalog.
  
     In your Zowe YAML configuration (typically `zowe.yaml`), set this parameter by defining `configs.apiml.catalog.hide.serviceInfo`.
  
     Follow this example to define this parameter globally.

     **Example:**

       ```yaml
         configs:
            apiml:
               catalog:
                   hide:
                       serviceInfo: true
       ```

     An alternative is to define this parameter only for a high availability instance on lpar1.

     **Example:**

       ```yaml
         haInstances:
           lpar1:
             configs:
               apiml:
                  catalog:
                     hide:
                         serviceInfo: true
       ```
3. Restart Zowe.

## API Catalog branding

It is possible to customize the logotype and selected style options directly in `zowe.yaml`.

1. Open the file `zowe.yaml`.
2. Configure the following properties by setting them under `ZWE_configs_apiml_catalog_customStyles`:

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