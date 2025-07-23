---
title: Legacy to HCL Migration
description: Guide for migrating from legacy YAML track format to new HCL lab format
---

## Migrating from Legacy YAML to HCL Format

WIP

## Migration Overview

WIP

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

WIP

## Manual Migration Steps

WIP

## Best Practices

WIP

## Getting Help

WIP