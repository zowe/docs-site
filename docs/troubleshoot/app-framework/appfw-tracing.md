# Enabling tracing

If you need to provide support with tracing information about the App Framework or a particular part of it, or need to debug a program you are developing that uses the App Framework, you can enable a variety of tracing within the Zowe YAML configuration file.

If you are looking for basic troubleshooting and support, please see [Gathering Information for Support or Troubleshooting](../servers/must-gather.md).

## Basic debugging

Within the Zowe YAML file, the value `components.app-server.debug` can be set to `true` to turn on several debug loggers.

This does not turn on every type of debugging but provides a basic set for debugging for the App Server.

Enabling `components.app-server.debug` is equivalent to setting:

```yaml
components:
  app-server:
    logLevels:
      _zsf.*: 5
```

## Advanced debugging for App Server

The Zowe YAML file section `components.app-server.logLevels` controls the verbosity for every logger within the server.

This includes core loggers, prefixed with `_zsf`, as well as plug-in loggers.

A list of core loggers and their purpose is defined within [the App Server schema](https://github.com/zowe/zlux-app-server/blob/c22105381e129bd999c47e838b424679eba26aa6/schemas/app-server-config.json#L401)
Loggers, plug-in loggers, and log levels (such as 5 for highest debugging, or 2 for default) are defined in detail in the [Logging document](../../extend/extend-desktop/mvd-logutility).

Attributes within `components.app-server.logLevels` can be exact names of loggers, or can be pattern matching of multiple loggers.

For example, to enable minimum debug verbosity of the auth logger of the server core ("_zsf.auth"), and to enable maximum verbosity logging of all plug-ins made by company foo ("com.foo"), you could set the YAML configuration as:

```yaml
components:
  app-server:
    logLevels:
      _zsf.auth: 3
      com.foo.*: 5
```

## Advanced debugging for ZSS

The Zowe YAML file section `components.zss.logLevels` controls the verbosity for every logger within the server.

This includes core loggers, prefixed with `_zss`.

A list of core loggers and their purpose is defined within [the ZSS schema](https://github.com/zowe/zss/blob/c85e374f3d7a4a9b93d6f8337d474f384135744b/schemas/zss-config.json#L235).

Unlike the App Server, the `components.zss.logLevels` section cannot take pattern matching for attribute names. The attribute names must exactly match the name of a logger.
