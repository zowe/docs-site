# Editing team configurations

After you [initialize team configuration](../user-guide/cli-using-initializing-team-configuration), the newly created team profiles need additional details before they can be shared and applied in your environment. This could include information such as a port number or user credentials.

You might also need to modify the configuration file to [create new profiles](../user-guide/cli-using-creating-profiles.md) for accessing mainframe services.

## Adding, modifying team profiles

To define additional mainframe services and other profiles in an existing global team configuration file:

1. Open the `~/.zowe/zowe.config.json` file in a text editor or an IDE (such as Visual Studio Code) on your computer.

2. Edit the file by adding to or modifying the profiles listed in the profiles object.

    Each profile contains connection and other frequently needed information for accessing various mainframe services, as in the following example:

    ```
    {
        "$schema": "./zowe.schema.json",
        "profiles": {
            "zosmf": {
                "type": "zosmf",
                "properties": {
                    "port": 443
                }
            },
            "global_base": {
                "type": "base",
                "properties": {
                    "host": "example.com"
                },
                "secure": [
                    "user",
                    "password"
                ]
            }
        },
        "defaults": {
            "zosmf": "zosmf",
            "base": "global_base"
        },
    }
    ```

## Available service profile types

A profile contains all, or most, of the information you need to connect to a specific mainframe service. Your configuration can have multiple profiles, and these can consist of different profile *types* and even different *kinds* of a particular profile type, depending on the connection information.

There are three basic profile types:

- service profiles
- base profiles
- parent profiles

