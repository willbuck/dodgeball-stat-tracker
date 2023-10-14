import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ManageTournamentsModal from './ManageTournamentsModal';
import { Button, Box, Card, Typography, Grid, Container, Stack } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconTrash } from '@tabler/icons-react';
// import EditNoteIcon from '@mui/icons-material/EditNote';

export default function ManageTournaments() {

  const dispatch = useDispatch()
  const allTeams = useSelector((store) => store.tournamentsReducer)
  console.log('all teams', allTeams);

  //! Should this be async?
  const handleDelete = (id) => {
    dispatch({ type: "DELETE_TOURNAMENT", payload: id });
    dispatch({ type: "FETCH_TOURNAMENTS" })
  }


  // Edit Menu Functions
  // anchorEl is the menu button's anchor (it cannot be renamed to propery function)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleEdit = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };




  return (
    <Container sx={{ marginBottom: 15 }}>
      <Grid container spacing={3}>
        {allTeams.map((tournament) => (

          // Maps Cards of Tournaments
          <Grid item xs={12} sm={6} md={4} key={tournament.id}>

            {/* Renders Card for Tournament*/}
            <Card sx={{
              padding: '20px',
              margin: '10px',
              border: '1px solid grey',
            }}>
              <Box display="flex" justifyContent="space-between">
                <Stack>
                  <Typography variant="h5">
                    {/* tournament name here */}
                    {tournament.tournament_name}
                  </Typography>
                  <Typography variant='h6'>
                    {tournament.location}
                  </Typography>
                </Stack>



                {/* Edit Button and Menu on Each Card*/}
                <div>
                  <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleEdit}

                  >
                    <EditIcon size={24} />
                    Edit
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem>
                      <ManageTournamentsModal tournamentID={tournament.id} />
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Button
                        onClick={() => handleDelete(tournament.id)}
                      >
                        <IconTrash size={20} />
                        Delete
                      </Button>
                    </MenuItem>
                  </Menu>
                </div>


              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

