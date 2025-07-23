---
title: Editor
description: Configuration reference for the editor resource in Instruqt labs
---



The editor resource provides a browser-based code editor tab that allows participants to view and edit files. It supports multiple workspaces that can access files from the local filesystem or remote containers.

## HCL Syntax

### Basic Syntax

```hcl
resource "editor" "name" {
  workspace "config" {
    directory = "/app/config"
  }
}
```

### Full Syntax

```hcl
resource "editor" "name" {
  workspace "local_files" {
    directory = "assets/templates"
  }
  
  workspace "container_config" {
    target    = resource.container.app_server
    directory = "/etc/app"
  }
  
  workspace "source_code" {
    target    = resource.container.dev_env
    directory = "/workspace/src"
  }
}
```

## Fields

| Field | Type | Required | Description |
|-------|------|----------|--------------|
| **workspace** | block | ✓ | Workspace definitions (repeatable) |

## Workspace Block

[workspace](#workspace-block)

Defines a file workspace that appears as a folder tree in the editor.

| Field | Type | Required | Description |
|-------|------|----------|--------------|
| name | label | ✓ | Workspace name (shown in editor sidebar) |
| **directory** | string | ✓ | Path to the directory to expose |
| target | reference | | Container or VM to access files from. Defaults to local filesystem |

### Deprecated Fields

| Field | Type | Description |
|-------|------|-------------|
| title | string | DEPRECATED: Use the `title` field on the tab in your layout instead |

## Validation Rules

- **Directory paths**: Resolved relative to the config file location for local paths
- **Target types**: Can only reference container or VM resources
- **Workspace names**: Must be unique within the editor
- **Directory access**: Target containers must have the specified directories

## Examples

### Local File Editing

```hcl
resource "editor" "config_editor" {
  workspace "templates" {
    directory = "assets/config-templates"
  }
  
  workspace "scripts" {
    directory = "files/setup-scripts"
  }
}
```

### Remote Container Files

```hcl
resource "editor" "app_editor" {
  workspace "nginx_config" {
    target    = resource.container.web_server
    directory = "/etc/nginx/conf.d"
  }
  
  workspace "app_logs" {
    target    = resource.container.web_server
    directory = "/var/log/nginx"
  }
}
```

### Development Environment

```hcl
resource "editor" "dev_environment" {
  workspace "source" {
    target    = resource.container.dev_container
    directory = "/workspace/app"
  }
  
  workspace "tests" {
    target    = resource.container.dev_container
    directory = "/workspace/tests"
  }
  
  workspace "docs" {
    target    = resource.container.dev_container
    directory = "/workspace/docs"
  }
}
```

### Mixed Local and Remote

```hcl
resource "editor" "hybrid_editor" {
  workspace "local_assets" {
    directory = "files/static"
  }
  
  workspace "app_config" {
    target    = resource.container.application
    directory = "/app/config"
  }
  
  workspace "database_config" {
    target    = resource.container.postgres
    directory = "/etc/postgresql"
  }
}
```

## Usage in Layout

Editors must be referenced in layout tabs:

```hcl
resource "layout" "with_editor" {
  column {
    width = "40%"
    instructions {}
  }
  
  column {
    width = "60%"
    
    tab "terminal" {
      target = resource.terminal.main
      active = true
    }
    
    tab "code_editor" {
      target = resource.editor.config_editor
      title  = "Configuration Files"
    }
  }
}
```

## Editor Features

The browser-based editor provides:

### File Operations
- **View**: Read files from workspaces
- **Edit**: Modify file contents with syntax highlighting
- **Save**: Write changes back to the filesystem
- **Create**: Add new files to directories
- **Delete**: Remove files (if permissions allow)

### Code Support
- **Syntax Highlighting**: Automatic language detection
- **File Types**: Support for common programming languages and config formats
- **Line Numbers**: Easy navigation and reference
- **Search**: Find and replace within files

### Workspace Navigation
- **Folder Tree**: Expandable directory structure
- **Multiple Workspaces**: Switch between different directory contexts
- **File Filtering**: Show/hide files by type or pattern

## File Permissions

When accessing files in containers:

```bash
# Ensure the target container has proper permissions
RUN mkdir -p /app/config && chmod 755 /app/config
RUN chown -R user:user /app/config
```

For read-only access, files can be mounted as volumes:

```hcl
resource "container" "app" {
  image {
    name = "myapp:latest"
  }
  
  volume {
    source      = "./config"
    destination = "/app/config"
    type        = "bind"
    read_only   = true
  }
}
```

## Best Practices

1. **Logical Workspaces**: Group related files into meaningful workspaces
2. **Clear Names**: Use descriptive workspace names that indicate content purpose
3. **Permission Management**: Ensure containers have appropriate file permissions
4. **Directory Structure**: Organize files in logical hierarchies within workspaces
5. **File Size**: Be mindful of large files that may impact editor performance
6. **Read-Only Content**: Use read-only volumes for reference materials that shouldn't be modified
7. **Container State**: Ensure target containers are running before accessing their files

## Common Use Cases

1. **Configuration Editing**: Modify application config files
2. **Code Development**: Write and edit application source code  
3. **Script Creation**: Develop automation and deployment scripts
4. **Documentation**: Edit markdown files and documentation
5. **Template Customization**: Modify configuration templates
6. **Log Analysis**: Review log files and troubleshooting information