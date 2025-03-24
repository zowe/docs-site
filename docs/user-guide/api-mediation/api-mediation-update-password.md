# Updating user password

You can use Zowe API ML to update a mainframe password. The mainframe password change is possible through the Gateway REST API.

:::note
This feature is also available in the API Catalog. For more information about how to update the mainframe password via API Catalog, see [Change expired password via API Catalog](../api-mediation-change-password-via-catalog.md).
:::

To use the password updating functionality in the REST API, add the parameter `newPassword` on the login endpoint `/gateway/api/v1/auth/login` in a `POST` call to this endpoint.

The Gateway service returns a valid JWT with the response code `204` as a result of successful password change. The user is then authenticated and can consume APIs through the Gateway.
A response code of `401` is thrown if it is not possible to change the password for any reason.

Use the following request body format in the `POST` REST call against the URL `/gateway/api/v1/auth/login`:

 ```
 {
 "username" : "<username>",
 "password" : "<password>",
 "newPassword" : "<newPassword>"
}
```

:::note
A common practice is to set a limit to the number of password changes permissible in the ESM. This value is set by the parameter `MINCHANGE` for `PASSWORD`. The password can be changed once. Subsequently, it is necessary to wait the specified time period before the password can be changed again.
:::

**Example:**

`MINCHANGE=120`

* **120**  
  Specifies the number of days before the password can be reset

:::note
The SAF authentication provider provides details about the expired password and as such allow the API Catalog to ask for password change. The z/OSMF authentication provider doesn't provide this functionality and thus it's possible to change password only through the Rest API. 
:::