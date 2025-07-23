---
title: Sandbox Resources
description: Configuring infrastructure and sandbox environments for labs
---

WIP

## Container Resources

```hcl
resource "container" "workstation" {
  image {
    name = "ubuntu:22.04"
  }
  
  resources {
    memory = 1024
    cpu    = 500
  }
  
  shell = "/bin/bash"
}
```

## Virtual Machine Resources

```hcl
resource "virtual_machine" "server" {
  image {
    name = "ubuntu-22-04-server"
  }
  
  resources {
    memory = 2048
    cpu    = 1000
  }
}
```

## Cloud Provider Integration

WIP