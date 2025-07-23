---
title: Google Cloud
description: Configuration reference for the google resource in Instruqt labs
---


## Project

Google Cloud Project

```hcl

resource "google_project" "name" {
  ...
}

```

#### Attributes

| Attribute                                                                                                                                                         | Description                                                                                                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p><strong>Regions</strong> <code>regions</code><br><br>type: <code>[]string</code><br></p>                                                                       | <p>The regions infrastructure can be provisioned into.</p><pre class="language-hcl"><code class="lang-hcl">regions = ["westeurope"]
</code></pre>                                             |
| <p><strong>Services</strong> <code>services</code><br><br>type: <code>[]string</code><br></p>                                                                     | <p>The services to allow access to.</p><pre class="language-hcl"><code class="lang-hcl">services = ["compute.googleapis.com"]
</code></pre>                                                   |
| <p><strong>Labels</strong> <code>labels</code><br><br>type: <code>map[string]string</code><br></p>                                                                | <p>Labels to add to the project.</p><pre class="language-hcl"><code class="lang-hcl">labels = {
  key = "value"
}
</code></pre>                                                               |
| <p><strong>Users</strong> <code>user</code><br><br>type: <code>[]block</code> <a href="project.md#user">User</a><br></p>                                          | <p>Users that will be created within the project.</p><pre class="language-hcl"><code class="lang-hcl">user "admin" {
  roles = [
    "roles/editor"
  ]
}
</code></pre>                       |
| <p><strong>ServiceAccounts</strong> <code>service_account</code><br><br>type: <code>[]block</code> <a href="project.md#serviceaccount">ServiceAccount</a><br></p> | <p>Service Accounts that will be created within the project.</p><pre class="language-hcl"><code class="lang-hcl">service_account "admin" {
  roles = [
    "roles/editor"
  ]
}
</code></pre> |
| <p><strong>ProjectID</strong> <code>project_id</code><br><br>type: <code>string</code><br></p>                                                                    | Output parameters                                                                                                                                                                             |
| <p><strong>ProjectName</strong> <code>project_name</code><br><br>type: <code>string</code><br></p>                                                                |                                                                                                                                                                                               |

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

Google Cloud User

```hcl

resource "google_project" "name" {
user "name" {
  ...
}
}

```

#### Attributes

| Attribute                                                                                                 | Description                                                                                                                                |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| <p><strong>Name</strong> <code>name</code> <em>required</em><br><br><br>type: <code>string</code><br></p> | <p>The username of the user.</p><pre class="language-hcl"><code class="lang-hcl">user "username" {
  ...
}
</code></pre>                   |
| <p><strong>Roles</strong> <code>roles</code><br><br>type: <code>[]string</code><br></p>                   | <p>The roles that will be assigned to the user.</p><pre class="language-hcl"><code class="lang-hcl">roles = ["roles/editor"]
</code></pre> |
| <p><strong>Email</strong> <code>email</code><br><br>type: <code>string</code><br></p>                     | Output parameters                                                                                                                          |
| <p><strong>Password</strong> <code>password</code><br><br>type: <code>string</code><br></p>               |                                                                                                                                            |

#### Computed Attributes

These attributes are computed when the config is parsed and applied, and are\
therefore only known at parsetime or runtime.

\
\


***

### ServiceAccount

Google Cloud Service Account

```hcl

resource "google_project" "name" {
service_account "name" {
  ...
}
}

```

#### Attributes

| Attribute                                                                                                 | Description                                                                                                                                    |
| --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| <p><strong>Name</strong> <code>name</code> <em>required</em><br><br><br>type: <code>string</code><br></p> | <p>The name of the service account.</p><pre class="language-hcl"><code class="lang-hcl">service_account "name" {
  ...
}
</code></pre>         |
| <p><strong>Roles</strong> <code>roles</code><br><br>type: <code>[]string</code><br></p>                   | <p>The roles that will be assigned to the service account.</p><pre class="language-hcl"><code class="lang-hcl">roles = ["Owner"]
</code></pre> |
| <p><strong>Email</strong> <code>email</code><br><br>type: <code>string</code><br></p>                     | Output parameters                                                                                                                              |
| <p><strong>Key</strong> <code>key</code><br><br>type: <code>string</code><br></p>                         |                                                                                                                                                |

#### Computed Attributes

These attributes are computed when the config is parsed and applied, and are\
therefore only known at parsetime or runtime.
