---
title: User
description: Configuration reference for the google resource in Instruqt labs
---


## User

Google Cloud User

```hcl

resource "google_project" "name" {
user "name" {
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
<tr id="user-name">
  <td class="left" width="40%" align="left" valign="top">
    <strong>Name</strong> <code>name</code> <em>required</em><br/><br/><br/>
    type: <code>string</code><br/>
    
  </td>
  <td class="right" width="60%" align="left" valign="top">
    The username of the user.

```hcl
user "username" {
  ...
}
```
    
  </td>
</tr>
<tr id="user-roles">
  <td class="left" width="40%" align="left" valign="top">
    <strong>Roles</strong> <code>roles</code> <br/><br/>
    type: <code>[]string</code><br/>
    
  </td>
  <td class="right" width="60%" align="left" valign="top">
    The roles that will be assigned to the user.

```hcl
roles = ["roles/editor"]
```
    
  </td>
</tr>
<tr id="user-email">
  <td class="left" width="40%" align="left" valign="top">
    <strong>Email</strong> <code>email</code> <br/><br/>
    type: <code>string</code><br/>
    
  </td>
  <td class="right" width="60%" align="left" valign="top">
    Output parameters
    
  </td>
</tr>
<tr id="user-password">
  <td class="left" width="40%" align="left" valign="top">
    <strong>Password</strong> <code>password</code> <br/><br/>
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

