import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const FilterAccordionBoth = ({
  children,
  title,
  sideTitle,
  customHeader,
  colorTitle,
  colorSideTitle,
  isClose,
  statusText,
  statusTextColor,
  statusBackgroundColor,
  onToggle,
  disabled,
}) => {
  return (
    <Accordion
      disableGutters
      sx={{
        border: "none !important",
        boxShadow: "none",
        "&.MuiAccordion-root:before": {
          backgroundColor: "white",
        },
        "&.MuiAccordion-rounded": {
          borderRadius: "10px 10px",
        },
      }}
      defaultExpanded={isClose ? false : true}
      onChange={(event, expanded) => {
        if (!disabled) {
          onToggle?.(expanded);
        }
      }}
    >
      <AccordionSummary
        expandIcon={
          !disabled ? (
            <ExpandMoreIcon sx={{ color: `${colorSideTitle || "white"}` }} />
          ) : (
            <div style={{ visibility: "hidden", width: "24px" }} /> // Tetap memberikan ruang sama
          )
        }
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          backgroundColor: `${customHeader || "#084F8C"}`,
          borderBottom: "2px solid #EDEDED",
          borderRadius: "10px 10px 0 0",
          color: `${colorSideTitle || "white"}`,
        }}
      >
        <div className="flex items-center justify-between gap-2 w-full">
          <Typography
            variant="h6"
            sx={{ color: `${colorTitle || "white"}`, fontWeight: "600" }}
          >
            {title}
          </Typography>
          {statusText && (
            <div
              style={{
                backgroundColor: statusBackgroundColor,
                borderRadius: "8px",
                width: "200px",
                height: "40px",
                alignContent: "center",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  color: statusTextColor,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                {statusText}
              </Typography>
            </div>
          )}

          <div style={{ width: "150px" }}>
            {!disabled && (
              <div className="flex items-center justify-end">
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "700", marginRight: "10px" }}
                >
                  {sideTitle}
                </Typography>
              </div>
            )}
          </div>
        </div>
      </AccordionSummary>
      {!disabled && (
        <AccordionDetails sx={{ px: 3, mt: 2 }}>{children}</AccordionDetails>
      )}
    </Accordion>
  );
};
