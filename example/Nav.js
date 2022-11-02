import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let ulStyle = {
      listStyle: "none",
      margin: "0px",
      padding: "0px",
    };
    let liStyle = {
      float: "left",
      marginLeft: "20px",
    };
    let myNav = {
      height: "50px",
      liStyle: "none",
      lineHeight: "50px",
      backgroundColor: "#333",
    };
    let liaStyle = {
      display: "inlineBlock",
      textAlign: "center",
      padding: "14px 16px",
    }

    return (
      <div>
        <nav style={myNav}>
          <ul style={ulStyle}>
            <li style={liStyle}><a style={liaStyle} href="">Home</a></li>
            <li style={liStyle}><a style={liaStyle} href="tasks/">Tasks</a></li>
          </ul>
        </nav>
        <div style={{ clear: "both", marginBottom: "18px" }}></div>
      </div>
    );
  }
}

export default Nav;
