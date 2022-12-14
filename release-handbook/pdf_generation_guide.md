# Generate PDF

## Steps to manually generate PDF [Recommended]

1. Run the command to install project dependencies: `npm install`
2. Run the script to generate PDF using an online deployed links. (The script fetch the pages from https://docs.zowe.org):
```
npx mr-pdf --initialDocURLs="https://docs.zowe.org/stable/getting-started/overview,https://docs.zowe.org/stable/user-guide/install-overview,https://docs.zowe.org/stable/user-guide/zowe-getting-started-tutorial,https://docs.zowe.org/stable/extend/extend-zowe-overview,https://docs.zowe.org/stable/troubleshoot/troubleshooting,https://docs.zowe.org/stable/contribute/roadmap-contribute,https://docs.zowe.org/stable/appendix/zowe-cli-command-reference" --contentSelector="article" --paginationSelector=".pagination-nav__item--next > a" --excludeSelectors=".announcementBar_UUUQ,nav.navbar,.docSidebarContainer_3pwe,.docMainContainer_2pgU .col.col--3,footer.footer,.docItemContainer_2szM > .margin-vert--xl > .row > .col:first-child,.pagination-nav,.docsRating,.navbar__inner,.thin-scrollbar" --coverImage="https://docs.zowe.org/img/zowe-icon.png" --coverTitle="Zowe Documentation" --outputPDFFilename="static/zowe-docs.pdf"
```

## Steps to automatically generately PDF [Potential Issue]

1. Run the command to install project dependencies: `npm install`
2. Run `npm start` to view the site locally
3. Run `npm run docs:pdf` to pass the local site & generate PDF. 

NOTE: A [community plugin](https://github.com/kohheepeace/mr-pdf) is being used to generate the PDFs, which contain some bugs.
Currently internal links within the PDF are redirecting to the online site if PDF generated uses online deployed links.
If local build is passed to generate the PDF. The internal links redirect to localhost://3000/page .

Related issue: https://github.com/kohheepeace/mr-pdf/issues/18
Once this issue has been resolved we shall use Jenkins to leverage the PDF pipeline.