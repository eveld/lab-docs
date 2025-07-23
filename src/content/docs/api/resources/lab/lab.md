---
title: Lab
description: Configuration reference for the lab resource in Instruqt labs
---



The lab resource defines the main configuration for your lab, including metadata, settings, layout, and content structure. This is equivalent to what was previously called a "track" in legacy formats.

## HCL Syntax

### Basic Syntax

```hcl
resource "lab" "name" {
  title       = "My Lab"
  description = "A brief description of what this lab teaches"
  layout      = resource.layout.two_column
  
  content {
    chapter "introduction" {
      title = "Getting Started"
      
      page "welcome" {
        reference = resource.page.welcome
      }
    }
  }
}
```

### Full Syntax

```hcl
resource "lab" "name" {
  title       = "My Lab"
  description = "A comprehensive description of the lab"
  tags        = ["docker", "kubernetes", "devops"]
  
  settings {
    theme = "modern_dark"
    
    timelimit {
      duration   = "30m"
      extend     = "5m"
      show_timer = true
    }
    
    idle {
      enabled      = true
      timeout      = "10m"
      show_warning = true
    }
    
    controls {
      show_stop = true
    }
  }
  
  layout = resource.layout.default
  
  content {
    title = "Lab Instructions"
    
    chapter "chapter1" {
      title  = "Introduction"
      layout = resource.layout.single_column
      
      page "page1" {
        title     = "Welcome"
        layout    = resource.layout.two_column
        reference = resource.page.welcome
      }
    }
  }
}
```

## Resource Structure

```
lab
├─ title, description, tags (metadata)
├─ layout (reference to default layout)
├─ settings
│  ├─ theme
│  ├─ timelimit
│  │  ├─ duration, extend, show_timer
│  ├─ idle  
│  │  ├─ enabled, timeout, show_warning
│  └─ controls
│     └─ show_stop
└─ content
   ├─ title
   └─ chapters[]
      ├─ title, layout (optional override)
      └─ pages[]
         ├─ title (optional override), layout (optional override)
         └─ reference (to page resource)
```

## Fields

### Core Configuration

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | ✓ | The title of the lab |
| description | string | ✓ | A description of the lab |
| layout | reference | ✓ | Default layout for the lab |
| tags | list(string) | | Tags that describe the lab. Defaults to empty list. |

### Settings Configuration

Configuration for lab behavior, appearance, and constraints.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| settings | block | | Lab configuration settings with default settings applied |
| theme | string | | UI theme: "modern_dark" or "original". Defaults to "modern_dark". |
| timelimit | block | | Time limit configuration with default timelimit applied |
| idle | block | | Idle timeout configuration with default idle applied |
| controls | block | | UI control configuration with default controls applied |

#### Timelimit Block

