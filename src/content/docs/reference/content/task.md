---
title: Task
description: Configuration reference for the task resource in Instruqt labs
---



The task resource defines interactive activities that participants must complete during a lab. Tasks can include multiple conditions with validation scripts, setup procedures, and solution scripts. Tasks are embedded in instruction pages and provide automated checking of participant progress.

## HCL Syntax

### Basic Syntax

```hcl
resource "task" "name" {
  description = "Create a file in the home directory"
  
  condition "create_file" {
    description = "Create /tmp/hello.txt"
    
    check {
      script = "scripts/check_file.sh"
    }
  }
}
```

### Full Syntax

```hcl
resource "task" "name" {
  description      = "Complete the Docker setup"
  success_message  = "Excellent! You've completed all requirements."
  prerequisites    = [resource.task.previous_task]
  
  config {
    target               = resource.container.ubuntu
    user                 = "root"
    group                = "root"
    working_directory    = "/home/user"
    timeout              = "30s"
    environment          = { PATH = "/usr/local/bin:/usr/bin:/bin" }
    success_exit_codes   = [0]
    failure_exit_codes   = [1, 2]
    
    parallel_exec {
      condition = true
      check     = false
      solve     = false
      setup     = false
      cleanup   = false
    }
  }
  
  condition "setup_environment" {
    description = "Set up the Docker environment"
    
    config {
      timeout = "60s"
    }
    
    setup {
      script = "scripts/setup_docker.sh"
    }
    
    check {
      script          = "scripts/check_docker.sh"
      failure_message = "Docker is not running correctly"
    }
    
    solve {
      script = "scripts/solve_docker.sh"
    }
    
    cleanup {
      script = "scripts/cleanup_docker.sh"
    }
  }
  
  condition "create_container" {
    description = "Create and run a container"
    
    check {
      script = "scripts/check_container.sh"
      
      config {
        timeout = "45s"
      }
    }
    
    solve {
      script = "scripts/solve_container.sh"
    }
  }
}
```

## Resource Structure

```
task
├─ description (required)
├─ success_message, prerequisites (optional metadata)
├─ config (default configuration for all scripts)
│  ├─ target, user, group, working_directory
│  ├─ timeout, environment
│  ├─ success_exit_codes, failure_exit_codes  
│  └─ parallel_exec
│     └─ condition, check, solve, setup, cleanup
└─ conditions[] (one or more required)
   ├─ id (label), description (required)
   ├─ config (inherits from task config, can override)
   └─ script blocks (multiple of each type allowed)
      ├─ setup[] (runs when condition starts)
      ├─ check[] (runs during validation)
      ├─ solve[] (runs when skipped)  
      └─ cleanup[] (runs when condition completes)
         └─ each script: script path, failure_message, config override
```

## Fields  

### Core Configuration

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **description** | string | ✓ | Description of the task shown to users |
| success_message | string |  | Message displayed when task completes successfully |
| prerequisites | list(reference) |  | Tasks/quizzes that must be completed first (default: []) |

### Default Script Configuration

Configuration applied to all scripts within the task unless overridden at condition or script level.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **config** | block |  | **Default configuration for all scripts** |
| ↳ target | reference |  | Container or VM to execute scripts on |
| ↳ user | string |  | User to run scripts as (default: "root") |
| ↳ group | string |  | Group to run scripts as (default: "root") |
| ↳ working_directory | string |  | Working directory for script execution (default: "/") |
| ↳ timeout | string |  | Script execution timeout (Go duration format) (default: "30s") |
| ↳ environment | map(string) |  | Environment variables (default: {}) |
| ↳ success_exit_codes | list(int) |  | Exit codes considered successful (default: [0]) |
| ↳ failure_exit_codes | list(int) |  | Exit codes considered expected failures (default: []) |
| **parallel_exec** | block |  | Parallel execution configuration |

#### Parallel Execution Block

