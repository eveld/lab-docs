---
title: Certificate CA
description: Configuration reference for the cert resource in Instruqt labs
---


The `certificate_ca` resource generates Certificate Authority (CA) certificates and keys. This is used to create root certificates that can sign other certificates in your lab environment.

## Basic Syntax

```hcl
resource "certificate_ca" "root" {
  output = "./certs"
}
```

## Full Syntax

```hcl
resource "certificate_ca" "root" {
  output = "./certificates"
}
```

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `output` | `string` | ✓ | Output directory to write the certificate and key files |

## Computed Fields

| Field | Type | Description |
|-------|------|-------------|
| `meta.id` | `string` | Full resource identifier |
| `meta.type` | `string` | Resource type (always `"certificate_ca"`) |
| `meta.name` | `string` | Resource name |
| `private_key` | `File` | The private key of the generated CA certificate |
| `public_key_pem` | `File` | The PEM-formatted public key |
| `public_key_ssh` | `File` | The SSH-formatted public key |
| `certificate` | `File` | The generated CA certificate |

## File Object

The `File` object contains information about generated certificate files:

| Field | Type | Description |
|-------|------|-------------|
| `filename` | `string` | The name of the file |
| `directory` | `string` | The directory where the file is written |
| `path` | `string` | The full path to the file |
| `contents` | `string` | The contents of the file |

## Examples

### Simple CA Certificate

```hcl
resource "certificate_ca" "root" {
  output = "./certs"
}
```

### Using CA Certificate with Other Resources

```hcl
resource "certificate_ca" "root" {
  output = "./certificates"
}

resource "certificate_leaf" "server" {
  ca_key  = resource.certificate_ca.root.private_key.path
  ca_cert = resource.certificate_ca.root.certificate.path
  output  = "./server-certs"
  
  dns_names    = ["localhost", "server.local"]
  ip_addresses = ["127.0.0.1", "192.168.1.100"]
}
