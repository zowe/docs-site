# Enabling and disabling experimental Commands

Brightside CLI includes experimental commands, which are currently in development and are not ready for general availability. You can enable or disable these commands. The experimental commands are disabled by default.

**Important!**  If you use these commands, you might encounter errors, unexpected behavior, incompatibilities with your system, or incomplete help text.
## Enable experimental commands
To enable the experimental commands, issue the following command:
```
bright config set experimental-features enabled
```
The experimental commands now appear in your help menu with the prefix (*experimental)*.To view all available commands, including the experimental commands, issue the following command: 
```
bright -h
```
## Disable experimental commands
To disable the experimental commands, issue the following command:
```
bright config set experimental-features disabled
```
## Check status of experimental commands
To determine whether the experimental commands are enabled or disabled, issue the following command:
```
bright config get experimental-features
```
**Note:** Experimental commands display the prefix `(experimental)` in Brightside CLI help when they are enabled. For
example:
```
cics       (experimental) Issue commands to interact with CICS regions 
compiler   (experimental) Compile source code on the mainframe
```

