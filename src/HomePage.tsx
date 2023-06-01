import React from "react";

import { Grid } from "./components/Grid.js";

if (process.env.BROWSER) {
  import("./style/HomePage.scss");
}

type propsType = any;

class Component extends React.Component<propsType> {
  render() {
    return (
      <div className="HomePage">
        <Grid />
      </div>
    );
  }
}

export const HomePage = Component;