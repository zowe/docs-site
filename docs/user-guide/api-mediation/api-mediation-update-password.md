# Update user password

You can use the API ML to update a mainframe password. Mainframe password change is possible through Gateway REST APIs and is supported by two authentication providers:

* [Change password with SAF provider](#change-password-with-saf-provider)
* [Change password with z/OSMF provider](#change-password-with-zosmf-provider)

**Note:**
This feature is also available in the API Catalog. For more information about how to update the mainframe password via API Catalog, see [Change expired password via API Catalog](../api-mediation-change-password-via-catalog.md).

## Change password with SAF provider

Update the user password using the SAF Authentication provider. To use this functionality, add the parameter `newPassword` on the login endpoint `/gateway/api/v1/auth/login`. 

The Gateway service returns a valid JWT with the response code `204` as a result of successful password change. The user is then authenticated and can consume APIs through the Gateway. 
A response code of `401` is thrown if it is not possible to change the password for any reason.

Use a `POST` REST call against the URL `/gateway/api/v1/auth/login`:

 ```
 {
 "username" : "<username>",
 "password" : "<password>",
 "newPassword" : "<newPassword>"
}
```

**Note:**
It is a common practice to set a limit to the number of password changes permissible in the ESM. This value is set by the parameter `MINCHANGE` for `PASSWORD`. The password can be changed once. Subsequently, it is necessary to wait the specified time period before the password can be changed again.

**Example:**

`MINCHANGE=120`

where:

* **`120`**

  Specifies the number of days before the password can be reset

## Change password with z/OSMF provider

Update the user password using the z/OSMF Authentication provider. To use this functionality, add the parameter `newPassword` on the login endpoint `/gateway/api/v1/auth/login`. 

The Gateway service returns a valid JWT with the response code `204` as a result of successful password change. The user is then authenticated and can consume APIs through the Gateway. A response code of `401` is thrown if it is not possible to change the password.

Use a `POST` REST call against the URL `/gateway/api/v1/auth/login`:

 ```
 {
 "username" : "<username>",
 "password" : "<password>",
 "newPassword" : "<newPassword>"
}
```

**Note:**
In order to use the password change functionality via z/OSMF, it is necessary to install the PTF for APAR PH34912.
