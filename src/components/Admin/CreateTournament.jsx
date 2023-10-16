import * as React from 'react';
import { FormContainer, TextFieldElement, DatePickerElement, TimePickerElement, AutocompleteElement } from 'react-hook-form-mui'

// Hooks
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

// Style components
import Box from '@mui/material/Box';
import { Button, Stack } from '@mui/material'
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Select } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import NativeSelect from '@mui/material/NativeSelect';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dialog, DialogTitle, DialogContent } from "@mui/material";


export default function CreateTournament() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [ballType, setBallType] = useState('');
  const [location, setLocation] = useState('');
  const [courts, setCourts] = useState('');
  const [description, setDescription] = useState('')
  const [ open, setOpen ] = useState(false)

  

  //! Dummy participant info
  //! Exact implementation may change when create-teams / create-participants components are live
  const participants = [
    {teamName: "Lions", teamID: 1},
    {teamName: "Tigers", teamID: 2},
    {teamName: "Bears", teamID: 3},
    {teamName: "Falcons", teamID: 4}
  ]

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false);
  };

  

  const handleSubmit = (event) => {
    event.preventDefault()
    
    handleOpen()
    // Tournament info to send
    const tournamentData = { name, startDate, ballType, location, courts, description, user, participants }

    // console.log('tournamentData:', tournamentData)

    // Dispatching info to Tournament saga
    dispatch({type: 'CREATE_TOURNAMENT', payload: tournamentData});

    setName('');
    setStartDate(null);
    setLocation('');
    setCourts('');
    setDescription('');
    
  }

  return (<>
    <div>
      {/* <FormContainer defaultValues={{ name: '' 
    }}>
      <Stack>

      <TextFieldElement name="name" label="Name" required />
      <DatePickerElement name='date' label="Date" required />
      <TimePickerElement name="start" label="Start Time" />
      <TimePickerElement name="end" label="End Time" />
      <TextFieldElement name='court' label="Court" />
      <TextFieldElement name='location' label='Location' />
      <AutocompleteElement 
        name='ball'
        label='Ball Type'
        options={[
          {
            id: 1,
            label: 'Rubber'
          },
          {
            id: 2,
            label: 'Cloth'
          },
          {
            id: 3,
            label: 'Other'
          },
        ]}
      />
      </Stack>
    </FormContainer> */}
    </div>

    <Box sx={{ padding: 2 }} component="form" onSubmit={handleSubmit}>
      <Stack>

        {/* Name input*/}
        <TextField sx={{ padding: 2 }}
          required
          value={name}
          placeholder="Name"
          onChange={(event) => setName(event.target.value)}
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
  </>
  );
}