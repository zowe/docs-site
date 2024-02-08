import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import { useLocation } from "react-router-dom";

export default function NotFoundContent({className}) {
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
              We could not find what you were looking for.
            </Translate>
          </p>
          <p>
            Please file an{" "}
            <a href={docIssueURL} target="_blank" rel="noreferrer noopener">
              Issue
            </a>{" "}
            and let us know from where you were redirected on this page.
          </p>
        </div>
      </div>
    </main>
  );
}
