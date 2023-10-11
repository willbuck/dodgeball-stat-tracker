import React from 'react';
import { Button, TextField, FormControlLabel, Switch, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useDispatch } from 'react-redux';

export default function PlayerEditForm({ player, onClose }) {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = React.useState(player.firstname);
  const [lastName, setLastName] = React.useState(player.lastname);
  const [jerseyNumber, setJerseyNumber] = React.useState(player.jersey_number);
  const [phoneNumber, setPhoneNumber] = React.useState(player.phone_number);
  const [canReferee, setCanReferee] = React.useState(player.can_referee);
  const [isCaptain, setIsCaptain] = React.useState(player.captain);

  const handleSubmit = (event) => {
    event.preventDefault();
    // update DB / challonge
    const playerId = player.id;
    const objectToUpdate = {
      firstName,
      lastName,
      jerseyNumber,
      phoneNumber,
      canReferee,
      isCaptain,
      playerId,
    }
    dispatch({
      type:'UPDATE_PLAYER',
      payload: objectToUpdate
    })
    onClose();
  };

  const handleDelete = (event) => {
    event.preventDefault()
    // delete player from DB / challonge
    console.log('In the delete:', player.id);
    const id = player.id;
    dispatch({
      type:'DELETE_PLAYER',
      payload: id
    });
    onClose();
  }

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Edit Player</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField label="First Name" value={firstName} onChange={event => setFirstName(event.target.value)} />
          <TextField label="Last Name" value={lastName} onChange={event => setLastName(event.target.value)} />
          <TextField label="Jersey Number" value={jerseyNumber} onChange={event => setJerseyNumber(event.target.value)} />
          <TextField label="Phone Number" value={phoneNumber} onChange={event => setPhoneNumber(event.target.value)} />
          <FormControlLabel control={<Switch checked={canReferee} onChange={event => setCanReferee(event.target.checked)} />} label="Referee" />
          <FormControlLabel control={<Switch checked={isCaptain} onChange={event => setIsCaptain(event.target.checked)} />} label="Captain" />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Submit</Button>
        <Button onClick={handleDelete} color='error'>Delete</Button>
      </DialogActions>
    </Dialog>
  )
}