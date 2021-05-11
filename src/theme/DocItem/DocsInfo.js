import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useLocation } from "react-router-dom";
import styles from "./styles.module.css";
import ShareButton from "./ShareButton";

function DocsInfo(props) {
  const location = useLocation();
  const openDocIssueURL =
    "https://github.com/zowe/docs-site/issues/new?assignees=&labels=&template=---doc-error-report.md&title=Issue with docs.zowe.org" +
    `${location.pathname}`;
  const bugIconUrl = useBaseUrl("img/bug-icon.svg");
  const printIconUrl = useBaseUrl("img/print-icon.svg");

  return (
    <div className="margin-bottom--lg margin-top-md">
      <div className="row margin-left--none navbar__inner">
        {/* Last Updated at */}
        <div className="user-options">
          {(props.lastUpdatedAt || props.lastUpdatedBy) && (
            <div className="text--left avatar">
              <div className={styles.docLastUpdatedAt}>Last updated </div>
              {props.lastUpdatedAt && (
                <>
                  :&nbsp;{" "}
                  <time
                    dateTime={new Date(
                      props.lastUpdatedAt * 1000
                    ).toISOString()}
                  >
                    {new Date(props.lastUpdatedAt * 1000).toLocaleDateString()}
                  </time>
                  {props.lastUpdatedBy && " "}
                  {<>&nbsp; |</>}
                </>
              )}
              {props.lastUpdatedBy && (
                <>
                  by <strong>{props.lastUpdatedBy}</strong>
                </>
              )}
            </div>
          )}

          {/* Edit URL */}
          <div>
            <>&nbsp;&nbsp;</>
            {props.editUrl && (
              <a href={props.editUrl} target="_blank" rel="noreferrer noopener">
                Edit this page
              </a>
            )}
          </div>
        </div>

        <div className="user-options">
          {/* PDF Button*/}
          <div className="margin-right--md pointer display-flex">
            {props.editUrl && (
              <a onClick={() => window.print()}>
                {" "}
                <img
                  src={printIconUrl}
                  style={{
                    width: "16px",
                    verticalAlign: "-0.125em",
                  }}
                ></img>
                <>&nbsp;</>
                PDF
              </a>
            )}
          </div>

          {/* Open Doc Button*/}
          <div className="margin-right--md display-flex">
            {openDocIssueURL && (
              <a
                className="pointer"
                href={openDocIssueURL}
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  src={bugIconUrl}
                  style={{
                    width: "16px",
                    verticalAlign: "-0.125em",
                  }}
                ></img>
                <>&nbsp;</>
                Open doc issue
                {/* <>&nbsp;</> */}
              </a>
            )}
          </div>

          {/* Share Button*/}
          <div className="display-flex">
            <ShareButton title={props.title} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocsInfo;
