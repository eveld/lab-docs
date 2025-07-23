---
title: AWS Account
description: Configuration reference for the aws resource in Instruqt labs
---



The aws_account resource provisions AWS accounts for lab environments. It creates sandboxed AWS accounts with controlled access, user management, and service restrictions suitable for educational and training purposes.

## HCL Syntax

### Basic Syntax

```hcl
resource "aws_account" "name" {
  regions = ["us-east-1"]
  services = ["ec2", "s3"]
}
```

### Full Syntax

```hcl
resource "aws_account" "name" {
  regions = ["us-east-1", "us-west-2"]
  services = ["ec2", "s3", "iam", "cloudformation"]
  
  tags = {
    Environment = "Training"
    Purpose = "Lab"
    Team = "Education"
  }
  
  user "admin" {
    iam_policy = file("./policies/admin-policy.json")
    managed_policies = [
      "arn:aws:iam::aws:policy/PowerUserAccess",
      "arn:aws:iam::aws:policy/IAMReadOnlyAccess"
    ]
  }
  
  user "developer" {
    iam_policy = file("./policies/dev-policy.json")
    managed_policies = [
      "arn:aws:iam::aws:policy/AmazonEC2ReadOnlyAccess"
    ]
  }
  
  scp_policy = file("./policies/lab-restrictions.json")
}
```

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| regions | list(string) | | AWS regions where resources can be provisioned (default: []) |
| services | list(string) | | AWS services that users can access (default: []) |
| tags | map(string) | | Tags to apply to the AWS account (default: {}) |
| **user** | block | | **IAM users to create (repeatable)** |
| scp_policy | string | | Service Control Policy to apply to the account |

### User Configuration

IAM user settings within the AWS account.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **user** | block | No | - | **IAM user configuration (repeatable)** |
| ↳ name | label | ✓ | Username for the IAM user |
| ↳ iam_policy | string | | Custom IAM policy JSON for the user |
| ↳ managed_policies | list(string) | | AWS managed policy ARNs to attach (default: []) |

## Computed Attributes

These attributes are set by the system after account provisioning:

| Field | Type | Description |
|-------|------|-------------|
| account_id | string | AWS account ID |
| account_name | string | AWS account name |

### User Computed Attributes

For each user block, these attributes are computed:

| Field | Type | Description |
|-------|------|-------------|
| username | string | IAM username |
| password | string | Console password for the user |
| access_key_id | string | AWS access key ID |
| secret_access_key | string | AWS secret access key |

## Validation Rules

- Region names must be valid AWS regions
- Service names must be valid AWS service identifiers
- IAM policies must be valid JSON
- Managed policy ARNs must be valid AWS policy ARNs
- SCP policies must be valid Service Control Policy JSON

## Examples

### Basic Development Account

```hcl
resource "aws_account" "dev" {
  regions = ["us-east-1"]
  services = ["ec2", "s3", "iam"]
  
  tags = {
    Environment = "Development"
    CostCenter = "Training"
  }
  
  user "student" {
    managed_policies = [
      "arn:aws:iam::aws:policy/AmazonEC2ReadOnlyAccess",
      "arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess"
    ]
  }
}
```

### Multi-User Training Environment

```hcl
resource "aws_account" "training" {
  regions = ["us-east-1", "us-west-2"]
  services = [
    "ec2",
    "s3",
    "iam",
    "cloudformation",
    "lambda",
    "apigateway"
  ]
  
  tags = {
    Environment = "Training"
    Course = "AWS Solutions Architect"
    Instructor = "Jane Doe"
  }
  
  # Administrator user
  user "instructor" {
    iam_policy = file("./policies/instructor-policy.json")
    managed_policies = [
      "arn:aws:iam::aws:policy/PowerUserAccess",
      "arn:aws:iam::aws:policy/IAMFullAccess"
    ]
  }
  
  # Student user with limited permissions
  user "student" {
    iam_policy = file("./policies/student-policy.json")
    managed_policies = [
      "arn:aws:iam::aws:policy/AmazonEC2FullAccess",
      "arn:aws:iam::aws:policy/AmazonS3FullAccess"
    ]
  }
  
  # Read-only user for observers
  user "observer" {
    managed_policies = [
      "arn:aws:iam::aws:policy/ReadOnlyAccess"
    ]
  }
  
  scp_policy = file("./policies/training-restrictions.json")
}
```

### Serverless Development Account

```hcl
resource "aws_account" "serverless" {
  regions = ["us-east-1"]
  services = [
    "lambda",
    "apigateway",
    "dynamodb",
    "s3",
    "cloudwatch",
    "iam"
  ]
  
  tags = {
    Environment = "Serverless-Lab"
    Technology = "Lambda"
  }
  
  user "developer" {
    iam_policy = jsonencode({
      Version = "2012-10-17"
      Statement = [
        {
          Effect = "Allow"
          Action = [
            "lambda:*",
            "apigateway:*",
            "dynamodb:*",
            "s3:*",
            "logs:*"
          ]
          Resource = "*"
        }
      ]
    })
  }
}
```

