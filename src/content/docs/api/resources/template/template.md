---
title: Template
description: Configuration reference for the template resource in Instruqt labs
---



The template resource processes Handlebars templates and outputs the result as a file. It enables dynamic configuration file generation using variable substitution and helper functions.

## HCL Syntax

### Basic Syntax

```hcl
resource "template" "name" {
  source      = "config.tpl"
  destination = "./config/app.conf"
  
  variables = {
    port = "8080"
    host = "localhost"
  }
}
```

### Full Syntax

```hcl
resource "template" "name" {
  source = <<-EOF
    server {
      listen {{port}};
      server_name {{host}};
      root {{document_root}};
      
      location / {
        proxy_pass http://{{backend_host}}:{{backend_port}};
      }
    }
  EOF
  
  destination = "./nginx/sites-available/app.conf"
  
  variables = {
    port          = "80"
    host          = "app.example.com"
    document_root = "/var/www/html"
    backend_host  = "127.0.0.1"
    backend_port  = "3000"
  }
}
```

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| source | string | ✓ | Template source (file path or inline content) |
| destination | string | ✓ | Output file path for processed template |
| variables | map(string) | | Variables for template substitution. Defaults to empty map. |

## Computed Attributes

| Field | Type | Description |
|-------|------|-------------|
| checksum | string | Checksum of the processed template content |

## Template Language

Templates use **Handlebars syntax** (based on Mustache):

```handlebars
server_name = "{{hostname}}"
port = {{port}}
debug = {{#if debug}}true{{else}}false{{/if}}
```

## Built-in Helpers

| Helper | Description | Example |
|--------|-------------|---------|
| **quote** | Wraps string in quotes | `{{quote database_name}}` → `"mydb"` |
| **trim** | Removes whitespace | `{{trim "  hello  "}}` → `"hello"` |

## Source Options

### Inline Templates (HereDoc)
```hcl
resource "template" "nginx_config" {
  source = <<-EOF
    upstream backend {
      server {{backend_server}};
    }
    
    server {
      listen {{port}};
      location / {
        proxy_pass http://backend;
      }
    }
  EOF
  
  destination = "./nginx.conf"
  
  variables = {
    backend_server = "127.0.0.1:3000"
    port          = "80"
  }
}
```

### External Template Files
```hcl
resource "template" "app_config" {
  source      = "./templates/app.conf.tpl"
  destination = "./config/app.conf"
  
  variables = {
    database_url = "postgres://localhost/myapp"
    redis_url    = "redis://localhost:6379"
  }
}
```

## Validation Rules

- **Source validation**: If source is a file path, the file must exist
- **Destination paths**: Resolved relative to the config file location
- **Template syntax**: Must be valid Handlebars syntax
- **Variable references**: All template variables should be defined in variables map

## Examples

### Web Server Configuration

```hcl
resource "template" "nginx_site" {
  source = <<-EOF
    server {
      listen {{port}};
      server_name {{server_name}};
      root {{document_root}};
      
      location / {
        try_files $uri $uri/ =404;
      }
      
      location /api/ {
        proxy_pass http://{{api_host}}:{{api_port}};
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
      }
    }
  EOF
  
  destination = "./nginx/sites-available/webapp"
  
  variables = {
    port          = "80"
    server_name   = "webapp.local"
    document_root = "/var/www/webapp"
    api_host      = "localhost"
    api_port      = "3000"
  }
}
```

### Application Configuration

```hcl
resource "template" "app_config" {
  source = "./templates/application.yml.tpl"
  destination = "./config/application.yml"
  
  variables = {
    database_host     = "db.example.com"
    database_port     = "5432"
    database_name     = "production_db"
    redis_host        = "cache.example.com"
    redis_port        = "6379"
    log_level         = "info"
    external_api_url  = "https://api.external.com"
  }
}
```

### Docker Compose Generation

```hcl
resource "template" "docker_compose" {
  source = <<-EOF
    version: '3.8'
    services:
      web:
        image: nginx:{{nginx_version}}
        ports:
          - "{{web_port}}:80"
        volumes:
          - ./html:/usr/share/nginx/html
        environment:
          - NGINX_HOST={{host}}
          
      api:
        image: node:{{node_version}}
        ports:
          - "{{api_port}}:3000"
        environment:
          - DATABASE_URL={{quote database_url}}
          - REDIS_URL={{quote redis_url}}
        depends_on:
          - db
          - redis
          
      db:
        image: postgres:{{postgres_version}}
        environment:
          - POSTGRES_DB={{database_name}}
          - POSTGRES_USER={{database_user}}
          - POSTGRES_PASSWORD={{quote database_password}}
        volumes:
          - postgres_data:/var/lib/postgresql/data
          
      redis:
        image: redis:{{redis_version}}
        
    volumes:
      postgres_data:
  EOF
  
  destination = "./docker-compose.yml"
  
  variables = {
    nginx_version     = "1.21"
    node_version      = "16-alpine"
    postgres_version  = "13"
    redis_version     = "6-alpine"
    web_port         = "8080"
    api_port         = "3000"
    host             = "localhost"
    database_url     = "postgres://user:pass@db:5432/myapp"
    redis_url        = "redis://redis:6379"
    database_name    = "myapp"
    database_user    = "app_user"
    database_password = "secure_password"
  }
}
```

