provider "aws" { 
      assume_role = {
      role_arn = "arn:aws:iam::133713371337:role/DeploymentRole"
    }
region = "eu-north-1"
     }
terraform { backend "s3" { 
      bucket = "terraform-state-prod"
key = "tijpetshop0ded92c1.terraform.tfstate"
region = "us-east-1"
     } }
resource "aws_iam_role_policy_attachment" "cloud_watch_role_attachment" {
      policy_arn = "${data.terraform_remote_state.tijpetshopfff10227.arn}"
role = "${data.terraform_remote_state.tijpetshop4f1f18f8.name}"
    }
data "terraform_remote_state" "tijpetshop4f1f18f8" {
      backend = "s3"
config = {
      bucket = "terraform-state-prod"
key = "tijpetshop4f1f18f8.terraform.tfstate"
region = "us-east-1"
    }
    }
data "terraform_remote_state" "tijpetshopfff10227" {
      backend = "s3"
config = {
      bucket = "terraform-state-prod"
key = "tijpetshopfff10227.terraform.tfstate"
region = "us-east-1"
    }
    }
