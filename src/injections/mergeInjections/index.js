function mergeInjections(injections) {
  if (injections.constructor !== Array) {
    throw new TypeError('Expected actions injections to be an array');
  }
  return injections.reduce((a, b) => ({ ...a, ...b }), {});
}

export default mergeInjections;
