import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { ThemeClassNames } from '@docusaurus/theme-common';
import AnnouncementBarCloseButton from '@theme/AnnouncementBar/CloseButton';
import styles from './styles.module.css';

// Renders themeConfig.announcementBar1 and themeConfig.announcementBar2 (docusaurus.config.js).
// announcementBar2 (red) is shown above the navbar; announcementBar1 (yellow) is rendered under the navbar by src/theme/Navbar.
// Each bar is dismissed independently; change its `id` to show it again to users who closed it.
export function Bar({ id, content, textColor }) {
  const storageKey = `zowe.${id}.dismiss`;
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      setDismissed(localStorage.getItem(storageKey) === 'true');
    } catch (e) {
      // localStorage unavailable; keep the bar visible
    }
  }, [storageKey]);

  if (dismissed) {
    return null;
  }

  const close = () => {
    setDismissed(true);
    try {
      localStorage.setItem(storageKey, 'true');
    } catch (e) {
      // dismissal lasts for this page view only
    }
  };

  return (
    <div
      className={clsx(ThemeClassNames.announcementBar.container, styles.bar, id)}
      style={textColor ? { color: textColor } : undefined}
      role="banner">
      <div className={styles.placeholder} />
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
      <AnnouncementBarCloseButton onClick={close} className={styles.close} />
    </div>
  );
}

export default function AnnouncementBar() {
  const { themeConfig } = useDocusaurusContext().siteConfig;
  const bars = [themeConfig.announcementBar2].filter(Boolean);
  return (
    <>
      {bars.map((bar) => (
        <Bar key={bar.id} {...bar} />
      ))}
    </>
  );
}
