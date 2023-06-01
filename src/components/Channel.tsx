import React from "react";
import ShowItem from "./ShowItem.js";

const Channel = ({ channel }) => {
  return (
    <div key={channel.key} className="Chn">
      <div className="ChnKey">{channel.key}</div>
      <div className="Shows">
        {channel.shows.map(show => (
          <ShowItem key={show.startTime} show={show} />
        ))}
      </div>
    </div>
  );
};

export default Channel;
