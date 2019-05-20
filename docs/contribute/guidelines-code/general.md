# General code style guidelines

All code written in the languages described in [Code categories](categories.md) should adhere to the following guidelines to facilitate collaboration and understanding:

**Note:** Uncertainties, unimplemented but known future action-items, and odd/specific constants should all be accompanied with a short comment to make others aware of the reasoning that went into the code.

## Whitespaces
Do not use tabs for whitespace. Use 2 spaces per tab instead.

## Naming Conventions

### Functions and methods

Self-documenting code reduces the need for extended code comments. It is encouraged to use names as long as necessary to describe what is occurring. Generally speaking, methods should be named as verbs (Think: get or set), while Objects/Classes should be nouns. Objects and functions should be CamelCase, while methods on Objects should be dromedaryCase 

### Variables
Constants should be CAPITALIZED_AND_UNDERSCORED for clarity, while variables can remain dromedaryCase as methods are. Avoid non-descriptive variable names such as single letters (except for iteration in loops such as i or j) and variable names that have been arbitrarily shortened (Don't strip vowels, long variable names are OK)
