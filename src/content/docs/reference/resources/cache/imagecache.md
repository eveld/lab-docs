---
title: Image Cache
description: Configuration reference for the cache resource in Instruqt labs
---


The `image_cache` resource creates a container registry cache for Docker images. It allows you to configure custom registries and network connections for caching Docker images locally.

## Basic Syntax

```hcl
resource "image_cache" "main" {
  network {
    id = resource.network.main.meta.id
  }
}
```

## Full Syntax

```hcl
resource "image_cache" "main" {
  registry {
    hostname = "private.registry.com"
    
    auth {
      username = "myuser"
      password = "mypassword"
    }
  }
  
  network {
    id         = resource.network.main.meta.id
    ip_address = "10.0.1.100"
    aliases    = ["cache.local"]
  }
}
```

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `registry` | `[]block` |  | Custom registries to configure for the cache |
| `network` | `[]block` |  | Networks to attach the cache container to |

## Computed Fields

| Field | Type | Description |
|-------|------|-------------|
| `meta.id` | `string` | Full resource identifier |
| `meta.type` | `string` | Resource type (always `"image_cache"`) |
| `meta.name` | `string` | Resource name |

## Nested Blocks

### registry

Configure additional registries for the image cache.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `hostname` | `string` | ✓ | Hostname of the registry |
| `auth` | `block` |  | Authentication configuration for the registry |

#### auth

Authentication configuration for a registry.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `hostname` | `string` |  | Hostname for authentication (can differ from registry hostname) |
| `username` | `string` | ✓ | Username for authentication |
| `password` | `string` | ✓ | Password for authentication |

### network

Network attachment configuration for the cache container.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | ✓ | Network resource ID to attach to |
| `ip_address` | `string` |  | Static IP address to assign |
| `aliases` | `[]string` |  | Network aliases for the container |

## Examples

### Simple Cache with Network

```hcl
resource "image_cache" "main" {
  network {
    id = resource.network.lab.meta.id
  }
}
```

### Cache with Private Registry

```hcl
resource "image_cache" "private" {
  registry {
    hostname = "my-registry.company.com"
    
    auth {
      username = "service-account"
      password = var.registry_password
    }
  }
  
  network {
    id         = resource.network.main.meta.id
    ip_address = "192.168.1.50"
    aliases    = ["registry-cache.local"]
  }
}



