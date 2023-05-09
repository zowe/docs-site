import React, { useEffect, useState } from "react";
import readingTime from "reading-time";
import Head from "@docusaurus/Head";
import MDXComponents from "@theme/MDXComponents";
import { MDXProvider } from "@mdx-js/react";
import { useTitleFormatter } from "@docusaurus/theme-common";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import DocPaginator from "@theme/DocPaginator";
import DocVersionBanner from "@theme/DocVersionBanner";
import TOC from "@theme/TOC";
import clsx from "clsx";
import styles from "./styles.module.css";
import { useActivePlugin, useVersions } from "@theme/hooks/useDocs";
import TagsWrapper from "./TagsWrapper";

//Components
import DocsInfo from "./DocsInfo";
import DocsRating from "./DocsRating";

function DocItem(props) {
  const { siteConfig } = useDocusaurusContext();
  const { url: siteUrl } = siteConfig;
  const { content: DocContent, versionMetadata } = props;
  const {
    metadata,
    frontMatter: {
      image: metaImage,
      keywords,
      hide_title: hideTitle,
      hide_table_of_contents: hideTableOfContents,
    },
  } = DocContent;
  const {
    description,
    title,
    permalink,
    editUrl,
    lastUpdatedAt,
    lastUpdatedBy,
    unversionedId,
  } = metadata;
  const { pluginId } = useActivePlugin({ failfast: true });

  const versions = useVersions(pluginId);

  const showVersionBadge = versions.length > 1;
  const metaTitle = useTitleFormatter(title);
  const metaImageUrl = useBaseUrl(metaImage, {
    absolute: true,
  });

  const [readingTimeInWords, setReadingTimeInWords] = useState("");

  useEffect(() => {
    setReadingTimeInWords(
      readingTime(document.querySelector(".markdown").innerText).text
    );
  });

  const getActiveIDs = (selectedComponents) => {
    if (!metadata.frontMatter.meta || !metadata.frontMatter.meta[0].tags || !Object.keys(metadata.frontMatter.meta[0].tags).length) {
      return undefined; // No tags defined for that page
    }
    if (!selectedComponents || !(selectedComponents.tags instanceof Object)) {
      return undefined; // No selectedComponents or object has wrong structure
    }
    const numberOfSelectedComponents = Object.values(selectedComponents.tags).filter(i => i.value).length;
    const activeDownloadType = selectedComponents.downloadType && selectedComponents.downloadType.toLowerCase() !== 'all'; 
    const activeESM = selectedComponents.esm && selectedComponents.esm.toLowerCase() !== 'all'; 
    if (!numberOfSelectedComponents && !activeDownloadType && !activeESM) {
      return undefined; // Nothing is selected
    }
    const activeTags = Object.keys(selectedComponents.tags).filter(tag => selectedComponents.tags[tag].value).map(tag => tag.toLowerCase());
    activeDownloadType && activeTags.push(selectedComponents.downloadType.toLowerCase());
    activeESM && activeTags.push(selectedComponents.esm.toLowerCase());
    const tagsDictionary = metadata.frontMatter.meta[0].tags;
    const lowerCaseTagsDict = Object.keys(tagsDictionary).reduce((acc, i) => ({...acc, [i.toLowerCase()]: tagsDictionary[i]}), {});
    const activeHeaders = activeTags.reduce((acc, tag) => lowerCaseTagsDict[tag] ? [...acc, ...lowerCaseTagsDict[tag]] : acc, []);
    return activeHeaders.map(i => i.toLowerCase().replaceAll(' ', '-').replaceAll(/[^\w-]/ig, ''));
  }

  const getTOC = (activeIDs, toc) => {
    if (!activeIDs) {
      return toc;
    }
    const filterChildren = (arr) => {
      return arr.reduce((acc, i) => {
        if (activeIDs.includes(i.id)) {
          acc.push(i);
        } else if (i.children.length) {
          const c = filterChildren(i.children);
          if (c.length) {
            acc.push({...i, children: c});
          }
        }
        return acc;
      }, []);
    }
    return filterChildren(toc);
  }

  const [activeIDs, setActiveIDs] = useState(getActiveIDs(JSON.parse(window.sessionStorage.getItem('ZoweDocs::selectedComponents') || "{}")));

  window.onstorage = (e) => {
    const newComponentsSelection = window.sessionStorage.getItem('ZoweDocs::selectedComponents');
    if (newComponentsSelection) {
      setActiveIDs(getActiveIDs(JSON.parse(newComponentsSelection)));
    }
  };

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta property="og:title" content={metaTitle} />
        {description && <meta name="description" content={description} />}
        {description && (
          <meta property="og:description" content={description} />
        )}
        {keywords && keywords.length && (
          <meta name="keywords" content={keywords.join(",")} />
        )}
        {metaImage && <meta property="og:image" content={metaImageUrl} />}
        {metaImage && <meta name="twitter:image" content={metaImageUrl} />}
        {metaImage && (
          <meta name="twitter:image:alt" content={`Image for ${title}`} />
        )}
        {permalink && <meta property="og:url" content={siteUrl + permalink} />}
        {permalink && <link rel="canonical" href={siteUrl + permalink} />}
      </Head>

      <div className="row">
        <div
          className={clsx("col", {
            [styles.docItemCol]: !hideTableOfContents,
          })}
        >
          <DocVersionBanner versionMetadata={versionMetadata} />
          <div className={styles.docItemContainer}>
            <article className="article-content">
              {showVersionBadge && (
                <div>
                  <span className="badge badge--secondary">
                    Version: {versionMetadata.label}
                  </span>
                </div>
              )}
              {!hideTitle && (
                <header>
                  <h1 className={styles.docTitle}>{title}</h1>
                </header>
              )}
              {(editUrl || lastUpdatedAt || lastUpdatedBy) && (
                <DocsInfo
                  editUrl={editUrl}
                  lastUpdatedAt={lastUpdatedAt}
                  lastUpdatedBy={lastUpdatedBy}
                  readingTimeInWords={readingTimeInWords}
                  title={title}
                />
              )}
              <MDXProvider components={{...MDXComponents, 
                wrapper: props => <TagsWrapper props={props} activeIDs={activeIDs}/>
              }}>
                <div className="markdown">
                  <DocContent />
                </div>
              </MDXProvider>
            </article>

            <div className="margin-left--none margin-top--md text--center">
              <DocsRating label={unversionedId} />
            </div>
            <div className="margin-vert--lg">
              <DocPaginator metadata={metadata} />
            </div>
          </div>
        </div>
        {!hideTableOfContents && DocContent.toc && (
          <div className="col col--3">
            <TOC toc={getTOC(activeIDs, DocContent.toc)} />
          </div>
        )}
      </div>
    </>
  );
}

export default DocItem;
