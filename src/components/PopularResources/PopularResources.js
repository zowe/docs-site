import React from "react";
import clsx from "clsx";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const data = [
  {
    title: "Download Zowe",
    link: "https://www.zowe.org/download.html",
    icon: "img/download_zowe-icon.png",
    description: (
      <>
        Zowe has both server and client components, which you can install
        independently.
      </>
    ),
  },
  {
    title: "Try Zowe",
    link: "https://www.openmainframeproject.org/projects/zowe/ztrial",
    icon: "img/try_zowe-icon.png",
    description: <>Get your hands on a Zowe trial on demand at no charge.</>,
  },
];

function Resource({ title, link, icon, description }) {
  return (
    <div className={clsx("col col--4 padding--lg", styles.posRelative)}>
      <img
        className="margin-left--xs"
        alt="icons"
        style={{ height: "70px", width: "70px" }}
        src={useBaseUrl(icon)}
      />
      <p>{description}</p>
      <a className={clsx("margin-top--sm", styles.posAbsolute)} href={link}>
        {title}
      </a>
    </div>
  );
}

function PopularResources() {
  return (
    <>
      {data && data.length > 0 && (
        <section className={clsx("home-container", styles.features)}>
          <div className={clsx("row margin-horiz--lg")}>
            <div className={clsx("col col--2")}>
              <h3 className="padding-top--lg container-h3">
                Popular resources
              </h3>
            </div>
            <div className={clsx("col col--10")}>
              <div className={clsx("row")}>
                {data.map((props, idx) => (
                  <Resource key={idx} {...props} />
                ))}
                <div
                  className={clsx(
                    "col col--4 padding--lg display-flex",
                    styles.posRelative
                  )}
                >
                  <iframe
                    src="https://www.youtube.com/embed/7XpOjREP8JU"
                    className={clsx(styles.responsiveIframe)}
                    title="Introduction to Zowe"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <a
                    className={clsx("margin-top--sm", styles.posAbsolute)}
                    href="https://www.youtube.com/embed/7XpOjREP8JU"
                  >
                    Get an overview of Zowe
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default PopularResources;
