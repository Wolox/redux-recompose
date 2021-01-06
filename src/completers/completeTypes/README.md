## completeTypes - Completer

This completer can extend the list of possible action types, helping to reduce its code size or generate them programatically.

This completer adds `_SUCCESS` and `_FAILUTE` extensions to every element in the `primaryActions` array. It also receives `customCompleters` to programatically generate action types and `ignoredActions` that are added to the action types without any changes.

### Example:
```js
const actions = completeTypes({
  primaryActions: ['FIRST_PRIMARY_ACTION', 'SECOND_PRIMARY_ACTION'],
  ignoredActions: ['FIRST_IGNORED_ACTION', 'SECOND_IGNORED_ACTION'],
  customCompleters: [
      { completer: type => [type, `UPGRADED_${type}`], actions: ['FIRST_CUSTOM_ACTION', 'SECOND_CUSTOM_ACTION'] },
      { completer: type => [`NEW_${type}`], actions: ['THIRD_CUSTOM_ACTION'] },
  ]});

/*
actions === [
  "FIRST_PRIMARY_ACTION",
  "FIRST_PRIMARY_ACTION_SUCCESS",
  "FIRST_PRIMARY_ACTION_FAILURE",
  "SECOND_PRIMARY_ACTION",
  "SECOND_PRIMARY_ACTION_SUCCESS",
  "SECOND_PRIMARY_ACTION_FAILURE",
  "FIRST_IGNORED_ACTION",
  "SECOND_IGNORED_ACTION",
  "FIRST_CUSTOM_ACTION",
  "UPGRADED_FIRST_CUSTOM_ACTION",
  "SECOND_CUSTOM_ACTION",
  "UPGRADED_SECOND_CUSTOM_ACTION",
  "NEW_THIRD_CUSTOM_ACTION"
*/
```
