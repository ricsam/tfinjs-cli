provider "aws" {
  assume_role = {
    role_arn = "arn:aws:iam::133713371337:role/DeploymentRole"
  }

  region = "eu-north-1"
}

terraform {
  backend "s3" {
    bucket = "terraform-state-prod"
    key    = "tijpetshopc6c399d7.terraform.tfstate"
    region = "us-east-1"
  }
}

resource "aws_iam_role_policy_attachment" "cloud_watch_role_attachment" {
  policy_arn = "${data.terraform_remote_state.tijpetshop33fbcf2a.arn}"
  role       = "${data.terraform_remote_state.tijpetshop7b53e97e.name}"
}

data "terraform_remote_state" "tijpetshop7b53e97e" {
  backend = "s3"

  config = {
    bucket = "terraform-state-prod"
    key    = "tijpetshop7b53e97e.terraform.tfstate"
    region = "us-east-1"
  }
}

data "terraform_remote_state" "tijpetshop33fbcf2a" {
  backend = "s3"

  config = {
    bucket = "terraform-state-prod"
    key    = "tijpetshop33fbcf2a.terraform.tfstate"
    region = "us-east-1"
  }
}
