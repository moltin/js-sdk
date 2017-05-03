#!groovy

def err = null

try {
  node {
    stage ("Checkout") {
      gitClean()
      checkout scm
    }

    sshagent (credentials: ['github-moltin-moltinbot-ssh-key']) {
      stage ("Run tests") {
        docker.image('node:alpine').inside {
          npm run-script test
        }
      }

      stage ("Configure npm") {
        sh "docker run -e NPM_USER=$NPM_USERNAME -e NPM_PASS=$NPM_PASSWORD -e NPM_EMAIL=$NPM_EMAIL bravissimolabs/generate-npm-authtoken > .npmrc"
      }

      stage ("Versioning") {
        docker.image('zot24/semantic-release-cli').inside("-v \$(pwd):/data") {
          semantic-release-cli pre
        }

        docker.image('node:alpine').inside {
          npm publish
        }

        docker.image('zot24/semantic-release-cli').inside("-v \$(pwd):/data") {
          semantic-release-cli post
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

  if (config.error) {
    slackSend color: "warning", message: 'Semthing went wrong!'
  } else {
    slackSend color: "good", message: 'Everything just works fine!'
  }
}
