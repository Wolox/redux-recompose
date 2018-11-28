## onToggle - Effect

This effect allow us to toggle the value of a boolean in the state.

Example:

```
const initialState = {
  isComplete: false
};

const reducerDescription = {
  [actions.TOGGLE]: onToggle()
};

export default createReducer(initialState, reducerDescription);
```

If we now do:

```
dispatch({ type: actions.TOGGLE, target: 'isComplete' });
```

Then the state will be:

```
state = {
  isComplete: true
};
```

It's also possible to set a custom value directly with this action. This is useful for cases in which you are using the state to determine the visibility of an UI element, like showing an error message that the user can hide. You want to toggle the value from `false` to `true` when the error happens and from `true` to `false` when the user hides the error message. Finally, when the user navigates to a different screen, you may want to set the value to `false` to make sure it's not shown on the new screen.

```
dispatch({ type: actions.TOGGLE, target: 'isComplete', payload: false });
```

### Custom selectors

`onToggle` effect receives an optional parameter:

- selector: This function describes how we read the custom value from the `action`.  
  `(action, state) => any`  
  By default, is:  
  `action => action.payload`
