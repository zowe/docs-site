# Zowe CLI Extenders Checklist

| Phase | Task Description | Status |
|---|---|---|
| **1. Preparation & Setup** | [Install Zowe CLI](https://docs.zowe.org/stable/user-guide/cli-installcli) as a prerequisite in your local development environment. | [ ] |
| | Clone the [zowe-cli-sample-plugin](https://github.com/zowe/zowe-cli-sample-plugin/#zowe-cli-sample-plug-in) (or initialize your own structure) and compile from source using `npm install` and `npm run build`. | [ ] |
| | Review the core [Contribution guidelines](https://github.com/zowe/zowe-cli/blob/master/CONTRIBUTING.md) and [Package and plug-in guidelines](https://github.com/zowe/zowe-cli/blob/master/docs/PackagesAndPluginGuidelines.md) to ensure your syntax and architecture align with Zowe CLI standards. | [ ] |
| **2. Plug-in Architecture** | Configure the [Imperative CLI Framework](https://github.com/zowe/zowe-cli/wiki) by defining the necessary `imperative-framework` configuration within your `package.json`'s `imperative` key. | [ ] |
| | Build Typescript interfaces (e.g., `ITodo.ts`) to map JSON response data from external or mainframe REST APIs into strictly typed properties. | [ ] |
| | Develop Node.js Programmatic APIs utilizing `@zowe/imperative` classes (like `RestClient`, `Logger`, and `Session`) and export them in `index.ts` so they can be consumed by other Node applications. | [ ] |
| **3. Command Implementation** | Create a Command Definition file (`ICommandDefinition`) that establishes the command name, aliases, summary, description, and available options/flags. | [ ] |
| | Add your new Command Definition to a command group by importing it and placing it in the `children` array of the parent definition. | [ ] |
| | Build a Command Handler (`ICommandHandler`) to process parameters (`IHandlerParameters`), call the programmatic API, format the JSON response, and push output to the terminal. | [ ] |
| **4. Testing & Validation** | Install your development plug-in into your active Zowe CLI environment by running `zowe plugins install <path-to-plugin>`. | [ ] |
| | Execute `zowe <your-command-group> --help` to verify that the Imperative framework successfully auto-generated the help text and correctly formatted your command definitions. | [ ] |
| | Configure your `custom_properties.yaml` file with valid system information and test against the [Testing guidelines](https://github.com/zowe/zowe-cli/blob/master/docs/TESTING.md) and [Plug-in testing guidelines](https://github.com/zowe/zowe-cli/blob/master/docs/PluginTESTINGGuidelines.md). | [ ] |
| | Run your automated testing suites (e.g., `npm run test:unit`, `npm run test:integration`) to identify any failed tests or linting errors. | [ ] |
| **5. Versioning & Release** | Verify that your plug-in package adheres to the community [Versioning guidelines](https://github.com/zowe/zowe-cli/blob/master/docs/MaintainerVersioning.md) before pushing to production or contributing upstream. | [ ] |
| **6. Custom Plug-in Initialization** | Start a [brand new plug-in](https://docs.zowe.org/stable/extend/extend-cli/cli-developing-a-plugin) by cleaning out the boilerplate `src/api` and `src/cli` sample files. | [ ] |
| | Update `package.json` to reflect your unique plug-in name (e.g., `"name": "@scope/your-plugin-name"`). | [ ] |
| | Customize the Imperative configuration properties (`commandModuleGlobs`, `rootCommandDescription`, `productDisplayName`, `name`) in your `src/pluginDef.ts` file. | [ ] |
| | Install and save any specific third-party dependencies required for your client-side APIs (e.g., `npm install --save-exact <package>`). | [ ] |
| **7. Profile Implementation** | Define custom [profile types and schemas](https://docs.zowe.org/stable/extend/extend-cli/cli-implement-profiles) within your `pluginDef.ts` file to allow users to save connections via Zowe team configurations. | [ ] |
| | Set `includeInTemplate: true` on profile properties that should automatically generate in user team configuration templates. | [ ] |
| | Set `secure: true` on sensitive profile properties (like passwords or tokens) to ensure they are stored securely in the user's credential manager. | [ ] |
| **8. Authentication Mechanisms** | Review Zowe's [default authentication order of precedence](https://docs.zowe.org/stable/extend/extend-cli/cli-authentication-mechanisms) (e.g., API ML token vs username/password vs PEM certificate). | [ ] |
| | If your service requires a custom authentication priority, program your extension to add an `authOrder` property to its configuration profile, or document this requirement for your end-users. | [ ] |
| **9. Plug-in Lifecycle Actions** | Create [lifecycle actions](https://docs.zowe.org/stable/extend/extend-cli/cli-creating-plug-in-lifecycle-actions) by defining a `pluginLifeCycle` path in `pluginDef.ts` pointing to a custom JavaScript implementation file. | [ ] |
| | Extend the `AbstractPluginLifeCycle` class and write instructions for the `postInstall` and `preUninstall` functions to handle tasks like automated setup, initial checks, or overriding credential managers. | [ ] |