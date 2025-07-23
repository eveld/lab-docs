---
title: Legacy to HCL Migration
description: Guide for migrating from legacy YAML track format to new HCL lab format
---

## Migrating from Legacy YAML to HCL Format

This guide covers the process of migrating existing Instruqt tracks from the legacy YAML format to the new HCL-based lab format.

## Migration Overview

The migration process involves converting:

- `track.yml` → `lab.hcl` (main lab configuration)
- `config.yml` → `sandbox.hcl` (infrastructure resources)
- Challenge directories → Content structure with `chapters.hcl`, `tasks.hcl`
- `assignment.md` files → Structured markdown in `instructions/`
- Script files → Organized script directory structure

## Key Differences

### File Organization

**Legacy Format**:
- `track.yml` - Track metadata
- `config.yml` - Sandbox configuration
- `01-challenge/assignment.md` - Challenge content
- `01-challenge/check-workstation` - Validation script

**New HCL Format**:
- `lab.hcl` - Lab resource definition
- `sandbox.hcl` - Infrastructure resources
- `chapters.hcl` - Content organization
- `tasks.hcl` - Interactive activities
- `instructions/chapter-1/page-1.md` - Structured content
- `scripts/task-name/check.sh` - Validation scripts

### Resource Mapping

| Legacy YAML | New HCL Format |
|-------------|----------------|
| `track.slug` | `resource "lab" "{slug}"` |
| `track.title` | `lab.title` |
| `config.containers` | `resource "container"` |
| Challenge directories | Pages and tasks |
| `assignment.md` frontmatter | Task metadata |

## Migration Tools

The [Migration Toolkit](/migration/toolkit/) provides automated tools to help convert legacy tracks:

```bash
# Install migration toolkit
go install github.com/instruqt/migration-toolkit@latest

# Convert a legacy track
migration-toolkit convert /path/to/legacy-track /path/to/new-lab

# Validate the converted lab
instruqt lab validate /path/to/new-lab
```

## Manual Migration Steps

For complex tracks or custom configurations, manual migration may be required:

1. **Create new lab structure**
2. **Map track metadata to lab.hcl**
3. **Convert container/VM configurations**
4. **Restructure content files**
5. **Update script paths and references**
6. **Test and validate the migrated lab**

## Best Practices

- **Version Control**: Keep both legacy and new formats in separate branches during migration
- **Incremental Migration**: Migrate one challenge at a time for complex tracks
- **Validation**: Test each migrated component thoroughly
- **Documentation**: Update any external documentation referencing the old format

## Getting Help

- Use the [Migration Toolkit](/migration/toolkit/) for automated conversion
- Check [common migration patterns](https://github.com/instruqt/migration-examples)
- Ask questions in the [Instruqt Community](https://community.instruqt.com)