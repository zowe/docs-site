#!groovy

/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2018
 */

def isPullRequest = env.BRANCH_NAME.startsWith('PR-')
def slackChannel = '#test-build-notify'
def githubRepository = 'zowe/docs-site'
def allowPublishing = false
def isTestPublishing = false
def publishTargetPath = 'stable'
def isMasterBranch = env.BRANCH_NAME == 'master'
def isReleaseBranch = env.BRANCH_NAME ==~ /^v[0-9]+\.[0-9]+\.[0-9x]+$/

def opts = []
// keep last 20 builds for regular branches, no keep for pull requests
opts.push(buildDiscarder(logRotator(numToKeepStr: (isPullRequest ? '' : '20'))))
// disable concurrent build
opts.push(disableConcurrentBuilds())

// define custom build parameters
def customParameters = []
// >>>>>>>> parameters to control pipeline behavior
customParameters.push(booleanParam(
  name: 'RUN_PUBLISH',
  description: 'If run the publish step. Only take effect when building on "master" and "v?.?.x" branches. This option provides a chance to disable publish on those branches.',
  defaultValue: true
))
customParameters.push(string(
  name: 'PUBLISH_BRANCH',
  description: 'Target branch to publish. By default will be "gh-pages". If you specify a branch name starts with "gh-pages-test", you can always perform test publishing.',
  defaultValue: 'gh-pages',
  trim: true,
  required: true
))
customParameters.push(string(
  name: 'PUBLISH_PATH',
  description: 'Target URL path to publish. Default is "stable" for master branch, "v?.?.x" for v?.?.x release branches.',
  defaultValue: '',
  trim: true,
  required: false
))
customParameters.push(booleanParam(
  name: 'FULL_SITE_LINKS_CHECK',
  description: 'If run links check on all latest and archived versions, not only checking current build.',
  defaultValue: false
))
customParameters.push(credentials(
  name: 'GITHUB_CREDENTIALS',
  description: 'Github user credentials. Required to publish build result to gh-pages.',
  credentialType: 'com.cloudbees.plugins.credentials.impl.UsernamePasswordCredentialsImpl',
  defaultValue: 'zowe-robot-github',
  required: true
))
customParameters.push(string(
  name: 'GITHUB_USER_EMAIL',
  description: 'github user email',
  defaultValue: 'zowe.robot@gmail.com',
  trim: true,
  required: true
))
customParameters.push(string(
  name: 'GITHUB_USER_NAME',
  description: 'github user name',
  defaultValue: 'Zowe Robot',
  trim: true,
  required: true
))
opts.push(parameters(customParameters))

// set build properties
properties(opts)

