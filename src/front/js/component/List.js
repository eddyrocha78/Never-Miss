import React from "react";
import { Link } from "react-router-dom";

export const List = ({ imgpath, title, description }) => {
  const url = "https://image.tmdb.org/t/p/w300_and_h450_bestv2" + imgpath;

  return (
    <li>
      <div className="list-group-item d-flex mx-4 bg-black text-white">
        <img style={{width:"100px"}}src={url} alt={title} />
        
          <p className="text-midlle-center">{title}</p>
          
        
      </div>
    </li>
  );
};
