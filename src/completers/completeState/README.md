## completeState - Completer

This completer can extend a state description, helping to reduce its code size or programatically generate an initial redux state.

A common pattern is to have a field associated with its Error and its Loading, so this completer adds `Loading` and `Error` extensions to the state for every field in the `description` argument. It also receives `customCompleters` to programatically generate the initial state and `ignoredTargets` that are added to the state without any changes.

* `description`: The completer generates the `Loading` (default `false`) and `Error` (default `null`) states.
* `ignoredTargets`: The completer doesn't generate any extra states for these.
* `customCompleters`: You can specify what states to generate.
* `pollingTargets`: The completer generates the `Loading` (default `false`), `Error` (default `null`), `IsRetrying` (default `false`), `RetryCount` (default `0`) and `TimeoutID` (default `null`) states.


### Example:
```js
const initialState = completeState({
  description: {
    firstCompleteState: 123,
    secondCompleteState: 456
  },
  ignoredTargets: {
    firstIgnoredState: 1,
    secondIgnoredState: 2
  },
  pollingtargets: {
    pollingState: 10
  },
  customCompleters: [
    {
      completer: (target, index) => ({
        [target]: "I'm a custom state",
        [`${target}Customized${index}`]: 'Yeah! Custom'
      }),
      targets: ['firstCustomState', 'secondCustomState']
    },
    {
      completer: target => ({
        [`${target}Cool`]: "I'm custom as well"
      }),
      targets: ['anotherCustomState']
    }
  ]
});

/*
this is the final content of initialState:

initialState === {
  firstCompleteState: 123,
  firstCompleteStateLoading: false,
  firstCompleteStateError: null,
  secondCompleteState: 456,
  secondCompleteStateLoading: false,
  secondCompleteStateError: null,
  pollingState: 10,
  pollingStateLoading: false,
  pollingStateError: null,
  pollingStateIsRetrying: false,
  pollingStateRetryCount: 0,
  pollingStateTimeoutID: null,
  firstIgnoredState: 1,
  secondIgnoredState: 2,
  firstCustomState: "I'm a custom state",
  firstCustomStateCustomized0: 'Yeah! Custom',
  secondCustomState: "I'm a custom state",
  secondCustomStateCustomized1: 'Yeah! Custom',
  anotherCustomStateCool: "I'm custom as well"
};
*/
```
