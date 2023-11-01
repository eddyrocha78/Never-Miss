import React from "react";
import { Link } from "react-router-dom";

export const Card = (imgpath, tittle, description) => {
  const url = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + imgpath 
  return (
    <div className="m-4">
             <div class="card">
  <img
          src={url}
         
        />
          <div class="descriptions">
                <h1>{tittle}John Wick 3</h1>
                <p>
                    {description}After gunning down a member of the High Table -- the shadowy international assassin's guild -- legendary hit man John Wick finds himself stripped of the organization's protective services. Now stuck with a $14 million bounty on his head, Wick must fight his way through the streets of New York as he becomes the target of the world's most ruthless killers.
                </p>
               
            </div>
        </div>
    </div>
  );
};
