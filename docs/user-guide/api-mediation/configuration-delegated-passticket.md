# Configuring Delegated Passticket Generation

:::info Role: system administrator
:::

As a system administrator, you can enable the endpoint of the API Gateway that allows passticket generation for a delegated e-mail.  This API allows the authenticated user to create a passticket for another user, so has the potential be be misused for privilege escalation or impersonation.  For that reason the API authentication must be done with a client certificate for a userID who has `READ` access to the class `ZOWE.APIML.DELEGATE.PASSTICKET` and the endpoint must be enabled by setting `zowe.components.gateway.apiml.security.delegatePassticket` parameter to `true`.

Use the following procedure to enable the delegated passticket endpoint of the API Gateway:  

1. Open the file `zowe.yaml`.
2. Configure the following property:

* `components.gateway.apiml.security.delegatedPassticket`  
This property defines whether the endpoint `/gateway/api/v1/auth/delegate/passticket` is available

:::note
The default value of this parameter is `false`. To enable the endpoint set it to be `true`.
:::

**Example:**
```yaml
components:
  gateway:
    apiml:
      security:
        delegatePassticket: true
```

The userID that makes the call to the API must have `READ` access to the class `ZOWE.APIML.DELEGATE.PASSTICKET`. For more information on how to configure this see [Configuring User permission call delegated passticket API](#configuring-user-permission-to-generate-delegated-passtickets)

## Configuring user permission to generate delegated passtickets

The delegated passticket API must be called with a client certificate. The z/OS user ID associated with the certificate must have `READ` permission for the `ZOWE.APIML.DELEGATE.PASSTICKET` class.

<details>

<summary>Click here for command details about configuring user access using RACF</summary>

In your ESM command line interface or other security environment, perform the following steps:

1. Define the resource class by running the command:

    ```racf
    RDEFINE ZOWE APIML.DELEGATE.PASSTICKET UACC(NONE)
    ```

2.  Permit the user associated with the client certificate `READ` access
    ```racf
    PERMIT APIML.DELEGATE.PASSTICKET CLASS(ZOWE) ID(<userID>) ACCESS(READ)
    SETROPTS RACLIST(ZOWE) REFRESH
    ```

- **`userID`**
    The userID associated with the client certificate calling the API

3.  (optional) To see the all permissions for users 
    ```racf
    RLIST ZOWE APIML.DELEGATE.PASSTICKET AUTHUSER
    ```

</details>

<details>

<summary>Click here for command details about configuring user access using ACF2</summary>

In your ESM command line interface or other security environment, perform the following step

1.  Grant the userID `READ` access
    ```acf2
    SET RESOURCE(RDA) $KEY(ZOWE) TYPE(RDA) APIML.DELEGATE.PASSTICKET UID(<userID>) SERVICE(READ) ALLOW
    ```

</details>

<details>

<summary>Click here for command details about configuring user access using Top Secret</summary>

In your ESM command line interface or other security environment, perform the following steps

</details>

## Calling the /auth/delegate/passticket API

To call the API `POST` `/gateway/api/v1/auth/delegate/passticket` the body should be `JSON`

```
{
    "applId": "APPLID",
    "emailId": "email@example.com"
}
```

-**`APPLID`**
    The applicationID associated with the address space the passticket is being generated for.  As an example, to create a passticket for z/OSMF this value will be `IZUDFLT`

-**`emailId`**
    The e-mail ID of the user that is associated with the z/OS userID, see [ESM configuration](../../extend/extend-apiml/api-mediation-oidc-authentication.md#esm-configuration-prerequisites).

