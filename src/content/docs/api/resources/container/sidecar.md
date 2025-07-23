---
title: Sidecar
description: Configuration reference for the container resource in Instruqt labs
---



The sidecar resource creates a supplementary container that runs alongside a target container. Sidecars are commonly used for logging, monitoring, proxying, or other supporting services that complement the main application container.

## HCL Syntax

### Basic Syntax

```hcl
resource "sidecar" "proxy" {
  target = resource.container.app
  
  image {
    name = "envoy:latest"
  }
}
```

### Full Syntax

```hcl
resource "sidecar" "monitoring" {
  target = resource.container.app
  
  image {
    name = "prometheus/node-exporter:latest"
    username = "registry_user"
    password = "registry_pass"
  }
  
  # Container configuration
  entrypoint = ["/bin/node_exporter"]
  command = ["--path.rootfs=/host"]
  privileged = false
  max_restart_count = 3
  
  # Environment variables
  environment = {
    NODE_ID = "worker-1"
    METRICS_PORT = "9100"
  }
  
  # Labels
  labels = {
    service = "monitoring"
    component = "exporter"
  }
  
  # Volume mounts
  volume {
    source = "/proc"
    destination = "/host/proc"
    type = "bind"
    read_only = true
  }
  
  volume {
    source = "/sys"
    destination = "/host/sys"
    type = "bind"
    read_only = true
  }
  
  # Resource constraints
  resources {
    cpu = 100      # 0.1 CPU
    memory = 128   # 128MB
    
    gpu {
      driver = "nvidia"
      device_ids = ["0"]
    }
  }
  
  # Health check
  health_check {
    timeout = "30s"
    
    http {
      address = "http://localhost:9100/metrics"
      success_codes = [200]
    }
    
    tcp {
      address = "localhost:9100"
    }
    
    exec {
      script = <<-EOF
        #!/bin/bash
        curl -f http://localhost:9100/metrics || exit 1
      EOF
    }
  }
}
```

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `target` | `resource.container` | ✓ | Reference to the target container this sidecar runs alongside |
| `entrypoint` | `[]string` |  | Override the container's entrypoint |
| `command` | `[]string` |  | Command arguments to pass to the container |
| `environment` | `map[string]string` |  | Environment variables to set in the container |
| `labels` | `map[string]string` |  | Labels to apply to the container |
| `privileged` | `bool` |  | Whether to run the container in privileged mode |
| `max_restart_count` | `int` |  | Maximum number of times to restart the container on failure |

## Nested Blocks

### `image` (required)

Container image configuration.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | `string` | ✓ | Image name and tag (e.g., "nginx:latest", "docker.io/library/redis:6") |
| `username` | `string` |  | Username for private registry authentication |
| `password` | `string` |  | Password for private registry authentication |

### `volume`

Volume mounts for the sidecar container.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `source` | `string` | ✓ | Source path on the host (relative paths are relative to the HCL file) |
| `destination` | `string` | ✓ | Destination path inside the container (must be absolute) |
| `type` | `string` |  | Volume type: "bind", "volume", or "tmpfs" (defaults to "bind") |
| `read_only` | `bool` |  | Whether the volume should be read-only |
| `bind_propagation` | `string` |  | Bind propagation mode: "shared", "private", "slave", "rslave", "rprivate" |
| `bind_propagation_non_recursive` | `bool` |  | Whether to use non-recursive bind mounting |
| `selinux_relabel` | `string` |  | SELinux relabeling mode: "shared" or "private" |

### `resources`

Resource constraints for the sidecar container.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `cpu` | `int` |  | CPU limit in MHz (1000 = 1 CPU core) |
| `cpu_pin` | `[]int` |  | Pin container to specific CPU cores |
| `memory` | `int` |  | Memory limit in megabytes |

#### `gpu`

GPU resource allocation within the resources block.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `driver` | `string` | ✓ | GPU driver to use (e.g., "nvidia") |
| `device_ids` | `[]string` | ✓ | GPU device IDs to allocate |

### `health_check`

Health check configuration to verify the sidecar is running correctly.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `timeout` | `string` | ✓ | Maximum time to wait for health check (e.g., "30s", "2m") |

#### `http`

HTTP-based health check within the health_check block.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `address` | `string` | ✓ | URL to check |
| `method` | `string` |  | HTTP method to use (defaults to "GET") |
| `body` | `string` |  | Request body to send |
| `headers` | `map[string]string` |  | HTTP headers to send |
| `success_codes` | `[]int` |  | HTTP status codes that indicate success (defaults to [200]) |

#### `tcp`

TCP-based health check within the health_check block.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `address` | `string` | ✓ | Address to check (e.g., "localhost:8080") |

#### `exec`

Command-based health check within the health_check block.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `command` | `[]string` |  | Command to execute |
| `script` | `string` |  | Script to execute |
| `exit_code` | `int` |  | Expected exit code for success (defaults to 0) |

## Computed Fields

The following fields are computed at runtime and can be referenced by other resources:

| Field | Type | Description |
|-------|------|-------------|
| `meta.id` | `string` | Full resource ID (e.g., `resource.sidecar.proxy`) |
| `meta.type` | `string` | Resource type (`sidecar`) |
| `meta.name` | `string` | Resource name |
| `container_name` | `string` | Fully qualified domain name for accessing the sidecar |

## Examples

### Simple Logging Sidecar

```hcl
resource "container" "app" {
  image {
    name = "myapp:latest"
  }
}

resource "sidecar" "logs" {
  target = resource.container.app
  
  image {
    name = "fluent/fluent-bit:latest"
  }
  
  volume {
    source = "./fluent-bit.conf"
    destination = "/fluent-bit/etc/fluent-bit.conf"
    type = "bind"
    read_only = true
  }
}
```

### Envoy Proxy Sidecar

```hcl
resource "container" "backend" {
  image {
    name = "backend-service:latest"
  }
}

resource "sidecar" "proxy" {
  target = resource.container.backend
  
  image {
    name = "envoyproxy/envoy:v1.28.0"
  }
  
  command = [
    "envoy",
    "-c", "/etc/envoy/envoy.yaml",
    "--service-cluster", "backend",
    "--service-node", "backend-proxy"
  ]
  
  volume {
    source = "./envoy.yaml"
    destination = "/etc/envoy/envoy.yaml"
    type = "bind"
    read_only = true
  }
  
  health_check {
    timeout = "10s"
    
    http {
      address = "http://localhost:9901/ready"
      success_codes = [200]
    }
  }
}
```

### Monitoring Sidecar with Resource Constraints

```hcl
resource "container" "web" {
  image {
    name = "nginx:alpine"
  }
}

resource "sidecar" "metrics" {
  target = resource.container.web
  
  image {
    name = "nginx/nginx-prometheus-exporter:latest"
  }
  
  command = [
    "-nginx.scrape-uri=http://localhost:8080/metrics"
  ]
  
  resources {
    cpu = 50      # 0.05 CPU
    memory = 64   # 64MB
  }
  
  health_check {
    timeout = "5s"
    
    tcp {
      address = "localhost:9113"
    }
  }
}