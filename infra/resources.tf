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
  lambda_arn = module.core-event-handler.lambda_arn
}

module "api" {
  source = "./lambda"
  function_name = "api"
  env_vars = {
    DATABASE_URL = "postgres://${module.db.rds_username}:${module.db.rds_password}@${module.db.rds_hostname}:${module.db.rds_port}",
    PORT = "3001",
    EMAIL_HOST = local.email_host,
    EMAIL_SECRET = local.email_secret,
    WEB_APP_URL = "http://localhost:3000",
    HOST_NAME = "edu-plataform.com",
    NODE_ENV = "production",
    DOMAIN_SNS_TOPIC_ARN = module.domain-topic.topic_arn
    ACCESS_TOKEN_PRIVATE_KEY = local.access_private_key
    ACCESS_TOKEN_PUBLIC_KEY = local.access_public_key
    REFRESH_TOKEN_PRIVATE_KEY = local.refresh_private_key
    REFRESH_TOKEN_PUBLIC_KEY = local.refresh_public_key
  }
  app_version = var.core_app_version
  subnet_id = module.vpc.private_subnet_ids[0]
  vpc_id = module.vpc.vpc_id
}

module "api-gw" {
  source = "./api-gateway-integration"
  lambda_invoke_arn = module.api.lambda_invoke_arn
  rest_api_id = aws_api_gateway_rest_api.main.id
  root_id = aws_api_gateway_resource.root.id
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = "${module.api.function_name}"
  principal     = "apigateway.amazonaws.com"

  depends_on = [ aws_api_gateway_rest_api.main ]
  # The /*/* portion grants access from any method on any resource
  # within the API Gateway "REST API".
  source_arn = "${aws_api_gateway_rest_api.main.execution_arn}/*/*"
}

module "event-handler" {
  source = "./lambda"
  function_name = "event-handler"
    env_vars = {
      "DATABASE_URL" = "postgres://${module.db.rds_username}:${module.db.rds_password}@${module.db.rds_hostname}:${module.db.rds_port}",
      "EMAIL_HOST" = local.email_host,
      "EMAIL_SECRET" = local.email_secret,
      "WEB_APP_URL" = "http://localhost:3000",
      "HOST_NAME" = "edu-plataform.com",
      NODE_ENV = "production",
  }
  app_version = var.core_app_version
  subnet_id = module.vpc.private_subnet_ids[0]
  vpc_id = module.vpc.vpc_id
}

module "s3" {
  source = "./public-s3"
  bucket_name = "edu-platform-activity-contents"
}

resource "aws_api_gateway_rest_api" "main" {
  name        = "edu-platform"
  description = "API Gateway for Edu Platform REST API"
}

resource "aws_api_gateway_resource" "root" {
  rest_api_id = "${aws_api_gateway_rest_api.main.id}"
  parent_id   = "${aws_api_gateway_rest_api.main.root_resource_id}"
  path_part   = "web-api"
}


resource "aws_api_gateway_deployment" "main" {
  depends_on = [module.api, module.api-gw.method, module.api-gw.integration ]

  rest_api_id = "${aws_api_gateway_rest_api.main.id}"
  stage_name  = "prod"
}

