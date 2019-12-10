
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
export default {
  install(Vue) {
    Vue.prototype.$message = function showInfoMess(html) {
      M.toast({ html, displayLength: 2000 })
    }

    Vue.prototype.$error = function showErrorMess(html) {
      M.toast({ html: `Ошибка: ${html}`, displayLength: 2000 })
    }
  },
}
