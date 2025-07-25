---
title: Ingress
description: Configuration reference for the ingress resource in Instruqt labs
---



The ingress resource creates network traffic routing between local machine and cluster services. It enables exposing Kubernetes/Nomad cluster services to participants or exposing local services to clusters for testing and development.

## HCL Syntax

### Basic Syntax

```hcl
resource "ingress" "name" {
  port = 8080
  
  target {
    resource = resource.kubernetes_cluster.k8s
    port     = 80
    
    config = {
      service   = "my-service"
      namespace = "default"
    }
  }
}
```

### Full Syntax

```hcl
resource "ingress" "name" {
  port          = 8080
  expose_local  = false
  open_in_browser = "/dashboard"
  
  target {
    resource  = resource.kubernetes_cluster.k8s
    port      = 80
    named_port = "http"
    
    config = {
      service   = "kubernetes-dashboard"
      namespace = "kubernetes-dashboard"
      protocol  = "http"
    }
  }
}
```

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **port** | int | ✓ | Local port to expose the service on |
| **target** | block | ✓ | Target configuration for traffic routing |
| expose_local | bool |  | Direction: false = cluster→local, true = local→cluster. Defaults to `false` |
| open_in_browser | string |  | URL path to automatically open in browser |

## Target Block

[target](#target-block)

Defines the traffic routing target and configuration.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **resource** | reference | ✓ | Reference to target cluster resource |
| port | int |  | Target port number |
| named_port | string |  | Named port (alternative to port number) |
| **config** | map(string) | ✓ | Target-specific configuration |

### Kubernetes Config Options

For Kubernetes cluster targets, the config map supports:

| Config Key | Required | Description |
|------------|----------|-------------|
| **service** | ✓ | Kubernetes service name |
| **namespace** | ✓ | Kubernetes namespace |
| protocol |  | Protocol (http/https) |

## Computed Attributes

These attributes are available after ingress creation:

| Field | Type | Description |
|-------|------|-------------|
| ingress_id | string | Internal ingress service ID |
| local_address | string | Full local URI for accessing the service |
| remote_address | string | Full remote URI for the service |

## Validation Rules

- **Reserved ports**: Cannot use ports 60000 or 60001 (reserved for internal use)
- **Reserved names**: Cannot use "connector" as resource name
- **Target reference**: Must reference valid cluster resources
- **Config requirements**: Kubernetes targets require service and namespace

## Traffic Direction

### Cluster to Local (Default)
`expose_local = false` - Expose cluster services to participants:

```hcl
resource "ingress" "app_access" {
  port = 8080
  
  target {
    resource = resource.kubernetes_cluster.k8s
    port     = 80
    
    config = {
      service   = "my-web-app"
      namespace = "default"
    }
  }
}
```

### Local to Cluster
`expose_local = true` - Expose local services to cluster:

```hcl
resource "ingress" "local_api" {
  port         = 3000
  expose_local = true
  
  target {
    resource = resource.kubernetes_cluster.k8s
    
    config = {
      service   = "local-dev-api"
      namespace = "default"
    }
  }
}
```

## Examples

### Expose Kubernetes Dashboard

```hcl
resource "ingress" "k8s_dashboard" {
  port            = 8080
  open_in_browser = "/"
  
  target {
    resource = resource.kubernetes_cluster.training
    port     = 443
    
    config = {
      service   = "kubernetes-dashboard"
      namespace = "kubernetes-dashboard"
      protocol  = "https"
    }
  }
}
```

### Expose Web Application

```hcl
resource "ingress" "webapp" {
  port = 8080
  
  target {
    resource = resource.kubernetes_cluster.cluster
    port     = 80
    
    config = {
      service   = "nginx-service"
      namespace = "web"
    }
  }
}
```

### Expose Database Admin Interface

```hcl
resource "ingress" "pgadmin" {
  port = 5050
  
  target {
    resource = resource.kubernetes_cluster.database
    port     = 80
    
    config = {
      service   = "pgadmin"
      namespace = "database"
    }
  }
}
```

### Expose API with Named Port

```hcl
resource "ingress" "api_server" {
  port = 8000
  
  target {
    resource   = resource.kubernetes_cluster.api
    named_port = "api"
    
    config = {
      service   = "api-service"
      namespace = "api"
    }
  }
}
```

### Multiple Service Exposure

```hcl
resource "ingress" "frontend" {
  port = 3000
  
  target {
    resource = resource.kubernetes_cluster.app
    port     = 80
    
    config = {
      service   = "frontend-service"
      namespace = "web"
    }
  }
}

resource "ingress" "backend" {
  port = 3001
  
  target {
    resource = resource.kubernetes_cluster.app
    port     = 8080
    
    config = {
      service   = "backend-service"
      namespace = "api"
    }
  }
}

resource "ingress" "database" {
  port = 5432
  
  target {
    resource = resource.kubernetes_cluster.app
    port     = 5432
    
    config = {
      service   = "postgres"
      namespace = "database"
    }
  }
}
```

## Usage in Service Resources

Ingress resources are commonly referenced by service resources:

```hcl
resource "service" "webapp" {
  target = resource.ingress.webapp
}

resource "layout" "app_layout" {
  column {
    instructions {}
  }
  
  column {
    tab "app" {
      target = resource.service.webapp
      title  = "Web Application"
      active = true
    }
  }
}
```

## Browser Integration

Use `open_in_browser` to automatically open specific paths:

```hcl
resource "ingress" "grafana" {
  port            = 3000
  open_in_browser = "/dashboards"
  
  target {
    resource = resource.kubernetes_cluster.monitoring
    port     = 3000
    
    config = {
      service   = "grafana"
      namespace = "monitoring"
    }
  }
}
```

## Best Practices

1. **Port Organization**: Use consistent port ranges for different service types
2. **Service Discovery**: Use meaningful service names that match Kubernetes deployments
3. **Namespace Management**: Organize services by namespace for clarity
4. **Security**: Be cautious when exposing database or admin interfaces
5. **Documentation**: Clearly document exposed services and their purposes
6. **Testing**: Verify ingress connectivity before lab deployment

## Common Issues

### Service Not Found
```bash
## Verify service exists in cluster
kubectl get svc -n namespace-name

# Check ingress configuration
resource "ingress" "app" {
  target {
    config = {
      service   = "correct-service-name"  # Must match kubectl output
      namespace = "correct-namespace"     # Must match kubectl output
    }
  }
}
```

### Port Conflicts
```hcl
# Ensure unique local ports
resource "ingress" "app1" { port = 8080 }
resource "ingress" "app2" { port = 8081 }  # Different port
```

### Connection Issues
```bash
# Check cluster connectivity
kubectl port-forward svc/service-name port:port -n namespace

# Verify ingress target matches
resource "ingress" "app" {
  port = 8080  # This is the local port participants access
  
  target {
    port = 80  # This must match the service port in Kubernetes
  }
}
```