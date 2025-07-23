---
title: Build
description: Configuration reference for the build resource in Instruqt labs
---


The `build` resource allows you to build Docker containers and other resources as part of your lab infrastructure. It supports building from Dockerfiles, copying outputs from build containers, and pushing to registries.

## Basic Syntax

```hcl
resource "build" "example" {
  container {
    context = "./docker-build"
  }
}
```

## Full Syntax

```hcl
resource "build" "example" {
  container {
    context    = "./docker-build"
    dockerfile = "Dockerfile"
    ignore     = [".git", "*.log"]
    
    args = {
      VERSION = "1.0.0"
      ENV     = "production"
    }
  }
  
  output {
    source      = "/app/dist"
    destination = "./built-assets"
  }
  
  output {
    source      = "/app/config.json"
    destination = "./config/app-config.json"
  }
}
```

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `container` | `block` | ✓ | Configuration for the container build process |
| `output` | `[]block` |  | Files or directories to copy from the built container |

## Computed Fields

| Field | Type | Description |
|-------|------|-------------|
| `meta.id` | `string` | Full resource identifier |
| `meta.type` | `string` | Resource type (always `"build"`) |
| `meta.name` | `string` | Resource name |
| `image` | `string` | Full local reference of the built image |
| `build_checksum` | `string` | Checksum calculated from the context files |

## Nested Blocks

### container

The `container` block defines how to build the Docker container.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `context` | `string` | ✓ | Path to build context directory |
| `dockerfile` | `string` |  | Location of Dockerfile inside build context (defaults to `./Dockerfile`) |
| `ignore` | `[]string` |  | Files to ignore in the build context (same as `.dockerignore`) |
| `args` | `map[string]string` |  | Build args to pass to the container build |

### output

The `output` block allows copying files or directories from the built container to the host.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `source` | `string` | ✓ | Source file or directory path in the container |
| `destination` | `string` | ✓ | Destination path on the host for the copied file or directory |

## Examples

### Simple Build

```hcl
resource "build" "webapp" {
  container {
    context = "./webapp"
  }
}
```

### Build with Custom Dockerfile and Args

```hcl
resource "build" "api" {
  container {
    context    = "./api-service"
    dockerfile = "Dockerfile.prod"
    
    args = {
      NODE_ENV = "production"
      API_VERSION = "v2"
    }
    
    ignore = [
      "node_modules",
      "*.log",
      ".git"
    ]
  }
}
```

### Build with Output Extraction

```hcl
resource "build" "frontend" {
  container {
    context = "./frontend"
  }
  
  output {
    source      = "/app/build"
    destination = "./static-files"
  }
  
  output {
    source      = "/app/manifest.json"
    destination = "./config/manifest.json"
  }
}

