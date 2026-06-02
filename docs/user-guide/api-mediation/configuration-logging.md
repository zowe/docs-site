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
    <property resource="application.yml"/>
    <property name="MAX_INDEX" value="${rollingPolicy.maxIndex:-12}"/>
    <property name="MIN_INDEX" value="${rollingPolicy.minIndex:-1}"/>
    <property name="MAX_FILE_SIZE" value="${rollingPolicy.file.maxSize:-50MB}"/>
    <property name="STORAGE_LOCATION" value="${apiml.logs.location}"/>
    <property name="apimlLogPattern" value="%d{yyyy-MM-dd HH:mm:ss.SSS,UTC} %clr&lt;${logbackService:-${logbackServiceName}}:%thread:${PID:- }&gt; %magenta(%X{userid:-}) %cyan(%-5level) %clr\(\(%logger{15}\)\) %msg%n"/>
  
    <turboFilter class="org.zowe.apiml.product.logging.UseridFilter"/>
  
    <springProfile name="!debug &amp; !diag &amp; !dev">
      <turboFilter class="org.zowe.apiml.product.logging.ApimlDependencyLogHider"/>
      <turboFilter class="org.zowe.apiml.product.logging.LogLevelInfoFilter"/>
      <turboFilter class="org.zowe.apiml.product.logging.ApimlDuplicateMessagesFilter">
        <AllowedRepetitions>0</AllowedRepetitions>
      </turboFilter>
    </springProfile>
  
    <conversionRule conversionWord="clr" class="org.springframework.boot.logging.logback.ColorConverter"/>
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
      <encoder class="ch.qos.logback.core.encoder.LayoutWrappingEncoder">
        <charset>${CONSOLE_LOG_CHARSET:-${logging.charset.console:-${file.encoding:-UTF-8}}}</charset>
        <layout class="org.zowe.apiml.product.logging.MaskingLogPatternLayout">
          <pattern>${apimlLogPattern}</pattern>
        </layout>
      </encoder>
    </appender>

    <appender name="FILE" class="org.zowe.apiml.product.logging.ApimlRollingFileAppender">
      <file>${STORAGE_LOCATION}/${logbackService:-${logbackServiceName}}.log</file>
  
      <rollingPolicy class="ch.qos.logback.core.rolling.FixedWindowRollingPolicy">
        <fileNamePattern>${STORAGE_LOCATION}/${logbackService:-${logbackServiceName}}.%i.log</fileNamePattern>
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
      <appender-ref ref="STDOUT"/>
      <appender-ref ref="FILE"/>
    </root>
</configuration>
```

:::note
You can find the current default logging configuration in the [logback-spring.xml](https://github.com/zowe/api-layer/blob/v3.x.x/apiml-utility/src/main/resources/logback-spring.xml) file in the api-layer repository.
:::

## Understanding appenders

The default `logback.xml` configuration defines two appenders:

- **STDOUT**  
A console appender that prints log messages to standard output. This appender is useful for real-time monitoring and containerized deployments.

- **FILE**  
A rolling file appender that writes log messages to files in the location specified by `STORAGE_LOCATION`.

    The **FILE** appender uses the value of the `STORAGE_LOCATION` property, which is resolved from the `apiml.logs.location` setting in the service's `application.yml`. By default, this points to `<ZOWE_INSTANCE_DIR>/logs/<service>/`. You can override this by setting `apiml.logs.location` in your configuration.

### Root logger level

The `<root level="INFO">` element in the default configuration sets the base logging level to `INFO` for all packages. In this default configuration, only messages at `INFO`, `WARN`, and `ERROR` levels are logged. `DEBUG` and `TRACE` messages are suppressed. To change the root level, modify the `level` attribute:

```xml
<root level="DEBUG">
  <appender-ref ref="STDOUT"/>
  <appender-ref ref="FILE"/>
</root>
```

Setting the root level to `DEBUG` enables verbose logging for all packages, which is useful for troubleshooting but can generate large log volumes.

## Customization example

One example of possible customization is changing the pattern for the logged messages. The pattern is defined in the `apimlLogPattern` property in `logback.xml`. By default, API ML prints log messages, as in the following example.

**Example:**
```log
2024-08-01 12:52:27.922 <ZWEAGW1:DiscoveryClient-InstanceInfoReplicator-0:33948829> ZWESVUSR INFO (o.z.a.g.h.GatewayHealthIndicator) ZWEAM001 API Mediation Layer started
```
In the following table you can see each part of the `apimlLogPattern` in the example of the message above:

| Pattern part                                                                      | Message part                                                  |
|-----------------------------------------------------------------------------------|---------------------------------------------------------------|
| `%d{yyyy-MM-dd HH:mm:ss.SSS,UTC}`                                                 | `2024-08-01 12:52:27.922`                                     |
| `%clr&lt;${logbackService:-${logbackServiceName}}:%thread:${PID:- }&gt; %magenta` | `<ZWEAGW1:DiscoveryClient-InstanceInfoReplicator-0:33948829>` |
| `(%X{userid:-})`                                                                  | `ZWESVUSR`                                                    |
| `%cyan(%-5level)`                                                                 | `INFO`                                                        |
| `%clr\(\(%logger{15}\)\)`                                                         | `(o.z.a.g.h.GatewayHealthIndicator)`                          |
| `%msg`                                                                            | `ZWEAM001 API Mediation Layer started`                        |

You can edit, move, remove, or add some parts in the pattern based on your requirements.

:::note
The full documentation of Logback pattern are available on the [Logback site](https://logback.qos.ch/manual/layouts.html#ClassicPatternLayout).
:::

## Setting different log levels for specific packages

You can override the root log level for specific Java packages by adding `<logger>` elements before the `<root>` element. This is useful when you need more detailed logging from a particular component without enabling verbose logging for the entire application.

**Example: Enable DEBUG logging for specific packages**

```xml
<configuration>
    <!-- ... existing properties and appenders ... -->

    <logger name="org.zowe.apiml.gateway" level="DEBUG"/>
    <logger name="org.zowe.apiml.security" level="DEBUG"/>
    <logger name="org.springframework.security" level="DEBUG"/>

    <root level="INFO">
        <appender-ref ref="STDOUT"/>
        <appender-ref ref="FILE"/>
    </root>
</configuration>
```

In this example:
- `org.zowe.apiml.gateway` and `org.zowe.apiml.security` log at `DEBUG` level for detailed troubleshooting of Gateway and security operations.
- `org.springframework.security` logs at `DEBUG` level to help diagnose authentication and authorization issues.
- All other packages remain at `INFO` level as specified by the root logger.

You can optionally set the level to `TRACE`, `WARN`, `ERROR`, or `OFF` depending on your needs.

:::tip
Using per-package log levels is the recommended approach for troubleshooting specific issues in production, as these log levels prevent the large log volumes which may result from setting the root level to `DEBUG`.
:::