import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {
  useDocsVersion,
} from "@docusaurus/plugin-content-docs/client";

function Tpsr() {
  const { siteConfig } = useDocusaurusContext();
  const latestVersion = useDocsVersion();
  const version = latestVersion?.label.split(" ");
  const tpsrLatestLink =
    "https://github.com/zowe/docs-site/blob/master/tpsr/tpsr-" +
    version[0] +
    ".md";
  return (
    <a href={tpsrLatestLink} target="_blank">
      Third-Party Software Requirements (TPSR)
    </a>
  );
}

export default Tpsr;
