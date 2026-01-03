pipeline {
    agent any

    tools {
        nodejs 'node20'
    }

    stages {
        stage('Install') {
            steps {
                sh 'node -v'
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test -- --coverage'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonar') {
                    sh """
                    ${tool 'sonar-scanner'}/bin/sonar-scanner \
                      -Dsonar.projectKey=node-ts-todo \
                      -Dsonar.sources=. \
                      -Dsonar.host.url=http://localhost:9000 \
                      -Dsonar.login=sqp_42ea5a5628030625025f14e39e080f01649fb7f0
                    """
                }
            }
        }
    }
}
