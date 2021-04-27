import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const firstSection = [
  {
    item: "Release notes",
    link: "",
  },
  {
    item: "Zowe overview",
    link: "",
  },
  {
    item: "Getting started tutorial",
    link: "",
  },
  {
    item: "Planning for installation",
    link: "",
  },
];

const secondSection = [
  {
    item: "System requirements",
    link: "",
  },
  {
    item: "Installing Zowe z/OS components",
    link: "",
  },
  {
    item: "Configuring z/OSMF",
    link: "",
  },
  {
    item: "Configuring Zowe certificates",
    link: "",
  },
];

const thirdSection = [
  {
    item: "Installing Zowe CLI",
    link: "",
  },
  {
    item: "Using Zowe CLI",
    link: "",
  },
  {
    item: "Installing Zowe SMP/E",
    link: "",
  },
  {
    item: "Configuring the z/OS system",
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

function FeaturedTopics() {
  return (
    <div className={styles.section}>
      <h1 className="text--center padding-bottom--md">Featured Topics</h1>
      <section className={styles.features}>
        <div className="container">
          <div className="row justify-content--center">
            <div className={clsx("col col--3", styles.feature)}>
              {firstSection.map((props, idx) => (
                <div className="display-flex row--align-center margin-bottom--md">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="margin-right--sm"
                  />
                  <Item key={idx} {...props} />
                </div>
              ))}
            </div>
            <div className={clsx("col col--4", styles.feature)}>
              {secondSection.map((props, idx) => (
                <div className="display-flex row--align-center margin-bottom--md">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="margin-right--sm"
                  />
                  <Item key={idx} {...props} />
                </div>
              ))}
            </div>
            <div className={clsx("col col--3", styles.feature)}>
              {thirdSection.map((props, idx) => (
                <div className="display-flex row--align-center margin-bottom--md">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="margin-right--sm"
                  />
                  <Item key={idx} {...props} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FeaturedTopics;
