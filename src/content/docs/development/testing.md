---
title: Testing & Validation
description: Testing and validating Instruqt labs before deployment
---

Proper testing ensures your lab works correctly for learners.

## Validation Commands

```bash
# Validate lab configuration
instruqt lab validate

# Check for common issues
instruqt lab lint

# Test lab locally
instruqt lab start --local
```

## Testing Checklist

- [ ] All HCL files validate without errors
- [ ] Sandbox resources start correctly
- [ ] Task validation scripts work as expected
- [ ] Content renders properly
- [ ] Interactive components function correctly
- [ ] Lab completes end-to-end successfully

## Common Issues

### Configuration Errors
- Missing resource references
- Invalid HCL syntax
- Incorrect file paths

### Runtime Issues
- Resource startup failures
- Script permission problems
- Network connectivity issues

### Content Problems
- Broken links or references
- Missing instruction files
- Invalid markdown syntax

Content coming soon...