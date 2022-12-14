import React from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";

import { useVersions, useLatestVersion } from "@theme/hooks/useDocs";

import VersionsArchived from "@site/versionsArchived.json";

const VersionsArchivedList = Object.entries(VersionsArchived);

function Version() {
  const versions = useVersions();
  const latestVersion = useLatestVersion();
  const pastVersions = versions.filter(
    (version) => version !== latestVersion && version.name !== "current"
  );

  return (
    <Layout
      title="Versions"
      description="Zowe Versions page listing all documented site versions"
    >
      <main className="container margin-vert--lg">
        <h1>Zowe documentation versions</h1>

        {latestVersion && (
          <div className="margin-bottom--lg">
            <h3 id="next">Current version (Stable)</h3>
            <p>
              Here you can find the documentation for current released version.
            </p>
            <table>
              <tbody>
                <tr>
                  <th>{latestVersion.label}</th>
                  <td>
                    <Link to={latestVersion.path + "/getting-started/overview"}>
                      Documentation
                    </Link>
                  </td>
                  <td>
                    <a href={`stable/getting-started/release-notes/v1_23`}>
                      Release Notes
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {(pastVersions.length > 0 || VersionsArchived.length > 0) && (
          <div className="margin-bottom--lg">
            <h3 id="archive">Past versions (Not maintained anymore)</h3>
            <p>
              Here you can find documentation for previous versions of Zowe.
            </p>
            <table>
              <tbody>
                {pastVersions.map((version) => (
                  <tr key={version.name}>
                    <th>{version.label}</th>
                    <td>
                      <Link to={version.path + "/getting-started/overview"}>
                        Documentation
                      </Link>
                    </td>
                  </tr>
                ))}
                {VersionsArchivedList.map(([versionName, versionUrl]) => (
                  <tr key={versionName}>
                    <th>{versionName}</th>
                    <td>
                      <Link to={versionUrl}>Documentation</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </Layout>
  );
}

export default Version;
