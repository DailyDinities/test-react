import React from "react";

const ShowItem = ({ show }) => {

  const getDurationPourcentage = (el) => {
    return ((el.endTime - el.startTime) / (97200 -10800)) * 100
  };

  const dateToHoursAndMinutes = (input) => {
    const hours = Math.floor(+input / 3600); // Conversion en heures
    const minutes = Math.floor((+input % 3600) / 60); // Conversion en minutes
    const formattedHours = (hours < 10) ? "0" + hours : hours;
    const formattedMinutes = (minutes < 10) ? "0" + minutes : minutes;

    return formattedHours + ":" + formattedMinutes;
  }

  return (
    <div
      className="Show"
      style={{ height: getDurationPourcentage(show) * 50 }}
    >
      <div className="ShowMainInfos">
        <div className="ShowHoursAndPDA">
          <div className="ShowTime">{dateToHoursAndMinutes(show.startTime)}</div>
          <div>PDA : {show.pda}</div>
        </div>
        <div className="ShowTitle">{show.title}</div>
        <div>{getDurationPourcentage(show).toFixed(2)}%</div>
      </div>
    </div>
  );
};

export default ShowItem;
