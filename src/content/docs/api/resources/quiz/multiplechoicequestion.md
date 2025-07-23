---
title: Multiple Choice
description: Configuration reference for the quiz resource in Instruqt labs
---


## MultipleChoiceQuestion

A question that requires a multiple choice answer.

Answers and distractors are combined in a single list and showed in randomized order.

```hcl

resource "multiple_choice_question" "name" {
  ...
}

```

#### Attributes

| Attribute                                                                                           | Description                                                                                                                                                                                                        |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <p><strong>Question</strong> <code>question</code><br><br>type: <code>string</code><br></p>         | <p>The question that needs to be answered.</p><pre class="language-hcl"><code class="lang-hcl">question = "Which of these cities is located in France?"
</code></pre>                                              |
| <p><strong>Answer</strong> <code>answer</code><br><br>type: <code>[]string</code><br></p>           | <p>The correct answer to the question.</p><pre class="language-hcl"><code class="lang-hcl">answer = ["Paris", "Lyon"]
</code></pre>                                                                                |
| <p><strong>Distractors</strong> <code>distractors</code><br><br>type: <code>[]string</code><br></p> | <p>Additional incorect options to present to the participants.</p><pre class="language-hcl"><code class="lang-hcl">distractors = ["Berlin", "London"]
</code></pre>                                                |
| <p><strong>Hints</strong> <code>hints</code><br><br>type: <code>[]string</code><br></p>             | <p>The hints to show to the participants.</p><pre class="language-hcl"><code class="lang-hcl">hints = [
  "One of these cities is located in England",
  "The other country is located in Germany"
]
</code></pre> |
| <p><strong>Tags</strong> <code>tags</code><br><br>type: <code>[]string</code><br></p>               | <p>The tags to associate with the question.</p><pre class="language-hcl"><code class="lang-hcl">tags = ["cities", "europe"]
</code></pre>                                                                          |

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
question = "Which of these cities are in France?"
	answer = ["Paris", "Lyon", "Nantes"]
	distractors = ["London", "Berlin"]
	
	hints = [
		"One of these cities is in the UK",
		"Another city is in Germany"
	]
}
```
