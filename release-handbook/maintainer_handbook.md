# Maintainer handbook

- [Tagging a new version](#tagging-a-new-version)
- [Building the docs for production](#building-the-docs-for-production)
- [Testing the build locally](#testing-the-build-locally)
- [Removing archived version](#removing-archived-version)
- [How to update the homepage?](#how-to-update-the-homepage)

## Tagging a new version

- First, make sure your content in the docs directory is ready to be frozen as a version. A version always should be based from master.
- Search all instances of `<a href="/stable/web_help/index.html" target="_blank">` & replace `stable` with current latest version before adding the new version. Example: `<a href="/v1.22.x/web_help/index.html" target="_blank">`.
- Search all instaces of `<a href="/stable/CLIReference_Zowe.pdf" target="_blank">` & replace `stable` with current latest version before adding the new version. Example: `<a href="/v1.22.x/CLIReference_Zowe.pdf" target="_blank">`.
- Search all instaces of `<a href="/stable/zowe_web_help.zip" target="_blank">` & replace `stable` with current latest version before adding the new version. Example: `<a href="/v1.22.x/zowe_web_help.zip" target="_blank">`.
  Note: All the instances will be only present in `/docs` directory only.

- Enter a new version number and run the following command:

  ```
  npm run docusaurus docs:version v1.23.x
  ```
  Tagging a new version, the document versioning mechanism will:

  - Copy the full `docs/` folder contents into a new `versioned_docs/version-<version>/` folder.
  - Create a versioned sidebars file based from your current sidebar configuration - saved as `versioned_sidebars/version-<version>-sidebars.json`.
  - Append the new version number to `versions.json`.

- Add the new version's **Zowe Third Party Library Usage guide** in `/tpsr` directory. Example: `tpsr/tpsr-v1.23.x.md`.
- Create a empty directory with a name of **Previous version** `v1.22.x` in `/static`. Example: `static/v1.22.x`.
- Copy all contents of `/static/stable` in the **Previous version's** empty directory in the above step like `/static/v1.22.x`.
- Add the new version's static files in `/static/stable`.
- Change the `LATEST_VERSION` variable present in `/docusaurus.config.js` to a new version.
- Navigate to the `/docusaurus.config.js` file and locate the `presets:` > `@docusaurus/preset-classic"` > `docs` > `versions`.

  Create a **Previous version's** entry label. Example: if version `v1.22.x` docs is getting updated to `v1.23.x`. Then `v1.22.x` will be appended between `current` & `v1.21.x` in the following format:

  ```
  current: {
    path: "stable",
    label: `${LATEST_VERSION}` + " LTS",
  },
  "v1.22.x": { 
    label: "v1.22.x LTS",
  },
  "v1.21.x": {
    label: "v1.21.x LTS",
  },
  ```

- **NOTE:** It's recommended to remove the oldest archived version every time a new version is added to minimize the build time.
The steps are mentioned in [Removing archived version](#removing-archived-version).

## Building the docs for production

You can build the docs with this command:

```
npm run build
```

## Testing the build locally

Once `npm run build` finishes, the static files will be generated within the build directory.

You can test the build using this command:

```
npm run serve
```

Now you will be able to visit `http://localhost:3000/` to check the content.

## Removing archived version

Removing archived version is necessary once two new versions are released to reduce total deploy & build time. It is advisable to keep latest **8-9 versions only** in the master branch to avoid build failure.

- Remove the specific version from `/versions.json` file.
- Delete the specific complete version folder from `/versioned_docs` directory. Example: `versioned_docs/version-v1.17.x.`
- Delete the versioned sidebars JSON file from `/versioned_sidebars`. Example: `versioned_sidebars/version-v1.17.x-sidebars.json`.
- Delete the specific version's static files from `/static` directory. Example: `static/v1.17.x`.
- Add the specific version entry in `versionsArchived.json` file. Example: `"v1.17.x LTS": "https://zowe-archived-docs.netlify.app/v1.17.x/getting-started/overview"`.
- Navigate to the `/docusaurus.config.js` file and locate the `presets:` > `@docusaurus/preset-classic"` > `docs` > `versions`.
  Delete the definition of that version which is specified in the following format:

  ```
   "v1.17.x": {
     label: "v1.17.x LTS",
   },
  ```

## How to update the homepage?

### About this task

Homepage is composed of the following sections:
- Header
- Banner
  - Zowe Docs
  - Search Bar
- Components
  - Popular Resources
  - Explore Content
  - Discover Your Path
  - Featured Topics
  - Downloadable Files
- Footer

The icons used in all the sections are stored in the `./staic/img` folder. To update the icons, replace with the updated icons with the same name.

### Updating the navigation elements in the header section

1. Navigate to the `/docusaurus.config.js` file and locate the `themeConfig:` > `Items` section.
   The definition of each navigation is specified in the following format:

   ```
   {
      type: "",
      label: "",
      docId: "",
      position: "",
    },
   ```

1. Edit the variables within the `{ }` section of each navigation element.
   For example, to add a navigation element named `Command Reference`, add the following code snippet under the `Items` section.

   ```
   {
      type: "Doc",
      label: "Command Reference",
      docId: "appendix/zowe-cli-command-reference",
      position: "left",
    },
   ```

### Updating Banner: Zowe Docs
- To update the content:
    Navigate to the `/docusaurus.config.js` directory and change the **title** field:
    ```
    module.exports = {
      title: "Zowe Docs",
    ```

- To update the CSS:
  1. Navigate to the `/src/pages/styles.module.css` directory and change the **.heroBanner** submodule:

  ```
  .heroBanner {
  padding: 4rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  background-color: var(--ifm-color-primary);
  color: #ffffff;
  }
  ```

  2. Navigate to the `/src/css/custom.css` directory and change the **.hero__title** submodule.

  ```
  .hero__title {
    font-size: 4rem !important;
    padding-bottom: 3rem;
  }
  ```

### Updating Banner: Search Bar

Navigate to the `/src/css/custom.css` directory and change the **.searchDiv** and **.searchDiv .DocSearch-Button** submodules.

```
/* Landing Page Search Bar */
.searchDiv {
  margin: auto;
  width: calc(var(--ifm-container-width) / 12 * 7);
 }

.searchDiv .DocSearch-Button {
  margin: auto;
  width: 70%;
  height: 45px;
  padding: 0 20px;
  border-radius: 10px;
  color: var(--docsearch-text-color);
 }

[data-theme="dark"] .searchDiv .DocSearch-Button {
  color: var(--docsearch-muted-color);
  }
```

### Updating Components

Each component has an independent subfolder in the `/src/components` directory. Each subfolder contains a `.js` file and a `.css` file to control the content and style for each component.

```
├── src
│   └── pages
│       └──components
│           ├──DiscoverYourPath
│           ├──DownloadableFiles
│           ├──ExploreContent
│           ├──FeaturedTopics
└           └─PopularResources
```

For example:

To update the hyperlink to `Download Zowe` in the the **Popular Resources** section:

1. Navigate to the `/src/components/PopularResources` directory and locate the `PopularResources.js` file.

1. Find the `title: "Download Zowe"` line to identify the right location and update its `link` variable.

```
{
    title: "Download Zowe",
    link: "https://www.zowe.org/download.html",
    icon: "img/download_zowe-icon.png",
    description: (
      <>
        Zowe has both server and client components, which you can install
        independently.
      </>
    ),
  },
```

#### Updating the **Popular Resources** section

**File location: `/src/components/PopularResources/PopularResources.js`.**

- Update the font size of 'Popular Resources'.
```
<h4 className="padding-top--lg container-h4">
  Popular resources
</h4>
```
- Update the height and width of the icons. The current size is 70px*70px.
```
function Resource({ title, link, icon, description }) {
  return (
    <div className={clsx("col col--4 padding--lg", styles.posRelative)}>
      <img
        className="margin-left--xs"
        alt="icons"
        style={{ height: "70px", width: "70px" }}
        src={useBaseUrl(icon)}
      />
      <p>{description}</p>
      <a className={clsx("margin-top--sm", styles.posAbsolute)} href={link}>
        {title}
      </a>
    </div>
  );
}
```
- Update the contents and links of `Dowload Zowe` and `Try Zowe`.
```
const data = [
  {
    title: "Download Zowe",
    link: "https://www.zowe.org/download.html",
    icon: "img/download_zowe-icon.png",
    description: (
      <>
        Zowe has both server and client components, which you can install
        independently.
      </>
    ),
  },
  {
    title: "Try Zowe",
    link: "https://www.ibm.com/account/reg/us-en/signup?formid=urx-38870",
    icon: "img/try_zowe-icon.png",
    description: <>Get your hands on a Zowe trial on demand at no charge.</>,
  },
];
```
- Update the overview video.
```
<div
  className={clsx(
    "col col--4 padding--lg display-flex",
    styles.posRelative
  )}
>
  <iframe
    src="https://www.youtube.com/embed/7XpOjREP8JU"
    className={clsx(styles.responsiveIframe)}
    title="Introduction to Zowe"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
  <a
    className={clsx("margin-top--sm", styles.posAbsolute)}
    href="https://www.youtube.com/embed/7XpOjREP8JU"
  >
    Get an overview of Zowe
  </a>
</div>
</div>
```

#### Updating the Explore Content section

**File location: `/src/components/ExploreContent/ExploreContent.js`**

- Update the font size of 'Explore Content'.
```
<div className={clsx("col col--2")}>
  <h3 className="container-h3">Explore Content</h3>
</div>
```
- Update the cards of the first row in the `const firstDataRow = [ ]` code snippet.
```
const firstDataRow = [
  {
    title: "Getting Started",
    icon: "img/get_started-icon.png",
    link: "stable/getting-started/overview",
    description: (
      <>
        Learn about Zowe™ architecture, components, and how to quickly get
        started with Zowe. Read about what's new and changed in the Release
        Notes, FAQs.
      </>
    ),
  },
  ];
```
- Update the cards of the second row in the `const secondDataRow = [ ]` code snippet.

#### Updating the Discover your path section

**File location: `/src/components/DiscoverYourPath/DiscoverYourPath.js`**

The section of Discover your path is arranged in three columns. The first column is used for the `I want to...` subsection, and the second and third columns is used for the 'I'm interested in...' subsection. To change the link and content, update the following code snippet.
```
const firstSection = [
];
const secondSection = [
];
const thirdSection = [
];
```

#### Updating the Featured Topics section

**File location: `/src/components/FeaturedTopics/FeaturedTopics.js`**

The section of Featured Topics is arranged in three rows. To change the link and content, update the following code snippet.
```
const firstSection = [
];
const secondSection = [
];
const thirdSection = [
];
```

### Updating the footer section

1. Navigate to the `/docusaurus.config.js` file and locate the `footer:{ } ` section.
1. Edit the variables.
For example, to update the `Products` section, edit the variables in the following code snippet.
```
{
  title: "Products",
  items: [
    {
      label: "Download",
      href: "https://www.zowe.org/download.html",
    },
    {
      label: "Try Zowe",
      href: "https://www.openmainframeproject.org/projects/zowe/ztrial",
    },
    {
      label: "Features",
      href: "https://docs.zowe.org/stable/getting-started/overview.html",
    },
  ],
},
```

