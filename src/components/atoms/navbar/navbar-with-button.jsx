import { useState } from "react";
import { Box, Tab } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ButtonOutlined } from "@/components/atoms/buttons/outlined";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ButtonContained } from "@/components/atoms/buttons/contained";

export const NavbarWithButtons = ({ navData = [], sx }) => {
  const [secondaryValue, setSecondaryValue] = useState(navData[0]?.value || '');

  const handleSecondaryChange = (newValue) => {
    setSecondaryValue(newValue);
  };

  const handlePrev = () => {
    const currentIndex = navData.findIndex((tab) => tab.value === secondaryValue);
    if (currentIndex > 0) {
      setSecondaryValue(navData[currentIndex - 1].value);
    }
  };

  const handleNext = () => {
    const currentIndex = navData.findIndex((tab) => tab.value === secondaryValue);
    if (currentIndex < navData.length - 1) {
      setSecondaryValue(navData[currentIndex + 1].value);
    }
  };

  if (navData.length === 0) return null;

  return (
    <Box>
      <TabContext value={secondaryValue}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#FFFFFF",
            borderRadius: "8px",
            marginBottom: "2rem",
            padding: "0.5rem",
            width: "100%", // Ensure the Box takes full width
          }}
        >
          <TabList
            onChange={(e, newValue) => handleSecondaryChange(newValue)}
            aria-label="secondary tabs example"
            variant="fullWidth"
            sx={{
              width: "100%", // Ensure TabList takes full width
              "& .MuiTab-root": {
                color: "#303030",
                fontWeight: 400,
                fontSize: "14px",
                flex: 1, // Make each tab take equal space
              },
              "& .MuiTab-root.Mui-selected": {
                color: "#084F8C",
                fontWeight: 700,
              },
            }}
            TabIndicatorProps={{
              style: {
                backgroundColor: "#ED6E12",
                height: "3px",
                borderRadius: "2px",
                marginBottom: "4px",
              },
            }}
          >
            {navData.map((data, index) => (
              <Tab key={index} label={data.label} value={data.value} />
            ))}
          </TabList>
        </Box>
        {navData.map((data, index) => (
          <TabPanel
            key={index}
            sx={{
              padding: "0",
              ...sx,
            }}
            value={data.value}
          >
            {data.description}
          </TabPanel>
        ))}
        <div className="flex justify-end space-x-2">
            <ButtonOutlined
                startIcon={<ArrowBackIosIcon />}
                colorType="secondary"
                className="py-2"
                onClick={handlePrev}
                disabled={navData.findIndex((tab) => tab.value === secondaryValue) === 0}
            >
                Sebelumnya
            </ButtonOutlined>
            <ButtonContained
                startIcon={<ArrowForwardIosIcon />}
                colorType="secondary"
                onClick={handleNext}
                className="py-2"
                disabled={navData.findIndex((tab) => tab.value === secondaryValue) === navData.length - 1}
            >
                Selanjutnya
            </ButtonContained>
        </div>
      </TabContext>
    </Box>
  );
};