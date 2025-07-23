---
title: Helm
description: Configuration reference for the helm resource in Instruqt labs
---



The helm resource deploys Helm charts to Kubernetes clusters. It supports charts from remote repositories, local directories, or Git references, with comprehensive configuration options for values, namespaces, and health checks.

## HCL Syntax

### Basic Syntax

```hcl
resource "helm" "name" {
  cluster = resource.k8s_cluster.main
  chart = "nginx"
  
  repository {
    name = "bitnami"
    url = "https://charts.bitnami.com/bitnami"
  }
}
```

### Full Syntax

```hcl
resource "helm" "name" {
  cluster = resource.k8s_cluster.production
  
  chart = "vault"
  version = "0.25.0"
  namespace = "vault"
  create_namespace = true
  
  repository {
    name = "hashicorp"
    url = "https://helm.releases.hashicorp.com"
  }
  
  values = "./values/vault-values.yaml"
  values_string = {
    "server.ha.enabled" = "true"
    "server.ha.replicas" = "3"
    "ui.enabled" = "true"
  }
  
  skip_crds = false
  retry = 3
  timeout = "300s"
  
  health_check {
    timeout = "120s"
    pods = [
      "app.kubernetes.io/name=vault",
      "app.kubernetes.io/instance=vault"
    ]
  }
}
```

## Arguments

### Core Configuration

Essential settings for Helm chart deployment.

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| **cluster** | reference | **Yes** | - | Reference to a k8s_cluster resource |
| **chart** | string | **Yes** | - | Chart name or path (repository chart, local path, or Git URL) |
| version | string | No | Latest | Semver version of the chart (repository charts only) |
| namespace | string | No | "default" | Kubernetes namespace for deployment |
| create_namespace | bool | No | false | Create namespace if it doesn't exist |

### Repository Configuration

Settings for remote Helm chart repositories.

| Field | Type | Required | Description |
|-------|------|----------|--------------|
| **repository** | block | | **Remote repository configuration** |
| ↳ name | string | ✓ | Repository name |
| ↳ url | string | ✓ | Repository URL |

### Values Configuration

Chart values and configuration options.

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| values | string | No | - | Path to YAML values file |
| values_string | map(string) | No | {} | Inline values as key-value pairs |

### Installation Options

Advanced deployment settings.

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| skip_crds | bool | No | false | Skip installation of Custom Resource Definitions |
| retry | int | No | 0 | Number of retry attempts on failure |
| timeout | string | No | "300s" | Maximum time for chart installation |

### Health Check Configuration

Post-deployment health verification.

| Field | Type | Required | Description |
|-------|------|----------|--------------|
| **health_check** | block | | **Kubernetes health check configuration** |
| ↳ timeout | string | ✓ | Health check timeout duration |
| ↳ pods | list(string) | ✓ | Kubernetes selectors for pods to monitor |

## Validation Rules

- Chart paths are made absolute relative to the config file location
- Values file paths are made absolute relative to the config file location
- Referenced cluster must exist and be healthy
- Repository URL must be valid if specified
- Timeout values must be valid Go duration strings
- Health check selectors must use valid Kubernetes label syntax

## Examples

### Simple Chart from Repository

```hcl
resource "k8s_cluster" "dev" {
  network {
    id = resource.network.main
  }
}

resource "helm" "nginx" {
  cluster = resource.k8s_cluster.dev
  chart = "nginx"
  
  repository {
    name = "bitnami"
    url = "https://charts.bitnami.com/bitnami"
  }
  
  values_string = {
    "service.type" = "ClusterIP"
    "replicaCount" = "2"
  }
}
```

### Chart with External Values File

```hcl
resource "helm" "wordpress" {
  cluster = resource.k8s_cluster.web
  chart = "wordpress"
  version = "15.2.0"
  namespace = "wordpress"
  create_namespace = true
  
  repository {
    name = "bitnami"
    url = "https://charts.bitnami.com/bitnami"
  }
  
  values = "./values/wordpress-production.yaml"
  
  values_string = {
    "wordpressPassword" = "secure-password"
    "mariadb.auth.rootPassword" = "root-password"
  }
  
  health_check {
    timeout = "300s"
    pods = ["app.kubernetes.io/name=wordpress"]
  }
}
```

### Local Chart Directory

```hcl
resource "helm" "custom_app" {
  cluster = resource.k8s_cluster.dev
  chart = "./charts/my-application"
  namespace = "apps"
  create_namespace = true
  
  values_string = {
    "image.tag" = "latest"
    "service.port" = "8080"
  }
  
  health_check {
    timeout = "120s"
    pods = ["app=my-application"]
  }
}
```

### High Availability Setup

