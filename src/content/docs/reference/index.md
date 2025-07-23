---
title: Configuration Reference
description: Complete configuration reference for Instruqt lab resources
---

Complete reference documentation for all Instruqt lab configuration options. This reference covers all available HCL resources, configuration types, and functions for creating interactive labs.

## Core Resources

Essential resources for defining lab structure and content:

- **[Lab](/reference/resources/lab/lab/)** - Main lab configuration, metadata, and content structure
- **[Page](/reference/resources/page/page/)** - Individual instructional content pages
- **[Layout](/reference/resources/layout/layout/)** - User interface layout definitions
- **[Task](/reference/resources/task/task/)** - Interactive activities and validation

## Sandbox Resources

Infrastructure and environment configuration:

- **[Container](/reference/resources/container/container/)** - Docker containers for isolated environments
- **[Sidecar](/reference/resources/container/sidecar/)** - Additional containers attached to main containers
- **[Network](/reference/resources/network/network/)** - Network configuration and connectivity
- **[Ingress](/reference/resources/ingress/ingress/)** - External access and load balancing
- **[Exec](/reference/resources/exec/exec/)** - Command execution resources
- **[Copy](/reference/resources/copy/copy/)** - File and directory copying operations
- **[Template](/reference/resources/template/template/)** - File templating and generation
- **[Terraform](/reference/resources/terraform/terraform/)** - Infrastructure as code deployment

## Cloud Provider Resources

Integration with major cloud platforms:

### AWS
- **[Account](/reference/resources/aws/account/)** - AWS account configuration
- **[User](/reference/resources/aws/user/)** - AWS IAM user management

### Azure
- **[Service Principal](/reference/resources/azure/serviceprincipal/)** - Azure service principal authentication
- **[Subscription](/reference/resources/azure/subscription/)** - Azure subscription management
- **[User](/reference/resources/azure/user/)** - Azure AD user management

### Google Cloud
- **[Project](/reference/resources/google/project/)** - GCP project configuration
- **[Service Account](/reference/resources/google/serviceaccount/)** - GCP service account management
- **[User](/reference/resources/google/user/)** - GCP user account management

## Kubernetes Resources

Container orchestration and management:

- **[Cluster](/reference/resources/k8s/cluster/)** - Kubernetes cluster configuration
- **[Config](/reference/resources/k8s/config/)** - Kubernetes configuration management
- **[Helm](/reference/resources/helm/helm/)** - Helm chart deployment
- **[Helm Repository](/reference/resources/helm/helmrepository/)** - Helm repository configuration

## Nomad Resources

Alternative container orchestration:

- **[Cluster](/reference/resources/nomad/nomadcluster/)** - Nomad cluster setup
- **[Job](/reference/resources/nomad/nomadjob/)** - Nomad job deployment

## User Interface Resources

Interactive elements and user experience:

- **[Terminal](/reference/resources/terminal/terminal/)** - Interactive terminal access
- **[Editor](/reference/resources/editor/editor/)** - Code editor interface
- **[Service](/reference/resources/service/service/)** - Web service and application tabs
- **[External Website](/reference/resources/externalwebsite/externalwebsite/)** - External website integration
- **[Note](/reference/resources/note/note/)** - Static note and documentation tabs

## Interactive Content Resources

Assessment and engagement features:

- **[Quiz](/reference/resources/quiz/quiz/)** - Quiz container and configuration
- **[Multiple Choice Question](/reference/resources/quiz/multiplechoicequestion/)** - Multiple choice assessments
- **[Single Choice Question](/reference/resources/quiz/singlechoicequestion/)** - Single choice assessments
- **[Numeric Answer Question](/reference/resources/quiz/numericanswerquestion/)** - Numeric input assessments
- **[Text Answer Question](/reference/resources/quiz/textanswerquestion/)** - Text input assessments

## Security & Certificates

Certificate management and security configuration:

- **[Certificate CA](/reference/resources/cert/certificateca/)** - Certificate authority creation
- **[Certificate Leaf](/reference/resources/cert/certificateleaf/)** - End-entity certificate generation
- **[Certificate File](/reference/resources/cert/file/)** - Certificate file management

## Cache & Registry

Image and artifact management:

- **[Image Cache](/reference/resources/cache/imagecache/)** - Container image caching
- **[Registry](/reference/resources/cache/registry/)** - Container registry configuration
- **[Registry Auth](/reference/resources/cache/registryauth/)** - Registry authentication

## Random Generators

Dynamic content generation utilities:

- **[Random Creature](/reference/resources/random/randomcreature/)** - Animal name generation
- **[Random ID](/reference/resources/random/randomid/)** - Unique identifier generation
- **[Random Number](/reference/resources/random/randomnumber/)** - Random number generation
- **[Random Password](/reference/resources/random/randompassword/)** - Secure password generation
- **[Random UUID](/reference/resources/random/randomuuid/)** - UUID generation

## Utility Resources

Additional tools and utilities:

- **[HTTP](/reference/resources/http/http/)** - HTTP request and response handling

## Configuration Types

HCL configuration patterns and structures:

- **[Resource](/reference/types/resource/)** - Resource definition patterns
- **[Variable](/reference/types/variable/)** - Variable declarations and usage
- **[Local](/reference/types/local/)** - Local value computations
- **[Output](/reference/types/output/)** - Output value definitions
- **[Module](/reference/types/module/)** - Module organization and reuse

## Functions

Built-in functions for dynamic configuration:

- **[Functions Reference](/reference/functions/)** - Complete list of available functions and usage examples

## Getting Started

New to lab configuration? Start with these essential resources:

1. **[Lab](/reference/resources/lab/lab/)** - Define your lab structure and metadata
2. **[Container](/reference/resources/container/container/)** - Set up your sandbox environment
3. **[Page](/reference/resources/page/page/)** - Create instructional content
4. **[Task](/reference/resources/task/task/)** - Add interactive elements

## Advanced Topics

For complex lab scenarios, explore:

- **[Sandbox Overview](/reference/sandbox/)** - Infrastructure patterns and best practices
- **[Configuration Types](/reference/types/)** - Advanced HCL patterns
- **[Cloud Integration](/reference/resources/aws/account/)** - Multi-cloud lab environments