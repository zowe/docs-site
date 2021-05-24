import React from "react";
import clsx from "clsx";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const firstSection = [
  {
    item: "Learn about Zowe",
    link: "",
  },
  {
    item: "Install and use Zowe",
    link: "",
  },
  {
    item: "Extend Zowe",
    link: "",
  },
  {
    item: "Contribute to Zowe",
    link: "",
  },
];

const secondSection = [
  {
    item: "Zowe API Mediation Layer",
    link: "",
  },
  {
    item: "Zowe Application Framework",
    link: "",
  },
  {
    item: "Zowe CLI",
    link: "",
  },
  {
    item: "Zowe Explorer",
    link: "",
  },
  {
    item: "Zowe Client SDKs",
    link: "",
  },
  {
    item: "Zowe Mobile",
    link: "",
  },
];

function Item({ item, link }) {
  return (
    <div className={clsx("display-flex")}>
      <a href={link}>{item}</a>
    </div>
  );
}

function DiscoverYourPath() {
  return (
    <div className={styles.section}>
      <h2
        className="text--center padding-bottom--md margin-bottom--none"
        style={{ fontSize: "2rem" }}
      >
        Discover your path
      </h2>
      <p className="text--center margin-bottom--none">
        The roadmaps help you arrive at your goals faster.
      </p>
      <p className="text--center margin-bottom--none">
        Choose one option and we'll suggest resources for you.
      </p>
      <section className={styles.features}>
        <div className="container">
          <div className="row justify-content--center">
            <div
              className={clsx(
                "card col col--4 padding-vert--lg margin-right--lg",
                styles.feature
              )}
            >
              <img
                className="lightTheme margin-right--md"
                alt="Bullseye icon"
                style={{ width: "32px" }}
                src={useBaseUrl("/img/bulls-eye-light-icon.svg")}
              />
              <img
                className="darkTheme margin-right--md"
                alt="Bullseye icon"
                style={{ width: "32px" }}
                src={useBaseUrl("/img/bulls-eye-dark-icon.svg")}
              />
              <div>
                <h3>I want to...</h3>
                {firstSection.map((props, idx) => (
                  <Item key={idx} {...props} />
                ))}
              </div>
            </div>
            <div
              className={clsx(
                "card col col--4 padding-vert--lg",
                styles.feature
              )}
            >
              <img
                className="lightTheme margin-right--md"
                alt="Boxopen icon"
                style={{ width: "32px" }}
                src={useBaseUrl("/img/box-open-light-icon.svg")}
              />
              <img
                className="darkTheme margin-right--md"
                alt="Boxopen icon"
                style={{ width: "32px" }}
                src={useBaseUrl("/img/box-open-dark-icon.svg")}
              />
              <div>
                <h3>I'm interested in...</h3>
                {secondSection.map((props, idx) => (
                  <Item key={idx} {...props} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DiscoverYourPath;
