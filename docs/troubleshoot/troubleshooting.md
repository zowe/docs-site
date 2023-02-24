# Troubleshooting

To isolate and resolve Zowe&trade; problems, you can use the troubleshooting and support information.

## How to start troubleshooting

When you run into some issues and look for troubleshooting tips, the following steps may help you.

1. Search the error message or error code that you have in log on [Zowe doc site](https://docs.zowe.org/). If there are existing solutions, then you could follow them.

2. If no solution is available or the existing solutions cannot apply to your problems, you could search the keywords, error messages, or error code in [Zowe GitHub repository](https://github.com/zowe). If the issues or pull requests are closed with solutions, you could follow them. If the issues are still open, you could leave your question or have a discussion in the thread to solve your issue.

![A gif to show how to search in github repo](../images/troubleshoot/how-to-troubleshooting.gif)

3. If your problems are not solved, you could try the following options:

* Create a new issue in the Zowe GitHub repository with detailed description of the problem that you encounter with.

* Bring up your questions to the corresponding channels as shown below.

    - [Zowe CLI Slack channel](https://openmainframeproject.slack.com/archives/CC8AALGN6)
    - [Zowe API ML Slack channel](https://openmainframeproject.slack.com/archives/CC5UUL005)
    - [Zowe Chat Slack channel](https://openmainframeproject.slack.com/archives/C03NNABMN0J)
    - [Zowe Documentation Slack channel](https://openmainframeproject.slack.com/archives/CC961JYMQ)

* Reach out to your available Zowe support team for assistance.

## Known problems and solutions

Some common problems with Zowe are documented, along with their solutions or workarounds. If you have a problem with Zowe installation and components, review the problem-solution topics to determine whether a solution is available to the problem that you are experiencing.

You can also find error messages and codes, must-gathers, and information about how to get community support in these topics.

- [Troubleshooting API Mediation Layer](troubleshoot-apiml.md)
- [Troubleshooting Zowe Application Framework](./app-framework/app-troubleshoot.md)
- [Troubleshooting Zowe CLI](./cli/troubleshoot-cli.md)
- [Troubleshooting Zowe Launcher](./launcher/launcher-troubleshoot.md)
- [Troubleshooting Zowe IntelliJ plug-in](troubleshoot-intellij.md)

## Verifying a Zowe release's integrity

Following a successful install of a Zowe release, the Zowe runtime directory should contain the code needed to launch and run Zowe. If the contents of the Zowe runtime directory have been modified then this may result in unpredictable behavior. To assist with this Zowe provides the ability to validate the integrity of a Zowe runtime directory, see [Verify Zowe runtime directory](./verify-fingerprint.md)

## Understanding the Zowe release

Knowing which version of Zowe you are running might help you isolate the problem. Also, the Zowe community who helps you will need to know this information. For more information, see [Understanding the Zowe release](troubleshoot-zowe-release.md).

