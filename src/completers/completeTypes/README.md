## completeTypes - Completer

This completer helps to extends a group of actions including their `SUCCESS` and `FAILURE` cases. It also receives a second parameter that describes which ones are not extended.

Examples:
```js
const arrTypes = ['AN_ACTION', 'OTHER_ACTION'];
const completedTypes = completeTypes(arrTypes, ['ANOTHER_ACTION']);

completedTypes is like
[
  'AN_ACTION',
  'AN_ACTION_SUCCESS',
  'AN_ACTION_FAILURE',
  'OTHER_ACTION',
  'OTHER_ACTION_SUCCESS',
  'OTHER_ACTION_FAILURE',
  'ANOTHER_ACTION',
];
```
