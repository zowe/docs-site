import React, { useState } from "react";

const makeNewComponentsObject = () => {
  return {
    "CLI": false,
    "Desktop": false,
    "Explorer": false,
    "Mediation Layer": false,
    "ZSS": false,
  }
}

const ComponentSelector = () => {
  // If we can get the tags for each page here, then we can filter the side panel and we could disable this selector if no tags defined for that page?
  const currentComponents = window.sessionStorage.getItem("ZoweDocs::selectedComponents"); 
  const [components, setComponents] = useState(currentComponents ? JSON.parse(currentComponents) : makeNewComponentsObject());
  
  const setStorage = (value) => {
    const item = JSON.stringify({...components, [value]: !components[value]});
    window.sessionStorage.setItem("ZoweDocs::selectedComponents", item);
    window.dispatchEvent( new Event('storage') ); 
    setComponents(JSON.parse(window.sessionStorage.getItem("ZoweDocs::selectedComponents")));
  }

  return (
    <div style={{padding: "16px"}}>
      {Object.keys(components).map(i => (
        <div key={i} style={{display: "flex", height: "28px", flexDirection: "row", alignItems: "center"}}>
          <input id={i} type="checkbox" checked={components[i]} onChange={() => setStorage(i)}/>
          <label style={{paddingLeft: "4px"}} for={i}>{i}</label>
        </div>))}
    </div>
  );
};

export default ComponentSelector;
