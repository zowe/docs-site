import React from "react";
import clsx from "clsx";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useDocsPreferredVersion } from "@docusaurus/theme-common";
import styles from "./styles.module.css";

const downloadableFiles = [
  {
    title: "Zowe documentation",
    description: (
      <>
        Download the Zowe documentation in PDF format. The latest version 
        on this website is 
      </>
    ),
    firstSubDescription: <>Zowe Docs PDF</>,
    downloadDocsPDF: true,
  },
  {
    title: "Zowe CLI command reference guides",
    description: (selectedVersion) => (
      <>
        View or download Zowe CLI web help. The web help contains information about
        commands, actions, and options for Zowe CLI and all Zowe ecosystem-conformant 
        plug-ins that contributed to this website. The web help is based on the 
        <code>{selectedVersion.startsWith("v2.") ? "@zowe-v2-lts" : "@zowe-v3-lts"}</code> version of the CLI. To view or download a previous version, use 
        the version selector in the navigation bar.
      </>
    ),
    firstSubDescription: <>Online interactive version</>,
    firstViewOnlineLink: "web_help/index.html",
    firstDownloadLink: "CLIReference_Zowe.pdf",
    secondSubDescription: <>ZIP format</>,
    secondDownloadLink: "zowe_web_help.zip",
  },
  {
    title: "Zowe Client SDK reference guides",
    description: (
      <>
        View or download Zowe Client SDK reference guides. The guides contain 
        information about the API endpoints. To view or download a previous 
        version, use the version selector in the navigation bar.
      </>
    ),
    firstSubDescription: <>Node SDK Reference</>,
    firstViewOnlineLink: "typedoc/index.html",
    firstDownloadLink: "zowe-nodejs-sdk-typedoc.zip",
    secondSubDescription: <>Python SDK Reference (Latest version only)</>,
    secondViewOnlineLink:
      "https://zowe-client-python-sdk.readthedocs.io/en/latest/index.html",
    secondDownloadLink:
      "https://zowe-client-python-sdk.readthedocs.io/_/downloads/en/latest/pdf/",
  },
];

function DownloadableFile({
  title,
  downloadDocsPDF,
  description,
  firstSubDescription,
  firstViewOnlineLink,
  firstDownloadLink,
  secondSubDescription,
  secondViewOnlineLink,
  secondDownloadLink,
  siteConfig,
  selectedVersion,
}) {
  firstViewOnlineLink = selectedVersion != siteConfig.customFields.latestVersion ? `./${selectedVersion}/${firstViewOnlineLink}` : `/stable/${firstViewOnlineLink}`;
  firstDownloadLink = selectedVersion != siteConfig.customFields.latestVersion ? `./${selectedVersion}/${firstDownloadLink}` : `./stable/${firstDownloadLink}`;

  if (!secondViewOnlineLink) {
    secondDownloadLink = selectedVersion != siteConfig.customFields.latestVersion ? `./${selectedVersion}/${secondDownloadLink}` : `./stable/${secondDownloadLink}`;
  }

  return (
    <div className={clsx("col col--4 margin-bottom--lg")}>
      <div className={clsx("padding--lg item shadow--lw", styles.card)}>
        {/* Common description in every card */}
        <div className={styles.metadata}>
          <h4>{title}</h4>
          <p>
            {typeof description === "function" ? description(selectedVersion) : description}{" "}
            {downloadDocsPDF && siteConfig.customFields.latestVersion + "."}
          </p>
        </div>
        <div>
          <div>
            {firstSubDescription && (
              <p className="margin-bottom--sm">{firstSubDescription}</p>
            )}
            <div className="display-flex">
              {!downloadDocsPDF && (
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

              {downloadDocsPDF && (
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
                      downloadDocsPDF &&
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

              {!downloadDocsPDF && firstDownloadLink && (
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

              {!downloadDocsPDF && (
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
  const { siteConfig } = useDocusaurusContext();
  
  // Use the preferred version from the navbar version selector
  const { preferredVersion } = useDocsPreferredVersion();
  
  // Get the selected version - use preferred version if set, otherwise use latest
  // Note: "current" is Docusaurus's internal name for the latest version, so we map it to the actual version
  const preferredVersionName = preferredVersion?.name;
  const selectedVersion = (!preferredVersionName || preferredVersionName === "current") 
    ? siteConfig.customFields.latestVersion 
    : preferredVersionName;

  return (
    <>
      {downloadableFiles && downloadableFiles.length > 0 && (
        <div className={clsx("home-container", styles.section)}>
          <div className="row margin-horiz--lg">
            <div className={clsx("col col--2 p-none")}>
              <h3 className="container-h3">Downloadable files</h3>
              <p className="margin-top--sm">
                <small>Version: <strong>{selectedVersion}</strong></small>
              </p>
            </div>
            <div className={clsx("col col--10 p-none")}>
              <div className={clsx("row")}>
                {downloadableFiles.map((props, idx) => (
                  <DownloadableFile key={idx} {...props} selectedVersion={selectedVersion} siteConfig={siteConfig} />
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
