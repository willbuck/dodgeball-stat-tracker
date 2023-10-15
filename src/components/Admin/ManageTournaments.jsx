import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ManageTournamentsModal from './ManageTournamentsModal';
import { Button, Box, Card, Typography, CardContent, Grid, Container, Stack, Divider } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconTrash } from '@tabler/icons-react';
// import EditNoteIcon from '@mui/icons-material/EditNote';

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ManageTournaments() {

  const dispatch = useDispatch()
  const allTournaments = useSelector((store) => store.tournamentsReducer)
  const allUsers = useSelector((store) => store.manageUsersReducer)

  // console.log('all teams', allTournaments);

  //! Should this be async?
  const handleDelete = (id) => {
    dispatch({ type: "DELETE_TOURNAMENT", payload: id });
    dispatch({ type: "FETCH_TOURNAMENTS" })
  }


  // Edit Menu Functions
  // anchorEl is the menu button's anchor (it cannot be renamed to propery function)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleEdit = (event, tournamentId) => {
    setSelectedTournamentId(tournamentId);
    console.log('tournament id before modal', selectedTournamentId);

    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  const [selectedTourny, setSelectedTourny] = useState(null);
  const [selectedTournamentId, setSelectedTournamentId] = useState(null);


  // This functions handles the selected game
  const handleSearchbarClick = (newValue) => {
    setSelectedTourny(newValue);
  };



  // Creates Dictionary Object to Group tourament data to user data
  const tournamentsByUser = {};

  allTournaments.forEach((tournament) => {
    const organizerId = tournament.tournament_id;
    const user = allTournaments.find((u) => u.id === organizerId);
    if (user) {
      const organizerName = user.username;
      if (!tournamentsByUser[organizerName]) {
        tournamentsByUser[organizerName] = [];
      }
      tournamentsByUser[organizerName].push(tournament);
    }
  });

  const getOrganizerName = (organizerId) => {
    const organizerUser = allUsers.find((user) => user.id === organizerId);
    return organizerUser ? organizerUser.username : 'Unknown';
  };


  return (
    <Container sx={{ marginBottom: 15 }}>

      {/* Search for specific tournament */}
      <Stack spacing={2} sx={{ width: 300 }}>
        <Autocomplete
          id="free-solo-2-demo"
          options={allTournaments}
          getOptionLabel={(option) =>
            `${option.tournament_name}`
          }
          onChange={(event, newValue) => {
            handleSearchbarClick(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search All Tournaments"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
      </Stack>

      {selectedTourny ? (

        <Card sx={{
          padding: '20px',
          margin: '10px',
          border: '1px solid grey',
        }}>
          <Box display="flex" justifyContent="space-between">
            <CardContent>
              <Typography variant="h5">{selectedTourny.tournament_name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {selectedTourny.location}
              </Typography>
              <Divider />
              <Typography variant="body2" color="textSecondary">
                {selectedTourny.start_date || 'Start Date: TBD'}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Organizer: {getOrganizerName(selectedTourny.tournament_organizer)}
              </Typography>
            </CardContent>



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
                <MenuItem onClick={(event) => handleEdit(event, selectedTourny.id)}>
                  <ManageTournamentsModal tournamentId={selectedTournamentId} />
                </MenuItem>

                <MenuItem onClick={handleClose}>
                  <Button
                    onClick={() => handleDelete(selectedTourny.id)}
                  >
                    <IconTrash size={20} />
                    Delete
                  </Button>
                </MenuItem>
              </Menu>
            </div>


          </Box>
        </Card>

      ) : (
        <>

        </>
      )}

      <Card sx={{ padding: '20px', margin: '10px', }}>
        <Grid container spacing={3}>
          {allTournaments.map((tournament) => (

            // Maps Cards of Tournaments
            <Grid item xs={12} sm={6} md={4} key={tournament.id}>

              {/* Renders Card for Tournament*/}
              <Card sx={{
                padding: '20px',
                margin: '10px',
                border: '1px solid grey',
                marginBottom: 2,
              }}>
                <Box display="flex" justifyContent="space-between">
                  <CardContent>
                    <Typography variant="h5">{tournament.tournament_name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {tournament.location}
                    </Typography>
                    <Divider />
                    <Typography variant="body2" color="textSecondary">
                      {tournament.start_date || 'Start Date: TBD'}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Organizer: {getOrganizerName(tournament.tournament_organizer)}
                    </Typography>
                  </CardContent>


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
                      <MenuItem onClick={(event) => handleEdit(event, tournament.id)}>
                        <ManageTournamentsModal tournamentId={tournament.id} />
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
      </Card>
    </Container>
  )
}

