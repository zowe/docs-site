import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

const firstSection = [
  {
    item: "Release notes",
    link: "stable/getting-started/summaryofchanges",
  },
  {
    item: "Zowe overview",
    link: "stable/getting-started/overview",
  },
  {
    item: "Getting started tutorial",
    link: "stable/user-guide/zowe-getting-started-tutorial",
  },
  {
    item: "Planning for installation",
    link: "stable/user-guide/installandconfig",
  },
];

const secondSection = [
  {
    item: "System requirements",
    link: "stable/user-guide/systemrequirements",
  },
  {
    item: "Installing Zowe z/OS components",
    link: "stable/user-guide/install-zos",
  },
  {
    item: "Configuring z/OSMF",
    link: "stable/user-guide/systemrequirements-zosmf",
  },
  {
    item: "Configuring Zowe certificates",
    link: "stable/user-guide/configure-certificates",
  },
];

const thirdSection = [
  {
    item: "Installing Zowe CLI",
    link: "stable/user-guide/cli-installcli",
  },
  {
    item: "Using Zowe CLI",
    link: "stable/user-guide/cli-usingcli",
  },
  {
    item: "Installing Zowe SMP/E",
    link: "stable/user-guide/install-zowe-smpe",
  },
  {
    item: "Configuring the z/OS system",
    link: "stable/user-guide/configure-zos-system",
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
          <h3 className="container-h3">Featured topics</h3>
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
