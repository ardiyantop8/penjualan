import { useEffect, useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

export const NavbarDefault = ({ navData, navState, setTab, getTabValue, sx, isTabDisabled, theme = "default", ...props }) => {
  const [value, setValue] = useState(navState ? navState : "1");
  const [isHandle, setHandle] = useState(false);
  
  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
    if (props.onChange) {
      props.onChange(newValue);
    }
    getTabValue && getTabValue(newValue);
    setHandle(true);
  };

  useEffect(() => {
    if (navState && navState !== value) {
      setValue(navState);
    }
  }, [navState, value]);

  useEffect(() => {
    if(!isHandle){
      if (setTab && setTab !== value) {
        setValue(setTab);
      }
    }
  }, [setTab, value, isHandle]);


  // NavbarScrollable component theme
  const themeStyle = {
    default: {
      tabList: {
        "& .MuiTab-root": {
          color: "#303030",
          fontWeight: 400,
          fontSize: "14px",
          opacity: isTabDisabled ? 1 : undefined,
          pointerEvents: isTabDisabled ? "none" : "auto",
        },
        "& .MuiTab-root.Mui-selected": {
          color: "#084F8C",
          fontWeight: 700,
        },
        "& .MuiTab-root.Mui-disabled": {
          color: "#303030",
          opacity: 1,
        },
      },
      tabIndicator: {
        style: {
          backgroundColor: "#ED6E12",
          height: "3px",
          borderRadius: "2px",
          marginBottom: "4px",
        },
      }
    },
    slider: {
      box:{
        padding: "8px",
        borderRadius: "50pc",
        overflow: "hidden",
        border: "2px solid #00529C",
          width: "100%"
      },
      tabList: {
        "& .MuiBox-root": {
          color: "#303030",
          fontWeight: 400,
          fontSize: "14px",
          opacity: isTabDisabled ? 1 : undefined,
          pointerEvents: isTabDisabled ? "none" : "auto",
        },
        "& .MuiTabs-flexContainer": {
          gap: "4px",
        },
        "& .MuiTab-root": {
          color: "#00529C",
          fontWeight: 600,
          fontSize: "16px",
          opacity: isTabDisabled ? 1 : undefined,
          pointerEvents: isTabDisabled ? "none" : "auto",
          zIndex: 2,
          borderRadius: "50pc",
        },
        "& .MuiTab-root.Mui-selected": {
          color: "white",
          fontWeight: 700,
        },
        "& .MuiTab-root.Mui-disabled": {
          color: "#303030", // Set the color you want for disabled tabs
          opacity: 1, // Override the default opacity for disabled state
        },
        "& .MuiTabs-indicator": {
          backgroundColor: "#00529C",
          height: "100%",
          borderRadius: "50pc",
        }
      },
    },
    pills: {
      tabList: {
        "& .MuiTabs-scroller": {
          height: "fit-content",
          marginBottom: "auto !important",
          margin: "auto 0px",
        },
        "& .MuiTab-root": {
          color: "#303030",
          fontWeight: 400,
          fontSize: "14px",
          opacity: isTabDisabled ? 1 : undefined,
          pointerEvents: isTabDisabled ? "none" : "auto",
          border: "1px solid #999999",
          borderRadius: "50pc",
          padding: "8px 24px",
          minHeight: "0px",
          height: "fit-content",
          margin: "auto 6px",
          whiteSpace: "nowrap"
        },
        "& .MuiTab-root.Mui-selected": {
          color: "#084F8C",
          fontWeight: 700,
          backgroundColor: "#EAF5FF",
          border: "1px solid #084F8C",
          borderRadius: "50pc",
        },
        "& .MuiTab-root.Mui-disabled": {
          color: "#303030", // Set the color you want for disabled tabs
          opacity: 1, // Override the default opacity for disabled state
        },
      },
      tabIndicator: {
        style: {
          backgroundColor: "#084F8C",
          height: "0px",
          borderRadius: "2px",
          marginBottom: "4px",
        },
      }
    },
    button: {
      tabList: {
        "& .MuiTabs-scroller": {
          height: "fit-content",
          marginBottom: "auto !important",
          margin: "auto 0px",
        },
        "& .MuiTab-root": {
          color: "#303030",
          fontWeight: 400,
          fontSize: "14px",
          opacity: isTabDisabled ? 1 : undefined,
          pointerEvents: isTabDisabled ? "none" : "auto",
          border: "1px solid #999999",
          borderRadius: "10px",
          padding: "8px 24px",
          minHeight: "0px",
          height: "fit-content",
          margin: "auto 6px",
          whiteSpace: "nowrap"
        },
        "& .MuiTab-root.Mui-selected": {
          color: "#084F8C",
          fontWeight: 700,
          backgroundColor: "#EAF5FF",
          border: "1px solid #084F8C",
          borderRadius: "10px",
        },
        "& .MuiTab-root.Mui-disabled": {
          color: "#303030", // Set the color you want for disabled tabs
          opacity: 1, // Override the default opacity for disabled state
        },
      },
      tabIndicator: {
        style: {
          backgroundColor: "#084F8C",
          height: "0px",
          borderRadius: "2px",
          marginBottom: "4px",
        },
      }
    }
  }
  // NavbarScrollable component theme

  return (
    <TabContext value={value}>
      <Box
        sx={{
          background: "#FFFFFF",
          borderRadius: "8px",
          marginBottom: "2rem",
          padding: "0.5rem",
          ...props.cn,
          ...themeStyle[theme].box
        }}
      >
        <TabList
          onChange={handleChange}
          variant="fullWidth"
          sx={themeStyle[theme].tabList}
          TabIndicatorProps={themeStyle[theme].tabIndicator}
          scrollButtons="auto"
        >
          {navData.map((data, index) => {
            return <Tab key={index} label={data.label} value={data.value} disabled={isTabDisabled} />;
          })}
        </TabList>
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
