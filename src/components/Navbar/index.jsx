import React from "react";
import { TiThMenu, TiArrowSortedDown } from "react-icons/ti";

const NavbarComponent = () => {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <span className="navbar-brand mb-0 h1 text-white">DIGI APP</span>
          <TiThMenu color="white" />
        </div>
        <div className="d-flex align-items-center gap-2 menu-navbar">
          <div className="pt-3">
            <p className="text-white fw-bold">digi@admin.test</p>
          </div>
          <TiArrowSortedDown color="white" />
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
