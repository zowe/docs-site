import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

const firstSection = [
  {
    item: "Learn about Zowe",
    link: "stable/getting-started/zowe-getting-started#learning-about-zowe",
  },
  {
    item: "Install and use Zowe",
    link: "stable/getting-started/zowe-getting-started#install-and-use",
  },
  {
    item: "Extend Zowe",
    link: "stable/extend/extend-zowe-overview",
  },
  {
    item: "Contribute to Zowe",
    link: "stable/contribute/roadmap-contribute",
  },
];

const secondSection = [
  {
    item: "Zowe API Mediation Layer",
    link: "stable/getting-started/user-roadmap-apiml",
  },
  {
    item: "Zowe Application Framework",
    link: "stable/getting-started/user-roadmap-app-framework",
  },
  {
    item: "Zowe CLI",
    link: "stable/getting-started/user-roadmap-zowe-cli",
  },
];

const thirdSection = [
  {
    item: "Zowe Explorer",
    link: "stable/getting-started/user-roadmap-zowe-explorer",
  },
  {
    item: "Zowe Client SDKs",
    link: "stable/getting-started/user-roadmap-client-sdk",
  },
];

function Item({ item, link }) {
  return <a href={link}>{item}</a>;
}

function DiscoverYourPath() {
  return (
    <div className={clsx("home-container", styles.section)}>
      <div className="row margin-horiz--lg">
        <div className={clsx("col col--2 p-none")}>
          <h3 className="container-h3">Discover your path</h3>
          <p>
            The roadmaps help you arrive at your goals faster. Choose one option
            and we'll suggest resources for you.
          </p>
        </div>
        <div className={clsx("col col--10")}>
          <div className="row">
            <div
              className={clsx(
                "col col--4 padding-horiz--md padding-bottom--md p-none"
              )}
            >
              <div
                className="item shadow--lw"
                style={{ border: "1px solid #bebebe" }}
              >
                <h4
                  className={clsx(
                    "padding--md margin-bottom--none",
                    styles.darkBlue
                  )}
                >
                  I want to...
                </h4>
                <div className="padding--md">
                  {firstSection.map((props, idx) => (
                    <div className="margin-bottom--md" key={idx}>
                      <Item {...props} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div
              className={clsx(
                "col col--8 padding-horiz--md padding-bottom--md p-none"
              )}
            >
              <div
                className="item shadow--lw"
                style={{ border: "1px solid #bebebe", height: "100%" }}
              >
                <div className="col padding--none">
                  <h4
                    className={clsx(
                      "padding--md margin-bottom--none",
                      styles.lightBlue
                    )}
                  >
                    I'm interested in...
                  </h4>
                  <div className="row padding--md">
                    <div className={clsx("col col-6")}>
                      {secondSection.map((props, idx) => (
                        <div className="margin-bottom--md" key={idx}>
                          <Item {...props} />
                        </div>
                      ))}
                    </div>
                    <div className={clsx("col col-6")}>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiscoverYourPath;
