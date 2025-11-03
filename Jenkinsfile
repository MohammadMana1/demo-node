node {
  stage("Checkout") { checkout scm }
  stage("Setup Node (nvm)") {
    sh '''
      set -e
      export NVM_DIR="$HOME/.nvm"
      curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
      . "$NVM_DIR/nvm.sh"
      nvm install 20
      nvm use 20
      node -v
      npm -v
      echo "export NVM_DIR=\\"$NVM_DIR\\"" > .nvm_env
      echo ". \\"$NVM_DIR/nvm.sh\\"" >> .nvm_env
    '''
  }
  stage("Install") {
    sh '''
      set -e
      . ./.nvm_env
      nvm use 20
      npm ci || npm install
    '''
  }
  stage("Test") {
    sh '''
      set -e
      . ./.nvm_env
      nvm use 20
      npm test
    '''
  }
  stage("Build artifact") {
    sh 'tar -czf artifact.tgz *'
    archiveArtifacts artifacts: "artifact.tgz", fingerprint: true
  }
}