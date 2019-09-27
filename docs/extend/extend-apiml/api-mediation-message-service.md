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
    - key: org.zowe.sample.apiservice.greeting.empty
      number: ZWEASA001
      type: ERROR
      text: "The provided name is empty. Provide a %s that is not empty."
  
```


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
Message message = messageService.createMessage('org.zowe.sample.apiservice.greeting.empty', 'apiml');
```

The created message can be converted according its type (REST API response or log message).

1. For REST API response:

    - `mapToView` - returns UI model as a list of API message. It can be used for Rest APIS error messages
    - `mapToApiMessage` - returns UI model as a single API message.

2. For log messages:
    - `mapToLogMessage` - returns log message as a text. Currently it returns same text as mapToReadableText


## APIML Logger

The `com.ca.mfaas.message.log.ApimLogger` component allows to control messages though the Message Service component.

If a class require the the Message Service functionality (reading and creation of the message), the `com.ca.mfaas.message.log.ApimLogger` component can be inject into the class using an injector called `com.ca.mfaas.product.logging.apimlLogInjector`.
It detects whether any class has a field with an annotation called `com.ca.mfaas.product.logging.annotations.InjectApimlLogger`.

The code sample below shows how to inject che `com.ca.mfaas.message.log.ApimLogger` component and enable the Message Service functionality for log messages into the generic class.

*Example:* 

```java
@EnableApimlLogger
public class DiscoverableClientSampleApplication implements ApplicationListener<ApplicationReadyEvent> {
```

```java
package com.ca.mfaas.client.ws;

import com.ca.mfaas.message.log.ApimlLogger;
import com.ca.mfaas.product.logging.annotations.InjectApimlLogger;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Component
@SuppressWarnings("squid:S1075")
public class DiscoverableClientWebSocketConfigurer implements WebSocketConfigurer {

    @InjectApimlLogger
    private ApimlLogger logger = ApimlLogger.empty();

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        String webSocketPath = "/ws/uppercase";

        logger.log("com.ca.mfaas.log.sampleservice.registeringWebSocket", webSocketPath);

        registry.addHandler(new WebSocketServerHandler(), webSocketPath).setAllowedOrigins("*");

        webSocketPath = "/ws/header";
        logger.log("com.ca.mfaas.log.sampleservice.registeringWebSocket", webSocketPath);

        registry.addHandler(new HeaderSocketServerHandler(), webSocketPath);
    }
}

```



