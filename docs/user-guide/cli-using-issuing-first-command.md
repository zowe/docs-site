# Issuing your first command

You can provide all connection options directly on commands to access a service. For example, issue the following command to list all data sets under the name `ibmuser` on the specified system:

```
zowe zos-files list data-set "ibmuser.*" --host host123 --port port123 --user ibmuser --password pass123
```

If you omit username, password, host, or port (and a value cannot be found in your configuration), the CLI prompts you to enter a value.
