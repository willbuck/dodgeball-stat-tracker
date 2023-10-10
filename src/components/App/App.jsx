import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";


import ProtectedRoute from "../Utility/ProtectedRoute";

// Component Imports
import Home from "../Main/Home";
import LoginPage from '../Login-Register/Login/LoginPage';
import RegisterPage from "../Login-Register/Register/RegisterPage";
import TournamentDetails from "../Main/Games/GamesList";
import Header from "../Header-Footer/Header/Header";
import Footer from '../Header-Footer/Footer/Footer'
import GameDetail from '../Main/Games/GameDetail';

// Admin Component Imports
import AdminLanding from '../Admin/AdminLanding'
import CreateTournament from '../Admin/CreateTournament'
import ManageTournaments from "../Admin/ManageTournaments";
import AddTeam from '../Admin/AddTeam'
import ManageTeams from '../Admin/ManageTeams'
import ManagePlayers from '../Admin/ManagePlayers'


import Leaderboard from "../Leaderboard/Leaderboard";
import './App.css';

import Sidebar from "../Sidebar/Sidebar"



// Unique identifiers for anonymous users
import { v5 as uuidv5 } from 'uuid';
import { uniqueNamesGenerator, adjectives, colors, animals } from "unique-names-generator";



function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  // Creating unique user ID
  const uniqueID = {
    // Generating UUID from DNS namespace
    uuid: uuidv5('usa_dodgeball', uuidv5.DNS),

    // Generating pseudonym for easier readability
    pseudonym: uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
      length: 3,
      seed: uuidv5('usa_dodgeball', uuidv5.DNS)
    })
  }

  // Fetching global state from database at app load
  useEffect(() => {
    dispatch({ type: 'FETCH_PLAYERS' });
    dispatch({ type: "FETCH_TEAMS" });
    dispatch({ type: "FETCH_TOURNAMENTS" });
    dispatch({ type: 'FETCH_GAMES' });
  }, [])

  // Fetch user
  //! Question: why do we need to do this any time
  //! there is a dispatch in the app?
  useEffect(() => {
    dispatch({ type: "FETCH_USER", payload: uniqueID });

  }, [dispatch]);

  return (
    <Router>
      <div>
        <Header />
        <Sidebar />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* ADMIN ROUTES */}
          <ProtectedRoute exact path="/admin">
            <AdminLanding />
          </ProtectedRoute>

          <ProtectedRoute exact path="/admin/create-tournament">
            <CreateTournament />
          </ProtectedRoute>

          <ProtectedRoute exact path="/admin/manage-tournaments">
            <ManageTournaments />
          </ProtectedRoute>

          <ProtectedRoute exact path="/admin/add-team">
            <AddTeam />
          </ProtectedRoute>

          <ProtectedRoute exact path="/admin/manage-teams">
            <ManageTeams />
          </ProtectedRoute>

          <ProtectedRoute exact path="/admin/manage-players">
            <ManagePlayers />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/home"
          >
            <Home />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            path="/gameview/:id"
          >
            <GameDetail />
          </ProtectedRoute>


          <ProtectedRoute path="/games/:id">
            <TournamentDetails />
          </ProtectedRoute>

          <ProtectedRoute path="/leaderboard/:id">
            <Leaderboard />
          </ProtectedRoute>

          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,

              // redirect to the /user page
              <Redirect to="/home" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route exact path="/registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/home" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          <Route exact path="/home">
              <Home />
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
