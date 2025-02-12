## Profiles
### base

| Property | Description | Default | Allowed |
| --- | --- | --- | --- |
| host | Host name of service on the mainframe. | n/a | n/a |
| port | Port number of service on the mainframe. | n/a | n/a |
| user | User name to authenticate to service on the mainframe. | n/a | n/a |
| password | Password to authenticate to service on the mainframe. | n/a | n/a |
| rejectUnauthorized | Reject self-signed certificates. | true | n/a |
| tokenType | The type of token to get and use for the API. Omit this option to use the<br/>default token type, which is provided by 'zowe auth login'. | n/a | n/a |
| tokenValue | The value of the token to pass to the API. | n/a | n/a |
| certFile | The file path to a certificate file to use for authentication. <br/>Note: The CLI does not support certificate files that require a password. For<br/>more information, search Troubleshooting PEM Certificates in Zowe Docs. | n/a | n/a |
| certKeyFile | The file path to a certificate key file to use for authentication | n/a | n/a |


### ca7

| Property | Description | Default | Allowed |
| --- | --- | --- | --- |
| host | Host name of the CA7 API service that is running on the mainframe system. | n/a | n/a |
| port | Port for the CA7 API service that is running on the mainframe system. | n/a | n/a |
| user | User name for authenticating connections to the CA7 API service that is running<br/>on the mainframe system. | n/a | n/a |
| password | Password for authenticating connections to the CA7 API service that is running<br/>on the mainframe system. | n/a | n/a |
| basePath | The base path for your API mediation layer instance. Specify this option to<br/>prepend the base path to all resources when making REST requests. Do not specify<br/>this option if you are not using an API mediation layer. | n/a | n/a |
| protocol | Specifies protocol to use for CA7 connection (http or https). | n/a | http<br/>https |
| rejectUnauthorized | Reject self-signed certificates. | true | n/a |


### cics

| Property | Description | Default | Allowed |
| --- | --- | --- | --- |
| host | The CMCI server host name | n/a | n/a |
| port | The CMCI server port | 1490 | n/a |
| user | Your username to connect to CICS | n/a | n/a |
| password | Your password to connect to CICS | n/a | n/a |
| regionName | The name of the CICS region name to interact with | n/a | n/a |
| cicsPlex | The name of the CICSPlex to interact with | n/a | n/a |
| rejectUnauthorized | Reject self-signed certificates. | true | n/a |
| protocol | Specifies CMCI protocol (http or https). | https | http<br/>https |


### db2

| Property | Description | Default | Allowed |
| --- | --- | --- | --- |
| host | The Db2 server host name | n/a | n/a |
| port | The Db2 server port number | n/a | n/a |
| user | The Db2 user ID (may be the same as the TSO login) | n/a | n/a |
| password | The Db2 password (may be the same as the TSO password) | n/a | n/a |
| database | The name of the database | n/a | n/a |
| sslFile | Path to the root CA Certificate file | n/a | n/a |


### dbm-db2

