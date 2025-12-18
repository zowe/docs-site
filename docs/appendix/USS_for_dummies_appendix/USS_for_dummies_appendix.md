# Zowe and z/OS Unix

## Introduction to z/OS Unix

z/OS Unix is an integral part of the z/OS operating system, bringing the strengths of Unix to the powerful mainframe environment. z/OS Unix allows you to run Unix applications and services on a z/OS system, leveraging the robust security, scalability, and reliability features of the mainframe. It is essential for modern enterprise applications and services, and for Zowe which leverages z/OS Unix for various functionalities.

## Getting started with z/OS Unix

1.	Accessing the Unix Shell: To begin, you need to access the Unix System Services (USS) environment on your z/OS. You can do this by logging in to TSO/E and entering the OMVS command or directly through a secure shell (SSH) client.
2.	Basic Commands: Familiarize yourself with basic Unix commands. Commands like `ls`, `cd`, `pwd`, `mkdir`, and `rmdir` will help you navigate and manage directories.
3.	File Permissions: Understand the Unix file permissions and how to modify them using the `chmod` command. Remember that the right permissions are crucial for the proper execution of files and directories.

## Zowe and z/OS Unix

Zowe interacts with z/OS Unix to provide several functionalities, such as:

- Zowe CLI: Zowe Command Line Interface (CLI) allows you to interact with z/OS Unix. You can issue z/OS Unix commands, manage data sets, USS files, and more.
- Zowe APIs: Zowe offers REST APIs that interact with z/OS Unix. You can leverage these APIs to automate and integrate z/OS Unix functionalities with other systems and services. Some APIs come from z/OSMF and some come from ZSS. 
- Zowe App Framework: The Zowe Desktop has a collection of apps that interact with z/OS Unix, such as the Zowe Editor or USS Explorer. 

## Best practices

1. Security: Always follow the best practices for security. Ensure that files and directories have the correct permissions, and avoid using high-privileged accounts unless necessary.
2. Scripting: Leverage scripting capabilities in z/OS Unix. Shell scripting allows you to automate repetitive tasks, enhance productivity, and reduce errors.
3. Logging and Monitoring: Keep track of activities in z/OS Unix. Regularly check logs and set up monitoring to ensure that the system is operating correctly and securely.

## Troubleshooting

If you encounter issues while working with z/OS Unix, do the following:

- Consult Documentation: Refer to IBM documentation and Zowe documentation for guidance and troubleshooting steps.
- Online Forums and Communities: Online communities, such as Zowe’s Slack channel, can be a valuable resource. You can ask questions, share experiences, and get advice from other users and experts.


This document is a simplified guide to getting started with z/OS Unix in the context of Zowe. 


You can use the following commands to perform your operations on z/OS:

