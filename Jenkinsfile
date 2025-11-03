pipeline {
  agent any
  tools { nodejs "Node20" }  // must match the name you set above
  stages {
    stage("Checkout")   { steps { checkout scm } }
    stage("Install")    { steps { sh "npm ci || npm install" } }
    stage("Test")       { steps { sh "npm test" } }
    stage("Build artifact") {
      steps {
        sh "tar -czf artifact.tgz *"
        archiveArtifacts artifacts: "artifact.tgz", fingerprint: true
      }
    }
  }
}
