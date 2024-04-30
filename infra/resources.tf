module "vpc" {
  source = "./network"
}

module "db" {
  source = "./db"
  vpc_id            = module.vpc.vpc_id
  private_subnet_ids = module.vpc.private_subnet_ids
  db_password       = local.db_password
}

module "domain-topic" {
  source = "./sns-sqs"
  topic_name = "domain-topic"
  queue_name = "domain-queue"
  lambda_arn = module.event-handler.lambda_arn
}

module "api" {
  source = "./lambda"
  env_vars = {
    DATABASE_URL = "postgres://${module.db.rds_username}:${module.db.rds_password}@${module.db.rds_hostname}:${module.db.rds_port}",
    DOMAIN_SNS_TOPIC_ARN = module.domain-topic.topic_arn,
    BUCKET_NAME = module.s3.bucket_name
  }
  function_name = "api"
  app_version = var.app_version
  subnet_id = module.vpc.private_subnet_ids[0]
  vpc_id = module.vpc.vpc_id
}

module "api-gw" {
  source = "./api-gateway"
  lambda_invoke_arn = module.api.lambda_invoke_arn
  lambda_function_name = module.api.function_name
}

module "event-handler" {
  source = "./lambda"
  env_vars = {
    DATABASE_URL = "postgres://${module.db.rds_username}:${module.db.rds_password}@${module.db.rds_hostname}:${module.db.rds_port}",
    DOMAIN_SNS_TOPIC_ARN = module.domain-topic.topic_arn,
    BUCKET_NAME = module.s3.bucket_name
  }
  function_name = "event-handler"
  app_version = var.app_version
  subnet_id = module.vpc.private_subnet_ids[0]
  vpc_id = module.vpc.vpc_id
}

module "s3" {
  source = "./public-s3"
  bucket_name = "edu-platform-activity-contents"
}

