---
title: Terraform
description: Configuration reference for the terraform resource in Instruqt labs
---



The terraform resource allows you to provision infrastructure using Terraform configurations within your lab environment. It executes Terraform commands in a containerized environment and can pass variables and capture outputs for use by other resources.

## HCL Syntax

### Basic Syntax

```hcl
resource "terraform" "example" {
  source = "./terraform"
}
```

### Full Syntax

```hcl
resource "terraform" "example" {
  source           = "./terraform"
  version          = "1.9.8"
  working_directory = "/terraform"
  
  # Environment variables
  environment = {
    AWS_REGION = "us-east-1"
    TF_LOG     = "INFO"
  }
  
  # Terraform variables
  variables = {
    instance_count = 2
    vpc_cidr       = "10.0.0.0/16"
  }
  
  # Network configuration
  network {
    id = resource.network.main.meta.id
    ip_address = "10.0.0.5"
    aliases = ["terraform"]
  }
  
  # Volume mounts
  volume {
    source      = "./terraform-modules"
    destination = "/modules"
    type        = "bind"
    read_only   = true
  }
}
```

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `source` | `string` | ✓ | Source directory containing Terraform configuration files |
| `version` | `string` |  | Version of Terraform to use (defaults to "1.9.8") |
| `working_directory` | `string` |  | Working directory to run terraform commands (defaults to "./") |
| `environment` | `map[string]string` |  | Environment variables to set when running Terraform |
| `variables` | `any` |  | Variables to pass to Terraform |

## Nested Blocks

### `network`

Network configuration for the Terraform container.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | ✓ | ID of the network to attach to (in reference format) |
| `ip_address` | `string` |  | Static IP address to assign |
| `aliases` | `[]string` |  | Network aliases for the container |

### `volume`

Volume mounts for the Terraform container.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `source` | `string` | ✓ | Source path on the host (relative paths are relative to the HCL file) |
| `destination` | `string` | ✓ | Destination path inside the container (must be absolute) |
| `type` | `string` |  | Volume type: "bind", "volume", or "tmpfs" (defaults to "bind") |
| `read_only` | `bool` |  | Whether the volume should be read-only |
| `bind_propagation` | `string` |  | Bind propagation mode: "shared", "private", "slave", "rslave", "rprivate" |
| `bind_propagation_non_recursive` | `bool` |  | Whether to use non-recursive bind mounting |
| `selinux_relabel` | `string` |  | SELinux relabeling mode: "shared" or "private" |

## Computed Fields

The following fields are computed at runtime and can be referenced by other resources:

| Field | Type | Description |
|-------|------|-------------|
| `meta.id` | `string` | Full resource ID (e.g., `resource.terraform.example`) |
| `meta.type` | `string` | Resource type (`terraform`) |
| `meta.name` | `string` | Resource name |
| `output` | `any` | Terraform outputs defined in the configuration |
| `apply_output` | `string` | Console output from the terraform apply command |
| `source_checksum` | `string` | Checksum of the source directory |

## Examples

### Basic Terraform Configuration

```hcl
resource "terraform" "aws_vpc" {
  source = "./infrastructure"
  
  variables = {
    region = "us-west-2"
    environment = "lab"
  }
}
```

### Advanced Configuration with Custom Version

```hcl
resource "terraform" "kubernetes" {
  source  = "./k8s-terraform"
  version = "1.8.0"
  
  environment = {
    KUBE_CONFIG_PATH = "/root/.kube/config"
  }
  
  variables = {
    cluster_name = "lab-cluster"
    node_count   = 3
  }
  
  volume {
    source      = "./kubeconfig"
    destination = "/root/.kube"
    type        = "bind"
  }
}
```

### Using Terraform Outputs in Other Resources

```hcl
resource "terraform" "infrastructure" {
  source = "./terraform"
  
  variables = {
    vpc_cidr = "10.0.0.0/16"
  }
}

## Reference Terraform outputs
resource "container" "app" {
  image {
    name = "myapp:latest"
  }
  
  environment = {
    VPC_ID = resource.terraform.infrastructure.output.vpc_id
  }
}
```