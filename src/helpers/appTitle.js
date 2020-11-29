import localeFilter from './filters/localeFilter';

/* eslint-disable no-param-reassign */
export default {
  install(Vue) {
    Vue.prototype.$title = function createTitle(title) {
      const appName = process.env.VUE_APP_TITLE;
      return `${appName} | ${localeFilter(title)}`;
    };
  },
};