| Property | Description | Default | Allowed |
| --- | --- | --- | --- |
| host | Specifies the DBM Data Service REST API server host name or TCP/IP address to<br/>use. | n/a | n/a |
| port | Specifies the DBM Data Service REST API server TCP/IP port number. | 7300 | n/a |
| user | Specifies the mainframe user name that you want to use to connect to the<br/>mainframe systems during execution of the Zowe CLI commands. This user name can<br/>be the same as your TSO login ID. | n/a | n/a |
| password | Specifies the mainframe password for the user name that is used to connect to<br/>the mainframe systems during execution of the CLI commands. This password can be<br/>the same as your TSO password. | n/a | n/a |
| protocol | Specifies the communication protocol between zowe dbm-db2 client and DBM Data<br/>Service. | https | http<br/>https |
| rejectUnauthorized | Determines whether the dbm-db2 command is accepted or rejected when a<br/>self-signed certificate is returned by the DBM Data Service. | true | n/a |
| environmentList | Specifies a string of one or more entries consisting of a Db2 subsystem ID and a<br/>DBM Data Service REST API server host name or TCP/IP address. Use a comma to<br/>separate entries. The same Db2 subsystem can be used in multiple DBM Data<br/>Service environments. For more information about configuring the DBM Data<br/>Service, see the Database Management Solutions for Db2 for z/OS documentation at<br/>https://techdocs.broadcom.com/db2mgmt | {"ssid1":"env1@host1:port1",<br/>"ssid2":"env2@host2:port2"} | n/a |
| jobCards | Specifies a string array of z/OS JCL JOB statements. | //DB2DVOPS JOB CLASS=A,<br/>//         MSGCLASS=X | n/a |
| workDatasetPrefix | Specifies the prefix (high-level qualifier) in z/OS work data set names. | ${user}.dbmdb2 | n/a |
| deleteWorkDatasets | Specifies whether to delete work data sets on a mainframe after the request is<br/>fulfilled. | true | n/a |
| overwriteOutputFiles | Specifies whether to overwrite output files if they exist. | false | n/a |
| authid | Specifies the primary Db2 authorization ID that is used to establish a<br/>connection between Db2 and a process. | ${user} | n/a |
| sqlid | Specifies the authorization ID that is used in generated SET CURRENT SQLID<br/>statements. | ${user} | n/a |
| terminationCharacter | Specifies the SQL termination character to use in DDL generation when the<br/>default termination character conflicts with the SQL statements that are used in<br/>triggers, XML indexes, and routines (external SQL functions and native SQL<br/>stored procedures). The default termination character is a semi-colon (;). You<br/>cannot specify a comma, double quote, single quote, left or right parentheses,<br/>or an underscore. | ; | n/a |
| basePath | The base path for your API mediation layer instance. Specify this option to<br/>prepend the base path to all DBM DS resources when making REST requests. Do not<br/>specify this option if you are not using an API mediation layer. | n/a | n/a |


### dbm-db2-options

