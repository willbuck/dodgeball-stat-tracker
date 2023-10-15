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
import ManageUsers from "../Admin/ManageUsers";
import ManagePlayers from '../Admin/ManagePlayers'

import BottomNavbar from "../BottomNavbar/BottomNavbar";
import Leaderboard from "../Leaderboard/Leaderboard";
import './App.css';

// Unique identifiers for anonymous users
import { v4 as uuidv4 } from 'uuid';
import { uniqueNamesGenerator, adjectives, colors, animals } from "unique-names-generator";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  // Creating unique user ID
  //! check for existing uuid before creating this?
  const uniqueID = {
    // Generating UUID from DNS namespace
    uuid: uuidv4('usa_dodgeball', uuidv4.DNS),

    // Generating pseudonym for easier readability
    pseudonym: uniqueNamesGenerator({
      dictionaries: [colors, animals],
      length: 2,
      seed: uuidv4('usa_dodgeball', uuidv4.DNS)
    })
  }

  

  // Fetch user
  useEffect(() => {
    dispatch({ type: "FETCH_USER", payload: uniqueID });

  }, [dispatch]);

  // Fetching global state from database at app load
  useEffect(() => {
    dispatch({ type: 'FETCH_PLAYERS', payload: user });
    dispatch({ type: "FETCH_TEAMS" });
    dispatch({ type: "FETCH_TOURNAMENTS" });
    dispatch({ type: 'FETCH_GAMES' });
    dispatch({ type: "FETCH_STATS" });
  }, [])

  return (
    <Router>
      <div>
        <Header />
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

          <ProtectedRoute exact path="/admin/manage-users">
            <ManageUsers />
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
        <BottomNavbar />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
