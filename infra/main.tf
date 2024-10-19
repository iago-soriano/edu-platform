terraform {

  backend "s3" {
    profile = "default"
    region  = "us-east-1"
    bucket  = "edu-platform-terraform-state"
    key     = "edu-platform-terraform-state"
    # dynamodb_table = "terraform-state-lock-table"

    assume_role = {
      role_arn = "arn:aws:iam::140697572861:role/terraform-cli"
    }
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">=5.72.0"
    }
  }
}

provider "aws" {
  profile = "default"
  region  = "us-east-1"
}
