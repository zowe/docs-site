import React from 'react';
import TOCItems from '@theme-original/TOCItems';
const ACTIVE_LINK_CLASS_NAME = "table-of-contents__link--active";

export default function TOCItemsWrapper(props) {
  if (props.toc == null || !props.toc.length) {
    return null;
  }
  
  return (
    <>
      <p style={{ margin: "-2px auto -10px 17px" }}>On this page</p>
      <TOCItems {...props} linkActiveClassName={ACTIVE_LINK_CLASS_NAME} />
    </>
  );
}
