import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { TextLabel } from "@/components/atoms/typographies/label";
import { stepLabelClasses, styled } from "@mui/material";

// const CustomStepLabel = styled(StepLabel)(() => ({
//   ".MuiStepLabel-alternativeLabel": {
//     textAlign: "left",
//     color: "#999999",
//   },
//   ".Mui-completed": {
//     color: "#219653",
//   },
//   ".Mui-active": {
//     color: "#00529C",
//   },
// }));

const CustomStepLabel = styled(StepLabel)(() => ({
  [`.${stepLabelClasses.alternativeLabel}`]: {
    textAlign: "left",
    color: "#999999",
  },
  ".Mui-completed": {
    color: "#219653",
  },
  ".Mui-active": {
    color: "#00529C",
  },
}));

// const CustomStepLabel2 = styled(StepLabel)(() => ({
//   [`.${stepLabelClasses.alternativeLabel}`]: {
//     textAlign: "left",
//     color: "#999999",
//   },
//   [`.${stepLabelClasses.active}`]: {
//     color: "#00529C",
//   },
//   [`.${stepLabelClasses.completed}`]: {
//     color: "#219653",
//   },
// }));

// const sx = {
//   ".MuiStepLabel-alternativeLabel": {
//     textAlign: "left",
//     color: "#999999",
//   },
//   ".Mui-completed": {
//     color: "#219653",
//   },
//   ".Mui-active": {
//     color: "#00529C",
//   },
// };

export default function DefaultStepper({ steps, activeStep }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step) => (
          <Step key={step.label}>
            <CustomStepLabel>{step.status}</CustomStepLabel>
            <TextLabel className="font-normal text-sm">{step.label}</TextLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
