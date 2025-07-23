---
title: Migration Toolkit
description: Using the migration toolkit to convert legacy YAML tracks to HCL format
---

# Migration Toolkit

The migration toolkit provides automated conversion from legacy YAML track format to the new HCL lab format.

## Installation

```bash
# Install from Go modules
go install github.com/instruqt/migration-toolkit@latest

# Or download binary from releases
# https://github.com/instruqt/migration-toolkit/releases
```

## Basic Usage

```bash
# Convert a legacy track
migration-toolkit convert /path/to/legacy-track /path/to/output-lab

# Preview changes without writing files
migration-toolkit convert --dry-run /path/to/legacy-track

# Convert with custom options
migration-toolkit convert --preserve-scripts --merge-challenges /path/to/track
```

## Conversion Options

- `--dry-run`: Preview changes without writing files
- `--preserve-scripts`: Keep original script file structure
- `--merge-challenges`: Combine related challenges into single pages
- `--output-format`: Choose HCL output formatting style

## What Gets Converted

### Automatic Conversions
- Track metadata → Lab resource configuration
- Container configs → Sandbox resources
- Challenge structure → Chapters and pages
- Assignment content → Instruction markdown files
- Validation scripts → Task check scripts

### Manual Review Required
- Complex script logic
- Custom integrations
- Advanced challenge dependencies
- Non-standard file structures

## Post-Conversion Steps

1. **Review generated files** for accuracy
2. **Test the converted lab** using `instruqt lab validate`
3. **Update content** for new interactive components
4. **Verify scripts** work in new directory structure
5. **Update documentation** and references

Content coming soon...