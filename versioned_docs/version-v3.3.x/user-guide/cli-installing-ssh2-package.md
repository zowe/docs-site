# Installing the ssh2 Package for Zowe CLI

This topic describes how to install the prerequisites to enable optional security features in the ssh2 package.  

The Zowe CLI has a dependency on the ssh2 package. This package allows for more secure cryptographic ciphers to be used on supporting hardware. To do this, the ssh2 package attempts to build native modules at install time. If the modules cannot be built, the dependency will continue to function without the optimal cipher list order. However, you may receive some error messages that can be safely ignored.

To load the optimal cipher list and build the native modules, verify that you meet the following prerequisites:

## Windows

Recommended:

- NodeJS
- Chocolatey
- [CMake](https://cmake.org/download/)

Alternative:

- Python 3.7 or greater
- [CMake](https://cmake.org/download/)
- One of the following:
  - Visual Studio Build Tools, "Visual C++ build tools" workload
  - Visual Studio Community, "Desktop development with C++" workload

## Unix

- Python 3.7 or greater
- [CMake](https://cmake.org/download/)
- `make`
- A C/C++ Compiler (`gcc-c++` or `g++`, for example)

## MacOS

- Python 3.7 or greater
- [CMake](https://cmake.org/download/)
- XCode, including `XCode Command Line Tools`
