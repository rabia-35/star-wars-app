import React from "react";
import { useSelector } from "react-redux";
import { useParams, Navigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";

const Detail = () => {
  const { name } = useParams();
  const items = useSelector((state) => state.starships.items);

  const detailFiltered = items.filter(
    (item) => item.name.match(/\w+/g).join("-") === name
  );
  const detail = detailFiltered[0];

  if (!detail) {
    return <Navigate to="/starships" replace={true} />;
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center">
        {detail && (
          <div className="row p-4 d-flex justify-content-evenly align-items-center detail-border ">
            <div className="col-12 col-md-4">
              <img
                src={`../images/starships/${name}.png`}
                className="card-img-top mb-4"
                alt={detail.name}
              />
            </div>
            <div className="col-12 col-md-8 detail-info ">
              <h1 className="fs-3 text-center mb-4">{detail.name}</h1>
              <p className="fs-6">
                <strong>Model</strong>
                <small className="float-end">{detail.model}</small>
              </p>
              <p className="fs-6">
                <strong>Hyperdrive Rating</strong>
                <small className="float-end">{detail.hyperdrive_rating}</small>
              </p>
              <p className="fs-6">
                <strong>Cargo Capacity</strong>
                <small className="float-end">{detail.cargo_capacity}</small>
              </p>
              <p className="fs-6">
                <strong>Passengers</strong>
                <small className="float-end">{detail.passengers}</small>
              </p>
              <p className="fs-6">
                <strong> Max Atmosphering Speed</strong>
                <small className="float-end">
                  {detail.max_atmosphering_speed}
                </small>
              </p>
              <p className="fs-6">
                <strong>Manufacturer</strong>
                <small className="float-end">{detail.manufacturer}</small>
              </p>
              <p className="fs-6">
                <strong>Crew</strong>
                <small className="float-end">{detail.crew}</small>
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="d-flex justify-content-center">
        <Link
          to="/starships"
          className="back-page text-decoration-none text-muted d-flex align-items-center"
        >
          <FontAwesomeIcon icon={faCaretLeft} className="fa-2x" />
          <span>Back to Starships Page</span>
        </Link>
      </div>
    </div>
  );
};

export default Detail;
