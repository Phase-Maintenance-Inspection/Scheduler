import React, { Component } from "react";
import { Link } from "react-router-dom";
import image from "../images/usArmy.png";

class Footer extends Component {
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
      position: "absolute",
      width: "50px",
    }

    return (
      <div>
        <footer style={footer}>
          <image style={armyLogo} src={image}/>
          <div style={{ clear: "both", marginTop: "18px", color: "#333" }}></div>
          <p style={pFooter}>US Army Combat Aviation Brigade Hawaii: Phase Maintenance Inspection</p>
          <p style={pFooter}>Author(s): Kirsten-Elise Rensaa, Lise Marie Nilsen, Jonathan Ma, Adam Joseph Parrilla</p>
          <p style={pFooter}><a href="https://github.com/Phase-Maintenance-Inspection/Scheduler"> GitHub Scheduler Repository</a></p>
        </footer>
        <div style={{ clear: "both", marginBottom: "24px" }}></div>
      </div>
    );
  }
}

export default Footer;
