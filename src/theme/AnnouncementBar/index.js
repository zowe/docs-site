import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import AnnouncementBar from '@theme-original/AnnouncementBar';
import AnnouncementBarCloseButton from '@theme/AnnouncementBar/CloseButton';
import styles from './styles.module.css';

// Second announcement bar, shown above the one configured in docusaurus.config.js.
// It is dismissed independently of that bar. Increment the key on content change.
const BREAKING_CHANGES_BAR_KEY = 'zowe.breakingChangesBar-1.dismiss';

function BreakingChangesBar() {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      setDismissed(localStorage.getItem(BREAKING_CHANGES_BAR_KEY) === 'true');
    } catch (e) {
      // localStorage unavailable; keep the bar visible
    }
  }, []);

  if (dismissed) {
    return null;
  }

  const close = () => {
    setDismissed(true);
    try {
      localStorage.setItem(BREAKING_CHANGES_BAR_KEY, 'true');
    } catch (e) {
      // localStorage unavailable; dismissal lasts for this page view only
    }
  };

  return (
    <div className={clsx(ThemeClassNames.announcementBar.container, styles.bar)} role="banner">
      <div className={styles.placeholder} />
      <div className={styles.content}>
        ⚠️ <b>URGENT: Upcoming Zowe releases will have breaking changes.</b> Read more{' '}
        <a href="https://docs.zowe.org/stable/appendix/security-breaking-changes" target="_blank">here</a>.
      </div>
      <AnnouncementBarCloseButton onClick={close} className={styles.close} />
    </div>
  );
}

export default function AnnouncementBarWrapper(props) {
  return (
    <>
      <BreakingChangesBar />
      <AnnouncementBar {...props} />
    </>
  );
}
