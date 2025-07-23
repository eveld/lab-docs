---
title: User
description: Configuration reference for the aws resource in Instruqt labs
---


## User

User

```hcl

resource "aws_account" "name" {
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
<tr id="user-iam_policy">
  <td class="left" width="40%" align="left" valign="top">
    <strong>IAMPolicy</strong> <code>iam_policy</code> <br/><br/>
    type: <code>string</code><br/>
    
  </td>
  <td class="right" width="60%" align="left" valign="top">
    The IAM policy to apply to the user.

```hcl
iam_policy = file("./files/policy.json")
```
    
  </td>
</tr>
<tr id="user-managed_policies">
  <td class="left" width="40%" align="left" valign="top">
    <strong>ManagedPolicies</strong> <code>managed_policies</code> <br/><br/>
    type: <code>[]string</code><br/>
    
  </td>
  <td class="right" width="60%" align="left" valign="top">
    The managed policies to apply to the user.

```hcl
managed_policies = [
  "arn:aws:iam::aws:policy/AmazonSQSFullAccess",
  "arn:aws:iam::aws:policy/AmazonEC2FullAccess"
]
```
    
  </td>
</tr>
<tr id="user-username">
  <td class="left" width="40%" align="left" valign="top">
    <strong>Username</strong> <code>username</code> <br/><br/>
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
<tr id="user-access_key">
  <td class="left" width="40%" align="left" valign="top">
    <strong>AccessKey</strong> <code>access_key</code> <br/><br/>
    type: <code>AccessKey</code><br/>
    
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

