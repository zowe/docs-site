import React, { useState } from "react";
import styles from './styles.module.css';

// Notes: 
// DocSideBarItem can take optional props - customProps: item={{...item, customProps: {testprop: true}}}
// Rewrite in TS?

// FIXME: Cross dependency of Components and ESMs/Download types. Selecting of ESM should not affect components if no other ESMs are specified for page / topic?
const ESMs = ['All', 'RACF', 'TopSecret', 'ACF2'];
const downloadTypes = ['All', 'SMPE', 'Pax', 'Container'];
const makeNewComponentsObject = () => {
  const item = {
    tags: {
      cli: {label: "CLI", value: false},
      desktop: {label: "Desktop", value: false},
      explorer: {label: "Explorer", value: false},
      apiml: {label: "Mediation Layer", value: false},
      zss: {label: "ZSS", value: false}
    },
    esm: ESMs[0],
    downloadType: downloadTypes[0],
  }
  window.sessionStorage.setItem("ZoweDocs::selectedComponents", JSON.stringify(item));
  return item;
}

const ComponentSelector = () => {
  const currentComponents = window.sessionStorage.getItem("ZoweDocs::selectedComponents"); 
  const [components, setComponents] = useState(currentComponents ? JSON.parse(currentComponents) : makeNewComponentsObject());
  const [showTagsSelector, toggleTagsSelector] = useState(false);
  
  const setStorage = item => {
    window.sessionStorage.setItem("ZoweDocs::selectedComponents", item);
    window.dispatchEvent( new Event('storage') ); 
    setComponents(JSON.parse(window.sessionStorage.getItem("ZoweDocs::selectedComponents")));
  }

  const setTags = tag => {
    const tags = components.tags;
    tags[tag].value = !tags[tag].value;
    const item = JSON.stringify({...components, tags});
    setStorage(item);
  }

  const setESM = type => {
    const item = JSON.stringify({...components, esm: type});
    setStorage(item);
  }

  const setDownloadType = type => {
    const item = JSON.stringify({...components, downloadType: type});
    setStorage(item);
  }

  return (
    <div className={styles.tagsSelectorContainer}>
      <div className={styles.tagsSeparator}/>
      <div className={styles.collapsibleTagsSelector} onClick={() => toggleTagsSelector(!showTagsSelector)}>
        <p className={styles.tagsSelectorLabel}>Select tags or components</p>
        <a className={`${styles.arrowIcon} menu__link--sublist`} style={{transform: showTagsSelector ? 'rotate(0deg)' : 'rotate(-90deg)'}}/>
      </div>
      
      <div className={styles.tagsSelectorContent} style={{height: showTagsSelector ? '420px' : '0px'}}>
        <label className={styles.tagSectionLabel} for={'components'}>Components</label>
        <div id="components" className={styles.tagsSection}>
          {Object.keys(components.tags).map(i => (
            <div key={i} className={styles.tagOption}>
              <input id={i} type="checkbox" checked={components.tags[i].value} onChange={() => setTags(i)}/>
              <label style={{paddingLeft: "4px"}} for={i}>{components.tags[i].label}</label>
            </div>
          ))}
        </div>

        <label className={styles.tagSectionLabel} for={'esm'}>ESMs</label>
        <div id="esm" className={styles.tagsSection}>
          {ESMs.map(esm => <div className={styles.tagOption}>
            <input 
              id={esm} 
              className={styles.tagRadioInput} 
              onChange={() => setESM(esm)} 
              type="radio" 
              name="esm-types" 
              value={esm} 
              checked={esm === components.esm}
            />
            <label for={esm}>{esm}</label>
          </div>)}
        </div>

        <label className={styles.tagSectionLabel} for={'downloadType'}>Download Types</label>
        <div id="downloadType" className={styles.tagsSection}>
          {downloadTypes.map(type => <div className={styles.tagOption}>
            <input 
              id={type}
              className={styles.tagRadioInput} 
              onChange={() => setDownloadType(type)} 
              type="radio" 
              name="download-types" 
              value={type} 
              checked={type === components.downloadType}
            />
            <label for={type}>{type}</label>
          </div>)}
        </div>

      </div>
    </div>
  );
};

export default ComponentSelector;
