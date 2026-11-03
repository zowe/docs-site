import React from 'react';
import Navbar from '@theme-original/Navbar';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Bar } from '@theme/AnnouncementBar';

// Renders announcementBar1 (yellow) directly beneath the top navigation bar.
export default function NavbarWrapper(props) {
  const { themeConfig } = useDocusaurusContext().siteConfig;
  const bar = themeConfig.announcementBar1;
  return (
    <>
      <Navbar {...props} />
      {bar && <Bar {...bar} />}
    </>
  );
}
