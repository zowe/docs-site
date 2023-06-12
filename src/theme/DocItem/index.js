import React, { useEffect, useRef, useState } from "react";
import readingTime from "reading-time";
import { DocProvider } from "@docusaurus/theme-common/internal";

//Components
import { DocContent } from "./DocContent";

function DocItem(props) {
  const contentRef = useRef();
  const [readingTimeInWords, setReadingTimeInWords] = useState("");

  useEffect(() => {
    if (contentRef.current) {
      const readTime = readingTime(contentRef.current.innerText);
      setReadingTimeInWords(readTime.text);
    }
  }, [contentRef]);
  return (
    <DocProvider content={props.content}>
      <DocContent Content={props.content} contentRef={contentRef} readingTimeInWords={readingTimeInWords} />
    </DocProvider>
  );
}

export default DocItem;
