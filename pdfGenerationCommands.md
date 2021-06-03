```
Passing the build, running the script in console:
npx mr-pdf --initialDocsURL="http://localhost:3000/stable/getting-started/overview" --contentSelector="article" --paginationSelector=".pagination-nav__item--next > a" --excludeSelectors=".announcementBar_UUUQ,nav.navbar,.docSidebarContainer_3pwe,.docMainContainer_2pgU .col.col--3,footer.footer,.docItemContainer_2szM > .margin-vert--xl > .row > .col:first-child,.pagination-nav,.docsRating,.navbar__inner,.thin-scrollbar" --coverImage="https://zowe-docs.netlify.app/img/zowe-icon.png" --coverTitle="Zowe Documentation" --outputPDFFilename="static/zowe-docs.pdf"
```

NOTE: More info at: https://github.com/kohheepeace/mr-pdf

- initialDocsURL will be changed for different version
- outputPDFFilename will be changed for different version

```
Passing an online link, running the script in console:
npx mr-pdf --initialDocsURL="https://zowe-docs.netlify.app/stable/getting-started/overview/" --contentSelector="article" --paginationSelector=".pagination-nav__item--next > a" --excludeSelectors=".announcementBar_UUUQ,nav.navbar,.docSidebarContainer_3pwe,.docMainContainer_2pgU .col.col--3,footer.footer,.docItemContainer_2szM > .margin-vert--xl > .row > .col:first-child,.pagination-nav,.docsRating,.navbar__inner,.thin-scrollbar" --coverImage="https://zowe-docs.netlify.app/img/zowe-icon.png" --coverTitle="Zowe Documentation" --outputPDFFilename="static/zowe-docs.pdf"
```

```
Passing the build, running docs:pdf:
npx mr-pdf --initialDocsURL=\"http://localhost:3000/stable/getting-started/overview\" --contentSelector=\"article\" --paginationSelector=\".pagination-nav__item--next > a\" --excludeSelectors=\".announcementBar_UUUQ,nav.navbar,.docSidebarContainer_3pwe,.docMainContainer_2pgU .col.col--3,footer.footer,.docItemContainer_2szM > .margin-vert--xl > .row > .col:first-child,.pagination-nav,.docsRating,.navbar__inner,.thin-scrollbar\" --coverImage=\"http://localhost:3000/img/zowe-icon.png\" --coverTitle=\"Zowe Documentation\" --outputPDFFilename=\"static/zowe-docs.pdf\"
```

```
Passing online link, running docs:pdf:
npx mr-pdf --initialDocsURL=\"https://zowe-docs.netlify.app/stable/getting-started/overview/\" --contentSelector=\"article\" --paginationSelector=\".pagination-nav__item--next > a\" --excludeSelectors=\".announcementBar_UUUQ,nav.navbar,.docSidebarContainer_3pwe,.docMainContainer_2pgU .col.col--3,footer.footer,.docItemContainer_2szM > .margin-vert--xl > .row > .col:first-child,.pagination-nav,.docsRating,.navbar__inner,.thin-scrollbar\" --coverImage=\"https://zowe-docs.netlify.app/img/zowe-icon.png\" --coverTitle=\"Zowe Documentation\" --outputPDFFilename=\"static/zowe-docs.pdf\"
```
