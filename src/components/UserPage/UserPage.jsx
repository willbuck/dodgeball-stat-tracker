import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import SearchTournament from '../SearchTournament/SearchTournament';
import TournamentList from '../TournamentList/TournamentList';

function UserPage() {
  
  return (
    <div className="container">
      <SearchTournament />
      <TournamentList />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
