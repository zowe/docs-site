# Server-side installation overview

Zowe server-side components can be installed either on z/OS only, or you can install the components both on z/OS and on Docker.

The Zowe server components also includes a web desktop that runs a number of applications including API Mediation Layer that includes the Single Sign-on (SSO) capability, organization of multiple Zowe servers under a single website, and other useful features for z/OS developers.

## End-to-end installation flow chart

placeholder

## Configuration flow diagram

placeholder

## Key terms and concepts

Learn about the key terms and concepts used in Zowe.

### Zowe runtime

Zowe runtime refers to the full, unarchived set of binaries, executable files, scripts, and other elements that are run when Zowe is started.

### Zowe Application Framework

The Zowe Application (App) Framework is configured in the Zowe configuration file. Configuration can be used to change things such as verbosity of logs, the way in which the App server communicates with the Mediation Layer, how ZSS operates, whether to use HTTPS or AT-TLS, what language the logs should be set, and many more attributes.

When you install Zowe, the App Framework is configured as a Mediation Layer client by default. This is simpler to administer because the App framework servers are accessible externally through a single port: API ML Gateway port. It is more secure because you can implement stricter browser security policies for accessing cross-origin content.

You can modify the Zowe App Server and Zowe System Services (ZSS) configuration, as needed, or configure connections for the Terminal app plugins.

### Zowe API Mediation Layer

The Zowe API Mediation Layer provides a reverse proxy and enables REST APIs by providing a single point of access for mainframe service REST APIs like MVS Data Sets, JES, as well as working with z/OSMF. It has dynamic discovery capability for these services and Gateway is also responsible for generating the authentication token used to provide single sign-on (SSO) functionality.

### Zowe System Services

Working closely with ZIS, ZSS serves as one of the primary, authenticated back-ends that communicates with z/OS and provides Zowe with a number of APIs: z/OS Unix files and data sets, control of the plug-ins and services lifecycle, security management, etc. The Zowe Desktop especially delegates a number of its services to ZSS which it accesses through the default http port `7557`.

ZSS is written in C and uses native calls to z/OS to provide its services.

### Zowe Cross Memory Server (ZIS)

The Zowe cross memory server, also known as ZIS, provides privileged cross-memory services to the Zowe Desktop and runs as an APF-authorized program. The same cross memory server can be used by multiple Zowe desktops. The cross memory server is needed to be able to log on to the Zowe desktop and operate its apps such as the Code Editor.

## Roles and responosibilities in server-side component installation process

### Tasks performed by the security administrator

To configure Zowe security for production environments, it is likely that your organization's security administrator will be required to perform various tasks. See details in the [Address ecurity requirements](./address-security-requirements#tasks-performed-by-your-security-administrator)

### Tasks performed by the storage administrator

Before installing, the storage administrator will reserve enough space including for USS, directory storage space, etc to install Zowe.

### Tasks performed by the network administrator

When you are installing Zowe, it is likely that your network administrato will assign port numbers, reserve them, and arrange them for you.

### Tasks performed by the system programmar

The system programmar will install and configure Zowe and start Zowe. They are skilled to SMP/E or z/OSMF workflow and regular maintanance. They also prepare jobs for other administrators.

## Technology needs

YAML, node.js, USS background details

## Installation menthods explanation

Define the install methods and why use one over the other and which we recommend; establish pro's and con's of each method; need to widen the internal audience to capture all pro’s & con’s.