import React, { useState } from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const data = [
  {
    title: "Getting Started",
    lightIcon: "img/getting-started-icon.png",
    darkIcon: "img/getting-started-icon.png",
    link: "stable/getting-started/overview",
    description: (
      <>
        Learn about Zowe™ architecture, components, and how to quickly get
        started with Zowe CLI. Read about what's new and changed in the Release
        Notes. Get answers to your frequently asked questions (FAQs).
      </>
    ),
  },
  {
    title: "User Guide",
    lightIcon: "img/user-guide-icon.png",
    darkIcon: "img/user-guide-icon.png",
    link: "stable/user-guide/installandconfig",
    description: (
      <>
        Find out how to install and configure Zowe. Learn about how to use Zowe
        components, including Zowe Application Framework, API Mediation Layer,
        and Zowe CLI.
      </>
    ),
  },
  {
    title: "Extending",
    lightIcon: "img/extending-icon.png",
    darkIcon: "img/extending-icon.png",
    link: "stable/extend/extend-zowe-overview",
    description: (
      <>
        Learn about onboarding your products. Developers can follow tutorials
        that teach how to build and extend Zowe components.
      </>
    ),
  },
  {
    title: "Troubleshooting",
    lightIcon: "img/troubleshooting-icon.png",
    darkIcon: "img/troubleshooting-icon.png",
    link: "stable/troubleshoot/troubleshooting",
    description: (
      <>
        Get troubleshooting tips to help you understand and effectively resolve
        problems with Zowe.
      </>
    ),
  },
  {
    title: "Contributing",
    lightIcon: "img/contributing-icon.png",
    darkIcon: "img/contributing-icon.png",
    link: "stable/contribute/contributing",
    description: (
      <>
        Learn about how you can contribute to this documentation. Read about the
        Zowe UI and code guidelines to help you contribute to Zowe.
      </>
    ),
  },
  {
    title: "References",
    lightIcon: "img/references-icon.png",
    darkIcon: "img/references-icon.png",
    link: "stable/appendix/zowe-cli-commannd-reference",
    description: (
      <>
        Get a list of reference materials to help you use Zowe, including the
        Zowe command line reference, API reference, TPSR, and more.
      </>
    ),
  },
];

function Feature({ title, link, lightIcon, darkIcon, description }) {
  const imgLightIconUrl = useBaseUrl(lightIcon);
  const imgDarkIconUrl = useBaseUrl(darkIcon);
  const [hovered, setHovered] = useState(false);
  const toggleHover = () => setHovered(!hovered);
  return (
    <div className={clsx("col col--4", styles.feature)}>
      <Link
        to={useBaseUrl(link)}
        className={
          hovered
            ? clsx("padding--lg margin-bottom--lg item shadow--tl", styles.card)
            : clsx("padding--lg margin-bottom--lg", styles.card)
        }
        onMouseOver={toggleHover}
        onMouseOut={toggleHover}
      >
        <div style={{ height: "100%" }}>
          <h3>{title}</h3>
          <p>{description}</p>
          <img
            src={imgLightIconUrl}
            alt="icons"
            style={{ width: "65px" }}
            className="lightThemeIcon"
          />
          <img
            src={imgDarkIconUrl}
            alt="icons"
            style={{ width: "20%" }}
            className="darkThemeIcon"
          />
        </div>
      </Link>
    </div>
  );
}

function Features() {
  return (
    <>
      {data && data.length > 0 && (
        <section id={clsx(styles.features)}>
          <div className="container">
            <h2
              className="text--center padding-bottom--md"
              style={{ fontSize: "2rem" }}
            >
              Explore Content
            </h2>
            <div className={clsx(styles.block, "row")}>
              {data.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Features;
