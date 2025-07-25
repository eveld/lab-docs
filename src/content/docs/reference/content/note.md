---
title: Note
description: Configuration reference for the note resource in Instruqt labs
---



The note resource displays static markdown content in a tab without progress tracking. Notes are perfect for reference materials, documentation, hints, and supplementary information that participants can access during the lab.

## HCL Syntax

### Basic Syntax

```hcl
resource "note" "name" {
  file = "notes/reference.md"
}
```

### Full Syntax

```hcl
resource "note" "name" {
  file = "notes/advanced_tips.md"
  
  variables = {
    version    = "v1.2.0"
    api_url    = "https://api.example.com"
    port       = "8080"
    region     = "us-west-2"
  }
}
```

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **file** | string | ✓ | Path to markdown file containing note content |
| variables | map(string) |  | Variables for Handlebars template substitution. Defaults to `{}` |

### Deprecated Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | - | DEPRECATED: Use the `title` field on the tab in your layout instead |

## Variable Substitution

Notes support Handlebars template syntax for dynamic content:

```markdown
## API Reference for {{service_name}}

Base URL: {{api_url}}
Version: {{version}}
Default Port: {{port}}

## Connection Example

```bash
curl {{api_url}}/v{{version}}/status
```

### Available Helpers

| Helper | Description | Example |
|--------|-------------|---------|
| quote | Wraps value in quotes | `{{quote api_key}}` → `"abc123"` |
| trim | Removes whitespace | `{{trim description}}` |

## Key Differences from Pages

| Feature | Page Resource | Note Resource |
|---------|---------------|---------------|
| **Progress Tracking** | ✅ Yes | ❌ No |
| **Task Embedding** | ✅ `<instruqt-task>` | ❌ Not supported |
| **Quiz Embedding** | ✅ `<instruqt-quiz>` | ❌ Not supported |
| **Variable Substitution** | ✅ Yes | ✅ Yes |
| **Static Content** | ✅ Yes | ✅ Yes |
| **Use Case** | Main instruction content | Reference/supplementary material |

## Validation Rules

- **File existence**: Markdown file must exist at the specified path
- **File paths**: Resolved relative to the config file location
- **Template syntax**: Variables must use valid Handlebars syntax
- **No activities**: Cannot contain `<instruqt-task>` or `<instruqt-quiz>` components

## Examples

### Reference Documentation

```hcl
resource "note" "api_reference" {
  file = "notes/api-documentation.md"
  
  variables = {
    base_url = "https://api.myservice.com"
    version  = "v2"
  }
}
```

### Quick Tips

```hcl
resource "note" "shortcuts" {
  file = "notes/keyboard-shortcuts.md"
}
```

### Troubleshooting Guide

```hcl
resource "note" "troubleshooting" {
  file = "notes/common-issues.md"
  
  variables = {
    support_email = "support@example.com"
    docs_url      = "https://docs.example.com"
  }
}
```

### Command Reference

```hcl
resource "note" "command_cheatsheet" {
  file = "notes/docker-commands.md"
  
  variables = {
    registry_url = "registry.company.com"
    namespace    = "production"
  }
}
```

### Multiple Reference Notes

```hcl
resource "note" "kubernetes_basics" {
  file = "notes/k8s-concepts.md"
}

resource "note" "yaml_examples" {
  file = "notes/yaml-templates.md"
  
  variables = {
    cluster_name = "training-cluster"
    namespace    = "default"
  }
}

resource "note" "best_practices" {
  file = "notes/deployment-best-practices.md"
}
```

## Usage in Layout

Notes are referenced in layout tabs like other UI resources:

```hcl
resource "layout" "with_notes" {
  column {
    width = "30%"
    instructions {}
  }
  
  column {
    width = "50%"
    
    tab "terminal" {
      target = resource.terminal.main
      active = true
    }
  }
  
  column {
    width = "20%"
    
    tab "reference" {
      target = resource.note.api_reference
      title  = "API Docs"
    }
    
    tab "tips" {
      target = resource.note.shortcuts
      title  = "Quick Tips"
    }
  }
}
```

## Content Guidelines

### Effective Note Content

```markdown
# Docker Command Reference

## Basic Commands

| Command | Description | Example |
|---------|-------------|---------|
| `docker run` | Create and run container | `docker run -p 8080:80 nginx` |
| `docker ps` | List running containers | `docker ps -a` |
| `docker stop` | Stop container | `docker stop container_name` |

## Environment Variables

Set environment variables in containers:

```bash
docker run -e API_URL={{api_url}} -e PORT={{port}} myapp
```

## Quick Tips

💡 Use `docker logs container_name` to view container output
⚠️ Always specify image tags in production
🔧 Use `.dockerignore` to exclude unnecessary files
```

## Best Practices

1. **Focused Content**: Keep notes focused on specific topics or reference materials
2. **Scannable Format**: Use headers, lists, and tables for easy scanning
3. **Variable Usage**: Leverage variables for environment-specific information
4. **Complementary Content**: Design notes to complement, not replace, main instructions
5. **Regular Updates**: Keep reference materials current with the lab content
6. **Clear Titles**: Use descriptive tab titles in layouts for easy identification
7. **Logical Organization**: Group related reference materials together

## Common Use Cases

1. **API Documentation**: Reference guides for REST APIs, GraphQL schemas
2. **Command References**: Cheat sheets for CLI tools and commands
3. **Configuration Examples**: Sample configuration files and templates
4. **Troubleshooting Guides**: Common issues and resolution steps
5. **Keyboard Shortcuts**: IDE, terminal, and tool shortcuts
6. **Best Practices**: Guidelines and recommendations for tools/technologies
7. **Supplementary Reading**: Background information and deeper explanations