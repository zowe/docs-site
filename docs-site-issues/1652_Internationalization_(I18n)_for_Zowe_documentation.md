# Issue #1652: Internationalization (I18n) for Zowe documentation

**URL:** https://github.com/zowe/docs-site/issues/1652

**Created:** 2021-04-30T08:27:02Z

**Updated:** 2025-03-14T15:10:31Z

**Labels:** area: site-infrastructure, Size: L

---

_"Internationalization is the process of designing a software application so that it can be adapted to various languages and regions without engineering changes. Localization is the process of adapting internationalized software for a specific region or language by adding locale-specific components and translating text." - from wikipedia._  

For this issue, need to discuss and consider: 

- whether to support I18n for Zowe docs
- if yes, whether to establish a team for I18n and what's the responsibilities
- the languages (what lanaguages to translate)
- the I18n process (how to manage the translation process, what's the folder structure and working process)
- the team structure and governance
- a translation platform (need to investigate the options)
- There are some options for the localization feature (thanks @covalentbond):
   -  Using Git and manually translating the languages, storing the files in GitHub repository.
   - Using any third party SaaS application to **manage our localization** effectively. Docusaurus (our new site generator) is using [Crowdin](https://crowdin.com/). Since Crowdin is free to be used on Open Source Projects.
         We might need to verify that we are satisfying the criteria mentioned [here](https://crowdin.com/page/open-source-project-setup-request), and might need to create an account for the same. All the translated files will be stored and fetched from the Crowdin platform only. It will not be stored in GitHub repo.
   -  Using machine translations tools to provide the translations in different languages like Google Translate. (need to investigate options)

- how to manage I18n contributions from the community 

See some examples: 
- https://helm.sh/docs/community/localization/
- https://kubernetes.io/docs/contribute/localization/ 
