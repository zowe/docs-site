# Pull requests guidelines
Zowe uses git as its version control system. In particular, the git repositories are hosted on our github project. Therefore, in order to contribute code to Zowe you must do so in the form of a Pull Request. 
Pull Request Guidelines
Each pull request is made against a repository within which there are maintainers. Pull requests cannot be merged without the approval of at least one maintainer, who will be looking for the pull request to meet requirements as follows:

The code in the pull request must adhere to the General Code Style Guidelines.
The code must compile/transpile (where applicable) and pass a smoke test such that the code is not known to break the current state of Zowe.
The pull request must describe the purpose and implementation to the extent that the maintainer understands what is being accomplished. Some pull requests need less details than others depending on novelty.
The pull request must state how to test this change, if applicable, such that the maintainer or a QA team can check correctness. The explanation may simply be to run included test code.
If a pull request depends upon a pull request from the same / another repository that is pending, this must be stated such that maintainers know in which order to merge open pull requests.