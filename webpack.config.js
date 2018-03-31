const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
// Build directory is where the bundle file will be placed
const BUILD_DIR = path.resolve(__dirname, 'dist');
// App directory is where all of your raw JSX files will be placed
const APP_DIR = path.resolve(__dirname, 'src');

module.exports = {
  entry: APP_DIR + "/js/app.jsx",
  output: {
    path: BUILD_DIR,
    filename: "bundle.js"
  },
  devServer: {
    contentBase: BUILD_DIR
  },   
  module: {
    rules: [
      {
        test: /\.js?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
plugins: [
    new HtmlWebPackPlugin({
      template: APP_DIR + '/index.html',
      filename: "./index.html"
    })
  ]
};