import React from "react";

// groom code, toc, make pr

function TagsWrapper({props, activeIDs}) {
  // React.Children.toArray() 
  const {children, ...rest} = props; // do we need 'rest' for anything?

  if (!activeIDs) {
    return <React.Fragment {...props}/>; // page does not contain any tags or nothing is selected or everything is selected.
  }

  const isNextChildLower = (nextItem, currentHeader) => {
    const headers = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7'];
    if (!headers.includes(nextItem.toLowerCase())) { 
      return true; // next item is not a header
    } else if (headers.indexOf(currentHeader.toLowerCase()) < headers.indexOf(nextItem.toLowerCase())) {
      return true; // next item is header but it is lower
    } else {
      return false;
    }
  }

  const addHighterHeaders = (acc, headerLevel, index) => {
    if (headerLevel < 3) {
      return acc.reverse();
    }
    const highterHeader = children.slice(0, index).filter(i => i.props.originalType === `h${headerLevel - 1}`).pop();
    const accumulatedHeaders = highterHeader ? [...acc, highterHeader] : acc;
    return addHighterHeaders(accumulatedHeaders, headerLevel - 1, index);
  }

  const activeChildren = children.reduce((acc, child, index) => { 
    // Works only with headers that aren't hidden under details
    // Could be modified to walk recursively through child.props.children if it exists, but i doubt that we need it.

    if (acc.showChild && (!child.props || isNextChildLower(child.props.originalType, acc.currentHeaderType))) {
        acc.showChild = true;
    } else if (child.props && activeIDs.includes(child.props.id)) {
        acc.showChild = true;
        acc.currentHeaderType = child.props.originalType;
        const highterHeaders = addHighterHeaders([], parseInt(child.props.originalType.slice(1, 2), 10), index);
        acc.children = [...acc.children, ...highterHeaders];
    } else {
        acc.showChild = false;
    }
    return acc.showChild ? {...acc, children: [...acc.children, child]} : acc;

  }, {showChild: false, currentHeaderType: '', children: []});

  return <React.Fragment children={activeChildren.children}/>
};

export default TagsWrapper;