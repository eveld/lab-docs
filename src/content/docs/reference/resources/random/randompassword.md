---
title: Random Password
description: Configuration reference for the random resource in Instruqt labs
---



The random_password resource generates cryptographically secure random passwords with configurable character sets and constraints. It supports customizable requirements for uppercase, lowercase, numeric, and special characters.

## HCL Syntax

### Basic Syntax

```hcl
resource "random_password" "name" {
  length = 16
}
```

### Full Syntax

```hcl
resource "random_password" "name" {
  length = 32
  
  # Character set options
  special = true
  numeric = true
  lower = true
  upper = true
  
  # Minimum requirements
  min_special = 2
  min_numeric = 2
  min_lower = 2
  min_upper = 2
  
  # Custom special characters
  override_special = "!@#$%^&*"
}
```

## Fields

| Field | Type | Required | Description |
|-------|------|----------|--------------|
| **length** | int | ✓ | Length of the password to generate |
| special | bool | | Include special characters. Defaults to `true` |
| numeric | bool | | Include numeric characters (0-9). Defaults to `true` |
| lower | bool | | Include lowercase letters (a-z). Defaults to `true` |
| upper | bool | | Include uppercase letters (A-Z). Defaults to `true` |
| min_special | int | | Minimum number of special characters. Defaults to `0` |
| min_numeric | int | | Minimum number of numeric characters. Defaults to `0` |
| min_lower | int | | Minimum number of lowercase characters. Defaults to `0` |
| min_upper | int | | Minimum number of uppercase characters. Defaults to `0` |
| override_special | string | | Custom special characters to use. Defaults to the standard special character set |

## Computed Attributes

These attributes are set by the system after password generation:

| Field | Type | Description |
|-------|------|-------------|
| value | string | The generated password |

## Validation Rules

- Length must be greater than 0
- Sum of all minimum requirements cannot exceed the total length
- At least one character type must be enabled
- Generated passwords remain constant across multiple runs (idempotent)
- Passwords are cryptographically secure

## Examples

### Simple Password

```hcl
resource "random_password" "admin" {
  length = 12
}

output "admin_password" {
  value = resource.random_password.admin.value
  sensitive = true
}
```

### Database Password with Requirements

```hcl
resource "random_password" "db_password" {
  length = 24
  
  min_upper = 2
  min_lower = 2
  min_numeric = 2
  min_special = 2
}

resource "container" "database" {
  image {
    name = "postgres:15"
  }
  
  environment = {
    POSTGRES_PASSWORD = resource.random_password.db_password.value
  }
}
```

### API Key Generation

```hcl
resource "random_password" "api_key" {
  length = 32
  special = false  # Only alphanumeric
}

resource "template" "config" {
  source = <<-EOF
    api:
      key: "${resource.random_password.api_key.value}"
      timeout: 30
  EOF
  
  destination = "./config/api.yaml"
}
```

### Custom Special Characters

```hcl
resource "random_password" "secure_token" {
  length = 20
  override_special = "!@#$%"  # Only these special chars
  
  min_special = 3
  min_numeric = 3
  min_upper = 3
  min_lower = 3
}
```

### Multiple Service Passwords

```hcl
# Database password
resource "random_password" "postgres_password" {
  length = 16
  min_upper = 1
  min_numeric = 2
  min_special = 1
}

# Redis password
resource "random_password" "redis_password" {
  length = 20
  special = false  # Redis doesn't handle some special chars well
}

# Application secret
resource "random_password" "app_secret" {
  length = 32
  min_special = 4
  override_special = "@#$%^&*"
}

resource "template" "env_file" {
  source = <<-EOF
    # Database
    POSTGRES_PASSWORD=${resource.random_password.postgres_password.value}
    
    # Redis
    REDIS_PASSWORD=${resource.random_password.redis_password.value}
    
    # Application
    APP_SECRET=${resource.random_password.app_secret.value}
  EOF
  
  destination = "./.env"
}
```

### Numeric-Only PIN

```hcl
resource "random_password" "pin" {
  length = 6
  
  # Only numbers
  special = false
  upper = false
  lower = false
  numeric = true
}
```

### Username and Password Combination

```hcl
resource "random_id" "username_suffix" {
  byte_length = 4
}

resource "random_password" "user_password" {
  length = 14
  
  min_upper = 2
  min_lower = 2
  min_numeric = 2
  min_special = 1
}

resource "template" "user_credentials" {
  source = <<-EOF
    username: user_${resource.random_id.username_suffix.hex}
    password: ${resource.random_password.user_password.value}
  EOF
  
  destination = "./credentials.yaml"
}
```

## Security Considerations

### Sensitive Values

Always mark password outputs as sensitive:

```hcl
output "database_password" {
  value = resource.random_password.db.value
  sensitive = true
}
```

### Storage Security

```hcl
# Good: Use in environment variables or config files
resource "container" "app" {
  environment = {
    DB_PASSWORD = resource.random_password.db.value
  }
}

# Avoid: Don't log or output passwords directly
resource "exec" "bad_example" {
  script = "echo 'Password: ${resource.random_password.db.value}'"  # DON'T DO THIS
}
```

## Best Practices

1. **Length**: Use at least 12 characters for production passwords
2. **Complexity**: Include multiple character types for stronger passwords
3. **Minimums**: Set minimum requirements for critical applications
4. **Special Characters**: Consider target system limitations when choosing special chars
5. **Sensitive Data**: Always mark password outputs as sensitive
6. **Rotation**: Generate new passwords by changing resource names or recreating resources
7. **Documentation**: Document password requirements and usage

## Common Use Cases

1. **Database Passwords**: Secure database authentication
2. **API Keys**: Application programming interface authentication
3. **Service Tokens**: Inter-service communication tokens
4. **User Accounts**: Initial user password generation
5. **Encryption Keys**: Application-level encryption secrets
6. **Session Secrets**: Web application session management
7. **Certificate Passphrases**: Private key protection