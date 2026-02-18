import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";

export const FilterAccordion = ({ children, title, icon, customHeader, colorText, isClose}) => {
  return (
    <Accordion
      disableGutters
      sx={{
        border: "none !important",
        boxShadow: "none",
        marginBottom: "1.5rem",
        "&.MuiAccordion-root:before": {
          backgroundColor: "white",
        },
        "&.MuiAccordion-rounded": {
          borderRadius: "10px 10px",
        },
      }}
      defaultExpanded={isClose ? false : true}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: `${colorText ? colorText : "white" }` }} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          backgroundColor: `${customHeader ? customHeader : "#084F8C" }`,
          border: `1px solid ${customHeader ? customHeader : "#084F8C" }`,
          borderRadius: "10px 10px 0 0",
          color: `${colorText ? colorText : "white" }`,
        }}
      >
        <div className="flex items-center justify-center gap-2">
          {
            icon ? icon :
            <SearchIcon />
          }
          <Typography variant="subtitle1" sx={{ fontWeight: "700" }}>
            {title}
          </Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails sx={{px: 3}}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};
