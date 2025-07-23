---
title: Configuration Reference
description: Complete configuration reference for Instruqt lab resources
---

Complete reference documentation for all Instruqt lab configuration options. This reference covers all available HCL resources, configuration types, and functions for creating interactive labs.

## Core Resources

Essential resources for defining lab structure and content:

- **[Lab](/api/resources/lab/lab/)** - Main lab configuration, metadata, and content structure
- **[Page](/api/resources/page/page/)** - Individual instructional content pages
- **[Layout](/api/resources/layout/layout/)** - User interface layout definitions
- **[Task](/api/resources/task/task/)** - Interactive activities and validation

## Sandbox Resources

Infrastructure and environment configuration:

- **[Container](/api/resources/container/container/)** - Docker containers for isolated environments
- **[Sidecar](/api/resources/container/sidecar/)** - Additional containers attached to main containers
- **[Network](/api/resources/network/network/)** - Network configuration and connectivity
- **[Ingress](/api/resources/ingress/ingress/)** - External access and load balancing
- **[Exec](/api/resources/exec/exec/)** - Command execution resources
- **[Copy](/api/resources/copy/copy/)** - File and directory copying operations
- **[Template](/api/resources/template/template/)** - File templating and generation
- **[Terraform](/api/resources/terraform/terraform/)** - Infrastructure as code deployment

## Cloud Provider Resources

Integration with major cloud platforms:

### AWS
- **[Account](/api/resources/aws/account/)** - AWS account configuration
- **[User](/api/resources/aws/user/)** - AWS IAM user management

### Azure
- **[Service Principal](/api/resources/azure/serviceprincipal/)** - Azure service principal authentication
- **[Subscription](/api/resources/azure/subscription/)** - Azure subscription management
- **[User](/api/resources/azure/user/)** - Azure AD user management

### Google Cloud
- **[Project](/api/resources/google/project/)** - GCP project configuration
- **[Service Account](/api/resources/google/serviceaccount/)** - GCP service account management
- **[User](/api/resources/google/user/)** - GCP user account management

## Kubernetes Resources

Container orchestration and management:

- **[Cluster](/api/resources/k8s/cluster/)** - Kubernetes cluster configuration
- **[Config](/api/resources/k8s/config/)** - Kubernetes configuration management
- **[Helm](/api/resources/helm/helm/)** - Helm chart deployment
- **[Helm Repository](/api/resources/helm/helmrepository/)** - Helm repository configuration

## Nomad Resources

Alternative container orchestration:

- **[Cluster](/api/resources/nomad/nomadcluster/)** - Nomad cluster setup
- **[Job](/api/resources/nomad/nomadjob/)** - Nomad job deployment

## User Interface Resources

Interactive elements and user experience:

- **[Terminal](/api/resources/terminal/terminal/)** - Interactive terminal access
- **[Editor](/api/resources/editor/editor/)** - Code editor interface
- **[Service](/api/resources/service/service/)** - Web service and application tabs
- **[External Website](/api/resources/externalwebsite/externalwebsite/)** - External website integration
- **[Note](/api/resources/note/note/)** - Static note and documentation tabs

## Interactive Content Resources

Assessment and engagement features:

- **[Quiz](/api/resources/quiz/quiz/)** - Quiz container and configuration
- **[Multiple Choice Question](/api/resources/quiz/multiplechoicequestion/)** - Multiple choice assessments
- **[Single Choice Question](/api/resources/quiz/singlechoicequestion/)** - Single choice assessments
- **[Numeric Answer Question](/api/resources/quiz/numericanswerquestion/)** - Numeric input assessments
- **[Text Answer Question](/api/resources/quiz/textanswerquestion/)** - Text input assessments

## Security & Certificates

Certificate management and security configuration:

- **[Certificate CA](/api/resources/cert/certificateca/)** - Certificate authority creation
- **[Certificate Leaf](/api/resources/cert/certificateleaf/)** - End-entity certificate generation
- **[Certificate File](/api/resources/cert/file/)** - Certificate file management

## Cache & Registry

Image and artifact management:

- **[Image Cache](/api/resources/cache/imagecache/)** - Container image caching
- **[Registry](/api/resources/cache/registry/)** - Container registry configuration
- **[Registry Auth](/api/resources/cache/registryauth/)** - Registry authentication

## Random Generators

Dynamic content generation utilities:

- **[Random Creature](/api/resources/random/randomcreature/)** - Animal name generation
- **[Random ID](/api/resources/random/randomid/)** - Unique identifier generation
- **[Random Number](/api/resources/random/randomnumber/)** - Random number generation
- **[Random Password](/api/resources/random/randompassword/)** - Secure password generation
- **[Random UUID](/api/resources/random/randomuuid/)** - UUID generation

## Utility Resources

Additional tools and utilities:

- **[HTTP](/api/resources/http/http/)** - HTTP request and response handling

## Configuration Types

HCL configuration patterns and structures:

- **[Resource](/api/types/resource/)** - Resource definition patterns
- **[Variable](/api/types/variable/)** - Variable declarations and usage
- **[Local](/api/types/local/)** - Local value computations
- **[Output](/api/types/output/)** - Output value definitions
- **[Module](/api/types/module/)** - Module organization and reuse

## Functions

Built-in functions for dynamic configuration:

- **[Functions Reference](/api/functions/)** - Complete list of available functions and usage examples

## Getting Started

New to lab configuration? Start with these essential resources:

1. **[Lab](/api/resources/lab/lab/)** - Define your lab structure and metadata
2. **[Container](/api/resources/container/container/)** - Set up your sandbox environment
3. **[Page](/api/resources/page/page/)** - Create instructional content
4. **[Task](/api/resources/task/task/)** - Add interactive elements

## Advanced Topics

For complex lab scenarios, explore:

- **[Sandbox Overview](/api/sandbox/)** - Infrastructure patterns and best practices
- **[Configuration Types](/api/types/)** - Advanced HCL patterns
- **[Cloud Integration](/api/resources/aws/account/)** - Multi-cloud lab environments