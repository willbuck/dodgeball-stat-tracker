import React from 'react';
import SearchTournament from './Tournaments/SearchTournament';
import TournamentList from './Tournaments/TournamentList';

function Home() {
  
  return (
    <div className="container">
      <SearchTournament />
      <TournamentList />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default Home;
