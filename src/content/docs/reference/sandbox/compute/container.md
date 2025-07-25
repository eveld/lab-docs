---
title: Container
description: Configuration reference for the container resource in Instruqt labs
---



The container resource defines Docker containers that run as part of your lab's sandbox environment. Containers provide isolated environments for running applications, services, and tools that participants interact with during the lab.

## HCL Syntax

### Basic Syntax

```hcl
resource "container" "name" {
  image {
    name = "ubuntu:22.04"
  }
}
```

### Full Syntax

```hcl
resource "container" "name" {
  image {
    name = "image:tag"
  }
  
  # Optional configurations
  entrypoint      = ["executable", "param1"]
  command         = ["arg1", "arg2"]
  environment     = { KEY = "value" }
  labels          = { label = "value" }
  dns             = ["8.8.8.8", "8.8.4.4"]
  privileged      = false
  max_restart_count = 3
  
  # Network configuration
  network {
    id = resource.network.main
    ip_address = "10.0.0.5"
    aliases = ["db", "database"]
  }
  
  # Resource constraints
  resources {
    cpu = 1000      # 1 CPU = 1000
    cpu_pin = [0, 1]
    memory = 512    # MB
    
    gpu {
      driver = "nvidia"
      device_ids = ["0"]
    }
  }
  
  # Volumes
  volume {
    source = "/host/path"
    destination = "/container/path"
    type = "bind"
    read_only = false
  }
  
  # Ports
  port {
    local = 8080
    host = 8080
    protocol = "tcp"
  }
  
  port_range {
    range = "3000-3010"
    enable_host = true
    protocol = "tcp"
  }
  
  # Security
  capabilities {
    add = ["SYS_ADMIN"]
    drop = ["NET_RAW"]
  }
  
  # User configuration
  run_as {
    user = "1000"
    group = "1000"
  }
  
  # Health check
  health_check {
    interval = "30s"
    timeout = "10s"
    retries = 3
    
    exec {
      script = "curl -f http://localhost/health || exit 1"
    }
  }
}
```

## Resource Structure

```
container
├─ image (required)
│  └─ name
├─ basic configuration
│  ├─ entrypoint, command
│  ├─ environment, labels, dns
│  ├─ privileged, max_restart_count
├─ networking
│  └─ network[] (repeatable)
│     ├─ id, ip_address, aliases
├─ storage
│  └─ volume[] (repeatable)
│     ├─ source, destination, type
│     └─ read_only, bind_propagation, selinux_relabel
├─ port exposure
│  ├─ port[] (repeatable)
│  │  ├─ local, host, protocol
│  └─ port_range[] (repeatable)
│     ├─ local_range, host_range, protocol
├─ resource limits
│  └─ resources
│     ├─ cpu, cpu_pin, memory
│     └─ gpu
│        ├─ driver, device_ids
├─ security
│  ├─ capabilities
│  │  ├─ add[], drop[]
│  └─ run_as
│     ├─ user, group
└─ monitoring
   └─ health_check
      ├─ interval, timeout, retries
      └─ exec
```

## Fields

### Core Configuration

Essential settings for the container.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **image** | block | ✓ | **Docker image configuration** |
| ↳ name | string | ✓ | Docker image name with optional tag |
| ↳ username | string |  | Docker registry username for private repositories |
| ↳ password | string |  | Docker registry password for private repositories |
| entrypoint | list(string) |  | Override the default entrypoint |
| command | list(string) |  | Command to run in the container |
| environment | map(string) |  | Environment variables |
| labels | map(string) |  | Docker labels |
| dns | list(string) |  | Custom DNS servers |
| privileged | bool |  | Run container in privileged mode (defaults to false) |
| max_restart_count | int |  | Maximum restart attempts (defaults to 0) |

### Network Configuration

Network attachments and connectivity settings.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **network** | block |  | **Network attachments (repeatable)** |
| ↳ id | reference | ✓ | Reference to a network resource |
| ↳ ip_address | string |  | Static IP address (auto-assigned if not specified) |
| ↳ aliases | list(string) |  | Network aliases for the container |

### Storage Configuration

Volume mounts and storage options.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **volume** | block |  | **Volume mounts (repeatable)** |
| ↳ source | string | ✓ | Source path on host or volume name |
| ↳ destination | string | ✓ | Mount path inside container |
| ↳ type | string |  | Volume type: "bind", "volume", or "tmpfs" (defaults to "bind") |
| ↳ read_only | bool |  | Mount as read-only (defaults to false) |
| ↳ bind_propagation | string |  | Bind propagation: "shared", "private", "slave", "rslave", "rprivate" |
| ↳ bind_propagation_non_recursive | bool |  | Non-recursive bind mount (defaults to false) |
| ↳ selinux_relabel | string |  | SELinux relabeling: "shared" or "private" |

### Port Configuration

Port mappings and exposure settings.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **port** | block |  | **Port mappings (repeatable)** |
| ↳ local | int | ✓ | Container port |
| ↳ remote | int |  | Remote port of the service |
| ↳ host | int |  | Host port |
| ↳ protocol | string |  | Protocol: "tcp" or "udp" (defaults to "tcp") |
| ↳ open_in_browser | string |  | Path to open in browser when host port is defined |
| **port_range** | block |  | **Port range mappings (repeatable)** |
| ↳ range | string | ✓ | Port range (e.g., "3000-3010") |
| ↳ enable_host | bool |  | Enable host port mapping (defaults to false) |
| ↳ protocol | string |  | Protocol: "tcp" or "udp" (defaults to "tcp") |

