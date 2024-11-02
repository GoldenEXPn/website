const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv').config({ path: './.env' });

module.exports = {
  // devtool: false,
  entry: "./src/index.js", // Entry point for your application
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "bundle.js", // Output bundle file
    publicPath: "/", // Public URL of the output directory when referenced in a browser
  },
  mode: "development", // Set the mode to 'development' for development build
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed) // Injects environment variables
    })
  ],
  devServer: {
    static: path.resolve(__dirname, "public"), // Serve files from 'public' directory
    port: 3000, // Dev server port
    open: true, // Open the browser after the server starts
    // hot: true, // Enable Hot Module Replacement (HMR)
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  require("tailwindcss"),
                  // require('autoprefixer')
                ],
              },
            },
          },
        ],
      },
      // Other rules...
    ],
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components/"),
    },
    extensions: [".js", ".jsx"],
  },
  // devServer: {
  //   historyApiFallback: true,
  //   static: ,
  // },
};
