function createAction(type, target, payload) {
  if (!type) {
    throw new Error('Action must require a type');
  }
  if (!target || target === '') {
    console.warn('You should use a target for the action');
  }
  return { type, target, payload };
}

export default createAction;
