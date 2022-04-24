module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {
    name: 'Binance',
    manifestCrossorigin: 'anonymous'
  },
  pluginOptions: {
    i18n: {
      locale: 'ja',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
      enableLegacy: false
    }
  }
}
