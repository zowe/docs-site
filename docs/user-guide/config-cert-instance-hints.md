Hints about creating the certificate and instance when configuring Zowe.

When you are configuring Zowe on z/OS, you need to create certificates, and then create the Zowe instance.

### Creating certificates

We recommend that you re-create the certificates after every Zowe upgrade.
The creation of the certificates is controlled by the `zowe-setup-certificates.env` file, and you should have placed a copy of that file in your instance directory INSTANCE_DIR.  
1.	 Keystore: Pick a location for where you want the setup script to place the keys it generates, and specify this in your copy of the  `zowe-setup-certificates.env` file
```
 KEYSTORE_DIRECTORY=/my/zowe/instance/keystore
```

2.	Hostname and IP address: These are set by the following keywords in `zowe-setup-certificates.env`
```
HOSTNAME= 
IPADDRESS=
```
The certificates require the HOSTNAME to be the alphabetic hostname.  Numeric hostnames such as an IP address are not allowed.
The `zowe-setup-certificates.sh` script will attempt to discover the IP address and hostname of your system if you leave these unset in `zowe-setup-certificates.env`.  
On systems with their own internal IP domain, the hostname might not resolve to the external IP address.  This happens on ZD&T ADCD-derived systems, where the hostname is 
usually S0W1.DAL-EBIS.IHOST.COM which resolves to 10.1.1.2.  When the script cannot determine the hostname or the external IP address, it will ask the user to enter the IP address manually during the dialog.  If 
you have not specified a value for HOSTNAME in `zowe-setup-certificates.env` then the script will use the given IP address as the hostname also.  This will fail, because certificates cannot have a numeric hostname.
Therefore it is essential that you specify an alphabetic hostname such as
```
HOSTNAME=S0W1.DAL-EBIS.IHOST.COM 
```
on ZD&T systems like these, before you run `zowe-setup-certificates.sh`.
The values of HOSTNAME and IPADDRESS that the script discovered are appended to the `zowe-setup-certificates.env` 
file unless they were already set in that file or as shell environment variables before you ran the script.  

### Creating an instance

The creation of an instance is controlled by the `instance.env` file in your INSTANCE_DIR.  
1.	Keystore: Edit this file to set the keystore directory to the one you created when you ran `zowe-setup-certificates.sh` .
The keyword and value in `instance.env`  should be the same as in `zowe-setup-certificates.env`, as shown below
```
 	KEYSTORE_DIRECTORY=/my/zowe/instance/keystore
```

2.	Hostname and IP address:  The ` zowe-configure-instance.sh ` script handles the IP address and hostname the same way `zowe-setup-certificates.sh` does.  
In ` instance.env `  you specify the IP address and hostname using these keywords
```
ZOWE_EXPLORER_HOST=
ZOWE_IP_ADDRESS= 
```
The ZOWE_EXPLORER_HOST must resolve to the external IP address, otherwise you should use the external IP address as ZOWE_EXPLORER_HOST.   
The ` zowe-configure-instance.sh ` script will attempt to discover the IP address and hostname of your system if you leave these unset.  
When the script cannot determine the hostname or the IP address, it will ask the user to enter the IP address manually during the dialog.  If 
you have not specified a value for ZOWE_EXPLORER_HOST then the script will use the IP address as the hostname also.  
The values of ZOWE_EXPLORER_HOST and ZOWE_IP_ADDRESS
that the script discovered are appended to the ` instance.env `  
file unless they were already set in that file or as shell environment variables before you ran the script.  