[config](#default-script-configuration) → parallel_exec

Controls whether different types of scripts execute sequentially or in parallel. Parallel execution can speed up task processing but may require careful script design to avoid conflicts.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| condition | bool |  | Execute conditions in parallel (default: false) |
| check | bool |  | Execute check scripts in parallel (default: false) |
| solve | bool |  | Execute solve scripts in parallel (default: false) |
| setup | bool |  | Execute setup scripts in parallel (default: false) |
| cleanup | bool |  | Execute cleanup scripts in parallel (default: false) |

### Task Conditions

Conditions that must be met to complete the task. Each condition can have multiple script blocks.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **conditions** | block | ✓ | Conditions that must be met (repeatable) |

#### Condition Block

[conditions](#task-conditions)

Defines a specific requirement that participants must meet to complete the task. Each condition represents a discrete validation step with its own setup, checking, and cleanup logic.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | label | ✓ | Condition identifier |
| description | string | ✓ | Description of what this condition validates |
| config | block |  | Configuration override for this condition (default: inherits from task) |
| **setup** | block |  | Scripts run when condition starts (repeatable) |
| **check** | block |  | Validation scripts run during checking (repeatable) |
| **solve** | block |  | Solution scripts run when condition is skipped (repeatable) |
| **cleanup** | block |  | Scripts run when condition completes (repeatable) |

#### Script Blocks

[conditions](#task-conditions) → [condition](#condition-block) → {setup|check|solve|cleanup}

Define executable scripts that perform specific actions during task execution. All script block types share the same structure but serve different purposes in the task lifecycle.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| script | string | ✓ | Path to script file to execute |
| config | block |  | Configuration override (default: inherits from condition/task) |
| failure_message | string |  | Message shown when script fails (check scripts only) |

## Validation Rules

- **Prerequisites**: Can only reference task, quiz, or chapter resources
- **Script execution**: Scripts are loaded from files at parse time
- **Target requirement**: All scripts must have a target (container/vm) configured
- **Configuration inheritance**: Script config → Condition config → Task config → Defaults
- **File paths**: Script file paths are resolved relative to the config file location

## Default Configuration

The following defaults are applied automatically:

```hcl
config {
  timeout              = "30s"
  working_directory    = "/"
  environment          = {}
  user                 = "root"
  group                = "root"
  success_exit_codes   = [0]
  failure_exit_codes   = []
  
  parallel_exec {
    condition = false
    check     = false
    solve     = false
    setup     = false
    cleanup   = false
  }
}
```

## Examples

### Simple File Creation Task

```hcl
resource "task" "create_file" {
  description = "Create a configuration file"
  
  condition "file_exists" {
    description = "Create /etc/myapp.conf"
    
    check {
      script = "scripts/check_config_file.sh"
    }
    
    solve {
      script = "scripts/create_config_file.sh"
    }
  }
}
```

### Multi-Condition Docker Task

```hcl
resource "task" "docker_setup" {
  description     = "Set up Docker environment"
  success_message = "Great! Docker is now configured and running."
  
  config {
    target = resource.container.ubuntu
    timeout = "60s"
  }
  
  condition "install_docker" {
    description = "Install Docker"
    
    setup {
      script = "scripts/install_docker.sh"
    }
    
    check {
      script          = "scripts/check_docker_installed.sh"
      failure_message = "Docker installation failed. Check the logs."
    }
    
    solve {
      script = "scripts/solve_install_docker.sh"
    }
  }
  
  condition "start_service" {
    description = "Start Docker service"
    
    check {
      script = "scripts/check_docker_running.sh"
    }
    
    solve {
      script = "scripts/start_docker.sh"
    }
  }
  
  condition "run_container" {
    description = "Run a test container"
    
    check {
      script = "scripts/check_test_container.sh"
      
      config {
        timeout = "45s"
      }
    }
    
    solve {
      script = "scripts/run_test_container.sh"
    }
    
    cleanup {
      script = "scripts/cleanup_test_container.sh"
    }
  }
}
```

### Task with Prerequisites

```hcl
resource "task" "advanced_networking" {
  description   = "Configure advanced network settings"
  prerequisites = [
    resource.task.basic_networking,
    resource.quiz.networking_concepts
  ]
  
  config {
    target = resource.container.network_lab
    user   = "student"
    
    environment = {
      NETWORK_CONFIG = "/etc/networks.conf"
      DEBUG_MODE     = "true"
    }
  }
  
  condition "configure_bridge" {
    description = "Set up bridge network interface"
    
    check {
      script = "scripts/check_bridge.sh"
    }
  }
}
```

### Parallel Execution Task

```hcl
resource "task" "parallel_checks" {
  description = "Run multiple parallel validations"
  
  config {
    target = resource.container.test_env
    
    parallel_exec {
      check = true  # Run all check scripts in parallel
    }
  }
  
  condition "check_service_a" {
    description = "Validate service A is running"
    
    check {
      script = "scripts/check_service_a.sh"
    }
  }
  
  condition "check_service_b" {
    description = "Validate service B is running"
    
    check {
      script = "scripts/check_service_b.sh"
    }
  }
  
  condition "check_service_c" {
    description = "Validate service C is running"
    
    check {
      script = "scripts/check_service_c.sh"
    }
  }
}
```

## Script Execution Flow

Tasks execute scripts in a specific order:

1. **Setup scripts**: Run when a condition becomes active
2. **Check scripts**: Run when validating the condition
3. **Solve scripts**: Run when the user skips the condition
4. **Cleanup scripts**: Run when the condition completes (success or skip)

Within each condition:
- All setup scripts execute first (in order)
- Check scripts execute during validation
- Solve scripts execute only when skipped
- Cleanup scripts execute last (in order)

## Usage in Instructions

Tasks must be referenced in instruction markdown using the `<instruqt-task>` component:

```markdown
## Complete the Setup

<instruqt-task id="docker_setup">
Follow the instructions to set up your Docker environment.
</instruqt-task>

Continue to the next step once the task is complete.
```

## Best Practices

1. **Clear Descriptions**: Write descriptive names for tasks and conditions that explain what users need to do
2. **Granular Conditions**: Break complex tasks into smaller, logical conditions for better user feedback
3. **Error Messages**: Provide helpful failure messages in check scripts
4. **Prerequisites**: Use prerequisites to ensure proper task ordering
5. **Timeouts**: Set appropriate timeouts based on expected script execution time
6. **Cleanup**: Always clean up resources in cleanup scripts to avoid side effects
7. **Script Organization**: Organize scripts in directories matching task names (e.g., `scripts/docker_setup/`)
8. **Configuration Inheritance**: Use task-level config for common settings, override at condition/script level when needed