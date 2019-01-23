## completeState - Completer

This completer can extend a state description, helping to reduce its code size.

A common pattern is to have a field associated with its Error and its Loading, so this completer adds `Loading` and `Error` extensions to the state for every field that is not an exception.

Receives a state description and a list of target exceptions. You can also pass an array of the targets you want to treat as polling targets.

The polling targets have some extra properties:
- `targetCount`: number of retries this request has taken so far
- `targetIsRetrying`: if the request should be retried, this is set to `true` until either of the `SUCCESS` or `FAILURE` actions are dispatched.
- `targetTimeoutID`: the `setTimeout` timer id. You pass this id to `clearTimeout` in order to stop retrying.

Example:
```
const initialLongState = {
  thing: null,
  thingLoading: false,
  thingError: null,
  otherThing: null,
  otherThingLoading: false,
  otherThingError: null,
  otherThingCount: 0,
  otherThingIsRetrying: false,
  otherThingTimeoutID: null,
  anotherThing: null
};

const initialStateDescription = {
  thing: null,
  otherThing: null,
  anotherThing: null
}

const initialState = completeState(initialStateDescription, ['anotherThing'], ['otherThing']);

initialState and initialLongState are equivalent.
```
