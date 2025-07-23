---
title: Sandbox Overview
description: Infrastructure patterns and best practices for Instruqt lab environments
---

The sandbox is the infrastructure environment where lab participants interact with containers, services, and cloud resources. This section covers patterns, best practices, and configuration guidance for creating effective lab environments.

## Infrastructure Components

### Containers
Docker containers provide isolated environments for applications, tools, and services. They form the foundation of most lab sandboxes.

- **[Container Resources](/reference/resources/container/container/)** - Primary compute environments
- **[Sidecar Containers](/reference/resources/container/sidecar/)** - Supporting services and utilities

### Networking
Network configuration enables connectivity between containers and external access to services.

- **[Network Resources](/reference/resources/network/network/)** - Container networking
- **[Ingress Resources](/reference/resources/ingress/ingress/)** - External access and load balancing

### Storage & Files
File management and data persistence across lab sessions.

- **[Copy Resources](/reference/resources/copy/copy/)** - File provisioning
- **[Template Resources](/reference/resources/template/template/)** - Dynamic file generation

### Orchestration
Container orchestration platforms for complex multi-service environments.

- **[Kubernetes](/reference/resources/k8s/cluster/)** - Container orchestration
- **[Nomad](/reference/resources/nomad/nomadcluster/)** - Alternative orchestration

## Cloud Provider Integration

### Multi-Cloud Support
Integration with major cloud platforms for realistic production environments.

- **[AWS Integration](/reference/resources/aws/account/)** - Amazon Web Services
- **[Azure Integration](/reference/resources/azure/subscription/)** - Microsoft Azure  
- **[Google Cloud Integration](/reference/resources/google/project/)** - Google Cloud Platform

## Security & Certificates

### Certificate Management
SSL/TLS certificates for secure communication and authentication.

- **[Certificate Authority](/reference/resources/cert/certificateca/)** - Root certificate creation
- **[Leaf Certificates](/reference/resources/cert/certificateleaf/)** - Service certificates

## Best Practices

### Resource Planning
- **Start Simple**: Begin with single container environments and add complexity gradually
- **Resource Limits**: Set appropriate CPU and memory limits to prevent resource exhaustion
- **Network Isolation**: Use networks to isolate different parts of your lab environment

### Performance Optimization
- **Image Caching**: Use image caching to reduce container startup times
- **Registry Configuration**: Configure private registries for custom images
- **Health Checks**: Implement health checks to ensure service availability

### Security Considerations
- **Principle of Least Privilege**: Run containers with minimal required permissions
- **Network Segmentation**: Isolate sensitive services using separate networks
- **Certificate Management**: Use proper certificates for production-like environments

### Scalability Patterns
- **Modular Design**: Break complex environments into reusable modules
- **Resource Sharing**: Share common resources across multiple lab components
- **Dynamic Configuration**: Use variables and functions for flexible configurations

## Common Patterns

### Web Application Stack
```hcl
# Frontend container
resource "container" "frontend" {
  image { name = "nginx:alpine" }
  network { id = resource.network.web }
  port { local = 80, host = 8080 }
}

# Backend API container
resource "container" "api" {
  image { name = "node:16-alpine" }
  network { id = resource.network.web }
  network { id = resource.network.db }
  port { local = 3000 }
}

# Database container
resource "container" "database" {
  image { name = "postgres:14" }
  network { id = resource.network.db }
  volume {
    source = "postgres-data"
    destination = "/var/lib/postgresql/data"
    type = "volume"
  }
}
```

### Development Environment
```hcl
# Main development container
resource "container" "devbox" {
  image { name = "instruqt/devbox:latest" }
  privileged = true
  
  volume {
    source = "./workspace"
    destination = "/workspace"
    type = "bind"
  }
  
  volume {
    source = "/var/run/docker.sock"
    destination = "/var/run/docker.sock"
    type = "bind"
  }
}
```

### Microservices Architecture
```hcl
# Service mesh with multiple services
resource "network" "mesh" {
  subnet = "10.0.0.0/24"
}

resource "container" "service_a" {
  image { name = "service-a:latest" }
  network { 
    id = resource.network.mesh
    aliases = ["service-a"]
  }
}

resource "container" "service_b" {
  image { name = "service-b:latest" }
  network { 
    id = resource.network.mesh
    aliases = ["service-b"]
  }
}
```

## Troubleshooting

### Common Issues
- **Container Startup Failures**: Check image availability and resource constraints
- **Network Connectivity**: Verify network configuration and aliases
- **Volume Mount Issues**: Ensure source paths exist and permissions are correct
- **Resource Exhaustion**: Monitor CPU and memory usage across containers

### Debugging Tools
- **Container Logs**: Monitor container output for errors
- **Health Checks**: Implement and monitor health check status
- **Network Testing**: Use network utilities to test connectivity
- **Resource Monitoring**: Track resource usage and limits
