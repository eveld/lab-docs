---
title: Text Answer
description: Configuration reference for the quiz resource in Instruqt labs
---


## TextAnswerQuestion

A question that requires a text answer.

```hcl

resource "text_answer_question" "name" {
  ...
}

```

#### Attributes

| Attribute                                                                                   | Description                                                                                                                                                           |
| ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p><strong>Question</strong> <code>question</code><br><br>type: <code>string</code><br></p> | <p>The question that needs to be answered.</p><pre class="language-hcl"><code class="lang-hcl">question = "What language do they speak in France?"
</code></pre>      |
| <p><strong>Answer</strong> <code>answer</code><br><br>type: <code>string</code><br></p>     | <p>The correct answer to the question.</p><pre class="language-hcl"><code class="lang-hcl">answer = "French"
</code></pre>                                            |
| <p><strong>Exact</strong> <code>exact</code><br><br>type: <code>bool</code><br></p>         | <p>Whether the answer needs to be an exact match.</p><pre class="language-hcl"><code class="lang-hcl">exact = false
</code></pre>                                     |
| <p><strong>Hints</strong> <code>hints</code><br><br>type: <code>[]string</code><br></p>     | <p>The hints to show to the participants.</p><pre class="language-hcl"><code class="lang-hcl">hints = ["it starts with an 'f'", "it ends with 'rench'"]
</code></pre> |
| <p><strong>Tags</strong> <code>tags</code><br><br>type: <code>[]string</code><br></p>       | <p>The tags to associate with the question.</p><pre class="language-hcl"><code class="lang-hcl">tags = ["languages", "europe"]
</code></pre>                          |

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

## Examples

#### Full Example

```hcl
resource "text_answer_question" "capital_france" {
	question = "What is the capital of France?"
	answer ="Paris"
	hints = [
    "They host the olympics in 2024",
		"The city is known for the Eiffel Tower"
	]
}
```
