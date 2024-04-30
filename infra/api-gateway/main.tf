
resource "aws_api_gateway_rest_api" "main" {
  name        = "edu-platform"
  description = "API Gateway for Edu Platform REST API"
}

resource "aws_api_gateway_resource" "main" {
  rest_api_id = "${aws_api_gateway_rest_api.main.id}"
  parent_id   = "${aws_api_gateway_rest_api.main.root_resource_id}"
  path_part   = "{proxy+}"
}

resource "aws_api_gateway_method" "main" {
  rest_api_id   = "${aws_api_gateway_rest_api.main.id}"
  resource_id   = "${aws_api_gateway_resource.main.id}"
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "lambda" {
  rest_api_id = "${aws_api_gateway_rest_api.main.id}"
  resource_id = "${aws_api_gateway_method.main.resource_id}"
  http_method = "${aws_api_gateway_method.main.http_method}"

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = var.lambda_invoke_arn
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = "${var.lambda_function_name}"
  principal     = "apigateway.amazonaws.com"

  depends_on = [ aws_api_gateway_rest_api.main ]
  # The /*/* portion grants access from any method on any resource
  # within the API Gateway "REST API".
  source_arn = "${aws_api_gateway_rest_api.main.execution_arn}/*/*"
}

resource "aws_api_gateway_deployment" "main" {
  depends_on = [aws_api_gateway_method.main, aws_api_gateway_integration.lambda ]

  rest_api_id = "${aws_api_gateway_rest_api.main.id}"
  stage_name  = "prod"
}
