pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'npm ci && npm run build'
            }
        }
        stage('Deploy') {
            steps {
                sh '''
seconds=`date +"%s"`
tarfile=dist-$seconds.tar.gz
tar -cvzf $tarfile -C dist .
scp $tarfile deploy@stldevs.com:~
ssh deploy@stldevs.com << EOF
  rm -rf /var/www/*
  cp $tarfile /var/www
  cd /var/www
  tar -zxf $tarfile
EOF
'''
            }
        }
    }
}
