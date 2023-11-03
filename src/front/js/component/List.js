import React from "react";
import { Link } from "react-router-dom";

export const List = ({ imgpath, title, description }) => {
  const url = "https://image.tmdb.org/t/p/w300_and_h450_bestv2" + imgpath;

  return (
    <li>
      <div className="">
        <img src={url} alt={title} />
        <div className="descriptions">
          <h1>{title}</h1>
          <p>{description ? description : "There is no Summary available"}</p>
        </div>
      </div>
    </li>
  );
};
