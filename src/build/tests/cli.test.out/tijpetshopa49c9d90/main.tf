provider "aws" { 
      assume_role = {
      role_arn = "arn:aws:iam::133713371337:role/DeploymentRole"
    }
region = "eu-north-1"
     }
terraform { backend "s3" { 
      bucket = "terraform-state-prod"
key = "tijpetshopa49c9d90.terraform.tfstate"
region = "us-east-1"
     } }
resource "aws_dynamodb_table" "pets" {
      description = "pet lambda"
function_name = "tijpetshopa49c9d90"
handler = "service.handler"
memory_size = 512
role = "${data.terraform_remote_state.tijpetshop4f1f18f8.arn}"
runtime = "nodejs8.10"
s3_bucket = "pet-lambda-bucket"
s3_key = "tijpetshopa49c9d90"
timeout = 20
    }
data "terraform_remote_state" "tijpetshop4f1f18f8" {
      backend = "s3"
config = {
      bucket = "terraform-state-prod"
key = "tijpetshop4f1f18f8.terraform.tfstate"
region = "us-east-1"
    }
    }
