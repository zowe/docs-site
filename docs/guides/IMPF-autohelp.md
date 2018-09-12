# Auto Generated Help
With the Imperative CLI Framework, you can generate help content automatically for all the commands that are present in an Imperative CLI command definition structure. The framework automatically generates searchable help content from the root command of your project to the last positional operand on individual commands. We strongly recommend that you author well-defined command summaries, because the detail and accuracy of the content significantly affects the findability of content when searching.

When you need to modify help content, you can supply a custom help generator class as part of the command definition. However, when you supply a custom help generator, it must extend the base `AbstractHelpGenerator`.
