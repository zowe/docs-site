import React, { useState } from "react";
import clsx from "clsx";
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
        <img
          className="lightThemeIcon margin-left--xs"
          src="img/down-arrow-light-icon.svg"
        ></img>
        <img
          className="darkThemeIcon margin-left--xs"
          src="img/down-arrow-dark-icon.svg"
        ></img>
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
