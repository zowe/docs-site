# Issue #5021: yarn start fails due to deprecated `experimental_faster` config key in docusaurus.config.js

**URL:** https://github.com/zowe/docs-site/issues/5021

**Created:** 2026-05-12T23:23:32Z

**Updated:** 2026-05-13T21:08:19Z

---

### Description
Running `yarn start` after a fresh clone fails immediately with the following error:

<img width="1281" height="462" alt="Image" src="https://github.com/user-attachments/assets/3579690b-8db7-4ef2-9468-54cf156eeb97" />

### Steps to reproduce
1. Clone the repository
2. Run yarn install
3. Run yarn start

### Expected behavior
The local development server starts successfully.

### Actual behavior
The server fails to start with a config validation error. (see attached screenshot)

### Fix
In docusaurus.config.js, rename experimental_faster to faster.
