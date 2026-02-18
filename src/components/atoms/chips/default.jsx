/* eslint-disable no-unused-vars */
import * as React from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { darken } from "@mui/material";

export default function ChipsDefault({
  variant = "outlined",
  color = "#00529C",
  chipData = [],
  sx = {},
  onChange = () => {},
  value = 0,
  ...restProps
}) {
  const [chipValue, setChipValue] = React.useState(value);

  React.useEffect(() => {
    if (value !== chipValue) {
      setChipValue(value);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleClick = (e, newValue) => {
    e.preventDefault();
    setChipValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <TabContext value={chipValue}>
      <Paper
        sx={{
          background: "none",
          listStyle: "none",
          boxShadow: "none",
        }}
        component="ul"
      >
        <TabList
          sx={{
            ".MuiTabs-indicator": {
              background: "none",
            },
          }}
        >
          {chipData?.map((data, index) => {
            return (
              <div className="my-2" key={index}>
                <Chip
                  variant={chipValue === index ? variant : "outlined"}
                  label={data.label}
                  onClick={(e) => handleClick(e, index)}
                  sx={{
                    ".MuiChip-label": {
                      color: chipValue === index ? "white" : "#00529C",
                      fontWeight: 700,
                    },
                    ":hover": {
                      backgroundColor:
                        chipValue === index
                          ? darken(color, 0.1)
                          : darken("#FFFFFF", 0.1),
                    },
                    borderColor: "#00529C",
                    backgroundColor: chipValue === index ? color : "white",
                    ...sx,
                  }}
                  {...restProps}
                />
              </div>
            );
          })}
        </TabList>
      </Paper>
      {chipData?.map((data, index) => {
        return (
          <TabPanel
            key={index}
            sx={{
              padding: "0",
            }}
            value={index}
          >
            {data.description}
          </TabPanel>
        );
      })}
    </TabContext>
  );
}