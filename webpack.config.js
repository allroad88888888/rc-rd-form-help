const path = require("path"),process = require("process");
const webpack = require("webpack");
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

const PATHS = {
  libsPath:path.resolve(process.cwd(),"./component/"),

}


module.exports = {
  entry: {
    "yuapt-help":"./component/index.js"//"./component/index.js"
  },
  output: {
    path: __dirname + "/build",
    libraryTarget: 'umd',
    library: '[name]',
    filename: '[name].js'
  },
  devtool:"eval-source-map",
  //devtool: '#cheap-module-eval-source-map',
  externals: {'react': 'react', 'react-dom': 'react-dom',"react-router-redux":"react-router-redux","redux":"redux","lodash":"lodash"},
  module: {
    loaders: [
        {
          test: /\.js?$/,
          loader: 'babel',
          query: {
            presets: ["react","es2015"], //react
          }
        }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
};



