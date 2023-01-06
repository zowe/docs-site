In the Zowe Desktop, multiple Apps can coexist but such Apps are treated as independent entities, and may be independently developed. To keep resources in check while allowing for Apps to depend on rich libraries, common libraries are deduplicated by having Apps refer to a collection of these libraries, considered the "Externals" bundle. This bundle is loaded on page load from `/ZLUX/plugins/org.zowe.zlux.ng2desktop/web/externals.js`. The current list of libraries that are present in this bundle is:

| Library | Version |
|---------|---------|
| '@angular/core' | 6.0.9 |
| '@angular/common' | 6.0.9 |
| '@angular/common/http' | 6.0.9 |
| '@angular/http' | 6.0.9 |
| '@angular/platform-browser' | 6.0.9 |
| '@angular/platform-browser/animations' | 6.0.9 |
| '@angular/platform-browser-dynamic' | 6.0.9 |
| '@angular/cdk/portal' | 6.3.3 |
| '@angular/material' | 6.3.3 |
| '@angular/forms' | 6.0.9 |
| '@angular/router' | 6.0.9 |
| '@angular/animations' | 6.0.9 |
| 'angular-l10n' | 5.2.0 |
| 'bootstrap' | 4.1.3 |
| 'jquery' | 3.3.1 |
| 'popper.js' | 1.14.5 |
| 'rxjs/Rx' | 6.2.2 |

The above list is derived from 3 source files: 
1) [package-lock.json](https://github.com/zowe/zlux-app-manager/blob/master/virtual-desktop/package-lock.json) for version information
2) [externals.ts](https://github.com/zowe/zlux-app-manager/blob/master/virtual-desktop/src/externals.ts) which loads the libraries into the browser at page load
3) [externals-main.ts](https://github.com/zowe/zlux-app-manager/blob/master/virtual-desktop/src/externals-main.ts) which imports libraries that were not loadable with the technique in #2

Apps that are not of type "iframe" should not use any other versions of these libraries, due to the chance for conflict to occur at runtime.
