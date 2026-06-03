# Closures & Modules

## What is a Closure?
A closure is a function that remembers the variables from the scope where it was created,
even after that outer function has finished running. The inner function keeps a live reference
to those variables — they are not garbage-collected as long as the inner function exists.

## What is a Module?
A module is a function that runs once, creates private state and private helpers,
and returns only a limited public interface (an object). Everything not returned stays private.

## Why Do Modules Help Organize Code?
- They prevent private variables from polluting the global scope.
- They let you choose exactly what to expose under clean public names.
- Each module is self-contained and easy to reason about independently.

## Why Can Closures Preserve Data After a Function Finishes?
When a function returns an inner function, the inner function keeps a reference to the
outer function's variable environment. JavaScript does not destroy that environment while
any inner function still holds a reference to it. This is how `money`, `members`, and
`songs` stay alive and updated across multiple calls — without ever being exposed globally.
