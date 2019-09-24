import { isStringArray, isValidObject } from '../../utils/typeUtils';

const customCompleter = (target, completers = {}) =>
  Object.keys(completers)
    .map(completer => ({ [`${target}${completer}`]: completers[completer] }))
    .reduce((acc, value) => ({ ...acc, ...value }), {});

function completeState({ description, targetCompleters = [], ignoredTargets = [] }) {
  if (!isValidObject(description)) {
    throw new Error('Expected an object as a state to complete');
  }
  if (!isStringArray(ignoredTargets)) {
    throw new Error('Expected an array of strings as ignored targets');
  }

  const primaryState = Object.keys(description)
    .filter(key => ignoredTargets.indexOf(key) === -1)
    .reduce((acc, key) => ({
      ...acc,
      [`${key}Loading`]: false,
      [`${key}Error`]: null
    }), {});

  const customCompleters = targetCompleters
    .map(({ completers, targets }) => targets
      .map(target => customCompleter(target, completers))
      .reduce((acc, value) => ({ ...acc, ...value }), {}))
    .reduce((acc, value) => ({ ...acc, ...value }), {});

  return { ...description, ...primaryState, ...customCompleters };
}

export default completeState;


/**

completeState({
  estudiantes: null,
  logged: false,

  input: '',
  inputWriting: false,

  data: null,
  dataClear: true
}, ['logged']);


completeState({
  description: {
    estudiantes: null,
    logged: false,
    input: '',
    data: null
  },
  ignoredTargets: ['logged'],
  targetCompleters: [
    {
      completers: {
        Writing: false
      },
      targets: ['input', 'logged' ]
    },

    {
      completers: {
        Clear: true
      },
      targets: ['data']
    }
  ]
})

 */
