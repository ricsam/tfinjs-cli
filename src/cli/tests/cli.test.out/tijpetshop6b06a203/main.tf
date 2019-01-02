provider "aws" {
  assume_role = {
    role_arn = "arn:aws:iam::13371337:role/DeploymentRole"
  }

  region = "eu-north-1"
}

terraform {
  backend "s3" {
    bucket = "some-backend-bucket"
    key    = "tijpetshop6b06a203.terraform.tfstate"
    region = "eu-central-1"
  }
}

resource "aws_dynamodb_table" "customers" {
  hash_key       = "CustomerId"
  name           = "tijpetshop6b06a203"
  read_capacity  = 20
  write_capacity = 20
}
