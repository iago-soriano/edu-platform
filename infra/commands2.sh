# Connect to EC2
ssh -i ./bastion-key-pair.pem ec2-user@ec2-18-206-100-102.compute-1.amazonaws.com

# Connecting to postgres from ec2
sudo amazon-linux-extras install postgresql14
psql -h main.c1c84wo0orc8.us-east-1.rds.amazonaws.com -p 5432 -U eduplatformisrmprgs -d eduplatform

# Install docker
sudo amazon-linux-extras install docker -y

docker --version
sudo usermod -a -G docker ec2-user
sudo service docker start

docker run hello-world

sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose version

# Setup keycloak
CREATE DATABASE keycloak
\l #list all databases
sudo yum update -y

sudo yum install openssl -y
mkdir ~/keycloak-certs
cd ~/keycloak-certs
openssl genrsa -out keycloak.key 2048
openssl req -new -key keycloak.key -out keycloak.csr
openssl x509 -req -days 365 -in keycloak.csr -signkey keycloak.key -out keycloak.crt
openssl pkcs12 -export -in keycloak.crt -inkey keycloak.key -out keycloak.p12 -name keycloak -CAfile keycloak.crt -caname root
isrmprgs23031103
sudo mkdir -p /etc/x509/https
sudo mv ~/keycloak-certs/keycloak.p12 /etc/x509/https

sudo mkdir -p /home/ec2-user/keycloak/config
sudo touch /home/ec2-user/keycloak/config/keycloak.conf

sudo chown -R ec2-user:ec2-user /home/ec2-user/keycloak/

vim /home/ec2-user/keycloak/config/keycloak.conf

https-key-store-file=/opt/keycloak/conf/keycloak.p12
https-key-store-password=<your-password>
https-port=8443


# paste docker-compose file into ec2
echo "services:
  keycloak:
    container_name: keycloak_p2
    image: quay.io/phasetwo/phasetwo-keycloak
    restart: always
    command: start --verbose --db=postgres --https-key-store-file=/opt/keycloak/conf/keycloak.p12 --https-key-store-password=
    environment:
      - KEYCLOAK_ADMIN=admin
      - KEYCLOAK_ADMIN_PASSWORD=
      - DB_VENDOR=postgres
      - KC_DB_DRIVER=postgres
      - KC_HOSTNAME_STRICT=false
      - KC_DB_URL=jdbc:postgresql://main.c1c84wo0orc8.us-east-1.rds.amazonaws.com:5432/keycloak?user=eduplatformisrmprgs&password=
      - DB_USER=eduplatformisrmprgs
      - DB_PASSWORD=
    volumes:
      - ./keycloak/config/keycloak.conf:/opt/keycloak/conf/keycloak.conf
      - /etc/x509/https/keycloak.p12:/opt/keycloak/conf/keycloak.p12
    ports:
      - "8443:8443"
" > ./kc-docker.yml

docker-compose -f ./kc-docker.yml up
cat ./kc-docker.yml 
docker stop keycloak_p2
docker rm keycloak_p2

docker-compose logs keycloak_p2



echo "net.ipv4.ip_forward = 1" | sudo tee -a /etc/sysctl.d/custom-ip-forwarding.conf

source ~/.bashrc
cd /mnt/c/users/patricia/documents/edu-platform/edu-platform/infra/scripts
exec ssh-agent bash
ssh-add bastion-ssh.pem
ssh -A ec2-user@ec2-3-87-132-225.compute-1.amazonaws.com

psql -h main.cchtfaepyqev.us-east-1.rds.amazonaws.com -U isrm -d core

PASSWORD

CREATE DATABASE name
\l #list all databases
DROP DATABASE IF EXISTS name;
CREATE DATABASE name;

sudo yum update -y
sudo yum install git -y

git clone https://github.com/iago-soriano/edu-platform.git
#install nvm and node
https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html
npm i
export DATABASE_URL=postgres://isrm:PASSWORD@main.cchtfaepyqev.us-east-1.rds.amazonaws.com:5432
npm run db:push:core
npm run db:push:iam

sudo yum install docker
sudo usermod -a -G docker ec2-user
id ec2-user
# Reload a Linux user's group assignments to docker w/o logout
newgrp docker
docker ps -a

docker run -p 80:80 -e 'PGADMIN_DEFAULT_EMAIL=user@domain.com' -e 'PGADMIN_DEFAULT_PASSWORD=' -d --name=pg-admin dpage/pgadmin4
docker container start pg-admin
http://ec2-3-87-132-225.compute-1.amazonaws.com/browser/

docker run --name=edu-platform-psql -p 5432:5432 -e POSTGRES_PASSWORD='' -e POSTGRES_USER=isrm -e POSTGRES_DB=db -v ~/edu-platform/psql-data/:/var/lib/postgresql/data postgres
docker container start edu-platform-psql

