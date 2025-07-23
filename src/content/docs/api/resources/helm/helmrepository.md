---
title: HelmRepository
description: Configuration reference for the helm resource in Instruqt labs
---


## HelmRepository

A `helm_repository` stanza defines the details for a remote helm repository.

```hcl

helm_repository {
  ...
}

```

#### Attributes

<table border="0" width="100%">
<tr>
  <th>Attribute</th>
  <th>Description</th>
</tr>
<tr id="helmrepository-name">
  <td class="left" width="40%" align="left" valign="top">
    <strong>Name</strong> <code>name</code> <em>required</em><br/><br/><br/>
    type: <code>string</code><br/>
    
  </td>
  <td class="right" width="60%" align="left" valign="top">
    The name of the repository.

```hcl
name = "hashicorp"
```
    
  </td>
</tr>
<tr id="helmrepository-url">
  <td class="left" width="40%" align="left" valign="top">
    <strong>URL</strong> <code>url</code> <em>required</em><br/><br/><br/>
    type: <code>string</code><br/>
    
  </td>
  <td class="right" width="60%" align="left" valign="top">
    The repository URL.

```hcl
url  = "https://helm.releases.hashicorp.com"
```
    
  </td>
</tr>
</table>

#### Computed Attributes

These attributes are computed when the config is parsed and applied, and are 
therefore only known at parsetime or runtime.

<table border="0" width="100%">
<tr>
  <th>Attribute</th>
  <th>Description</th>
</tr>

</table>

