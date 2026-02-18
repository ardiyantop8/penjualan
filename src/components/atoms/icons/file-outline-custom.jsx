import * as React from "react";

const FileOutlineCustom = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="18"
    fill="none"
    viewBox="0 0 14 18"
    {...props}
  >
    <path
      stroke={props.color || "#fff"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      d="M8.666 1.5v3.333a.833.833 0 0 0 .833.834h3.334M8.666 1.5H2.833a1.667 1.667 0 0 0-1.667 1.667v11.666A1.666 1.666 0 0 0 2.833 16.5h8.333a1.666 1.666 0 0 0 1.667-1.667V5.667M8.666 1.5l4.167 4.167"
    ></path>
  </svg>
);

export default FileOutlineCustom;
