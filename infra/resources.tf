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
