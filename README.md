# Zowe Documentation

## Development

### Prepare Development Environment

You will need node.js and npm installed on your local computer.

To prepare your local development environment, run this command:

```
npm install
```

You can test out the documentation while you working on the changes. Run

```
npm run docs:dev
```

Then you can access the documentation with URL `http://localhost:8080/docs-site/latest/`. Every time if you modify and save a documentation file, the local development build will be triggered automatically, then you can refresh your browser to see the changes.

### Test Your Modifications

You will need `Docker` to run broken links test. Check https://www.docker.com/get-started to install Docker.

You can test broken links with these commands. First compile the documentation with command:

```
npm run docs:build
```

Then run broken links test with this command:

```
npm run test:links:latest
```

Check `Warning of broken links and other issues (source target lines code fragments):` sections for warnings, and Check `Errors of broken links and other issues (source target lines code fragments):` sections for errors.

Errors must be fixed before merge to master branch, otherwise the pull request will be blocked.

_Please note, if we have multiple documentation versions in place, you may see broken links warnings on links to other versions._

## Build and Archive Legacy Documentation

### Automatic Build

Build will be automatically triggered by commit or pull request, and pipeline `Jenkinsfile` will be executed. Build result will be published to `gh-pages` branch `latest` folder, which will be synced to Github Pages hosting.

### Tag A Patch Version

At the release date of Zowe, we should tag the version. For example, we are releasing Zowe `v0.10.3` today, we need to create and push tag like this:

```
git checkout master
git pull
git tag v0.10.3
git push --tags
```

### Archive Document And Create A Version

**Q: First, when should we archive a doc version?**

**A:** We should archive last version of documentation before a new Zowe minor release is ready, or new Zowe minor version features are about to be merged into master branch. For example, latest Zowe stable version is v0.9.10, and we are preparing for v0.10.0. Before v0.10.0 feature documentation is merged to master, we should archive the v0.9.x documentation, to make sure v0.10.x features are not in v0.9.x documentation.

Please follow these steps to archive documentation. Below example are based on archiving `v0.9.x` before we start `v0.10.x`.

- Double check `master` branch is ready to be archived. All `v0.9.x` information should be in place and `v0.10.x` information are not merged into `master` yet.
- `Jenkinsfile.archive` is the pipeline to be executed. Currently the build name is called `docs-site-archive`. Choose `Build with Parameters` option, input `v0.9.x` as `RELEASE_VERSION` parameter, then click on `BUILD`.
- The build will create a protected branch called `v0.9.x`. Same as `mater` branch, any changes make to this branch requires pull request, reviewer and DCO check passed.
- New branch `v0.9.x` will trigger a new build, and publish the build result to `gh-pages` branch `v0-9-x` folder. _Please note, the folder name is using `-` instead of `.`, which is a limitation of VuePress._
- Create a pull request on https://github.com/algolia/docsearch-configs/blob/master/configs/zowe.json#L7 to update Algolia crawler configuration. If we have new `v0.9.x` version, add an entry of `"v0-9-x"` to `start_urls.0.variables.version` array.
- Create a new branch from `master`, add a new record to `docs/.vuepress/versions.json`. Please make sure your JSON file is valid. Example record:

```
{
  "text": "v0.9.x",
  "link": "v0-9-x/"
}
```
- Create pull request and merge the new version entry change into `master` branch. After build, the latest version of documentation website will have a `Versions` dropdown with options to switch to `v0.9.x` documentation.

Now we have two documentation threads:

- **master**: this is the main thread, same as before. Changes added to this branch will be automatically published to `/latest` path.
- **v0.9.x**: this is the legacy version v0.9.x thread. Any changes added to this branch will be automatically published to `/v0-9-x` path.

As time goes, we may have multiple legacy versions. We can still go back to version branch to make changes, fix errors.
