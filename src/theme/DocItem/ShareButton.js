import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function ShareButton(props) {
  const location = useLocation();
  const twitterShareURL =
    "https://twitter.com/share?url=https://docs.zowe.org" +
    `${location.pathname}` +
    "&text=Check out this article on " +
    `${props.title}` +
    ": " +
    "&hashtags=zowe,openmainframeproject,opensource";
  const linkedinShareURL =
    "http://www.linkedin.com/shareArticle?mini=true&url=https://docs.zowe.org" +
    `${location.pathname}` +
    "&source=docs.zowe.org";
  const facebookShareURL =
    "https://www.facebook.com/sharer/sharer.php?u=https://docs.zowe.org" +
    `${location.pathname}`;
  const emailShareURL =
    "mailto:?subject=Shared Article | " +
    `${props.title}` +
    " | Zowe Docs " +
    "&body=Check out this article on " +
    `${props.title}` +
    ": https://docs.zowe.org" +
    `${location.pathname}`;
  const shareIconUrl = useBaseUrl("img/share-icon.svg");

  const info = [
    {
      link: twitterShareURL,
      iconName: faTwitter,
      name: "Twitter",
    },
    {
      link: linkedinShareURL,
      iconName: faLinkedin,
      name: "LinkedIn",
    },
    {
      link: facebookShareURL,
      iconName: faFacebookSquare,
      name: "Facebook",
    },
    {
      link: emailShareURL,
      iconName: faEnvelope,
      name: "Email",
    },
  ];

  return (
    <div className="dropdown dropdown--hoverable pointer">
      <a
        target="_blank"
        rel="noreferrer noopener"
        style={{ marginTop: "0.45rem" }}
      >
        <img
          className="margin-right--xs"
          src={shareIconUrl}
          style={{ height: "16px", width: "18px", verticalAlign: "-0.125em" }}
        ></img>
      </a>
      <button
        className="button button--lg button--link padding-horiz--none pointer share-button"
        style={{ fontWeight: 400, fontFamily: "inherit", fontSize: "inherit" }}
      >
        Share
      </button>
      <ul className="dropdown__menu">
        {info.map((labels) => (
          <li key={labels.id}>
            <a
              className="dropdown__link icons"
              href={labels.link}
              target="_blank"
            >
              <FontAwesomeIcon
                icon={labels.iconName}
                className="margin-right--sm"
              />
              {labels.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShareButton;
