import * as yup from 'yup';

const schema = yup.array().typeError('injections should be an array');

function mergeInjections(injections) {
  schema.validateSync(injections);
  return injections.reduce((a, b) => ({ ...a, ...b }), {});
}

export default mergeInjections;
