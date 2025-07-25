---
title: Random ID
description: Configuration reference for the random resource in Instruqt labs
---



The random_id resource generates cryptographically secure random identifiers. It provides the generated ID in multiple formats (base64, hexadecimal, and decimal) for use in other resources and configurations.

## HCL Syntax

### Basic Syntax

```hcl
resource "random_id" "name" {
  byte_length = 8
}
```

### Full Syntax

```hcl
resource "random_id" "name" {
  byte_length = 16
}
```

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **byte_length** | int | ✓ | Number of random bytes to generate (minimum: 1) |

## Computed Attributes

These attributes are set by the system after ID generation:

| Field | Type | Description |
|-------|------|-------------|
| base64 | string | Generated ID in base64 encoding |
| hex | string | Generated ID in padded hexadecimal (twice the byte length) |
| dec | string | Generated ID in decimal format |

## Validation Rules

- Byte length must be at least 1
- Generated values remain constant across multiple runs (idempotent)
- Random values are cryptographically secure

## Examples

### Simple Random ID

```hcl
resource "random_id" "session" {
  byte_length = 8
}

output "session_id" {
  value = resource.random_id.session.hex
}
```

### Database Identifier

```hcl
resource "random_id" "db_suffix" {
  byte_length = 4
}

resource "container" "database" {
  image {
    name = "postgres:15"
  }
  
  environment = {
    POSTGRES_DB = "app_${resource.random_id.db_suffix.hex}"
  }
}
```

### Multiple Format Usage

```hcl
resource "random_id" "app_key" {
  byte_length = 32
}

# Use in different formats
output "key_base64" {
  value = resource.random_id.app_key.base64
  description = "Application key in base64 format"
}

output "key_hex" {
  value = resource.random_id.app_key.hex
  description = "Application key in hex format"
}

output "key_decimal" {
  value = resource.random_id.app_key.dec
  description = "Application key in decimal format"
}
```

### Container Name Generation

```hcl
resource "random_id" "container_suffix" {
  byte_length = 6
}

resource "container" "web" {
  image {
    name = "nginx:alpine"
  }
  
  # Use random ID to ensure unique container names
  meta {
    name = "web-${resource.random_id.container_suffix.hex}"
  }
}
```

### Secret Generation

```hcl
resource "random_id" "api_secret" {
  byte_length = 24
}

resource "template" "app_config" {
  source = <<-EOF
    api:
      secret_key: ${resource.random_id.api_secret.base64}
      session_timeout: 3600
  EOF
  
  destination = "./config/app.yaml"
}
```

### Network Naming

```hcl
resource "random_id" "network_id" {
  byte_length = 4
}

resource "network" "app_network" {
  subnet = "10.${resource.random_id.network_id.dec % 254 + 1}.0.0/24"
}
```

## Best Practices

1. **Appropriate Length**: Use sufficient byte length for your use case (8-16 bytes for most identifiers)
2. **Format Selection**: Choose the appropriate format for your target system
3. **Uniqueness**: Random IDs are unique per resource instance, not globally unique
4. **Security**: Use for non-sensitive identifiers; for passwords use random_password
5. **Naming**: Use descriptive resource names to clarify the ID's purpose
6. **Consistency**: Use the same format consistently within a configuration

## Common Use Cases

1. **Unique Naming**: Generating unique suffixes for resource names
2. **Session IDs**: Creating session identifiers for applications
3. **Database Names**: Generating unique database or schema names
4. **Cache Keys**: Creating cache key prefixes or suffixes
5. **API Keys**: Generating non-sensitive API identifiers
6. **Container Names**: Ensuring unique container names in multi-instance deployments
7. **Network Isolation**: Creating unique network identifiers