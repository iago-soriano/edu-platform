terraform {
  # required_version = "1.3.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket = "terraform-state"
    key            = "global/s3/staging.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-locks"
    encrypt        = false
  }
}

provider "aws" {
  region = "us-east-1"
}