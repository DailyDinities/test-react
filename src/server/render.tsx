import React from "react";
import ReactDOMServer from "react-dom/server.js";
import serialize from "serialize-javascript";
import fs from "fs";
import { navigateAction } from "fluxible-router";
import { FluxibleProvider } from 'fluxible-addons-react';

import app from "../app.js";
import { HtmlDocument } from "../HtmlDocument.js";

let webpackStats;
try {
  if (process.env.NODE_ENV === "production") {
    const rawWebpackStats = fs.readFileSync('./webpack-stats.json');
    webpackStats = JSON.parse(rawWebpackStats + '');
  }
} catch {
  webpackStats = {};
}

const renderApp = ({ req, res, context = undefined, next }) => {
  try {
    const rawWebpackStats = fs.readFileSync('./webpack-stats.json');
    webpackStats = JSON.parse(rawWebpackStats + '');

    // dehydrate the app and expose its state
    const state = "window.App=" + serialize(app.dehydrate(context)) + ";";

    const Application = app.getComponent();
    const componentContext = context.getComponentContext();

    // The application component is rendered to static markup
    // and sent as response.
    const html = ReactDOMServer.renderToString(
      <FluxibleProvider context={componentContext}>
        <HtmlDocument
          state={state}
          script={webpackStats.script}
          css={webpackStats.css}>

          <Application />
        </HtmlDocument>
      </FluxibleProvider>
    );
    const doctype = "<!DOCTYPE html>";

    let status = 200;
    if (req.url === '/500')
      status = 500;

    res.status(status).send(doctype + html);
  }
  catch (e) {
    next(e);
  }
}

const render = async (req, res, next) => {
  try {
    // Create a fluxible context (_csrf is needed by the fetchr plugin)
    const context = app.createContext({
      req: req
    });

    // Fill the intl store with the messages according to locale and
    // execute the navigate action to fill the RouteStore
    // (here we make use of executeAction returning a promise)
    await context.executeAction(navigateAction, { url: req.url });

    renderApp({ req, res, context, next });
  } catch (err) {
    if (!err.statusCode || !err.status) {
      next(err);
    }
    else {
      renderApp({ req, res, context: undefined, next });
    }
  }
}

export default render;