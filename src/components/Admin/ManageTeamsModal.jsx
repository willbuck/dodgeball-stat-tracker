import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

{/* <Dialog open={open} onClose={handleClose} className="alert">
          <DialogTitle>Incorrect Password</DialogTitle>
          <DialogContent>
            <p>{errors.loginMessage}</p>
          </DialogContent>
        </Dialog> */}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ManageTeamsModal() {
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const team = useSelector(store => store.teamModal);
  const tournament = useSelector(store => store.tournamentsReducer);
  

  const handleAdd = (id) => {
    console.log("tournament", id)
    console.log("team thats sending...", team)
    dispatch({ type: 'TEAM_TO_TOURNAMENT', payload: id, team: team })
    handleClose()
  }

  useEffect(() => {
    dispatch({ type: 'FETCH_TOURNAMENTS' })
  }, [])

  return (
    <div>
      <Button onClick={handleOpen}>Add to Tournament</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {tournament.map((tournament) => {
              return (
                <Card
                onClick={() => { handleAdd(tournament.url) }}
                  key={tournament.id}
                  sx={{
                    minWidth: 200,
                    margin: '8px',
                    border: '1px solid grey',
                    // boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                    maxWidth: 250,
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                      {tournament.date}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {tournament.tournament_name} - Location: {tournament.location}
                    </Typography>
                  </CardContent>
                </Card>
              )
            })}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}