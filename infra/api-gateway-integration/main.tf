resource "aws_api_gateway_resource" "main" {
  rest_api_id = "${var.rest_api_id}"
  parent_id   = "${var.root_id}"
  path_part   = "{proxy+}"
}

resource "aws_api_gateway_method" "main" {
  rest_api_id   = "${var.rest_api_id}"
  resource_id   = "${aws_api_gateway_resource.main.id}"
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "lambda" {
  rest_api_id = "${var.rest_api_id}"
  resource_id = "${aws_api_gateway_method.main.resource_id}"
  http_method = "${aws_api_gateway_method.main.http_method}"

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = var.lambda_invoke_arn
}