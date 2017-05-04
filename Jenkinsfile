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
        stage ("Checkout repo master branch") {
          sh "git checkout master"
        }
      }

      withCredentials([[$class: 'StringBinding', credentialsId: 'github-moltin-moltinbot-token', variable: 'GH_TOKEN']]) {
        stage ("Configure npm") {
          sh "docker run -e NPM_USER=$NPM_USERNAME -e NPM_PASS=$NPM_PASSWORD -e NPM_EMAIL=$NPM_EMAIL bravissimolabs/generate-npm-authtoken > .npmrc"
        }

        stage ("Versioning - semantic pre") {
          sh "docker run -v \$(pwd):/data -w /data -e GH_TOKEN=$GH_TOKEN zot24/semantic-release semantic-release pre"
        }

        stage ("Versioning - npm publish") {
          docker.image('node:alpine').inside {
            sh "npm publish"
          }
        }

        stage ("Versioning - semantic post") {
          sh "docker run -v \$(pwd):/data -w /data -e GH_TOKEN=$GH_TOKEN zot24/semantic-release semantic-release post"
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
