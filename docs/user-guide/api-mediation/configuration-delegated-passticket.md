# Configuring Delegated PassTicket Generation

:::info Role: system administrator
:::

As a system administrator, you can enable the endpoint of the API Gateway that allows PassTicket generation for a delegated e-mail.  

:::important Warning
This API allows the authenticated user to create a PassTicket for another user.This presents a potential risk for privilege escalation or impersonation. To mitigate this risk, you must ensure strict access control via client certificates and ESM permissions.
:::

To enable and use this feature, complete the following steps:

1. Enable the delegated PassTicket endpoint of the API Gateway.

2. Configure user permissions to generate delegated PassTickets.

3. Call the `/auth/delegate/passticket` API.

## Enabling the delegated PassTicket endpoint of the API Gateway

By default, the delegated PassTicket endpoint is set to `false` (disabled). Enable this parameter in your zowe.yaml configuration file.

1. Open the file `zowe.yaml`.
2. Locate the `components.gateway.apiml.security` section.
3. Set the `delegatePassticket` property to `true`.

**Example:**
```yaml
components:
  gateway:
    apiml:
      security:
        delegatePassticket: true
```

4. Restart API ML to apply the changes.

:::note
The userID that makes the call to the API must have `READ` access to the class `ZOWE.APIML.DELEGATE.PASSTICKET`. For details, see the following section, _Configuring user permission to generate delegated PassTickets_.
:::

## Configuring user permissions to generate delegated PassTickets

The delegated PassTicket API requires authentication via a client certificate. The z/OS user ID associated with that certificate must have `READ` access to the `ZOWE.APIML.DELEGATE.PASSTICKET` resource class.

Follow the instructions for your specific External Security Manager (ESM):

<details>

<summary>Click here for command details to configure user access using RACF.</summary>

**For RACF:**  
In your ESM command line interface or other security environment, perform the following steps:

1. Define the resource class:

    ```racf
    RDEFINE ZOWE APIML.DELEGATE.PASSTICKET UACC(NONE)
    ```

2.  Permit the user associated with the client certificate `READ` access:
    ```racf
    PERMIT APIML.DELEGATE.PASSTICKET CLASS(ZOWE) ID(<userID>) ACCESS(READ)
    SETROPTS RACLIST(ZOWE) REFRESH
    ```

    * **`userID`**  
    The userID associated with the client certificate calling the API.

3.  (Optional) Verify userr permissions: 
    
    ```racf
    RLIST ZOWE APIML.DELEGATE.PASSTICKET AUTHUSER
    ```

</details>

<details>

<summary>Click here for command details to configure user access using ACF2.</summary>

**For ACF2:**  
In your ESM command line interface or other security environment, grant the userID `READ` access:

```acf2
SET RESOURCE(RDA) $KEY(ZOWE) TYPE(RDA) APIML.DELEGATE.PASSTICKET UID(<userID>) SERVICE(READ) ALLOW
```
* **`userID`**  
The userID associated with the client certificate calling the API.

</details>

<details>

<summary>Click here for command details to configure user access using Top Secret.</summary>

**For Top Secret:**  
In your ESM command line interface or other security environment, perform the following steps:

</details>

## Calling the `/auth/delegate/passticket` API

Once enabled and secured, you can call the API to generate a PassTicket for a user based on their email mapping.

To call the API `POST` `/gateway/api/v1/auth/delegate/passticket`:

**Request Body (JSON)**

```
{
    "applId": "APPLID",
    "emailId": "email@example.com"
}
```

* **APPLID**  
    The applicationID associated with the address space the PassTicket is being generated for.
    
    **Example:**
    Use `IZUDFLT` to create a PassTicket for z/OSMF.

* **emailId**  
    The email ID of the user that is associated with the z/OS userID.
    
    :::tip
    For more information about mapping email IDs to mainframe userIDs, see the [ESM configuration prerequisites](../../extend/extend-apiml/api-mediation-oidc-authentication.md#esm-configuration-prerequisites).
    :::

