#!groovy

def err = null

try {
  node {
    stage ("Checkout") {
      gitClean()
      checkout scm
    }

    stage ("Provisioning") {
      docker.image('node:alpine').inside {
        sh "npm install"
      }
    }

    stage ("Run tests") {
      docker.image('node:alpine').inside {
        sh "npm run-script test"
      }
    }

    if (env.BRANCH_NAME == 'master') {
      stage ("Checkout repo master branch") {
        gitClean()
        sh "git checkout master"
      }

      withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'npm-moltin-moltinbot-password', usernameVariable: 'NPM_USERNAME', passwordVariable: 'NPM_PASSWORD']]) {
        stage ("Configure npm") {
          sh "docker run -e NPM_USER=$NPM_USERNAME -e NPM_PASS=$NPM_PASSWORD -e NPM_EMAIL=$NPM_EMAIL bravissimolabs/generate-npm-authtoken > .npmrc"

          env.NPM_TOKEN = sh (
            script: "set +x ; echo -n \$(cat .npmrc) | sed -n -e 's/^.*_authToken=//p'",
            returnStdout: true
          )
        }
      }

      withCredentials([[$class: 'StringBinding', credentialsId: 'github-moltin-moltinbot-token', variable: 'GH_TOKEN']]) {
        sshagent (credentials: ['github-moltin-moltinbot-ssh-key']) {
          stage ("Versioning - semantic pre") {
            docker.image("zot24/semantic-release").inside("-e GIT_BRANCH=\"origin/master\" -e CI=true") {
              sh "semantic-release pre"
            }
          }

          stage ("Versioning - npm publish") {
            docker.image('node:alpine').inside {
              sh "npm publish"
            }
          }

          stage ("Versioning - semantic post") {
            docker.image("zot24/semantic-release").inside("-e GIT_BRANCH=\"origin/master\" -e CI=true") {
              sh "semantic-release post"
            }
          }
        }
      }
    }
  }
  currentBuild.result = "SUCCESS"
} catch (caughtError) {
  err = caughtError
  currentBuild.result = "FAILURE"
} finally {
  echo "RESULT: ${currentBuild.result}"

  if (err) {
    slackSend color: "danger",
      message:
        """:cold_sweat: Something went wrong!.
        |${env.BUILD_URL}
        |Branch: ${env.BRANCH_NAME}""".stripMargin()

    throw err
  } else {
    slackSend color: "good",
      message:
        """:smirk: All good!.
        |${env.BUILD_URL}
        |Branch: ${env.BRANCH_NAME}""".stripMargin()
  }
}
