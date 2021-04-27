import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

const downloadableFiles = [
  {
    title: "Zowe documentation",
    description: (
      <>
        Download the <code>Version 1.x.x</code> Zowe documentation in PDF format
        from the links below. The latest version on this website is 1.20.1.
      </>
    ),
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
  },
  {
    title: "Zowe Client SDK reference guides",
    description: (
      <>
        Refer to the following Zowe Client SDK reference guides for information
        about the API endpoints.
      </>
    ),
  },
];

function DownloadableFile({ title, description }) {
  return (
    <div className={clsx("col col--4", styles.feature)}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function DownloadableFiles() {
  return (
    <>
      {downloadableFiles && downloadableFiles.length > 0 && (
        <div className={styles.section}>
          <h1 className="text--center padding-bottom--md">Downloadble files</h1>
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
