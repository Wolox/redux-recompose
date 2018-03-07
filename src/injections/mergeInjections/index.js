function mergeInjections(injections) {
  return injections.reduce((a, b) => ({ ...a, ...b }), {});
}

export default mergeInjections;
