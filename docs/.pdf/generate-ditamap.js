const fs = require('fs');
const path = require('path');

const config = require('../.vuepress/config');

const template = fs.readFileSync(path.join(__dirname, 'Zowe_User_Guide.ditamap.template')).toString();
let result = template;

const now = new Date();
const y = now.getFullYear();
const m = now.getMonth() + 1;
const d = now.getDate();
result = result.replace(/{{build-date}}/, [y, m < 10 ? '0' + m : m, d < 10 ? '0' + d : d].join('-'));

const pdfConfig = config && config.pdf;
let topics = [];
const isExternalLink = link => link.match(/^https?:\/\//);
const addTopic = item => {
  // console.log('>>>', item);
  let result = [];

  if (item.items) {
    if (item.link) {
      result.push(`<topicref format="markdown" href="${item.link}" navtitle="${item.text}">`);
      for (let item2 of item.items) {
        result = result.concat(addTopic(item2));
      }
      result.push('</topicref>');
    } else {
      result.push(`<topicgroup navtitle="${item.text}">`);
      for (let item2 of item.items) {
        result = result.concat(addTopic(item2));
      }
      result.push('</topicgroup>');
    }
  } else if (item.link && item.text) {
    if (isExternalLink(item.link)) {
      result.push(`<topicref format="html" href="${item.link}" navtitle="${item.text}" scope="external" />`);
    } else {
      result.push(`<topicref format="markdown" href="${item.link}" navtitle="${item.text}" />`);
    }
  } else {
    if (isExternalLink(item)) {
      result.push(`<topicref format="html" href="${item}" scope="external" />`);
    } else {
      result.push(`<topicref format="markdown" href="${item}" />`);
    }
  }

  return result;
};

for (let item of pdfConfig) {
  topics = [...topics, ...addTopic(item)];
}
result = result.replace(/{{topics}}/, topics.join('\n'));

console.log(result);
