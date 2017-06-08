const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const LiveReloadPlugin = require('webpack-livereload-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "[name].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './index.js'
  },
  module: {
      rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['react-hot-loader', 'babel-loader?presets[]=react,presets[]=es2015,presets[]=env']
      },
      {
       test: /\.svg$/,
       loader: 'svg-inline-loader'
      },
      {
        test: /\.png/,
        loader: 'url-loader'
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
            use: [{
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }],
            // use style-loader in development
            fallback: "style-loader"
        })
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    extractSass,
    new LiveReloadPlugin()
  ]
};
