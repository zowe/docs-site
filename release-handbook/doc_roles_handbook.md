# Zowe documentation squad roles

This document covers the responsibilities, time commitments, and basic processes and guidance for different roles within the Zowe Docs team. 

## Zowe docs roles

- Zowe Docs Lead
- Zowe Docs Scrum Master
- Zowe Docs Lead Shadows/Co-lead
- Zowe TSC Rep for Doc Squad
- Zowe Release Lead

## Docs Lead Responsibilities

The Docs Lead is responsible for coordinating documentation updates for new Zowe releases, managing the Zowe docs-site repo, and leading the squad to define documentation roadmap and strategy.

Responsibilities include:

Task | Where | Time requirements | Resources, comments 
---| ---| ---| ---
Monitor Zowe docs-site issues and assign owners | Zowe docs-site GitHub repo | 1-2 hours a week | Looking to automate the process
Monitor Zowe doc-site Pull Requests and assign reviewers | Zowe docs-site GitHub repo | 1 hour a week | 
Identify and track new Zowe documentation requests and feedback in other channels like Slack, provide response, and convert into actionable issues | Slack, meetings where invited, emails | Depends, usually 2-3 hours a week | As a squad lead, you'll be the go-to-person whenever people have questions, comments, or ideas about documentation so might get involved in different discussions.
Offer guidance to doc contributors about the doc site process and answer questions | Slack, GitHub repo | On demand, usually <1 hour a week depending on the complexity of help needed | New developers in other squads are also doc contributors. Introduce new contributors to the doc process and empower them with the knowledge needed to get started.
Maintain and optimize documentation processes and update the instructions | Zowe docs-site repo | Depends | Release handbook, maintainer handbook, contributing guidelines, release process, PR review guide, issue triage guide, etc. 
Identify overall documentation improvement areas and lead the squad to discuss and take action | / | Depends | For example, overall architectural change that requires squad collaboration and discussion, initiatives from other squads that need doc participation. 
Join Zowe quarterly webinar to present Zowe doc changes | Zowe webinar | On demand | Onboarding squad will contact the lead if there is need for doc squad to join. 
Participate in Zowe PI planning, present the squad objectives and bring back feedback | Zowe PI planning sessions | 3 days for each PI | The squad lead also needs to schedule breakout sessions and lead the squad members to discuss and finalize the objectives. 
Coordinate issues related to 3rd-party tools/apps/accounts used as part of Zowe Docs | 3rd-party platforms/channels | Depends | 3rd-party tools/apps/accounts on the doc site include but are not limited to: Docusaurus (https://github.com/facebook/docusaurus) as Zowe doc site static generator, Algolia (https://github.com/algolia/docsearch-configs) as Zowe doc search provider, Zoom as meeting platform (need host account to be able to record meetings).
Review and gather traffic metrics for the Zowe doc site | [Google Analytics](https://analytics.google.com/analytics/web/?pli=1#/report-home/a123892882w182244853p179968930/%3F_u.date00=20180814&_u.date01=20190109) | Depending on the analysis type. Simply pulling and reviewing data takes less than 30 minutes. | Permission is needed to access the console. The doc squad lead should have view access.


## Docs Scrum Master Responsibilities

Responsibilities include:

Task | Where | Time requirements | Resources, comments
---| ---| ---| ---
Schedule and organize docs meetings | Zoom, OMP Calendar | <1 hour a week | Needs the credentials for the OMP account to be able to record meetings.
Gather agenda items from the squad and run the meeting to lead squad members to go through agenda items | Zoom | 1.1 hour biweekly | Send meeting reminder and actions items after the meeting. Upload recordings or share recording links. Streamline meeting process. 

## Zowe Docs Lead Shadows/Co-lead

The Co-lead or Shadow idea is that the co-lead learns by doing, while in the process taking load off the lead and improving the doc process. For example, 
- handle tasks that the lead may not be able to cover
- act as a backup of the lead
- learn and share knowledge about the release process or doc site management process
- help the lead drive doc initiatives
- help contributors participate in Zowe docs

## Zowe TSC Rep for Doc Squad

Responsibilities include:
- Join weekly TSC meeting. 
- Give an update about the doc squad's work. 
- Cast votes on community 

See [https://github.com/zowe/community/blob/master/Technical-Steering-Committee/tsc-governance.md](https://github.com/zowe/community/blob/master/Technical-Steering-Committee/tsc-governance.md) for more details. 

## Release Lead

A dedicated person handling all the doc release preparation. There could be a shadow for different releases. 

Task | Where | Time requirements | Resources, comments 
---| ---| ---| ---
Coordinate release activities for docs, communicate the release schedule, monitor all release tasks to be completed on time | Zowe docs-site repo, Slack | 2-3 hours per release | In general, there's a lot of work in the last week of the release cycle as documentation deadline approaches.
Prepare the new release doc site | Zowe docs-site repo | 1-2 hour per release | See [Release handbook](release_handbook.md) for detailed instructions. 
Sync updates from `master` branch into `docs-staging` branch periodically between releases | Zowe docs-site repo | About 1 hour per release depending on complexity | After a new release rolls out, if there is a fix or new change that goes into the master branch directly, ensure that the updates are synced back to docs-staging periodically by mering the relevant commits from `master` to `docs-staging`. To do that, compare `docs-staging` to `master` branch and select the commits that apply. 
