pipeline {
    agent any

    tools {
        nodejs 'node20'
    }

    stages {
        stage('Install') {
            steps {
                sh '''
                  node -v
                  corepack enable
                  corepack prepare pnpm@9.12.0 --activate
                  pnpm install --frozen-lockfile
                '''
            }
        }

        stage('Test') {
            steps {
                sh 'pnpm test -- --coverage'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonar') {
                    sh 'npx sonar-scanner'
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 2, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}