| Property | Description | Default | Allowed |
| --- | --- | --- | --- |
| authid | Specifies the primary Db2 authorization ID that is used to establish a<br/>connection between Db2 and a process. | n/a | n/a |
| changeSet | Specifies the creator and name of an existing RC/Migrator global change set that<br/>changes Db2 objects during a command execution. <br/>Format: <br/><br/>&lt;change-set-creator.change-set-name&gt;  <br/>For more information about global change services, see the RC/Migrator<br/>documentation at https://techdocs.broadcom.com/db2rcmig <br/><br/>Note: If change-set and change-set-file are both specified, specifications in<br/>change-set-file take precedence.  | n/a | n/a |
| changeSetValues | Specifies the global change specifications that modify Db2 object attributes<br/>during a command execution. <br/>Format: <br/><br/>&lt;object-attribute&gt; &lt;from-value&gt; &lt;to-value&gt; <br/>&nbsp;&nbsp; <br/>The &lt;object-attribute&gt; consists of four characters. The first two characters<br/>identify the object type. The last two characters identify the specific<br/>attribute. Wildcard characters are supported in &lt;from-value&gt; and &lt;to-value&gt;. If<br/>the same &lt;object-attribute&gt; is specified multiple times, the first occurrence<br/>takes precedence. <br/>&nbsp;  <br/>For a full list of attributes, see Global Change Set Attributes in the<br/>RC/Migrator documentation at https://techdocs.broadcom.com/db2rcmig <br/><br/>Example: <br/>&nbsp;&nbsp; <br/>The following example demonstrates changes to the table schema (creator) and<br/>tablespace names: <br/>&nbsp;&nbsp;  <br/>TBCR TEST% PROD% <br/>TBTS TESTTS% PRODTS% <br/>Note: <br/>- If change-set and change-set-file are both specified, specifications in<br/>change-set-file take precedence. <br/>- The changeSetValues options-profile option has the same behavior as the<br/>change-set-file command option.  | -- DDL changes for a table with dependent objects.<br/>-- Note: Replace CHANGEME with your database name.<br/>ALDB * CHANGEME<br/>ALCR * \${user}<br/>TBTC * \${user}<br/>IXTC * \${user}<br/>VWTC * \${user}<br/>VWFS * \${user}<br/>SYTC * \${user}<br/>ASTC * \${user}<br/>TGSC * \${user}<br/>TGOW * \${user}<br/>TGTC * \${user}<br/>TGTO * \${user}<br/>TGQU * \${user}<br/>TGFS * \${user}<br/>TGQS * \${user}<br/>SQSC * \${user}<br/>RTSC * \${user}<br/>RTPO * \${user}<br/>RTQU * \${user} | n/a |
| deleteWorkDatasets | Specifies whether to delete work data sets on a mainframe after the request is<br/>fulfilled. | n/a | n/a |
| description | Specifies a 1- to 25-character description for the RC/Migrator compare strategy. | n/a | n/a |
| id | Specifies the 1- to 8-character name of the RC/Migrator compare strategy that is<br/>created on the target Db2 subsystem during a command execution. <br/><br/>Format: The name must begin with a non-numeric character and contain the<br/>following characters only: uppercase letters from A to Z, numbers from 0 to 9,<br/>and special characters $, #, and @.  | n/a | n/a |
| jobCards | Specifies a string array of z/OS JCL JOB statements. | n/a | n/a |
| matchSet | Specifies the creator and name of an existing RC/Migrator automapping mask set.<br/>Matching is used to pair objects in a DDL file to objects that are defined on a<br/>Db2 subsystem. Matching determines whether the 'change-set' or 'rule-set'<br/>options are applied. <br/>Format: <br/>&lt;match-set-creator.match-set-name&gt; <br/>For more information about mask services, see the RC/Migrator documentation at<br/>https://techdocs.broadcom.com/db2rcmig <br/>Note: If --match-set and --match-set-file are both specified, specifications in<br/>match-set-file take precedence.  | n/a | n/a |
| matchSetValues | Specifies the mapping mask specifications. Matching is used to pair objects in a<br/>DDL file to objects that are defined on a Db2 subsystem. For example, a mask<br/>specification can account for different schema naming patterns across<br/>environments. Matching determines whether the 'change-set' or 'rule-set' options<br/>are applied. <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <br/>Format: <br/>&lt;object-type&gt; &lt;source-name-mask&gt; &lt;target-name-mask&gt;; <br/>STOGROUP &lt;name&gt; &lt;name&gt; <br/>DATABASE &lt;name&gt; &lt;name&gt; <br/>TABLESPACE &lt;database.name&gt; &lt;database.name&gt; <br/>TABLE &lt;schema.name&gt; &lt;schema.name&gt; <br/>INDEX &lt;schema.name&gt; &lt;schema.name&gt; <br/>VIEW &lt;schema.name&gt; &lt;schema.name&gt; <br/>SYNONYM &lt;schema.name&gt; &lt;schema.name&gt; <br/>ALIAS &lt;schema.name&gt; &lt;schema.name&gt; <br/>TRIGGER &lt;schema.name&gt; &lt;schema.name&gt; <br/>SEQUENCE &lt;schema.name&gt; &lt;schema.name&gt; <br/>FUNCTION &lt;schema.name[.version]&gt; &lt;schema.name[.version]&gt; <br/>PROCEDURE &lt;schema.name[.version]&gt; &lt;schema.name[.version]&gt; <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <br/>Note: <br/>- &lt;name&gt; must be between 1 and 128 characters. For DATABASE and TABLESPACE,<br/>&lt;name&gt; must be between 1 and 8 characters. <br/>- &lt;schema&gt; must be between 1 and 128 characters. <br/>- &lt;version&gt; must be between 1 and 64 characters. <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <br/>A mask specification can include the following wildcard characters: <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <br/>Percent sign (%) indicates that zero or more characters can occupy that position<br/>and all remaining positions to the end of the name, or to the next character.<br/>The percent sign can be used anywhere in the name. However, the source and<br/>target characters must match exactly. <br/><br/>Hyphen or dash (-) indicates that any character can occupy that position, but a<br/>character must exist at that position, and the source and target character must<br/>match exactly. The hyphen can be repeated in several places in the name. <br/><br/>Asterisk (*) indicates matching values. An asterisk cannot be used with other<br/>characters. <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <br/>Use a semicolon to separate mask specifications. Multiple mask specifications<br/>for the same object type are supported. <br/>Example: <br/><br/>The following example demonstrates different ways of matching the table<br/>MYNAME.MYTABLE to the table YOURNAME.YOURTABLE: <br/><br/>TABLE MY%.%TABLE YOUR%.%TABLE;  <br/>TABLE MYN-M-.MYT% YOURN-M-.YOURT%; <br/>TABLE MYNAME.MYTABLE YOURNAME.YOURTABLE;  <br/>TABLE *.MYTABLE *.YOURTABLE; <br/>For a list of mask specifications, see the RC/Migrator documentation at<br/>https://techdocs.broadcom.com/db2rcmig <br/><br/>Note: <br/>- If --match-set and --match-set-file are both specified, specifications in<br/>match-set-file take precedence. <br/>- The matchSetValues options-profile option has the same behavior as the<br/>match-set-file command option.  | n/a | n/a |
| modification | Specifies a named set of server-managed default parameter values that control<br/>the execution behavior of the zowe dbm-db2 commands. For example, you can use a<br/>modification to identify a set of default values that differ from the current<br/>set of default values. <br/>&nbsp;  <br/>For more information about using the modification option, see the DBM Data<br/>Service documentation at https://techdocs.broadcom.com/db2mgmt  | n/a | n/a |
| overwriteOutputFiles | Specifies whether to overwrite output files if they exist. | n/a | n/a |
| ruleSet | Specifies the creator and name of an existing RC/Migrator rule set that<br/>overrides Db2 object attributes in the target Db2 subsystem with the<br/>corresponding values from the input DDL file. The changes only apply to existing<br/>objects, as determined by match-set processing. <br/>Format: <br/>&lt;rule-set-creator.rule-set-name&gt; <br/>&nbsp;&nbsp;&nbsp;&nbsp;  <br/>For more information about rule database services, see the RC/Migrator<br/>documentation at https://techdocs.broadcom.com/db2rcmig  | n/a | n/a |
| sqlid | Specifies the authorization ID that is used in generated SET CURRENT SQLID<br/>statements. | n/a | n/a |
| sourceDb2 | Specifies the source Db2 subsystem or data sharing group where the objects that<br/>you want to use in a command are located. <br/><br/>&nbsp;Note: If you specify the data sharing group, the first active Db2<br/>subsystem in the group is used.  | n/a | n/a |
| targetDb2 | Specifies the target Db2 subsystem or data sharing group where you want to use a<br/>command. <br/><br/>&nbsp;Note: If you specify the data sharing group, the first active Db2<br/>subsystem in the group is used.  | n/a | n/a |
| terminationCharacter | Specifies the SQL termination character to use in DDL generation when the<br/>default termination character conflicts with the SQL statements that are used in<br/>triggers, XML indexes, and routines (external SQL functions and native SQL<br/>stored procedures). The default termination character is a semi-colon (;). You<br/>cannot specify a comma, double quote, single quote, left or right parentheses,<br/>or an underscore. | n/a | n/a |
| type | Specifies the type of DDL statements that you want to generate. You can generate<br/>CREATE or DROP statements. | n/a | drop<br/>create |
| verify | Specifies whether to verify that the objects to be created do not exist on the<br/>Db2 subsystem and that the related objects that are required for successful<br/>creation of the objects exist on the Db2 subsystem or in the input DDL. <br/><br/>Default value: no  | n/a | yes<br/>no |
| workDatasetPrefix | Specifies the prefix (high-level qualifier) in z/OS work data set names. | n/a | n/a |


