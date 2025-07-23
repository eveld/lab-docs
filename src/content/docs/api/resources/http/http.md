---
title: HTTP
description: Configuration reference for the http resource in Instruqt labs
---



The http resource performs HTTP requests and captures the response. It enables labs to interact with web APIs, webhooks, and external services, making it useful for testing integrations and demonstrating API interactions.

## HCL Syntax

### Basic Syntax

```hcl
resource "http" "name" {
  method = "GET"
  url = "https://api.example.com/status"
}
```

### Full Syntax

```hcl
resource "http" "name" {
  method = "POST"
  url = "https://api.example.com/webhook"
  
  headers = {
    "Content-Type" = "application/json"
    "Authorization" = "Bearer token123"
    "X-Custom-Header" = "value"
  }
  
  payload = jsonencode({
    message = "Hello from lab"
    timestamp = "2023-12-01T10:00:00Z"
  })
  
  timeout = "30s"
}
```

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **method** | string | ✓ | HTTP method (GET, POST, PUT, DELETE, etc.) |
| **url** | string | ✓ | Target URL for the HTTP request |
| headers | map(string) |  | HTTP headers to send with the request (default: {}) |
| payload | string |  | Request body/payload |
| timeout | string |  | Request timeout duration (default: "30s") |

## Computed Attributes

These attributes are set by the system after the HTTP request completes:

| Field | Type | Description |
|-------|------|-------------|
| status | int | HTTP status code returned by the server |
| body | string | Response body content |

## Validation Rules

- URL must be a valid HTTP/HTTPS URL
- Method must be a valid HTTP method
- Timeout must be a valid Go duration string
- Headers must be valid HTTP header names and values

## Examples

### Simple GET Request

```hcl
resource "http" "api_check" {
  method = "GET"
  url = "https://httpbin.org/status/200"
}

output "api_status" {
  value = resource.http.api_check.status
}
```

### POST with JSON Payload

```hcl
resource "http" "create_user" {
  method = "POST"
  url = "https://jsonplaceholder.typicode.com/users"
  
  headers = {
    "Content-Type" = "application/json"
  }
  
  payload = jsonencode({
    name = "John Doe"
    email = "john@example.com"
    username = "johndoe"
  })
}

output "created_user" {
  value = jsondecode(resource.http.create_user.body)
}
```

### API Authentication

```hcl
resource "random_password" "api_token" {
  length = 32
  special = false
}

resource "http" "authenticate" {
  method = "POST"
  url = "https://api.example.com/auth/login"
  
  headers = {
    "Content-Type" = "application/json"
  }
  
  payload = jsonencode({
    username = "admin"
    password = "secret"
  })
}

resource "http" "protected_resource" {
  depends_on = [resource.http.authenticate]
  
  method = "GET"
  url = "https://api.example.com/protected/data"
  
  headers = {
    "Authorization" = "Bearer ${jsondecode(resource.http.authenticate.body).token}"
    "Accept" = "application/json"
  }
}
```

### Webhook Testing

```hcl
resource "http" "webhook_test" {
  method = "POST"
  url = "https://webhook.site/unique-id"
  
  headers = {
    "Content-Type" = "application/json"
    "X-Event-Type" = "test"
  }
  
  payload = jsonencode({
    event = "lab_started"
    lab_id = "introduction-to-apis"
    user_id = "student123"
    timestamp = timestamp()
  })
  
  timeout = "10s"
}
```

### File Upload Simulation

```hcl
resource "template" "upload_data" {
  source = <<-EOF
    {
      "filename": "data.csv",
      "content": "name,age,city\nJohn,30,NYC\nJane,25,SF",
      "mimetype": "text/csv"
    }
  EOF
  
  destination = "./upload.json"
}

resource "http" "file_upload" {
  depends_on = [resource.template.upload_data]
  
  method = "POST"
  url = "https://httpbin.org/post"
  
  headers = {
    "Content-Type" = "application/json"
  }
  
  payload = file(resource.template.upload_data.destination)
}
```

### Health Check Sequence

```hcl
## Start service
resource "container" "api_service" {
  image {
    name = "my-api:latest"
  }
  
  port {
    local = 8080
    host = 8080
  }
  
  environment = {
    PORT = "8080"
  }
}

# Wait and check health
resource "http" "health_check" {
  depends_on = [resource.container.api_service]
  
  method = "GET"
  url = "http://localhost:8080/health"
  
  headers = {
    "Accept" = "application/json"
  }
  
  timeout = "5s"
}

# Use the service if healthy
resource "http" "api_call" {
  depends_on = [resource.http.health_check]
  
  method = "GET"
  url = "http://localhost:8080/api/data"
  
  headers = {
    "Accept" = "application/json"
  }
}
```

