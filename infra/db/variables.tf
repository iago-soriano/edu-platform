variable "tags" {
  type = map(string)
  default = {
    project = "edu-platform"
  }
}

variable "vpc_id" {
  type = string
}

variable "private_subnet_ids" {
  type = list(string)
}

variable "public_subnet_ids" {
  type = list(string)
}


variable "db_password" {
  type = string
}

variable "db_user" {
  type = string
}
