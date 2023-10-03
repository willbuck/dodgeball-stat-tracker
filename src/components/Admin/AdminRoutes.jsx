import React, { useEffect } from 'react';




  function AdminRoutes() {
    return (
      <>


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