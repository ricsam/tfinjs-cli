provider "aws" {
  assume_role = {
    role_arn = "arn:aws:iam::13371337:role/DeploymentRole"
  }

  region = "eu-north-1"
}

resource "aws_s3_bucket" "terraform_state_prod" {
  acl    = "private"
  bucket = "some-backend-bucket"

  versioning = {
    enabled = true
  }
}
