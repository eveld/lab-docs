---
title: Exec
description: Configuration reference for the exec resource in Instruqt labs
---



The exec resource executes scripts and commands either locally on the host machine or remotely inside containers. It supports both standalone and targeted container execution with comprehensive configuration options for environment, networking, and output handling.

## HCL Syntax

### Basic Syntax

```hcl
resource "exec" "name" {
  script = <<-EOF
    #!/bin/bash
    echo "Hello World"
  EOF
}
```

### Full Syntax

```hcl
resource "exec" "name" {
  script = <<-EOF
    #!/bin/bash
    echo "Starting deployment..."
    echo "RESULT=success" > ${EXEC_OUTPUT}
  EOF
  
  working_directory = "/tmp"
  timeout = "300s"
  daemon = false
  
  environment = {
    ENV_VAR = "value"
    PATH = "/usr/local/bin:/usr/bin:/bin"
  }
  
  # For remote execution in new container
  image {
    name = "alpine:latest"
    username = "registry_user"
    password = "registry_pass"
  }
  
  # For remote execution in existing container
  target = resource.container.web
  
  # Network configuration (remote only)
  network {
    id = resource.network.main
    ip_address = "10.0.0.100"
    aliases = ["exec-container"]
  }
  
  # Volume mounts (remote only)
  volume {
    source = "./scripts"
    destination = "/scripts"
    type = "bind"
    read_only = true
  }
  
  # User configuration (remote only)
  run_as {
    user = "1000"
    group = "1000"
  }
}
```

## Fields

### Core Configuration

Essential settings for script execution.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **script** | string | ✓ | Script content to execute |
| working_directory | string | | Working directory for script execution (default: current directory) |
| timeout | string | | Maximum execution time (default: "300s") |
| daemon | bool | | Run as background daemon (local execution only) (default: false) |
| environment | map(string) | | Environment variables for script (default: {}) |

### Execution Target

Choose between local, new container, or existing container execution.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| image | block | | Create new container for execution |
| target | reference | | Execute in existing container |

#### Image Block (New Container)

