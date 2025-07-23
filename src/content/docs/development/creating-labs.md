---
title: Creating Labs
description: Step-by-step guide to creating new Instruqt labs
---

# Creating Labs

This guide walks through the process of creating a new Instruqt lab from scratch.

## Lab Creation Workflow

1. **Initialize Project**
2. **Configure Lab Resources**
3. **Set Up Sandbox Environment** 
4. **Create Content Structure**
5. **Add Interactive Tasks**
6. **Test and Validate**
7. **Deploy**

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

Content coming soon...