# Using Conda to make and manage packages of Application Framework Plugins

As Zowe is composed of components which can be extended by Plugins, 
a standardized and simple way to find, install, upgrade, and list Plugins in your Zowe environment
is important to make it easy to get the most out of Zowe.

Package management as a concept generally provides a way to find packages such as plugins,
check and possible co-install dependencies the package has, and ultimately install the desired package.
Post-install, management tasks such as upgrading and uninstalling are common.

Conda is one such package manager, and if you are familiar with apt, yum, or npm, you will find
that using Conda is very similar. But, there are some important abilities that make Conda stand out:

* Very cross platform: Conda is available, and acts very similar on z/OS, Windows, Linux, macOS, and various Unix.
                       Packages can state which platforms they support, so it easy to know what packages you can install.
* Tagging: On z/OS, Conda packages can contain tagging information, to avoid issues around the difference between EBCDIC & ASCII.
* Software neutrality: Language-specific package managers are becoming popular, but Conda does not assume the purpose of the package, so you can install almost anything.
* Environments: If desired, every user can have a different set of packages, because Conda can install & manage packages in personal folders instead of system ones.
                A user can even have multiple such environments, and switch between them rapidly to work with different sets of related software without conflict.


## Initial Conda setup

If you have not installed Conda yet, it can be downloaded as an all-in-one package that has no extra dependencies, known as "miniconda".
For Linux, Unix, macOS, and Windows, this can be downloaded at https://docs.conda.io/en/latest/miniconda.html
For z/OS, Conda can be downloaded from Rocket Software at https://www.rocketsoftware.com/zos-open-source

Conda will prompt during the install for certain setup options, 
and ultimately you'll want to put some Conda initialization content into your startup script
so that whenever you open your terminal, Conda will be ready for your use.

Once you have Conda downloaded and installed, you'll want to create your first Conda "environment"
this can be done by providing a path or a nickname

`conda create --prefix PATH`
`conda create --name ENVIRONMENT`

Either will work, but path helps you better separate your content from content others use by placing it in a folder that you can have stricter permissions on.

If you need to know more about certain commands, you can use the help command for any.

`conda create --help`

Or, check the official documentation: https://docs.conda.io/en/latest/index.html

Once you have an environment, you should activate it so that the actions you do are on that environment, as opposed to the base one.

`conda activate PATH_OR_NAME`

Conda will detect whether the parameter is a path or a nickname, so this command works for both.

Finally, you can view the Conda environment and other information by checking "info"

`conda info`

## Managing Conda channels

When downloading a package, such as a Zowe Plugin, the place that you download from is configurable.
These are called "Channels", but are very similar to "Repositories" seen in other package managers.
With Conda, you can install from:

* A network channel (Internet or company internal)
* A local channel (Collection of plugins on your computer)
* Just an individual package, without a channel

You can have multiple of each, and if a package is present in more than one location, you can specify which one to use.

## Searching for packages

Conda has a search utility that searches for all Channels,

`conda search anything_you_want`

but it's important to note that because any type of software can be installed through Conda, you probably want to search through a detailed view to help identify which ones are meant for Zowe, or use Channels that are distinctly for Zowe so that you can get packages that are strictly for Zowe.

`conda search --info anything_you_want`

## Using Conda with Zowe

Zowe is not yet available in the form of Conda packages yet, so it must be installed separately.
If you have Zowe installed on the same system as Conda, some Zowe Plugins installed through Conda will automatically register into Zowe.
In order to do this, the Plugins must be able to find Zowe. You should set environment variables before trying to install the Plugins:

### Setting environment variables temporarily:

z/OS, Linux, Unix:
```
export ZOWE_INSTANCE_DIR=/path/to/zowe/instance
export ZOWE_ROOT_DIR=/path/to/zowe/installation
```

Windows cmd.exe:
```
set ZOWE_INSTANCE_DIR=\path\to\zowe\instance
set ZOWE_ROOT_DIR=\path\to\zowe\installation
```

`INSTANCE_DIR` and `ROOT_DIR` are also supported, but the `ZOWE_` prefix helps distinguish its purpose.

### Setting environment variables persistently

z/OS, Linux, Unix:
You can put the `export` statements into the `.profile` file in your home directory to have them apply on login.

Windows:
There is a UI to set variables, but it varies depending on Windows version.
Try typing 'environment variable' into the Windows search bar to get to the relevant menu.

