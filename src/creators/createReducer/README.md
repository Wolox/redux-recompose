## createReducer - Creator

This function allows us to create our own reducer based on an object.  

Receives an initialState and a reducer description.  
Example:  
```js
const reducerDescription = {
  'ACTION_NAME': (state, action) => ({ ...state, aTarget: ':)' })
}

const initialState = { aTarget: null };
export default createReducer(initialState, reducerDescription);
```

So, we may do:  
```js
dispatch({ type: 'ACTION_NAME' });
```

And then the state will be like:  
```js
state = {
  aTarget: ':)'
};  
```
