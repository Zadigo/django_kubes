export default {
  install(app: any) {
    app.config.globalProperties.$primevue = {
      config: {
        ripple: true,
        inputStyle: 'outlined',
        locale: {
          startsWith: 'Starts with',
          // More keys as needed
        }
      }
    }
  }
}
