import React from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.css";

const downloadableFiles = [
  {
    title: "Zowe documentation",
    description: (
      <>
        Download the <code>Version 1.x.x</code> Zowe documentation in PDF format
        from the links below. The latest version on this website is
      </>
    ),
    firstSubDescription: <>Select the version to Download</>,
    firstDownloadLink: "https://google.com/",
    version: true,
  },
  {
    title: "Zowe CLI command reference guides",
    description: (
      <>
        View documentation on commands, actions, and options in Zowe CLI. The
        reference document is based on the <code>@zowe-v1-lts</code> version of
        the CLI.
      </>
    ),
    firstSubDescription: <>Online interactive version</>,
    firstViewOnlineLink: "https://google.com/",
    firstDownloadLink: "https://google.com/",
    secondSubDescription: <>PDF document</>,
    secondDownloadLink: "https://google.com/",
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
    firstViewOnlineLink: "https://google.com/",
    firstDownloadLink: "https://google.com/",
    secondSubDescription: <>Python SDK Reference</>,
    secondViewOnlineLink: "https://google.com/",
    secondDownloadLink: "https://google.com/",
  },
];

function DownloadableFile({
  title,
  version,
  description,
  firstSubDescription,
  firstViewOnlineLink,
  firstDownloadLink,
  secondSubDescription,
  secondViewOnlineLink,
  secondDownloadLink,
}) {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div className={clsx("col col--4 margin-bottom--lg")}>
      <div className={clsx("padding--lg", styles.card)}>
        <div className={styles.metadata}>
          <h3>{title}</h3>
          <p>
            {description}{" "}
            {version && siteConfig.customFields.latestVersion + "."}
          </p>
        </div>
        <div>
          <div>
            {firstSubDescription && (
              <p className="margin-bottom--xs">{firstSubDescription}</p>
            )}
            <div className="display-flex">
              {firstViewOnlineLink && (
                <div className="margin-right--md display-flex row--align-center pointer">
                  <img
                    className="lightThemeIcon"
                    src="img/right-arrow-light-icon.svg"
                  ></img>
                  <img
                    className="darkThemeIcon"
                    src="img/right-arrow-dark-icon.svg"
                  ></img>
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
              {firstDownloadLink && (
                <div className="display-flex row--align-center pointer">
                  <img
                    className="lightThemeIcon"
                    src="img/download-light-icon.svg"
                  ></img>
                  <img
                    className="darkThemeIcon"
                    src="img/download-dark-icon.svg"
                  ></img>
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
              <p className="padding-top--lg margin-bottom--xs">
                {secondSubDescription}
              </p>
            )}
            <div className="display-flex">
              {secondViewOnlineLink && (
                <div className="margin-right--md display-flex row--align-center pointer">
                  <img
                    className="lightThemeIcon"
                    src="img/right-arrow-light-icon.svg"
                  ></img>
                  <img
                    className="darkThemeIcon"
                    src="img/right-arrow-dark-icon.svg"
                  ></img>
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
                    className="lightThemeIcon"
                    src="img/download-light-icon.svg"
                  ></img>
                  <img
                    className="darkThemeIcon"
                    src="img/download-dark-icon.svg"
                  ></img>
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
        <div className={styles.section}>
          <h2
            className="text--center padding-bottom--md margin-bottom--none"
            style={{ fontSize: "2rem" }}
          >
            Downloadble files
          </h2>
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {downloadableFiles.map((props, idx) => (
                  <DownloadableFile key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default DownloadableFiles;
