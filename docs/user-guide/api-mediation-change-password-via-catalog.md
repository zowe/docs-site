# Change expired password via API Catalog

In case of expiration of a mainframe password, the API Catalog offers the possibility to set a new password. When your password expires, you are prompted with a form and a warning message:

<img src={require("../images/api-mediation/catalog-pass-expired-warn.png").default} alt="api refresh error" width="700px"/>

You can now insert a new password. In order to submit the request for password change, you need to repeat the new password to prevent the risk of a typo.
It is possible that your mainframe installation has specific rules for passwords, such as length, and special characters. When the submitted password does not meet these requirements, an error messag is issued with the chance to insert another new password.

<img src={require("../images/api-mediation/catalog-new-pass-err.png").default} alt="api refresh error" width="700px"/>

After you repeat the new password, you are able to request the change again. The number of retries depends on the security manager setup of your zOS.

<img src={require("../images/api-mediation/catalog-pass-update-ok.png").default} alt="api refresh error" width="700px"/>

Once you successfully change the password, you are informed with a green pop-up message indicating `Your mainframe password was successfully changed`. You can now use the new password for authentication.

For more information about the password change REST API available on the API Gateway service, see [Advanced Gateway features configuration](../user-guide/api-mediation/api-gateway-configuration.md).
