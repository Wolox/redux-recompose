# Changelog

All notable changes to this project will be documented in this file.

## [3.0.0] - 2021-03-15
- Modified some APIs:
`completeState({a:1,b:2}, ['b'])` is now `completeState({description: {a: 1}, ignoredTargets: {b: 2})`
`completeTypes(['LOGIN'], ['AUTH_INIT', 'LOGOUT'])` is now `completeTypes({primaryActions: ['LOGIN'], ignoredActions: ['AUTH_INIT', 'LOGOUT'])`
- Introduced polling actions
- Deleted modal-related completers
- Deleted `onSubscribe` and `onUnsubscribe` effects
- Updated dependencies
- Optimized building configuration

## [2.0.0] - 2018-09-14
- Introduced invisible reducer

## [1.0.0] - 2018-01-16
- Completers: `completeReducer`, `completeTypes`, `completeState`
- Creators: `createReducer`, `createTypes`, `createThunkAction`
- Effects: `onDelete`, `onDeleteByIndex`, `onFailure`, `onLoaded`, `onLoading`, `onReadValue`, `onSetValue`, `onSuccess`
- Some basic Injections to customize `baseThunkAction`.


## [0.0.1] - 2017-12-14
- Added basic effects: `onLoading`,  `onLoaded`, `onSuccess`, `onFailure`
- Added `createTypes` and `createReducer` as creators.
- Added `completeReducer` and `completeState` as completers.
