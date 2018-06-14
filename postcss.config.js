module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-mixins': {},
    'postcss-preset-env': {
      features: {
        customProperties: {
          preserve: true,
          warnings: false
        },
        rem: false,
        nesting: true
      }
    },
    'postcss-object-fit-images': {},
    'postcss-nested': {},
    'postcss-normalize': {},
    'css-mqpacker': {
      sort: true
    },
    'postcss-discard-comments': {}
  }
}
