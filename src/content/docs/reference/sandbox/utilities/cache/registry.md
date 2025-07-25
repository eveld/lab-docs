---
title: Container Registry
description: Configuration reference for the cache resource in Instruqt labs
---


The `container_registry` resource configures additional Docker registries for use with image caching and container management. This allows you to authenticate against private registries and configure custom registry endpoints.

## Basic Syntax

```hcl
resource "container_registry" "private" {
  hostname = "my-registry.company.com"
  
  auth {
    username = "myuser"
    password = "mypassword"
  }
}
```

## Full Syntax

```hcl
resource "container_registry" "private" {
  hostname = "my-registry.company.com"
  
  auth {
    hostname = "auth.company.com"
    username = "service-account"
    password = var.registry_password
  }
}
```

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `hostname` | `string` | ✓ | Hostname of the registry |
| `auth` | `block` |  | Authentication configuration for the registry |

## Computed Fields

| Field | Type | Description |
|-------|------|-------------|
| `meta.id` | `string` | Full resource identifier |
| `meta.type` | `string` | Resource type (always `"container_registry"`) |
| `meta.name` | `string` | Resource name |

## Nested Blocks

### auth

Authentication configuration for the registry.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `username` | `string` | ✓ | Username for authentication |
| `password` | `string` | ✓ | Password for authentication |
| `hostname` | `string` |  | Hostname for authentication (can differ from registry hostname) |

## Examples

### Simple Private Registry

```hcl
resource "container_registry" "dockerhub" {
  hostname = "registry.hub.docker.com"
  
  auth {
    username = "mydockerhubuser"
    password = var.dockerhub_password
  }
}
```

### Registry with Different Auth Endpoint

```hcl
resource "container_registry" "corporate" {
  hostname = "registry.corp.example.com"
  
  auth {
    hostname = "auth.corp.example.com"
    username = "service-bot"
    password = var.corporate_registry_token
  }
}
```