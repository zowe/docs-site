# Unable to list NetView Domain or Canzlog

Use this information to solve the problem when you are unable to list NetView® Domain or Canzlog.

## Problem

When you execute @bnz nd list or @bnz nd list canzlog --dn <NetView Domain\>, you might get the following response from the bot user:

```
Uh-oh, I can't retrieve the backend data for you. The error message I got is: BNZCOM001E: Error occurred when retrieve data from backend.
```

## Cause

When querying NetView Domain or Canzlog, Z ChatOps will get this data from SMU by using the functional user, for example, **eezdmn**. If you didn’t save your credential of your NetView Rest Server in SMU credential store, you get this error.

## Symptom

You might see logs in $ZCHATOPS\_HOME/logs/nohup.out as below:

```
[ERROR] BNZCOM001E: Error occurred when retrieve data from backend. 
 SMU Exception details: <p><b>EEZU0720E</b> NetView domain is not accessible at this moment.</p><p><b>Explanation</b>: Possible causes:
 1) User has no access token.
 2) User has no user credential.</p><p><b>User Action</b>: Log in NetView Domain.</p> 
```

## Solution

1.  Log in to your SMU web console by using your configured functional user, which usually is **eezdmn**.
2.  Click **Administration** \> **Explore NetView Domains** to open **Explore NetView Domain** page.
3.  Input your user ID and password to log in to the NetView Rest API Server, and mare sure **Save in credential store** is selected. Click **OK** button to make sure login successfully.
4.  Log out SMU web console.
5.  Log in SMU web console using the same configured function user, launch **Explore NetView Domain** page again, and make sure you can list your NetView Domain in SMU.

**Parent topic:**[Troubleshooting](chatops_ts_ts.md)

