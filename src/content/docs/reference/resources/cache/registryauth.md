---
title: Registry Auth
description: Configuration reference for the cache resource in Instruqt labs
---


The `auth` block configures authentication credentials for accessing private Docker registries. This is used within the `container_registry` resource to provide authentication details.

## Basic Syntax

```hcl
auth {
  username = "myuser"
  password = "mypassword"
}
```

## Full Syntax

```hcl
auth {
  hostname = "auth.company.com"
  username = "service-account"
  password = var.registry_password
}
```

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `username` | `string` | ✓ | Username for authentication |
| `password` | `string` | ✓ | Password for authentication |
| `hostname` | `string` |  | Hostname for authentication (can differ from registry hostname) |

## Examples

### Basic Authentication

```hcl
resource "container_registry" "private" {
  hostname = "registry.example.com"
  
  auth {
    username = "developer"
    password = "secretpassword"
  }
}
```

### Different Auth Hostname

Sometimes the authentication endpoint differs from the registry hostname:

```hcl
resource "container_registry" "corporate" {
  hostname = "images.corp.com"
  
  auth {
    hostname = "login.corp.com"
    username = "service-bot"
    password = var.auth_token
  }
}
```

### Using Variables for Secrets

```hcl
resource "container_registry" "secure" {
  hostname = "secure-registry.com"
  
  auth {
    username = var.registry_username
    password = var.registry_password
  }
}
```