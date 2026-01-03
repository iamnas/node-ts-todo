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
                      -Dsonar.projectKey=nodejs \
                      -Dsonar.sources=src \
                      -Dsonar.tests=tests \
                      -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                      -Dsonar.typescript.tsconfigPath=tsconfig.json
                    """
                }
            }
        }
    }
}
