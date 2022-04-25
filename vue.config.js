module.exports = {
  transpileDependencies: [
    'i18n'
  ],
  pwa: {
    name: 'Binance',
    manifestCrossorigin: 'anonymous'
  },
  pluginOptions: {
    i18n: {
      locale: undefined,
      fallbackLocale: undefined,
      localeDir: "locales",
      enableInSFC: false,
      enableBridge: undefined
    }
  }
}