### Policy Examples

#### Custom IAM Policy File

```json
// ./policies/student-policy.json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:DescribeInstances",
        "ec2:DescribeImages",
        "ec2:RunInstances",
        "ec2:TerminateInstances"
      ],
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "ec2:InstanceType": ["t2.micro", "t3.micro"]
        }
      }
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::student-bucket/*"
    }
  ]
}
```

#### Service Control Policy

```json
// ./policies/lab-restrictions.json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Deny",
      "Action": [
        "organizations:*",
        "account:*"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Deny",
      "Action": "ec2:RunInstances",
      "Resource": "arn:aws:ec2:*:*:instance/*",
      "Condition": {
        "ForAllValues:StringNotEquals": {
          "ec2:InstanceType": [
            "t2.micro",
            "t2.small",
            "t3.micro",
            "t3.small"
          ]
        }
      }
    }
  ]
}
```

### Using Account Credentials

```hcl
resource "aws_account" "lab" {
  regions = ["us-east-1"]
  services = ["ec2", "s3"]
  
  user "student" {
    managed_policies = [
      "arn:aws:iam::aws:policy/AmazonEC2FullAccess"
    ]
  }
}

# Export credentials for use in other tools
resource "template" "aws_credentials" {
  source = <<-EOF
    [default]
    aws_access_key_id = ${resource.aws_account.lab.users["student"].access_key_id}
    aws_secret_access_key = ${resource.aws_account.lab.users["student"].secret_access_key}
    region = us-east-1
  EOF
  
  destination = "./aws-credentials"
}

# Use in container environment
resource "container" "aws_cli" {
  image {
    name = "amazon/aws-cli:latest"
  }
  
  environment = {
    AWS_ACCESS_KEY_ID = resource.aws_account.lab.users["student"].access_key_id
    AWS_SECRET_ACCESS_KEY = resource.aws_account.lab.users["student"].secret_access_key
    AWS_DEFAULT_REGION = "us-east-1"
  }
  
  command = ["aws", "ec2", "describe-instances"]
}
```

### Multi-Region Setup

```hcl
resource "aws_account" "global" {
  regions = [
    "us-east-1",      # N. Virginia
    "us-west-2",      # Oregon
    "eu-west-1",      # Ireland
    "ap-southeast-1"  # Singapore
  ]
  
  services = [
    "ec2",
    "s3",
    "cloudfront",
    "route53"
  ]
  
  tags = {
    Environment = "Multi-Region-Lab"
    Purpose = "Global Infrastructure Training"
  }
  
  user "architect" {
    iam_policy = jsonencode({
      Version = "2012-10-17"
      Statement = [
        {
          Effect = "Allow"
          Action = [
            "ec2:*",
            "s3:*",
            "cloudfront:*",
            "route53:*"
          ]
          Resource = "*"
        }
      ]
    })
  }
}
```

## Security Considerations

### Access Control

```hcl
resource "aws_account" "secure_lab" {
  regions = ["us-east-1"]
  services = ["ec2", "s3"]
  
  # Principle of least privilege
  user "student" {
    iam_policy = jsonencode({
      Version = "2012-10-17"
      Statement = [
        {
          Effect = "Allow"
          Action = [
            "ec2:DescribeInstances",
            "ec2:RunInstances",
            "ec2:TerminateInstances"
          ]
          Resource = "*"
          Condition = {
            StringEquals = {
              "aws:RequestedRegion" = ["us-east-1"]
            }
          }
        }
      ]
    })
  }
  
  # Restrictive SCP
  scp_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Deny"
        Action = [
          "iam:CreateRole",
          "iam:DeleteRole",
          "iam:AttachRolePolicy"
        ]
        Resource = "*"
      }
    ]
  })
}
```

## Best Practices

1. **Least Privilege**: Grant only the minimum permissions required
2. **Service Restrictions**: Limit services to those needed for the lab
3. **Region Constraints**: Restrict to specific regions to control costs
4. **Policy Management**: Use external policy files for complex permissions
5. **SCP Usage**: Apply Service Control Policies to enforce boundaries
6. **Tagging Strategy**: Consistent tagging for cost tracking and management
7. **User Separation**: Create role-specific users (student, instructor, observer)

## Common Use Cases

1. **Training Environments**: Sandboxed accounts for AWS training courses
2. **Development Labs**: Controlled environments for application development
3. **Certification Prep**: Practice environments for AWS certification exams
4. **Proof of Concepts**: Isolated accounts for testing new services
5. **Multi-User Workshops**: Shared accounts with multiple user roles
6. **Cost-Controlled Learning**: Restricted environments to prevent unexpected charges