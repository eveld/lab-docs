---
title: Quiz
description: Configuration reference for the quiz resource in Instruqt labs
---



The quiz resource creates interactive knowledge assessments with multiple question types. Participants must answer questions correctly to complete the quiz, with configurable attempts, hints, and answer visibility.

## HCL Syntax

### Basic Syntax

```hcl
resource "quiz" "name" {
  questions = [
    resource.single_choice_question.question1,
    resource.multiple_choice_question.question2
  ]
}
```

### Full Syntax

```hcl
resource "quiz" "name" {
  questions = [
    resource.single_choice_question.basics,
    resource.multiple_choice_question.concepts,
    resource.text_answer_question.short_answer,
    resource.numeric_answer_question.calculation
  ]
  
  show_hints   = true
  show_answers = false
  attempts     = 3
}
```

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| questions | list(reference) | ✓ | List of question resources for the quiz |
| show_hints | bool | | Whether to show hints to participants. Defaults to false. |
| show_answers | bool | | Whether to show correct answers after completion. Defaults to false. |
| attempts | int | | Maximum number of attempts allowed. Defaults to -1 (unlimited). |

## Supported Question Types

The quiz can include any combination of these question types:

| Question Type | Reference | Description |
|---------------|-----------|-------------|
| [Single Choice](singlechoicequestion.md) | `resource.single_choice_question.name` | One correct answer from multiple options |
| [Multiple Choice](multiplechoicequestion.md) | `resource.multiple_choice_question.name` | Multiple correct answers from options |
| [Text Answer](textanswerquestion.md) | `resource.text_answer_question.name` | Free-form text response |
| [Numeric Answer](numericanswerquestion.md) | `resource.numeric_answer_question.name` | Numerical response with optional precision |

## Validation Rules

- **Questions**: Must reference valid question resources
- **Attempts**: Must be greater than 0 or -1 for unlimited attempts
- **Question order**: Questions are presented in the order specified in the array

## Default Values

The following defaults are applied automatically:

```hcl
show_hints   = false
show_answers = false
attempts     = -1  # Unlimited attempts
```

## Examples

### Basic Knowledge Check

```hcl
resource "quiz" "docker_basics" {
  questions = [
    resource.single_choice_question.what_is_docker,
    resource.multiple_choice_question.docker_benefits
  ]
}
```

### Comprehensive Assessment

```hcl
resource "quiz" "final_exam" {
  questions = [
    resource.single_choice_question.concepts,
    resource.multiple_choice_question.best_practices,
    resource.text_answer_question.explain_process,
    resource.numeric_answer_question.calculate_resources
  ]
  
  show_hints   = false
  show_answers = true
  attempts     = 2
}
```

### Practice Quiz with Hints

```hcl
resource "quiz" "practice_session" {
  questions = [
    resource.single_choice_question.easy_question,
    resource.multiple_choice_question.medium_question,
    resource.text_answer_question.hard_question
  ]
  
  show_hints   = true
  show_answers = true
  attempts     = -1  # Unlimited attempts for practice
}
```

### Mixed Question Types

```hcl
resource "quiz" "comprehensive_test" {
  questions = [
    resource.single_choice_question.theory_basics,
    resource.multiple_choice_question.practical_applications,
    resource.text_answer_question.describe_workflow,
    resource.numeric_answer_question.calculate_capacity,
    resource.single_choice_question.troubleshooting
  ]
  
  show_hints   = false
  show_answers = false
  attempts     = 3
}
```

## Usage in Pages

Quizzes must be referenced in instruction pages using the activities map and `<instruqt-quiz>` component:

```hcl
resource "page" "assessment" {
  title = "Knowledge Assessment"
  file  = "instructions/chapter2/assessment.md"
  
  activities = {
    final_quiz = resource.quiz.docker_basics
  }
}
```

Then in your markdown file:

```markdown
## Test Your Knowledge

<instruqt-quiz id="final_quiz">
Answer the following questions to demonstrate your understanding.
</instruqt-quiz>
```

## Question Flow

1. **Presentation**: Questions are shown in the order specified
2. **Interaction**: Participants select/enter answers
3. **Hints**: Available if `show_hints = true`
4. **Submission**: Answers are validated
5. **Results**: Feedback provided based on configuration
6. **Retry**: Additional attempts if available and needed

## Best Practices

1. **Question Variety**: Mix different question types for comprehensive assessment
2. **Logical Order**: Arrange questions from basic to advanced concepts
3. **Appropriate Attempts**: Use 2-3 attempts for assessments, unlimited for practice
4. **Hint Usage**: Enable hints for learning-focused quizzes, disable for formal assessments
5. **Answer Visibility**: Show answers for practice, hide for formal evaluations
6. **Question Quality**: Write clear, unambiguous questions with meaningful distractors
7. **Content Alignment**: Ensure questions align with the instructional content