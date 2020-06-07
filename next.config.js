const path = require("path")
const merge = require("webpack-merge")
const isProd = process.env.NODE_ENV === "production"

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