### endevor

| Property | Description | Default | Allowed |
| --- | --- | --- | --- |
| host | The hostname of the endevor session | n/a | n/a |
| port | The port number of the endevor session | n/a | n/a |
| user | The username of the endevor session | n/a | n/a |
| password | The password of the user | n/a | n/a |
| protocol | The protocol used for connecting to Endevor Rest API | https | http<br/>https |
| basePath | The base path used for connecting to Endevor Rest API | EndevorService/api/v2 | n/a |
| rejectUnauthorized | If set, the server certificate is verified against the list of supplied CAs | n/a | n/a |
| reportDir | The default path where any reports will be written to, either absolute or<br/>relative to current directory | . | n/a |


### endevor-location

| Property | Description | Default | Allowed |
| --- | --- | --- | --- |
| instance | The STC/datasource of the session | ENDEVOR | n/a |
| environment | The Endevor environment where your project resides | DEV | n/a |
| system | The Endevor system where the element resides | n/a | n/a |
| subsystem | The Endevor subsystem where your element resides | n/a | n/a |
| type | Name of the Endevor element's type | n/a | n/a |
| stageNumber | The Endevor stage where your project resides | n/a | 1<br/>2 |
| comment | The Endevor comment you want to use when performing an action | n/a | n/a |
| ccid | The Endevor CCID you want to use when performing an action | n/a | n/a |
| maxrc | The return code of Endevor that defines a failed action | 8 | n/a |
| override-signout | Always override element signout, without having to specify the override signout<br/>option on each command | false | n/a |
| file-extension | The strategy for deciding what file extension to use during a bulk retrieve or<br/>workspace synchronization. Must be one of the following: <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;none: File name is equal to element name, no<br/>extension is added. <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;file-ext: The file extension defined in the<br/>Type definition is used; If not defined, no extension is added. <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type-name: The type name is used as the file<br/>extension. <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mixed: The file extension defined in Type<br/>definition is used; If not defined, the type name is used instead. | mixed | none<br/>type-name<br/>file-ext<br/>mixed |


