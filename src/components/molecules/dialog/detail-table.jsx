import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid } from '@mui/material'
import ErrorIcon from "@mui/icons-material/Error";

export const DetailDialog = ({ open, setOpen }) => {

  const handleCloseDialog = () => {
    setOpen(!open);
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog} maxWidth="md">
      <DialogTitle className="cm-header-detail">
        <ErrorIcon />
        <span className='ml-2'>
          Detail Calon Debitur
        </span>  
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container>
          <Grid item xs={12} md={6} lg={4}> 
            <p className='cm-label-detail'>Reference Number</p> 
            <p className='cm-value-detail'>PN2307Q3X3</p> 
          </Grid>
          <Grid item xs={12} md={6} lg={4}> 
            <p className='cm-label-detail'>No KTP</p> 
            <p className='cm-value-detail'>6450468469873648</p> 
          </Grid>
          <Grid item xs={12} md={6} lg={4}> 
            <p className='cm-label-detail'>Nama Pemohon</p> 
            <p className='cm-value-detail'>PT Tidak Asing</p> 
          </Grid>
          <Grid item xs={12} md={6} lg={4}> 
            <p className='cm-label-detail'>Jenis Kelamin</p> 
            <p className='cm-value-detail'>n/a</p> 
          </Grid>
        </Grid>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button variant='contained' color='primary' className='mr-4 mb-4' onClick={handleCloseDialog}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
