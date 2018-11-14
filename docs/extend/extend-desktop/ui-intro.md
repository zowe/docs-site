# zLUX Samples

Zowe allows extensions to be written in any UI framework through the use of an Iframe, or Angular and React natively. In this section, code samples of various use-cases will provided with install instructions.

::: warning Troubleshooting Suggestions:
As Zowe is still in beta, not everything works as expected yet. If you are running into issues, try these suggestions:

- Restart the Zowe Server/ VM.
- Double check that the name in the plugins folder matches your identifier in `pluginsDefinition.json` located in the Zowe root.
- After logging into the MVD, use the Chrome/ Firefox developer tools and navigate to the "network" tab to see what errors you are getting.
- Check each file with `cat <filename>` to be sure it wasn't corrupted while uploading. Try uploading with different methods like SCP or SFTP if so.
  :::
