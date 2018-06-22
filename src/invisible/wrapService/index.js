import { createExternalActions } from '../wrapCombineReducers';

export default (Service, reducerName) => {
  const dispatchableServices = {};
  const $ = createExternalActions(reducerName);
  Object.keys(Service).forEach(serviceName => {
    dispatchableServices[serviceName] = args => ({
      external: $,
      target: serviceName,
      service: Service[serviceName],
      payload: args
    });
  });
  return dispatchableServices;
};
