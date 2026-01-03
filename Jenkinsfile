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
                    sh '''
                    sonar-scanner \
                    -Dsonar.projectKey=node-ts-todo \
                    -Dsonar.sources=src \
                    -Dsonar.tests=tests \
                    -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                    -Dsonar.typescript.tsconfigPath=tsconfig.json \
                    -Dsonar.host.url=http://sonar:9000 \
                    -Dsonar.login=sqp_e3a46de400a547d2f7cd981f132e5af555ec7c68
                    '''
                }

            }
        }
    }
}
