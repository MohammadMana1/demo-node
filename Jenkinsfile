/*
  Scripted pipeline that:
  - checks out your repo
  - installs Node 20 with nvm in user space (no sudo)
  - runs install, test
  - builds artifact.tgz and archives it
*/
node {
  stage("Checkout") {
    checkout scm
  }

  stage("Setup Node (nvm)") {
    sh '''
      set -e
      export NVM_DIR="$HOME/.nvm"
      # install nvm (user-space)
      curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
      . "$NVM_DIR/nvm.sh"
      nvm install 20
      nvm use 20
      node -v
      npm -v
      # cache the nvm path for later stages
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
    sh '''
      set -e
      # ensure tar exists (it does in the Jenkins LTS image)
      tar -czf artifact.tgz *
    '''
    archiveArtifacts artifacts: 'artifact.tgz', fingerprint: true
  }
}
