# Maintainer handbook

### Building the docs for production

You can build the docs with this command:

```
npm run build
```

All build results will be put under the `.deploy` folder. If you didn't configure special variables for the build, the above command will generate HTML pages and put into `.deploy/stable/` folder.

You can check the generated result and verify the content. You can also host the content in `.deploy` and view the result in browser. The below shows how to start the web server with Docker:

```
docker run --name docs-site-test -p 8080:80 -v $PWD/.deploy:/usr/share/nginx/html:ro --rm nginx
```

Now you are able to visit `http://localhost:3030/stable/` to check the content.

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

Each component has an independent subfolder in the `/src/pages/components` directory. Each subfolder contains a `.js` file and a `.css` file to control the content and style for each component.

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

1. Navigate to the `/src/pages/components/PopularResources` directory and locate the `PopularResources.js` file.

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

**File location: `/src/pages/components/PopularResources/PopularResources.js`.**

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

**File location: `/src/pages/components/ExploreContent/ExploreContent.js`**

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

**File location: `/src/pages/components/DiscoverYourPath/DiscoverYourPath.js`**

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

**File location: `/src/pages/components/FeaturedTopics/FeaturedTopics.js`**

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

