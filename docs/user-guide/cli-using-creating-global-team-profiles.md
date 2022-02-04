# Creating global team profiles

As a system administrator or team leader, you can share global profiles with your team members so that they can easily access mainframe services.

## Sharing global configuration

As a team leader, you might want to share a configuration globally under the following situations:

*   You want to share profiles with developers so that they can work with a defined set of mainframe services. The recipient of the file manually places it in their local `~/.zowe` folder before issuing CLI commands.
*   You want to add the profiles to your project directory in a software change management (SCM) tool, such as GitHub. When you store the profiles in an SCM, developers can pull the project to their local machine and use the defined configuration. Zowe CLI commands that you issue from within the project directory automatically use the project's configuration scheme.
*   You want to enable test automation and CI/CD, which lets your pipelines make use of the project configuration.