## completeTypes - Completer

This completer helps to extends a group of actions including their `SUCCESS` and `FAILURE` cases. It also receives a second parameter that describes which ones are not extended. It also receives a third parameter that describes the actions that should be extended for polling.

Examples:
```js
const arrTypes = ['AN_ACTION', 'OTHER_ACTION'];
const ignoredTypes = ['ANOTHER_ACTION']
const pollingTypes = ['POLLING_ACTION'];
const completedTypes = completeTypes(arrTypes, ignoredTypes, pollingTypes);

completedTypes is like
[
  'AN_ACTION',
  'AN_ACTION_SUCCESS',
  'AN_ACTION_FAILURE',
  'OTHER_ACTION',
  'OTHER_ACTION_SUCCESS',
  'OTHER_ACTION_FAILURE',
  'POLLING_ACTION',
  'POLLING_ACTION_SUCCESS',
  'POLLING_ACTION_FAILURE',
  'POLLING_ACTION_RETRY',
  'ANOTHER_ACTION'
];
```
