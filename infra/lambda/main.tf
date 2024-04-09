resource "aws_lambda_function" "main" {
  function_name = "edu-platform-api"

  s3_bucket = data.aws_s3_bucket.function.bucket
  s3_key    = "api/${var.app_version}/build.zip"

  handler = "build/index.handler"
  runtime = "nodejs20.x"

  # vpc config
  vpc_config {
    subnet_ids         = [var.subnet_id]
    security_group_ids = [aws_security_group.sg_lambda.id]
  }

  layers=[aws_lambda_layer_version.node_dependencies.id]

  environment {
    variables = {
      "DATABASE_URL" = var.database_url
    }
  }
  
  role = "${aws_iam_role.lambda_exec.arn}"
}

# IAM role which dictates what other AWS services the Lambda function
# may access.
resource "aws_iam_role" "lambda_exec" {
  name = "edu-platform-function"

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
    name = "allow_vpc_access"

    policy = jsonencode({
      Version = "2012-10-17"
      Statement = [
        {
          Action   = ["logs:CreateLogGroup",
              "logs:CreateLogStream",
              "logs:PutLogEvents",
              "ec2:CreateNetworkInterface",
              "ec2:DescribeNetworkInterfaces",
              "ec2:DeleteNetworkInterface",
              "ec2:AssignPrivateIpAddresses",
              "ec2:UnassignPrivateIpAddresses"]
          Effect   = "Allow"
          Resource = "*"
        }
      ]
    })
  }
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.main.function_name}"
  principal     = "apigateway.amazonaws.com"

  # The /*/* portion grants access from any method on any resource
  # within the API Gateway "REST API".
  source_arn = "${var.apigw_execution_arn}/*/*"
}

data "aws_s3_bucket" "function" {
  bucket = "edu-platform-function"
}

resource "aws_security_group" "sg_lambda" {
  vpc_id      = var.vpc_id

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
  }
}

resource "aws_lambda_layer_version" "node_dependencies" {
  s3_bucket = data.aws_s3_bucket.function.bucket
  s3_key = "dependencies/${var.dependencies_version}/nodejs.zip"
  layer_name = "node_dependencies"

  compatible_runtimes = ["nodejs18.x"]
}