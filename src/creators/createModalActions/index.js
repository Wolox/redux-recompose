function createModalActions({ type, target, contentTarget }) {
  return {
    open: modalContent => ({ type: `${type}_OPEN`, target, payload: { [contentTarget]: modalContent } }),
    close: (emptyModalContent = null) => ({ type: `${type}_CLOSE`, target, payload: { [contentTarget]: emptyModalContent } })
  };
}

export default createModalActions;
