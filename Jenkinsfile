#!groovy

def err = null

try {
  node {
    stage ("Checkout") {
      gitClean()
      checkout scm
    }

    sshagent (credentials: ['github-moltin-moltinbot-ssh-key']) {
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

      stage ("Configure npm") {
        sh "docker run -e NPM_USER=$NPM_USERNAME -e NPM_PASS=$NPM_PASSWORD -e NPM_EMAIL=$NPM_EMAIL bravissimolabs/generate-npm-authtoken > .npmrc"
      }

      stage ("Versioning") {
        docker.image('zot24/semantic-release').inside("-v \$(pwd):/data") {
          sh "semantic-release pre"
        }

        docker.image('node:alpine').inside {
          sh "npm publish"
        }

        docker.image('zot24/semantic-release').inside("-v \$(pwd):/data") {
          sh "semantic-release post"
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
    slackSend color: "warning", message: 'Something went wrong!'
  } else {
    slackSend color: "good", message: 'Everything just works fine!'
  }
}
