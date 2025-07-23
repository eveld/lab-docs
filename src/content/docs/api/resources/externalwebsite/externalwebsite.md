---
title: External Website
description: Configuration reference for the externalwebsite resource in Instruqt labs
---



The external website resource embeds external web content in the lab interface. It allows participants to access third-party websites, documentation, tools, or web applications directly within the lab environment.

## HCL Syntax

### Basic Syntax

```hcl
resource "external_website" "name" {
  url = "https://docs.kubernetes.io"
}
```

### Full Syntax

```hcl
resource "external_website" "name" {
  url                 = "https://console.aws.amazon.com"
  open_in_new_window = true
}
```

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **url** | string | ✓ | URL of the external website (must use HTTPS) |
| open_in_new_window | bool |  | Whether to open the website in a new browser window. Defaults to `false` |

### Deprecated Fields

| Field | Type | Description |
|-------|------|-------------|
| title | string | DEPRECATED: Use the `title` field on the tab in your layout instead |

## Validation Rules

- **HTTPS required**: URLs must start with `https://` for security reasons
- **Valid URLs**: Must be properly formatted URLs that are accessible
- **CORS compatibility**: Some websites may block iframe embedding

## Examples

### Documentation Reference

```hcl
resource "external_website" "kubernetes_docs" {
  url = "https://kubernetes.io/docs/"
}
```

### Web Console Access

```hcl
resource "external_website" "aws_console" {
  url                 = "https://console.aws.amazon.com"
  open_in_new_window = true
}
```

### Online Tools

```hcl
resource "external_website" "json_formatter" {
  url = "https://jsonformatter.org"
}

resource "external_website" "regex_tester" {
  url = "https://regex101.com"
}
```

### API Documentation

```hcl
resource "external_website" "swagger_docs" {
  url = "https://petstore.swagger.io"
}

resource "external_website" "graphql_playground" {
  url = "https://graphql-playground.com"
}
```

### Learning Resources

```hcl
resource "external_website" "docker_tutorial" {
  url = "https://www.docker.com/101-tutorial"
}

resource "external_website" "git_reference" {
  url                 = "https://git-scm.com/docs"
  open_in_new_window = false
}
```

## Usage in Layout

External websites are referenced in layout tabs:

```hcl
resource "layout" "with_external_sites" {
  column {
    width = "40%"
    instructions {}
  }
  
  column {
    width = "30%"
    
    tab "terminal" {
      target = resource.terminal.main
      active = true
    }
  }
  
  column {
    width = "30%"
    
    tab "docs" {
      target = resource.external_website.kubernetes_docs
      title  = "K8s Docs"
    }
    
    tab "console" {
      target = resource.external_website.aws_console
      title  = "AWS Console"
    }
  }
}
```

## Display Behavior

### Embedded (Default)
When `open_in_new_window = false`:
- Website loads in an iframe within the lab tab
- Participants stay within the lab environment
- Navigation is contained within the tab
- Some sites may block iframe embedding (X-Frame-Options)

### New Window
When `open_in_new_window = true`:
- Website opens in a new browser window/tab
- Full browser functionality available
- Participants can switch between lab and website
- Bypasses iframe restrictions

## Security Considerations

### HTTPS Requirement
```hcl
## ✅ Valid - HTTPS URL
resource "external_website" "valid_site" {
  url = "https://docs.example.com"
}

# ❌ Invalid - HTTP not allowed
resource "external_website" "invalid_site" {
  url = "http://docs.example.com"  # Will cause validation error
}
```

### Content Security
- External content is not controlled by Instruqt
- Participants may navigate away from intended content
- Consider using `open_in_new_window = true` for sensitive sites

## Common Use Cases

### 1. Documentation Access
```hcl
resource "external_website" "official_docs" {
  url = "https://docs.docker.com"
}
```

### 2. Web-Based Tools
```hcl
resource "external_website" "yaml_validator" {
  url = "https://codebeautify.org/yaml-validator"
}
```

### 3. Cloud Consoles
```hcl
resource "external_website" "gcp_console" {
  url                 = "https://console.cloud.google.com"
  open_in_new_window = true
}
```

### 4. Interactive Tutorials
```hcl
resource "external_website" "interactive_tutorial" {
  url = "https://www.katacoda.com/courses/docker"
}
```

### 5. API Testing Tools
```hcl
resource "external_website" "postman_web" {
  url                 = "https://web.postman.co"
  open_in_new_window = true
}
```

## Troubleshooting

### Iframe Blocking
Some websites prevent iframe embedding with X-Frame-Options headers:

```hcl
# If site blocks iframe embedding, open in new window
resource "external_website" "blocked_site" {
  url                 = "https://github.com"
  open_in_new_window = true  # Workaround for iframe blocking
}
```

### Mixed Content Issues
Ensure all embedded sites use HTTPS to avoid mixed content warnings.

### Loading Performance
External sites may load slowly or intermittently. Consider:
- Using reliable, fast-loading sites
- Providing alternative resources
- Testing site availability before lab deployment

## Best Practices

1. **HTTPS Only**: Always use HTTPS URLs for security and compatibility
2. **Test Embedding**: Verify sites work in iframes before deployment
3. **Reliable Sources**: Use stable, well-maintained external sites
4. **Contextual Relevance**: Ensure external content directly supports lab objectives
5. **Performance Impact**: Consider loading times and site reliability
6. **User Experience**: Use descriptive tab titles to clarify content purpose
7. **Fallback Options**: Provide alternative resources if external sites are unavailable
8. **New Window Strategy**: Use new windows for sites that require full browser functionality