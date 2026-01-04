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
                    /var/jenkins_home/tools/hudson.plugins.sonar.SonarRunnerInstallation/sonar-scanner/bin/sonar-scanner  \
                    -Dsonar.projectKey=node-ts-todo \
                    -Dsonar.sources=src \
                    -Dsonar.tests=tests \
                    -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                    -Dsonar.typescript.tsconfigPath=tsconfig.json \
                    -Dsonar.host.url=http://sonar:9000 \
                    -Dsonar.login=sqp_0e9923e7449ed74ba676a86d18bb20c9f7a71487
                    '''
                }

            }
        }
    }
}




