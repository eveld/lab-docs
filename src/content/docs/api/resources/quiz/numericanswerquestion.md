---
title: Numeric Answer
description: Configuration reference for the quiz resource in Instruqt labs
---


## NumericAnswerQuestion

A question that required an numerical (integer) answer.

```hcl

resource "numeric_answer_question" "name" {
  ...
}

```

#### Attributes

| Attribute                                                                                   | Description                                                                                                                                                           |
| ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p><strong>Question</strong> <code>question</code><br><br>type: <code>string</code><br></p> | <p>The question that needs to be answered.</p><pre class="language-hcl"><code class="lang-hcl">question = "How many fingers does an average hand have?"
</code></pre> |
| <p><strong>Answer</strong> <code>answer</code><br><br>type: <code>int</code><br></p>        | <p>The correct answer to the question.</p><pre class="language-hcl"><code class="lang-hcl">anwer = 5
</code></pre>                                                    |
| <p><strong>Hints</strong> <code>hints</code><br><br>type: <code>[]string</code><br></p>     | <p>The hints to show to the participants.</p><pre class="language-hcl"><code class="lang-hcl">hints = ["it is between 4 and 6", "no it is not 6"]
</code></pre>       |
| <p><strong>Tags</strong> <code>tags</code><br><br>type: <code>[]string</code><br></p>       | <p>The tags to associate with the question.</p><pre class="language-hcl"><code class="lang-hcl">tags = ["numbers", "humans"]
</code></pre>                            |

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
