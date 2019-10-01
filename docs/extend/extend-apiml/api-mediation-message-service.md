# API Mediation Layer Message Service Component
<!-- TODO. Not the final version of title -->

<!-- TODO. What is the message services in API ML? Who uses it? and Why?>
What is the problem of definition redundancy? Earlier, users needed to provide messages either as a REST API response in case of errors, or as log messages {as what?} {and to achieve what? -->

API ML Message Service component unifies and stores REST API error message and log messages in a single file. The Message Service component enables users to mitigate the problem of the message definition redundancy. Having the component optimize development process.

## Message Definition

APIML uses a customized infrastructure to format both the REST API error messages and log messages. `yaml` files allow to centralize both the error and log messages. The messages inside a `yaml` file contain:

1. Message `number` - typical mainframe message ID (excluding the severity code). 
2. Message `key` - a unique ID in a form of a dot delimited string that describes the reason for the message. The `key` enables the UI or the console to show a meaningful and localized message. 

    **Tips:** 
    
    - We recommend to use `org.zowe.sample.apiservice.{TYPE}.greeting.empty` as a format to define the message key. `{TYPE}` can be api   or log keyword. 

    - Avoid using the the message 'number' instead of the message 'key', because it might make code less readable, and make the renumbering of values inside the `number` difficult and error-prone.
    <!-- TODO. Check with other writer. -->

3. Message `type` that represents the type of the message in the following cases:
    - For log messages:
    (`ERROR`, `WARNING`, `INFO`, `DEBUG`, or `TRACE`)
    - For REST API error messages:
    (`ERROR`)
<!-- TODO. Severity of what? How can 'type' represent the severity level? Severity is a different characteristic.-->
4. Message `text` that describes an issue

**Example: The message definition** 
```yaml
messages:
    - key: org.zowe.sample.apiservice.{TYPE}.greeting.empty
      number: ZWEASA001
      type: ERROR
      text: "The provided '%s' name is empty."
```

<!-- ## {Some big heading}
This chapter unifies two following sections:
- Creating the message
- Mapping the message -->

### Creating a message



When you create a message, you'll have to consider/use the following classes:

- `com.ca.mfaas.message.core.MessageService` - lets you create a message from the centralized file.
- `com.ca.mfaas.message.yaml.YamlMessageService` - implements `com.ca.mfaas.message.core.MessageService` so that `com.ca.mfaas.message.yaml.YamlMessageService` can read message information from a yaml file, and create a message with message parameters that are passed by users. 

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

---

<!-- TODO. These 2 paragraph are original. -->

### Mapping the message

You can map `Message` either to a REST API response or to a log message. 

When you map a REST API response,  use the following methods:

- `mapToView` - returns a UI model as a list of API Message, and can be used for Rest APIS error messages.
- `mapToApiMessage` - returns a UI model as a single API Message.

The result of the `mapToView` looks like:

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

The result of the `mapToApiMessage` looks like:

```JSON
{
  "messageKey": "org.zowe.sample.apiservice.{TYPE}.greeting.empty",
  "messageType": "ERROR",
  "messageNumber": "ZWEASA001",
  "messageContent": "The provided 'test' name is empty."
}
```

## API ML Logger


The `com.ca.mfaas.message.log.ApimLogger` component controls messages through the Message Service component. {add another sentence - the meta is too short}

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
import com.ca.mfaas.message.core.MessageType;
import com.ca.mfaas.message.log.ApimlLogger;

public class SampleClass {

   private final ApimlLogger logger;

   public SampleClass(MessageService messageService) {
       logger = ApimlLogger.of(SampleClass.class, messageService);
   }

   public void process() {
       logger.log(“org.zowe.sample.log.apiservice.greeting.empty”, “test”);

   }

}
```

**OUTPUT:**
```shell
DEBUG (c.c.m.c.c.SampleClass) ZWEASA001D The provided 'test' name  is empty. {43abb594-3415-4ed5-a0b5-23e306a91124}
```

When you map a log message, use `mapToLogMessage` that returns a log message as text.

The result of the `mapToLogMessage` looks like:
```
ZWEASA001E The provided ‘test’ name is empty. {43abb594-3415-4ed5-a0b5-23e306a91124}
```
<!-- TODO. Maybe we should delete the part about the `mapToLogMessage` message -->