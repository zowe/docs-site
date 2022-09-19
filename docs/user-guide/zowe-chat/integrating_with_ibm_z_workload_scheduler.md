# Integrating with IBM Z Workload Scheduler

You must integrate Zowe Chat with the IBM Z Workload Scheduler family of products before posting incidents from IBM Z Workload Scheduler.

1.  Create one key ring or add the certificate of the Zowe Chat Microservice to an existing ring that you already use for IBM Z Workload Scheduler services.

    1.  Download your certificates from your ZCHATOPS\_HOME/config/ssl/bnzsvr-server.crt.

        **Note:** If the certificate file is chained, you must split it into separate files. One file matches with one certificate, for example, server.crt and root.crt.

    2.  Connect your certificates to a ring trusted by IBM Z Workload Scheduler. For more information, see the section about posting incidents and sharing information through a chat tool in *[IBM® Z Workload Scheduler: Managing the Workload](https://www.ibm.com/docs/en/workload-automation/10.1.0?topic=overview-z-workload-scheduler)* manual.

2.  Launch Zowe Chat Swagger UI at https:your\_host\_name:your\_port/swagger-ui.

    1.  Click **Try it out** button under the authentication API **/auth/login**.

        ![Authentication API](bnz_zws_authentication_api.png "Authentication API")

    2.  Input your integration user account name and password and click **Execute**. The default user account name is `IBM Z Workload Scheduler` with the password as `bnz4you!`. You can get Zowe Chat Microservice access token in the response body as the following example shows,

        ```
        eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjNmZjMxZTZmOTkxYTE3ZmZiOTM3NTYiLCJpc3MiOiJJQk0gWiBDaGF0T3BzIG1pY3Jvc2VydmljZSIsIm5hbWUiOiJ6c2EiLCJpYXQiOjE2MDE0NDkyMzUsImV4cCI6NDc1NTA0OTIzNX0.LyXkmPBpBVRSHIp0uT2VnnwGHmgv5Ps_8fv2z6SwP0M
        ```

        If you want to manage your user account and password, refer to [Managing user account password of Zowe Chat Microservice](chatops_first_steps_managing_users.md).

3.  Use your Ring and token to enable alerting on IBM Z Workload Scheduler. For more details, see the section about posting incidents and sharing information through a chat tool in *IBM Z Workload Scheduler: Managing the Workload*manual*.*


You have successfully integrated Zowe Chat with IBM Z Workload Scheduler.

**Parent topic:**[Integrating with Zowe Chat](chatops_integrate.md)

