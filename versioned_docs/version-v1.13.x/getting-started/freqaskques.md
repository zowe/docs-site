# Frequently Asked Questions

Check out the following FAQs to learn more about the purpose and function of Zowe&trade;.

- [Zowe FAQ](#zowe-faq)
- [Zowe CLI FAQ](#zowe-cli-faq)

## Zowe FAQ

### What is Zowe?

<details class="zowe-faq">

<summary></summary>

Zowe is an open source project within the [Open Mainframe Project](https://www.openmainframeproject.org/) that is part of [The Linux Foundation](https://www.linuxfoundation.org). The Zowe project provides modern software interfaces on IBM z/OS to address the needs of a variety of modern users. These interfaces include a new web graphical user interface, a script-able command-line interface, extensions to existing REST APIs, and new REST APIs on z/OS.

</details>

### Who is the target audience for using Zowe?

<details class="zowe-faq">

<summary></summary>

Zowe technology can be used by a variety of mainframe IT and non-IT professionals. The target audience is primarily application developers and system programmers, but the Zowe Application Framework is the basis for developing web browser interactions with z/OS that can be used by anyone.

</details>

### What language is Zowe written in?

<details class="zowe-faq">

<summary></summary>

Zowe consists of several components. The primary languages are Java and JavaScript. Zowe CLI is written in TypeScript.

</details>

### What is the licensing for Zowe?

<details class="zowe-faq">

<summary></summary>

Zowe source code is licensed under EPL2.0. For license text click [here](https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.txt) and for additional information click [here](https://www.eclipse.org/legal/epl-2.0/faq.php).

In the simplest terms (taken from the FAQs above) - "...if you have modified EPL-2.0 licensed source code and you distribute that code or binaries built from that code outside your company, you must make the source code available under the EPL-2.0."

</details>

### Why is Zowe licensed using EPL2.0?

<details class="zowe-faq">

<summary></summary>

The Open Mainframe Project wants to encourage adoption and innovation, and also let the community share new source code across the Zowe ecosystem. The open source code can be used by anyone, provided that they adhere to the licensing terms.

</details>


### What are some examples of how Zowe technology might be used by z/OS products and applications?

<details class="zowe-faq">

<summary></summary>

The Zowe Desktop (web user interface) can be used in many ways, such as to provide custom graphical dashboards that monitor data for z/OS products and applications.

Zowe CLI can also be used in many ways, such as for simple job submission, data set manipulation, or for writing complex scripts for use in mainframe-based DevOps pipelines.

The increased capabilities of RESTful APIs on z/OS allows APIs to be used in programmable ways to interact with z/OS services.

</details>


### What is the best way to get started with Zowe?

<details class="zowe-faq">

<summary></summary>

Zowe provides a convenience build that includes the components released-to-date, as well as IP being considered for contribution, in an easy to install package on [Zowe.org](https://zowe.org). The convenience build can be easily installed and the Zowe capabilities seen in action.

To install the complete Zowe solution, see [Installing Zowe](../user-guide/installandconfig.md).

To get up and running with the Zowe CLI component quickly, see [Zowe CLI quick start](cli-getting-started.md).

</details>


### What are the prerequisites for Zowe?

<details class="zowe-faq">

<summary></summary>

The primary prerequisites is Java on z/OS and the z/OS Management Facility enabled and configured. For a complete list of software requirements listed by component, see [System requirements](../user-guide/systemrequirements.md).

</details>

### How is access security managed on z/OS?

<details class="zowe-faq">

<summary></summary>

Zowe components use typical z/OS System authorization facility (SAF) calls for security.

</details>


### How is access to the Zowe open source managed?

<details class="zowe-faq">

<summary></summary>

The source code for Zowe is maintained on an Open Mainframe Project GitHub server. Everyone has read access. "Committers" on the project have authority to alter the source code to make fixes or enhancements. A list of Committers is documented in [Committers to the Zowe project](https://github.com/zowe/community/blob/master/COMMITTERS.md).

</details>


### How do I get involved in the open source development?

<details class="zowe-faq">

<summary></summary>

The best way to get started is to join a [Zowe Slack channel](https://slack.openmainframeproject.org/) and/or email distribution list and begin learning about the current capabilities, then contribute to future development.

For more information about emailing lists, community calendar, meeting minutes, and more, see the [Zowe Community](https://github.com/zowe/community/blob/master/README.md) GitHub repo.

For information and tutorials about extending Zowe with a new plug-in or application, see [Extending](../extend/extend-apiml/onboard-overview.md) on Zowe Docs.

</details>


### When will Zowe be completed?

<details class="zowe-faq">

<summary></summary>

Zowe will continue to evolve in the coming years based on new ideas and new contributions from a growing community.

</details>


### Can I try Zowe without a z/OS instance?

<details class="zowe-faq">

<summary></summary>

IBM has contributed a free hands-on tutorial for Zowe. Visit the [Zowe Tutorial page](https://developer.ibm.com/tutorials/zowe-step-by-step-tutorial/) to learn about adding new applications to the Zowe Desktop and and how to enable communication with other Zowe components.

The Zowe community is also currently working to provide a vendor-neutral site for an open z/OS build and sandbox environment.

Zowe is also compatible with IBM z/OSMF Lite for non-production use. For more information, see [Configuring z/OSMF Lite](../user-guide/systemrequirements-zosmf-lite.md) on Zowe Docs.

</details>


## Zowe CLI FAQ

### Why might I use Zowe CLI versus a traditional ISPF interface to perform mainframe tasks?

<details class="zowe-faq">

<summary></summary>

For developers new to the mainframe, command-line interfaces might be more familiar than an ISPF interface. Zowe CLI lets developers be productive from day-one by using familiar tools. Zowe CLI also lets developers write scripts that automate a sequence of mainframe actions. The scripts can then be executed from off-platform automation tools such as Jenkins automation server, or manually during development.

</details>


### With what tools is Zowe CLI compatible?

<details class="zowe-faq">

<summary></summary>

Zowe CLI is very flexible; developers can integrate with modern tools that work best for them. It can work in conjunction with popular build and testing tools such as Gulp, Gradle, Mocha, and Junit. Zowe CLI runs on a variety of operating systems, including Windows, macOS, and Linux. Zowe CLI scripts can be abstracted into automation tools such as Jenkins and TravisCI.

</details>

### Where can I use the CLI?

<details class="zowe-faq">

<summary></summary>

| **Usage Scenario**    | **Example**  |
|------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Interactive use, in a command prompt or bash terminal. | Perform one-off tasks such as submitting a batch job.                                                            |
| Interactive use, in an IDE terminal                    | Download a data set, make local changes in your editor, then upload the changed dataset back to the mainframe.                                  |
| Scripting, to simplify repetitive tasks         | Write a shell script that submits a job, waits for the job to complete, then returns the output.                |
| Scripting, for use in automated pipelines       | Add a script to your Jenkins (or other automation tool) pipeline to move artifacts from a mainframe development system to a test system. |

</details>

### Which method should I use to install Zowe CLI?

<details class="zowe-faq">

<summary></summary>

You can install Zowe CLI using the following methods:

- **Local package installation:** The local package method lets you install Zowe CLI from a zipped file that contains the core application and all plug-ins. When you use the local package method, you can install Zowe CLI in an offline environment. We recommend that you download the package and distribute it internally if your site does not have internet access.

- **Online NPM registry:** The online NPM (Node Package Manager) registry method unpacks all of the files that are necessary to install Zowe CLI using the command line. When you use the online registry method, you need an internet connection to install Zowe CLI

</details>


### How can I get help with using Zowe CLI?

<details class="zowe-faq">

<summary></summary>

- You can get help for any command, action, or option in Zowe CLI by issuing the command 'zowe --help'.
- For information about the available commands in Zowe CLI, see [Command Groups](../user-guide/cli-usingcli.md#understanding-core-command-groups).
- If you have questions, the [Zowe Slack space](https://openmainframeproject.slack.com/) is the place to ask our community!

</details>

### How can I use Zowe CLI to automate mainframe actions?

<details class="zowe-faq">

<summary></summary>

- You can automate a sequence of Zowe CLI commands by writing bash scripts. You can then run your scripts in an automation server such as Jenkins. For example, you might write a script that moves your Cobol code to a mainframe test system before another script runs the automated tests.
- Zowe CLI lets you manipulate data sets, submit jobs, provision test environments, and interact with mainframe systems and source control management, all of which can help you develop robust continuous integration/delivery.

</details>


### How can I contribute to Zowe CLI?

<details class="zowe-faq">

<summary></summary>

As a developer, you can extend Zowe CLI in the following ways:

- Build a plug-in for Zowe CLI

- Contribute code to the core Zowe CLI

- Fix bugs in Zowe CLI or plug-in code, submit enhancement requests via GitHub issues, and raise your ideas with the community in Slack.

    **Note:** For more information, see [Developing for Zowe CLI](../extend/extend-cli/cli-devTutorials.md#how-can-i-contribute).

</details>

