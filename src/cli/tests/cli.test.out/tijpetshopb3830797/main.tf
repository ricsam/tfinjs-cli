provider "aws" {
  assume_role = {
    role_arn = "arn:aws:iam::133713371337:role/DeploymentRole"
  }

  region = "eu-north-1"
}

terraform {
  backend "s3" {
    bucket = "terraform-state-prod"
    key    = "tijpetshopb3830797.terraform.tfstate"
    region = "us-east-1"
  }
}

resource "aws_dynamodb_table" "pets" {
  description   = "pet lambda"
  function_name = "tijpetshopb3830797"
  handler       = "service.handler"
  memory_size   = 512
  role          = "${data.terraform_remote_state.tijpetshop7b53e97e.arn}"
  runtime       = "nodejs8.10"
  s3_bucket     = "pet-lambda-bucket"
  s3_key        = "tijpetshopb3830797"
  timeout       = 20
}

data "terraform_remote_state" "tijpetshop7b53e97e" {
  backend = "s3"

  config = {
    bucket = "terraform-state-prod"
    key    = "tijpetshop7b53e97e.terraform.tfstate"
    region = "us-east-1"
  }
}
