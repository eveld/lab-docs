---
title: Copy
description: Configuration reference for the copy resource in Instruqt labs
---



The copy resource transfers files and directories from various sources to destinations. It supports local files, remote URLs, Git repositories, and automatically extracts archives like ZIP files.

## HCL Syntax

### Basic Syntax

```hcl
resource "copy" "name" {
  source = "./files/config.yaml"
  destination = "./config/"
}
```

### Full Syntax

```hcl
resource "copy" "name" {
  source = "https://releases.hashicorp.com/consul/1.16.0/consul_1.16.0_linux_amd64.zip"
  destination = "./binaries/"
  permissions = "0755"
}
```

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **source** | string | ✓ | Source path (local file/directory, URL, or Git repository) |
| **destination** | string | ✓ | Destination path where files will be copied |
| permissions | string | | Unix permissions for copied files and directories (default: "0777") |

## Computed Attributes

These attributes are set by the system after files are copied:

| Field | Type | Description |
|-------|------|-------------|
| copied_files | list(string) | Full paths of all copied files |

## Source Types

The copy resource supports multiple source types:

### Local Files and Directories
```hcl
## Single file
source = "./files/config.yaml"

# Directory (copies all contents)
source = "./assets/"

# Absolute path
source = "/usr/share/data"
```

### Remote URLs
```hcl
# Direct file download
source = "https://example.com/file.txt"

# Archive download (auto-extracted)
source = "https://github.com/org/repo/archive/main.zip"
```

### Git Repositories
```hcl
# Full repository
source = "github.com/username/repository"

# Specific subdirectory
source = "github.com/username/repository//subdir"

# Specific branch/tag
source = "github.com/username/repository?ref=v1.0.0"
```

## Validation Rules

- Local source paths are made absolute relative to the config file location
- Destination paths are made absolute relative to the config file location
- Permissions must be valid Unix octal format (e.g., "0755", "0644")
- Remote URLs must be accessible
- Git repositories must be cloneable

## Examples

### Copy Local Configuration Files

```hcl
resource "copy" "app_config" {
  source = "./config/application.yaml"
  destination = "./app/config/"
  permissions = "0644"
}
```

### Copy Directory with Specific Permissions

```hcl
resource "copy" "scripts" {
  source = "./scripts/"
  destination = "./app/bin/"
  permissions = "0755"
}
```

### Download and Extract Archive

```hcl
resource "copy" "consul_binary" {
  source = "https://releases.hashicorp.com/consul/1.16.0/consul_1.16.0_linux_amd64.zip"
  destination = "./binaries/"
  permissions = "0755"
}
```

### Clone Git Repository

```hcl
resource "copy" "examples" {
  source = "github.com/instruqt/examples"
  destination = "./examples/"
}
```

### Copy Specific Git Subdirectory

```hcl
resource "copy" "terraform_modules" {
  source = "github.com/terraform-aws-modules/terraform-aws-vpc//modules/vpc?ref=v3.14.0"
  destination = "./modules/vpc/"
}
```

### Download Remote File

```hcl
resource "copy" "sample_data" {
  source = "https://api.example.com/data/sample.json"
  destination = "./data/sample.json"
  permissions = "0644"
}
```

### Multiple File Operations

```hcl
# Configuration files
resource "copy" "config" {
  source = "./config/"
  destination = "./app/config/"
  permissions = "0644"
}

# Scripts with execution permissions
resource "copy" "scripts" {
  source = "./scripts/"
  destination = "./app/scripts/"
  permissions = "0755"
}

# Static assets
resource "copy" "assets" {
  source = "https://cdn.example.com/assets.zip"
  destination = "./app/static/"
  permissions = "0644"
}

# External dependencies
resource "copy" "dependencies" {
  source = "github.com/vendor/lib//dist"
  destination = "./app/lib/"
  permissions = "0755"
}
```

### Using with Container Volumes

```hcl
resource "copy" "app_files" {
  source = "./application/"
  destination = "./container-data/app/"
  permissions = "0644"
}

resource "container" "web" {
  image {
    name = "nginx:alpine"
  }
  
  volume {
    source = resource.copy.app_files.destination
    destination = "/usr/share/nginx/html"
    type = "bind"
    read_only = true
  }
}
```

### Conditional Copying with Dependencies

```hcl
resource "copy" "base_config" {
  source = "./config/base/"
  destination = "./app/config/"
}

resource "copy" "env_config" {
  depends_on = [resource.copy.base_config]
  
  source = "./config/production/"
  destination = "./app/config/"
  permissions = "0600"  # Sensitive production config
}
```

## Advanced Examples

### Download and Setup Development Tools

```hcl
# Download Docker Compose
resource "copy" "docker_compose" {
  source = "https://github.com/docker/compose/releases/download/v2.17.0/docker-compose-linux-x86_64"
  destination = "./tools/docker-compose"
  permissions = "0755"
}

# Download Terraform
resource "copy" "terraform" {
  source = "https://releases.hashicorp.com/terraform/1.5.0/terraform_1.5.0_linux_amd64.zip"
  destination = "./tools/"
  permissions = "0755"
}

# Clone configuration templates
resource "copy" "templates" {
  source = "github.com/company/infrastructure-templates//docker"
  destination = "./templates/"
  permissions = "0644"
}
```

### Setup Application Environment

```hcl
# Copy application source code
resource "copy" "source_code" {
  source = "github.com/mycompany/webapp//src"
  destination = "./app/src/"
  permissions = "0644"
}

# Copy configuration files
resource "copy" "config_files" {
  depends_on = [resource.copy.source_code]
  
  source = "./config/app.yaml"
  destination = "./app/config/app.yaml"
  permissions = "0600"
}

# Download dependencies
resource "copy" "node_modules" {
  source = "https://registry.npmjs.org/@mycompany/shared/-/shared-1.0.0.tgz"
  destination = "./app/node_modules/"
  permissions = "0644"
}
```

## File Permission Examples

Different permission settings for various file types:

```hcl
# Read-only configuration files
resource "copy" "readonly_config" {
  source = "./config.yaml"
  destination = "./app/config.yaml"
  permissions = "0444"  # Read-only for all users
}

# Executable scripts
resource "copy" "startup_script" {
  source = "./startup.sh"
  destination = "./app/startup.sh"
  permissions = "0755"  # Read/execute for all, write for owner
}

# Sensitive files (owner only)
resource "copy" "secrets" {
  source = "./secrets.env"
  destination = "./app/secrets.env"
  permissions = "0600"  # Read/write for owner only
}

# Public files
resource "copy" "public_assets" {
  source = "./public/"
  destination = "./app/public/"
  permissions = "0644"  # Read for all, write for owner
}
```

## Best Practices

1. **Permission Security**: Use restrictive permissions for sensitive files (0600, 0644)
2. **Executable Permissions**: Set 0755 for scripts and binaries
3. **Source Control**: Use specific Git references (tags/commits) for reproducible builds
4. **Archive Handling**: Copy resource automatically extracts common archive formats
5. **Path Consistency**: Use consistent path conventions across your configuration
6. **Dependencies**: Use depends_on for operations that must happen in sequence
7. **Validation**: Test source URLs and paths before deploying

## Common Use Cases

1. **Configuration Management**: Copying config files to application directories
2. **Asset Deployment**: Moving static assets for web applications
3. **Binary Distribution**: Downloading and deploying executable files
4. **Template Management**: Copying configuration templates
5. **Data Seeding**: Loading sample or initial data files
6. **Backup Restoration**: Restoring files from backup locations
7. **Development Setup**: Copying development tools and dependencies