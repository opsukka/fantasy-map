const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const LiveReloadPlugin = require('webpack-livereload-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "[name].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
  mode: 'production', // Change this to Development when doing dev work, and to Production when pushing to git or firebase
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './index.js'
  },
  module: {
      rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015', 'env', 'stage-2']
          }
        }
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-inline-loader',
          },
        ]
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
  devServer: {
    compress: true,
    port: 8080,
    hot: true,
    open: true
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
