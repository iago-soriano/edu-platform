resource "aws_s3_bucket" "activity-content" {
  bucket = "activity-content"
}

resource "aws_s3_bucket_ownership_controls" "main" {
  bucket = aws_s3_bucket.activity-content.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "main" {
  bucket = aws_s3_bucket.activity-content.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "main" {
  depends_on = [
    aws_s3_bucket_ownership_controls.main,
    aws_s3_bucket_public_access_block.main,
  ]

  bucket = aws_s3_bucket.activity-content.id
  acl    = "public-read"
}