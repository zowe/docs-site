import React from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareSquare } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function ShareButton(props) {
  const location = useLocation();
  const twitterShareURL =
    "https://twitter.com/share?url=https://docs.zowe.org" +
    `${location.pathname}` +
    "&text=Check out this documentation on " +
    `${props.title}` +
    ": ";
  const linkedinShareURL =
    "http://www.linkedin.com/shareArticle?mini=true&url=https://docs.zowe.org" +
    `${location.pathname}` +
    "&source=docs.zowe.org";
  const facebookShareURL =
    "https://www.facebook.com/sharer/sharer.php?u=https://docs.zowe.org" +
    `${location.pathname}`;
  const emailShareURL =
    "mailto:?subject=Check out this documentation on " +
    `${props.title}` +
    "&body=https://docs.zowe.org" +
    `${location.pathname}`;

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
        <FontAwesomeIcon icon={faShareSquare} style={{ fontSize: "16px" }} />
        <>&nbsp;</>
      </a>
      <button
        className="button button--lg button--link padding-horiz--none pointer share-button"
        style={{ fontWeight: 400, fontFamily: "inherit", fontSize: "inherit" }}
      >
        Share
      </button>
      <ul className="dropdown__menu">
        {info.map((labels) => (
          <li>
            <a
              className="dropdown__link icons"
              href={labels.link}
              target="_blank"
              key={labels.id}
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
