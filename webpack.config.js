const path = require("path");
const JsDocPlugin = require("jsdoc-webpack-plugin");

const config = {
  entry: "./index.js",
  output: {
    filename: "awf.min.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.twig$/,
        include: [path.resolve(__dirname, "src/template")],
        use: "raw-loader",
      },
    ],
  },
  plugins: [
    new JsDocPlugin({
      conf: './src/conf/jsdoc.config.js',
      cwd: '.',
      preserveTmpFile: false,
      recursive: true,
    })
  ]
};

module.exports = config;
