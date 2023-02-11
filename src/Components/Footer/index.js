import React, { useState, useEffect } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const [reWidth, setReWidth] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", function () {
      setReWidth(this.scrollY);
    });
  }, []);

  const scrollWin = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      {reWidth > 10 && (
        <div className="footer">
          <div className="scroll-top">
            <div
              role="button"
              className="text-center ms-auto"
              onClick={scrollWin}
            >
              <FontAwesomeIcon icon={faArrowUp} className="fa-2x " />
            </div>
          </div>
          <div className="container social-media">
            <ul class="wrapper">
              <li class="icon github">
                <a>
                  <span class="tooltip">Github</span>
                  <span>
                    <i class="fab fa-github"></i>
                  </span>
                </a>
              </li>
              <li class="icon instagram">
                <a>
                  <span class="tooltip">Instagram</span>
                  <span>
                    <i class="fab fa-instagram"></i>
                  </span>
                </a>
              </li>
              <li class="icon facebook">
                <a>
                  <span class="tooltip">Facebook</span>
                  <span>
                    <i class="fab fa-facebook-f"></i>
                  </span>
                </a>
              </li>

              <li class="icon youtube">
                <a>
                  <span class="tooltip">Youtube</span>
                  <span>
                    <i class="fab fa-youtube"></i>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
