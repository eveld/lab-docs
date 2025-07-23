---
title: Layout
description: Configuration reference for the layout resource in Instruqt labs
---



The layout resource defines the visual structure of the lab UI through columns and rows. Layouts organize how tabs (terminal, service, editor, etc.) and instructions are displayed to users.

## HCL Syntax

### Basic Syntax

```hcl
resource "layout" "name" {
  column {
    instructions {}
  }
  
  column {
    tab "terminal" {
      target = resource.terminal.main
    }
  }
}
```

### Full Syntax

```hcl
resource "layout" "name" {
  column {
    width = "percentage"
    
    tab "name" {
      target = resource.type.name
      title = "Display Title"
      active = true
      visible = true
      closeable = false
      movable = false
    }
    
    instructions {
      title = "Instructions"
      active = false
    }
    
    row {
      height = "percentage"
      # nested content
    }
  }
}
```

## Layout Structure

The layout resource uses a hierarchical structure:
- **Columns**: Vertical divisions of the layout
- **Rows**: Horizontal divisions within columns
- **Tabs**: Content panels that reference other resources
- **Instructions**: Special panel for lab instructions

### Column Block

A column is a vertical panel within the layout. Columns do not have names or IDs - they are anonymous blocks.

#### Column Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| width | string | | Width of the column as a percentage (e.g., "50%", "33%"). Defaults to equal distribution. |
| tab | block | | Tab blocks defining content panels |
| instructions | block | | Instructions panel configuration |
| row | block | | Nested row blocks for further subdivision |

### Row Block

A row is a horizontal panel within a column. Like columns, rows are anonymous blocks without names or IDs.

#### Row Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| height | string | | Height of the row as a percentage. Defaults to equal distribution. |
| tab | block | | Tab blocks defining content panels |
| instructions | block | | Instructions panel configuration |
| column | block | | Nested column blocks for further subdivision |

### Tab Block

Tabs define the actual content panels within the layout. Each tab must have a name (used as a label) and references a resource.

#### Tab Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | label | ✓ | The identifier for the tab (becomes the label) |
| title | string | | Display title for the tab. Defaults to capitalized name. |
| target | reference | ✓ | Reference to the resource to display |
| active | bool | | Whether the tab is initially active. Defaults to false. |
| visible | bool | | Whether the tab is visible. Defaults to true. |
| closeable | bool | | Whether users can close the tab. Defaults to false. |
| movable | bool | | Whether users can move the tab. Defaults to false. |

#### Supported Tab Targets

- `terminal`
- `service`
- `editor`
- `externalwebsite`  
- `note`

### Instructions Block

The instructions block configures the special instructions panel.

#### Instructions Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | | Title of the instructions tab. Defaults to "Instructions". |
| active | bool | | Whether the tab is initially active. Defaults to false. |
| visible | bool | | Whether the tab is visible. Defaults to true. |
| closeable | bool | | Whether users can close the tab. Defaults to false. |
| movable | bool | | Whether users can move the tab. Defaults to false. |

## Validation Rules

- Tab names must be unique within a layout
- The name "instructions" is reserved and cannot be used for tabs
- Tab targets must reference valid resources
- Width/height percentages should be valid CSS percentages

## Examples

### Two Column Layout

```hcl
resource "layout" "two_column" {
  column {
    width = "50%"
    
    instructions {}
  }
  
  column {
    width = "50%"
    
    tab "terminal" {
      target = resource.terminal.main
    }
  }
}
```

### Complex Layout with Rows

```hcl
resource "layout" "complex" {
  column {
    width = "40%"
    
    instructions {}
  }
  
  column {
    width = "60%"
    
    row {
      height = "70%"
      
      tab "terminal" {
        target = resource.terminal.main
        active = true
      }
      
      tab "editor" {
        target = resource.editor.code
      }
    }
    
    row {
      height = "30%"
      
      tab "service" {
        target = resource.service.web
      }
    }
  }
}
```

### Three Column Layout

```hcl
resource "layout" "three_column" {
  column {
    width = "25%"
    
    instructions {}
  }
  
  column {
    width = "50%"
    
    tab "terminal" {
      target = resource.terminal.main
      active = true
    }
    
    tab "terminal2" {
      target = resource.terminal.secondary
    }
  }
  
  column {
    width = "25%"
    
    tab "notes" {
      target = resource.note.hints
    }
  }
}
```

### Nested Layout

```hcl
resource "layout" "nested" {
  column {
    width = "30%"
    
    row {
      height = "50%"
      instructions {}
    }
    
    row {
      height = "50%"
      tab "notes" {
        target = resource.note.hints
      }
    }
  }
  
  column {
    width = "70%"
    
    row {
      height = "60%"
      
      column {
        width = "60%"
        tab "terminal" {
          target = resource.terminal.main
        }
      }
      
      column {
        width = "40%"
        tab "editor" {
          target = resource.editor.config
        }
      }
    }
    
    row {
      height = "40%"
      tab "service" {
        target = resource.service.app
      }
    }
  }
}
```

## Migration Notes

**Breaking Change**: The layout format has changed significantly from earlier versions:

- **Old format**: Columns and rows had IDs that were referenced by tabs
- **New format**: Tabs are defined inline within columns/rows

If migrating from the old format:
```hcl
## OLD (no longer valid)
resource "layout" "example" {
  column "left" {
    width = "50%"
  }
}

resource "tab" "terminal" {
  panel = "left"  # Referenced column ID
}

# NEW (current format)
resource "layout" "example" {
  column {
    width = "50%"
    
    tab "terminal" {
      target = resource.terminal.main
    }
  }
}
```

## Best Practices

1. **Start Simple**: Begin with a two-column layout (instructions + terminal)
2. **Responsive Design**: Consider how your layout will appear on different screen sizes
3. **Tab Organization**: Group related tabs in the same column/row
4. **Active Tabs**: Set one tab per column/row as active for better UX
5. **Avoid Deep Nesting**: Limit nesting to 2-3 levels for maintainability