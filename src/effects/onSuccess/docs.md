## onSuccess - Effect

It will:  
  * Put `${action.target}Loading` in `false`  
  * Put `${action.target}Error` in `null`  
  * Fill `${action.target}` with your `action.payload` by default, or use a selector provided  

Examples:  
  ```  
  const selector = (action, state) => action.payload || state[action.target];  
  const reducerDescription = {  
    'SUCCESS': onSuccess(),  
    'SUCCESS_AND_ADD': onSuccess(selector)  
  };  
  ```  
