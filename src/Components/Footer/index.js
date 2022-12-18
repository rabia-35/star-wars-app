import React from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const scrollWin = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className="scroll-top">
      <div
        role="button"
        className="text-center back-top ms-auto"
        onClick={scrollWin}
      >
        <FontAwesomeIcon icon={faArrowUp} className="fa-2x " />
      </div>
    </div>
  );
};

export default Footer;
