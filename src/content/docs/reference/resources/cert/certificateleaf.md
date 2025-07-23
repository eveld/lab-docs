---
title: Certificate Leaf
description: Configuration reference for the cert resource in Instruqt labs
---


The `certificate_leaf` resource generates leaf certificates signed by a Certificate Authority (CA). These are end-entity certificates used for servers, clients, or other applications that need TLS/SSL certificates.

## Basic Syntax

```hcl
resource "certificate_leaf" "server" {
  ca_key  = resource.certificate_ca.root.private_key.path
  ca_cert = resource.certificate_ca.root.certificate.path
  output  = "./server-certs"
}
```

## Full Syntax

```hcl
resource "certificate_leaf" "server" {
  ca_key  = resource.certificate_ca.root.private_key.path
  ca_cert = resource.certificate_ca.root.certificate.path
  output  = "./server-certs"
  
  dns_names = [
    "localhost",
    "server.local",
    "api.example.com"
  ]
  
  ip_addresses = [
    "127.0.0.1",
    "192.168.1.100",
    "10.0.0.5"
  ]
}
```

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `ca_key` | `string` | ✓ | Path to the CA private key file |
| `ca_cert` | `string` | ✓ | Path to the CA certificate file |
| `output` | `string` | ✓ | Output directory to write the certificate and key files |
| `dns_names` | `[]string` |  | DNS names to include in the certificate's Subject Alternative Names |
| `ip_addresses` | `[]string` |  | IP addresses to include in the certificate's Subject Alternative Names |

## Computed Fields

| Field | Type | Description |
|-------|------|-------------|
| `meta.id` | `string` | Full resource identifier |
| `meta.type` | `string` | Resource type (always `"certificate_leaf"`) |
| `meta.name` | `string` | Resource name |
| `private_key` | `File` | The private key of the generated certificate |
| `public_key_pem` | `File` | The PEM-formatted public key |
| `public_key_ssh` | `File` | The SSH-formatted public key |
| `certificate` | `File` | The generated leaf certificate |

## File Object

The `File` object contains information about generated certificate files:

| Field | Type | Description |
|-------|------|-------------|
| `filename` | `string` | The name of the file |
| `directory` | `string` | The directory where the file is written |
| `path` | `string` | The full path to the file |
| `contents` | `string` | The contents of the file |

## Examples

### Simple Server Certificate

```hcl
resource "certificate_ca" "root" {
  output = "./ca"
}

resource "certificate_leaf" "server" {
  ca_key  = resource.certificate_ca.root.private_key.path
  ca_cert = resource.certificate_ca.root.certificate.path
  output  = "./server-certs"
  
  dns_names = ["localhost"]
  ip_addresses = ["127.0.0.1"]
}
```

### Multi-Domain Certificate

```hcl
resource "certificate_leaf" "web" {
  ca_key  = resource.certificate_ca.root.private_key.path
  ca_cert = resource.certificate_ca.root.certificate.path
  output  = "./web-certs"
  
  dns_names = [
    "example.com",
    "www.example.com", 
    "api.example.com",
    "admin.example.com"
  ]
  
  ip_addresses = [
    "192.168.1.10",
    "10.0.0.100"
  ]
}
```

### Client Certificate

```hcl
resource "certificate_leaf" "client" {
  ca_key  = resource.certificate_ca.root.private_key.path
  ca_cert = resource.certificate_ca.root.certificate.path
  output  = "./client-certs"
  
  dns_names = ["client.internal"]
}
