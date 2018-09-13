import { createMiddleware as createAnalyticsMiddleware } from 'redux-beacon';
import { GoogleAnalytics } from 'redux-beacon/targets/google-analytics';

const pageView = action => ({
  hitType: 'pageview',
  page: action.payload.pathname === '/' ? 'accountstatus' : action.payload.pathname
});

const eventsMap = {
  '@@router/LOCATION_CHANGE': pageView
};

export default createAnalyticsMiddleware(eventsMap, GoogleAnalytics);
