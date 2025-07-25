---
title: Sandbox Resources
description: Infrastructure and environment resources for lab sandboxes
---

Sandbox resources define the technical infrastructure and environment that powers your lab. These resources provide the compute, networking, storage, and services that participants interact with during hands-on activities.

## Compute Resources

### [Container](./compute/container.md)  
Docker containers for running applications, services, and development environments.

### [Sidecar](./compute/sidecar.md)
Additional containers that run alongside main containers for specialized functions.

## Networking

### [Network](./networking/network.md)
Isolated Docker networks for container communication and network segmentation.

### [Ingress](./networking/ingress.md)  
HTTP/HTTPS ingress controllers for routing external traffic to services.

## User Interface Tabs

### [Terminal](./ui/terminal.md)
Interactive shell sessions that connect to containers or VMs.

### [Service](./ui/service.md)
Web service tabs that proxy HTTP traffic to running applications.

### [Editor](./ui/editor.md)
Code editor interfaces for file manipulation and development.

### [External Website](./ui/externalwebsite.md)
Tabs that display external websites and web applications.

## Storage & Files

### [Copy](./storage/copy.md)
File copying and directory synchronization between host and containers.

### [Template](./storage/template.md)
Template processing for generating configuration files and scripts.

## Cloud Integrations

### AWS Resources
- **[Account](./cloud/aws/account.md)** - AWS account configuration
- **[User](./cloud/aws/user.md)** - AWS IAM user management

### Azure Resources  
- **[Subscription](./cloud/azure/subscription.md)** - Azure subscription setup
- **[Service Principal](./cloud/azure/serviceprincipal.md)** - Azure service principal management
- **[User](./cloud/azure/user.md)** - Azure user account management

### Google Cloud Resources
- **[Project](./cloud/google/project.md)** - Google Cloud project configuration
- **[Service Account](./cloud/google/serviceaccount.md)** - GCP service account management  
- **[User](./cloud/google/user.md)** - Google Cloud user management

## Container Orchestration

### Kubernetes
- **[Cluster](./orchestration/k8s/cluster.md)** - Kubernetes cluster provisioning
- **[Config](./orchestration/k8s/config.md)** - Kubernetes configuration management

### Nomad
- **[Cluster](./orchestration/nomad/nomadcluster.md)** - Nomad cluster deployment
- **[Job](./orchestration/nomad/nomadjob.md)** - Nomad job scheduling

### Helm
- **[Helm](./orchestration/helm/helm.md)** - Helm chart deployment
- **[Repository](./orchestration/helm/helmrepository.md)** - Helm repository management

## Utilities

### Core Utilities
- **[Exec](./utilities/exec.md)** - Execute commands on remote systems
- **[HTTP](./utilities/http.md)** - HTTP requests and API interactions
- **[Terraform](./utilities/terraform.md)** - Infrastructure as code with Terraform

### Random Values
- **[Creature](./utilities/random/randomcreature.md)** - Random creature names
- **[ID](./utilities/random/randomid.md)** - Random identifier generation
- **[Number](./utilities/random/randomnumber.md)** - Random number generation
- **[Password](./utilities/random/randompassword.md)** - Random password generation
- **[UUID](./utilities/random/randomuuid.md)** - UUID generation

### Caching
- **[Image Cache](./utilities/cache/imagecache.md)** - Container image caching
- **[Registry](./utilities/cache/registry.md)** - Container registry management
- **[Registry Auth](./utilities/cache/registryauth.md)** - Registry authentication

## Certificates

### [Certificate Management](./certificates/cert/)
- **[Certificate CA](./certificates/cert/certificateca.md)** - Certificate authority management
- **[Certificate Leaf](./certificates/cert/certificateleaf.md)** - End-entity certificate management  
- **[File](./certificates/cert/file.md)** - Certificate file handling

## Infrastructure Planning

1. **Compute**: Start with containers for your application stack
2. **Networking**: Create isolated networks for different tiers
3. **Storage**: Plan file sharing and persistent storage needs
4. **UI Access**: Design terminal and service access patterns
5. **Integration**: Add cloud services and orchestration as needed
6. **Security**: Configure certificates and access controls

## Best Practices

- **Resource Isolation**: Use separate networks for different application tiers
- **Minimal Containers**: Choose lightweight base images for faster startup
- **Health Checks**: Configure health checks for reliable service availability  
- **Resource Limits**: Set appropriate CPU and memory limits
- **Security**: Run containers as non-root users when possible
- **Naming**: Use consistent, descriptive resource names

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