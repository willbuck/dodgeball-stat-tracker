import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Box, Card, Typography, Grid, Container, Badge } from '@mui/material';
import { IconTrash } from '@tabler/icons-react';
import { IconShirtFilled } from '@tabler/icons-react';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import EditIcon from '@mui/icons-material/Edit';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ManageTeamsModal from './ManageTeamsModal';

export default function ManageTeams() {

  const dispatch = useDispatch()
  const allTeams = useSelector((store) => store.teamsReducer)

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

  return (
    <Container sx={{ marginBottom: 15 }}>
      <Card sx={{ padding: '20px', margin: '10px', }}>
        <Grid container spacing={3}>
          {allTeams.map((team) => (
            <Grid item xs={12} sm={6} md={4} key={team.id}>

              <Card sx={{
                padding: '20px',
                margin: '10px',
                border: '1px solid grey',
                // boxShadow: '0px 1px 2px darkGrey',
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
            </Grid>
          ))}
        </Grid>
      </Card>
    </Container>
  )
}

