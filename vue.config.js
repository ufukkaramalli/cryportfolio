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
      localeDir: undefined,
      enableInSFC: undefined,
      enableBridge: undefined
    }
  }
}
