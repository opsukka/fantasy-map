const path = require('path');
const merge = require('webpack-merge')

// Plugins
const LiveReloadPlugin = require('webpack-livereload-plugin')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const baseEntries = [
  { theme: `./index.js` } // Main theme entry
]

const baseConfiguration = {
  context: path.resolve(__dirname, 'src/'),
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ]
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
      // CSS
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          {
            loader: 'resolve-url-loader'
          },
          'postcss-loader'
        ]
      },
      // Sass
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true
            }
          },
          'svgo-loader'
        ]
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: '/dist/assets/images',
              outputPath: 'images/'
            }
          },
          'image-webpack-loader'
        ]
      }
    ]
  },
  devServer: {
    //compress: true,
    port: 8000,
    hot: true,
    open: true
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/assets/')
  },
  plugins: [
    // Extract CSS to its own file
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id}.css'
    }),

    // Create SVG sprite
    new SpriteLoaderPlugin(),

    // Livereload plugin
    //new LiveReloadPlugin()
  ]
}

const exportArray = [...baseEntries.map((entry) => {
  return merge(baseConfiguration, {
    entry
  })
})]

module.exports = exportArray