### Kubernetes Manifest Generation

```hcl
resource "template" "k8s_deployment" {
  source = <<-EOF
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: {{app_name}}
      namespace: {{namespace}}
    spec:
      replicas: {{replicas}}
      selector:
        matchLabels:
          app: {{app_name}}
      template:
        metadata:
          labels:
            app: {{app_name}}
        spec:
          containers:
          - name: {{app_name}}
            image: {{image}}:{{tag}}
            ports:
            - containerPort: {{container_port}}
            env:
            - name: DATABASE_URL
              value: {{quote database_url}}
            - name: LOG_LEVEL
              value: {{quote log_level}}
            resources:
              requests:
                memory: {{quote memory_request}}
                cpu: {{quote cpu_request}}
              limits:
                memory: {{quote memory_limit}}
                cpu: {{quote cpu_limit}}
  EOF
  
  destination = "./k8s/deployment.yaml"
  
  variables = {
    app_name       = "my-web-app"
    namespace      = "production"
    replicas       = "3"
    image          = "my-app"
    tag            = "v1.2.0"
    container_port = "3000"
    database_url   = "postgres://db:5432/app"
    log_level      = "info"
    memory_request = "256Mi"
    cpu_request    = "250m"
    memory_limit   = "512Mi"
    cpu_limit      = "500m"
  }
}
```

### Configuration with Conditionals

```hcl
resource "template" "app_settings" {
  source = <<-EOF
    [server]
    host = {{quote host}}
    port = {{port}}
    {{#if ssl_enabled}}
    ssl_cert = {{quote ssl_cert_path}}
    ssl_key = {{quote ssl_key_path}}
    {{/if}}
    
    [database]
    url = {{quote database_url}}
    pool_size = {{db_pool_size}}
    
    [logging]
    level = {{quote log_level}}
    {{#if debug_mode}}
    debug = true
    verbose = true
    {{else}}
    debug = false
    verbose = false
    {{/if}}
    
    [features]
    {{#each features}}
    {{@key}} = {{this}}
    {{/each}}
  EOF
  
  destination = "./config/app.toml"
  
  variables = {
    host           = "0.0.0.0"
    port           = "8080"
    ssl_enabled    = "true"
    ssl_cert_path  = "/certs/server.crt"
    ssl_key_path   = "/certs/server.key"
    database_url   = "postgres://localhost/app"
    db_pool_size   = "10"
    log_level      = "info"
    debug_mode     = "false"
    features = {
      auth_enabled     = "true"
      metrics_enabled  = "true"
      cache_enabled    = "false"
    }
  }
}
```

## Usage with Containers

Templates are commonly used to generate configuration files for containers:

```hcl
resource "template" "redis_config" {
  source = <<-EOF
    port {{port}}
    bind {{bind_address}}
    save {{save_interval}} {{save_changes}}
    appendonly {{appendonly}}
    appendfsync {{appendfsync}}
    {{#if password}}
    requirepass {{password}}
    {{/if}}
  EOF
  
  destination = "./redis/redis.conf"
  
  variables = {
    port          = "6379"
    bind_address  = "127.0.0.1"
    save_interval = "900"
    save_changes  = "1"
    appendonly    = "yes"
    appendfsync   = "everysec"
    password      = "redis_password"
  }
}

resource "container" "redis" {
  image {
    name = "redis:6-alpine"
  }
  
  volume {
    source      = resource.template.redis_config.destination
    destination = "/usr/local/etc/redis/redis.conf"
    type        = "bind"
  }
  
  command = ["redis-server", "/usr/local/etc/redis/redis.conf"]
}
```

## Best Practices

1. **File Organization**: Store templates in a dedicated `templates/` directory
2. **Variable Naming**: Use clear, descriptive variable names
3. **Default Values**: Consider providing default values in templates using conditionals
4. **Validation**: Test templates with different variable values
5. **Security**: Be cautious with sensitive data in variables - consider using external sources
6. **Documentation**: Comment complex template logic for maintainability
7. **Path Management**: Use absolute paths or paths relative to config files

## Common Use Cases

1. **Web Server Configuration**: Nginx, Apache, etc.
2. **Application Configuration**: Database connections, API endpoints
3. **Container Configuration**: Docker Compose files, Kubernetes manifests
4. **Infrastructure as Code**: Terraform configurations, Ansible playbooks
5. **CI/CD Configuration**: Pipeline configurations, deployment scripts
6. **Monitoring Configuration**: Prometheus, Grafana configurations