---
title: BuildContainer
description: Configuration reference for the build resource in Instruqt labs
---


## BuildContainer

```hcl

container {
  ...
}

```

#### Attributes

<table border="0" width="100%">
<tr>
  <th>Attribute</th>
  <th>Description</th>
</tr>
<tr id="buildcontainer-context">
  <td class="left" width="40%" align="left" valign="top">
    <strong>Context</strong> <code>context</code> <em>required</em><br/><br/><br/>
    type: <code>string</code><br/>
    
  </td>
  <td class="right" width="60%" align="left" valign="top">
    Path to build context
    
  </td>
</tr>
<tr id="buildcontainer-dockerfile">
  <td class="left" width="40%" align="left" valign="top">
    <strong>DockerFile</strong> <code>dockerfile</code> <br/><br/>
    type: <code>string</code><br/>
    
  </td>
  <td class="right" width="60%" align="left" valign="top">
    Location of build file inside build context defaults to ./Dockerfile
    
  </td>
</tr>
<tr id="buildcontainer-ignore">
  <td class="left" width="40%" align="left" valign="top">
    <strong>Ignore</strong> <code>ignore</code> <br/><br/>
    type: <code>[]string</code><br/>
    
  </td>
  <td class="right" width="60%" align="left" valign="top">
    Files to ignore in the build context, this is the same as .dockerignore
    
  </td>
</tr>
<tr id="buildcontainer-args">
  <td class="left" width="40%" align="left" valign="top">
    <strong>Args</strong> <code>args</code> <br/><br/>
    type: <code>map[string]string</code><br/>
    
  </td>
  <td class="right" width="60%" align="left" valign="top">
    Build args to pass  to the container
    
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

