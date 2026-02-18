// import React from "react";
// import styled from "styled-components";
// import { CircularProgress, Typography } from "@mui/material";

// const Container = styled.div`
//   width: ${(props) => props.width}px;
//   height: ${(props) => props.height}px;
// `;

// const CircularProgressBar = ({ progress, maxValue, width = 200, height = 200 }) => {
//   const percentage = progress < maxValue ? (progress / maxValue) * 100 : 100;

//   return (
//     <Container width={width} height={height}>
//         <CircularProgress
//           variant="determinate"
//           size={200}
//           value={100}
//           sx={{
//             color: "#eeeeee",
//             position: "absolute",
//           }}
//         />
//         <CircularProgress
//           variant="determinate"
//           value={percentage}
//           size={200}
//           sx={{
//               color: "#219653",
//               position: "absolute",
//           }}
//         />
//       <Typography
//         variant="h5"
//         color="textSecondary"
//         sx={{
//           position: "relative",
//           top: "45%",
//           width: "100%",
//           textAlign: "center"
//         }}
//       >
//         {progress}/{maxValue}
//       </Typography>
//     </Container>
//   );
// };

// export default CircularProgressBar;
