---
title: Nomad Job
description: Configuration reference for the nomad resource in Instruqt labs
---



The nomad_job resource applies one or more Nomad job files to a Nomad cluster. It monitors changes to job files and automatically recreates the resource when changes are detected.

## HCL Syntax

### Basic Syntax

```hcl
resource "nomad_job" "name" {
  cluster = resource.nomad_cluster.dev
  paths = ["./jobs/web.nomad"]
}
```

### Full Syntax

```hcl
resource "nomad_job" "name" {
  cluster = resource.nomad_cluster.production
  
  paths = [
    "./jobs/web.nomad",
    "./jobs/api.nomad",
    "./jobs/workers/"
  ]
  
  health_check {
    timeout = "60s"
    jobs = ["web", "api", "worker"]
  }
}
```

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **cluster** | reference | ✓ | Reference to a nomad_cluster resource |
| **paths** | list(string) | ✓ | Paths to Nomad job files or directories |
| health_check | block |  | Health check configuration for job deployment |

### Health Check Configuration

Optional health check to verify job deployment success.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **health_check** | block |  | **Health check configuration** |
| ↳ timeout | string | ✓ | Timeout duration (e.g., "60s", "5m") |
| ↳ jobs | list(string) | ✓ | Names of jobs to monitor for health |

## Computed Attributes

These attributes are set by the system after job deployment:

| Field | Type | Description |
|-------|------|-------------|
| job_checksums | list(string) | Checksums of deployed job files |

## Validation Rules

- All paths are made absolute relative to the config file location
- Referenced cluster must exist and be healthy
- Job files must be valid Nomad job specifications
- Health check timeout must be a valid Go duration string

## Examples

### Simple Job Deployment

```hcl
resource "nomad_cluster" "dev" {
  network {
    id = resource.network.main
  }
}

resource "nomad_job" "web" {
  cluster = resource.nomad_cluster.dev
  paths = ["./jobs/nginx.nomad"]
}
```

### Multiple Jobs with Health Check

```hcl
resource "nomad_job" "app_stack" {
  cluster = resource.nomad_cluster.production
  
  paths = [
    "./jobs/web.nomad",
    "./jobs/api.nomad",
    "./jobs/database.nomad"
  ]
  
  health_check {
    timeout = "120s"
    jobs = ["web", "api", "database"]
  }
}
```

### Directory-based Job Deployment

```hcl
resource "nomad_job" "microservices" {
  cluster = resource.nomad_cluster.dev
  
  paths = [
    "./jobs/microservices/",  # Directory containing multiple .nomad files
    "./jobs/shared/redis.nomad"
  ]
  
  health_check {
    timeout = "90s"
    jobs = ["user-service", "order-service", "payment-service", "redis"]
  }
}
```

### Job with Service Configuration

Example Nomad job file that might be deployed:

```hcl
## ./jobs/web.nomad
job "web" {
  datacenters = ["dc1"]
  type = "service"
  
  group "web" {
    count = 3
    
    network {
      port "http" {
        to = 80
      }
    }
    
    task "nginx" {
      driver = "docker"
      
      config {
        image = "nginx:latest"
        ports = ["http"]
      }
      
      service {
        name = "web"
        port = "http"
        
        check {
          type = "http"
          path = "/"
          interval = "10s"
          timeout = "2s"
        }
      }
      
      resources {
        cpu    = 100
        memory = 128
      }
    }
  }
}
```

And the corresponding lab configuration:

```hcl
resource "nomad_job" "web" {
  cluster = resource.nomad_cluster.app
  paths = ["./jobs/web.nomad"]
  
  health_check {
    timeout = "60s"
    jobs = ["web"]
  }
}
```

### Batch Job Example

```hcl
# ./jobs/data-processor.nomad
job "data-processor" {
  datacenters = ["dc1"]
  type = "batch"
  
  group "processor" {
    count = 1
    
    task "process" {
      driver = "docker"
      
      config {
        image = "myapp/data-processor:latest"
        args = ["--input", "/data/input", "--output", "/data/output"]
      }
      
      resources {
        cpu    = 500
        memory = 512
      }
    }
  }
}
```

```hcl
resource "nomad_job" "batch_processor" {
  cluster = resource.nomad_cluster.processing
  paths = ["./jobs/data-processor.nomad"]
  
  health_check {
    timeout = "30s"
    jobs = ["data-processor"]
  }
}
```

## Job File Management

The nomad_job resource supports various ways to organize job files:

### Single Job File
```hcl
paths = ["./jobs/single-app.nomad"]
```

### Multiple Specific Files
```hcl
paths = [
  "./jobs/web.nomad",
  "./jobs/api.nomad",
  "./jobs/worker.nomad"
]
```

### Directory of Jobs
```hcl
paths = ["./jobs/"] # All .nomad files in directory
```

### Mixed Approach
```hcl
paths = [
  "./jobs/core/",           # Directory
  "./jobs/addon/cache.nomad", # Specific file
  "./jobs/addon/queue.nomad"  # Another specific file
]
```

## Best Practices

1. **Job Organization**: Group related jobs in directories for easier management
2. **Health Checks**: Always configure health checks for service jobs
3. **Resource Limits**: Set appropriate CPU and memory limits in job specifications
4. **Service Discovery**: Use Consul Connect or service mesh for inter-service communication
5. **Rollback Strategy**: Keep previous job versions for quick rollbacks
6. **Monitoring**: Include health checks and monitoring in job specifications
7. **Dependencies**: Use job dependencies when services rely on each other

## Common Use Cases

1. **Web Applications**: Deploying web services with load balancing
2. **Microservices**: Managing multiple interconnected services
3. **Batch Processing**: Running data processing or ETL jobs
4. **Background Workers**: Queue processors and scheduled tasks
5. **Development Environment**: Rapid deployment for testing and development

## Integration with Other Resources

### With Service Resources
```hcl
resource "nomad_job" "api" {
  cluster = resource.nomad_cluster.app
  paths = ["./jobs/api.nomad"]
}

resource "service" "api" {
  name = "api"
  port = 8080
  
  target {
    resource = resource.nomad_cluster.app
    named_port = "http"
    config = {
      job = "api"
      group = "api"
      task = "server"
    }
  }
}
```

### With Ingress Resources
```hcl
resource "ingress" "web" {
  port = 80
  
  target {
    resource = resource.nomad_cluster.app
    named_port = "http"
    config = {
      job = "web"
      group = "frontend"
      task = "nginx"
    }
  }
}
```