---
title: Content Resources
description: Resources for creating instructional content and interactive activities
---

Content resources define the educational materials and interactive elements that participants experience during a lab. These resources focus on what users learn and how they interact with the content.

## Core Structure

### [Lab](./lab.md)
The main lab resource that defines metadata, settings, and content organization. Every lab starts with this resource.

### [Page](./page.md)  
Markdown-based instructional content with variable substitution and activity embedding. Pages contain the actual content participants read.

### [Layout](./layout.md)
Defines the visual arrangement of tabs, instructions, and interactive elements in the lab UI.

## Interactive Activities

### [Task](./task.md)
Hands-on interactive challenges with validation scripts, setup procedures, and automated checking. Tasks provide practical learning experiences where participants perform actual work.

### Quiz Resources
Knowledge assessment tools for testing understanding with multiple question types:

- **[Quiz](./quiz/quiz.md)** - Main quiz resource that combines multiple questions
- **[Single Choice Question](./quiz/singlechoicequestion.md)** - Multiple choice with one correct answer
- **[Multiple Choice Question](./quiz/multiplechoicequestion.md)** - Multiple choice with multiple correct answers  
- **[Text Answer Question](./quiz/textanswerquestion.md)** - Free-form text responses
- **[Numeric Answer Question](./quiz/numericanswerquestion.md)** - Numerical value responses

## Reference Materials

### [Note](./note.md)
Static reference content displayed in tabs. Perfect for documentation, cheat sheets, and supplementary materials.

## Content Creation Workflow

1. **Plan Structure**: Design your lab's learning objectives and flow
2. **Create Lab Resource**: Define metadata, settings, and overall structure  
3. **Write Pages**: Create instructional content with embedded activities
4. **Add Activities**: Build tasks and quizzes for hands-on learning
5. **Design Layout**: Arrange UI elements for optimal user experience
6. **Add References**: Include notes and documentation as needed

## Best Practices

- **Clear Learning Path**: Structure content to guide learners progressively
- **Interactive Elements**: Balance reading with hands-on activities
- **Consistent Formatting**: Use consistent markdown styles and layouts
- **Helpful Feedback**: Provide clear task validation and quiz explanations
- **Reference Materials**: Include relevant documentation and quick references