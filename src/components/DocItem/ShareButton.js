import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareSquare } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
// import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function ShareButton(props) {
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
  //www.linkedin.com/shareArticle?mini=true&url=&title=&summary=some%20summary%20if%20you%20want
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
        <li>
          <a
            className="dropdown__link icons"
            href={twitterShareURL}
            target="_blank"
          >
            <FontAwesomeIcon icon={faTwitter} className="margin-right--sm" />
            Twitter
          </a>
        </li>
        <li>
          <a
            className="dropdown__link icons"
            href={linkedinShareURL}
            target="_blank"
          >
            <FontAwesomeIcon icon={faLinkedin} className="margin-right--sm" />
            LinkedIn
          </a>
        </li>
        <li>
          <a
            className="dropdown__link icons"
            href={facebookShareURL}
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faFacebookSquare}
              className="margin-right--sm"
            />
            Facebook
          </a>
        </li>
        <li>
          <a
            className="dropdown__link icons"
            href={emailShareURL}
            target="_blank"
          >
            <FontAwesomeIcon icon={faEnvelope} className="margin-right--sm" />
            Email
          </a>
        </li>
      </ul>
    </div>
  );
}

export default ShareButton;
