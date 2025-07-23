---
title: Number
description: Configuration reference for the random resource in Instruqt labs
---


## RandomNumber

The `random_number` resource allows the creation of random numbers.

```hcl

resource "random_number" "name" {
  ...
}

```

#### Attributes

| Attribute                                                                                                    | Description                                                                                                         |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| <p><strong>Minimum</strong> <code>minimum</code> <em>required</em><br><br><br>type: <code>int</code><br></p> | <p>The minimum number to generate.</p><pre class="language-hcl"><code class="lang-hcl">minimum = 1000
</code></pre> |
| <p><strong>Maximum</strong> <code>maximum</code> <em>required</em><br><br><br>type: <code>int</code><br></p> | <p>The maximum number to generate.</p><pre class="language-hcl"><code class="lang-hcl">maximum = 2000
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
| <p><strong>Value</strong> <code>value</code><br><br>type: <code>int</code></p>      | The generated random number.                                                                                                                                                                                                                                                                                |

## Examples

####

```hcl

resource "random_number" "port" {
  minimum = 10000
  maximum = 20000
}

output "random_number" {
  value = resource.random_number.port.value
}

```
