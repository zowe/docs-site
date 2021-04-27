import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

//Icons
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faQuestion, faRetweet } from '@fortawesome/free-solid-svg-icons'

const data = [
  {
    title: "Getting Started",
    lightIcon: "img/question-solid.svg",
    darkIcon: "img/question-dark-solid.svg",
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
    lightIcon: "img/question-solid.svg",
    darkIcon: "img/question-dark-solid.svg",
    link: "stable/user-guide/installandconfig.",
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
    lightIcon: "img/question-solid.svg",
    darkIcon: "img/question-dark-solid.svg",
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
    lightIcon: "img/question-solid.svg",
    darkIcon: "img/question-dark-solid.svg",
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
    lightIcon: "img/question-solid.svg",
    darkIcon: "img/question-dark-solid.svg",
    link: "stable/contribute/contributing.html",
    description: (
      <>
        Learn about how you can contribute to this documentation. Read about the
        Zowe UI and code guidelines to help you contribute to Zowe.
      </>
    ),
  },
  {
    title: "References",
    lightIicon: "img/question-solid.svg",
    darkIcon: "img/question-dark-solid.svg",
    link: "stable/appendix/tpsr",
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
  return (
    <div className={clsx("col col--4", styles.feature)}>
      <Link to={useBaseUrl(link)}>
        <div className={clsx("card margin-bottom--lg", styles.card)}>
          <div className="card__header">
            {/* <FontAwesomeIcon icon={icon} /> */}
            <img
              src={imgLightIconUrl}
              alt="icons"
              style={{ width: "16px" }}
              className={clsx(styles.lightThemeIcon)}
            />
            <img
              src={imgDarkIconUrl}
              alt="icons"
              style={{ width: "16px" }}
              className={clsx(styles.darkThemeIcon)}
            />
            <h3>{title}</h3>
          </div>
          <div className="card__body">
            <p>{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

function Features() {
  return (
    <>
      {data && data.length > 0 && (
        <section
          id="features"
          className={clsx(styles.features)}
          style={{ padding: "4rem 0" }}
        >
          <h1 className="text--center padding-bottom--md">Explore Content</h1>
          <div className="container">
            <div className="row">
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
