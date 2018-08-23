<div id="page">

<div id="main" class="aui-page-panel">

<div class="aui-page-panel-nav">

<div class="aui-navgroup-inner">

<div id="tabs-nav" class="aui-tabs horizontal-tabs">

  - [**Contents**](#tabs-navigation)
  - [**Search**](#tabs-search)

<div id="tabs-navigation" class="tabs-pane active-pane" data-current-page-id="488381753">

</div>

<div id="tabs-search" class="tabs-pane">

</div>

</div>

</div>

</div>

<div class="section aui-page-panel-content">

<div id="main-header">

<div id="breadcrumb-section">

</div>

# <span id="title-text"> CA Brightside - Source : .CA Brightside Plug-in for IBM CICS v1.0 </span>

</div>

<div id="content" class="view">

<div class="page-metadata">

</div>

<div id="main-content" class="wiki-content group">

<span style="color: rgb(36,41,46);">The CA Brightside Plug-in for
IBM<span style="color: rgb(36,41,46);">®</span>
CICS<span style="color: rgb(36,41,46);">®</span> lets you extend CA
Brightside to interact with CICS programs and transactions. The plug-in
uses the IBM CICS® Management Client Interface (CMCI) API to achieve the
interaction with CICS.</span> For more information, see [CICS management
client
interface](https://www.ibm.com/support/knowledgecenter/en/SSGMCP_5.3.0/com.ibm.cics.ts.clientapi.doc/topics/clientapi_overview.html)
on the IBM Knowledge Center.

<span style="color: rgb(36,41,46);"></span>

<div class="toc-macro rbtoc1535054542924">

  - [CA Brightside Plug-in for IBM CICS Use
    Cases](#id-.CABrightsidePlug-inforIBMCICSv1.0-CABrightsidePlug-inforIBMCICSUseCases)
  - [CA Brightside Plug-in for IBM CICS
    Prerequisites](#id-.CABrightsidePlug-inforIBMCICSv1.0-CABrightsidePlug-inforIBMCICSPrerequisites)
  - [Install CA Brightside Plug-in for IBM
    CICS](#id-.CABrightsidePlug-inforIBMCICSv1.0-InstallCABrightsidePlug-inforIBMCICS)
  - [Set up Your CA Brightside Plug-in for IBM
    CICS Profile](#id-.CABrightsidePlug-inforIBMCICSv1.0-SetupYourCABrightsidePlug-inforIBMCICSProfile)
  - [CA Brightside Plug-in for IBM CICS
    Commands](#id-.CABrightsidePlug-inforIBMCICSv1.0-CABrightsidePlug-inforIBMCICSCommands)

</div>

## <span style="color: rgb(36,41,46);">CA Brightside Plug-in for IBM CICS Use Cases</span>

As an application developer, you can use CA Brightside Plug-in for IBM
CICS to perform the following tasks:

  - Deploy code changes to CICS applications that were developed with
    COBOL. 
  - Deploy changes to CICS regions for testing or delivery. See the
    [define command](#id-.CABrightsidePlug-inforIBMCICSv1.0-define) for
    an example of how you can define programs to CICS to assist with
    testing and delivery. 
  - Automate CICS interaction steps in your CI/CD pipeline with Jenkins
    Automation Server or TravisCI.
  - Deploy build artifacts to CICS regions.
  - Alter, copy, define, delete, discard, and install CICS resources and
    resource definitions. 

## CA Brightside Plug-in for IBM CICS Prerequisites

Before you install the
plug-in<span style="color: rgb(36,41,46);">,</span> meet the following
prerequisites:

  - Install CA Brightside on your PC.
  - Verify that [IBM® CICS® Management Client Interface
    (CMCI)](https://www.ibm.com/support/knowledgecenter/en/SSGMCP_5.3.0/com.ibm.cics.ts.clientapi.doc/topics/clientapi_overview.html) API
    <span style="color: rgb(36,41,46);">is installed and configured on
    your mainframe
systems.</span><span style="color: rgb(36,41,46);">  
    </span>

<div class="confluence-information-macro confluence-information-macro-information">

<span class="aui-icon aui-icon-small aui-iconfont-info confluence-information-macro-icon"></span>

<div class="confluence-information-macro-body">

**More Information:**

  - [Install BrightSide
    Framework](https://docops.ca.com/display/CMFAAS/Install+BrightSide+Framework)
  - [Install and configure IBM
    CMCI](https://www.ibm.com/support/knowledgecenter/en/SSGMCP_5.3.0/com.ibm.cics.ts.clientapi.doc/topics/clientapi_overview.html)

</div>

</div>

## Install CA Brightside Plug-in for IBM CICS

To install the CA Brightside Plug-in for IBM CICS, issue the following
command:

<div class="code panel caCodePanel">

<div class="codeContent panelContent">

``` ca-code-default
bright plugins install @brightside/cics
```

</div>

</div>

To validate that the plug-in installed successfully,
issu<span class="inline-comment-marker" data-ref="905f8331-cec1-4de7-a2f6-29963487835b">e
the following
command</span>:

<div class="code panel caCodePanel">

<div class="codeContent panelContent">

``` ca-code-default
 bright plugins validate @brightside/cics
```

</div>

</div>

<div class="confluence-information-macro confluence-information-macro-note">

<span class="aui-icon aui-icon-small aui-iconfont-warning confluence-information-macro-icon"></span>

<div class="confluence-information-macro-body">

**Note:** For detailed information about how to install multiple
plug-ins, update to a specific version of a plug-ins, and install from
specific registries, see [Install
Plug-ins](https://docops.ca.com/display/CMFAAS/Install+Plug-ins).

</div>

</div>

## Set up Your CA Brightside Plug-in for IBM CICS<span style="color: rgb(36,41,46);"> Profile</span>

A `cics` profile is required to issue commands in the CICS group that
interact with CICS regions. The `cics` profile contains your host, port,
username, and password for the IBM CMCI server of your
choice. <span style="color: rgb(36,41,46);">You can create multiple
profiles and switch between them as needed.</span>

Issue the following command to create a cics
profile: 

<div class="code panel caCodePanel">

<div class="codeContent panelContent">

``` ca-code-default
bright profiles create cics <profile name> <host> <port> <user> <password>
```

</div>

</div>

<div class="confluence-information-macro confluence-information-macro-note">

<span class="aui-icon aui-icon-small aui-iconfont-warning confluence-information-macro-icon"></span>

<div class="confluence-information-macro-body">

**Note:** For more information about the` `syntax, actions, and options,
for a `profiles create` command, open CA Brightside and issue the
following command:

`bright profiles create cics -h`

</div>

</div>

<span style="color: rgb(36,41,46);">The result of the command displays
as a success or failure message. You can use your profile when you issue
commands in the `cics` command group. </span>

## CA Brightside Plug-in for IBM CICS Commands

The CA Brightside Plug-in for IBM CICS adds the following commands to CA
<span class="inline-comment-marker" data-ref="7020d758-32c8-4979-9abb-3594e92acf1e">Brightside</span>:

<div class="toc-macro rbtoc1535054542956">

  - [Define Resources to
    CICS](#id-.CABrightsidePlug-inforIBMCICSv1.0-defineDefineResourcestoCICS)
  - [Delete CICS
    Resources](#id-.CABrightsidePlug-inforIBMCICSv1.0-DeleteCICSResources)
  - [Discard CICS
    Resources](#id-.CABrightsidePlug-inforIBMCICSv1.0-DiscardCICSResources)
  - [Get CICS
    Resources](#id-.CABrightsidePlug-inforIBMCICSv1.0-GetCICSResources)
  - [Install Resources to
    CICS](#id-.CABrightsidePlug-inforIBMCICSv1.0-InstallResourcestoCICS)
  - [Refresh CICS
    Programs](#id-.CABrightsidePlug-inforIBMCICSv1.0-RefreshCICSPrograms)

</div>

### <span id="id-.CABrightsidePlug-inforIBMCICSv1.0-define" class="confluence-anchor-link"></span>Define Resources to CICS

The define command lets you define programs and transactions to CICS so
that you can deploy and test the changes to your CICS application. To
display a list of possible objects and options, issue the following
command:

<div class="code panel caCodePanel">

<div class="codeContent panelContent">

``` ca-code-default
bright cics define -h
```

</div>

</div>

**Example:**

Define a program named `myProgram` to the region named `myRegion` in the
CIC system definition (CSD) group `myGroup:`

<div class="code panel caCodePanel">

<div class="codeContent panelContent">

``` ca-code-default
bright cics define program myProgram myGroup --region-name myRegion
```

</div>

</div>

### Delete CICS Resources

The delete command lets you delete previously defined CICS programs or
transactions to help you deploy and test the changes to your CICS
application. To display a list of possible objects and options, issue
the following command:

<div class="code panel caCodePanel">

<div class="codeContent panelContent">

``` ca-code-default
bright cics delete -h
```

</div>

</div>

**Example:**

Delete a program named PGM123 from the CICS region named MYREGION:**  
**

<div class="code panel caCodePanel">

<div class="codeContent panelContent">

``` ca-code-default
bright cics delete program PGM123 --region-name MYREGION
```

</div>

</div>

### Discard CICS Resources

The discard command lets you remove existing CICS program or transaction
definitions to help you deploy and test the changes to your CICS
application. To display a list of possible objects and options, issue
the following command:

<div class="code panel caCodePanel">

<div class="codeContent panelContent">

``` ca-code-default
bright cics discard -h
```

</div>

</div>

**Example:**

Discard a program named PGM123 from the CICS region named MYREGION:**  
**

<div class="code panel caCodePanel">

<div class="codeContent panelContent">

``` ca-code-default
bright cics discard program PGM123 --region-name MYREGION
```

</div>

</div>

### Get CICS Resources

The get command lets you get a list of programs and transactions that
are installed in your CICS region so that you can determine if they were
installed successfully and defined properly. To display a list of
objects and options, issue the following command:

<div class="code panel caCodePanel">

<div class="codeContent panelContent">

``` ca-code-default
bright cics get -h
```

</div>

</div>

**Example:**

Return a list of program resources from a CICS region named MYREGION:

<div class="code panel caCodePanel">

<div class="codeContent panelContent">

``` ca-code-default
bright cis get resource CICSProgram --region-name MYREGION
```

</div>

</div>

### Install Resources to CICS

The install command lets you install resources, such as programs and
transactions, to a CICS region so that you can deploy and test the
changes to your CICS application. To display a list of possible objects
and options, issue the following command:

<div class="code panel caCodePanel">

<div class="codeContent panelContent">

``` ca-code-default
bright cics install -h
```

</div>

</div>

**Example:**

<span style="color: rgb(0,0,0);">Install a transaction named TRN1 to the
region named MYREGION in the CSD group MYGRP:</span>

<div class="code panel caCodePanel">

<div class="codeContent panelContent">

``` ca-code-default
bright cics install transaction TRN1 MYGRP --region-name MYREGION
```

</div>

</div>

### Refresh CICS Programs

The refresh command lets you refresh changes to a CICS program so that
you can deploy and test the changes to your CICS application. To display
a list of objects and options, issue the following command:

<div class="code panel caCodePanel">

<div class="codeContent panelContent">

``` ca-code-default
bright cics refresh -h
```

</div>

</div>

**Example:**

Refresh a program named PGM123 from the region named MYREGION:**  
**

<div class="code panel caCodePanel">

<div class="codeContent panelContent">

``` ca-code-default
bright cics refresh PGM123 --region-name MYREGION
```

</div>

</div>

</div>

</div>

</div>

</div>

  - <span id="n-488381753">[.CA Brightside Plug-in for IBM CICS
    v1.0](index.html)</span>
  - <span id="n-38207496">[Legal
    Notices](Legal-Notices_38207496.html)</span>

<div id="footer">

<div class="section footer-body">

Copyright © 2018 CA. All rights reserved.

<div class="footer-logo">

</div>

Document generated on Aug 23, 2018 16:02.

</div>

</div>

</div>
