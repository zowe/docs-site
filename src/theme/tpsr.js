import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

function tpsr() {
  const { siteConfig } = useDocusaurusContext();
  const latestVersion = siteConfig.customFields.latestVersion;
  const tpsrLatestLink =
    "https://github.com/zowe/docs-site/blob/master/tpsr/tpsr-" +
    latestVersion +
    ".md";
  return (
    <a href={tpsrLatestLink} target="_blank">
      Third-Party Software Requirements (TPSR)
    </a>
  );
}

export default tpsr;
