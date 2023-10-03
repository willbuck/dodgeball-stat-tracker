import React from "react";
import { Link } from 'react-router-dom'

import { Box, Stack } from "@mui/material";

function AdminLanding() {
  return(
    <Box>
      <Stack>
        <Link className="navLink" to='/admin/create-tournament'>Create Tournament</Link>
        <Link className="navLink" to='/admin/manage-tournaments'>Manage Tournaments</Link>
        <Link className="navLink" to='/manage-games'>Manage Games</Link>
        <Link className="navLink" to='/create-team'>Create Team</Link>
        <Link className="navLink" to='/manage-teams'>Manage Teams</Link>
        <Link className="navLink" to='/manage-players'>Manage Players</Link>
        <Link className="navLink" to='/manage-users'>Manage Users</Link>
      </Stack>
    </Box>
  ) 
}

export default AdminLanding;
