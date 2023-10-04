import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import SearchTournament from '../SearchTournament/SearchTournament';
import TournamentList from '../TournamentList/TournamentList';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <SearchTournament />
      <TournamentList />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
