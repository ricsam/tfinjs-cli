provider "aws" { 
      assume_role = {
      role_arn = "arn:aws:iam::133713371337:role/DeploymentRole"
    }
region = "eu-north-1"
     }
terraform { backend "s3" { 
      bucket = "terraform-state-prod"
key = "tijpetshopfff10227.terraform.tfstate"
region = "us-east-1"
     } }
resource "aws_iam_policy" "cloudwatch_attachable_policy" {
      policy = <<EOF
{"Version":"2012-10-17","Statement":[{"Action":["logs:CreateLogStream"],"Effect":"Allow","Resource":"arn:aws:logs:eu-north-1:133713371337:log-group:/aws/lambda/tijpetshopa49c9d90:*"},{"Action":["logs:PutLogEvents"],"Effect":"Allow","Resource":"arn:aws:logs:eu-north-1:133713371337:log-group:/aws/lambda/tijpetshopa49c9d90:*:*"}]}
EOF
    }

output "arn" {
      value = "${aws_iam_policy.cloudwatch_attachable_policy.arn}"
    }