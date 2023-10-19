import React from 'react';
import { Button, TextField, FormControlLabel, Switch, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useDispatch, useSelector} from 'react-redux';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";


export default function PlayerEditForm({ player, onClose }) {
  const dispatch = useDispatch();
  const teamStore = useSelector((store) => store.teamsReducer);

  const [firstName, setFirstName] = React.useState(player.firstname);
  const [lastName, setLastName] = React.useState(player.lastname);
  const [jerseyNumber, setJerseyNumber] = React.useState(player.jersey_number);
  const [phoneNumber, setPhoneNumber] = React.useState(player.phone_number);
  const [canReferee, setCanReferee] = React.useState(player.can_referee);
  const [isCaptain, setIsCaptain] = React.useState(player.captain);
  const [selectedTeam, setSelectedTeam] = React.useState(player.team_id);

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
      team_id: selectedTeam,
    }
    dispatch({
      type:'UPDATE_PLAYER',
      payload: objectToUpdate
    })
    onClose();
  };


  const handleChangeTeam = (event) => {
    setSelectedTeam(event.target.value);
  };

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

      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">Team</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={selectedTeam}
          label="team"
          onChange={handleChangeTeam}
        >
          {teamStore.map((team) => (
            <MenuItem key={team.id} value={team.id}>
              {team.team_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Submit</Button>
      </DialogActions>
    </Dialog>
  )
}