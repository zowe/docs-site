# Customizing Zowe API Mediation Layer logging

Zowe API Mediation Layer uses logback for its logging. You can customize the logging of Zowe API Mediation Layer by specifying the customized `logback.xml` file in `zowe.yaml` for each service separately.

:::info Required Roles: system administrator, system programmer
:::

To change the default logback configuration file, set `components.<component>.logging.config` with a path to your `logback.xml`.

* **component**  
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

The following `logback.xml` is an example of logging configuration file which is used by default in all API Mediation Layer components.

<details>
<summary>Click here for the full logback.xml example.</summary>

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

</details>
<br />

:::note
For more information about the current default logging configuration, see the [logback-spring.xml](https://github.com/zowe/api-layer/blob/v3.x.x/apiml-utility/src/main/resources/logback-spring.xml) file in the api-layer repository.
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

## Configuring logging level

You can manage the volume of API ML logs written to the spool by configuring their verbosity for both **single-service deployment** or a distributed **microservice deployment**. Adjust the logging level property by configuring the attribute corresponding to your deployment mode within your `zowe.yaml` file. 

### Configuration Examples

**For Single-Service Deployment Mode:**
Update your `zowe.yaml` file under the global `apiml` component block:

```yaml
# zowe.yaml
components:  
  apiml:    
    logging:      
      level: quiet   # Options: quiet | info (default) | debug
```

**For Microservice Deployment Mode:**
Configure the property under the specific microservice component block (for example, the API Gateway):

```yaml
# zowe.yaml
components:  
  gateway:    
    logging:      
      level: quiet   # Options: quiet | info (default) | debug
```

:::note
This property is similarly supported under `components.discovery`, `components.api-catalog`, `components.caching-service`, and `components.zaas`.
:::

### Log Level Options

Configure the logging verbosity using the following levels:
* **info** (default)  
Represents the standard, baseline logging configuration. It preserves current operational behavior, writing all standard `INFO`, `WARN`, and `ERROR` messages to the log.
* **quiet**  
Suppresses standard `INFO`-level chatter to drastically minimize spool usage during normal production operations. This setting retains only selected critical informational messages (such as application startup, component status, and the configured authentication provider), alongside all warnings and errors.
* **debug**  
Provides full diagnostic output for troubleshooting. 

  :::note Backwards Compatibility  
    The legacy parameter `components.apiml.debug: true` remains fully functional for backwards compatibility. This parameter takes absolute precedence over all new `logging.level` settings. `components.apiml.debug` overrides both the global single-service setting (`components.apiml.logging.level`) and individual microservice settings, such as `components.gateway.logging.level`. When active, `components.apiml.debug` forces the entire operational logging resolution to `debug`.
  :::

### Log Output Comparisons
The following examples demonstrate how the different logging levels affect the output and volume in your system logs.

**Log Output — `info` level (default)**  
This level captures standard application milestones alongside framework warnings. 

<details>
<summary>Click here to review an example of info log level. </summary>
<br />

**`info` level**

Notice the inclusion of verbose Tomcat and SpringDoc warning configurations:

```plaintext
2026-07-01 07:20:20.965 <ZWEAGW1:main:33885081> ZWESVUSR INFO  (o.z.a.z.s.c.CompoundAuthProvider) ZWEAM105I Using authentication provider: saf
2026-07-01 07:20:27.170 <ZWEAGW1:main:33885081> ZWESVUSR WARN  (o.a.t.u.n.j.JSSEUtil) Tomcat interprets the [ciphers] attribute [...]
2026-07-01 07:20:27.301 <ZWEAGW1:Thread-3:33885081> ZWESVUSR INFO  (o.z.a.p.s.ServiceStartupEventHandler) ZWEAM000I Discovery Service started in 21.785 seconds
2026-07-01 07:20:27.319 <ZWEAGW1:main:33885081> ZWESVUSR WARN  (o.s.c.e.SpringDocAppInitializer) SpringDoc /v3/api-docs endpoint is enabled by default. [...]
2026-07-01 07:20:27.320 <ZWEAGW1:main:33885081> ZWESVUSR INFO  (o.z.a.p.s.ServiceStartupEventHandler) ZWEAM000I Caching Service started in 21.805 seconds
2026-07-01 07:20:27.337 <ZWEAGW1:main:33885081> ZWESVUSR INFO  (o.z.a.GatewayHealthIndicator) ZWEAM001I API Mediation Layer started
```
</details>
<br />

**Log Output — `quiet` level (without errors)**  
When running normally under the quiet level, routine framework warnings and standard chatter are filtered out. Only critical startup and readiness milestones remain.

<details>
<summary>Click here to review an example of quiet log level without errors. </summary>
<br />

**`quiet` level (without errors)**

```plaintext
2026-07-01 07:30:09.697 <ZWEAGW1:main:33883157> ZWESVUSR INFO  (o.z.a.z.s.c.CompoundAuthProvider) ZWEAM105I Using authentication provider: saf
2026-07-01 07:30:15.951 <ZWEAGW1:Thread-3:33883157> ZWESVUSR INFO  (o.z.a.p.s.ServiceStartupEventHandler) ZWEAM000I Discovery Service started in 20.496 seconds
2026-07-01 07:30:15.981 <ZWEAGW1:main:33883157> ZWESVUSR INFO  (o.z.a.p.s.ServiceStartupEventHandler) ZWEAM000I Caching Service started in 20.527 seconds
2026-07-01 07:30:15.998 <ZWEAGW1:main:33883157> ZWESVUSR INFO  (o.z.a.p.s.ServiceStartupEventHandler) ZWEAM000I API Catalog Service started in 20.544 seconds
2026-07-01 07:30:15.998 <ZWEAGW1:main:33883157> ZWESVUSR INFO  (o.z.a.GatewayHealthIndicator) ZWEAM001I API Mediation Layer started
```
</details>
<br />

**Log Output — `quiet` level (with errors)**  
If an operational issue occurs while using the quiet level, the system dynamically allows relevant `WARN` and `ERROR` diagnostics through alongside the core startup sequence.

<details>
<summary>Click here to review an example of quiet log level with errors. </summary>
<br />

**`quiet` level (with errors)**

```plaintext
2026-07-01 07:34:20.524 <ZWEAGW1:main:33884222> ZWESVUSR INFO  (o.z.a.z.s.c.CompoundAuthProvider) ZWEAM105I Using authentication provider: saf
2026-07-01 07:34:26.562 <ZWEAGW1:Thread-3:33884222> ZWESVUSR WARN  (o.z.a.d.s.ServiceDefinitionProcessor) ZWEAD702W Unable to process static API definition data: [...]
2026-07-01 07:34:26.563 <ZWEAGW1:Thread-3:33884222> ZWESVUSR ERROR (o.z.a.d.s.StaticServicesRegistrationService) Loading static definition failed: [...]
2026-07-01 07:34:26.563 <ZWEAGW1:Thread-3:33884222> ZWESVUSR INFO  (o.z.a.p.s.ServiceStartupEventHandler) ZWEAM000I Discovery Service started in 19.236 seconds
2026-07-01 07:34:26.660 <ZWEAGW1:main:33884222> ZWESVUSR INFO  (o.z.a.p.s.ServiceStartupEventHandler) ZWEAM000I Caching Service started in 19.333 seconds
2026-07-01 07:34:43.475 <ZWEAGW1:main:33884222> ZWESVUSR ERROR (o.z.a.c.s.i.ApimlSslKeyExchange) Cannot create server socket: java.net.BindException: EDC8115I Address already in use.
```
</details>

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
The full documentation of Logback pattern is available on the [Logback site](https://logback.qos.ch).
:::

## Setting different log levels for specific packages

You can override the root log level for specific Java packages by adding `<logger>` elements before the `<root>` element. This is useful when you need more detailed logging from a particular component without enabling verbose logging for the entire application.

**Example of enabling DEBUG logging for specific packages:**

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

