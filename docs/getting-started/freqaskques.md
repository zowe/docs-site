# Frequently Asked Questions

## Zowe CLI

The following questions are frequently asked about Zowe CLI:

**Why might I use Zowe CLI versus a traditional ISPF interface to perform mainframe tasks?**

For new developers, command line interfaces might be more familiar than an ISPF interface. Zowe CLI lets developers be productive from day-one by using familiar tools. Zowe CLI also lets developers write scripts that automate a sequence of mainframe actions. The scripts can then be executed from off-platform automation tools such as Jenkins automation server, or manually during development.

**With what tools is Zowe CLI compatible?**

Zowe CLI is very flexible! It can work in conjunction with popular build and testing tools such as Gulp and Gradle, Mocha and Junit. Zowe CLI runs on a variety of operating systems, including Windows, macOS, and Linux. Zowe CLI scripts can be abstracted into automation tools such as Jenkins and TravisCI. This is a key advantage of the CLI - developers can integrate with modern tools that work best for them. 

**Which method should I use to install Zowe CLI?**

You can install Zowe CLI using the following methods:
- **Local package installation:** The local package method lets you install Zowe CLI from a zipped file that contains the core application and all plug-ins. When you use the local package method, you can install Zowe CLI in an offline environment. We recommend that you download the package and distribute it internally if your site does not have internet access. 
- **Online NPM registry:** The online NPM (Node Package Manager) registry method unpacks all of the files that are necessary to install Zowe CLI using the command line. When you use the online registry method, you need an internet connection to install Zowe CLI

**How can I get help with using Zowe CLI?**

- You can get help for any command, action, or option in Zowe CLI by issuing the command 'zowe --help'.
- For information about the available commands in Zowe CLI, see [Command Groups](../user-guide/cli-usingcli.md#zowe-cli-command-groups).
- If you have questions, the [Zowe Slack space](https://openmainframeproject.slack.com/) is the place to ask our community!

**How can I use Zowe CLI to automate mainframe actions?**

- You can automate a sequence of Zowe CLI commands by writing bash scripts. You can then run your scripts in an automation server such as Jenkins. For example, you might write a script that moves your Cobol code to a mainframe test system before another script runs the automated tests.
- Zowe CLI lets you manipulate data sets, submit jobs, provision test environments, and interact with mainframe systems and source control management, all of which can help you develop robust continuous integration/delivery.

**How can I contribute to Zowe CLI?**

As a developer, you can extend Zowe CLI in the following ways:
- Build a plug-in for Zowe CLI
- Contribute code to the core Zowe CLI
- Fix bugs in Zowe CLI or plug-in code, submit enhancement requests via GitHub issues, and raise your ideas with the community in Slack. 

    **Note:** For more information, see [Developing for Zowe CLI](../extend/extend-cli/cli-devTutorials.md#how-can-i-contribute).