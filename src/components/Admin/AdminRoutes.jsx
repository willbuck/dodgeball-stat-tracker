import React, { useEffect } from 'react';

import AdminLanding from './AdminLanding';
import CreateTournament from './CreateTournament';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';


  function AdminRoutes() {
    return (
      <>
        <ProtectedRoute exact path="/admin">
          <AdminLanding />
        </ProtectedRoute>

        <ProtectedRoute exact path="/admin/create-tournament">
          <CreateTournament />
        </ProtectedRoute>
        
        <ProtectedRoute exact path="/admin/manage-tournament">
          {/* Add your admin route components here */}
        </ProtectedRoute>

        <ProtectedRoute exact path="/admin/route3">
          {/* Add your admin route components here */}
        </ProtectedRoute>

        <ProtectedRoute exact path="/admin/route4">
          {/* Add your admin route components here */}
        </ProtectedRoute>

        <ProtectedRoute exact path="/admin/route5">
          {/* Add your admin route components here */}
        </ProtectedRoute>

        <ProtectedRoute exact path="/admin/route6">
          {/* Add your admin route components here */}
        </ProtectedRoute>

        <ProtectedRoute exact path="/admin/route7">
          {/* Add your admin route components here */}
        </ProtectedRoute>
      </>
    );
  }
  
  export default AdminRoutes;