import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="bg-gray-100 text-black ">
      <div className="container mx-auto py-2 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <a
            href="https://www.linkedin.com/in/contact-som/"
            rel="noopener noreferrer"
            target="_blank"
            className="text-white"
          >
            <FontAwesomeIcon icon={faLinkedin} size="xl" color="black" />
          </a>
          <a
            href="https://twitter.com/PalkarSomm"
            rel="noopener noreferrer"
            target="_blank"
            className="text-white"
          >
            <FontAwesomeIcon icon={faTwitter} size="xl" color="black" />
          </a>
          <a
            href="https://github.com/Sompalkar"
            rel="noopener noreferrer"
            target="_blank"
            className="text-white"
          >
            <FontAwesomeIcon icon={faGithub} size="xl" color="black" />
          </a>
        </div>
        <div className="text-sm">
          <p>&copy; 2023 Airbnb, Inc.</p>
          <p>
            <a className=" ">Privacy</a>
            <span className="mx-1">&middot;</span>
            <a className=" ">Terms</a>
            <span className="mx-1">&middot;</span>
            <a className=" ">Sitemap</a>
            <span className="mx-1">&middot;</span>
            <a target="_blank" className=" ">
              Company details
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
