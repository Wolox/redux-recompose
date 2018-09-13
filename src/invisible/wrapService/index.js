import { createExternalActions } from '../wrapCombineReducers';

export default (Service, reducerName, mapTargets = {}) => {
  const dispatchableServices = {};
  const $ = createExternalActions(reducerName);
  Object.keys(Service).forEach(serviceName => {
    dispatchableServices[serviceName] = args => ({
      external: $,
      target: mapTargets[serviceName] || serviceName,
      service: Service[serviceName],
      payload: args,
      ...Service[serviceName]
    });
  });
  return dispatchableServices;
};
