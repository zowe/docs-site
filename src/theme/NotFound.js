import React from "react";
import { useLocation } from "react-router-dom";
import Layout from "@theme/Layout";
import Translate, { translate } from "@docusaurus/Translate";

function NotFound() {
  const location = useLocation();
  const docIssueURL = "https://github.com/zowe/docs-site/issues/new?assignees=&labels=&template=---doc-error-report.md&title=Page Not Found: docs.zowe.org" + `${location.pathname}`;
  return (
    <Layout
      title={translate({
        id: "theme.NotFound.title",
        message: "Page Not Found"
      })}
    >
      <main className="container margin-vert--xl">
        <div className="row">
          <div className="col col--6 col--offset-3">
            <h1 className="hero__title">
              <Translate id="theme.NotFound.title" description="The title of the 404 page">
                Page Not Found
              </Translate>
            </h1>
            <p>
              <Translate id="theme.NotFound.p1" description="The first paragraph of the 404 page">
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
    </Layout>
  );
}

export default NotFound;
