import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import MapChart from "./MapChart";
import "./style.css";
export default function Map() {
  const [content, setContent] = useState("");
  return (
    <div style={{ backgroundColor: "#282a36" }}>
      <MapChart setTooltipContent={setContent} />
      <ReactTooltip className="tooltip-content">{content}</ReactTooltip>
    </div>
  );
}
