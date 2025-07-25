---
title: Service
description: Configuration reference for the service resource in Instruqt labs
---



The service resource represents a web service or application tab that can be displayed in the lab UI. It proxies HTTP/HTTPS traffic from the participant's browser to a service running inside a container or VM.

## HCL Syntax

### Basic Syntax

```hcl
resource "service" "name" {
  target = resource.container.webapp
  port   = 8080
}
```

### Full Syntax

```hcl
resource "service" "name" {
  target = resource.container.webapp
  scheme = "http"
  port   = 8080
  path   = "/app"
}
```

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| target | reference | ✓ | Reference to the container or VM hosting the service |
| scheme | string | | Protocol scheme: "http" or "https" (default: "http") |
| port | int | ✓ | Port number the service is listening on |
| path | string | | URL path to append to service requests |

### Deprecated Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | - | DEPRECATED: Use the `title` field on the tab in your layout instead |

## Validation Rules

- **Target limitation**: The target can only reference resources of type:
  - `container`
  - `vm`
  
  **Note**: Service resources cannot currently target `kubernetes_cluster` or `ingress` resources. This is a known limitation that requires workarounds for Kubernetes-based labs.

- **Scheme validation**: Must be either "http" or "https"
- **Port validation**: Must be a valid port number (1-65535)

## Examples

### Basic HTTP Service

```hcl
resource "service" "webapp" {
  target = resource.container.app
  port   = 3000
}
```

### HTTPS Service with Path

```hcl
resource "service" "dashboard" {
  target = resource.container.grafana
  scheme = "https"
  port   = 3000
  path   = "/dashboard"
}
```

### Multiple Services from One Container

```hcl
resource "container" "multiservice" {
  image {
    name = "myapp:latest"
  }
  
  port {
    local = 8080
  }
  
  port {
    local = 8081
  }
}

resource "service" "app_ui" {
  target = resource.container.multiservice
  port   = 8080
}

resource "service" "app_api" {
  target = resource.container.multiservice
  port   = 8081
  path   = "/reference/v1"
}
```

### Service in Layout

```hcl
resource "layout" "default" {
  column {
    width = "50%"
    instructions {}
  }
  
  column {
    width = "50%"
    
    tab "webapp" {
      target = resource.service.webapp
      title  = "Web Application"
    }
  }
}
```

## Kubernetes Workaround

Since service resources cannot directly target kubernetes_cluster resources, you need to create a proxy container:

```hcl
# Proxy container for Kubernetes dashboard
resource "container" "k8s_proxy" {
  image {
    name = "bitnami/kubectl:latest"
  }
  
  command = ["kubectl", "proxy", "--address=0.0.0.0", "--port=8001", "--accept-hosts=.*"]
  
  network {
    id = resource.network.main
  }
  
  volume {
    source      = resource.kubernetes_cluster.k8s.kubeconfig_path
    destination = "/root/.kube/config"
    type        = "bind"
  }
  
  port {
    local = 8001
  }
}

# Service pointing to the proxy
resource "service" "k8s_dashboard" {
  target = resource.container.k8s_proxy
  port   = 8001
  path   = "/reference/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/"
}
```

## Best Practices

1. **Use Meaningful Names**: Name your service resources based on their function (e.g., `webapp`, `api`, `dashboard`)
2. **Consistent Schemes**: Use HTTPS for production services when certificates are properly configured
3. **Path Configuration**: Use the `path` field to route to specific application paths
4. **Port Documentation**: Document which ports your services use in comments
5. **Health Checks**: Ensure the target container has health checks configured for service availability

## Common Issues

1. **Target Type Error**: "target can only be of the following types: container, vm"
   - Solution: Use a proxy container for Kubernetes services
   - Solution: Ensure you're referencing a container or vm resource

2. **Service Not Accessible**: Service loads but shows connection errors
   - Check that the container is running and healthy
   - Verify the port number matches the service's actual listening port
   - Ensure the container exposes the port in its configuration

3. **HTTPS Certificate Issues**: When using scheme "https"
   - The service must have valid SSL certificates configured
   - Consider using "http" for development/testing scenarios