import React, { useState } from "react";
import clsx from "clsx";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.css";
import versionsArray from "../../../versions.json";

const downloadableFiles = [
  {
    title: "Zowe documentation",
    description: (
      <>
        Download the Zowe documentation in PDF format
        from the links below. The latest version on this website is
      </>
    ),
    firstSubDescription: <>Select the version to download</>,
    version: true,
    dropdown: true,
  },
  {
    title: "Zowe CLI command reference guides",
    description: (
      <>
        View documentation on commands, actions, and options in Zowe CLI. The
        reference document is based on the <code>@zowe-v2-lts</code> version of
        the CLI. It contains the web help for all Zowe ecosystem-conformant 
        plug-ins that contributed to this website.
      </>
    ),
    firstSubDescription: <>Online interactive version</>,
    firstViewOnlineLink: "./stable/web_help/index.html",
    firstDownloadLink: "./stable/CLIReference_Zowe.pdf",
    secondSubDescription: <>ZIP format</>,
    secondDownloadLink: "./stable/zowe_web_help.zip",
  },
  {
    title: "Zowe Client SDK reference guides",
    description: (
      <>
        Refer to the following Zowe Client SDK reference guides for information
        about the API endpoints.
      </>
    ),
    firstSubDescription: <>Node SDK Reference</>,
    firstViewOnlineLink: "./stable/typedoc/index.html",
    firstDownloadLink: "./stable/zowe-nodejs-sdk-typedoc.zip",
    secondSubDescription: <>Python SDK Reference</>,
    secondViewOnlineLink:
      "https://zowe-client-python-sdk.readthedocs.io/en/latest/index.html",
    secondDownloadLink:
      "https://zowe-client-python-sdk.readthedocs.io/_/downloads/en/latest/pdf/",
  },
];

function DownloadableFile({
  title,
  version,
  dropdown,
  description,
  firstSubDescription,
  firstViewOnlineLink,
  firstDownloadLink,
  secondSubDescription,
  secondViewOnlineLink,
  secondDownloadLink,
}) {
  const { siteConfig } = useDocusaurusContext();
  const [clicked, setClicked] = useState(false);
  const [isVersion, setIsVersion] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(
    siteConfig.customFields.latestVersion
  );

  //Appended latest version in the versionsArray
  const newVersionsArray = [siteConfig.customFields.latestVersion].concat(
    versionsArray
  );

  function handleClick(props) {
    setIsVersion(true);
    setClicked(true);
    setSelectedVersion(props);
  }
  return (
    <div className={clsx("col col--4 margin-bottom--lg")}>
      <div className={clsx("padding--lg item shadow--lw", styles.card)}>
        {/* Common description in every card */}
        <div className={styles.metadata}>
          <h4>{title}</h4>
          <p>
            {description}{" "}
            {version && siteConfig.customFields.latestVersion + "."}
          </p>
        </div>
        <div>
          <div>
            {firstSubDescription && (
              <p className="margin-bottom--sm">{firstSubDescription}</p>
            )}
            <div className="display-flex">
              {firstViewOnlineLink && (
                <div className="margin-right--md display-flex row--align-center pointer">
                  <img
                    className="lightTheme"
                    alt="Right arrow icon"
                    src={useBaseUrl("/img/right-arrow-light-icon.svg")}
                  />
                  <img
                    className="darkTheme"
                    alt="Right arrow icon"
                    src={useBaseUrl("/img/right-arrow-dark-icon.svg")}
                  />
                  <a
                    className="margin-left--xs"
                    href={firstViewOnlineLink}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    View online
                  </a>
                </div>
              )}

              {/* Version Download Dropdown */}
              {dropdown && (
                <div className="dropdown dropdown--hoverable margin-right--md">
                  <button
                    className={clsx(
                      "button button--outline button--primary display-flex",
                      styles.versionButton
                    )}
                  >
                    {isVersion
                      ? selectedVersion
                      : siteConfig.customFields.latestVersion}
                    <img
                      className="margin-left--xs lightTheme"
                      alt="right arrow"
                      src={useBaseUrl("/img/down-arrow-light-icon.svg")}
                    />
                    <img
                      className="margin-left--xs darkTheme"
                      alt="right arrow"
                      src={useBaseUrl("/img/down-arrow-dark-icon.svg")}
                    />
                  </button>
                  <ul
                    className={
                      clicked
                        ? clsx(styles.displayNone)
                        : clsx(
                            "dropdown__menu pointer thin-scrollbar",
                            styles.overflow
                          )
                    }
                    onMouseLeave={() => setClicked(false)}
                  >
                    {newVersionsArray.map((props, idx) => (
                      <li key={idx}>
                        <a
                          className="dropdown__link"
                          onClick={() => handleClick(props)}
                        >
                          {props}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {dropdown && (
                <div className="display-flex row--align-center pointer">
                  <img
                    className="lightTheme"
                    alt="Download icon"
                    src={useBaseUrl("/img/download-light-icon.svg")}
                  />
                  <img
                    className="darkTheme"
                    alt="Download icon"
                    src={useBaseUrl("/img/download-dark-icon.svg")}
                  />
                  <a
                    className="margin--xs"
                    href={
                      dropdown &&
                      selectedVersion != siteConfig.customFields.latestVersion
                        ? "/zowe-docs-" + selectedVersion + ".pdf"
                        : "/zowe-docs.pdf"
                    }
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Download
                  </a>
                </div>
              )}

              {firstDownloadLink && (
                <div className="display-flex row--align-center pointer">
                  <img
                    className="lightTheme"
                    alt="Download icon"
                    src={useBaseUrl("/img/download-light-icon.svg")}
                  />
                  <img
                    className="darkTheme"
                    alt="Download icon"
                    src={useBaseUrl("/img/download-dark-icon.svg")}
                  />
                  <a
                    className="margin--xs"
                    href={firstDownloadLink}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Download
                  </a>
                </div>
              )}
            </div>
          </div>

          <div>
            {secondSubDescription && (
              <p className="padding-top--lg margin-bottom--sm">
                {secondSubDescription}
              </p>
            )}
            <div className="display-flex">
              {secondViewOnlineLink && (
                <div className="margin-right--md display-flex row--align-center pointer">
                  <img
                    className="lightTheme"
                    alt="Right arrow icon"
                    src={useBaseUrl("/img/right-arrow-light-icon.svg")}
                  />
                  <img
                    className="darkTheme"
                    alt="Right arrow icon"
                    src={useBaseUrl("/img/right-arrow-dark-icon.svg")}
                  />
                  <a
                    className="margin-left--xs"
                    href={secondViewOnlineLink}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    View online
                  </a>
                </div>
              )}

              {secondDownloadLink && (
                <div className="display-flex row--align-center pointer">
                  <img
                    className="lightTheme"
                    alt="Download icon"
                    src={useBaseUrl("/img/download-light-icon.svg")}
                  />
                  <img
                    className="darkTheme"
                    alt="Download icon"
                    src={useBaseUrl("/img/download-dark-icon.svg")}
                  />
                  <a
                    className="margin--xs"
                    href={secondDownloadLink}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Download
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DownloadableFiles() {
  return (
    <>
      {downloadableFiles && downloadableFiles.length > 0 && (
        <div className={clsx("home-container", styles.section)}>
          <div className="row margin-horiz--lg">
            <div className={clsx("col col--2 p-none")}>
              <h3 className="container-h3">Downloadable files</h3>
            </div>
            <div className={clsx("col col--10 p-none")}>
              <div className={clsx("row")}>
                {downloadableFiles.map((props, idx) => (
                  <DownloadableFile key={idx} {...props} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DownloadableFiles;
