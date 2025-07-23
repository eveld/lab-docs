---
title: Network
description: Configuration reference for the network resource in Instruqt labs
---



The network resource creates isolated Docker networks for containers to communicate. Networks provide network isolation and allow containers to discover each other using container names or aliases.

## HCL Syntax

### Basic Syntax

```hcl
resource "network" "name" {
  subnet = "10.0.0.0/24"
}
```

### Full Syntax

```hcl
resource "network" "name" {
  subnet      = "10.100.0.0/16"
  enable_ipv6 = true
}
```

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| subnet | string | ✓ | CIDR subnet for the network (must not overlap other networks) |
| enable_ipv6 | bool | | Enable IPv6 support on the network. Defaults to false. |

## Validation Rules

- **Subnet format**: Must be a valid CIDR notation (e.g., "10.0.0.0/24")
- **No overlap**: Subnets must not overlap with other networks in the same lab
- **Valid ranges**: Use private IP ranges (10.x.x.x/8, 172.16-31.x.x/12, 192.168.x.x/16)

## Examples

### Basic Network

```hcl
resource "network" "backend" {
  subnet = "10.0.1.0/24"
}
```

### Network with IPv6

```hcl
resource "network" "frontend" {
  subnet      = "10.0.2.0/24"
  enable_ipv6 = true
}
```

### Multiple Networks

```hcl
resource "network" "web_tier" {
  subnet = "10.0.10.0/24"
}

resource "network" "db_tier" {
  subnet = "10.0.20.0/24"
}

resource "network" "management" {
  subnet = "10.0.30.0/24"
}
```

### Container Network Usage

```hcl
resource "network" "app_network" {
  subnet = "10.0.100.0/24"
}

resource "container" "web" {
  image {
    name = "nginx:latest"
  }
  
  network {
    id         = resource.network.app_network
    ip_address = "10.0.100.10"
    aliases    = ["web", "frontend"]
  }
}

resource "container" "db" {
  image {
    name = "postgres:13"
  }
  
  network {
    id         = resource.network.app_network
    ip_address = "10.0.100.20"
    aliases    = ["db", "database"]
  }
}
```

## Network Communication

Containers attached to the same network can communicate using:

1. **Container names**: `ping container_name`
2. **Network aliases**: `ping alias_name`  
3. **IP addresses**: `ping 10.0.100.10`

```bash
## From web container to db container
curl http://db:5432
curl http://database:5432
curl http://10.0.100.20:5432
```

## Best Practices

1. **Logical Separation**: Use separate networks for different application tiers (web, app, database)
2. **Private Subnets**: Always use private IP ranges to avoid conflicts
3. **Subnet Sizing**: Choose appropriate subnet sizes - /24 (254 hosts) is usually sufficient
4. **Meaningful Names**: Use descriptive network names that indicate their purpose
5. **Network Aliases**: Use aliases for service discovery instead of hardcoding IP addresses
6. **Security**: Networks provide isolation - containers on different networks cannot communicate by default

## Common Subnet Ranges

| Range | CIDR | Hosts | Use Case |
|-------|------|-------|----------|
| Small | /28 | 14 | Small labs with few containers |
| Medium | /24 | 254 | Most common choice for lab environments |
| Large | /20 | 4094 | Complex labs with many containers |
| Very Large | /16 | 65534 | Multi-network labs with many subnets |