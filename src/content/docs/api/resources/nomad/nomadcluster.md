---
title: Nomad Cluster
description: Configuration reference for the nomad resource in Instruqt labs
---



The nomad_cluster resource creates HashiCorp Nomad clusters as Docker containers. Nomad clusters can be configured as single-node combined server/client instances or multi-node setups with dedicated server and client nodes.

## HCL Syntax

### Basic Syntax

```hcl
resource "nomad_cluster" "name" {
  network {
    id = resource.network.main
  }
}
```

### Full Syntax

```hcl
resource "nomad_cluster" "name" {
  # Network configuration
  network {
    id = resource.network.main
    ip_address = "10.0.0.10"
    aliases = ["nomad", "server"]
  }
  
  # Optional cluster configuration
  client_nodes = 3
  datacenter = "dc1"
  environment = {
    NOMAD_LOG_LEVEL = "INFO"
    CUSTOM_VAR = "value"
  }
  
  # Configuration files
  server_config = "./nomad/server.hcl"
  client_config = "./nomad/client.hcl"
  consul_config = "./consul/config.hcl"
  
  # Image configuration
  image {
    name = "hashicorp/nomad:1.8.4"
    username = "username"
    password = "password"
  }
  
  # Volume mounts
  volume {
    source = "./nomad-data"
    destination = "/opt/nomad/data"
    type = "bind"
    read_only = false
  }
  
  # Port mappings
  port {
    local = 4646
    host = 4646
    protocol = "tcp"
  }
  
  port_range {
    local_range = "8000-8010"
    host_range = "8000-8010"
    protocol = "tcp"
  }
  
  # Image copying
  copy_image {
    name = "myapp:latest"
    username = "registry_user"
    password = "registry_pass"
  }
  
  # Driver configuration
  config {
    docker {
      no_proxy = ["registry.local"]
      insecure_registries = ["registry.local:5000"]
    }
  }
  
  open_in_browser = false
}
```

## Fields

### Core Configuration

Essential settings for the Nomad cluster.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **network** | block | ✓ | **Network attachments (repeatable)** |
| client_nodes | int |  | Number of dedicated client nodes (default: 0 = combined server/client) |
| datacenter | string |  | Nomad datacenter name (default: "dc1") |
| environment | map(string) |  | Environment variables for all nodes (default: {}) |
| server_config | string |  | Path to custom server configuration file |
| client_config | string |  | Path to custom client configuration file |
| consul_config | string |  | Path to custom Consul configuration file |
| open_in_browser | bool |  | Open Nomad UI in browser after creation (default: false) |

### Image Configuration

Docker image settings for the cluster nodes.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **image** | block |  | **Docker image configuration** |
| ↳ name | string | ✓ | Docker image name with tag (default: ghcr.io/jumppad-labs/nomad:v1.8.4) |
| ↳ username | string |  | Username for private registry authentication |
| ↳ password | string |  | Password for private registry authentication |

### Network Configuration

Network attachment settings for cluster nodes.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **network** | block | ✓ | **Network attachments (repeatable)** |
| ↳ id | reference | ✓ | Reference to a network resource |
| ↳ ip_address | string |  | Static IP address for the server node (default: auto-assigned) |
| ↳ aliases | list(string) |  | Network aliases for service discovery (default: []) |

### Storage Configuration

Volume mounts for persistent data and configuration.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **volume** | block |  | **Volume mounts (repeatable)** |
| ↳ source | string | ✓ | Source path on host or volume name |
| ↳ destination | string | ✓ | Mount path inside container |
| ↳ type | string |  | Volume type: "bind", "volume", or "tmpfs" (default: "bind") |
| ↳ read_only | bool |  | Mount as read-only (default: false) |
| ↳ bind_propagation | string |  | Bind propagation: "shared", "private", "slave", "rslave", "rprivate" |
| ↳ bind_propagation_non_recursive | bool |  | Non-recursive bind mount (default: false) |
| ↳ selinux_relabel | string |  | SELinux relabeling: "shared" or "private" |

### Port Configuration

Port mappings and exposure settings.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **port** | block |  | **Port mappings (repeatable)** |
| ↳ local | int | ✓ | Container port |
| ↳ host | int |  | Host port (default: same as local) |
| ↳ protocol | string |  | Protocol: "tcp" or "udp" (default: "tcp") |
| **port_range** | block |  | **Port range mappings (repeatable)** |
| ↳ local_range | string | ✓ | Container port range (e.g., "3000-3010") |
| ↳ host_range | string |  | Host port range (default: same as local_range) |
| ↳ protocol | string |  | Protocol: "tcp" or "udp" (default: "tcp") |

### Image Management

Docker images to copy to cluster nodes.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **copy_image** | block |  | **Images to copy to cluster (repeatable)** |
| ↳ name | string | ✓ | Docker image name to copy from local cache |
| ↳ username | string |  | Username for private registry |
| ↳ password | string |  | Password for private registry |

