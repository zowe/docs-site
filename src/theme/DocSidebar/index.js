import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import DocSidebar from "@theme-original/DocSidebar";

function DocSidebarBrowser(props) {
  return (
    <BrowserOnly fallback={<div>Sidebar...</div>}>
      {() => {
        // Something that should be excluded during build process prerendering.
        return <DocSidebar {...props} />;
      }}
    </BrowserOnly>
  );
}

export default DocSidebarBrowser;