### ims

| Property | Description | Default | Allowed |
| --- | --- | --- | --- |
| host | The IMS Operations API server host name. | n/a | n/a |
| port | The IMS Operations API server port. | n/a | n/a |
| imsConnectHost | The hostname of your instance of IMS Connect. This is typically the hostname of<br/>the mainframe LPAR where IMS Connect is running. | n/a | n/a |
| imsConnectPort | The port of your instance of IMS Connect. This port can be found in your IMS<br/>Connect configuration file on the mainframe. | n/a | n/a |
| plex | The name of the IMS plex. | n/a | n/a |
| user | The web server user name where the IMS Operations API resides. | n/a | n/a |
| password | The web server user password where the IMS Operations API resides. | n/a | n/a |
| basePath | The base path for your API mediation layer instance. Specify this option to<br/>prepend the base path to all z/OSMF resources when making REST requests. Do not<br/>specify this option if you are not using an API mediation layer. | n/a | n/a |
| protocol | Specifies protocol (http or https). | https | http<br/>https |
| rejectUnauthorized | Reject self-signed certificates. | true | n/a |


### jclcheck

| Property | Description | Default | Allowed |
| --- | --- | --- | --- |
| host | Host name of the JCLCheck API service that is running on the mainframe system. | n/a | n/a |
| port | Port for the JCLCheck API service that is running on the mainframe system. | 12697 | n/a |
| user | User name for authenticating connections to the JCLCheck API service that is<br/>running on the mainframe system. | n/a | n/a |
| password | Password for authenticating connections to the JCLCheck API service that is<br/>running on the mainframe system. | n/a | n/a |
| basePath | The base path for your API mediation layer instance. Specify this option to<br/>prepend the base path to all resources when making REST requests. Do not specify<br/>this option if you are not using an API mediation layer. | cajclcheck/api/v1 | n/a |
| rejectUnauthorized | Reject self-signed certificates. | true | n/a |
| protocol | Specifies protocol to use for JCLCheck connection (http or https). | https | http<br/>https |
| jclcheckOptions | The desired set of JCLCheck runtime options. Specify the options exactly as you<br/>would on the PARM= or OPTIONS DD on a batch run of JCLCheck. See the JCLCheck<br/>runtime options documentation for details on available runtime options. If you<br/>specify options that change the format of the JCLCheck reports, you should<br/>request '--raw-output'. Changing the format of the report will affect the<br/>ability to produce a structured API response. | n/a | n/a |


### mat

