import React from "react";
import Head from "@docusaurus/Head";
import { useTitleFormatter } from "@docusaurus/theme-common";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import DocPaginator from "@theme/DocPaginator";
import DocVersionSuggestions from "@theme/DocVersionSuggestions";
import TOC from "@theme/TOC";
import clsx from "clsx";
import styles from "./styles.module.css";
import {
  useActivePlugin,
  useVersions,
  useActiveVersion,
} from "@theme/hooks/useDocs";

//Components
import DocsInfo from "./DocsInfo";
import DocsRating from "./DocsRating";

var versionPassed = ""; //defined the variable globally

function DocItem(props) {
  const { siteConfig } = useDocusaurusContext();
  const { url: siteUrl } = siteConfig;
  const { content: DocContent } = props;
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
  const version = useActiveVersion(pluginId);

  const showVersionBadge = versions.length > 1;
  const metaTitle = useTitleFormatter(title);
  const metaImageUrl = useBaseUrl(metaImage, {
    absolute: true,
  });
  versionPassed = version.label;

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
          <DocVersionSuggestions />
          <div className={styles.docItemContainer}>
            <article>
              {showVersionBadge && (
                <div>
                  <span className="badge badge--secondary">
                    Version: {version.label}
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
                  title={title}
                />
              )}
              <div className="markdown">
                <DocContent />
              </div>
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
            <TOC toc={DocContent.toc} />
          </div>
        )}
      </div>
    </>
  );
}

export default DocItem;
