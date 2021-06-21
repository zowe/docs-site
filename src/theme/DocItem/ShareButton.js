import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useLocation } from "react-router-dom";

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
      lightIcon: useBaseUrl("img/twitter-light-icon.svg"),
      darkIcon: useBaseUrl("img/twitter-dark-icon.svg"),
      name: "Twitter",
    },
    {
      link: linkedinShareURL,
      lightIcon: useBaseUrl("img/linkedin-light-icon.svg"),
      darkIcon: useBaseUrl("img/linkedin-dark-icon.svg"),
      name: "LinkedIn",
    },
    {
      link: facebookShareURL,
      lightIcon: useBaseUrl("img/facebook-light-icon.svg"),
      darkIcon: useBaseUrl("img/facebook-dark-icon.svg"),
      name: "Facebook",
    },
    {
      link: emailShareURL,
      lightIcon: useBaseUrl("img/email-light-icon.svg"),
      darkIcon: useBaseUrl("img/email-dark-icon.svg"),
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
        {info.map((labels, idx) => (
          <li key={idx}>
            <a
              className="dropdown__link icons display-flex"
              href={labels.link}
              target="_blank"
            >
              <img
                className="lightTheme margin-right--sm"
                alt="Share Icon"
                src={labels.lightIcon}
              ></img>
              <img
                className="darkTheme margin-right--sm"
                alt="Share Icon"
                src={labels.darkIcon}
              ></img>
              {labels.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShareButton;
