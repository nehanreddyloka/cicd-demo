pipeline {
    agent any

    environment {
        AWS_ACCOUNT_ID = '831441088496'  // your AWS account ID
        AWS_REGION = 'us-east-1'        // your region
        IMAGE_REPO_NAME = 'cicd-demo'
        IMAGE_TAG = "latest"
    }

    stages {
        stage('Clone Code') {
            steps {
                git 'https://github.com/nehanreddyloka/cicd-demo.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t cicd-demo .'
            }
        }

        stage('Login to ECR') {
            steps {
                sh '''
                aws ecr get-login-password --region $AWS_REGION | \
                docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
                '''
            }
        }

        stage('Tag & Push Image') {
            steps {
                sh '''
                docker tag cicd-demo:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$IMAGE_REPO_NAME:$IMAGE_TAG
                docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$IMAGE_REPO_NAME:$IMAGE_TAG
                '''
            }
        }

        stage('Deploy on EC2') {
            steps {
                sh '''
                docker stop webapp || true
                docker rm webapp || true
                docker run -d -p 80:3000 --name webapp $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$IMAGE_REPO_NAME:$IMAGE_TAG
                '''
            }
        }
    }
}
