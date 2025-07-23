---
title: Functions
description: Built-in functions for transforming and combining values in HCL expressions
---

There are a number of built-in functions that you can call from within expressions to transform and combine values.

The general syntax for function calls is a function name followed by comma-separated values:

```hcl
max(5, 12, 9)
```

## Numeric

## abs

The abs function returns the absolute value of the given number. If the number is zero or positive, the function returns the value as-is, but if it is negative, it is multiplied by -1 to make it positive before returning it.

```hcl
abs(number)

abs(-10.2) // returns 10.2
```

## ceil

ceil returns the closest whole number that is greater than or equal to the given value, which may be a fraction.

```hcl
ceil(number)

ceil(10.2) // returns 11
```

## floor

floor returns the closest whole number that is less than or equal to the given value, which may be a fraction.

```hcl
floor(number)

floor(10.2) // returns 10
```

## log

log returns the logarithm of a given number in a given base.

```hcl
log(number, base)

log(16, 2) // returns 4
```

## max

max takes one or more numbers and returns the greatest number from the set.

```hcl
max(numbers ...)

max(1, 10, 3) // returns 10
```

## min

min takes one or more numbers and returns the smallest number from the set.

```hcl
min(numbers ...)

min(1, 10, 3) // returns 1
```

## parseint

parseint parses the given string as a representation of an integer in the specified base and returns the resulting number. The base must be between 2 and 62 inclusive.

```hcl
parseint(string, base)

parseint("100", 10) // returns 100
```

## pow

pow calculates an exponent, by raising its first argument to the power of the second argument.

```hcl
pow(number, number)

pow(4, 2) // returns 16
```

## signum

signum determines the sign of a number, returning a number between -1 and 1 to represent the sign.
The sign of a real number is its property of being either positive, negative, or 0.

```hcl
signum(number)

signum(-10) // returns -1
```

## Strings

## chomp

chomp removes newline characters at the end of a string.

```hcl
chomp(string)

chomp("some value\n") // returns "some value"
```

## endswith

endswith takes two values: a string to check and a suffix string. The function returns true if the first string ends with that exact suffix.

```hcl
endswith(string, suffix)

endswith("hello world", "world) // returns true
```

## format

The format function produces a string by formatting a number of other values according to a specification string.

```hcl
format(string, values ...)

format("hello %s", "world") // returns "hello world"
```

## formatlist

formatlist produces a list of strings by formatting a number of other values according to a specification string.

```hcl
formatlist(string, values ...)

formatlist("hello %s", ["Jim", "John", "James"]) // returns ["hello Jim", "hello John", "hello James"]
```

## indent

The indent function adds a specified number of spaces to the beginning of each line in a multi-line string, except for the first line. 

```hcl
indent(spaces, string)

indent(2, variable.description)
```

## join

join produces a string by concatenating all of the elements of the specified list of strings with the specified separator.

```hcl
join(separator, list)

join(", ", ["a", "b", "c"]) // returns "a, b, c"
```

## lower

lower converts all cased letters in the given string to lowercase.

```hcl
lower(string)

lower("HELLO WORLD") // returns "hello world"
```

## regex

regex applies a regular expression to a string and returns the matching substrings.

```hcl
regex(pattern, string)

regex("[a-z]", "12345abcdXYZ") // returns "abcd"
```

## regexall

regexall applies a regular expression to a string and returns a list of all matches.

```hcl
regexall(pattern, string)

regexall("[a-z]", "1234abcdXYZefgh") // returns ["abcd", "efgh"]
```

## replace

replace searches a given string for another given substring, and replaces each occurrence with a given replacement string.

```hcl
replace(string, substring, replacement)

replace("hello world", "world", "computer") // returns "hello computer"
```

## split

split produces a list by dividing a given string at all occurrences of a given separator.

```hcl
split(separator, string)

split(".", "127.0.0.1") // returns ["127", "0", "0", "1"]
```

## startswith

startswith takes two values: a string to check and a prefix string. The function returns true if the string begins with that exact prefix.

```hcl
startswith(string, prefix)

startswith("hello world", "hello") // returns true
```

## strcontains

strcontains function checks whether a substring is within another string.