### Installing a Zowe plugin

A Conda package could contain one or more Zowe Plugins, and a Conda package could contain non-Zowe code alongside Zowe Plugins.
This is left up to the program vendor and regardless the install process is the same:

`conda install package_name`

If the Zowe environment variables are set, such a package may automatically register Plugins into the Zowe instance of your choice.

### Zowe plugin configuration

Aside from possible automation during install and uninstall, Conda does not manage Zowe, its configuration, or configuration of the Plugins.
However, Conda does manage the package files, and therefore you can do additional Zowe tasks on the Plugins by going into the Conda environment.
Zowe Plugins are intended to be found in a standardized location in the Conda environment,

`/opt/zowe/plugins`

This folder contains Plugins, which in turn contain sub-folders that are the Zowe components that they utilize.
If a plugin uses multiple Zowe components, its contents could be found within multiple component folders.

`/opt/zowe/plugins/my_plugin/app-server`
`/opt/zowe/plugins/my_plugin/cli`

### Zowe package structure

Zowe Plugins packaged into Conda follow the structure outlined here: https://github.com/zowe/zowe-install-packaging/issues/1569
This structure allows for plugin to have content meant for one or more Zowe components.
The Conda packages extend this by allowing for more than one Plugin, or a mix of Zowe Plugins and other software to be within a single package.

## Building Conda packages for Zowe

This document is intended to be provided with example scripts by the Zowe community, which shows you how you can build a simple Zowe plugin into a Conda package.
You can find the example scripts on the [Zowe zlux-build github repository.](https://github.com/zowe/zlux-build/tree/master/conda)
This is not intended to be a one-size-fits-all set of scripts. If you have more advanced needs, you can use these scripts as a basis for writing your own scripts.

To make a Conda package, you need conda-build, which you can install into a Conda environment:

`conda install conda-build`

Once you have it, you can build a package via

`conda build path/to/build/scripts`

However, first you must set up the build information.

### Defining package properties

Conda needs a metadata file, `meta.yaml` to state information about the package, such as dependencies, what OS it supports, its name and version.
This information can be programmatically found, and Zowe provides examples of how to do this by reading Zowe's own metadata files into this one.

### Creating build step

It's recommended not to build your code from scratch to put into Conda.
Rather, build your code however you want, and then just copy the contents into a Conda package. This keeps the Conda scripting small and simple.

In the same folder as `meta.yaml`, Conda requires `build.sh` for building on Unix, Linux, or z/OS and `build.bat` for Windows.
Except for z/OS, this script does not determine where your package can be used, it's just about where you are building it.
z/OS is the exception because when you build on z/OS, unix file tagging information is preserved. 
So, it's highly recommended that you tag your files so that users do not have to deal with encoding issues.
For code that works equally well on all platforms, a simple way to build for all is:
1. Build your code on Linux
1. Transfer the output to z/OS
1. Run a Conda build on the output on Linux
1. Run a Conda build on the output on z/OS
1. Deliver the Linux package as 'noarch' content, and the z/OS package as 'zos-z' content.

### Lifecycle scripts

When a Conda package is installed or uninstalled, a script from the package can be run.
For Zowe, the scripts `post-link.sh` and `pre-unlink.sh` can be important, and you must put them into the same folder as `meta.yaml` for building.

#### Install automation

`post-link.sh` runs at install, after Conda has put the package content onto the system. 
At this time, registration into Zowe is recommended if the Plugin does not require any information from the user for configuration.
If the Plugin is okay to be automatically installed, we recommend putting a script into the package folder named `autoinstall.sh`
Zowe's provided Conda examples will utilize `autoinstall.sh` to do any install steps your package needs, and provides Zowe information to make install simple.
However, it's possible to do what you want in your own `post-link.sh` script instead.

#### Uninstall automation

`pre-unlink.sh` is the opposite of `post-link.sh`. It allows you to do anything you need to before the package is removed from the system.
This is a good time to remove any package information from Zowe, but you should be careful because users may uninstall and later re-install,
so you should not remove configuration information without consent.

### Adding configuration to Conda packages

As a package manager, Conda is not responsible for configuration. Your packages can include defaults to utilize, 
but if configuration is needed you should alert the user to perform a post-install task. `post-link.sh` could be used to print such an alert.
