output "base_url" {
  value = "${aws_api_gateway_deployment.main.invoke_url}"
}

output apigw_execution_arn {
  value = aws_api_gateway_rest_api.main.execution_arn
}