| Property | Description | Default | Allowed |
| --- | --- | --- | --- |
| protocol | Specifies the protocol defined for the MAT REST API server (http or https). | https | http<br/>https |
| hostname | Specifies the hostname or IP address defined for the MAT REST API server (e.g.<br/>127.0.0.0 or localhost). | n/a | n/a |
| port | Specifies the server port (e.g. 8080). | n/a | n/a |
| user | Your mainframe username. | n/a | n/a |
| password | Your mainframe password. | n/a | n/a |
| basePath | The base path for your API mediation layer instance. Specify this option to<br/>prepend the base path to all resources when making REST requests. Do not specify<br/>this option if you are not using an API mediation layer. | n/a | n/a |
| rejectUnauthorized | Reject self-signed certificates. | true | n/a |
| listingDir | Specifies the directory where you want to store the registered program listings<br/>(e.g. 'c:\listings') for your immediate source code inspection. You can use the<br/>advantage of automated listing registration with MAT and listing retrieval<br/>through Endevor® footprints for Cobol, C/C++, and Assembler programs. When a<br/>source program listing is registered with MAT, you can enhance the histogram<br/>analysis data with the program listing details that pertain to the specific<br/>CSECT and program statement. The listing is transfered to the specified<br/>directory, which enables you to navigate directly to the line of the source code<br/>in you VS Code IDE and inspect the program statement. To use the listing<br/>retrieval option through Endevor® footprints, you need to have the Endevor® Web<br/>Services installed and configured and specify the Endevor® web server details in<br/>the MAT database configuration. | n/a | n/a |


### mq

| Property | Description | Default | Allowed |
| --- | --- | --- | --- |
| host | The host name used to access the IBM MQ REST API. This might be the host name of<br/>the IBM MQ mqweb server, or the Zowe API Mediation Layer.. | n/a | n/a |
| port | The port number used to access the IBM MQ REST API. This might be the port<br/>number of the IBM MQ mqweb server, or the Zowe API Mediation Layer. | n/a | n/a |
| user | The mainframe (MQ) user name, which can be the same as your TSO login. | n/a | n/a |
| password | The mainframe (MQ) password, which can be the same as your TSO password. | n/a | n/a |
| rejectUnauthorized | Reject self-signed certificates. | false | n/a |
| protocol | Specifies the MQ protocol (http or https). | https | http<br/>https |


### omspool

| Property | Description | Default | Allowed |
| --- | --- | --- | --- |
| account | z/OS TSO/E accounting information. | n/a | n/a |
| spoolhlq | High level qualifier of OM Spool installation. | n/a | n/a |
| subsys | OM Spool subsystem name. | ESF | n/a |
| outds | The SYSTSPRT data set allocated by CAI.CBQ4JCL(BQ4JZOWE). It must be unique for<br/>each Zowe CLI user interacting with OM Spool. | n/a | n/a |
| clist | The data set containing ESFZOWE REXX exec. | n/a | n/a |


### omview

| Property | Description | Default | Allowed |
| --- | --- | --- | --- |
| protocol | Protocol of the target OM Web Viewer instance. | https | http<br/>https |
| host | Hostname or ip address of the target OM Web Viewer instance. | n/a | n/a |
| port | Port of the target OM Web Viewer instance. | 443 | n/a |
| basePath | Context name of the target OM Web Viewer instance. | web-viewer | n/a |
| user | User name used to authenticate against the target OM Web Viewer instance. | n/a | n/a |
| password | Password used to authenticate against the target OM Web Viewer instance. | n/a | n/a |


### ops

