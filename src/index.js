import completeReducer from './completers/completeReducer';
import completeState from './completers/completeState';

import createReducer from './creators/createReducer';
import createTypes from './creators/createTypes';

import onSuccess from './effects/onSuccess';
import onFailure from './effects/onFailure';
import onLoading from './effects/onLoading';
import onLoaded from './effects/onLoaded';

exports.completeReducer = completeReducer;
exports.completeState = completeState;
exports.createReducer = createReducer;
exports.createTypes = createTypes;
exports.onSuccess = onSuccess;
exports.onFailure = onFailure;
exports.onLoading = onLoading;
exports.onLoaded = onLoaded;
