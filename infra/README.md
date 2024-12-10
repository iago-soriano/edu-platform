#How to set up a new project

Install Terraform CLI
Install AWS CLI
Get credentials for user in AWS Console and run `aws configure`

Create an assume role policy for terraform-cli and give it S3 permissions. Pass it in s3 backend
create resources in console: bastion-host, function code bucket and terraform state bucket
_Data resources must be in the same region as terraform_

Deploy functions before terraform apply, so that terraform finds the build.zip files in S3. It executes terraform apply.

Recreate bastion host after the first apply, so that you can create it in the same vpc. _Do Amazon Linux 2_

In order to SSH into the instance, check commands2.sh

_RDS username cannot have dashes_