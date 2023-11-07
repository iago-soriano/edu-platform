variable "tags" {
  type = map(string)
  default = {
    project     = "edu-platform"
  }
}

variable "db_password" {
  type = string
}
