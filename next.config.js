const path = require("path")
const { merge } = require("webpack-merge")

module.exports = {
  future: {
    webpack5: true,
  },
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
