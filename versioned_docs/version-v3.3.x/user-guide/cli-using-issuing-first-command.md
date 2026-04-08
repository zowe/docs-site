# Issuing your first command

Typically, users rely on [team configuration](../appendix/zowe-glossary.md#team-configuration) to connect to the mainframe and issue commands.

But if you have just installed Zowe CLI and have not yet configured your profiles, you can provide all connection options directly in the command line to access a service.

For example, issue the following command to list all data sets under the name `ibmuser` on the specified system:

```
zowe zos-files list data-set "ibmuser.*" --host host123 --port port123 --user ibmuser --password pass123
```

- If you omit username, password, host, or port, and a value cannot be found in your configuration, Zowe CLI prompts you to enter a value.

However, this is not the most efficient way to communicate with the mainframe. To avoid having to enter connection details with every command repeatedly, use team profiles.
