# Customizing Zowe API Mediation Layer logging

Zowe API Mediation Layer uses logback for its logging. You can customize the logging of Zowe API Mediation Layer by specifying the customized `logback.xml` file in `zowe.yaml` for each service separately.

To change the default logback configuration file, set `components.<component>.logging.config` with a path to your `logback.xml`.

* `component`  
  Specifies one of the following services:
    - `gateway`
    - `discovery`
    - `api-catalog`
    - `caching-service`
    - `zaas`

**Example with Gateway Service:**

```yaml
components:
  gateway:
    logging:
      config: /path/to/logback.xml
```

## Default logging configuration file

The following `logback.xml` is an example of logging configuration file which is used by default in all API Mediation Layer components:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <property resource="application.yml" />
    <property name="MAX_INDEX" value="${rollingPolicy.maxIndex:-12}"/>
    <property name="MIN_INDEX" value="${rollingPolicy.minIndex:-1}"/>
    <property name="MAX_FILE_SIZE" value="${rollingPolicy.file.maxSize:-50MB}"/>
    <property name="STORAGE_LOCATION" value="${apiml.logs.location}" />
    <property name="apimlLogPattern" value="%d{yyyy-MM-dd HH:mm:ss.SSS,UTC} %clr(&lt;${logbackService:-${logbackServiceName}}:%thread:${PID:- }&gt;){magenta} %X{userid:-} %clr(%-5level) %clr(\\(%logger{15}\\)){cyan} %msg%n"/>

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

:::note
You can find the current default logging configuration file by following [this link](https://github.com/zowe/api-layer/blob/v2.x.x/apiml-common/src/main/resources/logback.xml).
:::

## Customization example

One of the examples of possible customization is changing the pattern for the logged messages. The pattern is defined in the `apimlLogPattern` property in `logback.xml`. By default, the API Mediation Layer prints log messages, as in the following example:
```log
2024-08-01 12:52:27.922 <ZWEAGW1:DiscoveryClient-InstanceInfoReplicator-0:33948829> ZWESVUSR INFO (o.z.a.g.h.GatewayHealthIndicator) ZWEAM001 API Mediation Layer started
```
In the following table you can see each part of the `apimlLogPattern` in the example of the message above:

| Pattern part                                                                        | Message part                                                  |
|-------------------------------------------------------------------------------------|---------------------------------------------------------------|
| `%d{yyyy-MM-dd HH:mm:ss.SSS,UTC}`                                                   | `2024-08-01 12:52:27.922`                                     |
| `%clr(&lt;${logbackService:-${logbackServiceName}}:%thread:${PID:- }&gt;){magenta}` | `<ZWEAGW1:DiscoveryClient-InstanceInfoReplicator-0:33948829>` |
| `%X{userid:-}`                                                                      | `ZWESVUSR`                                                    |
| `%clr(%-5level)`                                                                    | `INFO`                                                        |
| `%clr(\\(%logger{15}\\)){cyan}`                                                     | `(o.z.a.g.h.GatewayHealthIndicator)`                          |
| `%msg`                                                                              | `ZWEAM001 API Mediation Layer started`                        |

You can edit, move, remove, or add some parts in the pattern based on your requirements.

:::note
The full documentation of Logback pattern are available on [Logback site](https://logback.qos.ch/manual/layouts.html#ClassicPatternLayout).
:::