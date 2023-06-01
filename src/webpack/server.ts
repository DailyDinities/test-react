// Starts a webpack dev server for dev environments

import WebpackDevServer from "webpack-dev-server";
import webpack, { Configuration } from "webpack";
import { devConfig } from "./dev.config.js";

const WEBPACK_HOST = process.env.HOST || "localhost";
const WEBPACK_PORT = parseInt(process.env.PORT) + 1 || 3001;

const serverOptions = {
  hot: true,
  host: WEBPACK_HOST,
  port: WEBPACK_PORT,
  devMiddleware: {
    publicPath: devConfig.output.publicPath,
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  },
};

const compiler = webpack(devConfig as Configuration);
const devServer = new WebpackDevServer(serverOptions, compiler);

(async () => {
  await devServer.start();
  console.log("WebpackDevServer Running");
})();