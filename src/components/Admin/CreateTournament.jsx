import * as React from "react";

// Hooks
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

// Style components
import {
  Box,
  Button,
  Stack,
  TextField,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function CreateTournament() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [ballType, setBallType] = useState("");
  const [location, setLocation] = useState("");
  const [courts, setCourts] = useState("");
  const [description, setDescription] = useState("");

  //! Dummy participant info
  //! Exact implementation may change when create-teams / create-participants components are live
  const participants = [
    { teamName: "Lions", teamID: 1 },
    { teamName: "Tigers", teamID: 2 },
    { teamName: "Bears", teamID: 3 },
    { teamName: "Falcons", teamID: 4 },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    // Tournament info to send
    const tournamentData = {
      name,
      startDate,
      ballType,
      location,
      courts,
      description,
      user,
      participants,
    };

    // console.log('tournamentData:', tournamentData)

    // Dispatching info to Tournament saga
    dispatch({ type: "CREATE_TOURNAMENT", payload: tournamentData });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack>
        {/* Name input*/}
        <TextField
          required
          placeholder="Name"
          onChange={(event) => setName(event.target.value)}
        />

        {/* Start Date input */}
        <DatePicker
          required
          value={startDate}
          onChange={(newDate) => setStartDate(newDate)}
        />

        {/* Ball Type input */}
        <InputLabel id="ball-type-label">Ball Type</InputLabel>
        <Select
          required
          labelId="ball-type-label"
          label="Ball Type"
          value={ballType}
          onChange={(event) => setBallType(event.target.value)}
        >
          <MenuItem value="cloth">Cloth</MenuItem>
          <MenuItem value="foam">Foam</MenuItem>
        </Select>

        {/* Location input */}
        <TextField
          required
          placeholder="Location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />

        {/* Courts input */}
        <TextField
          required
          placeholder="Courts"
          type="number"
          InputProps={{
            inputProps: { min: 2, max: 25 },
          }}
          value={courts}
          onChange={(event) => setCourts(event.target.value)}
        />

        {/* Description input */}
        <TextField
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <Button type="submit">Submit</Button>
      </Stack>
    </Box>
  );
}
