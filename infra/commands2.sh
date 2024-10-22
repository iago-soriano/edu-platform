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
docker-compose -f ./kc-docker.yml up
cat ./kc-docker.yml 
docker stop keycloak_p2
docker rm keycloak_p2

docker-compose logs keycloak_p2