function mergeInjections(injections) {
  if (injections.constructor !== Array) {
    throw new TypeError('Expected action injections to be an array');
  }
  return injections.reduce((a, b) => ({ ...a, ...b }), {});
}

export default mergeInjections;
