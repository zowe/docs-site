## Using multiple ZIS instances
When you install Zowe, it is ready to be used for 1 instance of each component. However, ZIS can have a one-to-many relationship with the Zowe webservers, and so you may wish to have more than one copy of ZIS for testing or to handle different groups of ZIS plugins.

The following steps can be followed to point a Zowe instance at a particular ZIS server.

1. [Create a copy of the ZIS server](https://docs.zowe.org/stable/user-guide/configure-xmem-server). You could run multiple copies of the same code by having different STC JCLs pointing to the same LOADLIB, or run different copies of ZIS by having JCLs pointing to different LOADLIBs.

2. Edit the JCL of the ZIS STC. In the  `NAME` parameter specify a unique name for the ZIS server, for example:

      ```
      //ZWESIS02  PROC NAME='ZWESIS_MYSRV',MEM=00,RGN=0M
      ```

      Where `ZWESIS_MYSRV` is the unique name of the new ZIS.

3. [Start the new ZIS](https://docs.zowe.org/stable/user-guide/configure-xmem-server#starting-and-stopping-the-cross-memory-server-on-zos) with whatever PROCLIB name was chosen.

4. [Stop the Zowe instance you wish to point to the ZIS server](../user-guide/start-zowe-zos.md).

5. Locate the zowe configuration file for the Zowe instance, and edit the parameter `components.zss.privilegedServerName` to match the name of the ZIS STC name chosen, such as `ZWESIS_MYSRV`

6. [Restart the Zowe instance](../user-guide/start-zowe-zos.md#starting-and-stopping-zowe-main-server-zweslstc-on-zos-with-zwe-server-command)

7.  Verify that the new ZIS server is being used by checking for the following messages in the `ZWESLSTC` server job log:

   `ZIS status - Ok (name='ZWESIS_MYSRV    ', cmsRC=0, description='Ok', clientVersion=2)`


