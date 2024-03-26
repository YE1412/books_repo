
node {
   
   stage('clone') {
         checkout scm
   }

   stage('Build Docker Image') {  
      steps{ 
         cd './build/'                    
         sh 'docker-compose up --build'     
         echo 'Docker-compose-build Build Image Completed'                
         }           
   }
   
}