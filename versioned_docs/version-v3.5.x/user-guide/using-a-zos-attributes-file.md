# Using a z/OS attributes file

Use a `.zosattributes` file to control how files are converted and tagged when you upload a local directory to a USS directory on the mainframe.

## What is a `.zosattributes` file

A `.zosattributes` file saved in your source directory provides uploading and downloading instructions to the mainframe. A line in the file can specify a code comment or instructions.

An example `.zosattributes` file:

```json
// highlight-start
# pattern local-encoding remote-encoding
# Don't upload the node_modules directory
// highlight-end
node_modules -
// highlight-start
# Don't upload files that start with periods
// highlight-end
.* -
// highlight-start
# Upload jpg images in binary
// highlight-end
*.jpg binary binary
// highlight-start
# Convert CICS Node.js profiles to EBCDIC
// highlight-end
*.profile ISO8859-1 EBCDIC
```
- `#`
    - Denotes a comment when used at the start of a line. In the preceding example, comments are highlighted.

- Each line can specify up to three positional attributes, or instructions:

    - A pattern to match a set of files.
        - Pattern-matching syntax follows the same rules as those that apply in `.gitignore` files. Negated patterns that begin with `!` are not supported.
        - For syntax, see [Pattern Format]( https://git-scm.com/docs/gitignore#_pattern_format).
    - A local-encoding to identify a file’s encoding on the local workstation.
        - When `-` is specified for local-encoding, files that match the pattern are not transferred.
    - A remote-encoding to specify the file’s desired character set on USS.
        - This attribute must either match the local encoding or be set to `EBCDIC`. If set to `EBCDIC`, files are transferred in text mode and converted, otherwise they are transferred in binary mode.
        - Remote files are tagged either with the remote encoding or as binary.

## Using a `.zosattributes` file with Zowe CLI

Use a `.zosattributes` file with Zowe CLI to issue commands to control how the mainframe uploads your local files. 

### `.zosattributes` file location

A `.zosattributes` file can be saved in the top-level directory you want to upload.

Or specify its location by using the `--attributes` option with the `zowe zos-files upload dir-to-uss` command:

```
zowe zos-files upload dir-to-uss "local_dir" "/a/ibmuser/my_dir" --attributes my_global_attributes
```

`.zosattributes` files that are placed in nested directories are ignored.

## Using a `.zosattributes` file with Zowe Explorer for VS Code

In Zowe Explorer for Visual Studio Code, first upload a `.zosattributes` file to a USS directory on the mainframe and then upload files to that directory. 

## Creating a `.zosattributes` file

Use a text editor to create a `.zosattributes` file to instruct Zowe what local files to upload and how to convert and tag them.

For pattern-matching syntax, follow the [Pattern Format]( https://git-scm.com/docs/gitignore#_pattern_format). For how to write the local encoding and remote encoding instructions, see [What is a `.zosattributes` file](#what-is-a-zosattributes-file).
