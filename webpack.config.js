const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development", // development || production
  entry: ["./src/js/main.js", "./src/sass/main.scss"], // 시작점
  output: {
    path: path.resolve("./dist"), // 저장 경로
    filename: "js/[name].js", // 이름
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "css/[name].css" }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  module: {
    rules: [
      // babel
      {
        test: /\.js$/,
        include: [path.resolve("./src/js")],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              [
                "@babel/plugin-transform-runtime",
                {
                  corejs: 3,
                  proposals: true,
                },
              ],
            ],
          },
        },
        exclude: /node_modules/,
      },

      // scss
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader", // translates CSS into CommonJS
          "sass-loader", // compiles Sass to CSS, using Node Sass by default
        ],
        exclude: /node_modules/,
      },

      // img
      {
        test: /\.png$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "img/[name].[ext]",
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  devtool: "source-map",
};
