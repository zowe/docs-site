import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

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
  return <a href={link}>{item}</a>;
}

function FeaturedTopics() {
  return (
    <div className={clsx("home-container", styles.section)}>
      <div className="row margin-horiz--lg">
        <div className={clsx("col col--2 p-none")}>
          <h3 className="container-h3">Featured Topics</h3>
        </div>
        <div className={clsx("col col--10")}>
          <div className="row">
            <div className={clsx("col col--4 padding-horiz--lg p-none")}>
              {firstSection.map((props, idx) => (
                <div className="margin-bottom--md" key={idx}>
                  <Item {...props} />
                </div>
              ))}
            </div>
            <div className={clsx("col col--4 padding-horiz--lg p-none")}>
              {secondSection.map((props, idx) => (
                <div className="margin-bottom--md" key={idx}>
                  <Item {...props} />
                </div>
              ))}
            </div>
            <div className={clsx("col col--4 padding-horiz--lg p-none")}>
              {thirdSection.map((props, idx) => (
                <div className="margin-bottom--md" key={idx}>
                  <Item {...props} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedTopics;
