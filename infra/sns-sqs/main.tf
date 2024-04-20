resource "aws_sns_topic" "main" {
  name = var.topic_name
}

resource "aws_sqs_queue" "main" {
  name = var.queue_name
}

# SQS Queue Policy allowing SNS to send messages to the queue
resource "aws_sqs_queue_policy" "main" {
  queue_url = aws_sqs_queue.main.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect    = "Allow",
      Principal = "*",
      Action    = "sqs:SendMessage",
      Resource  = aws_sqs_queue.main.arn,
      Condition = {
        ArnEquals = {
          "aws:SourceArn" = aws_sns_topic.main.arn
        }
      }
    }]
  })
}

resource "aws_sns_topic_subscription" "main" {
  topic_arn = aws_sns_topic.main.arn
  protocol  = "sqs"
  endpoint  = aws_sqs_queue.main.arn

#   filter_policy = jsonencode()
}

resource "aws_lambda_event_source_mapping" "main" {
  event_source_arn = aws_sqs_queue.main.arn
  function_name    = var.lambda_arn
  enabled          = true
}