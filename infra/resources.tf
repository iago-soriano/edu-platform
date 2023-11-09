module "vpc" {
  source = "./network"
  tags        = var.tags
}

module "db" {
  source = "./db"

  tags        = var.tags

  vpc_id            = module.vpc.vpc_id
  private_subnet_ids = module.vpc.private_subnet_ids
  db_password       = var.db_password
}

module "lambda" {
  source = "./lambda"

  database_url = "postgres://${module.db.rds_username}:${module.db.rds_password}@${module.db.rds_hostname}:${module.db.rds_port}/db"

}

module "s3" {
  source = "./s3"
}