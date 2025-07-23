---
title: Migration Toolkit
description: Using the migration toolkit to convert legacy YAML tracks to HCL format
---

WIP

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

WIP

## What Gets Converted

### Automatic Conversions
WIP

### Manual Review Required
WIP

## Post-Conversion Steps

WIP