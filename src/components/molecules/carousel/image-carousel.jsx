import { Box, MobileStepper } from "@mui/material";
import { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    id: 1,
    label: "Selamat datang di BRISPOT Web!",
    src: "./images/thumb-slider-1.png",
  },
  {
    id: 2,
    label: "Instagram: @bankbri_id",
    src: "./images/thumb-slider-2.png",
  },
  {
    id: 3,
    label: "Our Goals",
    src: "./images/thumb-slider-3.png",
  },
];

export const ImageCarousel = () => {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <aside className="relative grid lg:order-first sm:col-span-2 md:col-span-3 lg:col-span-7">
      <AutoPlaySwipeableViews
        axis="x"
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  display: "block",
                  objectFit: "contain",
                  width: "100%",
                }}
                src={step.src}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="dots"
        activeStep={activeStep}
        sx={{
          position: "absolute",
          placeSelf: "center",
          alignSelf: "flex-end",
          backgroundColor: "transparent",
        }}
      />
    </aside>
  );
};
