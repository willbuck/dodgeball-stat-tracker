import React from 'react';
import { Button, TextField, FormControlLabel, Switch } from '@material-ui/core';

export default function PlayerEditForm({ player, onClose }) {

  const [firstName, setFirstName] = React.useState(player.firstname);
  const [lastName, setLastName] = React.useState(player.lastname);
  const [jerseyNumber, setJerseyNumber] = React.useState(player.jersey_number);
  const [phoneNumber, setPhoneNumber] = React.useState(player.phone_number);
  const [canReferee, setCanReferee] = React.useState(player.can_referee);
  const [isCaptain, setIsCaptain] = React.useState(player.captain);

  const handleSubmit = (event) => {
    event.preventDefault();
    // update database || challonge
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
      <TextField label="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
      <TextField label="Jersey Number" value={jerseyNumber} onChange={e => setJerseyNumber(e.target.value)} />
      <TextField label="Phone Number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
      <FormControlLabel control={<Switch checked={canReferee} onChange={e => setCanReferee(e.target.checked)} />} label="Referee" />
      <FormControlLabel control={<Switch checked={isCaptain} onChange={e => setIsCaptain(e.target.checked)} />} label="Captain" />
      <Button type="submit">Submit</Button>
    </form>
  );
};