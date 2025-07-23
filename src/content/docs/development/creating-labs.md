---
title: Creating Labs
description: Step-by-step guide to creating new Instruqt labs
---

WIP

## Lab Creation Workflow

WIP

## Step 1: Initialize Project

```bash
instruqt lab create my-new-lab
cd my-new-lab
```

## Step 2: Configure Lab Resources

Edit `lab.hcl` to define your lab:

```hcl
resource "lab" "my_new_lab" {
  title       = "My New Lab"
  description = "Learn something awesome"
  
  settings {
    idle_timeout {
      enabled = true
      timeout = 3600  # 1 hour
    }
  }
  
  chapters = [
    instruqt_chapter.introduction,
    instruqt_chapter.hands_on,
  ]
}
```

WIP