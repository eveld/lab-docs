---
title: Azure
description: Configuration reference for the azure resource in Instruqt labs
---


## Subscription

Azure Subscription

```hcl

resource "azure_subscription" "name" {
  ...
}

```

#### Attributes

| Attribute                                                                                                                                                                      | Description                                                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p><strong>Regions</strong> <code>regions</code><br><br>type: <code>[]string</code><br></p>                                                                                    | <p>The regions infrastructure can be provisioned into.</p><pre class="language-hcl"><code class="lang-hcl">regions = ["westeurope"]
</code></pre>                                               |
| <p><strong>Services</strong> <code>services</code><br><br>type: <code>[]string</code><br></p>                                                                                  | <p>The services to allow access to.</p><pre class="language-hcl"><code class="lang-hcl">services = ["Microsoft.Compute"]
</code></pre>                                                          |
| <p><strong>Tags</strong> <code>tags</code><br><br>type: <code>map[string]string</code><br></p>                                                                                 | <p>Tags to add to the subscription.</p><pre class="language-hcl"><code class="lang-hcl">tags = {
  key = "value"
}
</code></pre>                                                                |
| <p><strong>Users</strong> <code>user</code><br><br>type: <code>[]block</code> <a href="subscription.md#user">User</a><br></p>                                                  | <p>Users that will be created within the subscription.</p><pre class="language-hcl"><code class="lang-hcl">user "admin" {
  roles = [
    "Owner"
  ]
}
</code></pre>                           |
| <p><strong>ServicePrincipals</strong> <code>service_principal</code><br><br>type: <code>[]block</code> <a href="subscription.md#serviceprincipal">ServicePrincipal</a><br></p> | <p>Service Principals that will be created within the subscription.</p><pre class="language-hcl"><code class="lang-hcl">service_principal "admin" {
  roles = [
    "Owner"
  ]
}
</code></pre> |
| <p><strong>TenantID</strong> <code>tenant_id</code><br><br>type: <code>string</code><br></p>                                                                                   | Output parameters                                                                                                                                                                               |
| <p><strong>SubscriptionID</strong> <code>subscription_id</code><br><br>type: <code>string</code><br></p>                                                                       |                                                                                                                                                                                                 |

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

### User

Azure User

```hcl

resource "azure_subscription" "name" {
user "name" {
  ...
}
}

```

#### Attributes

| Attribute                                                                                                 | Description                                                                                                                         |
| --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| <p><strong>Name</strong> <code>name</code> <em>required</em><br><br><br>type: <code>string</code><br></p> | <p>The username of the user.</p><pre class="language-hcl"><code class="lang-hcl">user "username" {
  ...
}
</code></pre>            |
| <p><strong>Roles</strong> <code>roles</code><br><br>type: <code>[]string</code><br></p>                   | <p>The roles that will be assigned to the user.</p><pre class="language-hcl"><code class="lang-hcl">roles = ["Owner"]
</code></pre> |
| <p><strong>UserID</strong> <code>user_id</code><br><br>type: <code>string</code><br></p>                  | Output parameters                                                                                                                   |
| <p><strong>Username</strong> <code>username</code><br><br>type: <code>string</code><br></p>               |                                                                                                                                     |
| <p><strong>Password</strong> <code>password</code><br><br>type: <code>string</code><br></p>               |                                                                                                                                     |

#### Computed Attributes

These attributes are computed when the config is parsed and applied, and are\
therefore only known at parsetime or runtime.

\
\


***

### ServicePrincipal

Azure Service Principal

```hcl

resource "azure_subscription" "name" {
service_principal "name" {
  ...
}
}

```

#### Attributes

| Attribute                                                                                                         | Description                                                                                                                                      |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| <p><strong>Name</strong> <code>name</code> <em>required</em><br><br><br>type: <code>string</code><br></p>         | <p>The name of the service principal.</p><pre class="language-hcl"><code class="lang-hcl">service_principal "name" {
  ...
}
</code></pre>       |
| <p><strong>Roles</strong> <code>roles</code><br><br>type: <code>[]string</code><br></p>                           | <p>The roles that will be assigned to the service principal.</p><pre class="language-hcl"><code class="lang-hcl">roles = ["Owner"]
</code></pre> |
| <p><strong>ServicePrincipalID</strong> <code>service_principal_id</code><br><br>type: <code>string</code><br></p> | Output parameters                                                                                                                                |
| <p><strong>AppID</strong> <code>app_id</code><br><br>type: <code>string</code><br></p>                            |                                                                                                                                                  |
| <p><strong>Password</strong> <code>password</code><br><br>type: <code>string</code><br></p>                       |                                                                                                                                                  |

#### Computed Attributes

These attributes are computed when the config is parsed and applied, and are\
therefore only known at parsetime or runtime.
