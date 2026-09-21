# Bill of Materials

Zowe&trade; uses the SPDX SBOM format to represent its bill of materials. To read more about why SBOMs and SPDX are used, see [this blog](https://www.linuxfoundation.org/blog/spdx-its-already-in-use-for-global-software-bill-of-materials-sbom-and-supply-chain-security/). The hash codes can be used to validate your download is authentic using a command like `openssl dgst -sha1 <downloaded_sbom.zip>`. Zowe SBOMs are as follows:

| Type | Component | SBOM Link | SHA-1 Hash |
| --- | --- | --- | --- |
| Artifact SBOM | Zowe z/OS Components (PAX, SMP/E, PSWI) | [SBOM Link](https://zowe.jfrog.io/zowe/list/libs-release-local/org/zowe/sbom/2.0.0/zowe_pax_sbom.zip) | 3ed80afaadfdabe1112c7063fe297d5f | 
| Artifact SBOM | Zowe CLI Standalone Package | [SBOM Link](https://zowe.jfrog.io/zowe/list/libs-release-local/org/zowe/sbom/2.0.0/zowe_cli_standalone_sbom.zip) | 98b75ca32cc08664574da1886d28c625463cceba |
| Artifact SBOM | Zowe CLI Standalone Plugins Package | [SBOM Link](https://zowe.jfrog.io/zowe/list/libs-release-local/org/zowe/sbom/2.0.0/zowe_cli_standalone_plugins_sbom.zip) | 7d1e06e579b4dcc69c44405a47dfebc386426b0f | 
| Artifact SBOM | Zowe Client NodeJS SDK | [SBOM Link](https://zowe.jfrog.io/zowe/list/libs-release-local/org/zowe/sbom/2.0.0/zowe_client_node_sdk_sbom.zip) | c61bd6b9f78ba2aa67a0f4e53874a097992d8155 | 
| Artifact SBOM | Zowe Client Python SDK | [SBOM Link](https://zowe.jfrog.io/zowe/list/libs-release-local/org/zowe/sbom/2.0.0/zowe_client_python_sdk_sbom.zip) | 637c5f90f94a88cb534bead7755fac112b509217 | 
| Source Code SBOM | All Zowe's Source Repositories used in final artifacts | [SBOM Link](https://zowe.jfrog.io/zowe/list/libs-release-local/org/zowe/sbom/2.0.0/zowe_sources_sbom.zip) | 19d2b81b0fa2955d165123871c72c2c77ddf73b7 | 
