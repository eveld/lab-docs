---
title: Output
description: Configuration reference for the build resource in Instruqt labs
---


## Output

```hcl

output {
  ...
}

```

#### Attributes

<table border="0" width="100%">
<tr>
  <th>Attribute</th>
  <th>Description</th>
</tr>
<tr id="output-source">
  <td class="left" width="40%" align="left" valign="top">
    <strong>Source</strong> <code>source</code> <em>required</em><br/><br/><br/>
    type: <code>string</code><br/>
    
  </td>
  <td class="right" width="60%" align="left" valign="top">
    Source file or directory in container
    
  </td>
</tr>
<tr id="output-destination">
  <td class="left" width="40%" align="left" valign="top">
    <strong>Destination</strong> <code>destination</code> <em>required</em><br/><br/><br/>
    type: <code>string</code><br/>
    
  </td>
  <td class="right" width="60%" align="left" valign="top">
    Destination for copied file or directory
    
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

