const decorateWithScope = (scopes, actionCreators) => {
  const asyncRegex = /async/;
  return Object.entries(actionCreators).reduce((result, [actionName, actionCreator]) => {
    if (asyncRegex.test(actionCreator.toString())) {
      // eslint-disable-next-line no-param-reassign
      result[actionName] = (...args) => {
        const asyncAction = actionCreator(...args);
        asyncAction.scopes = scopes[actionName];
        return asyncAction;
      };
      return result;
    }
    // eslint-disable-next-line no-param-reassign
    result[actionName] = (...args) => ({
      ...actionCreator(...args),
      scopes: scopes[actionName]
    });
    return result;
  }, {});
};

export default decorateWithScope;
