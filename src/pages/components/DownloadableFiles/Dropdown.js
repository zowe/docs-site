import React, { useState } from "react";
import clsx from "clsx";
import useBaseUrl from "@docusaurus/useBaseUrl";
import ThemedImage from "@theme/ThemedImage";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.css";
import versionsArray from "../../../../versions.json";

function Dropdown() {
  const { siteConfig } = useDocusaurusContext();
  const [version, setVersion] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState("");

  //Appended latest version in the versionsArray
  const newVersionsArray = [siteConfig.customFields.latestVersion].concat(
    versionsArray
  );

  function handleClick(props) {
    setVersion(true);
    setSelectedVersion(props);
  }

  return (
    <div className="dropdown dropdown--hoverable margin-right--md">
      <button
        className={clsx(
          "button button--outline button--primary display-flex",
          styles.versionButton
        )}
      >
        {version ? selectedVersion : siteConfig.customFields.latestVersion}
        <ThemedImage
          className="margin-left--xs"
          alt="right arrow"
          sources={{
            light: useBaseUrl("/img/down-arrow-light-icon.svg"),
            dark: useBaseUrl("/img/down-arrow-dark-icon.svg"),
          }}
        />
      </button>
      <ul className="dropdown__menu">
        {newVersionsArray.map((props, idx) => (
          <li key={idx}>
            <a className="dropdown__link" onClick={() => handleClick(props)}>
              {props}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dropdown;
