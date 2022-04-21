import React, { useState } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const firstDataRow = [
  {
    title: "Get Started",
    icon: "img/get_started-icon.png",
    link: "stable/getting-started/overview",
    description: (
      <>
        Learn about Zowe™ architecture, components, and how to quickly get
        started with Zowe. Read about what's new and changed in the Release
        Notes, FAQs.
      </>
    ),
  },
  {
    title: "Setup and Use",
    icon: "img/user_guide-icon.png",
    link: "stable/user-guide/install-overview",
    description: (
      <>
        Find out how to install and configure Zowe. Learn about how to use 
        different Zowe components and a numer of Zowe applications and plug-ins.
      </>
    ),
  },
  {
    title: "Extend",
    icon: "img/extend-icon.png",
    link: "stable/extend/extend-zowe-overview",
    description: (
      <>
        Learn about onboarding your products. Developers can follow tutorials
        that teach how to build and extend Zowe components.
      </>
    ),
  },
];

const secondDataRow = [
  {
    title: "Troubleshoot",
    icon: "img/troubleshooting-icon.png",
    link: "stable/troubleshoot/troubleshooting",
    description: (
      <>
        Get troubleshooting tips to help you understand and effectively resolve
        problems with Zowe.
      </>
    ),
  },
  {
    title: "Contribute",
    icon: "img/contribute-icon.png",
    link: "stable/contribute/roadmap-contribute",
    description: (
      <>
        Learn about how you can contribute to Zowe and this documentation. Read about 
        the Zowe UI and code guidelines.
      </>
    ),
  },
  {
    title: "References",
    icon: "img/references-icon.png",
    link: "stable/appendix/zowe-cli-command-reference",
    description: (
      <>
        Get a list of reference materials to help you use Zowe, including the
        Zowe command line reference, API reference, TPSR, and more.
      </>
    ),
  },
];

function Feature({ title, link, icon, description }) {
  const [hovered, setHovered] = useState(false);
  const toggleHover = () => setHovered(!hovered);
  return (
    <div className={clsx("col col--4", styles.feature)}>
      <Link
        to={useBaseUrl(link)}
        className={
          hovered
            ? clsx("padding--lg margin-bottom--lg item shadow--tl", styles.card)
            : clsx("padding--lg margin-bottom--lg item shadow--lw", styles.card)
        }
        onMouseOver={toggleHover}
        onMouseOut={toggleHover}
      >
        <div>
          <div className={clsx(styles.titles)}>
            <h4>{title}</h4>
            <p>{description}</p>
          </div>
          <img
            alt="Download icon"
            style={{ height: "70px", width: "70px" }}
            src={useBaseUrl(icon)}
          />
        </div>
      </Link>
    </div>
  );
}

function Features() {
  return (
    <>
      {firstDataRow && firstDataRow.length > 0 && (
        <section className={clsx("home-container", styles.features)}>
          <div className={clsx("row margin-horiz--lg")}>
            <div className={clsx("col col--2")}>
              <h3 className="container-h3">Explore content</h3>
            </div>
            <div className={clsx("col col--10")}>
              <div className={clsx("row")}>
                {firstDataRow.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
            <div className={clsx("col col--2")}></div>
            <div className={clsx("col col--10")}>
              <div className={clsx("row")}>
                {secondDataRow.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Features;
