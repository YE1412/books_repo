
node {
   //  def registryProjet='registry.gitlab.com/plaga1/projet_tomcat-nodejs'
   //  def IMAGE="${registryProjet}:version-${env.BUILD_ID}"
   
   stage('clone') {
         checkout scm
   }

   stage('Build Docker Image') {  
      //steps{ 
         //sh 'cd ./build/'
         sh 'cd ./build/ && docker-compose stop && docker-compose rm'
         sh 'cd ./build/ && docker rmi -f $(docker images -aq)'
         sh 'cd ./build/ && docker-compose up --build -d'     
         // echo 'Docker-compose-build Build Image Completed'                
       //}           
   }

   stage('Test') {
          sh 'docker ps'
          sh 'netstat -ntaup'
          sh 'sleep 15s'
          sh 'docker ps'
   }
    
   // stage('Push') {
   //    docker.withRegistry('https://registry.gitlab.com', 'reg1') { 
   //    img.push 'latest'
   //    img.push()
      
   //    }
   // }
}