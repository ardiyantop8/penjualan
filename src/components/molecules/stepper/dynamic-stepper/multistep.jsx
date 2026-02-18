import React from 'react';

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const MultiStep = (props) => {
    return (
        <div className="w-full justify-center">
            <Stepper activeStep={parseInt(props?.activeStep)-1} alternativeLabel>
                {props?.dataSteps.map((step) => (
                    <Step key={step.anchor} completed={parseInt(step.anchor) < parseInt(props?.activeStep)}>
                        <StepLabel>{step.label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
};

export default MultiStep;