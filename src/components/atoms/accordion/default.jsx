import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const AccordionDefault = ({ children, title, icon, defaultExpanded,...props}) => {
  return (
    <Accordion
      disableGutters
      defaultExpanded={defaultExpanded}
      sx={{
        border: 'none !important',
        boxShadow: 'none !important',
        marginTop: 'none !important',
        "&.MuiAccordion-root:before": {
          backgroundColor: "white"
        }
      }}
    >
      <AccordionSummary
        expandIcon={props.expandIcon ?? <ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'
        sx={{
          backgroundColor: '#EAF3FA',
          border: '1px solid #EAF3FA',
          borderRadius: '8px',
          height: '64px',
          ...props.sx
        }}
      >
        <Typography variant='subtitle1' sx={{ fontWeight: '700'}}>
          {title}
        </Typography>
        {
          icon ?
          <span className='ml-2 text-briGreen'>
            {icon}
          </span>
          : null
        }
      </AccordionSummary>
      <AccordionDetails sx={{ px: 3, ...props.sxBody }}>
        {children}
      </AccordionDetails>
    </Accordion>
  )
}