| Property | Description | Default | Allowed |
| --- | --- | --- | --- |
| host | The hostname of the server where OPS/MVS Web Services / REST API is running. | n/a | n/a |
| port | The port number for OPS/MVS Web Services / REST API. | n/a | n/a |
| user | Your z/OS user name that is used to authenticate to OPS/MVS Web Services / REST<br/>API. | n/a | n/a |
| password | Your z/OS password that is used to authenticate to OPS/MVS Web Services / REST<br/>API. | n/a | n/a |
| protocol | The protocol that is used for connecting to OPS/MVS Web Services / REST API. | https | http<br/>https |
| rejectUnauthorized | If set to true, the server certificate is verified against the list of supplied<br/>CAs. If set to false, certificate verification is not performed. | true | n/a |
| subsystem | Specifies the subsystem ID of the OPS/MVS instance to which commands will be<br/>directed. This parameter is ignored by the 'show status' and 'show subsystem'<br/>commands. | OPSS | n/a |
| restApi | If set to true, the plug-in executes the command against the OPS/MVS REST API.<br/>If set to false, the plug-in executes against the OPS/MVS Web Services. | false | n/a |
| basePath | If set to true, the plug-in executes the command against the OPS/MVS REST API.<br/>If set to false, the plug-in executes against the OPS/MVS Web Services. | false | n/a |


### pma

| Property | Description | Default | Allowed |
| --- | --- | --- | --- |
| job_acct | Specifies z/OS TSO/E accounting information. Values: numeric characters (0-9) | n/a | n/a |
| job_class | Your z/OS class information. Values: alphanumeric characters (A-Z, 0-9)  | n/a | n/a |
| job_mclass | Specifies the MSGCLASS parameter value and assigns the job log to the specified<br/>output class. The specified MSGCLASS value is used in all JCLs that PMA runs<br/>while you execute the commands. If you do not provide the job_mclass parameter,<br/>the default MSGCLASS value is used. Values: alphanumeric characters (A-Z, 0-9)  | A | n/a |
| job_load | Specifies the PMA loadlib data set name that you defined during the PMA<br/>customization (&HLQ.CEETLOAD)  | n/a | n/a |
| job_pmahlq | Specifies your PMA HLQ to access the KSDSALT, KSDSJOB, and KSDSEXC VSAM files<br/>that ensure the collection of the necessary data | n/a | n/a |


### rse

| Property | Description | Default | Allowed |
| --- | --- | --- | --- |
| host | The z/OS host name running the Zowe REST API. | n/a | n/a |
| port | The server port used by the REST API. | 6800 | n/a |
| user | The user name for the Zowe REST API operations. | n/a | n/a |
| password | The password of the user for the Zowe REST API operations. | n/a | n/a |
| rejectUnauthorized | Reject self-signed certificates. | true | n/a |
| basePath | The base path of the API for the REST API operations. | rseapi | n/a |
| protocol | Only HTTPS supported for a TLS handshake to access REST API. | https | https |
| encoding | The encoding for download and upload of z/OS data set and USS files. The<br/>encoding should be specified in the form of "IBM-1047". | n/a | n/a |
| tokenType | JWT type assigned to profile when "zowe rse auth login" is used for<br/>authentication. | n/a | n/a |
| tokenValue | JWT value assigned to profile when "zowe rse auth login" is used for<br/>authentication. | n/a | n/a |
| tokenExpiration | JWT expiration assigned to profile when "zowe rse auth login" is used for<br/>authentication. | n/a | n/a |


### ssh

| Property | Description | Default | Allowed |
| --- | --- | --- | --- |
| host | The z/OS SSH server host name. | n/a | n/a |
| port | The z/OS SSH server port. | 22 | n/a |
| user | Mainframe user name, which can be the same as your TSO login. | n/a | n/a |
| password | Mainframe password, which can be the same as your TSO password. | n/a | n/a |
| privateKey | Path to a file containing your private key, that must match a public key stored<br/>in the server for authentication | n/a | n/a |
| keyPassphrase | Private key passphrase, which unlocks the private key. | n/a | n/a |
| handshakeTimeout | How long in milliseconds to wait for the SSH handshake to complete. | n/a | n/a |


### sysview

| Property | Description | Default | Allowed |
| --- | --- | --- | --- |
| host | The hostname of the SYSVIEW REST API | n/a | n/a |
| port | The port number of the SYSVIEW REST API | n/a | n/a |
| user | Your z/OS username used to authenticate to the SYSVIEW REST API | n/a | n/a |
| password | Your z/OS password used to authenticate to the SYSVIEW REST API | n/a | n/a |
| rejectUnauthorized | If set, the server certificate is verified against the list of supplied CAs | n/a | n/a |
| ssid | SSID of the SYSVIEW instance. Default value: GSVX | GSVX | n/a |
| basePath | The base path for your API mediation layer instance. Do not specify this option<br/>if you are not using an API mediation layer. | /api/v1 | n/a |


