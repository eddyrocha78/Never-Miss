import React from "react";
//import { Link } from "react-router-dom";



export const CardFavorite = ({title,}) => {
  const url = 'https://image.tmdb.org/t/p/w100_and_h150_bestv2' + imgpath;
  

  return (
    <div className="container">
      <div className="mb-3 me-1 container-fluid" style={{ backgroundColor: "rgba(82, 117, 82, 1)", height: "100px", width: "auto" }}>
        <div className="row ">
          <div className="col mt-2">
            <img src={url} className="img-fluid rounded-start" alt={title}/>
          </div>
          <div className="col-md-10">
            <div className="text-start ps-2 mt-0 pt-0">
              <h5 className="">{title}</h5>
    
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
