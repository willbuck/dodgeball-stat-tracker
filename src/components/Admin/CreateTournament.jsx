import React from "react";
import dayjs from "dayjs";

// Hooks
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useSelector } from "react-redux";
// *** Need this for calendar to function ***
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// Style components
import { Box, Button, Card, Stack, Select, TextField, InputLabel, MenuItem } from "@mui/material";

export default function CreateTournament() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [ballType, setBallType] = useState("Cloth");
  const [location, setLocation] = useState("");
  const [courts, setCourts] = useState("");
  const [description, setDescription] = useState("");

  //! Dummy participant info
  //! Exact implementation may change when create-teams / create-participants components are live
    // Not sure why I'm hardcoding teamID. There is other info to add, but not that.
  const participants = [
    // {teamName: "Lions", teamID: 1},
    // {teamName: "Tigers", teamID: 2},
    // {teamName: "Bears", teamID: 3},
    // {teamName: "Falcons", teamID: 4}
  ]

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

    // Dispatching info to Tournament saga
    dispatch({ type: "CREATE_TOURNAMENT", payload: tournamentData });

    setName("");
    setStartDate(null);
    setLocation("");
    setCourts("");
    setDescription("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Card sx={{ padding: "20px", margin: "10px" }}>
        <Stack spacing={3}>
          {/* Name input*/}
          <TextField
            required
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          {/* Start Date input */}
          <DatePicker
            required
            value={startDate}
            onChange={(newDate) => setStartDate(newDate)}
          />

          {/* Ball Type input */}
          {/* <InputLabel id="ball-type-label">Ball Type</InputLabel>
          <Select
            required
            labelId="ball-type-label"
            placeholder="Ball Type"
            onChange={(event) => setBallType(event.target.value)}
            value={ballType}
          >
            <MenuItem value="cloth">Cloth</MenuItem>
            <MenuItem value="foam">Foam</MenuItem>
          </Select> */}

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

          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}
