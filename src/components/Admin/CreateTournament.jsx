import * as React from 'react';
import { FormContainer, TextFieldElement, DatePickerElement, TimePickerElement, AutocompleteElement } from 'react-hook-form-mui'

// Hooks
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import dayjs from 'dayjs'

// Style components
import Box from '@mui/material/Box';
import { Button, Stack } from '@mui/material'
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import NativeSelect from '@mui/material/NativeSelect';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function CreateTournament() {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [ballType, setBallType] = useState('');
  const [location, setLocation] = useState('');
  const [courts, setCourts] = useState('');
  const [description, setDescription] = useState('')


  const handleSubmit = (event) => {
    event.preventDefault()
    const tournamentData = { name, date: startDate, ballType, location, courts, description }
    console.log('tournamentData:', tournamentData)

    dispatch({type: 'CREATE_TOURNAMENT', payload: tournamentData})
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
        <Select
          required
          placeholder="Ball Type"
          value={ballType}
          onChange={(event) => setBallType(event.target.value)}
        >
          <MenuItem value="hairy">Hairy</MenuItem>
          <MenuItem value="smooth">Smooth</MenuItem>
        </Select>

        <TextField
          required
          placeholder="Location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />

        <TextField
          required
          placeholder="Courts"
          type="number"
          InputProps={{
            inputProps: { min: 2, max: 25 }
          }}
          value={courts}
          onChange={(event) => setCourts(event.target.value)}
        />

        <TextField 
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <Button type="submit">Submit</Button>

      </Stack>
    </Box>
  </>
  );
}