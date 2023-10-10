import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function AddPlayerForm({ onClose }) {
  const teamStore = useSelector((store) => store.teamsReducer);
  console.log("hey the store:", teamStore);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jerseyNumber, setJerseyNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [canReferee, setCanReferee] = useState(false);
  const [isCaptain, setIsCaptain] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState("");

  const handleSubmit = (event, SelectChangeEvent) => {
    event.preventDefault();
    // update DB / challonge
    const objectToSend = {
      firstName,
      lastName,
      jerseyNumber,
      phoneNumber,
      canReferee,
      isCaptain,
      selectedTeamId: selectedTeam,
    };
    console.log("ObjectToSend:", objectToSend);
    onClose();
  };

  const handleDelete = (event) => {
    event.preventDefault();
    // delete player from DB / challonge
  };

  const handleChangeTeam = (event) => {
    setSelectedTeam(event.target.value);
    console.log(event.target.value);
  };
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>ADD Player</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            onChange={(event) => setFirstName(event.target.value)}
          />
          <TextField
            label="Last Name"
            onChange={(event) => setLastName(event.target.value)}
          />
          <TextField
            label="Jersey Number"
            onChange={(event) => setJerseyNumber(event.target.value)}
          />
          <TextField
            label="Phone Number"
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
          <FormControlLabel
            control={
              <Switch
                checked={canReferee}
                onChange={(event) => setCanReferee(event.target.checked)}
              />
            }
            label="Referee"
          />
          <FormControlLabel
            control={
              <Switch
                checked={isCaptain}
                onChange={(event) => setIsCaptain(event.target.checked)}
              />
            }
            label="Captain"
          />
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
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
        <Button onClick={handleDelete} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
