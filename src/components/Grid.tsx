import React from "react";
import PropTypes from 'prop-types';
import { FluxibleComponentContext } from 'fluxible-addons-react';
import { connectToStores } from "fluxible-addons-react";
import Channel from "./Channel.js"

if (process.env.BROWSER) {
  require("../style/Grid.scss");
}

type propsType = any;

class Component extends React.Component<propsType> {
  padStr(input) {
    return (input < 10) ? "0" + input : "" + input;
  }

  dateToDdMmYyyy(input) {
    const dte = new Date(input);
    return this.padStr(dte.getDate()) + '/' + this.padStr(dte.getMonth() + 1) + '/' + dte.getFullYear();
  }


  render() {
    const { data } = this.props;



    return (
      <div className="Grid">
        <div className="Title">
          {'Grille du ' + this.dateToDdMmYyyy(data.day)}
        </div>
        <div className="Chns">
          {data.chns.map(channel => (
            <Channel key={channel.key} channel={channel} />
          ))}
        </div>
      </div>
    );

  }
}

Component.contextType = FluxibleComponentContext;
export const Grid = connectToStores(Component, ["GridStore"], (context) => {
  return {
    data: context.getStore("GridStore").getData(),
  };
}, { getStore: PropTypes.func });
