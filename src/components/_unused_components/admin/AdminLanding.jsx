// Routing
import { Link } from 'react-router-dom'

// Style components
import { Box, Stack } from "@mui/material";

function AdminLanding() {
  return(
    <Box>
      <Stack>
        <Link className="navLink" to='/admin/create-tournament'>Create Tournament</Link>
        <Link className="navLink" to='/admin/manage-tournaments'>Manage Tournaments</Link>
        <Link className="navLink" to='/admin/manage-games'>Manage Games</Link>
        <Link className="navLink" to='/admin/add-team'>Add Team</Link>
        <Link className="navLink" to='/admin/manage-teams'>Manage Teams</Link>
        <Link className="navLink" to='/admin/manage-players'>Manage Players</Link>
        <Link className="navLink" to='/admin/manage-users'>Manage Users</Link>
      </Stack>
    </Box>
  ) 
}

export default AdminLanding;