node ('zowe-jenkins-agent-dind') {
  currentBuild.result = 'SUCCESS'

  // if we are on master, or v?.?.? / v?.?.x branch, we allow publish
  // if we publish target branch to test branch, we allow it anyway
  isTestPublishing = params.PUBLISH_BRANCH.startsWith('gh-pages-test')
  if (isMasterBranch || isReleaseBranch || isTestPublishing) {
    allowPublishing = true
  }
  if (allowPublishing && isReleaseBranch) {
    publishTargetPath = env.BRANCH_NAME
  }
  if (allowPublishing && params.PUBLISH_PATH) { // this is manually assigned parameter value
    publishTargetPath = params.PUBLISH_PATH
  }

  try {

    stage('checkout') {
      // checkout source code
      checkout scm

      // check if it's pull request
      echo "Current branch is ${env.BRANCH_NAME}"
      if (allowPublishing) {
        echo "**** Will publish to \"${params.PUBLISH_BRANCH}\" branch \"${publishTargetPath}\" directory"
      } else {
        echo "**** Publish stage will be skipped"
      }
      if (isPullRequest) {
        echo "This is a pull request"
      }
    }

    stage('prepare') {
      // prepare .deploy folder
      // checkout params.PUBLISH_BRANCH to .deploy folder
      sh """
        git config --global user.email \"${params.GITHUB_USER_EMAIL}\"
        git config --global user.name \"${params.GITHUB_USER_NAME}\"
        mkdir -p .deploy
        cd .deploy
        git init
        git remote add origin https://github.com/${githubRepository}.git
        git fetch
        git checkout -B ${params.PUBLISH_BRANCH}
        if [ -n "\$(git ls-remote --heads origin ${params.PUBLISH_BRANCH})" ]; then git pull origin ${params.PUBLISH_BRANCH}; fi
        cd ..
      """
      if (isMasterBranch) {
        // alway try to update default pages from master branch
        sh 'cp -r gh-pages-default/. .deploy/'
      }
    }

    stage('build') {
      ansiColor('xterm') {
        sh 'npm install'
        sh "PUBLISH_TARGET_PATH=${publishTargetPath} NODE_OPTIONS=--max_old_space_size=4096 npm run build"
      }
    }

    stage('test') {
      ansiColor('xterm') {
        // list all files generated
        sh "find .deploy | grep -v '.deploy/.git'"
        // check broken links
        timeout(30) {
          if (params.FULL_SITE_LINKS_CHECK) {
            sh 'npm run test:links'
          } else {
            def publishTargetPathConverted = publishTargetPath.replaceAll(/\./, '-')
            sh "npm run test:links -- --start-point /${publishTargetPathConverted}/"
          }
        }
      }
    }

    stage('pdf') {
      ansiColor('xterm') {
        // lock building pdf step since the docker pulling image stage cause build failure
        lock('building-docs-pdf') {
          timeout(time: 1, unit: 'HOURS') {
            sh 'npm run docs:pdf'
          }
        }
        if (fileExists('static/zowe-docs.pdf')) {
          def currentVersion = this.steps.sh(
            script: "node -e 'const config = require(\"./docusaurus.config.js\");console.log(config.customFields.latestVersion);'",
            returnStdout: true).trim()
        sh "mv static/zowe-docs.pdf static/zowe-docs-${currentVersion}.pdf"
        } else {
          error 'Failed to generate PDF document.'
        }
      }
    }

    utils.conditionalStage('publish', allowPublishing && params.RUN_PUBLISH) {
      ansiColor('xterm') {
        withCredentials([usernamePassword(
          credentialsId: params.GITHUB_CREDENTIALS,
          passwordVariable: 'GIT_PASS',
          usernameVariable: 'GIT_USER'
        )]) {
          sh """
            export DEPLOYMENT_BRANCH=${params.PUBLISH_BRANCH}
            npm run deploy
          """
        }
      }
    }

    stage('done') {
      // send out notification
      // slackSend channel: slackChannel,
      //           color: 'good',
      //           message: "Job \"${env.JOB_NAME}\" build #${env.BUILD_NUMBER} succeeded.\n\nCheck detail: ${env.BUILD_URL}"

      emailext body: "Job \"${env.JOB_NAME}\" build #${env.BUILD_NUMBER} succeeded.\n\nCheck detail: ${env.BUILD_URL}" ,
          subject: "[Jenkins] Job \"${env.JOB_NAME}\" build #${env.BUILD_NUMBER} succeeded",
          recipientProviders: [
            [$class: 'RequesterRecipientProvider'],
            [$class: 'CulpritsRecipientProvider'],
            [$class: 'DevelopersRecipientProvider'],
            [$class: 'UpstreamComitterRecipientProvider']
          ]
    }

  } catch (err) {
    currentBuild.result = 'FAILURE'

    // catch all failures to send out notification
    // slackSend channel: slackChannel,
    //           color: 'warning',
    //           message: "Job \"${env.JOB_NAME}\" build #${env.BUILD_NUMBER} failed.\n\nError: ${err}\n\nCheck detail: ${env.BUILD_URL}"

    emailext body: "Job \"${env.JOB_NAME}\" build #${env.BUILD_NUMBER} failed.\n\nError: ${err}\n\nCheck detail: ${env.BUILD_URL}" ,
        subject: "[Jenkins] Job \"${env.JOB_NAME}\" build #${env.BUILD_NUMBER} failed",
        recipientProviders: [
          [$class: 'RequesterRecipientProvider'],
          [$class: 'CulpritsRecipientProvider'],
          [$class: 'DevelopersRecipientProvider'],
          [$class: 'UpstreamComitterRecipientProvider']
        ]

    throw err
  }
}

