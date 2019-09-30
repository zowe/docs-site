# Message Service in API Mediation Layer  

APIML users need to provide messages either as REST API response for error cases or log messages. 
In case the user needs to provide messages to the client, they need to centralize them in order to avoid redundancy of their definiton. 
Message Service is meant to mitigate this problem.

## Message definition

APIML uses a customized infrastructure for the messages format (both REST API response messages and log messages). These messages are defined in a `yaml` file which allows to centralize them. The messages contain:

1. A message `key` that represents an unique ID describing the reason for the message. It should be a dot-delimited string, such as `org.zowe.commons.apiml.serviceCertificateNotTrusted`. The purpose of this field is to enable UI or the console to show a meaningful and localized  message. The message key is used instead of the message number as the number makes the code hard to read, and makes renumbering difficult and error-prone.
2. A message `number` - typical mainframe message ID (not including the severity code) that can be found in CA documentation 
3. A message `type` that represents the severity - (`ERROR`, `WARNING`, `INFO`, `DEBUG`, or `TRACE` in case of log messages, `ERROR` in case of REST API error response).
4. A message `text` that is a readable descriptive message in US English for the user.

*Example:* 
```yaml
messages:
    - key: org.zowe.sample.{TYPE}.apiservice.greeting.empty
           number: ZWEASA001
           type: ERROR
           text: "The provided name %s is empty."
  
```

Note: `org.zowe.sample.{TYPE}.apiservice.greeting.empty` is recommended way to define message key. {TYPE} can be api or log keyword.

## Message Service

The `com.ca.mfaas.message.core.MessageService` component provides several functionalities  to create a message from the centralized file. The `com.ca.mfaas.message.yaml.YamlMessageService` class implements the `com.ca.mfaas.message.core.MessageService`to read message information from the `yaml` file and to create the message with message parameters that are passed by the user.
The example below shows how to allow the `com.ca.mfaas.message.yaml.YamlMessageService` to read a message defined in a `yaml` file as shown above.

*Example:* 
```java
MessageService messageService = new YamlMessageService();
messageService.loadMessages("/api-messages.yml");
messageService.loadMessages("/log-messages.yml");
```

To create the message, there is a method called `Message createMessage(String key, Object... parameters);` that allows to create a single message with specified parameters. 

*Example:* 
```java
Message message = messageService.createMessage("org.zowe.sample.{TYPE}.apiservice.greeting.empty" "apiml");
```

The created message can be converted according its type (REST API response or log message).

1. For REST API response:

    - `mapToView` - returns UI model as a list of API message. It can be used for Rest APIS error messages. **OUTPUT:**
    ```json
        {
            "messages": [
              {
                        "messageType": "ERROR",
                        "messageNumber": "ZWEASA001",
                        "messageContent": "The provided name 'test' is empty.",
                        "messageKey": "org.zowe.sample.api.apiservice.greeting.empty"
                   }
            ]
        }
    ```
    - `mapToApiMessage` - returns UI model as a single API message. OUTPUT

2. For log messages:
    - `mapToLogMessage` - returns log message as a text. Currently it returns same text as mapToReadableText


## APIML Logger

The `com.ca.mfaas.message.log.ApimLogger` component allows to control messages though the Message Service component.

```yaml
messages:
    - key: org.zowe.sample.log.apiservice.greeting.empty
           number: ZWEASA001
           type: DEBUG
           text: "The provided name %s is empty."
  
```

*Example:* 

```java
package com.ca.mfaas.client.configuration;

import com.ca.mfaas.message.core.MessageService;
import com.ca.mfaas.message.log.ApimlLogger;

public class SampleClass {

    private final ApimlLogger logger;

    public SampleClass(MessageService messageService) {
        logger = ApimlLogger.of(SampleClass.class, messageService);
    }

    public void process() {
        logger.log("org.zowe.sample.log.apiservice.greeting.empty", "apiml");
    }
}

```

**OUTPUT:**
```shell
ERROR (c.c.m.c.c.SampleClass) CSR0002E The provided name 'apiml' is empty. {43abb594-3415-4ed5-a0b5-23e306a91124}
```




