In the Zowe Desktop, multiple Apps can coexist but such Apps are treated as independent entities, and may be independently developed. To keep resources in check while allowing for Apps to depend on rich libraries, common libraries are deduplicated by having Apps refer to a collection of these libraries, considered the "Externals" bundle. This bundle is loaded on page load from `/ZLUX/plugins/org.zowe.zlux.ng2desktop/web/externals.js`. The current list of libraries that are present in this bundle is:

| Library | Version |
|---------|---------|
| '@angular/animations' | 12.0.0 |
| '@angular/cdk' | 12.0.0 |
| '@angular/core' | 12.0.0 |
| '@angular/common' | 12.0.0 |
| '@angular/common/http' | 12.0.0 |
| '@angular/forms' | 12.0.0 |
| '@angular/platform-browser' | 12.0.0 |
| '@angular/cdk/portal' | 12.0.0 |
| '@angular/material' | 12.0.0 |
| '@angular/router' | 12.0.0 |
| 'angular-l10n' | 12.0.0 |
| 'bootstrap' | 4.3.1 |
| 'corejs' | 3.19.2 |
| 'jquery' | 3.6.0 |
| 'popper.js' | 1.14.7 |
| 'rxjs' | 6.6.0 |

The above list is derived from 3 source files. Please consult them for up-to-date information: 
1) [package-lock.json](https://github.com/zowe/zlux-app-manager/blob/v2.x/master/virtual-desktop/package-lock.json) for version information
2) [externals.ts](https://github.com/zowe/zlux-app-manager/blob/v2.x/master/virtual-desktop/src/externals.ts) which loads the libraries into the browser at page load
3) [externals-main.ts](https://github.com/zowe/zlux-app-manager/blob/v2.x/master/virtual-desktop/src/externals-main.ts) which imports libraries that were not loadable with the technique in #2

Apps that are not of type "iframe" should not use any other versions of these libraries, due to the chance for conflict to occur at runtime.