You can learn more about how service, base, and parent profiles work in [Zowe CLI profile types](../user-guide/cli-using-using-team-profiles.md#zowe-cli-profile-types).

### Core z/OS service profiles

The three z/OS services that Zowe CLI and Zowe Explorer profiles connect to:

- **z/OSMF** profiles connect with the IBM z/OS Management Facility service.
- **TSO** profiles connect with the Time Sharing Option service.
- **SSH** profiles connect with the Secure Shell service.

### Zowe CLI plug-in service profiles

Other kinds of *service profiles* can be used to configure connections for Zowe CLI plug-ins. A *base profile*, on the other hand, contains connection data that can be shared across multiple service profiles.

To determine the types of plug-in service profiles that can be used in Zowe CLI configuration, refer to the tables on this page or check the Zowe CLI plug-in command groups listed in the [Zowe web help](https://docs.zowe.org/stable/web_help/index.html). Most group names match the plug-in profile name.

## Profile properties

Every profile in a configuration file includes specific information, such as properties and their values, to communicate with its respective mainframe service. The values for properties are defined by your specific connection information.

The available properties for z/OS services and Zowe-conformant plug-ins profiles are listed in the following tables:

### base

| Property | Description | Allowed |
| --- | --- | --- |
| host | Host name of service on the mainframe. | string |
| port | Port number of service on the mainframe. | number |
| user | User name to authenticate to service on the mainframe. | string |
| password | Password to authenticate to service on the mainframe. | string |
| rejectUnauthorized | Reject self-signed certificates.<br/><br/>**Default**: ```true``` | **boolean**:<br/> ```true```<br/>```false``` |
| tokenType | The type of token to get and use for the API. Omit this option to use the default token type, which is provided by `zowe auth login`. | string |
| tokenValue | The value of the token to pass to the API. | string |
| certFile | The file path to a certificate file to use for authentication. <br/>  <br/> Note: <br/> The CLI does not support certificate files that require a password. For more information, see [PEM certificate files](../troubleshoot/cli/troubleshoot-cli-credentials.md#pem-certificate-files). | string |
| certKeyFile | The file path to a certificate key file to use for authentication | string |

### ca7

| Property | Description | Allowed |
| --- | --- | --- |
| host | Host name of the CA7 API service that is running on the mainframe system. | string |
| port | Port for the CA7 API service that is running on the mainframe system. | number |
| user | User name for authenticating connections to the CA7 API service that is running on the mainframe system. | string |
| password | Password for authenticating connections to the CA7 API service that is running on the mainframe system. | string |
| basePath | The base path for your API Mediation Layer instance. Specify this option to prepend the base path to all resources when making REST requests. Do not specify this option if you are not using an API Mediation Layer. | string |
| protocol | Specifies protocol to use for CA7 connection. | **string**:<br/> ```http```<br/>```https``` |
| rejectUnauthorized | Reject self-signed certificates.<br/><br/>**Default**: ```true``` | **boolean**:<br/> ```true```<br/>```false``` |

### cics

| Property | Description | Allowed |
| --- | --- | --- |
| host | The CMCI server host name | string |
| port | The CMCI server port<br/><br/>**Default**: ```1490``` | number |
| user | Your username to connect to CICS | string |
| password | Your password to connect to CICS | string |
| regionName | The name of the CICS region name to interact with | string |
| cicsPlex | The name of the CICSPlex to interact with | string |
| rejectUnauthorized | Reject self-signed certificates.<br/><br/>**Default**: ```true``` | **boolean**:<br/> ```true```<br/>```false``` |
| protocol | Specifies CMCI protocol.<br/><br/>**Default**: ```https``` | **string**:<br/> ```http```<br/>```https``` |

### db2

| Property | Description | Allowed |
| --- | --- | --- |
| host | The Db2 server host name | string |
| port | The Db2 server port number | number |
| user | The Db2 user ID (may be the same as the TSO login) | string |
| password | The Db2 password (may be the same as the TSO password) | string |
| database | The name of the database | string |
| sslFile | Path to the root CA Certificate file | string |

### dbm-db2

| Property | Description | Allowed |
| --- | --- | --- |
| host | Specifies the DBM Data Service REST API server host name or TCP/IP address to use. | string |
| port | Specifies the DBM Data Service REST API server TCP/IP port number.<br/><br/>**Default**: ```7300``` | number |
| user | Specifies the mainframe user name that you want to use to connect to the mainframe systems during execution of the Zowe CLI commands. This user name can be the same as your TSO login ID. | string |
| password | Specifies the mainframe password for the user name that is used to connect to the mainframe systems during execution of the CLI commands. This password can be the same as your TSO password. | string |
| protocol | Specifies the communication protocol between zowe dbm-db2 client and DBM Data Service.<br/><br/>**Default**: ```https``` | **string**:<br/> ```http```<br/>```https``` |
| rejectUnauthorized | Determines whether the dbm-db2 command is accepted or rejected when a self-signed certificate is returned by the DBM Data Service.<br/><br/>**Default**: ```true``` | **boolean**:<br/> ```true```<br/>```false``` |
| environmentList | Specifies a string of one or more entries consisting of a Db2 subsystem ID and a DBM Data Service REST API server host name or TCP/IP address. Use a comma to separate entries. The same Db2 subsystem can be used in multiple DBM Data Service environments. For more information about configuring the DBM Data Service, see the [Database Management Solutions for Db2 for z/OS documentation](https://techdocs.broadcom.com/db2mgmt).<br/><br/><details><summary>**Default**:</summary><br/>\{<br/>&nbsp;&nbsp;&nbsp;&nbsp;"ssid1": "env1@host1:port1",<br/>&nbsp;&nbsp;&nbsp;&nbsp;"ssid2": "env2@host2:port2"<br/>\}</details> | object |
| jobCards | Specifies a string array of z/OS JCL JOB statements.<br/><br/><details><summary>**Default**:</summary><br/>//DB2DVOPS JOB CLASS=A,<br/>//&nbsp;&nbsp;&nbsp;&nbsp; MSGCLASS=X</details> | array |
| workDatasetPrefix | Specifies the prefix (high-level qualifier) in z/OS work data set names.<br/><br/>**Default**: ```${user}.dbmdb2``` | string |
| deleteWorkDatasets | Specifies whether to delete work data sets on a mainframe after the request is fulfilled.<br/><br/>**Default**: ```true``` | **boolean**:<br/> ```true```<br/>```false``` |
| overwriteOutputFiles | Specifies whether to overwrite output files if they exist.<br/><br/>**Default**: ```false``` | **boolean**:<br/> ```true```<br/>```false``` |
| authid | Specifies the primary Db2 authorization ID that is used to establish a connection between Db2 and a process.<br/><br/>**Default**: ```${user}``` | string |
| sqlid | Specifies the authorization ID that is used in generated SET CURRENT SQLID statements.<br/><br/>**Default**: ```${user}``` | string |
| terminationCharacter | Specifies the SQL termination character to use in DDL generation when the default termination character conflicts with the SQL statements that are used in triggers, XML indexes, and routines (external SQL functions and native SQL stored procedures). The default termination character is a semi-colon (;). You cannot specify a comma, double quote, single quote, left or right parentheses, or an underscore.<br/><br/>**Default**: ```;``` | string |
| basePath | The base path for your API Mediation Layer instance. Specify this option to prepend the base path to all DBM DS resources when making REST requests. Do not specify this option if you are not using an API Mediation Layer. | string |

### dbm-db2-options

| Property | Description | Allowed |
| --- | --- | --- |
| authid | Specifies the primary Db2 authorization ID that is used to establish a connection between Db2 and a process. | string |
| changeSet | Specifies the creator and name of an existing RC/Migrator global change set that changes Db2 objects during a command execution. <br/>  <br/> Format: <br/> &lt;change-set-creator.change-set-name&gt;  <br/>  <br/> For more information about global change services, see the [RC/Migrator documentation](https://techdocs.broadcom.com/db2rcmig). <br/>  <br/> Note: <br/> If change-set and change-set-file are both specified, specifications in change-set-file take precedence.  | string |
| changeSetValues | Specifies the global change specifications that modify Db2 object attributes during a command execution. <br/>  <br/> Format: <br/> &lt;object-attribute&gt; &lt;from-value&gt; &lt;to-value&gt; <br/> &nbsp;&nbsp; <br/> The &lt;object-attribute&gt; consists of four characters. The first two characters identify the object type. The last two characters identify the specific attribute. Wildcard characters are supported in &lt;from-value&gt; and &lt;to-value&gt;. If the same &lt;object-attribute&gt; is specified multiple times, the first occurrence takes precedence. <br/> &nbsp;  <br/> For a full list of attributes, see Global Change Set Attributes in the [RC/Migrator documentation](https://techdocs.broadcom.com/db2rcmig). <br/>  <br/> Example: <br/> The following example demonstrates changes to the table schema (creator) and tablespace names: <br/> &nbsp;&nbsp;  <br/> TBCR TEST% PROD% <br/> TBTS TESTTS% PRODTS% <br/>  <br/> Note: <br/> - If change-set and change-set-file are both specified, specifications in change-set-file take precedence. <br/> - The changeSetValues options-profile option has the same behavior as the change-set-file command option. <br/><br/><details><summary>**Default**:</summary><br/>-- DDL changes for a table with dependent objects.<br/>-- Note: Replace CHANGEME with your database name.<br/>ALDB * CHANGEME<br/>ALCR * \$\{user\}<br/>TBTC * \$\{user\}<br/>IXTC * \$\{user\}<br/>VWTC * \$\{user\}<br/>VWFS * \$\{user\}<br/>SYTC * \$\{user\}<br/>ASTC * \$\{user\}<br/>TGSC * \$\{user\}<br/>TGOW * \$\{user\}<br/>TGTC * \$\{user\}<br/>TGTO * \$\{user\}<br/>TGQU * \$\{user\}<br/>TGFS * \$\{user\}<br/>TGQS * \$\{user\}<br/>SQSC * \$\{user\}<br/>RTSC * \$\{user\}<br/>RTPO * \$\{user\}<br/>RTQU * \$\{user\}</details> | array |
| deleteWorkDatasets | Specifies whether to delete work data sets on a mainframe after the request is fulfilled. | **boolean**:<br/> ```true```<br/>```false``` |
| description | Specifies a 1- to 25-character description for the RC/Migrator compare strategy. | string |
| id | Specifies the 1- to 8-character name of the RC/Migrator compare strategy that is created on the target Db2 subsystem during a command execution. <br/>  <br/> Format: <br/> The name must begin with a non-numeric character and contain the following characters only: uppercase letters from A to Z, numbers from 0 to 9, and special characters \$, #, and @.  | string |
| jobCards | Specifies a string array of z/OS JCL JOB statements. | array |
| matchSet | Specifies the creator and name of an existing RC/Migrator automapping mask set. Matching is used to pair objects in a DDL file to objects that are defined on a Db2 subsystem. Matching determines whether the `change-set` or `rule-set` options are applied. <br/>  <br/> Format: <br/> &lt;match-set-creator.match-set-name&gt; <br/>  <br/> For more information about mask services, see the [RC/Migrator documentation](https://techdocs.broadcom.com/db2rcmig). <br/>  <br/> Note: <br/> If `--match-set` and `--match-set-file` are both specified, specifications in match-set-file take precedence.  | string |
| matchSetValues | Specifies the mapping mask specifications. Matching is used to pair objects in a DDL file to objects that are defined on a Db2 subsystem. For example, a mask specification can account for different schema naming patterns across environments. Matching determines whether the `change-set` or `rule-set` options are applied. <br/>  <br/> Format: <br/> &lt;object-type&gt; &lt;source-name-mask&gt; &lt;target-name-mask&gt;; <br/>  <br/> STOGROUP &lt;name&gt; &lt;name&gt; <br/> DATABASE &lt;name&gt; &lt;name&gt; <br/> TABLESPACE &lt;database.name&gt; &lt;database.name&gt; <br/> TABLE &lt;schema.name&gt; &lt;schema.name&gt; <br/> INDEX &lt;schema.name&gt; &lt;schema.name&gt; <br/> VIEW &lt;schema.name&gt; &lt;schema.name&gt; <br/> SYNONYM &lt;schema.name&gt; &lt;schema.name&gt; <br/> ALIAS &lt;schema.name&gt; &lt;schema.name&gt; <br/> TRIGGER &lt;schema.name&gt; &lt;schema.name&gt; <br/> SEQUENCE &lt;schema.name&gt; &lt;schema.name&gt; <br/> FUNCTION &lt;schema.name[.version]&gt; &lt;schema.name[.version]&gt; <br/> PROCEDURE &lt;schema.name[.version]&gt; &lt;schema.name[.version]&gt; <br/>  <br/> Note: <br/> - &lt;name&gt; must be between 1 and 128 characters. For DATABASE and TABLESPACE, &lt;name&gt; must be between 1 and 8 characters. <br/> - &lt;schema&gt; must be between 1 and 128 characters. <br/> - &lt;version&gt; must be between 1 and 64 characters. <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <br/> A mask specification can include the following wildcard characters: <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <br/> Percent sign (%) indicates that zero or more characters can occupy that position and all remaining positions to the end of the name, or to the next character. The percent sign can be used anywhere in the name. However, the source and target characters must match exactly. <br/>   <br/> Hyphen or dash (-) indicates that any character can occupy that position, but a character must exist at that position, and the source and target character must match exactly. The hyphen can be repeated in several places in the name. <br/>   <br/> Asterisk (*) indicates matching values. An asterisk cannot be used with other characters. <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <br/> Use a semicolon to separate mask specifications. Multiple mask specifications for the same object type are supported. <br/>  <br/> Example: <br/> The following example demonstrates different ways of matching the table MYNAME.MYTABLE to the table YOURNAME.YOURTABLE: <br/>   <br/> TABLE MY%.%TABLE YOUR%.%TABLE;  <br/> TABLE MYN-M-.MYT% YOURN-M-.YOURT%; <br/> TABLE MYNAME.MYTABLE YOURNAME.YOURTABLE;  <br/> TABLE *.MYTABLE *.YOURTABLE; <br/>  <br/> For a list of mask specifications, see the [RC/Migrator documentation](https://techdocs.broadcom.com/db2rcmig). <br/>  <br/> Note: <br/> - If `--match-set` and `--match-set-file` are both specified, specifications in match-set-file take precedence. <br/> - The matchSetValues options-profile option has the same behavior as the match-set-file command option.  | array |
| modification | Specifies a named set of server-managed default parameter values that control the execution behavior of the zowe dbm-db2 commands. For example, you can use a modification to identify a set of default values that differ from the current set of default values. <br/> &nbsp;  <br/>  For more information about using the modification option, see the [DBM Data Service documentation](https://techdocs.broadcom.com/db2mgmt).  | string |
| overwriteOutputFiles | Specifies whether to overwrite output files if they exist. | **boolean**:<br/> ```true```<br/>```false``` |
| ruleSet | Specifies the creator and name of an existing RC/Migrator rule set that overrides Db2 object attributes in the target Db2 subsystem with the corresponding values from the input DDL file. The changes only apply to existing objects, as determined by match-set processing. <br/>  <br/> Format: <br/> &lt;rule-set-creator.rule-set-name&gt; <br/> &nbsp;&nbsp;&nbsp;&nbsp;  <br/> For more information about rule database services, see the [RC/Migrator documentation](https://techdocs.broadcom.com/db2rcmig).  | string |
| sqlid | Specifies the authorization ID that is used in generated SET CURRENT SQLID statements. | string |
| sourceDb2 | Specifies the source Db2 subsystem or data sharing group where the objects that you want to use in a command are located. <br/>  <br/> Note: <br/> If you specify the data sharing group, the first active Db2 subsystem in the group is used.  | string |
| targetDb2 | Specifies the target Db2 subsystem or data sharing group where you want to use a command. <br/>  <br/> Note: <br/> If you specify the data sharing group, the first active Db2 subsystem in the group is used.  | string |
| terminationCharacter | Specifies the SQL termination character to use in DDL generation when the default termination character conflicts with the SQL statements that are used in triggers, XML indexes, and routines (external SQL functions and native SQL stored procedures). The default termination character is a semi-colon (;). You cannot specify a comma, double quote, single quote, left or right parentheses, or an underscore. | string |
| type | Specifies the type of DDL statements that you want to generate. You can generate CREATE or DROP statements. | **string**:<br/> ```drop```<br/>```create``` |
| verify | Specifies whether to verify that the objects to be created do not exist on the Db2 subsystem and that the related objects that are required for successful creation of the objects exist on the Db2 subsystem or in the input DDL. <br/><br/>**Default**: ```no``` | **string**:<br/> ```yes```<br/>```no``` |
| workDatasetPrefix | Specifies the prefix (high-level qualifier) in z/OS work data set names. | string |

### endevor

| Property | Description | Allowed |
| --- | --- | --- |
| host | The hostname of the endevor session | string |
| port | The port number of the endevor session | number |
| user | The username of the endevor session | string |
| password | The password of the user | string |
| protocol | The protocol used for connecting to Endevor Rest API<br/><br/>**Default**: ```https``` | **string**:<br/> ```http```<br/>```https``` |
| basePath | The base path used for connecting to Endevor Rest API<br/><br/>**Default**: ```EndevorService/api/v2``` | string |
| rejectUnauthorized | If set, the server certificate is verified against the list of supplied CAs | **boolean**:<br/> ```true```<br/>```false``` |
| reportDir | The default path where any reports will be written to, either absolute or relative to current directory<br/><br/>**Default**: ```.``` | string |

### endevor-location

| Property | Description | Allowed |
| --- | --- | --- |
| instance | The STC/datasource of the session<br/><br/>**Default**: ```ENDEVOR``` | string |
| environment | The Endevor environment where your project resides<br/><br/>**Default**: ```DEV``` | string |
| system | The Endevor system where the element resides | string |
| subsystem | The Endevor subsystem where your element resides | string |
| type | Name of the Endevor element's type | string |
| stageNumber | The Endevor stage where your project resides | **string**:<br/> ```1```<br/>```2``` |
| comment | The Endevor comment you want to use when performing an action | string |
| ccid | The Endevor CCID you want to use when performing an action | string |
| maxrc | The return code of Endevor that defines a failed action<br/><br/>**Default**: ```8``` | number |
| override-signout | Always override element signout, without having to specify the override signout option on each command<br/><br/>**Default**: ```false``` | **boolean**:<br/> ```true```<br/>```false``` |
| file-extension | The strategy for deciding what file extension to use during a bulk retrieve or workspace synchronization. Must be one of the following: <br/>  <br/> none: <br/> File name is equal to element name, no extension is added. <br/>  <br/> file-ext: <br/> The file extension defined in the Type definition is used; If not defined, no extension is added. <br/>  <br/> type-name: <br/> The type name is used as the file extension. <br/>  <br/> mixed: <br/> The file extension defined in Type definition is used; If not defined, the type name is used instead.<br/><br/>**Default**: ```mixed``` | **string**:<br/> ```none```<br/>```type-name```<br/>```file-ext```<br/>```mixed``` |

### ims

| Property | Description | Allowed |
| --- | --- | --- |
| host | The IMS Operations API server host name. | string |
| port | The IMS Operations API server port. | number |
| imsConnectHost | The hostname of your instance of IMS Connect. This is typically the hostname of the mainframe LPAR where IMS Connect is running. | string |
| imsConnectPort | The port of your instance of IMS Connect. This port can be found in your IMS Connect configuration file on the mainframe. | number |
| plex | The name of the IMS plex. | string |
| user | The web server user name where the IMS Operations API resides. | string |
| password | The web server user password where the IMS Operations API resides. | string |
| basePath | The base path for your API Mediation Layer instance. Specify this option to prepend the base path to all z/OSMF resources when making REST requests. Do not specify this option if you are not using an API Mediation Layer. | string |
| protocol | Specifies protocol.<br/><br/>**Default**: ```https``` | **string**:<br/> ```http```<br/>```https``` |
| rejectUnauthorized | Reject self-signed certificates.<br/><br/>**Default**: ```true``` | **boolean**:<br/> ```true```<br/>```false``` |

### jclcheck

| Property | Description | Allowed |
| --- | --- | --- |
| host | Host name of the JCLCheck API service that is running on the mainframe system. | string |
| port | Port for the JCLCheck API service that is running on the mainframe system.<br/><br/>**Default**: ```12697``` | number |
| user | User name for authenticating connections to the JCLCheck API service that is running on the mainframe system. | string |
| password | Password for authenticating connections to the JCLCheck API service that is running on the mainframe system. | string |
| basePath | The base path for your API Mediation Layer instance. Specify this option to prepend the base path to all resources when making REST requests. Do not specify this option if you are not using an API Mediation Layer.<br/><br/>**Default**: ```cajclcheck/api/v1``` | string |
| rejectUnauthorized | Reject self-signed certificates.<br/><br/>**Default**: ```true``` | **boolean**:<br/> ```true```<br/>```false``` |
| protocol | Specifies protocol to use for JCLCheck connection.<br/><br/>**Default**: ```https``` | **string**:<br/> ```http```<br/>```https``` |
| jclcheckOptions | The desired set of JCLCheck runtime options. Specify the options exactly as you would on the PARM= or OPTIONS DD on a batch run of JCLCheck. See the JCLCheck runtime options documentation for details on available runtime options. If you specify options that change the format of the JCLCheck reports, you should request `--raw-output`. Changing the format of the report will affect the ability to produce a structured API response. | string |

### mat

| Property | Description | Allowed |
| --- | --- | --- |
| protocol | Specifies the protocol defined for the MAT REST API server.<br/><br/>**Default**: ```https``` | **string**:<br/> ```http```<br/>```https``` |
| hostname | Specifies the hostname or IP address defined for the MAT REST API server (e.g. 127.0.0.0 or localhost). | string |
| port | Specifies the server port (e.g. 8080). | number |
| user | Your mainframe username. | string |
| password | Your mainframe password. | string |
| basePath | The base path for your API Mediation Layer instance. Specify this option to prepend the base path to all resources when making REST requests. Do not specify this option if you are not using an API Mediation Layer. | string |
| rejectUnauthorized | Reject self-signed certificates.<br/><br/>**Default**: ```true``` | **boolean**:<br/> ```true```<br/>```false``` |
| listingDir | Specifies the directory where you want to store the registered program listings (e.g. `c:\listings`) for your immediate source code inspection. You can use the advantage of automated listing registration with MAT and listing retrieval through Endevor® footprints for Cobol, C/C++, and Assembler programs. When a source program listing is registered with MAT, you can enhance the histogram analysis data with the program listing details that pertain to the specific CSECT and program statement. The listing is transfered to the specified directory, which enables you to navigate directly to the line of the source code in you VS Code IDE and inspect the program statement. To use the listing retrieval option through Endevor® footprints, you need to have the Endevor® Web Services installed and configured and specify the Endevor® web server details in the MAT database configuration. | string |

### mq

| Property | Description | Allowed |
| --- | --- | --- |
| host | The host name used to access the IBM MQ REST API. This might be the host name of the IBM MQ mqweb server, or the Zowe API Mediation Layer.. | string |
| port | The port number used to access the IBM MQ REST API. This might be the port number of the IBM MQ mqweb server, or the Zowe API Mediation Layer. | number |
| user | The mainframe (MQ) user name, which can be the same as your TSO login. | string |
| password | The mainframe (MQ) password, which can be the same as your TSO password. | string |
| rejectUnauthorized | Reject self-signed certificates.<br/><br/>**Default**: ```false``` | **boolean**:<br/> ```true```<br/>```false``` |
| protocol | Specifies the MQ protocol.<br/><br/>**Default**: ```https``` | **string**:<br/> ```http```<br/>```https``` |

### omspool

| Property | Description | Allowed |
| --- | --- | --- |
| account | z/OS TSO/E accounting information. | string |
| spoolhlq | High level qualifier of OM Spool installation. | string |
| subsys | OM Spool subsystem name.<br/><br/>**Default**: ```ESF``` | string |
| outds | The SYSTSPRT data set allocated by CAI.CBQ4JCL(BQ4JZOWE). It must be unique for each Zowe CLI user interacting with OM Spool. | string |
| clist | The data set containing ESFZOWE REXX exec. | string |

### omview

| Property | Description | Allowed |
| --- | --- | --- |
| protocol | Protocol of the target OM Web Viewer instance.<br/><br/>**Default**: ```https``` | **string**:<br/> ```http```<br/>```https``` |
| host | Hostname or ip address of the target OM Web Viewer instance. | string |
| port | Port of the target OM Web Viewer instance.<br/><br/>**Default**: ```443``` | number |
| basePath | Context name of the target OM Web Viewer instance.<br/><br/>**Default**: ```web-viewer``` | string |
| user | User name used to authenticate against the target OM Web Viewer instance. | string |
| password | Password used to authenticate against the target OM Web Viewer instance. | string |

### ops

| Property | Description | Allowed |
| --- | --- | --- |
| host | The hostname of the server where OPS/MVS Web Services / REST API is running. | string |
| port | The port number for OPS/MVS Web Services / REST API. | number |
| user | Your z/OS user name that is used to authenticate to OPS/MVS Web Services / REST API. | string |
| password | Your z/OS password that is used to authenticate to OPS/MVS Web Services / REST API. | string |
| protocol | The protocol that is used for connecting to OPS/MVS Web Services / REST API.<br/><br/>**Default**: ```https``` | **string**:<br/> ```http```<br/>```https``` |
| rejectUnauthorized | If set to true, the server certificate is verified against the list of supplied CAs. If set to false, certificate verification is not performed.<br/><br/>**Default**: ```true``` | **boolean**:<br/> ```true```<br/>```false``` |
| subsystem | Specifies the subsystem ID of the OPS/MVS instance to which commands will be directed. This parameter is ignored by the `show status` and `show subsystem` commands.<br/><br/>**Default**: ```OPSS``` | string |
| restApi | If set to true, the plug-in executes the command against the OPS/MVS REST API. If set to false, the plug-in executes against the OPS/MVS Web Services.<br/><br/>**Default**: ```false``` | **boolean**:<br/> ```true```<br/>```false``` |
| basePath | If set to true, the plug-in executes the command against the OPS/MVS REST API. If set to false, the plug-in executes against the OPS/MVS Web Services.<br/><br/>**Default**: ```false``` | string |

### pma

| Property | Description | Allowed |
| --- | --- | --- |
| job_acct | Specifies z/OS TSO/E accounting information. Values: numeric characters (0-9) | string |
| job_class | Your z/OS class information. Values: alphanumeric characters (A-Z, 0-9)  | string |
| job_mclass | Specifies the MSGCLASS parameter value and assigns the job log to the specified output class. The specified MSGCLASS value is used in all JCLs that PMA runs while you execute the commands. If you do not provide the job_mclass parameter, the default MSGCLASS value is used. Values: alphanumeric characters (A-Z, 0-9) <br/><br/>**Default**: ```A``` | string |
| job_load | Specifies the PMA loadlib data set name that you defined during the PMA customization (&HLQ.CEETLOAD)  | string |
| job_pmahlq | Specifies your PMA HLQ to access the KSDSALT, KSDSJOB, and KSDSEXC VSAM files that ensure the collection of the necessary data | string |

### rse

| Property | Description | Allowed |
| --- | --- | --- |
| host | The z/OS host name running the Zowe REST API. | string |
| port | The server port used by the REST API.<br/><br/>**Default**: ```6800``` | number |
| user | The user name for the Zowe REST API operations. | string |
| password | The password of the user for the Zowe REST API operations. | string |
| rejectUnauthorized | Reject self-signed certificates.<br/><br/>**Default**: ```true``` | **boolean**:<br/> ```true```<br/>```false``` |
| basePath | The base path of the API for the REST API operations.<br/><br/>**Default**: ```rseapi``` | string |
| protocol | Only HTTPS supported for a TLS handshake to access REST API.<br/><br/>**Default**: ```https``` | **string**:<br/> ```https``` |
| encoding | The encoding for download and upload of z/OS data set and USS files. The encoding should be specified in the form of "IBM-1047". | string |
| tokenType | JWT type assigned to profile when "zowe rse auth login" is used for authentication. | string |
| tokenValue | JWT value assigned to profile when "zowe rse auth login" is used for authentication. | string |
| tokenExpiration | JWT expiration assigned to profile when "zowe rse auth login" is used for authentication. | string |

### ssh

| Property | Description | Allowed |
| --- | --- | --- |
| host | The z/OS SSH server host name. | string |
| port | The z/OS SSH server port.<br/><br/>**Default**: ```22``` | number |
| user | Mainframe user name, which can be the same as your TSO login. | string |
| password | Mainframe password, which can be the same as your TSO password. | string |
| privateKey | Path to a file containing your private key, that must match a public key stored in the server for authentication | string |
| keyPassphrase | Private key passphrase, which unlocks the private key. | string |
| handshakeTimeout | How long in milliseconds to wait for the SSH handshake to complete. | number |

### sysview

| Property | Description | Allowed |
| --- | --- | --- |
| host | The hostname of the SYSVIEW REST API | string |
| port | The port number of the SYSVIEW REST API | number |
| user | Your z/OS username used to authenticate to the SYSVIEW REST API | string |
| password | Your z/OS password used to authenticate to the SYSVIEW REST API | string |
| rejectUnauthorized | If set, the server certificate is verified against the list of supplied CAs | **boolean**:<br/> ```true```<br/>```false``` |
| ssid | SSID of the SYSVIEW instance. <br/><br/>**Default**: ```GSVX``` | string |
| basePath | The base path for your API Mediation Layer instance. Do not specify this option if you are not using an API Mediation Layer.<br/><br/>**Default**: ```/api/v1``` | string |

### sysview-format

| Property | Description | Allowed |
| --- | --- | --- |
| contextFields | Context fields to display. Defaults to hiding all context | array |
| overview | Display the overview section | **boolean**:<br/> ```true```<br/>```false``` |
| info | Display the information area, if any | **boolean**:<br/> ```true```<br/>```false``` |
| pretty | Display formatted data | **boolean**:<br/> ```true```<br/>```false``` |
| blankIfZero | Show a blank space instead of `0` values | **boolean**:<br/> ```true```<br/>```false``` |
| truncate | Truncate displays that are too wide for the console<br/><br/>**Default**: ```false``` | **boolean**:<br/> ```true```<br/>```false``` |

### tso

| Property | Description | Allowed |
| --- | --- | --- |
| account | Your z/OS TSO/E accounting information. | string |
| characterSet | Character set for address space to convert messages and responses from UTF-8 to EBCDIC.<br/><br/>**Default**: ```697``` | string |
| codePage | Codepage value for TSO/E address space to convert messages and responses from UTF-8 to EBCDIC.<br/><br/>**Default**: ```1047``` | string |
| columns | The number of columns on a screen.<br/><br/>**Default**: ```80``` | number |
| logonProcedure | The logon procedure to use when creating TSO procedures on your behalf.<br/><br/>**Default**: ```IZUFPROC``` | string |
| regionSize | Region size for the TSO/E address space.<br/><br/>**Default**: ```4096``` | number |
| rows | The number of rows on a screen.<br/><br/>**Default**: ```24``` | number |

### zftp

| Property | Description | Allowed |
| --- | --- | --- |
| host | The hostname or IP address of the z/OS server to connect to. | string |
| port | The port of the z/OS FTP server.<br/><br/>**Default**: ```21``` | number |
| user | Username for authentication on z/OS | string |
| password | Password to authenticate to FTP. | string |
| secureFtp | Set to `true` for both control and data connection encryption, `control` for control connection encryption only, or `implicit` for implicitly encrypted control connection (this mode is deprecated in modern times, but usually uses port 990). <br/><br/>Note: Unfortunately, this plug-in's functionality only works with FTP and FTPS, not `SFTP` which is FTP over SSH.<br/><br/>**Default**: ```true``` | boolean,null |
| rejectUnauthorized | Reject self-signed certificates. Only specify this if you are connecting to a secure FTP instance. | boolean,null |
| servername | Server name for the SNI (Server Name Indication) TLS extension. Only specify if you are connecting securely | string,null |
| connectionTimeout | How long (in milliseconds) to wait for the control connection to be established.<br/><br/>**Default**: ```10000``` | number |
| encoding | The encoding for download and upload of z/OS data set. | string |

### zosmf

| Property | Description | Allowed |
| --- | --- | --- |
| host | The z/OSMF server host name. | string |
| port | The z/OSMF server port.<br/><br/>**Default**: ```443``` | number |
| user | Mainframe (z/OSMF) user name, which can be the same as your TSO login. | string |
| password | Mainframe (z/OSMF) password, which can be the same as your TSO password. | string |
| rejectUnauthorized | Reject self-signed certificates.<br/><br/>**Default**: ```true``` | **boolean**:<br/> ```true```<br/>```false``` |
| certFile | The file path to a certificate file to use for authentication | string |
| certKeyFile | The file path to a certificate key file to use for authentication | string |
| basePath | The base path for your API Mediation Layer instance. Specify this option to prepend the base path to all z/OSMF resources when making REST requests. Do not specify this option if you are not using an API Mediation Layer. | string |
| protocol | The protocol used <br/><br/>**Default**: ```https``` | **string**:<br/> ```http```<br/>```https``` |
| encoding | The encoding for download and upload of z/OS data set and USS files. The default encoding if not specified is IBM-1047. | string |
| responseTimeout | The maximum amount of time in seconds the z/OSMF Files TSO servlet should run before returning a response. Any request exceeding this amount of time will be terminated and return an error. Allowed values: 5 - 600 | number |
