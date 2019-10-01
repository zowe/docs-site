# API Mediation Layer Message Service Component

The API ML Message Service component unifies and stores REST API error messages and log messages in a single file. The Message Service component enables users to mitigate the problem of message definition redundancy which helps to optimize the development process.

## Message Definition

API ML uses a customizable infrastructure to format both REST API error messages and log messages. `yaml` files make it possible to centralize both API error messages and log messages. Messages have the following definitions:

- Message `number` - a typical mainframe message ID (excluding the severity code)
- Message `key` - a unique ID in the form of a dot-delimited string that describes the reason for the message. The `key` enables the UI or the console to show a meaningful and localized message. 

    **Tips:** 
    
    - We recommend to use the format `org.zowe.sample.apiservice.{TYPE}.greeting.empty` to define the message key. `{TYPE}` can be the api or log keyword. 

    - Use the message `key` and not the message `number`. The message `number` makes the code less readable, and increases the possibilty of errors when renumbering values inside the `number`.

- Message `type` - There are two Massage types: REST API error messages and Log messages.
    - REST API error messages: `ERROR`
    - Log messages: `ERROR`, `WARNING`, `INFO`, `DEBUG`, or `TRACE`

- Message `text` - a description of the issue

The following example shows the message definition.

**Example:**  

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

Use the following process to create a message.

**Follow these steps:**

1. Load messages from the `yaml` file. 

   **Example:**

    ```java
    MessageService messageService = new YamlMessageService();
    messageService.loadMessages("/api-messages.yml");
    messageService.loadMessages("/log-messages.yml");
    ```
    
2. Use the `Message createMessage(String key, Object... parameters);` method to create a message. 

   **Example:**

    ```java
    Message message = messageService.createMessage("org.zowe.sample.apiservice.{TYPE}.greeting.empty", "test");
    ```

## Mapping the message

You can map the `Message` either to a REST API response or to a log message. 

When you map a REST API response,  use the following methods:

- `mapToView` - returns a UI model as a list of API Message, and can be used for Rest APIS error messages
- `mapToApiMessage` - returns a UI model as a single API Message

The following example is a result of using the `mapToView` method. 

**Example:**

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
The following example is the result of using the `mapToApiMessage` method.

**Example:**

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

The following example uses the `log` message definition in a `yaml` file.

**Example:** 

```yaml
messages:
    - key: org.zowe.sample.apiservice.log.greeting.empty
      number: ZWEASA001
      type: DEBUG
      text: "The provided '%s' name is empty."
```

When you map a log message, use `mapToLogMessage` to return a log message as text.
The following example is the output of the `mapToLogMessage`.

**Example:**

```
ZWEASA001D The provided ‘test’ name is empty. {43abb594-3415-4ed5-a0b5-23e306a91124}
```

Use the `ApimlLogger` to log messages which are defined in the yaml file.

**Example:**

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

The following example shows the output of a successful `ApimlLogger` usage.

**Example:**

```shell
DEBUG (c.c.m.c.c.SampleClass) ZWEASA001D The provided 'test' name  is empty. {43abb594-3415-4ed5-a0b5-23e306a91124}
```
