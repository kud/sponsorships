const path = require("path")
const { merge } = require("webpack-merge")

module.exports = {
  webpack: (config) =>
    merge(
      {
        resolve: {
          alias: {
            "~": path.resolve(__dirname, "src"),
          },
        },
      },
      config,
    ),
}
