# Configuring ports for the Zowe terminal application plug-ins

Before you install Zowe, configure the following ports for the VT Terminal and TN3270 mainframe terminal application plug-ins.  

1.  Locate the `/install/zowe-install.yaml` file.
2.  Specify the SSH port for the VT terminal application plug-in. The default is 22.

3.  Specify the Telnet port for the TN3270 mainframe terminal application plug-in. The default is 23.
```
# Ports for the TN3270 and the VT terminal to connect to
terminals:
  sshPort=22
  telnetPort=23
```
