## completeTypes - Completer

This completer can extend the list of possible action types, helping to reduce its code size or generate them programatically. `completeTypes` receives an object with:

* `primaryActions`: The completer generates the `_SUCCESS` and `_FAILURE` actions.
* `ignoredActions`: The completer doesn't generate any extra actions for these.
* `pollingActions`: The completer generates the `_SUCCESS`, `_FAILURE`, `_RETRY` and `_CANCEL` actions.
* `customCompleters`: You can specify what types to generate.

### Example:
```js
const actions = completeTypes({
  primaryActions: ['FIRST_PRIMARY_ACTION', 'SECOND_PRIMARY_ACTION'],
  ignoredActions: ['FIRST_IGNORED_ACTION', 'SECOND_IGNORED_ACTION'],
  pollingActions: ['FIRST_POLLING_ACTION', 'SECOND_POLLING_ACTION'],
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
  "FIRST_POLLING_ACTION",
  "FIRST_POLLING_ACTION_SUCCESS",
  "FIRST_POLLING_ACTION_FAILURE",
  "FIRST_POLLING_ACTION_RETRY",
  "FIRST_POLLING_ACTION_CANCEL",
  "SECOND_POLLING_ACTION",
  "SECOND_POLLING_ACTION_SUCCESS",
  "SECOND_POLLING_ACTION_FAILURE",
  "SECOND_POLLING_ACTION_RETRY",
  "SECOND_POLLING_ACTION_CANCEL",
  "FIRST_CUSTOM_ACTION",
  "UPGRADED_FIRST_CUSTOM_ACTION",
  "SECOND_CUSTOM_ACTION",
  "UPGRADED_SECOND_CUSTOM_ACTION",
  "NEW_THIRD_CUSTOM_ACTION",
  "FIRST_IGNORED_ACTION",
  "SECOND_IGNORED_ACTION
*/
```
