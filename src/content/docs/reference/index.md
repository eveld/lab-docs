---
title: Configuration Reference
description: Complete configuration reference for Instruqt lab resources
---

Complete reference documentation for all Instruqt lab configuration options. This reference covers all available HCL resources, configuration types, and functions for creating interactive labs.

## How This Reference is Organized

The reference documentation is organized around two main concepts:

- **Content Resources** - Define what learners see and interact with (educational content, activities, assessments)
- **Sandbox Resources** - Define the technical infrastructure and environment that powers the lab

This separation makes it easier to find what you need based on whether you're creating educational content or configuring technical infrastructure.

## Content Resources

Resources for creating instructional content and interactive activities:

### [**Content Overview**](./content/)
Complete guide to content creation resources including labs, pages, layouts, and interactive activities.

**Essential Resources:**
- **[Lab](./content/lab.md)** - Main lab configuration, metadata, and content structure
- **[Page](./content/page.md)** - Individual instructional content pages with variable substitution and activity embedding
- **[Layout](./content/layout.md)** - User interface layout definitions that arrange tabs and instructions
- **[Note](./content/note.md)** - Static reference materials and documentation tabs

**Interactive Activities:**
- **[Task](./content/task.md)** - Hands-on interactive challenges with automated validation and feedback
- **[Quiz Overview](./content/quiz/)** - Knowledge assessments with multiple question types
  - **[Quiz](./content/quiz/quiz.md)** - Main quiz resource that combines questions
  - **[Single Choice](./content/quiz/singlechoicequestion.md)** - Questions with one correct answer
  - **[Multiple Choice](./content/quiz/multiplechoicequestion.md)** - Questions with multiple correct answers
  - **[Text Answer](./content/quiz/textanswerquestion.md)** - Free-form text input questions
  - **[Numeric Answer](./content/quiz/numericanswerquestion.md)** - Numerical value questions

## Sandbox Resources

Infrastructure and environment resources for lab environments:

### [**Sandbox Overview**](./sandbox/)
Complete guide to infrastructure patterns and environment configuration.

**Compute Resources:**
- **[Container](./sandbox/compute/container.md)** - Docker containers for isolated application environments
- **[Sidecar](./sandbox/compute/sidecar.md)** - Additional containers that extend main containers

**Networking:**
- **[Network](./sandbox/networking/network.md)** - Isolated Docker networks for container communication
- **[Ingress](./sandbox/networking/ingress.md)** - HTTP/HTTPS routing and external access

**User Interface Tabs:**
- **[Terminal](./sandbox/ui/terminal.md)** - Interactive shell sessions
- **[Service](./sandbox/ui/service.md)** - Web application and service tabs
- **[Editor](./sandbox/ui/editor.md)** - Code editor interfaces
- **[External Website](./sandbox/ui/externalwebsite.md)** - External website integration

**Storage & File Management:**
- **[Copy](./sandbox/storage/copy.md)** - File and directory copying operations
- **[Template](./sandbox/storage/template.md)** - Dynamic file generation from templates

**Cloud Provider Integrations:**
- **[AWS Resources](./sandbox/cloud/aws/)** - Amazon Web Services account and user management
- **[Azure Resources](./sandbox/cloud/azure/)** - Microsoft Azure subscription and identity management
- **[Google Cloud Resources](./sandbox/cloud/google/)** - Google Cloud Platform project and service account management

**Container Orchestration:**
- **[Kubernetes](./sandbox/orchestration/k8s/)** - Kubernetes cluster provisioning and configuration
- **[Nomad](./sandbox/orchestration/nomad/)** - HashiCorp Nomad cluster and job management
- **[Helm](./sandbox/orchestration/helm/)** - Helm chart deployment and repository management

**Utilities:**
- **[Core Utilities](./sandbox/utilities/)** - Command execution (exec), HTTP requests, Terraform integration
- **[Random Generators](./sandbox/utilities/random/)** - Dynamic content generation (IDs, passwords, names, UUIDs)
- **[Cache & Registry](./sandbox/utilities/cache/)** - Container image caching and registry management
- **[Certificates](./sandbox/certificates/cert/)** - SSL/TLS certificate authority and certificate management

## Configuration Infrastructure

Advanced configuration patterns and dynamic content:

**Configuration Types:**
- **[Resource](./types/resource.md)** - Resource definition patterns and best practices
- **[Variable](./types/variable.md)** - Variable declarations and usage patterns
- **[Local](./types/local.md)** - Local value computations and expressions
- **[Output](./types/output.md)** - Output value definitions for resource sharing
- **[Module](./types/module.md)** - Module organization and reuse patterns

**Dynamic Configuration:**
- **[Functions Reference](./functions.md)** - Built-in functions for dynamic configuration and data manipulation

## Getting Started Paths

### For Content Creators

If you're focused on creating educational content and learning experiences:

1. **[Lab](./content/lab.md)** - Start with lab structure and metadata
2. **[Page](./content/page.md)** - Create instructional content with embedded activities
3. **[Task](./content/task.md)** - Add hands-on interactive challenges
4. **[Layout](./content/layout.md)** - Design the user interface and tab arrangement
5. **[Quiz](./content/quiz/)** - Add knowledge assessments and quizzes

### For Infrastructure Engineers

If you're focused on setting up the technical environment:

1. **[Container](./sandbox/compute/container.md)** - Set up application environments
2. **[Network](./sandbox/networking/network.md)** - Configure container networking
3. **[Terminal](./sandbox/ui/terminal.md)** - Provide command-line access
4. **[Service](./sandbox/ui/service.md)** - Expose web applications
5. **[Cloud Integration](./sandbox/cloud/)** - Connect to cloud platforms as needed

### For Platform Engineers

If you're building reusable lab infrastructure:

1. **[Configuration Types](./types/)** - Learn advanced HCL patterns
2. **[Module](./types/module.md)** - Create reusable lab components
3. **[Functions](./functions.md)** - Use dynamic configuration capabilities
4. **[Template](./sandbox/storage/template.md)** - Generate configuration files dynamically

## Quick Reference by Use Case

**Simple Web App Lab:**
Lab → Container → Service → Page → Layout

**Development Environment Lab:**
Lab → Container → Terminal → Editor → Network → Page

**Cloud Integration Lab:**
Lab → Cloud Resources → Container → Service → Task → Page

**Assessment-Heavy Lab:**
Lab → Page → Task → Quiz → Layout

**Multi-Service Architecture Lab:**
Lab → Multiple Containers → Network → Service → Terminal → Page

## Need Help?

- **New to HCL?** Start with [Configuration Types](./types/) to learn the basics
- **Looking for Examples?** Check the overview pages for [Content](./content/) and [Sandbox](./sandbox/) resources
- **Building Complex Labs?** Explore [Module](./types/module.md) patterns for reusable components
- **Integration Questions?** See [Cloud Provider](./sandbox/cloud/) documentation for specific platforms