# Issue #4442: Issue with docs.zowe.org/v2.18.x/troubleshoot/cli/cli-use-curl-to-troubleshoot/

**URL:** https://github.com/zowe/docs-site/issues/4442

**Created:** 2025-05-14T15:32:17Z

**Updated:** 2025-07-02T18:44:59Z

**Labels:** area: cli, priority-low

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

curl --location --request PUT "https://lpar.hostname.net:443/zosmf/restfiles/ds/IBMUSER.TEST.PDS(HELLO)" --header "X-CSRF-ZOSMF-HEADER;" --header "X-IBM-Data-Type: binary" --insecure --user "ibmuser:password" --data @hello.txt

please explain or  put a link to ...

what --header "X-IBM-Data-Type: binary"  is 

what --data @hello.txt is
(man curl says  for --date if you start the data with the letter @, the rest should be a file name to read the
              data  from,  or - if you want curl to read the data from stdin. Posting data from a
              file named 'foobar' would thus be done with -d, --data @foobar. When -d, --data  is
              told to read from a file like that, carriage returns and newlines are stripped out.

So what is in the file hello.txt ?


## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

