---
title: Terminal
description: Configuration reference for the terminal resource in Instruqt labs
---



The terminal resource provides an interactive shell session tab that participants can use to execute commands in a container or VM. It creates a fully functional terminal emulator in the browser that connects to the target resource.

## HCL Syntax

### Basic Syntax

```hcl
resource "terminal" "name" {
  target = resource.container.ubuntu
}
```

### Full Syntax

```hcl
resource "terminal" "name" {
  target            = resource.container.ubuntu
  shell             = "/bin/bash"
  user              = "root"
  group             = "root"
  working_directory = "/home/user"
  command           = ["tmux", "new-session"]
}
```

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| target | reference | ✓ | Reference to the container or VM to attach the terminal to |
| shell | string |  | Shell program to use for the terminal session (default: "/bin/sh") |
| user | string |  | User to run the terminal session as (default: "root") |
| group | string |  | Group to run the terminal session as (default: "root") |
| working_directory | string |  | Initial working directory for the terminal (default: "/") |
| command | list(string) |  | Command to execute instead of interactive shell |

### Hidden/Internal Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| prompt | string | - | Internal use only |
| theme | string | - | Internal use only |

### Deprecated Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | - | DEPRECATED: Use the `title` field on the tab in your layout instead |

## Validation Rules

- **Target limitation**: The target can only reference resources of type:
  - `container`
  - `vm`
  
  **Note**: Terminal resources cannot currently target `kubernetes_cluster` or `nomad_cluster` resources directly.

- **Shell validation**: The specified shell must exist in the target container/VM
- **User/Group validation**: The specified user and group must exist in the target
- **Working directory**: The directory must exist or be creatable by the specified user

## Default Values

The following defaults are applied during processing:

| Field | Default Value |
|-------|---------------|
| shell | "/bin/sh" |
| user | "root" |
| group | "root" |
| working_directory | "/" |

## Examples

### Basic Terminal

```hcl
resource "terminal" "main" {
  target = resource.container.ubuntu
}
```

### Terminal with Bash Shell

```hcl
resource "terminal" "bash_terminal" {
  target = resource.container.devbox
  shell  = "/bin/bash"
  user   = "developer"
  group  = "developer"
  working_directory = "/home/developer"
}
```

### Terminal with Initial Command

```hcl
resource "terminal" "monitoring" {
  target  = resource.container.monitor
  command = ["htop"]
}
```

### Multiple Terminals in Layout

```hcl
resource "layout" "multi_terminal" {
  column {
    width = "30%"
    instructions {}
  }
  
  column {
    width = "35%"
    
    tab "server" {
      target = resource.terminal.server
      title  = "Server"
      active = true
    }
    
    tab "client" {
      target = resource.terminal.client
      title  = "Client"
    }
  }
  
  column {
    width = "35%"
    
    tab "logs" {
      target = resource.terminal.logs
      title  = "Logs"
    }
  }
}
```

### Terminal with Tmux Session

```hcl
resource "terminal" "tmux" {
  target            = resource.container.workspace
  shell             = "/bin/bash"
  working_directory = "/workspace"
  command           = ["tmux", "new-session", "-s", "main"]
}
```

### Terminal for Database CLI

```hcl
resource "terminal" "postgres_cli" {
  target  = resource.container.postgres
  user    = "postgres"
  group   = "postgres"
  command = ["psql", "-d", "mydb"]
}
```

## Best Practices

1. **Shell Selection**: Use `/bin/bash` for better interactive features, fallback to `/bin/sh` for minimal containers
2. **User Configuration**: Run terminals as non-root users when possible for security
3. **Working Directory**: Set appropriate starting directories for the lab context
4. **Multiple Terminals**: Use descriptive resource names when creating multiple terminals
5. **Initial Commands**: Use the `command` field for specialized tools (e.g., database CLIs, monitoring tools)

## Common Issues

1. **Shell Not Found**: Terminal fails to start with "shell not found" error
   - Verify the shell exists in the container: `docker exec <container> which /bin/bash`
   - Use `/bin/sh` as a fallback for minimal images

2. **Permission Denied**: Terminal cannot access certain directories or files
   - Check user/group permissions match the target container's file ownership
   - Ensure the working directory is accessible by the specified user

3. **Target Type Error**: "target can only be of the following types: container, vm"
   - For Kubernetes clusters, create a container with kubectl configured
   - Use a jump host or bastion container for cluster access

## Kubernetes Cluster Access

To provide terminal access to a Kubernetes cluster:

```hcl
## Container with kubectl configured
resource "container" "kubectl" {
  image {
    name = "bitnami/kubectl:latest"
  }
  
  volume {
    source      = resource.kubernetes_cluster.k8s.kubeconfig_path
    destination = "/root/.kube/config"
    type        = "bind"
  }
}

# Terminal accessing the kubectl container
resource "terminal" "k8s_terminal" {
  target            = resource.container.kubectl
  working_directory = "/root"
}
```