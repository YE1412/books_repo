
node {
   
   stage('clone') {
         checkout scm
   }

   stage('Build Docker Image') {  
      //steps{ 
         //sh 'cd ./build/'                    
         sh 'cd ./build/ && docker-compose up --build'     
         //echo 'Docker-compose-build Build Image Completed'                
      //}           
   }
   
}