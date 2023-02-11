import React, { useState } from "react";
import "./style.css";
import {useParams } from "react-router-dom";
import CardInfo from "./cardInfo";

const Card = ({ starship }) => {
  const { number } = useParams();

  const detailName = starship.name.match(/\w+/g).join("-");

  return (
    <div
      className=" col-12 col-sm-6 col-lg-4"
      onClick={() => sessionStorage.setItem("position", window.scrollY)}
    >
      <div className="card mb-3">
        <img
          src={`../images/starships/${detailName}.png`}
          className="img-fluid rounded-start"
          alt={detailName}
        />
        <h1 className="card-title fs-6">{starship.name}</h1>
          <CardInfo
            number={number}
            starship={starship}
            detailName={detailName}
          />
      </div>
    </div>
  );
};

export default React.memo(Card);
