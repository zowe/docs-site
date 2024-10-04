# Zowe FAQs

Check out the following FAQs to learn more about the purpose and function of Zowe&trade;.

- [Zowe FAQ](#zowe-faq)
- [Zowe CLI FAQ](#zowe-cli-faq)
- [Zowe Explorer FAQ](#zowe-explorer-faq)

## Zowe FAQ

### What is Zowe?

<details className="zowe-faq">

<summary></summary>

Zowe is an open source project within the [Open Mainframe Project](https://www.openmainframeproject.org/) that is part of [The Linux Foundation](https://www.linuxfoundation.org). The Zowe project provides modern software interfaces on IBM z/OS to address the needs of a variety of modern users. These interfaces include a new web graphical user interface, a script-able command-line interface, extensions to existing REST APIs, and new REST APIs on z/OS.

</details>

### Who is the target audience for using Zowe?

<details className="zowe-faq">

<summary></summary>

Zowe technology can be used by a variety of mainframe IT and non-IT professionals. The target audience is primarily application developers and system programmers, but the Zowe Application Framework is the basis for developing web browser interactions with z/OS that can be used by anyone.

</details>

### What language is Zowe written in?

<details className="zowe-faq">

<summary></summary>

Zowe consists of several components. The primary languages for API Mediation Layer are Java and JavaScript. Zowe CLI, Explorer for VSCode, and Desktop are written in TypeScript. Zowe Explorer plug-in for IntelliJ IDEA is written in Kotlin, ZSS is written in C, while the cross memory server is written in metal C.

</details>

### What is the licensing for Zowe?

<details className="zowe-faq">

<summary></summary>

Zowe source code is licensed under EPL2.0. For license text click [here](https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.txt) and for additional information click [here](https://www.eclipse.org/legal/epl-2.0/faq.php).

In the simplest terms (taken from the FAQs above) - "...if you have modified EPL-2.0 licensed source code and you distribute that code or binaries built from that code outside your company, you must make the source code available under the EPL-2.0."

</details>

### Why is Zowe licensed using EPL2.0?

<details className="zowe-faq">

<summary></summary>

The Open Mainframe Project wants to encourage adoption and innovation, and also let the community share new source code across the Zowe ecosystem. The open source code can be used by anyone, provided that they adhere to the licensing terms.

</details>


### What are some examples of how Zowe technology might be used by z/OS products and applications?

<details className="zowe-faq">

<summary></summary>

The Zowe Desktop (web user interface) can be used in many ways, such as to provide custom graphical dashboards that monitor data for z/OS products and applications.

Zowe CLI can also be used in many ways, such as for simple job submission, data set manipulation, or for writing complex scripts for use in mainframe-based DevOps pipelines.

The increased capabilities of RESTful APIs on z/OS allows APIs to be used in programmable ways to interact with z/OS services.

</details>


### What is the best way to get started with Zowe?

<details className="zowe-faq">

<summary></summary>

Zowe provides a convenience build that includes the components released-to-date, as well as IP being considered for contribution, in an easy to install package on [Zowe.org](https://zowe.org). The convenience build can be easily installed and the Zowe capabilities seen in action.

To install the complete Zowe solution, see [Installing Zowe](../user-guide/installandconfig.md).

To get up and running with the Zowe CLI component quickly, see [Zowe CLI quick start](cli-getting-started.md).

</details>


### What are the prerequisites for Zowe?

<details className="zowe-faq">

<summary></summary>

Prerequisites vary by component used, but in most cases the primary prerequisites are Java and NodeJS on z/OS and the z/OS Management Facility enabled and configured. For a complete list of software requirements listed by component, see [System requirements for z/OS components](../user-guide/systemrequirements-zos.md) and [System requirements for Zowe CLI](../user-guide/systemrequirements-cli.md).

</details>

### What's the difference between using Zowe with or without Docker?  

<Badge text="Technical Preview"/>

<details className="zowe-faq">

<summary></summary>

Docker is a download option for Zowe that allows you to run certain Zowe server components outside of z/OS.
The Docker image contains the Zowe components that do not have the requirement of having to run on z/OS: The App server, API Mediation Layer, and the USS/MVS/JES Explorers.

Configurating components with Docker is similar to the procedures you would follow without Docker, however tasks such as installation and running with Docker are a bit different, as these tasks become Linux oriented, rather than utilizing Jobs and STCs.

:::note 

z/OS is still required when using the Docker image. Depending on which components of Zowe you use, you'll still need to set up z/OS Management Facility as well as Zowe's ZSS and Cross memory servers.

:::

</details>

### Is the Zowe CLI packaged within the Zowe Docker download?  

<Badge text="Technical Preview"/>

<details className="zowe-faq">

<summary></summary>

At this time, the Docker image referred to in this documentation contains only Zowe server components. It is possible to make a Docker image that contains the Zowe CLI, so additional Zowe content, such as the CLI, may have Docker as a distribution option later. 

If you are interested in improvements such as this one, please be sure to express that interest to the Zowe community!

</details>

### Does ZOWE support z/OS ZIIP processors?

<details className="zowe-faq">

<summary></summary>

Only the parts of Zowe that involve Java code are ZIIP enabled. The API Mediation Layer composed of the API Gateway, Discovery and Catalog servers along with any Java-based services that work with them such as the Jobs and Datasets servers are ZIIP enabled. Also, the CLI and VSCode Explorer make large use of z/OSMF, which is Java so they are ZIIP enabled as well. More details on portions of Zowe which are Java (ZIIP) enabled can be found [here](https://docs.zowe.org/stable/getting-started/zowe-architecture#zowe-architecture).

This leaves C and NodeJS code which are not ZIIP enabled, BUT, we have a [tech preview](https://www.zowe.org/download.html) available currently that allows execution of Java as well as NodeJS code, on Linux or zLinux via Docker. With the tech preview, only the C code remains on z/OS, which is not ZIIP enabled.

</details>

### How is access security managed on z/OS?

<details className="zowe-faq">

<summary></summary>

Zowe components use typical z/OS System authorization facility (SAF) calls for security.

</details>


### How is access to the Zowe open source managed?

<details className="zowe-faq">

<summary></summary>

The source code for Zowe is maintained on an Open Mainframe Project GitHub server. Everyone has read access. "Committers" on the project have authority to alter the source code to make fixes or enhancements. A list of Committers is documented in [Committers to the Zowe project](https://github.com/zowe/community/blob/master/COMMITTERS.md).

</details>


### How do I get involved in the open source development?

<details className="zowe-faq">

<summary></summary>

The best way to get started is to join a [Zowe Slack channel](https://slack.openmainframeproject.org/) and/or email distribution list and begin learning about the current capabilities, then contribute to future development.

For more information about emailing lists, community calendar, meeting minutes, and more, see the [Zowe Community](https://github.com/zowe/community/blob/master/README.md) GitHub repo.

For information and tutorials about extending Zowe with a new plug-in or application, see [Extending](../extend/extend-apiml/onboard-overview.md) on Zowe Docs.

</details>


### Where can I submit an idea for a future enhancement to Zowe?

<details className="zowe-faq">

<summary></summary>

Go to the [Zowe Community ReadMe file](https://github.com/zowe/community#submit-an-issue) for information on requesting a bug fix or enhancement. Members of the Zowe community can then review your issue to post feedback or vote their support. Issues are continuously monitored by Zowe squads for improvement ideas.

</details>


### When will Zowe be completed?

<details className="zowe-faq">

<summary></summary>

Zowe will continue to evolve in the coming years based on new ideas and new contributions from a growing community.

</details>


### Can I try Zowe without a z/OS instance?

<details className="zowe-faq">

<summary></summary>

IBM has contributed a free hands-on tutorial for Zowe. Visit the [Zowe Tutorial page](https://developer.ibm.com/tutorials/zowe-step-by-step-tutorial/) to learn about adding new applications to the Zowe Desktop and and how to enable communication with other Zowe components.

The Zowe community is also currently working to provide a vendor-neutral site for an open z/OS build and sandbox environment.

Zowe is also compatible with IBM z/OSMF Lite for non-production use. For more information, see [Configuring z/OSMF Lite](../user-guide/systemrequirements-zosmf-lite.md) on Zowe Docs.

</details>

## Zowe CLI FAQ

### Why might I use Zowe CLI versus a traditional ISPF interface to perform mainframe tasks?

<details className="zowe-faq">

<summary></summary>

For developers new to the mainframe, command-line interfaces might be more familiar than an ISPF interface. Zowe CLI lets developers be productive from day-one by using familiar tools. Zowe CLI also lets developers write scripts that automate a sequence of mainframe actions. The scripts can then be executed from off-platform automation tools such as Jenkins automation server, or manually during development.

</details>


### With what tools is Zowe CLI compatible?

<details className="zowe-faq">

<summary></summary>

Zowe CLI is very flexible; developers can integrate with modern tools that work best for them. It can work in conjunction with popular build and testing tools such as Gulp, Gradle, Mocha, and Junit. Zowe CLI runs on a variety of operating systems, including Windows, macOS, and Linux. Zowe CLI scripts can be abstracted into automation tools such as Jenkins and TravisCI.

</details>

### Where can I use the CLI?

<details className="zowe-faq">

<summary></summary>

| **Usage Scenario**    | **Example**  |
|------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Interactive use, in a command prompt or bash terminal. | Perform one-off tasks such as submitting a batch job.                                                            |
| Interactive use, in an IDE terminal                    | Download a data set, make local changes in your editor, then upload the changed dataset back to the mainframe.                                  |
| Scripting, to simplify repetitive tasks         | Write a shell script that submits a job, waits for the job to complete, then returns the output.                |
| Scripting, for use in automated pipelines       | Add a script to your Jenkins (or other automation tool) pipeline to move artifacts from a mainframe development system to a test system. |

</details>

### Which method should I use to install Zowe CLI?

<details className="zowe-faq">

<summary></summary>

You can install Zowe CLI using the following methods:

- **Local package installation:** The local package method lets you install Zowe CLI from a zipped file that contains the core application and all plug-ins. When you use the local package method, you can install Zowe CLI in an offline environment. We recommend that you download the package and distribute it internally if your site does not have internet access.

- **Online NPM registry:** The online NPM (Node Package Manager) registry method unpacks all of the files that are necessary to install Zowe CLI using the command line. When you use the online registry method, you need an internet connection to install Zowe CLI

</details>


### How can I get Zowe CLI to run faster?

<details className="zowe-faq">

<summary></summary>

- Zowe CLI runs significantly faster when you run it in daemon mode. Daemon mode significantly improves the performance of Zowe CLI commands by running Zowe CLI as a persistent background process. For more information, see [Using daemon mode](../user-guide/cli-using-using-daemon-mode.md).

</details>

### How can I manage profiles for my projects and teams?

<details className="zowe-faq">

<summary></summary>

- Zowe CLI V2 introduces **team** profiles. Using team profiles helps to improve the initial setup of Zowe CLI by making service connection details easier to share and easier to store within projects. For more information, see [Using team profiles](../user-guide/cli-using-using-team-profiles.md).

</details>

### Does Zowe CLI support multi-factor authentication (MFA)?

<details className="zowe-faq">

<summary></summary>

Yes, Zowe CLI supports MFA through the API Mediation Layer. Without the API ML, an MFA code can be used in place of a password for testing single requests, but storing the MFA code for future requests does not work because the code expires rapidly.

When mainframe services are routed through the API ML, users can log in to the API ML gateway with an MFA code to obtain a long-lived API ML authentication token that can be stored for future requests.

</details>

### How can I get help with using Zowe CLI?

<details className="zowe-faq">

<summary></summary>

- You can get help for any command, action, or option in Zowe CLI by issuing the command 'zowe --help'.
- For information about the available commands in Zowe CLI, see [Command Groups](../user-guide/cli-using-understanding-core-command-groups).
- If you have questions, the [Zowe Slack space](https://openmainframeproject.slack.com/) is the place to ask our community!

</details>

### How can I use Zowe CLI to automate mainframe actions?

<details className="zowe-faq">

<summary></summary>

- You can automate a sequence of Zowe CLI commands by writing bash scripts. You can then run your scripts in an automation server such as Jenkins. For example, you might write a script that moves your Cobol code to a mainframe test system before another script runs the automated tests.
- Zowe CLI lets you manipulate data sets, submit jobs, provision test environments, and interact with mainframe systems and source control management, all of which can help you develop robust continuous integration/delivery.

</details>


### How can I contribute to Zowe CLI?

<details className="zowe-faq">

<summary></summary>

As a developer, you can extend Zowe CLI in the following ways:

- Build a plug-in for Zowe CLI

- Contribute code to the core Zowe CLI

- Fix bugs in Zowe CLI or plug-in code, submit enhancement requests via GitHub issues, and raise your ideas with the community in Slack.

    **Note:** For more information, see [Developing for Zowe CLI](../extend/extend-cli/cli-devTutorials.md#how-to-contribute).

</details>

## Zowe Explorer FAQ

### Why might I use Zowe Explorer versus a traditional ISPF interface to perform mainframe tasks?

<details className="zowe-faq">

<summary></summary>

The Zowe Explorer VSCode extension provides developers new to the mainframe with a modern UI, allowing you to access and work with the data set, USS, and job functionalities in a fast and streamlined manner. In addition, Zowe Explorer enables you to work with Zowe CLI profiles and issue TSO/MVS commands.

</details>

### How can I get started with Zowe Explorer?

<details className="zowe-faq">

<summary></summary>

First of all, make sure you fulfill the following Zowe Explorer software requirements:

- Get access to z/OSMF.
- Install [VSCode](https://code.visualstudio.com/).
- Configure TSO/E address space services, z/OS data set, file REST interface, and z/OS jobs REST interface. For more information, see [z/OS Requirements](https://docs.zowe.org/stable/user-guide/systemrequirements-zosmf#z-os-requirements).
- For development, install [Node.js](https://nodejs.org/en/download/) v14.0 or later.

Once the software requirements are fulfilled, create a Zowe Explorer profile.

**Follow these steps:**

1. Navigate to the explorer tree.
2. Click the **+** button next to the **DATA SETS**, **USS**, or **JOBS** bar.
3. Select the **Create a New Connection to z/OS** option.
4. Follow the instructions, and enter all required information to complete the profile creation.

You can also watch [Getting Started with Zowe Explorer](https://www.youtube.com/watch?v=G_WCsFZIWt4) to understand how to use the basic features of the extension.

</details>

### Where can I use Zowe Explorer?

<details className="zowe-faq">

<summary></summary>

You can use Zowe Explorer either in [VSCode](https://marketplace.visualstudio.com/items?itemName=Zowe.vscode-extension-for-zowe) or in Theia. For more information about Zowe Explorer in Theia, see [Developing for Theia](https://github.com/zowe/zowe-explorer-vscode/wiki/Developing-for-Theia).

</details>

### How do I get help with using Zowe Explorer?

<details className="zowe-faq">

<summary></summary>

- Use [the Zowe Explorer channel](https://openmainframeproject.slack.com/archives/CUVE37Z5F) in Slack to ask the Zowe Explorer community for help.
- Open a question or issue directly in [the Zowe Explorer GitHub repository](https://github.com/zowe/zowe-explorer-vscode/issues).

</details>

### How can I use Secure Credential Storage for Zowe Explorer?

<details className="zowe-faq">

<summary></summary>

The Secure Credential Store Plug-in is no longer required for Zowe Explorer.

Secure credential storage functionality is now contained in the Zowe CLI core application, which stores credentials securely by default.

</details>

### What if Secure Credential Storage does not work in my environment?

<details className="zowe-faq">

<summary></summary>

When an environment does not support Secure Credential Storage, it is possible to disable it. See [Disabling Secure Credential Storage of credentials](../user-guide/ze-usage.md#disabling-secure-credential-storage-of-credentials) for more information.

</details>

### What if I do not want Zowe Explorer to store my credentials?

<details className="zowe-faq">

<summary></summary>

Although not recommended in all cases, it is possible to disable Zowe Explorer's credential management functionality. See [Preventing Zowe Explorer from storing credentials](../user-guide/ze-usage.md#preventing-zowe-explorer-from-storing-credentials) for more information.

</details>

### What types of profiles can I create for Zowe Explorer?

<details className="zowe-faq">

<summary></summary>

Zowe Explorer V2 supports using Service Profiles, Base Profiles, and Team Profiles. For more information, see [Using V1 profiles](../user-guide/cli-using-using-profiles-v1.md) and [Team configurations](../user-guide/cli-using-using-team-profiles.md) in the Using Zowe CLI section.

</details>

### Does Zowe Explorer support multi-factor authentication (MFA)?

<details className="zowe-faq">

<summary></summary>

Yes, Zowe Explorer supports MFA through the API Mediation Layer. Without the API ML, an MFA code can be used in place of a password for testing single requests, but storing the MFA code for future requests does not work because the code expires rapidly.

When mainframe services are routed through the API ML, users can log in to the API ML gateway with an MFA code to obtain a long-lived API ML authentication token that can be stored for future requests.

</details>

### Is it possible to change the detected language of a file or data set opened in Zowe Explorer?

<details className="zowe-faq">

<summary></summary>

Yes, you can configure Visual Studio Code to use a specific language for a particular file extension or data set qualifier. To set file associations, see [Add a file extension to a language](https://code.visualstudio.com/docs/languages/overview#_add-a-file-extension-to-a-language).

</details>

### How can I use FTP as my back-end service for Zowe Explorer?

<details className="zowe-faq">

<summary></summary>

See the [Zowe FTP extension README](https://github.com/zowe/zowe-explorer-ftp-extension/#readme) in GitHub for information about how to install FTP from the Visual Studio Code Marketplace and use it as your back-end service for working with UNIX files.

</details>

### How can I contribute to Zowe Explorer? 

<details className="zowe-faq">

<summary></summary>

As a developer, you may contribute to Zowe Explorer in the following ways:

- Build a Zowe Explorer extension.

- Contribute code to core Zowe Explorer.

- Fix bugs in Zowe Explorer, submit enhancement requests via GitHub issues, and raise your ideas with the community in Slack.

   Note: For more information, see [Extending Zowe Explorer](https://github.com/zowe/zowe-explorer-vscode/wiki/Extending-Zowe-Explorer).

</details>

## Zowe Explorer plug-in for IntelliJ IDEA FAQ

### Why would I use the plug-in versus a traditional ISPF interface to perform mainframe tasks?

<details className="zowe-faq">

<summary></summary>

Zowe Explorer plug-in for IntelliJ IDEA allows you to access and work with data sets, members and jobs directly from your IntelliJ-based IDE, such as IntelliJ IDEA, PyCharm, Android Studio, etc.

</details>

### How can I get started with Zowe Explorer plug-in for IntelliJ IDEA?

<details className="zowe-faq">

<summary></summary>

Install the plug-in in your IntelliJ-based IDE directly from marketplace or download it from [here](https://plugins.jetbrains.com/plugin/18688-zowe-explorer). 

</details>

### Where can I use Zowe Explorer plug-in for IntelliJ IDEA?

<details className="zowe-faq">

<summary></summary>

You can use it in any IntelliJ-based IDE, such as IntelliJ IDEA, PyCharm, Android Studio, etc.

</details>

### How do I get help with using Zowe Explorer plug-in for IntelliJ IDEA?

<details className="zowe-faq">

<summary></summary>

You can start with the [Use cases](../user-guide/intellij-use-cases.md) section to learn about use cases and how to install and use the plug-in. Also, you can ask any questions in our [Zowe Slack channel (#zowe-explorer-intellij)](https://openmainframeproject.slack.com/archives/C020BGPSU0M).

</details>

### How can I contribute to Zowe Explorer plug-in for IntelliJ IDEA?

<details className="zowe-faq">

<summary></summary>

If you have ideas on how to improve the plug-in, or have an issue/bug fix in mind, visit the [contribution guide](https://github.com/zowe/zowe-explorer-intellij/blob/main/CONTRIBUTING.md). Also, you can ask for help in our [Zowe Slack channel (#zowe-explorer-intellij)](https://openmainframeproject.slack.com/archives/C020BGPSU0M).

</details>
