import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Container, TextField, Typography, Stack, Button, Box, Grid, Card, Badge } from '@mui/material'

// imports for testing merge of add teams with manage teams below
import { IconTrash } from '@tabler/icons-react';
import { IconShirtFilled } from '@tabler/icons-react';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import EditIcon from '@mui/icons-material/Edit';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ManageTeamsModal from './ManageTeamsModal';
import Autocomplete from "@mui/material/Autocomplete";
import Divider from '@mui/material/Divider';

export default function AddTeam() {
  const dispatch = useDispatch();
  const allTeams = useSelector((store) => store.teamsReducer)
  const allTournaments = useSelector((store) => store.tournamentsReducer)


  const [teamName, setTeamName] = useState('')
  const [teamColor, setTeamColor] = useState('')


  const handleSubmit = (event) => {
    event.preventDefault()

    // TODO: add jersey color
    const teamData = { teamName, teamColor }
    console.log("adding team", teamData)
    dispatch({ type: 'ADD_TEAM', payload: teamData })

    setTeamName('')
    setTeamColor('')
  }

  // mapping a list of teams in the DB
  // create a teams store - fetch all teams from DB
  // useEffect fetch all teams from teams
  // create menu map teams array
  // send selected teams and bundle up a participants array


  // MANAGE TEAMS CONTENT START
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  //! Should this function be async?
  const handleDelete = (id) => {
    dispatch({ type: "DELETE_TEAM", payload: id });
    dispatch({ type: 'FETCH_TEAMS' })
  }

  const handleLocation = (id) => {
    console.log("id from team", id)
    dispatch({ type: "FETCH_MTEAM", payload: id });
    //dispatch({ type: 'FETCH_TEAMS' })
  }



  // These handle teams search bar
  const [selectedTeam, setSelectedTeam] = useState(null);

  // This functions handles the selected game
  const handleSearchbarClick = (newValue) => {
    setSelectedTeam(newValue);
  };



  // Creates Dictionary Object to Group tourament data to team data
  const teamsByTournament = {};

  allTeams.forEach((team) => {
    const tournamentId = team.tournament_id;
    const tournament = allTournaments.find((t) => t.id === tournamentId);
    if (tournament) {
      const tournamentName = tournament.tournament_name;
      if (!teamsByTournament[tournamentName]) {
        teamsByTournament[tournamentName] = [];
      }
      teamsByTournament[tournamentName].push(team);
    }
  });
  // MANAGE TEAM CONTENT END



  return (
    <Container sx={{ marginBottom: 15 }}>

      <Typography variant="h5">Add Team:</Typography>

      <Card sx={{ padding: '20px', margin: '10px', }}>
        <Container component='form' onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Typography variant="h4">{teamName}</Typography>

            <TextField
              required
              label="Team Name"
              placeholder="Team Name"
              onChange={(event) => setTeamName(event.target.value)}
              value={teamName}
            ></TextField>

            <TextField
              label="Team Color"
              placeholder="Team Color"
              onChange={(event) => setTeamColor(event.target.value)}
              value={teamColor}
            ></TextField>

            <Button
              type="submit"
              variant="contained"
            >Submit</Button>
          </Stack>
        </Container>
      </Card>


      <Container sx={{ marginTop: 7 }}>

        <Typography variant="h5">Teams:</Typography>

        {/* Search for specific team */}
        <Stack spacing={2} sx={{ width: 300 }}>
          <Autocomplete
            id="free-solo-2-demo"
            options={allTeams}
            getOptionLabel={(option) =>
              `${option.team_name}`
            }
            onChange={(event, newValue) => {
              handleSearchbarClick(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search All Teams"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
        </Stack>

        {selectedTeam ? (

          <Card sx={{
            padding: '20px',
            margin: '10px',
            border: '1px solid grey',
            // boxShadow: '0px 1px 2px darkGrey',
          }}>
            <Badge badgeContent="" sx={{ color: selectedTeam.jersey_color }}>
              <IconShirtFilled />
            </Badge>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h5">
                {selectedTeam.team_name}
              </Typography>
              <Button
                value={selectedTeam.id}
                onClick={handleClick}>
                <EditIcon size={30} />
                Edit
              </Button>
              <Menu
                id="demo-customized-menu"
                MenuListProps={{
                  'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                {/* <MenuItem disableRipple>
                    <StarOutlineIcon />
                    Make Team Captain
                </MenuItem> */}
                <MenuItem onClick={() => handleLocation(anchorEl.value)} disableRipple>
                  <EditLocationAltIcon />
                  <ManageTeamsModal />
                </MenuItem>
                <MenuItem onClick={() => handleDelete(anchorEl.value)} disableRipple>
                  <IconTrash />
                  Delete Team
                </MenuItem>
              </Menu>
            </Box>
          </Card>

        ) : (
          <>

          </>
        )}



        <div>
          {Object.entries(teamsByTournament).map(([tournamentName, teams]) => (
            <div key={tournamentName}>
              <Divider sx={{ marginTop: 4 }} />
              <Typography variant="h5" sx={{ marginLeft: 2 }}>Tournament: </Typography><Typography variant="h6" sx={{ marginLeft: 7 }}>{tournamentName}</Typography>
              <Grid container spacing={3}>
                {teams.map((team) => (
                  <Grid item xs={12} sm={6} md={4} key={team.id}>
                    <Card sx={{
                      padding: '20px',
                      margin: '10px',
                      border: '1px solid grey',
                    }}>
                      <Badge badgeContent="" sx={{ color: team.jersey_color }}>
                        <IconShirtFilled />
                      </Badge>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="h5">
                          {team.team_name}
                        </Typography>
                        <Button
                          value={team.id}
                          onClick={handleClick}>
                          <EditIcon size={30} />
                          Edit
                        </Button>
                        <Menu
                          id="demo-customized-menu"
                          MenuListProps={{
                            'aria-labelledby': 'demo-customized-button',
                          }}
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                        >
                          <MenuItem onClick={() => handleLocation(anchorEl.value)} disableRipple>
                            <EditLocationAltIcon />
                            <ManageTeamsModal />
                          </MenuItem>
                          <MenuItem onClick={() => handleDelete(anchorEl.value)} disableRipple>
                            <IconTrash />
                            Delete Team
                          </MenuItem>
                        </Menu>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
          ))}
        </div>


      </Container>

    </Container>
  );
}