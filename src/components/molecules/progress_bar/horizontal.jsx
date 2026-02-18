// import { useEffect } from "react";

// const HorizontalProgressBar = ({ progress = 10, maxValue = 18 }) => {
//     useEffect(() => {
//       const bar = document.getElementById('progress-bar');
//       const percentage = progress < maxValue ? (progress/maxValue) * 100 : 100;
//       const width = percentage * 3;//dikalikan 3 karena widthnya 300px
//       bar.setAttribute('width', width);
//     }, [maxValue, progress]);
  
//     return (
//       <div style={{ position: "relative", width: "300px" }}>
//         <svg id="svg" width="300" height="200" viewBox="0 0 300 200" version="1.1" xmlns="http://www.w3.org/2000/svg">
//           <rect x="0" y="0" width="300" height="20" rx="10" fill="#EDEFF5" />
//           <rect id="progress-bar" x="0" y="0" height="20" rx="10" fill="#219653" />
//         </svg>
//       </div>
//     );
//   };
//   export default HorizontalProgressBar;