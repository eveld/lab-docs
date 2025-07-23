---
title: Resources
description: Configuration reference for the resources resource in Instruqt labs
---


## Account

AWS Account

```hcl

resource "aws_account" "name" {
  ...
}

```

- <a href="aws/account.md#properties">properties</a>
- <a href="aws/account.md#examples">examples</a>

## Subscription

Azure Subscription

```hcl

resource "azure_subscription" "name" {
  ...
}

```

- <a href="azure/subscription.md#properties">properties</a>
- <a href="azure/subscription.md#examples">examples</a>

## Project

Google Cloud Project

```hcl

resource "google_project" "name" {
  ...
}

```

- <a href="google/project.md#properties">properties</a>
- <a href="google/project.md#examples">examples</a>

## Editor

The `editor` resource represents a target that a tab in the layout can point at.
It contains all the configuration that the participants proxy needs to route to the target service behind it.

```hcl

resource "editor" "name" {
  ...
}

```

- <a href="editor/editor.md#properties">properties</a>
- <a href="editor/editor.md#examples">examples</a>

## ExternalWebsite

ExternalWebsite represents an external website tab that can be opened in the lab environment.

```hcl

resource "external_website" "name" {
  ...
}

```

- <a href="externalwebsite/externalwebsite.md#properties">properties</a>
- <a href="externalwebsite/externalwebsite.md#examples">examples</a>

## Lab

The `lab` resource provides the metadata about the lab and some of its configuration.
 This is the equivalent of what is currently called a "track".

 ```hcl

resource "lab" "name" {
  ...
}

 ```

- <a href="lab/lab.md#properties">properties</a>
- <a href="lab/lab.md#examples">examples</a>

## Layout

The layout resource defines the layout of the lab UI through rows and columns.
These "panels" are referenced by id from the available tabs in a lab.
This allows us to make layouts reusable.

```hcl

resource "layout" "name" {
  ...
}

```

- <a href="layout/layout.md#properties">properties</a>
- <a href="layout/layout.md#examples">examples</a>

## Note

The `note` resource represents a single page of content that can be displayed in a tab.

This resource does not have the capability to embed `quiz` and `task` components, because it does not keep track of any progress.

```hcl

resource "note" "name" {
  ...
}

```

- <a href="note/note.md#properties">properties</a>
- <a href="note/note.md#examples">examples</a>

## Page

A page resource represents a markdown file that can be used to display content in the lab.

```hcl

resource "page" "name" {
  ...
}

```

- <a href="page/page.md#properties">properties</a>
- <a href="page/page.md#examples">examples</a>

## MultipleChoiceQuestion

A question that requires a multiple choice answer.

Answers and distractors are combined in a single list and showed in randomized order.

```hcl

resource "multiple_choice_question" "name" {
  ...
}

```

- <a href="quiz/multiplechoicequestion.md#properties">properties</a>
- <a href="quiz/multiplechoicequestion.md#examples">examples</a>

## NumericAnswerQuestion

A question that required an numerical (integer) answer.

```hcl

resource "numeric_answer_question" "name" {
  ...
}

```

- <a href="quiz/numericanswerquestion.md#properties">properties</a>
- <a href="quiz/numericanswerquestion.md#examples">examples</a>

## Quiz

A quiz consists of a number of questions that need to be answered in order to complete the quiz.

```hcl

resource "quiz" "name" {
  ...
}

```

- <a href="quiz/quiz.md#properties">properties</a>
- <a href="quiz/quiz.md#examples">examples</a>

## SingleChoiceQuestion

```hcl

resource "single_choice_question" "name" {
  ...
}

```

- <a href="quiz/singlechoicequestion.md#properties">properties</a>
- <a href="quiz/singlechoicequestion.md#examples">examples</a>

## TextAnswerQuestion

A question that requires a text answer.

```hcl

resource "text_answer_question" "name" {
  ...
}

```

- <a href="quiz/textanswerquestion.md#properties">properties</a>
- <a href="quiz/textanswerquestion.md#examples">examples</a>

## Service

The `service` resource represents a target that a tab in the layout can point at. A service is a web service or application running on a sandbox container or VM.
It contains all the configuration that the participants proxy needs to route to the target service behind it.

```hcl

resource "service" "name" {
  ...
}

```

- <a href="service/service.md#properties">properties</a>
- <a href="service/service.md#examples">examples</a>

## Task

The `task` resource is the new form of the lifecycle scripts, that can now be embedded anywhere on a page within the instructions.

Each task resource can have multiple `condition` blocks that need to be met before the task is completed, which in turn
can have multiple of each type of lifecycle block and each of the blocks are executed in sequence in the order they appear in code.

```hcl

resource "task" "name" {
  ...
}

```

- <a href="task/task.md#properties">properties</a>
- <a href="task/task.md#examples">examples</a>

## Terminal

The `terminal` resource represents a target that a tab in the layout can point at.
It contains all the configuration that the terminal session needs to start.

```hcl

resource "terminal" "name" {
  ...
}

```

- <a href="terminal/terminal.md#properties">properties</a>
- <a href="terminal/terminal.md#examples">examples</a>

