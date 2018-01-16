## completeState - Completer

This completer can extend a state description, helping to reduce its code size.  

A common pattern is to have a field associated with its Error and its Loading, so this completer adds `Loading` and `Error` extensions to the state for every field that is not an exception.  

Receives a state description and a list of target exceptions.  
Example:  
```
const initialLongState = {
  thing: null,
  thingLoading: false,
  thingError: null,
  otherThing: null,
  otherThingLoading: false,
  otherThingError: null,
  anotherThing: null
};

const initialStateDescription = {
  thing: null,
  otherThing: null,
  anotherThing: null
}

const initialState = completeState(initialStateDescription, ['anotherThing']);

initialState and initialLongState are equivalent.
```
