provider "aws" {
  assume_role = {
    role_arn = "arn:aws:iam::133713371337:role/DeploymentRole"
  }

  region = "eu-north-1"
}

terraform {
  backend "s3" {
    bucket = "terraform-state-prod"
    key    = "tijpetshop885b958d.terraform.tfstate"
    region = "us-east-1"
  }
}

resource "aws_iam_role_policy_attachment" "cloud_watch_role_attachment" {
  policy_arn = "${data.terraform_remote_state.tijpetshop95138c7c.arn}"
  role       = "${data.terraform_remote_state.tijpetshopbfd4c895.name}"
}

data "terraform_remote_state" "tijpetshopbfd4c895" {
  backend = "s3"

  config = {
    bucket = "terraform-state-prod"
    key    = "tijpetshopbfd4c895.terraform.tfstate"
    region = "us-east-1"
  }
}

data "terraform_remote_state" "tijpetshop95138c7c" {
  backend = "s3"

  config = {
    bucket = "terraform-state-prod"
    key    = "tijpetshop95138c7c.terraform.tfstate"
    region = "us-east-1"
  }
}
