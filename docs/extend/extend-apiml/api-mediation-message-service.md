# API Mediation Layer Message Service Component

API ML Message Service component unifies and stores REST API error messages and log messages in a single file. The Message Service component enables users to mitigate the problem of the message definition redundancy. The component optimizes a development process.

## Message Definition

APIML uses a custom infrastructure to format both the REST API error messages and log messages. `yaml` files allow to centralize both API error messages and log messages. The messages have the following definitions:

1. Message `number` - a typical mainframe message ID (excluding the severity code). 
2. Message `key` - a unique ID in a form of a dot delimited string that describes the reason for the message. The `key` enables the UI or the console to show a meaningful and localized message. 

    **Tips:** 
    
    - We recommend to use `org.zowe.sample.apiservice.{TYPE}.greeting.empty` as a format to define the message key. `{TYPE}` can be api   or log keyword. 

    - Avoid using the the message 'number' instead of the message 'key', because it might make code less readable, and make the renumbering of values inside the `number` difficult and error-prone.
    <!-- TODO. Check with Andrew whether the second tip makes sense. -->

3. Message `type` - types of the following messages:
    - REST API error messages: `ERROR`
    - Log messages: `ERROR`, `WARNING`, `INFO`, `DEBUG`, or `TRACE`

4. Message `text` - a description of issue

**Example: The message definition** 
```yaml
messages:
    - key: org.zowe.sample.apiservice.{TYPE}.greeting.empty
      number: ZWEASA001
      type: ERROR
      text: "The provided '%s' name is empty."
```

## Creating a message

Use the following classes when you create a message:

- `com.ca.mfaas.message.core.MessageService` - lets you create a message from a file.
- `com.ca.mfaas.message.yaml.YamlMessageService` - implements `com.ca.mfaas.message.core.MessageService` so that `com.ca.mfaas.message.yaml.YamlMessageService` can read message information from a `yaml` file, and create a message with message parameters.

Create a message.

**Follow these steps:**

1. Load messages from a `yaml` file. For example:
    ```java
    MessageService messageService = new YamlMessageService();
    messageService.loadMessages("/api-messages.yml");
    messageService.loadMessages("/log-messages.yml");
    ```
2. Use the `Message createMessage(String key, Object... parameters);` method to create a message. For example:
    ```java
    Message message = messageService.createMessage("org.zowe.sample.apiservice.{TYPE}.greeting.empty", "test");
    ```

## Mapping the message

You can map `Message` either to a REST API response or to a log message. 

When you map a REST API response,  use the following methods:

- `mapToView` - returns a UI model as a list of API Message, and can be used for Rest APIS error messages.
- `mapToApiMessage` - returns a UI model as a single API Message.

**Example: The result of the `mapToView` method.**

```JSON
{
"messages": [
  {
    "messageKey": "org.zowe.sample.apiservice.{TYPE}.greeting.empty",
    "messageType": "ERROR",
    "messageNumber": "ZWEASA001",
    "messageContent": "The provided 'test' name is empty."
  }
  ]
}
```

**Example: The result of the `mapToApiMessage` method.**

```JSON
{
  "messageKey": "org.zowe.sample.apiservice.{TYPE}.greeting.empty",
  "messageType": "ERROR",
  "messageNumber": "ZWEASA001",
  "messageContent": "The provided 'test' name is empty."
}
```

### API ML Logger 

The `com.ca.mfaas.message.log.ApimLogger` component controls messages through the Message Service component. 

**Example: The `log` message definition in a `yaml` file.**
```yaml
messages:
    - key: org.zowe.sample.apiservice.log.greeting.empty
      number: ZWEASA001
      type: DEBUG
      text: "The provided '%s' name is empty."
```

When you map a log message, use `mapToLogMessage` that returns a log message as text.

**Example: The output of the `mapToLogMessage`.**
```
ZWEASA001D The provided ‘test’ name is empty. {43abb594-3415-4ed5-a0b5-23e306a91124}
```


**Example: Use the `ApimlLogger` to log messages, which are defined in the yaml file.**
```java
package com.ca.mfaas.client.configuration;

import com.ca.mfaas.message.core.MessageService;
import com.ca.mfaas.message.core.MessageType;
import com.ca.mfaas.message.log.ApimlLogger;

public class SampleClass {

   private final ApimlLogger logger;

   public SampleClass(MessageService messageService) {
       logger = ApimlLogger.of(SampleClass.class, messageService);
   }

   public void process() {
       logger.log(“org.zowe.sample.apiservice.log.greeting.empty”, “test”);

   }

}
```

**Example: The output of the successful `ApimlLogger` usage.**
```shell
DEBUG (c.c.m.c.c.SampleClass) ZWEASA001D The provided 'test' name  is empty. {43abb594-3415-4ed5-a0b5-23e306a91124}
```