---
title: ServicePrincipal
description: Configuration reference for the azure resource in Instruqt labs
---


## ServicePrincipal

Azure Service Principal

```hcl

resource "azure_subscription" "name" {
service_principal "name" {
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
<tr id="serviceprincipal-name">
  <td class="left" width="40%" align="left" valign="top">
    <strong>Name</strong> <code>name</code> <em>required</em><br/><br/><br/>
    type: <code>string</code><br/>
    
  </td>
  <td class="right" width="60%" align="left" valign="top">
    The name of the service principal.

```hcl
service_principal "name" {
  ...
}
```
    
  </td>
</tr>
<tr id="serviceprincipal-roles">
  <td class="left" width="40%" align="left" valign="top">
    <strong>Roles</strong> <code>roles</code> <br/><br/>
    type: <code>[]string</code><br/>
    
  </td>
  <td class="right" width="60%" align="left" valign="top">
    The roles that will be assigned to the service principal.

```hcl
roles = ["Owner"]
```
    
  </td>
</tr>
<tr id="serviceprincipal-service_principal_id">
  <td class="left" width="40%" align="left" valign="top">
    <strong>ServicePrincipalID</strong> <code>service_principal_id</code> <br/><br/>
    type: <code>string</code><br/>
    
  </td>
  <td class="right" width="60%" align="left" valign="top">
    Output parameters
    
  </td>
</tr>
<tr id="serviceprincipal-app_id">
  <td class="left" width="40%" align="left" valign="top">
    <strong>AppID</strong> <code>app_id</code> <br/><br/>
    type: <code>string</code><br/>
    
  </td>
  <td class="right" width="60%" align="left" valign="top">
    
    
  </td>
</tr>
<tr id="serviceprincipal-password">
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

