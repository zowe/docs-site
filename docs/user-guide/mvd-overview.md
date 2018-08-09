# zLUX

zLUX modernizes and simplifies working on the mainframe. With zLUX, you can create applications to suit your specific needs. zLUX contains a web UI that has the following features:

- The web UI works with the underlying REST APIs for data, jobs, and subsystem, but presents the information in a full screen mode as compared to the command line interface.
- The web UI makes use of the leading-edge web presentation technology and is also extensible through web UI plug-ins to capture and present any variety of information.
- The web UI includes common z/OS developer or system programmer tasks such as an editor for common text-based files like REXX or JCL along with general purpose data set actions for both Unix System Services (USS) and Partitioned Data Sets (PDS) plus Job Entry System (JES) logs.

zLUX consists of the following components:

- **Mainframe Virtual Desktop (MVD)**

    The desktop, accessed through a browser.

- **Zowe Node Server**

    The Zowe Node Server runs zLUX. It consists of the Node.js server plus the Express.js as a webservices framework, and the proxy applications that communicate with the z/OS services and components.

- **ZSS Server**

    The ZSS Server provides secure REST services to support the Zowe Node Server.

- **Application plug-ins**

    Several application-type plug-ins are provided. For more information, see [Using zLUX application plug-ins](usingmvd.md#using-zlux-application-plug-ins).
