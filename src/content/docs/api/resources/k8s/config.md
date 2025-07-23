---
title: Config
description: Configuration reference for the k8s resource in Instruqt labs
---


## Config

The `kubernetes_config` resource allows Kubernetes configuraton to be applied to a `kubernetes_cluster`.

You can specify a list of paths or individual files and health checks for the resources.\
A `kubernetes_config` only completes once the configuration has been successfully applied and any health checks have passed.\
This allows you to create complex dependencies for your applications.

The system monitors changes to the config defined in the paths property and automatically recreates this resource when the\
configuration is applied.

```hcl

resource "kubernetes_config" "name" {
  ...
}

```

#### Attributes

| Attribute                                                                                                                                                             | Description                                                                                                                                                                                                                                                                                                                            |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p><strong>Cluster</strong> <code>cluster</code> <em>required</em><br><br><br>type: Reference to <a href="cluster.md">Cluster</a><br></p>                             | <p>The reference to a cluster to apply the jobs to.<br>Kubernetes config is only applied when the referenced cluster is created and healthy.</p><pre class="language-hcl"><code class="lang-hcl">cluster = resource.kubernetes_cluster.dev
</code></pre>                                                                               |
| <p><strong>Paths</strong> <code>paths</code> <em>required</em><br><br><br>type: <code>[]string</code><br></p>                                                         | <p>Paths to the Kubernetes config files to apply to the cluster.</p><pre class="language-hcl"><code class="lang-hcl">paths = ["./files/kubernetes", "./k8s/pods.yaml"]
</code></pre>                                                                                                                                                   |
| <p><strong>WaitUntilReady</strong> <code>wait_until_ready</code> <em>required</em><br><br><br>type: <code>bool</code><br></p>                                         | <p>Determines if the resource waits until all config defined in the paths has been accepted and started by the server.<br>If set to `false` the resource returns immediately after submitting the job.</p><pre class="language-hcl"><code class="lang-hcl">wait_until_ready = true
</code></pre>                                       |
| <p><strong>HealthCheck</strong> <code>health_check</code><br><br>type: <code>block</code> <a href="config.md#healthcheckkubernetes">HealthCheckKubernetes</a><br></p> | <p>Optional health check to perform after the jobs have been applied, this resource will not complete until the health<br>checks are passing.</p><pre class="language-hcl"><code class="lang-hcl">health_check {
  timeout = "60s"
  pods = [
    "component=server,app=consul",
    "component=client,app=consul"
  ]
}
</code></pre> |

#### Computed Attributes

These attributes are computed when the config is parsed and applied, and are\
therefore only known at parsetime or runtime.

| Attribute                                                                           | Description                                                                                                                                                                                                                                                                                                 |
| ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p><strong>Meta ID</strong> <code>meta.id</code><br><br><code>string</code></p>     | <p>The full ID of the resource e.g. `resource.type.name`.<br>This is computed from the full resource path:</p><pre class="language-hcl"><code class="lang-hcl">// given the following resource
resource "container" "ubuntu" {
  ...
}

// the resulting id will be
resource.container.ubuntu
</code></pre> |
| <p><strong>Meta Type</strong> <code>meta.type</code><br><br><code>string</code></p> | <p>The type of the resource.<br>This taken from the type label of the resource definition.</p><pre class="language-hcl"><code class="lang-hcl">// given the following resource
resource "container" "ubuntu" {
  ...
}

// the resulting type will be
container
</code></pre>                               |
| <p><strong>Meta Name</strong> <code>meta.name</code><br><br><code>string</code></p> | <p>The name of the resource.<br>This taken from the name label of the resource definition.</p><pre class="language-hcl"><code class="lang-hcl">// given the following resource
resource "container" "ubuntu" {
  ...
}

// the resulting name will be
ubuntu
</code></pre>                                  |

\
\


***

### HealthCheckKubernetes

A `health_check` stanza allows the definition of a health check which must pass before the resource is marked as successfully created.

```hcl

health_check {
  ...
}

```

#### Attributes

| Attribute                                                                                                       | Description                                                                                                                                                                                                                                                             |
| --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p><strong>Timeout</strong> <code>timeout</code> <em>required</em><br><br><br>type: <code>string</code><br></p> | <p>The maximum duration to wait before marking the health check as failed.<br>Expressed as a Go duration, e.g. `1s` = 1 second, `100ms` = 100 milliseconds.</p><pre class="language-hcl"><code class="lang-hcl">timeout = "60s"
</code></pre>                           |
| <p><strong>Pods</strong> <code>pods</code> <em>required</em><br><br><br>type: <code>[]string</code><br></p>     | <p>An array of kubernetes selector syntax.<br>The healthcheck ensures that all containers defined by the selector are running before passing the healthcheck.</p><pre class="language-hcl"><code class="lang-hcl">pods = ["app.kubernetes.io/name=vault"]
</code></pre> |

#### Computed Attributes

These attributes are computed when the config is parsed and applied, and are\
therefore only known at parsetime or runtime.
