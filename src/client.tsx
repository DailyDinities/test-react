import React from "react";
import ReactDOM from "react-dom";
import { FluxibleProvider } from 'fluxible-addons-react';

import app from "./app.js";

const render = (context) => {
  const container = document.getElementById("root");
  const Application = app.getComponent();
  const dom = (
    <FluxibleProvider context={context.getComponentContext()}>
      <Application />
    </FluxibleProvider>
  );

  ReactDOM.unmountComponentAtNode(container);
  process.env.NODE_ENV === 'development' ?
    ReactDOM.render(dom, container) :
    ReactDOM.hydrate(dom, container);
};

app.rehydrate(window['App'], (err, context) => {
  if (err)
    throw err;
  render(context);
});