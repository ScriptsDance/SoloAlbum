const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './client/src/index.js'), 
  output: {
    path: path.resolve(__dirname + "/build"),
    filename: 'bundle.js'
  },
  mode: "development",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "/build")
    },
    port: 8080,
    host: 'localhost',
    open: true
  },
  module: {
    rules: [
      { 
        //be able to read react jsx
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/env", "@babel/preset-react"] },
        },
      },
      //be able to read scss
      {
        test: /\.s[ac]ss$/i,
        exclude: /(node_modules)/,
        use: ["style-loader", "css-loader", "sass-loader"],
        
      } 

    ] 
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./client/src/index.html"),
    }),
  ],
}
