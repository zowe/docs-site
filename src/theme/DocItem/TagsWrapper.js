import React from "react";

function TagsWrapper({props, activeIDs}) {
  const {children, ...rest} = props; // do we need 'rest' for anything?

  const removeEmptyH6 = (arr) => {
    return arr.filter(i => !(i.props && i.props.originalType === 'h6' && i.props.children === ''));
  }

  if (!activeIDs) {
    const newProps = {...props, children: removeEmptyH6(children)};
    return <React.Fragment {...newProps}/>; // page does not contain any tags or nothing is selected or everything is selected.
  }

  const isNextChildLower = (nextItem, currentHeader) => {
    const headers = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    if (!headers.includes(nextItem.toLowerCase())) { 
      return true; // next item is not a header
    } else if (headers.indexOf(currentHeader.toLowerCase()) < headers.indexOf(nextItem.toLowerCase())) {
      return true; // next item is header but it is lower
    } else {
      return false;
    }
  }

  const addHighterHeaders = (acc, headerLevel, index, activeChildren) => {
    if (headerLevel < 3) {
      return acc.reverse();
    }
    const highterHeader = children.slice(0, index).filter(i => i.props.originalType === `h${headerLevel - 1}`).pop();
    const isHeaderAlreadyDisplayed = !!(highterHeader && activeChildren && activeChildren.filter(c => c.props.id === highterHeader.props.id).length);
    const accumulatedHeaders = highterHeader && !isHeaderAlreadyDisplayed ? [...acc, highterHeader] : acc;
    return addHighterHeaders(accumulatedHeaders, headerLevel - 1, index);
  }

  const activeChildren = children.reduce((acc, child, index) => { 
    // Works only with headers that aren't hidden under <details>
    // Could be modified to walk recursively through child.props.children if it exists, but i doubt that we need it.

    if (acc.showChild && (!child.props || isNextChildLower(child.props.originalType, acc.currentHeaderType))) {
        acc.showChild = true;
    } else if (child.props && activeIDs.includes(child.props.id)) {
        acc.showChild = true;
        acc.currentHeaderType = child.props.originalType;
        const highterHeaders = addHighterHeaders([], parseInt(child.props.originalType.slice(1, 2), 10), index, acc.children);
        acc.children = [...acc.children, ...highterHeaders];
    } else {
        acc.showChild = false;
        // Note: Manipulating children style is possible like that by adding the child.props.style, i.e. to gray out some of them instead of filtering. 
        // newChild = {...child, props: {...child.props, style: {opacity: '0.3'}}}
    }
    return acc.showChild ? {...acc, children: [...acc.children, child]} : acc;

  }, {showChild: false, currentHeaderType: '', children: []});

  activeChildren.children.push(<p style={{textAlign: 'center', color: '#606770', fontSize: '90%'}}>Not found what you was looking for? Check the active filters</p>);

  return <React.Fragment children={removeEmptyH6(activeChildren.children)}/>
};

export default TagsWrapper;