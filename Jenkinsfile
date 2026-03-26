pipeline {
    agent any
 
    environment {
        APP_NAME   = 'cicd-demo'
        IMAGE_NAME = "${APP_NAME}:${BUILD_NUMBER}"
    }
 
    stages {
        stage('Checkout') {
            steps {
                echo '=== Récupération du code ==='
                checkout scm
            }
        }
 
        stage('Build Docker Image') {
            steps {
                echo '=== Construction de l image Docker ==='
                sh 'docker build -t ${IMAGE_NAME} .'
            }
        }
 
        stage('Run Tests') {
            steps {
                echo '=== Exécution des tests ==='
                sh 'docker run --rm ${IMAGE_NAME} sh -c "npm install && npm test"'
            }
        }
 
        stage('Deploy Local') {
            when { branch 'main' }
            steps {
		 echo '=== Déploiement local ==='
                sh '''
                    docker stop ${APP_NAME} 2>/dev/null || true
                    docker rm   ${APP_NAME} 2>/dev/null || true
                    docker run -d --name ${APP_NAME} \
                               -p 3000:3000 \
                               ${IMAGE_NAME}
                    echo 'Application déployée sur http://localhost:3000'
                '''
            }
        }
    }
 
    post {
        success { echo 'SUCCÈS : Pipeline terminé avec succès' }
        failure { echo 'ÉCHEC : Vérifiez les logs ci-dessus' }
        always  {
            sh 'docker image prune -f || true'
        }
    }
}