### Resource Constraints

CPU, memory, and GPU limitations.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **resources** | block |  | **Resource constraints** |
| ↳ cpu | int |  | CPU limit (1 CPU = 1000) |
| ↳ cpu_pin | list(int) |  | Pin container to specific CPU cores |
| ↳ memory | int |  | Memory limit in MB |
| **gpu** | block |  | GPU resource configuration |

#### GPU Block

[resources](#resource-constraints) → gpu

Configures GPU resources for containers that need hardware acceleration for machine learning, graphics processing, or other compute-intensive tasks.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| driver | string | ✓ | GPU driver to use (e.g., "nvidia") |
| device_ids | list(string) | ✓ | GPU device IDs to allocate |

### Security Configuration

User settings and capability management.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **capabilities** | block |  | **Linux capabilities configuration** |
| ↳ add | list(string) |  | Capabilities to add (defaults to empty list) |
| ↳ drop | list(string) |  | Capabilities to remove (defaults to empty list) |
| **run_as** | block |  | **User/group configuration** |
| ↳ user | string | ✓ | Username or UID |
| ↳ group | string | ✓ | Group name or GID |

### Health Monitoring

Health check configuration for container monitoring.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **health_check** | block |  | **Container health check** |
| ↳ interval | string |  | Time between health checks (defaults to "30s") |
| ↳ timeout | string |  | Health check timeout (defaults to "30s") |
| ↳ retries | int |  | Number of retries before unhealthy (defaults to 3) |
| **exec** | block |  | Execute command health check |

#### Health Check Exec Block

[health_check](#health-monitoring) → exec

Defines a command-based health check that executes a script or command to determine if the container is healthy. The container is considered healthy if the command exits with code 0.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| script | string | ✓ | Health check script/command |

## Computed Attributes

These attributes are set by the system after the container is created:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| container_name | string | - | Fully qualified domain name for the container |
| image.id | string | - | Unique identifier for the image |
| network[].name | string | - | Network name as created by the system |
| network[].assigned_address | string | - | IP address assigned by the system |

## Validation Rules

- Volume source paths are made absolute relative to the config file location
- For bind mounts, the source path must exist on the host
- Port mappings must use valid port numbers (1-65535)
- CPU values should be multiples of 1000 for whole CPUs
- Memory values are in megabytes

## Examples

### Basic Container

```hcl
resource "container" "ubuntu" {
  image {
    name = "ubuntu:22.04"
  }
}
```

### Web Application Container

```hcl
resource "container" "webapp" {
  image {
    name = "myapp:latest"
  }
  
  environment = {
    NODE_ENV = "production"
    PORT = "3000"
  }
  
  port {
    local = 3000
    host = 8080
  }
  
  resources {
    cpu = 2000    # 2 CPUs
    memory = 1024 # 1GB
  }
  
  health_check {
    interval = "30s"
    timeout = "5s"
    retries = 3
    
    exec {
      script = "curl -f http://localhost:3000/health || exit 1"
    }
  }
}
```

### Database Container with Volume

```hcl
resource "container" "postgres" {
  image {
    name = "postgres:15"
  }
  
  environment = {
    POSTGRES_PASSWORD = "secret"
    POSTGRES_DB = "myapp"
  }
  
  volume {
    source = "postgres-data"
    destination = "/var/lib/postgresql/data"
    type = "volume"
  }
  
  port {
    local = 5432
  }
  
  network {
    id = resource.network.backend
    aliases = ["db", "database"]
  }
}
```

### Development Container with Multiple Networks

```hcl
resource "container" "devbox" {
  image {
    name = "instruqt/devbox:latest"
  }
  
  privileged = true
  
  network {
    id = resource.network.frontend
    ip_address = "10.0.1.10"
  }
  
  network {
    id = resource.network.backend
    ip_address = "10.0.2.10"
  }
  
  volume {
    source = "./code"
    destination = "/workspace"
    type = "bind"
  }
  
  volume {
    source = "/var/run/docker.sock"
    destination = "/var/run/docker.sock"
    type = "bind"
  }
  
  capabilities {
    add = ["SYS_PTRACE"]
  }
  
  run_as {
    user = "developer"
    group = "developer"
  }
}
```

### GPU-Enabled Container

```hcl
resource "container" "ml_workspace" {
  image {
    name = "tensorflow/tensorflow:latest-gpu"
  }
  
  resources {
    cpu = 4000
    memory = 8192
    
    gpu {
      driver = "nvidia"
      device_ids = ["0", "1"]
    }
  }
  
  environment = {
    CUDA_VISIBLE_DEVICES = "0,1"
  }
}
```

## Best Practices

1. **Image Tags**: Always specify explicit image tags rather than using `latest`
2. **Resource Limits**: Set appropriate CPU and memory limits to prevent resource exhaustion
3. **Health Checks**: Configure health checks for services to ensure availability
4. **Non-Root Users**: Use the `run_as` block to run containers as non-root users when possible
5. **Volume Types**: Use named volumes for persistent data and bind mounts for development files
6. **Network Aliases**: Use meaningful aliases for service discovery
7. **Environment Variables**: Use environment variables for configuration instead of hardcoding values