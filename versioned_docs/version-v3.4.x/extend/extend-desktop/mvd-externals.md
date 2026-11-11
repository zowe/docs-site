In the Zowe Desktop, multiple Apps can coexist but such Apps are treated as independent entities, and may be independently developed. To keep resources in check while allowing for Apps to depend on rich libraries, common libraries are deduplicated by having Apps refer to a collection of these libraries, considered the "Externals" bundle. This bundle is loaded on page load from `/ZLUX/plugins/org.zowe.zlux.ng2desktop/web/main.js`. The current list of libraries that are present in this bundle is:

| Library | Version |
|---------|---------|
| '@angular/animations' | 18.0.0 |
| '@angular/cdk' | 18.0.0 |
| '@angular/core' | 18.0.0 |
| '@angular/common' | 18.0.0 |
| '@angular/common/http' | 18.0.0 |
| '@angular/forms' | 18.0.0 |
| '@angular/platform-browser' | 18.0.0 |
| '@angular/cdk/portal' | 18.0.0 |
| '@angular/material' | 18.0.0 |
| '@angular/router' | 18.0.0 |
| 'angular-l10n' | 18.0.0 |
| 'bootstrap' | 5.3.2 |
| 'corejs' | 3.38.1 |
| 'popper.js' | 1.14.7 |
| 'rxjs' | 7.8.1 |

The above list is derived from 3 source files. Please consult them for up-to-date information: 
1) [package-lock.json](https://github.com/zowe/zlux-app-manager/blob/v3.x/staging/virtual-desktop/package-lock.json) for version information
2) [desktop.ts](https://github.com/zowe/zlux-app-manager/blob/v3.x/staging/virtual-desktop/src/desktop.ts) which loads the libraries into the browser at page load
3) [webpack5.base.js](https://github.com/zowe/zlux-app-manager/blob/v3.x/staging/virtual-desktop/plugin-config/webpack5.base.js) which is an example of how a plugin may depend upon these libraries without including them, via the "externals" configuration object.

Apps that are not of type "iframe" should not use any other versions of these libraries, due to the chance for conflict to occur at runtime.
