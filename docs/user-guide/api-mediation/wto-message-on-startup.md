# Configure initial API Mediation Layer startup message for Syslog

:::info Role: system programmer
:::

:::note Functionality is available from Zowe 2.18 
:::

The goal is to make sure that Syslog contains one message that clearly states that the API Mediation Layer is started and 
ready. Usually this is used together with Workload Automation tools to manage the lifecycle of Zowe. 

The required functionality requires following changes to the zowe.yaml

1) Change property `zowe.sysMessages` by adding the `- "ZWWEAM001I""` value
    ```
    zowe:
      # >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      # You can define any Zowe message portions to be checked for and the message added to the
      # system log upon its logging, truncated to 126 characters.
      sysMessages:
        - "ZWEAM001I"
    ```
   This change make sure that message containing the ZWEAM001I will be present in the Syslog. It will look something like:
    `[AG] 2024-09-26 08:44:35.200 <ZWEAGW1:DiscoveryClient-InstanceInfoReplicator-%d:28573> jb892003 INFO  ((o.z.a.g.c.GatewayHealthIndicator)) ZWEAM001I API Mediation Layer started`
    
2) Prepare custom logging configuration
   The current default logging implementation starts with the information about the current time unlike with the message id as is typical in the z/OS world. To change this behavior we introduced the possibility to configure the logging configuration. The general details are here: https://docs.zowe.org/stable/user-guide/api-mediation/configuration-logging

    ```
    <?xml version="1.0" encoding="UTF-8"?>
    <configuration>
        <property resource="application.yml" />
        <property name="MAX_INDEX" value="${rollingPolicy.maxIndex:-12}"/>
        <property name="MIN_INDEX" value="${rollingPolicy.minIndex:-1}"/>
        <property name="MAX_FILE_SIZE" value="${rollingPolicy.file.maxSize:-50MB}"/>
        <property name="STORAGE_LOCATION" value="${apiml.logs.location}" />
        <property name="apimlLogPattern" value="%msg{8} %d{yyyy-MM-dd HH:mm:ss.SSS,UTC} %clr(&lt;${logbackService:-${logbackServiceName}}:%thread:${PID:- }&gt;){magenta} %X{userid:-} %clr(%-5level) %clr(\\(%logger{15}\\)){cyan} %msg%n"/>
    
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
4) Change the structure of the log messages for the Gateway within the API Mediation Layer

    ```
    components:
      gateway:
        logging:
          config: /path/to/logback.xml
    ```

After that you should see the message ZWEAM001I in the Syslog when the API Mediation Layer fully starts and is ready to tackle requests. 