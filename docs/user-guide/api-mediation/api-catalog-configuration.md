<!-- omit in toc -->
# Advanced API Catalog features configuration

- [API ML configuration](#api-ml-configuration)
- [API Catalog branding](#api-catalog-branding)

As a system programmer who wants to configure advanced API Catalog features of the API Mediation Layer, you can customize API Catalog parameters by modifying the `<Zowe install directory>/components/api-catalog/bin/start.sh` file.

<!-- TODO This document should be updated to reflect the settings that can be updated in zowe.yaml -->

## API ML configuration

* **apiml.catalog.hide.serviceInfo**

  This parameter is used to hide the instance URL value of all the services registered to the API ML in the API Catalog. This can be useful when the service owner does not want to expose sensitive information such as the hostname.  

  Set the value of the `*apiml.catalog.hide.serviceInfo` parameter to `true` to to hide the instance URL for all services registered to the API Catalog.
  
  In your Zowe YAML configuration (typically `zowe.yaml`), set this parameter by defining `configs.apiml.catalog.hide.serviceInfo`.
  
  Example to define this parameter globally:

    ```yaml
      configs:
         apiml:
            catalog:
                hide:
                    serviceInfo: true
    ```

  An alternative example is to define the parameter only for a high availability instance on lpar1:

    ```yaml
      haInstances:
        lpar1:
          configs:
            apiml:
               catalog:
                  hide:
                      serviceInfo: true
    ```

## API Catalog branding

It is possible to customize logotype and selected style options directly in `zowe.yaml`. The following properties can be set under `apiml.catalog.customStyles`:

- `logo`: Set the location of the logo that will replace the default Zowe logo in the API Catalog header. The supported image formats are: `svg`, `png` and `jpg/jpeg`
- `titlesColor`: Set the title color
- `fontFamily`: Set the font family to use across the API Catalog
- `headerColor`: Set the HTML color of the header element in the API Catalog home page
- `backgroundColor`: Set the HTML color of the main background across the API Catalog
- `textColor`: Set the HTML color of the main text across the API Catalog
- `docLink`: Set a custom link that will be displayed in the header. It can be used to refer to some documentation. The format is `<link_name>|<link_url>`
    **Example:** `docLink: Custom Documentation|https://somedoc.com`

  Example to define this parameter globally:

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

  An alternative example is to define the parameter only for a high availability instance on lpar1:

    ```yaml
      haInstances:
        lpar1:
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
  In case some above properties is not set, the default Zowe API Catalog css values will be used.