```hcl
strcontains("this is a sentence", "is") // returns true
```

## strrev

strrev reverses the characters in a string.

```hcl
strrev(string)

strrev("hello world") // returns "dlrow olleh"
```

## substr

substr extracts a substring from a given string by offset and (maximum) length.

```hcl
substr(string, offset, length)

substr("hello world", 5, 9) // returns "world"
```

## templatestring

The templatestring function renders a string as a template using a set of variables.

```hcl
templatestring(string, variables)

templatestring("hello {{name}}", {
  name = "world"
}) // returns "hello world"
```

## title

title converts the first letter of each word in the given string to uppercase.

```hcl
title(string)

title("hello world") // returns "Hello World"
```

## trim

trim removes the specified set of characters from the start and end of the given string.

```hcl
trim(string, characters)

trim("   hello world\n", " \n") // returns "hello world"
```

## trimprefix

trimprefix removes the specified prefix from the start of the given string, but only once.

```hcl
trimprefix(string, prefix)

trimprefix("helloworld", "hello") // returns "world"
```

## trimsuffix

trimsuffix removes the specified suffix from the end of the given string, but only once.

```hcl
trimsuffix(string, suffix)

trimsuffix("helloworld", "world") // returns "hello"
```

## trimspace

trimspace removes any space characters from the start and end of the given string.

```hcl
trimspace(string)

trimspace("    hello world\n") // returns "hello world"
```

## upper

upper converts all cased letters in the given string to uppercase.

```hcl
upper(string)

upper("hello world") // returns "HELLO WORLD"
```

## Collections

## chunklist

chunklist splits a single list into fixed-size chunks, returning a list of lists.

## coalescelist

coalescelist takes any number of list arguments and returns the first one that isn't empty.

## compact

compact takes a list of strings and returns a new list with any null or empty string elements removed.

## concat

concat takes two or more lists and combines them into a single list.

## contains

contains determines whether the list, tuple, or set given in its first argument contains at least one element that is equal to the value in the second argument.

## distinct

distinct takes a list and returns a new list with any duplicate elements removed.

## element

element retrieves a single element from a list.

## flatten

flatten takes a list and replaces any elements that are lists with a flattened sequence of the list contents.

## keys

keys takes a map and returns a list containing the keys from that map.

## len

len determines the length of a given list, map, or string.

## merge

merge takes an arbitrary number of maps or objects, and returns a single map or object that contains a merged set of elements from all arguments.

## range

range generates a list of numbers using a start value, a limit value, and a step value.

## reverse

reverse takes a sequence and produces a new sequence of the same length with all of the same elements as the given sequence but in reverse order.

## setintersection

The setintersection function takes multiple sets and produces a single set containing only the elements that all of the given sets have in common.

## setproduct

The setproduct function finds all of the possible combinations of elements from all of the given sets.

## setsubtract

The setsubtract function returns a new set containing the elements from the first set that are not present in the second set.

## setunion

The setunion function takes multiple sets and produces a single set containing the elements from all of the given sets.

## slice

slice extracts some consecutive elements from within a list.

## sort

sort takes a list of strings and returns a new list with those strings sorted lexicographically.

## values

values takes a map and returns a list containing the values of the elements in that map.

## zipmap

zipmap constructs a map from a list of keys and a corresponding list of values.

## Filesystem and environment

## dir

dir takes a string containing a filesystem path and removes the last portion from it.

## file

file reads the contents of a file at the given path and returns them as a string.

## template_file

templatefile reads the file at the given path and renders its content as a template using a supplied set of template variables.

## home

home returns the configured home directory.

## env

env returns the value of the given environment variable.

## Encoding

## csvdecode

csvdecode decodes a string containing CSV-formatted data and produces a list of maps representing that data.

## jsondecode

jsondecode interprets a given string as JSON, returning a representation of the result of decoding that string.

## jsonencode

jsonencode encodes a given value to a string using JSON syntax.

## base64_encode

base64_encode applies Base64 encoding to a string.

## base64_decode

base64_decode takes a string containing a Base64 character sequence and returns the original string.

## Date and time

## formatdate

formatdate converts a timestamp into a different time format.

## timeadd

timeadd adds a duration to a timestamp, returning a new timestamp.
