//entry->output
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = (env) => {
  const isProduction = env === "production";
  const CSSExtract = new ExtractTextPlugin("styles.css");
  return {
    entry: "./src/app.js",
    output: {
      path: path.join(__dirname, "public"),
      filename: "bundle.js",
    },
    mode: isProduction ? "production" : "development",
    module: {
      rules: [
        {
          loader: "babel-loader",
          test: /\.js$/,
          exclude: /node_modules/,
        },
        {
          test: /\.s?css$/,
          // use: ["style-loader", "css-loader", "sass-loader"],
          use: CSSExtract.extract(["css-loader", "sass-loader"]),
        },
      ],
    },
    plugins: [CSSExtract],
    devtool: isProduction ? "source-map" : "eval-cheap-module-source-map",
    devServer: {
      contentBase: path.join(__dirname, "public"),
    },
  };
};
