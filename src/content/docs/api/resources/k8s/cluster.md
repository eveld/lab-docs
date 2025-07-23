---
title: Kubernetes Cluster
description: Configuration reference for the k8s resource in Instruqt labs
---



The kubernetes_cluster resource creates Kubernetes clusters running in Docker containers using K3s. These clusters provide isolated Kubernetes environments for hands-on learning and testing scenarios.

## HCL Syntax

### Basic Syntax

```hcl
resource "kubernetes_cluster" "name" {
  network {
    id = resource.network.main
  }
}
```

### Full Syntax

```hcl
resource "kubernetes_cluster" "name" {
  nodes = 3
  
  image {
    name = "rancher/k3s:latest"
  }
  
  network {
    id         = resource.network.main
    ip_address = "10.0.0.100"
  }
  
  resources {
    cpu    = 2000  # 2 CPUs
    memory = 4096  # 4GB
  }
  
  copy_image {
    name = "myapp:latest"
  }
  
  port {
    local = 80
    host  = 8080
  }
  
  volume {
    source      = "./config"
    destination = "/etc/config"
    type        = "bind"
  }
  
  environment = {
    CLUSTER_INIT = "true"
  }
  
  config {
    docker {
      no_proxy            = ["internal.registry.com"]
      insecure_registries = ["internal.registry.com:5000"]
    }
  }
}
```

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **network** | block | ✓ | Network attachments (repeatable) |
| nodes | int |  | Number of nodes in the cluster. Defaults to `1` |
| image | block |  | Container image for cluster nodes. Defaults to latest K3s |
| resources | block |  | CPU and memory constraints |
| copy_image | block |  | Local Docker images to copy to cluster (repeatable) |
| port | block |  | Port mappings (repeatable) |
| port_range | block |  | Port range mappings (repeatable) |
| volume | block |  | Volume mounts (repeatable) |
| environment | map(string) |  | Environment variables. Defaults to `{}` |
| config | block |  | Cluster configuration settings |

## Nested Blocks

### Network Block

