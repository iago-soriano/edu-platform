resource "aws_lambda_function" "main" {
  function_name = var.function_name

  s3_bucket = data.aws_s3_bucket.function.bucket
  s3_key    = "${var.function_name}/${var.app_version}/build.zip"

  handler = "index.handler"
  runtime = "nodejs20.x"

  timeout     = 30
  memory_size = 256

  # vpc config
  vpc_config {
    subnet_ids         = [var.subnet_id]
    security_group_ids = [aws_security_group.sg_lambda.id]
  }

  environment {
    variables = var.env_vars
  }

  role = aws_iam_role.lambda_exec.arn
}

# IAM role which dictates what other AWS services the Lambda function
# may access.
resource "aws_iam_role" "lambda_exec" {
  name = var.function_name

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF

  inline_policy {
    name = "policies"

    policy = jsonencode({
      Version = "2012-10-17"
      Statement = [
        {
          Action = [
            "logs:CreateLogGroup",
            "logs:CreateLogStream",
            "logs:PutLogEvents",
            "ec2:CreateNetworkInterface",
            "ec2:DescribeNetworkInterfaces",
            "ec2:DeleteNetworkInterface",
            "ec2:AssignPrivateIpAddresses",
            "ec2:UnassignPrivateIpAddresses",
            "sqs:ChangeMessageVisibility",
            "sqs:DeleteMessage",
            "sqs:GetQueueAttributes",
            "sqs:ReceiveMessage",
            "sns:*"
          ]
          Effect   = "Allow"
          Resource = "*"
        }
      ]
    })
  }
}

data "aws_s3_bucket" "function" {
  bucket = "edu-platform-lambda-function-build-output"
}

resource "aws_security_group" "sg_lambda" {
  vpc_id = var.vpc_id
  name   = "lambda_sg-${var.function_name}"

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
