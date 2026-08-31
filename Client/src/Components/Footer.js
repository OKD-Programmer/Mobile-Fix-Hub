import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import '../Styles/Footer.css';

export const Footer = () => {
  return (
    <div className="footer">
      <div className="social-media-container">
        <div className="socialMedia">
          <InstagramIcon className="socialMedia" />
        </div>
        <div className="socialMedia">
          <TwitterIcon className="socialMedia" />
        </div>
        <div className="socialMedia">
          <FacebookIcon className="socialMedia" />
        </div>
        <div className="socialMedia">
          <LinkedInIcon className="socialMedia" />
        </div>
      </div>

      <div className="business-hours">
        <p>🕘 Open Monday ---{">"} Thursday: 9:00 AM - 7:00 PM ⏰</p>
        <p>Ready to fix your phone with a smile! 😊</p>
      </div>
      <p> &copy; 2025 MobleFixHub </p>
    </div>
  );
}


