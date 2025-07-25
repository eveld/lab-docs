---
title: Page
description: Configuration reference for the page resource in Instruqt labs
---



The page resource represents a markdown file that displays instructional content to participants. Pages contain the actual content that users read during the lab, with support for variable substitution and embedded interactive activities.

## HCL Syntax

### Basic Syntax

```hcl
resource "page" "name" {
  title = "Getting Started"
  file  = "instructions/chapter1/intro.md"
}
```

### Full Syntax

```hcl
resource "page" "name" {
  title = "Getting Started"
  file  = "instructions/chapter1/intro.md"
  
  variables = {
    version     = "v1.2.3"
    api_url     = "https://api.example.com"
    region_name = "us-west-2"
  }
  
  activities = {
    setup_task   = resource.task.environment_setup
    knowledge_check = resource.quiz.concepts_quiz
    final_task   = resource.task.deployment
  }
}
```

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **title** | string | ✓ | The title of the page |
| **file** | string | ✓ | Path to markdown file containing page content |
| variables | map(string) |  | Variables for Handlebars template substitution. Defaults to `{}` |
| activities | map(reference) |  | Interactive activities embedded in the page. Defaults to `{}` |

## Computed Attributes

These attributes are set by the system after the page is processed:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| content | string | - | Processed content of the markdown file with variables and activities resolved |

## Variable Substitution

Pages support Handlebars template syntax for variable substitution:

```markdown
## Welcome to {{service_name}}

Connect to the API at {{api_url}} using version {{version}}.
```

### Available Helpers

| Helper | Description | Example |
|--------|-------------|---------|
| quote | Wraps value in quotes | `{{quote api_key}}` → `"abc123"` |
| trim | Removes whitespace | `{{trim description}}` |

## Interactive Activities

Pages can embed tasks and quizzes using the activities map:

```hcl
resource "page" "tutorial" {
  file = "instructions/tutorial.md"
  
  activities = {
    setup = resource.task.environment_setup
    quiz  = resource.quiz.knowledge_check
  }
}
```

Then reference them in your markdown:

```markdown
## Setup Your Environment

<instruqt-task id="setup">
Complete the environment setup before continuing.
</instruqt-task>

## Test Your Knowledge

<instruqt-quiz id="quiz">
Answer these questions to check your understanding.
</instruqt-quiz>
```

## Validation Rules

- File paths are resolved relative to the config file location
- All activities referenced in markdown must be defined in the activities map
- Activity IDs in markdown must be unique within the page
- Only task and quiz resources can be used as activities
- Variables must be valid Handlebars template syntax

## Examples

### Basic Page

```hcl
resource "page" "welcome" {
  title = "Welcome to Docker"
  file  = "instructions/intro/welcome.md"
}
```

### Page with Variables

```hcl
resource "page" "configuration" {
  title = "API Configuration"
  file  = "instructions/reference/config.md"
  
  variables = {
    api_version = "v2"
    endpoint    = "https://api.example.com"
    timeout     = "30s"
  }
}
```

### Page with Activities

```hcl
resource "page" "hands_on" {
  title = "Hands-On Practice"
  file  = "instructions/practice/exercises.md"
  
  activities = {
    docker_setup    = resource.task.install_docker
    container_task  = resource.task.run_container
    knowledge_quiz  = resource.quiz.docker_concepts
  }
}
```

### Complex Page Example

```hcl
resource "page" "advanced_tutorial" {
  title = "Advanced Container Management"
  file  = "instructions/advanced/tutorial.md"
  
  variables = {
    registry_url = "registry.example.com"
    namespace    = "production"
    image_tag    = "v1.0.0"
  }
  
  activities = {
    build_image     = resource.task.build_custom_image
    deploy_app      = resource.task.deploy_application
    scaling_quiz    = resource.quiz.scaling_concepts
    cleanup_task    = resource.task.cleanup_resources
  }
}
```

## Best Practices

1. **Descriptive Titles**: Use clear, descriptive titles that help participants understand the page content
2. **Organized File Structure**: Store markdown files in logical directory structures (e.g., `instructions/chapter_name/page_name.md`)
3. **Variable Naming**: Use clear, consistent variable names that are easy to understand in templates
4. **Activity Flow**: Order activities logically within the page content to guide participant progression
5. **Content Length**: Keep pages focused on specific topics - break long content into multiple pages
6. **Template Testing**: Test variable substitution with different values to ensure templates work correctly