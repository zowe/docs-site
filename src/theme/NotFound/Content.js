import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import { useLocation } from "react-router-dom";
import {
  useActivePlugin,
  useDocVersionSuggestions,
} from '@docusaurus/plugin-content-docs/client';

const getVersionMainDoc = (version) =>
  version.docs.find((doc) => doc.id === version.mainDocId);
export default function NotFoundContent({className}) {
  const {pluginId} = useActivePlugin({failfast: true});
  const {latestVersionSuggestion} = useDocVersionSuggestions(pluginId);
  const versionLink = getVersionMainDoc(latestVersionSuggestion).path;
  const location = useLocation();
  const docIssueURL = "https://github.com/zowe/docs-site/issues/new?assignees=&labels=&template=---doc-error-report.md&title=Page Not Found: docs.zowe.org" + `${location.pathname}`;
  return (
    <main className={clsx('container margin-vert--xl', className)}>
      <div className="row">
        <div className="col col--6 col--offset-3">
          <Heading as="h1" className="hero__title">
            <Translate
              id="theme.NotFound.title"
              description="The title of the 404 page">
              Page Not Found
            </Translate>
          </Heading>
          <p>
            <Translate
              id="theme.NotFound.p1"
              description="The first paragraph of the 404 page">
              The article you are looking for could not be found.
            </Translate>
          </p>
          <p>
            That could mean the article was removed from this version of{" "}
            <a href={versionLink}>
              Zowe Docs
            </a>{". "}
            If so, the content might be incorporated elsewhere in our documentation or it could no longer apply for this version of Zowe.
          </p>
          <p>
            If you believe you have been redirected here in error, please reach out. File an{" "}
            <a href={docIssueURL} target="_blank" rel="noreferrer noopener">
              Issue
            </a>{" "}
            and let us know from where you were redirected to this page.
          </p>
        </div>
      </div>
    </main>
  );
}
