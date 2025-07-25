# Development Notes

## Changes Needed in lab-sdk

### Container Resource Port Fields
The port fields in `pkg/hcl/resources/container/resource_port.go` should be changed from `string` to `int` for better type safety and user experience:

```go
// Current (should be changed):
type Port struct {
    Local         string `hcl:"local" json:"local"`
    Remote        string `hcl:"remote,optional" json:"remote,omitempty"`
    Host          string `hcl:"host,optional" json:"host,omitempty"`
    // ...
}

// Should be:
type Port struct {
    Local         int `hcl:"local" json:"local"`
    Remote        int `hcl:"remote,optional" json:"remote,omitempty"`
    Host          int `hcl:"host,optional" json:"host,omitempty"`
    // ...
}
```

**Rationale**: Port numbers are naturally integers (1-65535), and using int type provides better validation and user experience in HCL configuration.

### VM Resource Port Fields
Similar issue in `pkg/hcl/resources/vm/resource.go` - port fields should be changed from `string` to `int`:

```go
// Current (should be changed):
type Port struct {
    Local         string `hcl:"local" json:"local"`
    Host          string `hcl:"host,optional" json:"host,omitempty"`
    // ...
}

// Should be:
type Port struct {
    Local         int `hcl:"local" json:"local"`
    Host          int `hcl:"host,optional" json:"host,omitempty"`
    // ...
}
```

## Missing Documentation

### VM Resource
The lab-sdk contains a fully implemented VM resource (`pkg/hcl/resources/vm/`) but no corresponding documentation exists in the docs. The VM resource includes:

- Full libvirt-based virtualization
- Cloud-init support
- Disk, volume, and network configuration
- VNC access
- Port mapping

**Decision needed**: Should we create comprehensive VM resource documentation or is this feature not ready for public documentation?

## Documentation Reorganization

### Completed: Content/Sandbox Structure
Reorganized the reference documentation from a flat structure to a logical content/sandbox approach:

**New Structure:**
```
docs/reference/
├── content/                    # User-facing content and activities
│   ├── lab.md                 # Lab definition and structure
│   ├── page.md                # Instructional content pages
│   ├── task.md                # Interactive tasks and validation
│   ├── layout.md              # UI layout and presentation
│   ├── note.md                # Reference materials and hints
│   └── quiz/                  # Knowledge assessments
│       ├── quiz.md
│       ├── single-choice.md
│       ├── multiple-choice.md
│       ├── text-answer.md
│       └── numeric-answer.md
│
└── sandbox/                   # Infrastructure and environment
    ├── compute/               # Compute resources (container, sidecar)
    ├── networking/            # Network infrastructure
    ├── ui/                    # User interface tabs (terminal, service, etc.)
    ├── storage/               # Data and file management
    ├── cloud/                 # Cloud provider integrations (aws, azure, google)
    ├── orchestration/         # Container orchestration (k8s, nomad, helm)
    ├── utilities/             # Helper resources (exec, http, random, cache)
    └── certificates/          # SSL/TLS management
```

**Benefits:**
- Clear mental model: Content vs infrastructure
- Task-oriented organization 
- Logical grouping of related resources
- Easier navigation for specific user roles
- Scalable structure for future additions