Command     | Description
---|---
bash	    | A feature-rich shell that makes running and recalling previous commands easier. This is not on z/OS by default but is available for free.
bg (ctrl+z)	| Sends the currently running program to the background so that your terminal can be used for other purposes.
ctrl+c	    | Issues SIGTERM to a program (kill -15) which usually is used to close the program in the foreground.
cd	        | Changes directories. Can change directories relative to your current directory, especially with '.' for current directory, and '..' for going up one directory. Can change directories by absolute path too (paths that start with /).
cat	        | Prints contents of a file to the screen (STDOUT) by default.
cp	        | Copies a file, data set, or folder recursively. cp takes a source and target. `cp -r` copies a folder recursively. `cp` from a data set to a file can be done with data set-specific syntax of `//dsn`.
chtag	    | Changes TAG or can add, remove, or list the tag on a file which tells you and the computer what encoding (ex 1047, ascii) that a file is in.
chmod	    | Changes mode, changes the permission mode of a file or directory. Changes can be in octal digits or in `+/- rwx` format, such as `chmod g+r` filename to add group-level read permission to a file. Can be recursive over a directory with `-R`.
chown	    | Changes owner, changes the file or directory ownership, optionally including group ownership. Use as chown user:group filename.  Can be recursive over a directory with `-R`.
echo	    | Prints given text, or environment variables prefixed with `$`, to the screen (STDOUT) or to a file (with > or >>), or to another program (with |).
env	        | Prints all environment variables currently set and their values.
export	    | Sets an environment variable to a value. The value sets for the duration of the terminal connection. Can be used in a `.profile` file to set defaults for every session of that user.
fg	        | Restores a program in the background to the foreground.
find	    | Finds files that match a filename pattern given.
grep	    | Finds files that contain text that match the regular expression pattern given.
head	    | Prints the top of a file.
id: IDentity | Prints your user id and the groups you are in.
kill	    | sends a signal to one or more processes. misnamed; does not necessarily kill a process. By default, sends SIGTERM (graceful kill), and not SIGKILL (abrupt kill). You need sufficient SAF privilege to send signals to processes you do not own.
ls	        | Lists files and folders. `-l` to list in a row format with details. `-T` to include tags in the list, and -E to include extended permissions. `-a` to show hidden (. dot) files. `ls -alET` shows most useful output.
more	    | Content piped (|) to it can be scrolled through by pressing space. Useful for reading large output.
mv          | Moves or renames a file or folder.
mkdir	    | Makes a directory with default permissions, owned by you and your primary group.
mkdir -p	| Creates directories, including any necessary parent directories.
pwd	        | Prints the working directory. This shows the directory you are currently in. Similar to printing the value of `$PWD` environment variable.
ps	        | Lists running ProcesseS. by default, you can only see processes that you own.
rm	        | Removes a file. `-r` to remove a directory (recursive). `-f` to force (delete without prompting)
rmdir	    | Removes a directory.
sed	        | Stream editor can modify text passed through it. Can be used to read a file and alter its contents and write it back out
sh: Shell	| The default program you run when opening a Unix terminal. `/bin/sh` is the standard zOS shell, but there are alternatives such as ksh, csh, and bash. Each has different features and a scripting language.
ssh	        | Secure SHell. A protocol used with a Unix terminal to securely make a remote session. Unix equivalent to TN3270 connection. Preferred for Unix over OMVS when you want interactivity, color support, scrollback, and dynamic screen resizing.
tail	    | Shows the bottom of a file. `tail -f` can be used to continuously print the bottom of a file that is actively growing. Useful for monitoring a log file.
tee	        | Content piped (|) to it can be simultaneously printed to the screen (STDOUT) and to a file.
touch	    | Creates a file with default permissions, owned by you and your primary group.
tso	        | Can be used to issue non-administrative TSO commands
vi	        | A builtin editor for files. Has a learning curve, use ":q!" to exit if stuck.
|	        | Pipe, used to forward the output (STDOUT) data from one program as input (STDIN) to another program.
&&	        | Used to run multiple programs but only on the condition that the first succeeds (has a return code $? of 0)
;	        | Used to run multiple programs (or statements) regardless of return codes.
&	        | Used to run a program and run it in the background so that your terminal does not get stuck to just the output of that program.
&gt;	     | Used to write the output (STDOUT) of a program to a file. Erases the previous contents of the file.
&gt;&gt;       | Used to append the output (STDOUT) of a program to a file. Does not erase the previous contents, just adds lines at the end.




 
## How to access Unix content from z/OS: 

Select option 17 Udlist (Print or Display (to process) z/OS Unix directory list). And type a path for the directory in which to search.
In Unix, data is organized in the form of files and folders, where a folder can contain more folders. And it can also contain files, so it is little bit different from data sets.
There are many restrictions on what a file or folder name can contain and how long those names can be. One of the 1st things to watch out for in Unix because of the lack of limitations. Sometimes things can be long and can create an issue, if you are trying to access or view it on a TN 3270 screen. 
For example, if the path is very long it can go to the next row, which is problematic as you have to scroll on the screen.
You can access directories from TN 3270 screen. 
Unix files are tagged with different encoding. It can be EBCDIC, ASCII, binary and others. As opposed to data set files which have the data that tells you what the encoding is. 
819 is a number for ASCII. In this case (ISPF Editor), you need to go in the view mode and then select View ASCII to open the file. If you do not use View in ASCII mode, the contents of the file will not be visible.
