/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import {useActivePlugin, useDocsVersion, useDocVersionSuggestions} from '@docusaurus/plugin-content-docs/client';
import {useDocsPreferredVersion} from '@docusaurus/theme-common';

function UnreleasedVersionLabel({siteTitle, versionMetadata}) {
  return (
    <Translate
      id="theme.docs.versions.unreleasedVersionLabel"
      description="The label used to tell the user that he's browsing an unreleased doc version"
      values={{
        siteTitle,
        versionLabel: <b>{versionMetadata.label}</b>,
      }}>
      {
        'This is unreleased documentation for {siteTitle} {versionLabel} version.'
      }
    </Translate>
  );
}

function UnmaintainedVersionLabel({siteTitle, versionMetadata}) {
  return (
    <Translate
      id="theme.docs.versions.unmaintainedVersionLabel"
      description="The label used to tell the user that he's browsing an unmaintained doc version"
      values={{
        siteTitle,
        versionLabel: <b>{versionMetadata.label}</b>
      }}>
      {
        'This is documentation for Zowe {versionLabel}.'
      }
    </Translate>
  )
}

const BannerLabelComponents = {
  unreleased: UnreleasedVersionLabel,
  unmaintained: UnmaintainedVersionLabel,
};

function BannerLabel(props) {
  const BannerLabelComponent =
    BannerLabelComponents[props.versionMetadata.banner];
  return <BannerLabelComponent {...props} />;
}

function LatestVersionSuggestionLabel({siteTitle, versionLabel, versionMetadata, to, onClick}) {
  return (
    <Translate
      id="theme.docs.versions.latestVersionSuggestionLabel"
      description="The label used to tell the user to check the latest version"
      values={{
        guideLink: (
          <a href="https://docs.zowe.org/stable/extend/migrate-extensions" target="_blank">the migration guide</a>
        ),
        latestVersionLink: (
          <b>
            <Link to={to} onClick={onClick}>
              <Translate
                id="theme.docs.versions.latestVersionLinkLabel"
                description="The label used for the latest version suggestion link label">
                latest version
              </Translate>
            </Link>
          </b>
        ),
        versionLabel,
        siteTitle
      }}>
      {
        `${versionMetadata.version[1] === "2" ? 'For up-to-date help content, see the {latestVersionLink} ({versionLabel}) of {siteTitle}.' : `Note: Support for Zowe Version 1 ended on Sept. 30, 2024. Follow {guideLink} to upgrade to Zowe Version 2. ${versionMetadata.version !== "v1.28.x" ? " If you plan to remain on the V1 LTS release, please see the latest version of {siteTitle} for the maintained V1 LTS release (v1.28.x)." : "" }`}`
      }
    </Translate>
  );
}

function DocVersionBannerEnabled({versionMetadata}) {
  const {
    siteConfig: {title: siteTitle},
  } = useDocusaurusContext();
  const {pluginId} = useActivePlugin({
    failfast: true,
  });

  const getVersionMainDoc = (version) =>
    version.docs.find((doc) => doc.id === version.mainDocId);

  const {savePreferredVersionName} = useDocsPreferredVersion(pluginId);
  const {
    latestDocSuggestion,
    latestVersionSuggestion,
  } = useDocVersionSuggestions(pluginId); // try to link to same doc in latest version (not always possible)
  // fallback to main doc of latest version

  const latestVersionSuggestedDoc =
    latestDocSuggestion ?? getVersionMainDoc(latestVersionSuggestion);
  return (
    <div className="alert alert--warning margin-bottom--md" role="alert">
      <div>
        <BannerLabel siteTitle={siteTitle} versionMetadata={versionMetadata} />
      </div>
      <div className="margin-top--md">
        <LatestVersionSuggestionLabel
          siteTitle={siteTitle}
          versionLabel={latestVersionSuggestion.label}
          versionMetadata={versionMetadata}
          to={latestVersionSuggestedDoc.path}
          onClick={() => savePreferredVersionName(latestVersionSuggestion.name)}
        />
      </div>
    </div>
  );
}

function DocVersionBanner({className}) {
  const versionMetadata = useDocsVersion();

  if (!versionMetadata?.banner || versionMetadata.banner === 'none') {
    return <></>;
  } else {
    return <DocVersionBannerEnabled versionMetadata={versionMetadata} />;
  }
}

export default DocVersionBanner;
