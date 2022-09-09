# Sending events of IZOA to channel

You can send IZOA events to your channel by posting incident to ChatOps Microservice.

1.  Send IZOA events by using the following rest call:

    URL: https://your\_microservice\_server:your\_port\_number/iss/api/v1/incident

    Method: `POST`

    Header: `Content type:application/json`

    Body:

    ```
    
    {
        "IZOAProblemInsight": {
            "ProblemDescription": "string",
            "ProblemDetails":"string",
            "URLs": {
                "URL_EvidencePage": "string",
                "URL_SubsystemScorecard": "string",
                "URL_InsightDashboard": "string",
            },
            "ProblemContext": {
                "SubsystemContext": {
                    "PlexName": "string",
                    "SystemName": "string",
                    "SubsystemName": "string",
                }
            },
            "timestamp": "string",
            "RelatedSubsystems": "string",
            "ProblemScreenshot": "string",
        }
    }
    
    
    ```

    For example, you can try this on swagger UI by opening https://your\_microservice\_server:your\_port\_number/iss/api/v1/incident in your browser.

    ![Swagger ui](bnz_swagger.png "Swagger ui")

    Click **Try it out**, and then specify the **targetChannel** as where you want post this incident.

    ![Post incident](bnz_swaggerui.png "Post incident")

    Click **Execute** to post this incident. You’ll receive a message with the specified information later in the specified channel based on the value of property incidentQueryInterval in BNZSRV\_INSTROOT/hubot/config/bnzbot-server.yaml. Default is 60 seconds.


You will receive a message in your channel that is posted by bnz.

