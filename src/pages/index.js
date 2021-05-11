import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { DocSearch } from "@docsearch/react";
import styles from "./styles.module.css";

//Components
import PopularResources from "../components/PopularResources/PopularResources";
import ExploreContent from "../components/ExploreContent/ExploreContent";
import DiscoverYourPath from "../components/DiscoverYourPath/DiscoverYourPath";
import FeaturedTopics from "../components/FeaturedTopics/FeaturedTopics";
import DownloadableFiles from "../components/DownloadableFiles/DownloadableFiles";

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout description="Zowe is an open source framework for leveraging data and applications in z/OS from modern applications and tools.">
      <header className={clsx("hero", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          {/* <p className="hero__subtitle">{siteConfig.tagline}</p> FIXME: */}
          <div className="searchDiv">
            <DocSearch apiKey="aa" indexName="aa" /> {/* FIXME: */}
          </div>
        </div>
      </header>
      <PopularResources />
      <hr></hr>
      <ExploreContent />
      <hr></hr>
      <DiscoverYourPath />
      <hr></hr>
      <FeaturedTopics />
      <hr></hr>
      <main>
        <DownloadableFiles />
      </main>
    </Layout>
  );
}

export default Home;
