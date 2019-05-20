# General code style

All code written in the languages above should adhere to code style guidelines to facilitate collaboration and understanding. When writing new code, the following is recommended  

## Whitespaces
Tabs should not be used for whitespace, instead being replaced with 2 spaces per tab.

## Naming Conventions
Function and Method Naming Self-documenting code reduces the need for extended code comments. It is encouraged to use names as long as necessary to describe what is occurring. Generally speaking, methods should be named as verbs (Think: get or set), while Objects/Classes should be nouns. Objects and functions should be CamelCase, while methods on Objects should be dromedaryCase Variable Naming Constants should be CAPITALIZED_AND_UNDERSCORED for clarity, while variables can remain dromedaryCase as methods are. Avoid non-descriptive variable names such as single letters (except for iteration in loops such as i or j) and variable names that have been arbitrarily shortened (Don't strip vowels, long variable names are OK)

## Commenting
Uncertainties, unimplemented but known future action items, and odd/specific constants should all be accompanied with a short comment to make others aware of the reasoning that went into the code.