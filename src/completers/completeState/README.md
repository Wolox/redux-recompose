## completeState - Completer

This completer can extend a state description, helping to reduce its code size.  

A common pattern is to have a field associated with its Error and its Loading, so this completer adds `Loading` and `Error` extensions to the state for every field that is not an exception.

Receives a state description and a list of target exceptions.  
### Example:
```js
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
  otherThing: null
}

const initialState = completeState({
  description: initialStateDescription,
  ignoredTargets: { anotherThing: null }
});

// initialState and initialLongState are equivalent.
```

Also can add custom completers, in order to make the extension to your taste.

### Example with custom completers

```js
const initialLongState = {
  thing: null,
  thingLoading: false,
  thingError: null,
  anotherThing: null,
  otherThing: null,
  otherThingCustomized: 'Yeah! Custom'
};

const initialStateDescription = {
  thing: null
};

const initialState = completeState({
  description: initialStateDescription,
  ignoredTargets: { anotherThing: null },
  customCompleters: [
    {
      completer: target => ({
        [target]: null,
        [´${target}Customized´]: 'Yeah! Custom'
      }),
      targets: ['otherThing']
    }
  ]
});

// initialState and initialLongState are equivalent.
```