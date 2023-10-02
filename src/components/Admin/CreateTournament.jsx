import * as React from 'react';
import { FormContainer, TextFieldElement, DatePickerElement, TimePickerElement, AutocompleteElement } from 'react-hook-form-mui'

import { Button, Stack } from '@mui/material'


export default function CreateTournament() {
  return (
    <FormContainer defaultValues={{ name: '' 
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
    </FormContainer>
  );
}