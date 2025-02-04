# Configuring initial API Mediation Layer startup message for Syslog

:::info Role: system programmer
:::

:::note Functionality of this feature is available from Zowe 2.18. 
:::

Startup of the API Mediation Layer can be configured to present a message in the Syslog that the API Mediation Layer is started and ready. This setup is typically used in combination with Workload Automation tools to manage the lifecycle of Zowe. 

This functionality requires the following changes to the zowe.yaml:

1. Change the property `zowe.sysMessages` by adding the value `- "ZWEAM001I"`
    ```
    zowe:
      # >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      # You can define any Zowe message portions to be checked for and the message added to the
      # system log upon its logging, truncated to 126 characters.
      sysMessages:
        - "ZWEAM001I"
    ```
   This property change ensures that the message containing `ZWEAM001I` is presented in the Syslog. 
   
   **Example of the Syslog:** 

    `2024-09-30 10:17:53.814 <ZWEAGW1:DiscoveryClient-InstanceInfoReplicator-%d:3335> jb892003 INFO  ((o.z.a.g.c.GatewayHealthIndicator)) ZWEAM001I API Mediation Layer started`
    
2. Prepare custom logging configuration.
   The current default logging implementation starts with information about the current time. This message content is unlike the message id which is typical in z/OS. To change this message behavior, it is necessary to change the logback.xml configuration. The following example shows the custom logback.xml which prepends the message with the first 9 characters of the message. 

   **Example:**

    ```
    <?xml version="1.0" encoding="UTF-8"?>
    <configuration>
        <property resource="application.yml" />
        <property name="MAX_INDEX" value="${rollingPolicy.maxIndex:-12}"/>
        <property name="MIN_INDEX" value="${rollingPolicy.minIndex:-1}"/>
        <property name="MAX_FILE_SIZE" value="${rollingPolicy.file.maxSize:-50MB}"/>
        <property name="STORAGE_LOCATION" value="${apiml.logs.location}" />
        <property name="apimlLogPattern" value="%.-9msg %d{yyyy-MM-dd HH:mm:ss.SSS,UTC} %clr(&lt;${logbackService:-${logbackServiceName}}:%thread:${PID:- }&gt;){magenta} %X{userid:-} %clr(%-5level) %clr(\\(%logger{15}\\)){cyan} %msg%n"/>
    
        <turboFilter class="org.zowe.apiml.product.logging.UseridFilter"/>
        <if condition='property("spring.profiles.include").contains("debug")||property("spring.profiles.include").contains("diag")||property("spring.profiles.include").contains("dev")'>
            <then>
            </then>
            <else>
                <turboFilter class="org.zowe.apiml.product.logging.ApimlDependencyLogHider"/>
                <turboFilter class="org.zowe.apiml.product.logging.LogLevelInfoFilter"/>
                <turboFilter class="ch.qos.logback.classic.turbo.DuplicateMessageFilter">
                    <AllowedRepetitions>0</AllowedRepetitions>
                </turboFilter>
            </else>
        </if>
        <conversionRule conversionWord="clr" converterClass="org.springframework.boot.logging.logback.ColorConverter" />
        <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
            <encoder class="ch.qos.logback.core.encoder.LayoutWrappingEncoder">
                <layout class="org.zowe.apiml.product.logging.MaskingLogPatternLayout">
                    <pattern>${apimlLogPattern}</pattern>
                </layout>
            </encoder>
        </appender>
    
        <appender name="FILE" class="org.zowe.apiml.product.logging.ApimlRollingFileAppender">
            <file>${STORAGE_LOCATION}/${logbackServiceName}.log</file>
    
            <rollingPolicy class="ch.qos.logback.core.rolling.FixedWindowRollingPolicy">
                <fileNamePattern>${STORAGE_LOCATION}/${logbackServiceName}.%i.log</fileNamePattern>
                <minIndex>${MIN_INDEX}</minIndex>
                <maxIndex>${MAX_INDEX}</maxIndex>
            </rollingPolicy>
    
            <triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
                <maxFileSize>${MAX_FILE_SIZE}</maxFileSize>
            </triggeringPolicy>
    
            <encoder class="ch.qos.logback.core.encoder.LayoutWrappingEncoder">
                <layout class="org.zowe.apiml.product.logging.MaskingLogPatternLayout">
                    <pattern>${apimlLogPattern}</pattern>
                </layout>
            </encoder>
        </appender>
    
        <root level="INFO">
            <appender-ref ref="STDOUT" />
            <appender-ref ref="FILE" />
        </root>
    </configuration>
    ```
   Custom configuration that changes the structure of the message to prepend 9 characters to the beginning is prepared.

    :::tip
    For detailed information about how to provide this changed configuration, see [Customizing Zowe API Mediation Layer logging](./configuration-logging.md).
    :::

3. Validate that API Mediation Layer properly uses this new configuration for the Gateway service, which issues the message that the API Mediation Layer started. 

    ```
    components:
      gateway:
        logging:
          config: /path/to/logback.xml
    ```

You successfully changed the structure of the log message if you see the message `ZWEAM001I` in the Syslog when the API Mediation Layer fully starts and is ready to handle requests. 

**Message example:**
`ZWEAM001I 2024-09-30 10:17:53.814 <ZWEAGW1:DiscoveryClient-InstanceInfoReplicator-%d:3335> jb892003 INFO  ((o.z.a.g.c.GatewayHealthIndicator)) ZWEAM001I API Mediation Layer started`