### sysview-format

| Property | Description | Default | Allowed |
| --- | --- | --- | --- |
| contextFields | Context fields to display. Defaults to hiding all context | n/a | n/a |
| overview | Display the overview section | n/a | n/a |
| info | Display the information area, if any | n/a | n/a |
| pretty | Display formatted data | n/a | n/a |
| blankIfZero | Show a blank space instead of '0' values | n/a | n/a |
| truncate | Truncate displays that are too wide for the console | false | n/a |


### tso

| Property | Description | Default | Allowed |
| --- | --- | --- | --- |
| account | Your z/OS TSO/E accounting information. | n/a | n/a |
| characterSet | Character set for address space to convert messages and responses from UTF-8 to<br/>EBCDIC. | 697 | n/a |
| codePage | Codepage value for TSO/E address space to convert messages and responses from<br/>UTF-8 to EBCDIC. | 1047 | n/a |
| columns | The number of columns on a screen. | 80 | n/a |
| logonProcedure | The logon procedure to use when creating TSO procedures on your behalf. | IZUFPROC | n/a |
| regionSize | Region size for the TSO/E address space. | 4096 | n/a |
| rows | The number of rows on a screen. | 24 | n/a |


### zftp

| Property | Description | Default | Allowed |
| --- | --- | --- | --- |
| host | The hostname or IP address of the z/OS server to connect to. | n/a | n/a |
| port | The port of the z/OS FTP server. | 21 | n/a |
| user | Username for authentication on z/OS | n/a | n/a |
| password | Password to authenticate to FTP. | n/a | n/a |
| secureFtp | Set to true for both control and data connection encryption, 'control' for<br/>control connection encryption only, or 'implicit' for implicitly encrypted<br/>control connection (this mode is deprecated in modern times, but usually uses<br/>port 990). Note: Unfortunately, this plugin's functionality only works with FTP<br/>and FTPS, not 'SFTP' which is FTP over SSH. | true | n/a |
| rejectUnauthorized | Reject self-signed certificates. Only specify this if you are connecting to a<br/>secure FTP instance. | n/a | n/a |
| servername | Server name for the SNI (Server Name Indication) TLS extension. Only specify if<br/>you are connecting securely | n/a | n/a |
| connectionTimeout | How long (in milliseconds) to wait for the control connection to be established. | 10000 | n/a |
| encoding | The encoding for download and upload of z/OS data set. | n/a | n/a |


### zosmf

| Property | Description | Default | Allowed |
| --- | --- | --- | --- |
| host | The z/OSMF server host name. | n/a | n/a |
| port | The z/OSMF server port. | 443 | n/a |
| user | Mainframe (z/OSMF) user name, which can be the same as your TSO login. | n/a | n/a |
| password | Mainframe (z/OSMF) password, which can be the same as your TSO password. | n/a | n/a |
| rejectUnauthorized | Reject self-signed certificates. | true | n/a |
| certFile | The file path to a certificate file to use for authentication | n/a | n/a |
| certKeyFile | The file path to a certificate key file to use for authentication | n/a | n/a |
| basePath | The base path for your API mediation layer instance. Specify this option to<br/>prepend the base path to all z/OSMF resources when making REST requests. Do not<br/>specify this option if you are not using an API mediation layer. | n/a | n/a |
| protocol | The protocol used (HTTP or HTTPS) | https | http<br/>https |
| encoding | The encoding for download and upload of z/OS data set and USS files. The default<br/>encoding if not specified is IBM-1047. | n/a | n/a |
| responseTimeout | The maximum amount of time in seconds the z/OSMF Files TSO servlet should run<br/>before returning a response. Any request exceeding this amount of time will be<br/>terminated and return an error. Allowed values: 5 - 600 | n/a | n/a |


