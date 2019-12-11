export const decorateWithScope = (scopes, actionCreators) => {
    const asyncRegex = /async/;
    return Object.entries(actionCreators).reduce((result, [actionName, actionCreator]) => {
      if (asyncRegex.test(actionCreator.toString())) {
        result[actionName] = (...args) => {
          const asyncAction = actionCreator(...args);
          asyncAction.scopes = scopes[actionName];
          return asyncAction;
        };
        return result;
      }
      result[actionName] = (...args) => ({
        ...actionCreator(...args),
        scopes: scopes[actionName]
      });
      return result;
    }, {});
  };
