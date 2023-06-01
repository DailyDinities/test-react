// This is the webpack config to use during development.
import path from "path";
import webpack from "webpack";
import postcssInset from "postcss-inset";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

import WriteStats from "./utils/WriteStats.js";

const dist = path.resolve("./public/assets");
const host = 'localhost';
const port = parseInt(process.env.PORT) + 1 || 3001;

export const devConfig = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: './src/client.js',
  output: {
    filename: '[name]-[fullhash].js',
    path: dist,
    publicPath: 'http://' + host + ':' + port + '/assets/'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    extensionAlias: {
      '.js': ['.tsx', '.ts', '.js'],
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'ts-loader',
          },
        ]
      },
      {
        test: /\.(s?css)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                  ],
                  [
                    postcssInset(),
                  ],
                ],
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          },
        ]
      },
    ]
  },

  optimization: {
    moduleIds: 'named'
  },

  plugins: [
    // hot reload
    new ReactRefreshWebpackPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
        APP_NAME: JSON.stringify(process.env.APP_NAME),
        BROWSER: JSON.stringify(true),
      }
    }),

    // stats
    new WriteStats(),

    // print a webpack progress
    new webpack.ProgressPlugin(function (percentage, message) {
      var MOVE_LEFT = Buffer.from("1b5b3130303044", "hex").toString();
      var CLEAR_LINE = Buffer.from("1b5b304b", "hex").toString();
      process.stdout.write(CLEAR_LINE + Math.round(percentage * 100) + "% :" + message + MOVE_LEFT);
    })
  ]
};