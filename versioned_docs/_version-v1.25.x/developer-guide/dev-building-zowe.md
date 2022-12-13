
Zowe source code is organized into a number of repositories at github.com/zowe.

Individual repositories create 

The file `manifest.json.template` lists which build component pieces should be aggregated into a Zowe z/OS build.  Components pieces are collected from [https://zowe.jfrog.io](https://zowe.jfrog.io).  

### binaryDependencies 

This is a ist of the components to be pulled into the build

For example, if the entry is 
```
"org.zowe.zlux.zlux-core": {
      "version": "~1.17.0-STAGING",
      "artifact": "*.pax"
    },
```
then the build will look for a tile that starts `zlux-core` and ends in `.pax` and take the latest one.  

If the entry is,

```
"org.zowe.zlux.zlux-core": {
      "version": "1.18.0-RC",
      "repository": "libs-snapshot-local",
      "artifact": "zlux-core-1.18.0-20201208.210357.pax"
    },
```

then this is an exact match to the pax file `zlux-core-1.18.0-20201208.210357.pax` at the repository path `libs-snapshot-local`.  


| Component name | Repository Artifact |
| --------- | --------- | --------- |
| "org.zowe.zlux.zlux-core" | libs-snapshot-local | zlux-core-1.17.0-20201109.000619.pax|
| org.zowe.zlux.zss-auth" | libs-snapshot-local |  zss-auth-1.17.0-20201108.235242.pax |
| org.zowe.zlux.sample-angular-app | libs-snapshot-local | sample-angular-app-1.17.0-20201109.000055.pax |
| org.zowe.zlux.sample-iframe-app | libs-snapshot-local | sample-iframe-app-1.17.0-20201108.235404.pax | 
| org.zowe.zlux.sample-react-app | libs-snapshot-local | ample-react-app-1.17.0-20201108.235926.pax | 
| org.zowe.zlux.tn3270-ng2" | libs-snapshot-local | tn3270-ng2-1.17.0-20201108.235851.pax |
| org.zowe.zlux.vt-ng2" | libs-snapshot-local | vt-ng2-1.17.0-20201108.235839.pax |
| org.zowe.zlux.zlux-editor | libs-snapshot-local |zlux-editor-1.17.0-20201108.234456.pax |
| org.zowe.zlux.zlux-workflow | libs-snapshot-local |zlux-workflow-1.17.0-20201108.235938.pax |
| org.zowe.zlux.zosmf-auth" | libs-snapshot-local |zosmf-auth-1.17.0-20201108.235615.pax |
| org.zowe.zss | libs-snapshot-local |zss-1.17.0-rc-61-20201109155110.pax |



| org.zowe.explorer.jobs | |
| org.zowe.explorer.data.sets | |
| org.zowe.explorer-jes | |
| org.zowe.explorer-mvs | |
| org.zowe.explorer-uss | |
| org.zowe.explorer-ui-server | |
| org.zowe.apiml.sdk.zowe-install | zowe-install-1.17.1.zip | .pax/mediation/ |

| org.zowe.keyring-utilities | keyring-util-1.0.4 | .pax/keyring-util/keyring-util",

 