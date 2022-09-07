# Managing user account password of Zowe Chat Microservice

You can manage your user account password through the swagger UI of Zowe Chat Microservice.

1.  Open the swagger UI at https://Z\_Chatops\_server:Z\_ChatOps\_Microservice\_Port\_Number in your browser.

    ![swagger UI](bnz_swagger_ui.png "swagger UI")

2.  Click **Try it out** button under the authentication API **/auth/login**.

    ![Authentication API](bnz_api_try.png "Authentication API")

3.  Specify the values in the input field with your user account and password, for example, admin/bnz4you!

    ![Specify user and password](bnz_user_password.png "Specify user and password")

    **Note:** Zowe Chat creates five user accounts by default: **admin** with the role as admin, **izoa**, **zsa**, and **omegamon** with the role as integrator, and **bnzsvr** with the role as user. The default passwords for all users are **bnz4you!** on the swagger UI. Only **admin** can manage the password for all roles, while other roles can only manage their own password. If you want to manage the password for all roles, remember to log in as **admin**.

4.  Click **Execute** and you will get the token in the response body. Copy it for later use in step 6.

    ![Token](bnz_using_token.png "Token")

5.  Scroll up to the beginning of this page. Click **Authorize** button.

    ![Authorize button](bnz_authorize.png "Authorize button")

6.  Paste the token in the **Value** field. Click the **Authorize** button and then close the dialog. Now you are logged in Zowe Chat Microservice and can access all other APIs.

    ![Available authorizations](bnz_available_authorization.png "Available authorizations")

7.  Scroll down and click **Try it out** button under the Users API **PUT/users**.

8.  Specify the user account that you want to edit and replace the value **password** in the input field with your new password.

    ![User API](bnz_user_api.png "User API")

    Click **Execute** and you will get a response with the status code 201.

    ![Response status code](bnz_response_status_code.png "Response status code")

9.  Repeat step 2 to step 4 with your new password to verify that your new password is set successfully.

    **Tip:** You can also try to create a new user account, modify existing user account information, or retrieve the existing user account information via APIs such as **POST/users** or **GET/users** on the swagger UI.


Your user password is updated successfully.

