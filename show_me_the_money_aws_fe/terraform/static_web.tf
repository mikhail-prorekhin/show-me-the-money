provider "aws" {

}

resource "aws_s3_bucket" "static_site" {
  bucket = "pmv-show-me-the-money"
  tags = {
    Name = "ShowMeTheMoneyBucket"
  }
}

resource "aws_s3_bucket_public_access_block" "static_site" {
  bucket = aws_s3_bucket.static_site.bucket

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "public_read" {
  bucket = aws_s3_bucket.static_site.bucket

  policy = <<POLICY
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": "*",
        "Action": "s3:GetObject",
        "Resource": "arn:aws:s3:::${aws_s3_bucket.static_site.bucket}/*"
      }
    ]
  }
  POLICY
}

resource "aws_s3_bucket_website_configuration" "static_site" {
  bucket = aws_s3_bucket.static_site.bucket
  index_document {
    suffix = "index.html"
  }
}

resource "aws_s3_bucket_object" "static_files" {
  for_each = fileset("../build", "**/*") # Change to your folder path
  bucket   = aws_s3_bucket.static_site.bucket
  key      = each.value
  source   = "../build/${each.value}" # Change to your folder path
  content_type = lookup({
    "css"  = "text/css",
    "js"   = "application/javascript",
    "png"  = "image/png",
    "jpg"  = "image/jpeg",
    "svg"  = "image/svg+xml",
    "html" = "text/html"
  }, regexall("[^.]+$", each.value)[0], "application/octet-stream")
}

output "website_url" {
  value = aws_s3_bucket.static_site.website_endpoint
}

