output "method" {
  value       = aws_api_gateway_method.main
}

output "integration" {
  value       = aws_api_gateway_integration.lambda
}