# Issue #3592: ZOWE Install Document Issue : unzip command through command prompt is not working 

**URL:** https://github.com/zowe/docs-site/issues/3592

**Created:** 2024-04-04T20:27:33Z

**Updated:** 2025-03-14T14:18:45Z

**Labels:** area: install and config, release: V3, Size: M

---

**Describe the bug**
A clear and concise description of what the bug or error is.
Zowe docs: Installing Zowe via SMP/E instructions
Go to the topic of "Download and unzip the Zowe SMP/E package"
You will receive one ZIP package on your desktop. Extract the following files from the package. You may need to use the unzip command at a terminal rather than an unzip utility. For example, run unzip zowe-smpe-package-2.1.0.zip in your terminal.

As per the document unzip through the command line didn't work to unzip the zowe-smpe-package-2.0.0 zip file. We used tar -xf command to unzip the file through the command line. Could you please correct the documentation with the correct command.

**Steps to Reproduce**

1. Downloaded zowe-smpe-package-2.0.0 zip file from zowe site.
2. Unzip the tar file using unzip command using Command Prompt did NOT work but tar -xf command to unzip the file via Command Prompt did work.

**Expected behavior**


**Screenshots**
If applicable, add screenshots to help explain your problem.

**Logs**
If applicable, add server logs collected at the time of your problem.

**Details**
 - Version and build number: [e.g. 0.4.4-SNAPSHOT build # 155]
 - Test environment: [e.g. zD&T, zPDT, MONOPLEX, SYSPLEX, z/OS Rev 2.2, TSS, RACF, ACF2, or any other germane detail]

**Web Browser Details (if the bug relates to Zowe Desktop usage):**
 - OS: [e.g. macOS, Windows]
 - Browser [e.g. Chrome, Safari]
 - Version [e.g. 71.0.3578.98]

**REST API client (in case of REST API issue):**
 - Technology: [e.g. Spring Boot, Node.js, Postman]
 - OS: [e.g. Windows 10]

**Shell Environment Details (if the bug relates to CLI):**
 - Technology: [e.g. zsh, cygwin, cmd, powershell, bash]
 - OS: [e.g. MacOS 10.13, Windows 10, Ubuntu 16.04 LTS]

**Additional context**
Add any other context about the problem here.

## Validation Status: ❌ STILL OPEN

**Validation Date:** 2025-05-20

**Validator:** Mistral Vibe

**Findings:** The issue is NOT yet addressed. The documentation still only mentions `unzip` command which doesn't work on Windows Command Prompt.

**Current State:** 
- `docs/user-guide/install-zowe-smpe.md:54` states: "You may need to use the `unzip` command at a terminal rather than an unzip utility. For example, run `unzip zowe-smpe-package-3.0.0.zip` in your terminal."
- This command does NOT work on Windows Command Prompt as reported
- The user found that `tar -xf zowe-smpe-package-2.0.0.zip` works on Windows Command Prompt
- On Windows, `unzip` is not a native command, while `tar` is available in recent Windows versions

**Recommendation:** Update the documentation to provide platform-specific extraction commands:
- For Linux/macOS/Unix: `unzip zowe-smpe-package-3.0.0.zip`
- For Windows Command Prompt: `tar -xf zowe-smpe-package-3.0.0.zip`
- Or use a cross-platform alternative like noting that both commands work

