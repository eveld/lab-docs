---
title: ServiceAccount
description: Configuration reference for the google resource in Instruqt labs
---


## ServiceAccount

Google Cloud Service Account

```hcl

resource "google_project" "name" {
service_account "name" {
  ...
}
}

```

#### Attributes

<table border="0" width="100%">
<tr>
  <th>Attribute</th>
  <th>Description</th>
</tr>
<tr id="serviceaccount-name">
  <td class="left" width="40%" align="left" valign="top">
    <strong>Name</strong> <code>name</code> <em>required</em><br/><br/><br/>
    type: <code>string</code><br/>
    
  </td>
  <td class="right" width="60%" align="left" valign="top">
    The name of the service account.

```hcl
service_account "name" {
  ...
}
```
    
  </td>
</tr>
<tr id="serviceaccount-roles">
  <td class="left" width="40%" align="left" valign="top">
    <strong>Roles</strong> <code>roles</code> <br/><br/>
    type: <code>[]string</code><br/>
    
  </td>
  <td class="right" width="60%" align="left" valign="top">
    The roles that will be assigned to the service account.

```hcl
roles = ["Owner"]
```
    
  </td>
</tr>
<tr id="serviceaccount-email">
  <td class="left" width="40%" align="left" valign="top">
    <strong>Email</strong> <code>email</code> <br/><br/>
    type: <code>string</code><br/>
    
  </td>
  <td class="right" width="60%" align="left" valign="top">
    Output parameters
    
  </td>
</tr>
<tr id="serviceaccount-key">
  <td class="left" width="40%" align="left" valign="top">
    <strong>Key</strong> <code>key</code> <br/><br/>
    type: <code>string</code><br/>
    
  </td>
  <td class="right" width="60%" align="left" valign="top">
    
    
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

