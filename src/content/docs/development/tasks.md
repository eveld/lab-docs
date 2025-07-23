---
title: Interactive Tasks
description: Creating interactive tasks and validation scripts for labs
---

WIP

## Task Types

WIP

## Creating Validation Tasks

Define tasks in `tasks.hcl`:

```hcl
resource "task" "setup_environment" {
  title = "Set up your environment"
  
  condition {
    script = file("scripts/setup_environment/check.sh")
  }
  
  on_solve {
    script = file("scripts/setup_environment/solve.sh")
  }
}
```

## Validation Scripts

Check scripts validate that tasks are completed correctly:

```bash
#!/bin/bash
# scripts/setup_environment/check.sh

if [ -f "/tmp/setup_complete" ]; then
  exit 0  # Success
else
  echo "Setup not complete. Please run the setup command."
  exit 1  # Failure
fi
```

WIP