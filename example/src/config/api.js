import { create } from 'apisauce';

const baseURL = 'http://wolox.com';

if (baseURL === 'http://wolox.com') {
  console.warn('API baseURL has not been properly initialized');
}

const api = create({
  // TODO Add this if you need it
  // baseURL: process.env.API_BASE_URL,
  baseURL,
  timeout: 15000
});

// eslint-disable-next-line no-unused-vars, prettier/prettier
export const apiSetup = dispatch => {
  api.addMonitor(response => {
    if (response.status === 401) {
      // TODO: These callbacks should only be called if no other callback was asigned for the response.
      // - dispatch(alertActions.error(i18next.t('apiErrors:expired')));
    }
  });

  api.addMonitor(response => {
    if (response.problem === 'NETWORK_ERROR') {
      // TODO: These callbacks should only be called if no other callback was asigned for the response.
    }
  });
};

export default api;
