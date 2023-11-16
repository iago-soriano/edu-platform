module "vpc" {
  source = "./network"
}

module "db" {
  source = "./db"

  vpc_id            = module.vpc.vpc_id
  private_subnet_ids = module.vpc.private_subnet_ids
  db_password       = local.db_password
}

module "lambda" {
  source = "./lambda"
  app_version = var.app_version
  dependencies_version = var.dependencies_version
  subnet_id = module.vpc.private_subnet_ids[0]
  database_url = "postgres://${module.db.rds_username}:${module.db.rds_password}@${module.db.rds_hostname}:${module.db.rds_port}/eduplatform"
  apigw_execution_arn = module.api-gateway.apigw_execution_arn
  vpc_id = module.vpc.vpc_id
}

module "s3" {
  source = "./s3"
}

module "api-gateway" {
  source = "./api-gateway"
  lambda_invoke_arn = module.lambda.lambda_invoke_arn
}