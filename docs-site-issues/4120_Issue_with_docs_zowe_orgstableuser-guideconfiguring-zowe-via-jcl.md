# Issue #4120: Issue with docs.zowe.org/stable/user-guide/configuring-zowe-via-jcl/

**URL:** https://github.com/zowe/docs-site/issues/4120

**Created:** 2025-02-03T07:02:07Z

**Updated:** 2025-03-14T12:16:55Z

**Labels:** type: bug, area: install and config, release: V3, Size: M

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

Member 
IBMUSER.ZWEV3A.CUST.JCLLIB(ZWEIRAC)

adds the same group twice 

ADDGROUP ZWEADMIN OMVS(AUTOGID) - 
 DATA('ZOWE ADMINISTRATORS') 
 -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  
ADDGROUP ZWEADMIN OMVS(AUTOGID) - 
__________________________
Question why do we need a started task userid ZWESIUSR and ZWESVUSR.  Please explain why we need two userids.

________________________________________

The doc says

Zowe requires a user ID ZWESVUSR  ...  is this true ?  can I use another userid or must it be ZWEVUSR.   If I define a second ZOWE instance, must it use the same userid?

_______________________________________________


The RACF member has 

  ADDGROUP IBMUSER.ZWEV3A DATA('Zowe - HLQ STUB') 

which fails because it is not an 8 char string.

## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

