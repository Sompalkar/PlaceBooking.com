import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className=" w-full    p-4 flex   flex-row  justify-around ">
        <div className="  hover:text-xl  ">
          <a
            href="https://www.linkedin.com/in/contact-som/"
            rel="noopener noreferrer"
            target="_blank "
            className="text-white "
          >
            <FontAwesomeIcon icon={faLinkedin} size="xl" color="black" />
          </a>

          </div>

          <div className=" hover:text-xl   " >
          <a
            href="https://twitter.com/PalkarSomm"
            rel="noopener noreferrer"
            target="_blank"
            className="text-white "
          >
            <FontAwesomeIcon icon={faTwitter} size="xl" color="black" />
          </a>
         </div>

        <div className="  hover:text-xl   " >  
          <a
            href="https://github.com/Sompalkar"
            rel="noopener noreferrer"
            target="_blank"
            className="text-white "
          >
            <FontAwesomeIcon icon={faGithub} size="xl" color="black" />
          </a>
        </div>
        
    </div>
  );
};

export default Footer;