[image](#execution-target) → properties

Docker image configuration for standalone container execution.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | ✓ | Docker image name with tag |
| username | string | | Username for private registry |
| password | string | | Password for private registry |

### Remote Execution Configuration

Additional settings for container-based execution.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **network** | block | | **Network attachments (repeatable)** |
| ↳ id | reference | ✓ | Reference to network resource |
| ↳ ip_address | string | | Static IP address (default: auto-assigned) |
| ↳ aliases | list(string) | | Network aliases (default: []) |
| **volume** | block | | **Volume mounts (repeatable)** |
| ↳ source | string | ✓ | Source path or volume name |
| ↳ destination | string | ✓ | Mount path inside container |
| ↳ type | string | | Volume type: "bind", "volume", "tmpfs" (default: "bind") |
| ↳ read_only | bool | | Mount as read-only (default: false) |
| **run_as** | block | | **User configuration** |
| ↳ user | string | ✓ | Username or UID |
| ↳ group | string | ✓ | Group name or GID |

## Computed Attributes

These attributes are set by the system after script execution:

| Field | Type | Description |
|-------|------|-------------|
| exit_code | int | Exit code returned by the script |
| output | map(any) | Key-value pairs written to EXEC_OUTPUT |
| pid | int | Process ID (local execution only) |
| checksum | string | Checksum of the script content |

## Output Variables

Scripts can set output variables by writing to the `$EXEC_OUTPUT` file:

```bash
#!/bin/bash
# Set output variables
echo "STATUS=completed" >> $EXEC_OUTPUT
echo "COUNT=42" >> $EXEC_OUTPUT
echo "MESSAGE=Hello World" >> $EXEC_OUTPUT
```

Access outputs in other resources:
```hcl
output "status" {
  value = resource.exec.deploy.output.STATUS
}
```

## Validation Rules

- Script timeout must be a valid Go duration string
- For remote execution, either `image` or `target` must be specified (not both)
- Networks and volumes are only valid for remote execution
- Volume source paths are made absolute relative to config file location
- Local execution cannot use `networks`, `volumes`, or container-specific options

## Examples

### Local Script Execution

```hcl
resource "exec" "setup" {
  script = <<-EOF
    #!/bin/bash
    echo "Setting up environment..."
    
    # Install dependencies
    sudo apt-get update
    sudo apt-get install -y curl wget
    
    # Set output variables
    echo "SETUP_COMPLETE=true" >> $EXEC_OUTPUT
    echo "VERSION=1.0.0" >> $EXEC_OUTPUT
  EOF
  
  environment = {
    DEBIAN_FRONTEND = "noninteractive"
  }
  
  timeout = "600s"
}
```

### Background Daemon Process

```hcl
resource "exec" "web_server" {
  script = <<-EOF
    #!/bin/bash
    cd /var/www/html
    python3 -m http.server 8080
  EOF
  
  daemon = true
  working_directory = "/var/www/html"
  
  environment = {
    PORT = "8080"
  }
}
```

### Script in New Container

```hcl
resource "exec" "build" {
  image {
    name = "node:18-alpine"
  }
  
  script = <<-EOF
    #!/bin/sh
    cd /app
    npm install
    npm run build
    
    echo "BUILD_STATUS=success" >> $EXEC_OUTPUT
    echo "BUILD_TIME=$(date -Iseconds)" >> $EXEC_OUTPUT
  EOF
  
  volume {
    source = "./src"
    destination = "/app"
    type = "bind"
  }
  
  environment = {
    NODE_ENV = "production"
  }
}
```

### Script in Existing Container

```hcl
resource "container" "database" {
  image {
    name = "postgres:15"
  }
  
  environment = {
    POSTGRES_PASSWORD = "password"
    POSTGRES_DB = "myapp"
  }
  
  port {
    local = 5432
    host = 5432
  }
}

resource "exec" "init_database" {
  target = resource.container.database
  
  script = <<-EOF
    #!/bin/bash
    # Wait for database to be ready
    until pg_isready -U postgres; do
      echo "Waiting for database..."
      sleep 2
    done
    
    # Create tables
    psql -U postgres -d myapp -c "
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100)
      );
    "
    
    echo "DB_INITIALIZED=true" >> $EXEC_OUTPUT
  EOF
  
  timeout = "120s"
}
```

### Multi-Step Deployment

```hcl
# Download and extract application
resource "exec" "download_app" {
  script = <<-EOF
    #!/bin/bash
    mkdir -p /tmp/app
    cd /tmp/app
    
    wget https://github.com/mycompany/app/releases/download/v1.2.0/app-v1.2.0.tar.gz
    tar -xzf app-v1.2.0.tar.gz
    
    echo "DOWNLOAD_PATH=/tmp/app/app-v1.2.0" >> $EXEC_OUTPUT
  EOF
  
  timeout = "300s"
}

# Configure application
resource "exec" "configure_app" {
  depends_on = [resource.exec.download_app]
  
  script = <<-EOF
    #!/bin/bash
    APP_PATH="${resource.exec.download_app.output.DOWNLOAD_PATH}"
    
    # Copy configuration
    cp ./config/app.yml "$APP_PATH/config/"
    
    # Set permissions
    chmod +x "$APP_PATH/bin/app"
    
    echo "CONFIG_COMPLETE=true" >> $EXEC_OUTPUT
    echo "APP_READY=true" >> $EXEC_OUTPUT
  EOF
  
  environment = {
    CONFIG_ENV = "production"
  }
}

# Start application
resource "exec" "start_app" {
  depends_on = [resource.exec.configure_app]
  
  script = <<-EOF
    #!/bin/bash
    APP_PATH="${resource.exec.download_app.output.DOWNLOAD_PATH}"
    cd "$APP_PATH"
    
    nohup ./bin/app > app.log 2>&1 &
    APP_PID=$!
    
    echo "APP_PID=$APP_PID" >> $EXEC_OUTPUT
    echo "APP_STARTED=true" >> $EXEC_OUTPUT
  EOF
  
  daemon = true
}
```

### Container Network Setup

```hcl
resource "network" "app" {
  subnet = "10.0.1.0/24"
}

resource "exec" "network_setup" {
  image {
    name = "alpine:latest"
  }
  
  network {
    id = resource.network.app
    ip_address = "10.0.1.10"
    aliases = ["setup-container"]
  }
  
  script = <<-EOF
    #!/bin/sh
    # Install network tools
    apk add --no-cache curl netcat-openbsd
    
    # Test network connectivity
    ping -c 3 google.com
    
    # Set network status
    echo "NETWORK_READY=true" >> $EXEC_OUTPUT
    echo "IP_ADDRESS=$(hostname -i)" >> $EXEC_OUTPUT
  EOF
}
```

### Development Environment Setup

```hcl
resource "exec" "dev_setup" {
  script = <<-EOF
    #!/bin/bash
    set -e
    
    echo "Setting up development environment..."
    
    # Install Node.js if not present
    if ! command -v node &> /dev/null; then
      curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
      sudo apt-get install -y nodejs
    fi
    
    # Install Docker if not present
    if ! command -v docker &> /dev/null; then
      curl -fsSL https://get.docker.com -o get-docker.sh
      sh get-docker.sh
      sudo usermod -aG docker $USER
    fi
    
    # Clone repository
    if [ ! -d "/workspace/myapp" ]; then
      git clone https://github.com/mycompany/myapp.git /workspace/myapp
    fi
    
    # Set output variables
    echo "NODE_VERSION=$(node --version)" >> $EXEC_OUTPUT
    echo "DOCKER_VERSION=$(docker --version)" >> $EXEC_OUTPUT
    echo "SETUP_COMPLETE=true" >> $EXEC_OUTPUT
  EOF
  
  working_directory = "/workspace"
  timeout = "900s"
  
  environment = {
    DEBIAN_FRONTEND = "noninteractive"
  }
}
```

## Script Templates

### Using External Script Files

```hcl
# Load script from file
resource "exec" "external_script" {
  script = file("./scripts/setup.sh")
  
  environment = {
    ENV = "production"
  }
}

# Use template file with variables
resource "template" "install_script" {
  source = "./templates/install.sh.tpl"
  destination = "./scripts/install.sh"
  
  variables = {
    version = "1.2.0"
    environment = "production"
  }
}

resource "exec" "install" {
  depends_on = [resource.template.install_script]
  
  script = file(resource.template.install_script.destination)
}
```

## Best Practices

1. **Error Handling**: Use `set -e` to exit on errors and proper error checking
2. **Timeouts**: Set appropriate timeouts for long-running operations
3. **Output Variables**: Use EXEC_OUTPUT for passing data to other resources
4. **Idempotency**: Write scripts that can be run multiple times safely
5. **Security**: Avoid hardcoding secrets; use environment variables
6. **Logging**: Include meaningful output for debugging and monitoring
7. **Dependencies**: Use `depends_on` to ensure proper execution order
8. **Resource Cleanup**: Clean up temporary resources and processes

## Common Use Cases

1. **Environment Setup**: Installing dependencies and configuring systems
2. **Database Migration**: Running database schema updates and data migrations
3. **Application Deployment**: Building, configuring, and starting applications
4. **System Configuration**: Configuring services and system settings
5. **Data Processing**: Running ETL jobs and data transformation scripts
6. **Health Checks**: Verifying system status and connectivity
7. **Backup Operations**: Creating backups and restoring data