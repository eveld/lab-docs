# Getting Started Guide Fact-Check Report

## Overview
This report compares the HCL syntax and structure shown in the getting started guide against the actual lab SDK resource definitions.

## Critical Issues Found

### 1. Lab Resource Structure (lab.hcl)

**ISSUE: Chapter referencing is incorrect**

Getting started guide shows:
```hcl
resource "lab" "my_web_server_lab" {
  title = "My Web Server Lab"
  description = "Learn web server basics..."
  
  chapter {
    id = resource.chapter.web_basics.meta.id
  }
}
```

**ACTUAL SDK Structure** (from lab/resource.go):
```hcl
resource "lab" "my_web_server_lab" {
  title = "My Web Server Lab"
  description = "Learn web server basics..."
  
  content {
    chapter "web_basics" {
      title = "Web Server Basics"
      page "customize_homepage" {
        reference = resource.page.customize_homepage
      }
    }
  }
}
```

**Key differences:**
- Chapters are defined **inside** a `content` block, not referenced by ID
- Chapters use label syntax: `chapter "slug" { ... }`
- No separate `resource "chapter"` - chapters are nested within the lab resource
- Pages are defined within chapters, not in separate files

### 2. Missing Required Fields

**Lab resource requires:**
- `layout` field (references a layout resource)
- `settings` block (optional but has defaults)

**Correct structure:**
```hcl
resource "lab" "my_web_server_lab" {
  title = "My Web Server Lab"
  description = "Learn web server basics..."
  layout = resource.layout.two_column  # REQUIRED
  
  settings {
    timelimit {
      duration = "15m"
    }
    idle {
      enabled = true
      timeout = "5m"
    }
  }
  
  content {
    chapter "web_basics" {
      title = "Web Server Basics"
      page "customize_homepage" {
        reference = resource.page.customize_homepage
      }
    }
  }
}
```

### 3. Page Resource Structure

**Getting started guide implies pages are defined in chapters.hcl**

**ACTUAL**: Pages are separate resources that are referenced:

```hcl
resource "page" "customize_homepage" {
  title = "Customize Your Web Server"
  file = "instructions/web_basics/customize_homepage.md"
  
  activities = {
    edit_homepage = resource.task.edit_homepage
  }
}
```

**Key differences:**
- `file` not `content` for the markdown path
- `activities` is a map, not a single `activity` block
- Activities use string keys that match the `<instruqt-task id="KEY">` in markdown

### 4. Task Validation Script Issues

**Getting started guide shows:**
```hcl
check {
  script = "scripts/check_homepage.sh"
  failure_message = "Please edit..."
}
```

**ACTUAL structure requires the script content to be embedded:**
```hcl
check {
  script = file("scripts/check_homepage.sh")
}
```

The `failure_message` field doesn't exist at the check level - it's at the task level as `success_message`.

### 5. Layout Structure

The guide doesn't show layout creation, but it's required. The layout structure has changed significantly:

```hcl
resource "layout" "two_column" {
  column {
    width = "50%"
    instructions {}
  }
  
  column {
    width = "50%"
    tab "terminal" {
      target = resource.terminal.shell
    }
    tab "service" {
      target = resource.service.webserver
    }
  }
}
```

**Key points:**
- Columns don't have names/labels
- Tabs are defined inline within columns
- Instructions is a special block, not a tab

## Recommended Corrections

### 1. Update lab.hcl example:
```hcl
resource "lab" "my_web_server_lab" {
  title = "My Web Server Lab"
  description = "Learn web server basics by customizing an nginx homepage"
  layout = resource.layout.two_column
  
  content {
    chapter "web_basics" {
      title = "Web Server Basics"
      page "customize_homepage" {
        reference = resource.page.customize_homepage
      }
    }
  }
}
```

### 2. Add layout.hcl creation:
```hcl
resource "layout" "two_column" {
  column {
    width = "40%"
    instructions {}
  }
  
  column {
    width = "60%"
    tab "terminal" {
      target = resource.terminal.shell
    }
    tab "service" {
      target = resource.service.webserver
    }
  }
}
```

### 3. Create separate page resource:
```hcl
resource "page" "customize_homepage" {
  title = "Customize Your Web Server"
  file = "instructions/web_basics/customize_homepage.md"
  
  activities = {
    edit_homepage = resource.task.edit_homepage
  }
}
```

### 4. Fix task structure:
```hcl
resource "task" "edit_homepage" {
  description = "Customize the nginx homepage with your own message"
  
  config {
    target = resource.container.webserver
  }

  condition "file_modified" {
    description = "Check if homepage was modified"
    
    check {
      script = file("scripts/check_homepage.sh")
    }
  }
}
```

## Files That Need to Be Created

The guide should mention creating these files:
1. `layout.hcl` (or `layouts.hcl`) - Required for lab to function
2. `pages.hcl` - For page resources
3. The guide correctly mentions `tasks.hcl`, `sandbox.hcl`, and `tabs.hcl`

## Minor Issues

1. File naming: The SDK seems to expect singular names (layout.hcl, not layouts.hcl) based on the generated structure
2. The `instruqt lab init` command output might not match reality - need to verify what files it actually creates
3. The visual diagrams are helpful but should reflect the actual resource relationships

## Conclusion

The getting started guide has the right concepts but several syntax and structural errors that would prevent the lab from working. The main issue is that it shows an outdated or incorrect chapter/page structure. The guide needs to be updated to match the actual SDK implementation.