### External API Integration

```hcl
resource "http" "github_user" {
  method = "GET"
  url = "https://api.github.com/users/octocat"
  
  headers = {
    "Accept" = "application/vnd.github.v3+json"
    "User-Agent" = "Instruqt-Lab"
  }
}

resource "template" "user_profile" {
  source = <<-EOF
    # GitHub User Profile
    
    **Name:** ${jsondecode(resource.http.github_user.body).name}
    **Username:** ${jsondecode(resource.http.github_user.body).login}
    **Followers:** ${jsondecode(resource.http.github_user.body).followers}
    **Public Repos:** ${jsondecode(resource.http.github_user.body).public_repos}
  EOF
  
  destination = "./github_profile.md"
}
```

### Error Handling Pattern

```hcl
resource "http" "api_test" {
  method = "GET"
  url = "https://httpbin.org/status/404"
  
  timeout = "10s"
}

# Check if request was successful
locals {
  api_success = resource.http.api_test.status >= 200 && resource.http.api_test.status < 300
  api_error = resource.http.api_test.status >= 400
}

output "api_result" {
  value = local.api_success ? "Success" : "Failed with status ${resource.http.api_test.status}"
}
```

### REST API CRUD Operations

```hcl
# Create
resource "http" "create_post" {
  method = "POST"
  url = "https://jsonplaceholder.typicode.com/posts"
  
  headers = {
    "Content-Type" = "application/json"
  }
  
  payload = jsonencode({
    title = "My Lab Post"
    body = "This is a test post from the lab"
    userId = 1
  })
}

# Read
resource "http" "get_post" {
  depends_on = [resource.http.create_post]
  
  method = "GET"
  url = "https://jsonplaceholder.typicode.com/posts/${jsondecode(resource.http.create_post.body).id}"
  
  headers = {
    "Accept" = "application/json"
  }
}

# Update
resource "http" "update_post" {
  depends_on = [resource.http.get_post]
  
  method = "PUT"
  url = "https://jsonplaceholder.typicode.com/posts/${jsondecode(resource.http.create_post.body).id}"
  
  headers = {
    "Content-Type" = "application/json"
  }
  
  payload = jsonencode({
    id = jsondecode(resource.http.create_post.body).id
    title = "Updated Lab Post"
    body = "This post has been updated"
    userId = 1
  })
}

# Delete
resource "http" "delete_post" {
  depends_on = [resource.http.update_post]
  
  method = "DELETE"
  url = "https://jsonplaceholder.typicode.com/posts/${jsondecode(resource.http.create_post.body).id}"
}
```

## Response Processing

### JSON Response Handling

```hcl
resource "http" "json_api" {
  method = "GET"
  url = "https://jsonplaceholder.typicode.com/users/1"
}

locals {
  user_data = jsondecode(resource.http.json_api.body)
}

output "user_info" {
  value = {
    name = local.user_data.name
    email = local.user_data.email
    company = local.user_data.company.name
  }
}
```

### Using Response Data

```hcl
resource "http" "config_api" {
  method = "GET"
  url = "https://api.example.com/config"
  
  headers = {
    "Accept" = "application/json"
  }
}

resource "template" "app_config" {
  source = <<-EOF
    database:
      host: ${jsondecode(resource.http.config_api.body).database.host}
      port: ${jsondecode(resource.http.config_api.body).database.port}
    
    cache:
      enabled: ${jsondecode(resource.http.config_api.body).cache.enabled}
  EOF
  
  destination = "./config/app.yaml"
}
```

## Best Practices

1. **Timeouts**: Set appropriate timeouts for external API calls
2. **Error Handling**: Check status codes and handle errors appropriately
3. **Authentication**: Securely handle API keys and tokens
4. **Rate Limiting**: Be mindful of API rate limits in lab scenarios
5. **Headers**: Include proper headers (User-Agent, Accept, Content-Type)
6. **Dependencies**: Use depends_on for proper resource ordering
7. **Sensitive Data**: Mark sensitive outputs appropriately

## Common Use Cases

1. **API Testing**: Demonstrating REST API interactions
2. **Webhook Integration**: Testing webhook endpoints and payloads
3. **External Data**: Fetching configuration or reference data
4. **Health Checks**: Monitoring service availability
5. **Authentication Flows**: Demonstrating OAuth and token-based auth
6. **Data Validation**: Verifying API responses and data formats
7. **Integration Testing**: End-to-end API workflow testing