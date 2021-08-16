# Zowe CLI Development Roadmap (Technical Preview)

<Badge text="Technical Preview"/> The Zowe CLI @next release is a technical preview. Technical previews are for testing only and are not ready for production. Your feedback is valued and appreciated.

To try out technical preview features, [install the @next release of Zowe CLI](cli-install-cli-next.md). This version may receive breaking changes and is intended to gather early feedback on what may become a future LTS release.

The @next version features:
* Global Profile Configuration - Simplifies profile management by editing, storing, and sharing mainframe configuration details in one location. Use a text editor to quickly populate configuration files with connection details for your mainframe services. For information, see [Using Global Profile Configuration](cli-using-global-profile-configuration.md).
* Daemon Mode - Run Zowe CLI as a persistent background process (daemon). Provides one-time startup of Node.js and a native-built Rust client to communicate with the daemon by TCP/IP sockets. For information, see [Using Daemon Mode](cli-using-daemon-mode.md).
