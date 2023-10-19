import React, { useState } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

export default function WarningDialog() {
  const [open, setOpen] = useState(false);
  const [showButtons, setShowButtons] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    setOpen(false);
    setShowButtons(false);
  };

  const handleReset = () => {
    setShowButtons(true);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {showButtons && (
        <div>
          <Button variant="contained" color="primary" onClick={handleOpen} style={{ marginRight: '10px' }}>
            Test Button 1
          </Button>
          <Button variant="contained" color="secondary" onClick={handleOpen}>
            Test Button 2
          </Button>
        </div>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this item?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {!showButtons && (
        <Button variant="contained" color="primary" onClick={handleReset} style={{ marginTop: '10px' }}>
          Reset
        </Button>
      )}
    </div>
  );
}
