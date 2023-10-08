import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";


import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

// Admin Imports
import AdminLanding from '../Admin/AdminLanding'
import CreateTournament from '../Admin/CreateTournament'
import ManageTournaments from "../Admin/ManageTournaments";
import AddTeam from '../Admin/AddTeam'
import ManageTeams from '../Admin/ManageTeams'

// Component Imports
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import TournamentDetails from "../TournamentDetails/TournamentDetails";

import Leaderboard from "../Leaderboard/Leaderboard";
import './App.css';
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import GameDetail from '../GameDetail/GameDetail';


import "./App.css";

// Unique identifiers for anonymous users
import { v5 as uuidv5 } from 'uuid';
import { uniqueNamesGenerator, adjectives, colors, animals } from "unique-names-generator";
import checkEmpty from "../../utilities/checkEmpty";



function App() {
  const dispatch = useDispatch();

  // Creating unique user ID
  const uniqueID = {
    // Generating UUID from DNS namespace
    uuid: uuidv5('usa_dodgeball', uuidv5.DNS),

    // Generating pseudonym for easier readability
    pseudonym: uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals ],
      length: 3,
      seed: uuidv5('usa_dodgeball', uuidv5.DNS)
    })
  }
  
  const user = useSelector((store) => store.user);

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



          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>


          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            path="/gameview/:id"
          >
            <GameDetail />
          </ProtectedRoute>


          <ProtectedRoute path="/tournamentDetails/:id">
            <TournamentDetails />
          </ProtectedRoute>

          <ProtectedRoute path="/leaderboard/:id">
            <Leaderboard />
          </ProtectedRoute>

          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,

              // redirect to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route exact path="/registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          <Route exact path="/home">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the Landing page
              <LandingPage />
            )}
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