```hcl
resource "helm" "vault" {
  cluster = resource.k8s_cluster.production
  chart = "vault"
  version = "0.25.0"
  namespace = "vault-system"
  create_namespace = true
  
  repository {
    name = "hashicorp"
    url = "https://helm.releases.hashicorp.com"
  }
  
  values = "./config/vault-ha.yaml"
  
  values_string = {
    "server.ha.enabled" = "true"
    "server.ha.replicas" = "3"
    "server.ha.raft.enabled" = "true"
    "ui.enabled" = "true"
    "ui.serviceType" = "LoadBalancer"
    "server.resources.requests.memory" = "256Mi"
    "server.resources.requests.cpu" = "250m"
  }
  
  retry = 3
  timeout = "600s"
  
  health_check {
    timeout = "300s"
    pods = [
      "app.kubernetes.io/name=vault",
      "component=server"
    ]
  }
}
```

### Chart from Git Repository

```hcl
resource "helm" "git_chart" {
  cluster = resource.k8s_cluster.dev
  chart = "git+https://github.com/my-org/helm-charts.git//charts/myapp?ref=v1.0.0"
  namespace = "development"
  create_namespace = true
  
  values_string = {
    "environment" = "dev"
    "debug" = "true"
  }
  
  health_check {
    timeout = "180s"
    pods = ["app=myapp"]
  }
}
```

### Multiple Charts with Dependencies

```hcl
# Database
resource "helm" "postgresql" {
  cluster = resource.k8s_cluster.app
  chart = "postgresql"
  version = "12.1.0"
  namespace = "database"
  create_namespace = true
  
  repository {
    name = "bitnami"
    url = "https://charts.bitnami.com/bitnami"
  }
  
  values_string = {
    "auth.postgresPassword" = "postgres-password"
    "auth.database" = "myapp"
  }
  
  health_check {
    timeout = "120s"
    pods = ["app.kubernetes.io/name=postgresql"]
  }
}

# Redis Cache
resource "helm" "redis" {
  cluster = resource.k8s_cluster.app
  chart = "redis"
  version = "17.3.0"
  namespace = "cache"
  create_namespace = true
  
  repository {
    name = "bitnami"
    url = "https://charts.bitnami.com/bitnami"
  }
  
  values_string = {
    "auth.enabled" = "false"
    "master.persistence.enabled" = "true"
  }
  
  health_check {
    timeout = "90s"
    pods = ["app.kubernetes.io/name=redis"]
  }
}

# Application (depends on database and cache)
resource "helm" "myapp" {
  depends_on = [
    resource.helm.postgresql,
    resource.helm.redis
  ]
  
  cluster = resource.k8s_cluster.app
  chart = "./charts/myapp"
  namespace = "application"
  create_namespace = true
  
  values_string = {
    "database.host" = "postgresql.database.svc.cluster.local"
    "database.name" = "myapp"
    "cache.host" = "redis.cache.svc.cluster.local"
    "replicas" = "3"
  }
  
  health_check {
    timeout = "180s"
    pods = ["app=myapp"]
  }
}
```

## Values File Examples

### Example values.yaml for production

```yaml
# ./values/webapp-production.yaml
replicaCount: 3

image:
  repository: myapp/webapp
  tag: "1.2.0"
  pullPolicy: Always

service:
  type: LoadBalancer
  port: 80
  targetPort: 8080

resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 250m
    memory: 256Mi

autoscaling:
  enabled: true
  minReplicas: 3
  maxReplicas: 10
  targetCPUUtilizationPercentage: 70

ingress:
  enabled: true
  className: "nginx"
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
  hosts:
    - host: webapp.example.com
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: webapp-tls
      hosts:
        - webapp.example.com
```

## Integration with Other Resources

### With Service Resources
```hcl
resource "helm" "api" {
  cluster = resource.k8s_cluster.app
  chart = "api"
  namespace = "default"
  
  repository {
    name = "mycompany"
    url = "https://charts.mycompany.com"
  }
}

resource "service" "api" {
  name = "api"
  port = 8080
  
  target {
    resource = resource.k8s_cluster.app
    named_port = "http"
    config = {
      selector = "app=api"
    }
  }
}
```

### With Ingress Resources
```hcl
resource "ingress" "web" {
  port = 80
  
  target {
    resource = resource.k8s_cluster.app
    named_port = "http"
    config = {
      selector = "app.kubernetes.io/name=webapp"
    }
  }
}
```

## Best Practices

1. **Version Pinning**: Always specify chart versions in production environments
2. **Namespace Isolation**: Use dedicated namespaces for different applications
3. **Values Management**: Store complex values in external YAML files
4. **Health Checks**: Configure appropriate health checks for critical applications
5. **Resource Limits**: Set CPU and memory limits in chart values
6. **Secrets Management**: Use Kubernetes secrets or external secret management
7. **Retry Logic**: Enable retries for network-dependent installations
8. **Timeout Configuration**: Set appropriate timeouts for complex charts

## Common Use Cases

1. **Application Deployment**: Deploying microservices and web applications
2. **Infrastructure Services**: Setting up databases, caches, and messaging systems
3. **Monitoring Stack**: Installing Prometheus, Grafana, and observability tools
4. **CI/CD Pipeline**: Deploying development and staging environments
5. **Security Tools**: Installing security scanners and policy engines
6. **Service Mesh**: Deploying Istio, Linkerd, or other mesh solutions