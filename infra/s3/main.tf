resource "aws_s3_bucket" "edu-platform-function" {
  bucket = "edu-platform-function"

  tags = {
    Name        = "edu-platform-function"
  }
}