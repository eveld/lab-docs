---
title: Quiz Resources  
description: Interactive knowledge assessment tools with multiple question types
---

Quiz resources enable you to create interactive knowledge assessments that test participant understanding. Quizzes can be embedded within instruction pages and provide immediate feedback to learners.

## Main Quiz Resource

### [Quiz](./quiz.md)
The main quiz resource that combines multiple questions into a single assessment. Configures attempts, hints, and answer visibility.

## Question Types

### [Single Choice Question](./singlechoicequestion.md)
Multiple choice questions with one correct answer. Participants select from a list of options.

### [Multiple Choice Question](./multiplechoicequestion.md)  
Multiple choice questions where multiple answers can be correct. Participants can select multiple options.

### [Text Answer Question](./textanswerquestion.md)
Free-form text input questions. Participants type their answers in a text field.

### [Numeric Answer Question](./numericanswerquestion.md)
Questions that expect numerical answers. Supports ranges and precision validation.

## Quiz Workflow

1. **Create Questions**: Define individual question resources with answers and explanations
2. **Build Quiz**: Combine questions into a quiz resource with appropriate settings
3. **Embed in Pages**: Reference the quiz in instruction pages using `<instruqt-quiz>` tags
4. **Configure Behavior**: Set attempts, hints, and answer visibility based on learning objectives

## Question Design Best Practices

### Content Guidelines
- **Clear Questions**: Write unambiguous questions that test specific knowledge
- **Balanced Options**: Provide plausible distractors for multiple choice questions
- **Helpful Explanations**: Include explanations that reinforce learning objectives
- **Appropriate Difficulty**: Match question difficulty to the learning level

### Technical Configuration
- **Answer Validation**: Ensure answer matching is appropriate for the question type
- **Hint Strategy**: Use hints sparingly to encourage thinking before revealing answers
- **Attempt Limits**: Set reasonable attempt limits to prevent guessing
- **Feedback Timing**: Configure when participants see correct answers

## Integration with Content

Quizzes integrate seamlessly with instructional content through page embedding:

```hcl
resource "page" "assessment" {
  title = "Knowledge Check"
  file  = "instructions/quiz-page.md"
  
  activities = {
    concepts_quiz = resource.quiz.fundamentals
  }
}
```

In your markdown file:
```markdown
## Test Your Understanding

<instruqt-quiz id="concepts_quiz">
Complete this quiz to check your understanding of the key concepts.
</instruqt-quiz>
```

## Common Quiz Patterns

### Knowledge Check
Quick assessments to verify basic understanding before proceeding.

### Comprehensive Assessment  
Longer quizzes that test multiple concepts and skills across a learning module.

### Diagnostic Quiz
Pre-lab assessments to gauge existing knowledge and customize the learning path.

### Reinforcement Quiz
Post-activity quizzes that reinforce hands-on learning with conceptual questions.