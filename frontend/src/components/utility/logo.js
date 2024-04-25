import React from "react";
import siteLogo from "../../assets/images/loantack-logo.png";
import siteWhiteLogo from "../../assets/images/loantack-white-logo.png";
import { Image } from "antd";
import logo from "../../assets/images/logo-white.svg";

export default ({ collapsed, isAdmin }) => {
  return (
    <div className="isoLogoWrapper">
      {collapsed ? (
        <div>
          <h3>
            <a>
              <i className="isoLogoMainSmall" />
            </a>
          </h3>
        </div>
      ) : (
        <h3>
          <a>
            <img
              src={logo}
              alt="Loantack logo"
              style={{ width: 140 }}
              display="inline-block"
            />
          </a>
        </h3>
      )}
    </div>
  );
};
