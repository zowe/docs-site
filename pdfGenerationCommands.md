```
Passing the build, running the script in console:
npx mr-pdf --initialDocURLs="http://localhost:3000/stable/getting-started/overview,http://localhost:3000/stable/user-guide/installandconfig,http://localhost:3000/stable/extend/extend-zowe-overview,http://localhost:3000/stable/troubleshoot/troubleshooting,http://localhost:3000/stable/contribute/roadmap-contribute,http://localhost:3000/stable/appendix/zowe-cli-commannd-reference" --contentSelector="article" --paginationSelector=".pagination-nav__item--next > a" --excludeSelectors=".announcementBar_UUUQ,nav.navbar,.docSidebarContainer_3pwe,.docMainContainer_2pgU .col.col--3,footer.footer,.docItemContainer_2szM > .margin-vert--xl > .row > .col:first-child,.pagination-nav,.docsRating,.navbar__inner,.thin-scrollbar" --coverImage="http://localhost:3000/img/zowe-icon.png" --coverTitle="Zowe Documentation" --outputPDFFilename="static/zowe-docs.pdf"
```

NOTE: More info at: https://github.com/kohheepeace/mr-pdf

- initialDocsURL will be changed for different version
- outputPDFFilename will be changed for different version

```
Passing an online link, running the script in console:
npx mr-pdf --initialDocURLs="https://zowe-docs.netlify.app/stable/getting-started/overview,https://zowe-docs.netlify.app/stable/user-guide/installandconfig,https://zowe-docs.netlify.app/stable/extend/extend-zowe-overview,https://zowe-docs.netlify.app/stable/troubleshoot/troubleshooting,https://zowe-docs.netlify.app/stable/contribute/roadmap-contribute,https://zowe-docs.netlify.app/stable/appendix/zowe-cli-commannd-reference" --contentSelector="article" --paginationSelector=".pagination-nav__item--next > a" --excludeSelectors=".announcementBar_UUUQ,nav.navbar,.docSidebarContainer_3pwe,.docMainContainer_2pgU .col.col--3,footer.footer,.docItemContainer_2szM > .margin-vert--xl > .row > .col:first-child,.pagination-nav,.docsRating,.navbar__inner,.thin-scrollbar" --coverImage="https://zowe-docs.netlify.app/img/zowe-icon.png" --coverTitle="Zowe Documentation" --outputPDFFilename="zowe-docs.pdf"
```

```
Passing the build, running docs:pdf:
npx mr-pdf --initialDocURLs=\"http://localhost:3000/stable/getting-started/overview,http://localhost:3000/stable/user-guide/installandconfig,http://localhost:3000/stable/extend/extend-zowe-overview,http://localhost:3000/stable/troubleshoot/troubleshooting,http://localhost:3000/stable/contribute/roadmap-contribute,http://localhost:3000/stable/appendix/zowe-cli-commannd-reference\" --excludeURLs=\"\" --contentSelector=\"article\" --paginationSelector=\".pagination-nav__item--next > a\" --excludeSelectors=\".announcementBar_UUUQ,nav.navbar,.docSidebarContainer_3pwe,.docMainContainer_2pgU .col.col--3,footer.footer,.docItemContainer_2szM > .margin-vert--xl > .row > .col:first-child,.pagination-nav,.docsRating,.navbar__inner,.thin-scrollbar\" --coverImage=\"http://localhost:3000/img/zowe-icon.png\" --coverTitle=\"Zowe Documentation\" --outputPDFFilename=\"static/zowe-docs.pdf\"
```

```
Passing online link, running docs:pdf:
npx mr-pdf --initialDocURLs=\"https://zowe-docs.netlify.app/stable/getting-started/overview/\" --contentSelector=\"article\" --paginationSelector=\".pagination-nav__item--next > a\" --excludeSelectors=\".announcementBar_UUUQ,nav.navbar,.docSidebarContainer_3pwe,.docMainContainer_2pgU .col.col--3,footer.footer,.docItemContainer_2szM > .margin-vert--xl > .row > .col:first-child,.pagination-nav,.docsRating,.navbar__inner,.thin-scrollbar\" --coverImage=\"https://zowe-docs.netlify.app/img/zowe-icon.png\" --coverTitle=\"Zowe Documentation\" --outputPDFFilename=\"static/zowe-docs.pdf\"
```
