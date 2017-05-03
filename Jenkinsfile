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