[network](#network-block)

Attaches the cluster to a network for connectivity.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | reference | ✓ | Reference to a network resource |
| ip_address | string |  | Static IP address for the cluster. Auto-assigned if not specified |
| aliases | list(string) |  | Network aliases. Defaults to `[]` |

### Image Block

[image](#image-block)

Specifies the container image for cluster nodes.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | ✓ | Docker image name and tag |
| username | string |  | Username for private registry |
| password | string |  | Password for private registry |

### Resources Block

[resources](#resources-block)

Defines resource constraints for the cluster.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| cpu | int |  | CPU limit in MHz (1000 = 1 CPU) |
| cpu_pin | list(int) |  | Pin to specific CPU cores |
| memory | int |  | Memory limit in MB |
| gpu | block |  | GPU configuration |

### Config Block

[config](#config-block)

Cluster-specific configuration settings.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| docker | block |  | Docker daemon configuration |

#### Docker Config Block

[config](#config-block) → docker

Docker daemon settings for the cluster.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| no_proxy | list(string) |  | Registries to exclude from proxy. Defaults to `[]` |
| insecure_registries | list(string) |  | Insecure registries to allow. Defaults to `[]` |

## Computed Attributes

These attributes are available after cluster creation:

| Field | Type | Description |
|-------|------|-------------|
| kube_config | block | Kubernetes configuration details |
| api_port | int | Kubernetes API server port |
| connector_port | int | Internal connector port |
| container_name | string | Docker container name for the cluster |
| external_ip | string | External IP address |

### KubeConfig Block

Kubernetes configuration information for cluster access.

| Field | Type | Description |
|-------|------|-------------|
| path | string | Path to kubeconfig file |
| ca | string | Base64-encoded CA certificate |
| client_certificate | string | Base64-encoded client certificate |
| client_key | string | Base64-encoded client key |

## Image Caching

Kubernetes clusters use a global image cache to optimize bandwidth and performance:

- Each cluster node has its own Docker image cache
- Images are pulled through a shared cache proxy
- After the first pull, subsequent pulls come from the cache
- Use `copy_image` blocks to pre-populate cluster with local images

## Examples

### Basic Single-Node Cluster

```hcl
resource "network" "k8s_net" {
  subnet = "10.0.0.0/24"
}

resource "kubernetes_cluster" "basic" {
  network {
    id = resource.network.k8s_net
  }
}
```

### Multi-Node Production-Like Cluster

```hcl
resource "kubernetes_cluster" "production" {
  nodes = 3
  
  network {
    id = resource.network.cluster_network
  }
  
  resources {
    cpu    = 4000  # 4 CPUs per node
    memory = 8192  # 8GB per node
  }
  
  volume {
    source      = "./k8s-config"
    destination = "/etc/kubernetes"
    type        = "bind"
    read_only   = true
  }
  
  environment = {
    K3S_TOKEN = "my-cluster-token"
  }
}
```

### Cluster with Custom Image and Registry

```hcl
resource "kubernetes_cluster" "custom" {
  image {
    name     = "rancher/k3s:v1.25.3-k3s1"
    username = "registry_user"
    password = "registry_pass"
  }
  
  network {
    id = resource.network.secure_network
  }
  
  config {
    docker {
      insecure_registries = ["internal.company.com:5000"]
      no_proxy           = ["internal.company.com"]
    }
  }
  
  copy_image {
    name = "internal.company.com:5000/myapp:v1.2.3"
  }
}
```

### Cluster with Application Pre-loading

```hcl
resource "kubernetes_cluster" "app_cluster" {
  nodes = 2
  
  network {
    id = resource.network.app_network
  }
  
  # Pre-load application images
  copy_image {
    name = "nginx:1.21"
  }
  
  copy_image {
    name = "redis:7-alpine"
  }
  
  copy_image {
    name = "postgres:14"
  }
  
  # Expose common ports
  port {
    local = 80
    host  = 8080
  }
  
  port {
    local = 443
    host  = 8443
  }
}
```

## Terminal Access

Since terminals cannot directly target kubernetes_cluster resources, use a container with kubectl:

```hcl
resource "kubernetes_cluster" "k8s" {
  network {
    id = resource.network.main
  }
}

resource "container" "kubectl" {
  image {
    name = "bitnami/kubectl:latest"
  }
  
  network {
    id = resource.network.main
  }
  
  volume {
    source      = resource.kubernetes_cluster.k8s.kube_config.path
    destination = "/root/.kube/config"
    type        = "bind"
  }
  
  command = ["sleep", "infinity"]
}

resource "terminal" "k8s_terminal" {
  target = resource.container.kubectl
}
```

## Service Access

Services cannot directly target kubernetes_cluster resources either. Use ingress resources or proxy containers:

```hcl
resource "ingress" "k8s_dashboard" {
  port = 8080
  
  target {
    resource = resource.kubernetes_cluster.k8s
    port     = 80
    
    config = {
      service   = "kubernetes-dashboard"
      namespace = "kubernetes-dashboard"
    }
  }
}
```

## Best Practices

1. **Resource Planning**: Allocate sufficient CPU and memory based on expected workload
2. **Multi-Node Setup**: Use multiple nodes for realistic cluster scenarios
3. **Image Pre-loading**: Use `copy_image` for applications that will be deployed
4. **Network Isolation**: Create dedicated networks for cluster communication
5. **Configuration Management**: Use volumes to provide custom configurations
6. **Registry Configuration**: Configure insecure registries for internal/development use
7. **Access Patterns**: Use proxy containers for terminal and service access

## Common Issues

### Resource Constraints
```hcl
## Ensure adequate resources for multi-node clusters
resources {
  cpu    = 2000  # Minimum 2 CPUs for production-like workloads
  memory = 4096  # Minimum 4GB for realistic scenarios
}
```

### Image Pull Issues
```hcl
# Configure registry access for private images
config {
  docker {
    insecure_registries = ["your-registry:5000"]
  }
}
```

### Network Connectivity
```hcl
# Ensure cluster is on the same network as accessing resources
resource "container" "client" {
  network {
    id = resource.network.main  # Same network as cluster
  }
}
```