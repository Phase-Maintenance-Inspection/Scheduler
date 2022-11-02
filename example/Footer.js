import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let footer = {
      padding: "10px 20px",
      background: "#333",
      color: "white",
    }
    let pFooter = {
      textAlign: "center",
    }
    let armyLogo = {
      float: "left",
      marginTop: "10px",
      position: "absolute",
      width: "50px",
    }

    return (
      <div>
        <footer style={footer}>
          <img style={armyLogo} src={"../images/usArmy.png"}/>
          <div style={{ clear: "both", marginTop: "18px", color: "#333" }}></div>
          <p style={pFooter}>US Army Combat Aviation Brigade Hawaii</p>
          <p style={pFooter}>Phase Maintenance Inspection</p>
        </footer>
        <div style={{ clear: "both", marginBottom: "24px" }}></div>
      </div>
    );
  }
}

export default Footer;
