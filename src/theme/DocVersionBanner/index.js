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
import {useActivePlugin, useDocVersionSuggestions} from '@docusaurus/plugin-content-docs/client';
import {useDocsPreferredVersion} from '@docusaurus/theme-common';
import {useDocsVersion} from "@docusaurus/theme-common/internal";

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
    <>
      <p>This is documentation for {siteTitle} <b>{versionMetadata.label}</b>.</p>
      <Translate
        id="theme.docs.versions.unmaintainedVersionLabel"
        description="The label used to tell the user that he's browsing an unmaintained doc version"
        values={{
          siteTitle,
          versionLabel: <b>{versionMetadata.label}</b>
        }}>
        {
          `${versionMetadata.version[1] === "2" ? "" : `Please Note: The Zowe V1 LTS release has transitioned to "maintenance" effective 04/23/2022 with the 1.28 release and will no longer include new features. Security patches and critical bug fixes will continue to be documented for this release. ${versionMetadata.version !== "v1.28.x" ? " If you plan to remain on the V1 LTS release, please see the latest version of Zowe Docs for the maintained V1 LTS release (v1.28.x)." : "" }`}`
        }
      </Translate>
    </>
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

function LatestVersionSuggestionLabel({versionLabel, versionMetadata, to, onClick}) {
  return (
    <Translate
      id="theme.docs.versions.latestVersionSuggestionLabel"
      description="The label used to tell the user to check the latest version"
      values={{
        versionLabel,
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
      }}>
      {
        `${versionMetadata.version[1] === "2" ? "For documentation of the {latestVersionLink}, see ({versionLabel})" : 'For the latest Zowe features and capabilities, please reference the latest version of Zowe Docs for the "active" {latestVersionLink} ({versionLabel})'}.`
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
