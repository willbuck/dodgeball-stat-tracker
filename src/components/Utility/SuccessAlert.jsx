import React from "react";
import { useState } from "react";

import { Dialog, DialogTitle, DialogContent } from "@mui/material";


const [ open, setOpen ] = useState(false)

const handleOpen = () => {
  setOpen(true)
}
const handleClose = () => {
  setOpen(false);
};

export default function SuccessAlert({ message }) {
  return (
    <Dialog open={open} onClose={handleClose} className="alert">
      <DialogTitle>Success!</DialogTitle>
      <DialogContent>
        <p>{message}</p>
      </DialogContent>
    </Dialog>
  );
}
