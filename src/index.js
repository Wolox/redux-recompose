import configureMergeState from './configuration';

import wrapCombineReducers, { createExternalActions } from './invisible/wrapCombineReducers';
import wrapService from './invisible/wrapService';

import completeReducer from './completers/completeReducer';
import completeState from './completers/completeState';
import completeTypes from './completers/completeTypes';

import createReducer from './creators/createReducer';
import createTypes from './creators/createTypes';
import createModalActions from './creators/createModalActions';
import createThunkAction from './creators/createThunkAction';

import onDelete from './effects/onDelete';
import onDeleteByIndex from './effects/onDeleteByIndex';
import onFailure from './effects/onFailure';
import onLoaded from './effects/onLoaded';
import onLoading from './effects/onLoading';
import onReadValue from './effects/onReadValue';
import onSetValue from './effects/onSetValue';
import onSpreadValue from './effects/onSpreadValue';
import onSuccess from './effects/onSuccess';
import onSubscribe from './effects/onSubscribe';
import onToggle from './effects/onToggle';
import onUnsubscribe from './effects/onUnsubscribe';
import onAppend from './effects/onAppend';
import onCycle from './effects/onCycle';
import onConcatenate from './effects/onConcatenate';
import onReplace from './effects/onReplace';

import baseThunkAction from './injections/baseThunkAction';
import composeInjections from './injections/composeInjections';
import withFailure from './injections/withFailure';
import withFlowDetermination from './injections/withFlowDetermination';
import withPostFetch from './injections/withPostFetch';
import withPostSuccess from './injections/withPostSuccess';
import withPostFailure from './injections/withPostFailure';
import withPreFetch from './injections/withPreFetch';
import withStatusHandling from './injections/withStatusHandling';
import withSuccess from './injections/withSuccess';

import fetchMiddleware from './middlewares/fetch';

exports.configureMergeState = configureMergeState;

exports.wrapCombineReducers = wrapCombineReducers;
exports.createExternalActions = createExternalActions;
exports.wrapService = wrapService;

exports.completeReducer = completeReducer;
exports.completeState = completeState;
exports.completeTypes = completeTypes;

exports.createReducer = createReducer;
exports.createTypes = createTypes;
exports.createThunkAction = createThunkAction;
exports.createModalActions = createModalActions;

exports.onDelete = onDelete;
exports.onDeleteByIndex = onDeleteByIndex;
exports.onFailure = onFailure;
exports.onLoaded = onLoaded;
exports.onLoading = onLoading;
exports.onReadValue = onReadValue;
exports.onSetValue = onSetValue;
exports.onSpreadValue = onSpreadValue;
exports.onSuccess = onSuccess;
exports.onSubscribe = onSubscribe;
exports.onToggle = onToggle;
exports.onUnsubscribe = onUnsubscribe;
exports.onAppend = onAppend;
exports.onCycle = onCycle;
exports.onConcatenate = onConcatenate;
exports.onReplace = onReplace;

exports.baseThunkAction = baseThunkAction;
exports.composeInjections = composeInjections;
exports.withFailure = withFailure;
exports.withFlowDetermination = withFlowDetermination;
exports.withPostFetch = withPostFetch;
exports.withPostSuccess = withPostSuccess;
exports.withPostFailure = withPostFailure;
exports.withPreFetch = withPreFetch;
exports.withStatusHandling = withStatusHandling;
exports.withSuccess = withSuccess;

exports.fetchMiddleware = fetchMiddleware;
