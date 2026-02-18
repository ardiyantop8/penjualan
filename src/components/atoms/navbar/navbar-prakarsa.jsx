import { useEffect, useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

export const NavbarPrakarsa = ({ navData, getTabValue, sx, cn, navState, setNavState }) => {
  const [value, setValue] = useState(navState);

  useEffect(() => {
    setValue(navState)
  }, [navState])

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
    setNavState(newValue);
    if (getTabValue) {
      getTabValue(newValue);
    }
  };

  return (
    <TabContext value={value}>
      <Box
        sx={{
          background: "#FFFFFF",
          borderRadius: "8px",
          marginBottom: "2rem",
          padding: "0.5rem",
          ...cn
        }}
      >
        <div className="max-w-screen overflow-x-auto">
          <TabList
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="fullWidth"
            sx={{
              "& .MuiTab-root": {
                color: "#303030",
                fontWeight: 400,
                fontSize: "14px",
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
            scrollButtons="auto"
          >
            {navData.map((data, index) => {
              return <Tab key={index} label={data.label} value={data.value} sx={{ width: "50%"}} />;
            })}
          </TabList>
        </div>
      </Box>
      {navData.map((data, index) => {
        return (
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
        );
      })}
    </TabContext>
  );
};
