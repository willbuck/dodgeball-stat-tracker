import React from "react";
import dayjs from "dayjs";

// Hooks
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useSelector } from "react-redux";
// *** Need this for calendar to function ***
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// Style components
import { Box, Button, Card, Stack, Select, TextField, InputLabel, MenuItem, Dialog, DialogTitle, DialogContent} from "@mui/material";

export default function CreateTournament() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [ballType, setBallType] = useState("Cloth");
  const [location, setLocation] = useState("");
  const [courts, setCourts] = useState("");
  const [description, setDescription] = useState("");
  const [ open, setOpen ] = useState(false);

  //! Dummy participant info
  //! Exact implementation may change when create-teams / create-participants components are live
    // Not sure why I'm hardcoding teamID. There is other info to add, but not that.
  const participants = [
    // {teamName: "Lions", teamID: 1},
    // {teamName: "Tigers", teamID: 2},
    // {teamName: "Bears", teamID: 3},
    // {teamName: "Falcons", teamID: 4}
  ]

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false);
  };

  const handlePresentation = () => {
    console.log('in click handler');
    setName("Maple Grove Invitational");
    const mapleDate = dayjs().set('year', 2023).set('month', 9).set('date', 21)
    setStartDate(mapleDate);
    setLocation("Maple Grove Arena");
    setCourts(6);
    setDescription("n/a");
  }
  

  const handleSubmit = (event) => {
    event.preventDefault()
    
    handleOpen()
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

        <Stack spacing={3}>
          {/* Name input*/}
          <TextField
            required
            placeholder="Name"
            value={name}
            onClick={handlePresentation}
            onChange={(event) => setName(event.target.value)}
            sx={{ padding: 2 }}
          />

        {/* Start Date input */}
        <DatePicker sx={{ padding: 2 }}
          required
          value={startDate}
          onChange={(newDate) => setStartDate(newDate)}
        />


        {/* Location input */}
        <TextField sx={{ padding: 2 }}
          required
          placeholder="Location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />

        {/* Courts input */}
        <TextField sx={{ padding: 2 }}
          required
          placeholder="Courts"
          type="number"
          InputProps={{
            inputProps: { min: 2, max: 25 }
          }}
          value={courts}
          onChange={(event) => setCourts(event.target.value)}
        />

        {/* Description input */}
        <TextField sx={{ padding: 2 }}
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <Button sx={{ padding: 2 }} type="submit">Submit</Button>

        <Box component="form"  noValidate sx={{ mt: 1, width: 1, height: 1 }}>
        {(
          <Dialog open={open} onClose={handleClose} >
            <DialogTitle>Tournament Added!</DialogTitle>
          </Dialog>
        )}
        </Box>

      </Stack>
    </Box>

  );
}
