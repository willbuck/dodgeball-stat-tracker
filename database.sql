
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  username VARCHAR(90) NOT NULL,
  password VARCHAR(100),
  auth_level INTEGER NOT NULL,
  email VARCHAR(90)
);

CREATE TYPE status AS ENUM ('not started', 'in progress', 'completeed');
CREATE TABLE game (
  id SERIAL PRIMARY KEY,
  team1_id INT REFERENCES "team" NOT NULL,
  team2_id INT REFERENCES "team" NOT NULL,
  start_time TIME,
  end_time TIME,
  date date,
  court VARCHAR(50),
  team1_score VARCHAR(10),
  team2_score INTEGER,
  game_status status,
  ball_type VARCHAR(20),
  tournament_id INT REFERENCES "tournament" NOT NULL
);

CREATE TABLE team (
  id SERIAL PRIMARY KEY,
  team_name VARCHAR(60) NOT NULL,
  jersey_color VARCHAR(50),
  tournament_id INT REFERENCES "tournament" NOT NULL
);

CREATE TABLE players (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(90) NOT NULL,
  lastname VARCHAR(90) NOT NULL,
  jersey_number INTEGER NOT NULL,
  team_id INT REFERENCES "team" NOT NULL,
  phone_number VARCHAR(15),
  image_path VARCHAR(1000),
  social INT REFERENCES "social",
  can_referee BOOLEAN NOT NULL,
  captain BOOLEAN NOT NULL
);

CREATE TYPE event AS ENUM('kill', 'catch', 'out');
CREATE TABLE statistics (
  id SERIAL PRIMARY KEY,
  event event,
  is_official BOOLEAN NOT NULL,
  game_id INT REFERENCES "game" NOT NULL,
  player_id INT REFERENCES "players" NOT NULL,
  user_id INT REFERENCES "user" NOT NULL
);

CREATE TABLE tournament (
  id SERIAL PRIMARY KEY,
  tournament_name VARCHAR(90) NOT NULL,
  tournament_organizer INT REFERENCES "user" NOT NULL,
  location VARCHAR(100) NOT NULL
);

CREATE TABLE social (
  id SERIAL PRIMARY KEY,
  platform VARCHAR(40) NOT NULL,
  username VARCHAR(90) NOT NULL,
  link VARCHAR(200) NOT NULL
);

CREATE TABLE inputer_value (
  id SERIAL PRIMARY KEY,
  inputer_value VARCHAR(20) NOT NULL,
  user_id INT REFERENCES "user" NOT NULL,
  tournament_id INT REFERENCES "tournament" NOT NULL
);