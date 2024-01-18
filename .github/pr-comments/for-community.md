:smiley_cat: Thank you for creating this PR!

Certain labels are needed to open a pull request in the `docs-site` repo, but it looks like you may not be able to add labels. That's because you either do not have permissions or you are using a fork in your PR. To publish your content to [Zowe Docs](https://docs.zowe.org/), follow these steps.

- [ ] Use comments to add labels to your pull request. Enter the `/labels` command in a comment to add the required `review`, `area`, and `release` label types.
    - Example: Enter `/labels doc cli V2` to add the `review: doc`, `area: cli`, and `version: V2` labels to your PR.
        - The `review` label indicates the kind of review your content requires. The `area` label indicates the content topic area. The `release` labels tells us the major release aligned with your content.
        - See the [docs-site labels](https://github.com/zowe/docs-site/issues/labels) to see the labels are available for use.
    - To remove a label, use the minus sign: `/labels -V2`
- [ ] Select the `master` branch if your PR updates content that is on the **live site**. Select `docs-staging` if your PR updates content for a future release. Use the `v3-doc-branch` for Zowe V3 content.
- [ ] Notify the Doc Squad about this PR. If you don't know whom should review your content, message the [#zowe-doc](https://openmainframeproject.slack.com/archives/CC961JYMQ) Slack channel. If you know which Doc Squad writer should approve your content, add that person as a reviewer.

**Need help?** Contact the Doc Squad in the [#zowe-doc](https://openmainframeproject.slack.com/archives/CC961JYMQ) Slack channel.
