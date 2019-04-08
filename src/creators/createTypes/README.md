## createTypes - Creator
  
Receives a string list and another string to prepend a namespace.  
It builds an object with action names as constants.  
Example:  
```js
const actions = createTypes(['ACTION1', 'ACTION2'], '@@NAMESPACE');
```
`actions` will be like:  

```js
const actions = {
  'ACTION1': '@@NAMESPACE/ACTION1',
  'ACTION2': '@@NAMESPACE/ACTION2'
};
```   
