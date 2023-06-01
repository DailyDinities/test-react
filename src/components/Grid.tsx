import React from "react";
import PropTypes from 'prop-types';
import { FluxibleComponentContext } from 'fluxible-addons-react';
import { connectToStores } from "fluxible-addons-react";

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

  dateToHoursAndMinutes(input) {
    const hours = Math.floor(+input / 3600); // Conversion en heures
    const minutes = Math.floor((+input % 3600) / 60); // Conversion en minutes
    const formattedHours = (hours < 10) ? "0" + hours : hours;
    const formattedMinutes = (minutes < 10) ? "0" + minutes : minutes;

    return formattedHours + ":" + formattedMinutes;
  }

  getDurationPourcentage(startTime, endTime) {
    // 97200 correspond à l'horaire de fin des programmes de la journée.
    console.log(((endTime - startTime) / (97200 -10800)) * 100 *50)
    return ((endTime - startTime) / (97200 -10800)) * 100
  }



  render() {
    const { data } = this.props;


    return (
      <div className="Grid">
        <div className="Title">
          {'Grille du ' + this.dateToDdMmYyyy(data.day)}
        </div>
        <div className="Chns">
          {data.chns.map(chn => (
            <div key={chn.key} className="Chn">
              <div className="ChnKey">{chn.key}</div>
              <div className="Shows">
                {chn.shows.map(show => (
                  <div
                    key={show.startTime}
                    className="Show"
                    style={{ height: `${this.getDurationPourcentage(show.startTime, show.endTime) * 50}px` }}
                  >
                    <div className="ShowMainInfos">
                      <div className="ShowHoursAndPDA">
                        <div className="ShowTime">{this.dateToHoursAndMinutes(show.startTime)}</div>
                        <div>PDA : {show.pda}</div>
                      </div>
                    <div className="ShowTitle">{show.title}</div>
                    <div>{this.getDurationPourcentage(show.startTime, show.endTime).toFixed(2)}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
