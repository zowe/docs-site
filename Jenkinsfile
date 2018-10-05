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
def allowPublishing = env.BRANCH_NAME == 'master'

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
  description: 'If run the piublish step.',
  defaultValue: true
))
customParameters.push(string(
  name: 'PUBLISH_BRANCH',
  description: 'Target branch to publish',
  defaultValue: 'gh-pages',
  trim: true,
  required: true
))
customParameters.push(credentials(
  name: 'GITHUB_CREDENTIALS',
  description: 'Github user credentials',
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

node ('ibm-jenkins-slave-nvm') {
  currentBuild.result = 'SUCCESS'

  try {

    stage('checkout') {
      // checkout source code
      checkout scm

      // check if it's pull request
      echo "Current branch is ${env.BRANCH_NAME}"
      if (isPullRequest) {
        echo "This is a pull request"
      }
    }

    stage('build') {
      ansiColor('xterm') {
        sh 'npm install'
        sh 'npm run docs:build'
      }
    }

    stage('test') {
      ansiColor('xterm') {
        // list all files generated
        sh 'find docs/.vuepress/dist'
        // check broken links
        sh 'npm run test:links'
      }
    }

    utils.conditionalStage('publish', allowPublishing && params.RUN_PUBLISH) {
      ansiColor('xterm') {
        withCredentials([usernamePassword(
          credentialsId: params.GITHUB_CREDENTIALS,
          passwordVariable: 'GIT_PASSWORD',
          usernameVariable: 'GIT_USERNAME'
        )]) {
          sh """
            cd docs/.vuepress/dist
            git config --global user.email \"${params.GITHUB_USER_EMAIL}\"
            git config --global user.name \"${params.GITHUB_USER_NAME}\"
            git init
            git add -A
            git commit -m \"deploy from ${env.JOB_NAME}#${env.BUILD_NUMBER}\"
            git push -f https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/zowe/docs-site.git master:${params.PUBLISH_BRANCH}
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
