# Installing the ssh2 Package for Zowe CLI <!-- omit in toc -->
​
This topic describes how to install the pre-requisites to enable optional features in the ssh2 package.  

The Zowe CLI has a dependency on the ssh2 package. This package allows for more secure cryptographic ciphers to be used first on supporting hardware. In order to do this, the dependency attempts to build some native modules at install time.

If these modules cannot be built, the dependency will continue to function, without the optimal cipher list order. However, some error messaging may be visible. These errors can be safely ignored, if desired.

To consume the optimal cipher list and build the native modules, verify that you meet the following pre-requisites:

## Windows
We recommend NodeJS be installed with Chocolatey, which includes most of the required tooling. An additional tool, [CMake](https://cmake.org/download/), will need to be installed in addition to Chocolatey.

Alternatively, install the following:

- Python 3.7 or greater
- [CMake](https://cmake.org/download/)
- Choose one of the following:
  - Visual Studio Build Tools
    - "Visual C++ build tools" workload
  - Visual Studio Community
    - "Desktop development with C++" workload

## Unix
- Python 3.7 or greater
- [CMake](https://cmake.org/download/)
- `make`
- A C/C++ Compiler (i.e. `gcc-c++`, `g++`)

## MacOS
- Python 3.7 or greater
- [CMake](https://cmake.org/download/)
- XCode
  - Including `XCode Command Line Tools`