[settings](#settings-configuration) → timelimit

Configures time limits and extensions for the lab session. Controls how long participants have to complete the lab and whether they can request additional time.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| duration | string | | Maximum lab duration (Go duration format). Defaults to "15m". |
| extend | string | | Extension time allowed (Go duration format). Defaults to "0". |
| show_timer | bool | | Whether to show the timer to users. Defaults to true. |

#### Idle Block

[settings](#settings-configuration) → idle

Configures automatic lab termination when participants are inactive. Helps manage resource usage by stopping labs that aren't being actively used.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| enabled | bool | | Enable idle timeout. Defaults to true. |
| timeout | string | | Idle timeout duration (Go duration format). Defaults to "5m". |
| show_warning | bool | | Show idle timeout warning to users. Defaults to true. |

#### Controls Block

[settings](#settings-configuration) → controls

Configures which UI controls are available to participants during the lab session. Controls user interaction options and available actions.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| show_stop | bool | | Show the stop lab button to users. Defaults to true. |

### Content Structure

Defines the instructional content organization.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| content | block | | Instructional content structure |
| title | string | | Title for the content tab |
| chapters | block | | Chapter definitions (repeatable) |

#### Chapter Block

[content](#content-structure) → chapters

Defines a logical grouping of related pages within the lab. Chapters provide structure and organization for the instructional content, allowing participants to understand the learning progression.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| slug | label | ✓ | Chapter identifier |
| title | string | ✓ | Chapter display title |
| layout | reference | | Layout override for this chapter. Defaults to lab default. |
| pages | block | | Pages within the chapter (repeatable) |

#### Page Block

[content](#content-structure) → [chapters](#chapter-block) → pages

Defines individual instructional pages within a chapter. Pages contain the actual content (markdown files) that participants read and interact with during the lab.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| slug | label | ✓ | Page identifier |
| title | string | | Page title override. Defaults to value from page resource. |
| layout | reference | | Layout override for this page. Defaults to chapter default. |
| reference | reference | ✓ | Reference to the page resource |

## Default Values

The following defaults are applied automatically:

### Settings Defaults

```hcl
settings {
  theme = "modern_dark"
  
  timelimit {
    duration   = "15m"
    extend     = "0"
    show_timer = true
  }
  
  idle {
    enabled      = true
    timeout      = "5m"  
    show_warning = true
  }
  
  controls {
    show_stop = true
  }
}
```

## Validation Rules

- **Theme validation**: Must be "modern_dark" or "original"
- **Duration formats**: Must be valid Go duration strings (e.g., "15m", "1h30m", "45s")
- **Layout inheritance**: Page layouts inherit from chapters, chapters inherit from lab default
- **Content structure**: Pages must reference valid page resources

## Examples

### Minimal Lab

```hcl
resource "lab" "basic" {
  title       = "Docker Basics"
  description = "Learn Docker fundamentals"
  layout      = resource.layout.two_column
  
  content {
    chapter "intro" {
      title = "Introduction"
      
      page "welcome" {
        reference = resource.page.welcome
      }
    }
  }
}
```

### Lab with Custom Settings

```hcl
resource "lab" "advanced" {
  title       = "Kubernetes Deep Dive"
  description = "Advanced Kubernetes concepts and practices"
  tags        = ["kubernetes", "advanced", "devops"]
  
  settings {
    theme = "original"
    
    timelimit {
      duration   = "2h"
      extend     = "30m"
      show_timer = true
    }
    
    idle {
      timeout = "15m"
    }
  }
  
  layout = resource.layout.three_column
  
  content {
    title = "Course Material"
    
    chapter "setup" {
      title = "Environment Setup"
      
      page "requirements" {
        reference = resource.page.requirements
      }
      
      page "installation" {
        reference = resource.page.installation
      }
    }
    
    chapter "basics" {
      title = "Kubernetes Basics"
      layout = resource.layout.two_column
      
      page "pods" {
        reference = resource.page.pods
      }
      
      page "services" {
        reference = resource.page.services
      }
    }
  }
}
```


## Layout Inheritance

Layouts are inherited in the following order (most specific wins):

1. Page-level layout (highest priority)
2. Chapter-level layout
3. Lab-level layout (lowest priority)

```hcl
resource "lab" "example" {
  layout = resource.layout.default  # Applied to all pages by default
  
  content {
    chapter "intro" {
      layout = resource.layout.two_column  # Overrides lab default for all pages in this chapter
      
      page "welcome" {
        reference = resource.page.welcome  # Uses chapter layout
      }
      
      page "setup" {
        layout    = resource.layout.three_column  # Overrides chapter layout for this page only
        reference = resource.page.setup
      }
    }
  }
}
```

## Best Practices

1. **Descriptive Titles**: Use clear, descriptive titles for labs and chapters
2. **Appropriate Timeframes**: Set realistic time limits based on lab complexity
3. **Tag Consistently**: Use consistent tags across labs for better organization
4. **Layout Hierarchy**: Use layout inheritance to minimize repetition
5. **Chapter Organization**: Group related pages into logical chapters
6. **Theme Selection**: Use "modern_dark" for new labs, "original" only when needed for compatibility