### Driver Configuration

Configuration for Nomad task drivers.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **config** | block |  | **Driver configuration** |

#### Config Block

[config](#driver-configuration) → docker

Configures Docker driver settings for the Nomad cluster.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **docker** | block |  | **Docker driver configuration** |
| ↳ no_proxy | list(string) |  | Registries to exclude from image cache (default: []) |
| ↳ insecure_registries | list(string) |  | Registries to treat as insecure (default: []) |

## Computed Attributes

These attributes are set by the system after the cluster is created:

| Field | Type | Description |
|-------|------|-------------|
| external_ip | string | IP address of the Nomad cluster |
| api_port | int | Port where the Nomad API is exposed (default: 4646) |
| connector_port | int | Port where the Jumppad connector runs |
| config_dir | string | Directory containing server and client configurations |
| server_container_name | string | Fully qualified container name for the server |
| client_container_name | list(string) | Container names for client nodes (if any) |

## Validation Rules

- Configuration file paths are made absolute relative to the config file location
- Network attachments must reference valid network resources
- Client nodes value must be non-negative
- Volume source paths must exist for bind mounts
- Port mappings must use valid port numbers (1-65535)

## Examples

### Single Node Cluster

```hcl
resource "network" "nomad" {
  subnet = "10.0.0.0/24"
}

resource "nomad_cluster" "dev" {
  network {
    id = resource.network.nomad
  }
}
```

### Multi-Node Cluster

```hcl
resource "network" "nomad" {
  subnet = "10.0.0.0/24"
}

resource "nomad_cluster" "production" {
  client_nodes = 3
  datacenter = "east"
  
  network {
    id = resource.network.nomad
    ip_address = "10.0.0.10"
    aliases = ["nomad-server", "server"]
  }
  
  environment = {
    NOMAD_LOG_LEVEL = "INFO"
    DATACENTER = "east"
  }
  
  volume {
    source = "./nomad-data"
    destination = "/opt/nomad/data"
    type = "bind"
  }
  
  port {
    local = 4646
    host = 4646
  }
}
```

### Cluster with Custom Configuration

```hcl
resource "nomad_cluster" "custom" {
  client_nodes = 2
  
  network {
    id = resource.network.main
  }
  
  server_config = "./config/server.hcl"
  client_config = "./config/client.hcl"
  consul_config = "./config/consul.hcl"
  
  config {
    docker {
      no_proxy = ["registry.internal.com"]
      insecure_registries = ["registry.internal.com:5000"]
    }
  }
  
  copy_image {
    name = "myapp:latest"
  }
  
  copy_image {
    name = "postgres:13"
  }
  
  volume {
    source = "./nomad-jobs"
    destination = "/opt/nomad/jobs"
    type = "bind"
    read_only = true
  }
}
```

### Development Cluster with Port Ranges

```hcl
resource "nomad_cluster" "dev" {
  network {
    id = resource.network.dev
  }
  
  environment = {
    NOMAD_LOG_LEVEL = "DEBUG"
  }
  
  port_range {
    local_range = "8000-8010"
    host_range = "8000-8010"
    protocol = "tcp"
  }
  
  port {
    local = 4646
    host = 4646
  }
  
  open_in_browser = true
}
```

## Usage with Jobs

Nomad clusters are commonly used with nomad_job resources:

```hcl
resource "nomad_cluster" "app" {
  client_nodes = 2
  
  network {
    id = resource.network.app
  }
}

resource "nomad_job" "web" {
  cluster = resource.nomad_cluster.app
  
  jobspec = <<-EOF
    job "web" {
      datacenters = ["dc1"]
      
      group "web" {
        count = 2
        
        task "nginx" {
          driver = "docker"
          
          config {
            image = "nginx:latest"
            ports = ["http"]
          }
          
          resources {
            cpu    = 100
            memory = 128
          }
        }
      }
    }
  EOF
}
```

## Best Practices

1. **Network Planning**: Use dedicated networks for Nomad clusters to isolate traffic
2. **Resource Limits**: Configure appropriate resource limits for production workloads
3. **Configuration Files**: Use external configuration files for complex setups
4. **Data Persistence**: Mount volumes for Nomad data directories in production
5. **Security**: Use private registries and secure configuration for sensitive environments
6. **Monitoring**: Expose necessary ports for monitoring and observability tools
7. **Image Management**: Pre-load frequently used images using copy_image blocks

## Common Use Cases

1. **Development Environment**: Single-node clusters for local development
2. **CI/CD Pipeline**: Multi-node clusters for testing deployment scenarios  
3. **Learning Platform**: Educational environments for HashiCorp Nomad training
4. **Microservices Testing**: Container orchestration for complex application stacks
5. **Load Testing**: Distributed workload execution across multiple nodes