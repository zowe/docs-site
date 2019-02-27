# Building PDF Version of Zowe Docs

## Prerequisites

- [Docker](https://www.docker.com/get-started),
- Mac OS X, Linux or Unix system which can run bash script.

## Build PDF

Launch the build script with command `npm run docs:pdf`. The build result will be put into `.deploy/.pdf/out` folder if there are no errors.

To update what should be included in PDF document, go ahead edit `../.vuepress/config.js` `ALL_PAGES` property. You can use `hideInPdf: true,` switch to hide a certain page from putting into PDF.

## Steps During the Build Process

Inside the build script, there are several steps:

- Prepare the build temporary folders,
- Generate DITA map from 
- Transform original Markdown (.md) files into CommonMark format,
- Run DITA-OT to generate PDF file.

## References:

- [DITA Open Toolkit](https://www.dita-ot.org/)
- [ditaot/dita-ot-base](https://hub.docker.com/r/ditaot/dita-ot-base/)
- [DITA XML](https://dita.xml.org/)
- [CommonMark](https://commonmark.org/)
