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
      sshagent (credentials: ['github-moltin-moltinbot-ssh-key']) {
        stage ("Checkout master branch") {
          gitClean()
          sh "git checkout master"
          sh "git pull"
        }
      }

      stage ("Prune + Provisioning") {
        docker.image('node:alpine').inside {
          sh "npm prune"
        }
      }

      stage ("Provisioning") {
        docker.image('node:alpine').inside {
          sh "npm install"
        }
      }

      stage ("Configure npm") {
        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'npm-moltin-moltinbot-password', usernameVariable: 'NPM_USERNAME', passwordVariable: 'NPM_PASSWORD']]) {
          sh "docker run -e NPM_USER=$NPM_USERNAME -e NPM_PASS=\"$NPM_PASSWORD\" -e NPM_EMAIL=$NPM_EMAIL bravissimolabs/generate-npm-authtoken > .npmrc.tmp"

          env.NPM_TOKEN = sh (
            script: "set +x ; echo -n \$(cat .npmrc.tmp) | sed -n -e 's/^.*_authToken=//p'",
            returnStdout: true
          )
        }
      }

      try {
        stage ("Versioning") {
          withCredentials([[$class: 'StringBinding', credentialsId: 'github-moltin-moltinbot-token', variable: 'GH_TOKEN']]) {
            sshagent (credentials: ['github-moltin-moltinbot-ssh-key']) {
              env.CI=true
              env.GIT_BRANCH="origin/master"

              docker.image("zot24/semantic-release").inside {
                sh "semantic-release pre"
              }

              docker.image('node:alpine').inside {
                sh "mv .npmrc.tmp .npmrc"
                sh "npm publish"
              }

              docker.image("zot24/semantic-release").inside {
                sh "semantic-release post"
              }
            }
          }
        }

        stage ("Cleaning up") {
          sh "rm .npmrc"
        }
      } catch (Exception e) {
        sh "rm .npmrc.tmp"
        echo "Failed versioning with semantic-release, check logs above)"
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
