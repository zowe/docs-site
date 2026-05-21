# Issue #4115: Issue with docs.zowe.org/stable/user-guide/configuring-zowe-via-jcl

**URL:** https://github.com/zowe/docs-site/issues/4115

**Created:** 2025-02-02T17:32:06Z

**Updated:** 2025-03-14T12:21:58Z

**Labels:** type: bug, area: install and config, release: V3, Size: M

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
Problems with IBMUSER.ZWEV3A.SZWESAMP(ZWEGENER)  

I get 

ISPSTART CMD(%ZWEGEN00 nogenerate noverbose )                                           
ISPF system data set allocation error - press Enter to continue.                        
Log file allocation error - ISPF will operate without a log data set.                   
Data set 'COLIN.S0W1.SPFLOG1.LIST' in use by another user, try later.       

You need

//ISPLIST DD SYSOUT=*, 
// DCB=(LRECL=121,BLKSIZE=1210,RECFM=FBA) 
//ISPLOG DD SYSOUT=*, 
// DCB=(LRECL=125,BLKSIZE=129,RECFM=VA)             
_____________________________________________________
I also got message

CEE3608I The following messages pertain to the invocation command run-time options.    ... 
there were no following messages... what am I meant to do ?
_________________________________________________

I specified 

//MYCONFIG DD   *,DLM=$$ 
FILE /u/tmp/zowec/example1.yaml 
FILE /u/tmp/zowec/example2.yaml 
$$ 

example1 had 
zowe: 
                                                                                         
  setup: 
    # MVS data set related configurations 
    dataset: 
      # **COMMONLY_CUSTOMIZED** 
      # where Zowe MVS data sets will be installed 
      prefix: IBMUSER.ZWEV3A 
      # **COMMONLY_CUSTOMIZED** 
      # PROCLIB where Zowe STCs will be copied over 
      proclib: USER.PROCLIB 
      # **COMMONLY_CUSTOMIZED** 
      # Zowe PARMLIB 
      parmlib: IBMUSER.ZWEV3A.CUST.PARMLIB 
      # Holds Zowe PARMLIB members for plugins 
      parmlibMembers: 
        # For ZIS plugins 
        zis: ZWESIP00 
      # **COMMONLY_CUSTOMIZED** 
      # JCL library where Zowe will store temporary JCLs during initialization 
      jcllib: IBMUSER.ZWEV3A.CUST.JCLLIB 
      # Utilities for use by Zowe and extensions 
      loadlib: IBMUSER.ZWEV3A.SZWELOAD 
      # APF authorized LOADLIB for Zowe 
      authLoadlib: IBMUSER.ZWEV3A.SZWEAUTH 
      # **COMMONLY_CUSTOMIZED** 
      # APF authorized 


and example2 had

      security: 
        product: RACF 
        groups: 
          admin: ZWEADMIN 
          stc: ZWEADMIN 
          sysProg: ZWEADMIN 
        users: 
          zowe: ZWESVUSR 
          zis: ZWESIUSR 
        stcs: 
          zowe: ZWESLSTC 
          zis: ZWESISTC 
          aux: ZWESASTC 
                                                

I got  (quite rightly)

validateStatus=4                                                                  
Validity Exceptions(s) with object at                                             
  unspecified additional property not allowed: 'security' at '/security'          
******************************** BOTTOM OF DATA ********************************** 


I need some more words to explain what multiple files look like

I tried example2 with

zowe: 
      # Security related configurations. This setup is optional. 
      security: 
        # security product name. Can be RACF, ACF2 or TSS 
        product: RACF 
        # security group name 
        groups: 


I eventually found I needed

zowe: 
      # Security related configurations. This setup is optional. 
  setup: 
      security: 
        # security product name. Can be RACF, ACF2 or TSS 
        product: RACF 
        # security group name 


So all of the steps in the heirrchy

 you need to say that if the same definition is in multiple files the first/last take precedence




## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

## Validation Status: ❌ STILL OPEN

**Validation Date:** 2026-05-20

**Validator:** Mistral Vibe

**Findings:** The issue is **STILL VALID** and reveals multiple documentation gaps.

**User's Problems:**
1. ISPF dataset allocation errors when running `SZWESAMP(ZWEGENER)` - needs `ISPLIST` and `ISPLOG` DD statements
2. CEE3608I message with no following messages (unclear guidance)
3. Issues using multiple configuration files with `//MYCONFIG DD` and `FILE` statements
4. Validation errors when using `security:` configuration (needs to be nested under `setup:`)
5. No explanation of precedence rules for multiple configuration files

**Current Documentation State:**
- `docs/user-guide/configuring-zowe-via-jcl.md`:
  - Explains that `ZWEGENER` validates `zowe.yaml` and prepares JCL
  - Lists JCL samples and their purposes
  - **MISSING:** ISPF dataset requirements for ZWEGENER
  - **MISSING:** How to use `//MYCONFIG DD` with multiple files
  - **MISSING:** CONFIG= parameter syntax for JCL
  - **MISSING:** Common validation errors and fixes
- `docs/user-guide/configmgr-using.md`:
  - **HAS:** Information about multiple configuration files and precedence rules
  - **HAS:** `CONFIG=FILE(file1):FILE(file2)` syntax
  - **BUT:** Not referenced from the JCL configuration page

**What's Missing:**
1. **ISPF Requirements:** No mention that `ZWEGENER` requires ISPLIST and ISPLOG DD statements to avoid allocation errors
2. **Multiple Files in JCL:** No documentation on how to use `//MYCONFIG DD` with multiple files
3. **Precedence Rules:** Precedence rules exist in `configmgr-using.md` but aren't cross-referenced from `configuring-zowe-via-jcl.md`
4. **Validation Errors:** No documentation on common validation errors (e.g., `security:` must be under `setup:`)
5. **CEE3608I:** No explanation of this message and how to resolve it

**Assessment:** The user encountered real problems that the documentation doesn't address. The page needs significant updates to cover these scenarios.

**Recommendation:** KEEP OPEN. The documentation should be enhanced with:
1. ISPF dataset allocation requirements for ZWEGENER
2. Clear examples of using multiple configuration files with both `CONFIG=` parameter and `//MYCONFIG DD`
3. Cross-reference to `configmgr-using.md` for precedence rules
4. Common validation errors and their fixes (e.g., proper YAML nesting)
5. Explanation of common runtime messages like CEE3608I

