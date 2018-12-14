const fs = require('fs');
const path = require('path');

const config = require('../.vuepress/config');

const template = fs.readFileSync(path.join(__dirname, 'Zowe_Documentation.ditamap.template')).toString();
let result = template;

// replace doc version
result = result.replace(/{{version}}/, config.version);

// replace create date
const now = new Date();
const y = now.getFullYear();
const m = now.getMonth() + 1;
const d = now.getDate();
result = result
  .replace(/{{build-year}}/, y)
  .replace(/{{build-date}}/, [y, m < 10 ? '0' + m : m, d < 10 ? '0' + d : d].join('-'));

// replace topics list
const pdfConfig = config && config.pdf;
let topics = [];
const isExternalLink = link => link.match(/^https?:\/\//);
const addTopic = (item, level) => {
  level = level || 0;
  // console.log('>>>', item);
  let result = [];
  const tag = level === 0 ? 'chapter' : 'topicref';

  if (item.items) {
    if (item.link) {
      result.push(`<${tag} format="markdown" href="${item.link}" navtitle="${item.text}">`);
      for (let item2 of item.items) {
        result = result.concat(addTopic(item2, level + 1));
      }
      result.push(`</${tag}>`);
    } else {
      result.push(`<${tag} navtitle="${item.text}">`);
      for (let item2 of item.items) {
        result = result.concat(addTopic(item2, level + 1));
      }
      result.push(`</${tag}>`);
    }
  } else if (item.link && item.text) {
    if (!isExternalLink(item.link)) {
      result.push(`<${tag} format="markdown" href="${item.link}" navtitle="${item.text}" />`);
    }
  } else {
    if (!isExternalLink(item)) {
      result.push(`<${tag} format="markdown" href="${item}" />`);
    }
  }

  return result;
};

for (let item of pdfConfig) {
  topics = [...topics, ...addTopic(item)];
}
result = result.replace(/{{topics}}/, topics.join('\n'));

// echo result
console.log(result);
