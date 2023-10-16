-- User table
CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  username VARCHAR(90) NOT NULL,
  password VARCHAR(100),
  auth_level INTEGER,
  email VARCHAR(90)
);

-- Tournament table
-- Updated 10/5 @ 10:00am
CREATE TABLE tournament (
    id SERIAL PRIMARY KEY,
    tournament_name VARCHAR NOT NULL,
    tournament_organizer integer NOT NULL REFERENCES "user"(id),
    "location" VARCHAR NOT NULL,
    "ball_type" VARCHAR,
    "description" VARCHAR,
    "start_date" timestamp with time zone,
    "url" VARCHAR UNIQUE,
    courts integer
);

-- Team table
-- Updated 10/5 @ 10:00am
CREATE TABLE team (
  id SERIAL PRIMARY KEY,
  team_name VARCHAR(60) NOT NULL,
  jersey_color VARCHAR(50),
  tournament_id INT REFERENCES "tournament",
  image_path VARCHAR
);

-- Game table
CREATE TYPE status AS ENUM ('not started', 'in progress', 'completed');
CREATE TABLE game (
  id SERIAL PRIMARY KEY,
  team1_id INT REFERENCES "team" NOT NULL,
  team2_id INT REFERENCES "team" NOT NULL,
  start_time TIME,
  end_time TIME,
  "date" date,
  court VARCHAR(50),
  team1_score INTEGER,
  team2_score INTEGER,
  game_status status,
  ball_type VARCHAR(20),
  tournament_id INT REFERENCES "tournament" NOT NULL
);

-- Social table
CREATE TABLE social (
  id SERIAL PRIMARY KEY,
  platform VARCHAR(40) NOT NULL,
  username VARCHAR(90) NOT NULL,
  link VARCHAR(200) NOT NULL
);

-- Players table
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

-- Table for unique user ID's (used for unregistered users)
-- Updated 10/10 @ 11:30am
CREATE TABLE uuid (
    uuid VARCHAR NOT NULL UNIQUE,
    pseudonym VARCHAR,
    id SERIAL PRIMARY KEY
);

-- Statistics table
-- Updated 10/10 @ 11:30am
CREATE TABLE statistics (
  id SERIAL PRIMARY KEY,
  is_official BOOLEAN NOT NULL,
  game_id INT REFERENCES "game" NOT NULL,
  player_id INT REFERENCES "players" NOT NULL,
  user_id INT REFERENCES "user",
  kills integer,
  outs integer,
  catches integer,
  uuid integer REFERENCES uuid(id)
);

-- Participants table
-- Updated 10/5 @ 10:00am
CREATE TABLE participants (
    id SERIAL PRIMARY KEY,
    team_id integer REFERENCES team(id),
    tournament_url VARCHAR REFERENCES tournament(url)
);

-- Insert fake data into the "user" table (9 rows)
INSERT INTO "user" (username, password, auth_level, email)
VALUES
  ('Bob', 'password123', 2, 'bob@example.com'),
  ('Alice', 'securepass', 3, 'alice@example.com'),
  ('John', 'secret', 1, 'john@example.com'),
('Sarah', 'sarahpass', 2, 'sarah@example.com'),
  ('David', 'davidpass', 3, 'david@example.com'),
  ('Jennifer', 'jenniferpass', 1, 'jennifer@example.com'),
  ('Michael', 'michaelpass', 2, 'michael@example.com'),
  ('Laura', 'laurapass', 3, 'laura@example.com'),
  ('Daniel', 'danielpass', 1, 'daniel@example.com');

-- Insert fake data into the "tournament" table (3 rows)
INSERT INTO tournament (tournament_name, tournament_organizer, location)
VALUES
  ('2023 National Championship', 1, ' Hy-Vee Arena'),
  ('Premier Tour Philadelphia', 2, 'Competitive Edge Sports'),
  ('Premier Tour Chicago', 3, 'Wintrust Sports Complex');

-- Insert fake data into the "team" table (18 rows)
INSERT INTO team (team_name, jersey_color, tournament_id)
VALUES
  ('Outsiders', 'Blue', 1),
  ('Anarchy', 'Red', 2),
  ('Misfits', 'Green', 1),
 ('Fortune', 'Yellow', 2),
  ('Hex', 'Black', 1),
  ('Precision', 'Aqua', 3),
  ('Havoc', 'Green', 2),
  ('LFG!', 'Purple', 3),
  ('Onna-Musha', 'Navy', 1),
  ('Invasion', 'Red', 3),
  ('Whisper', 'Gold', 1),
  ('Boom Shakalaka!', 'Blue', 2),
  ('Amplify', 'Black', 3),
  ('Pride', 'Red', 1),
  ('Echo', 'Orange', 2),
  ('Moist', 'Silver', 3),
  ('Brick Squad', 'Red', 1),
  ('Razzle Chazzle', 'Green', 2);

-- Insert fake data into the "game" table (33 rows)
INSERT INTO game (team1_id, team2_id, start_time, end_time, date, court, team1_score, team2_score, game_status, ball_type, tournament_id)
VALUES
  (1, 2, '14:00:00', '16:00:00', '2023-10-02', 'Court A', 10, 5, 'completed', 'indoor', 1),
  (3, 4, '15:30:00', '17:30:00', '2023-10-03', 'Court B', 8, 12, 'in progress', 'outdoor', 2),
  (2, 3, '16:45:00', '18:45:00', '2023-10-04', 'Court C', 12, 10, 'not started', 'indoor', 1),
  (4, 1, '18:00:00', '20:00:00', '2023-10-05', 'Court D', 7, 9, 'completed', 'outdoor', 3),
  (5, 6, '19:15:00', '21:15:00', '2023-10-06', 'Court E', 15, 6, 'in progress', 'indoor', 2),
  (6, 5, '20:30:00', '22:30:00', '2023-10-07', 'Court F', 9, 9, 'not started', 'outdoor', 3),
(1, 2, '14:00:00', '16:00:00', '2023-10-02', 'Court A', 10, 5, 'completed', 'indoor', 1),
  (3, 4, '15:30:00', '17:30:00', '2023-10-03', 'Court B', 8, 12, 'in progress', 'outdoor', 2),
  (2, 3, '16:45:00', '18:45:00', '2023-10-04', 'Court C', 12, 10, 'not started', 'indoor', 1),
  (4, 1, '18:00:00', '20:00:00', '2023-10-05', 'Court D', 7, 9, 'completed', 'outdoor', 3),
  (5, 6, '19:15:00', '21:15:00', '2023-10-06', 'Court E', 15, 6, 'in progress', 'indoor', 2),
  (6, 5, '20:30:00', '22:30:00', '2023-10-07', 'Court F', 9, 9, 'not started', 'outdoor', 3),
  (7, 8, '14:00:00', '16:00:00', '2023-10-08', 'Court G', 11, 7, 'completed', 'indoor', 1),
  (8, 9, '15:30:00', '17:30:00', '2023-10-09', 'Court H', 10, 11, 'in progress', 'outdoor', 2),
  (9, 10, '16:45:00', '18:45:00', '2023-10-10', 'Court I', 13, 14, 'not started', 'indoor', 1),
  (10, 11, '18:00:00', '20:00:00', '2023-10-11', 'Court J', 8, 9, 'completed', 'outdoor', 3),
  (11, 12, '19:15:00', '21:15:00', '2023-10-12', 'Court K', 12, 8, 'in progress', 'indoor', 2),
  (12, 13, '20:30:00', '22:30:00', '2023-10-13', 'Court L', 10, 10, 'not started', 'outdoor', 3),
  (13, 14, '14:00:00', '16:00:00', '2023-10-14', 'Court M', 9, 12, 'completed', 'indoor', 1),
  (14, 15, '15:30:00', '17:30:00', '2023-10-15', 'Court N', 7, 8, 'in progress', 'outdoor', 2),
  (15, 16, '16:45:00', '18:45:00', '2023-10-16', 'Court O', 14, 14, 'not started', 'indoor', 1),
  (16, 17, '18:00:00', '20:00:00', '2023-10-17', 'Court P', 10, 11, 'completed', 'outdoor', 3),
  (17, 18, '19:15:00', '21:15:00', '2023-10-18', 'Court Q', 8, 7, 'in progress', 'indoor', 2),
  (18, 1, '20:30:00', '22:30:00', '2023-10-19', 'Court R', 10, 9, 'not started', 'outdoor', 3),
  (1, 2, '14:00:00', '16:00:00', '2023-10-20', 'Court S', 10, 5, 'completed', 'indoor', 1),
  (3, 4, '15:30:00', '17:30:00', '2023-10-21', 'Court T', 8, 12, 'in progress', 'outdoor', 2),
  (2, 3, '16:45:00', '18:45:00', '2023-10-22', 'Court U', 12, 10, 'not started', 'indoor', 1),
  (4, 1, '18:00:00', '20:00:00', '2023-10-23', 'Court V', 7, 9, 'completed', 'outdoor', 3),
  (5, 6, '19:15:00', '21:15:00', '2023-10-24', 'Court W', 15, 6, 'in progress', 'indoor', 2),
  (6, 5, '20:30:00', '22:30:00', '2023-10-25', 'Court X', 9, 9, 'not started', 'outdoor', 3),
  (7, 8, '14:00:00', '16:00:00', '2023-10-26', 'Court Y', 11, 7, 'completed', 'indoor', 1),
  (8, 9, '15:30:00', '17:30:00', '2023-10-27', 'Court Z', 10, 11, 'in progress', 'outdoor', 2),
  (9, 10, '16:45:00', '18:45:00', '2023-10-28', 'Court AA', 13, 14, 'not started', 'indoor', 1);

-- Insert fake data into the "social" table (12 rows)
INSERT INTO social (platform, username, link)
VALUES
  ('Facebook', 'user1', 'https://www.facebook.com/user1'),
  ('Twitter', 'user2', 'https://twitter.com/user2'),
  ('Instagram', 'user3', 'https://www.instagram.com/user3'),
  ('Facebook', 'user4', 'https://www.facebook.com/user4'),
  ('Twitter', 'user5', 'https://twitter.com/user5'),
  ('Instagram', 'user6', 'https://www.instagram.com/user6'),
 ('Facebook', 'john_doe', 'https://www.facebook.com/john_doe'),
  ('Twitter', 'jane_smith', 'https://twitter.com/jane_smith'),
  ('Instagram', 'robert_johnson', 'https://www.instagram.com/robert_johnson'),
  ('LinkedIn', 'susan_brown', 'https://www.linkedin.com/in/susan_brown'),
  ('Snapchat', 'michael_clark', 'https://www.snapchat.com/add/michael_clark'),
  ('Pinterest', 'emily_davis', 'https://www.pinterest.com/emily_davis');


-- Insert fake data into the "players" table (36 rows)
INSERT INTO players (firstname, lastname, jersey_number, team_id, phone_number, image_path, social, can_referee, captain)
VALUES
  ('John', 'Smith', 5, 1, '555-1234', '/images/john.jpg', 1, true, false),
  ('Alice', 'Johnson', 8, 2, '555-5678', '/images/alice.jpg', 2, false, true),
  ('Michael', 'Brown', 10, 3, '555-9012', '/images/michael.jpg', 1, true, false),
  ('Emily', 'Davis', 15, 1, '555-3456', '/images/emily.jpg', 2, false, false),
  ('Robert', 'Lee', 7, 2, '555-7890', '/images/robert.jpg', 1, true, false),
  ('Sophia', 'Anderson', 12, 3, '555-2345', '/images/sophia.jpg', 2, false, true),
  ('William', 'Jones', 6, 1, '555-1111', '/images/william.jpg', 1, false, false),
  ('Olivia', 'Martinez', 7, 2, '555-2222', '/images/olivia.jpg', 2, true, false),
  ('Benjamin', 'Hernandez', 8, 3, '555-3333', '/images/benjamin.jpg', NULL, false, false),
  ('Emma', 'Smith', 9, 4, '555-4444', '/images/emma.jpg', 3, false, false),
  ('Alexander', 'Brown', 10, 5, '555-5555', '/images/alexander.jpg', NULL, true, true),
  ('Ava', 'Davis', 11, 6, '555-6666', '/images/ava.jpg', 4, false, false),
  ('James', 'Miller', 12, 7, '555-7777', '/images/james.jpg', NULL, false, false),
  ('Sophia', 'Johnson', 13, 8, '555-8888', '/images/sophia.jpg', 5, false, false),
  ('Michael', 'Garcia', 14, 9, '555-9999', '/images/michael.jpg', NULL, true, false),
  ('Mia', 'Smith', 15, 10, '555-1010', '/images/mia.jpg', 6, false, false),
  ('Elijah', 'Anderson', 16, 11, '555-2020', '/images/elijah.jpg', NULL, false, false),
  ('Olivia', 'Taylor', 17, 12, '555-3030', '/images/olivia2.jpg', 7, false, false),
  ('Lucas', 'Wilson', 18, 13, '555-4040', '/images/lucas.jpg', NULL, true, true),
  ('Chloe', 'Lee', 19, 14, '555-5050', '/images/chloe.jpg', 8, false, false),
  ('William', 'Brown', 20, 15, '555-6060', '/images/william2.jpg', NULL, false, false),
  ('Evelyn', 'Davis', 21, 16, '555-7070', '/images/evelyn.jpg', 9, false, false),
  ('Benjamin', 'Hernandez', 22, 17, '555-8080', '/images/benjamin2.jpg', NULL, true, false),
  ('Ava', 'Johnson', 23, 18, '555-9090', '/images/ava2.jpg', 10, false, false),
  ('Lucas', 'Harris', 24, 1, '555-1234', '/images/lucas2.jpg', NULL, false, false),
  ('Olivia', 'Smith', 25, 2, '555-5678', '/images/olivia3.jpg', 11, false, false),
  ('Elijah', 'Anderson', 26, 3, '555-9012', '/images/elijah2.jpg', NULL, true, true),
  ('Sophia', 'Martinez', 27, 4, '555-3456', '/images/sophia2.jpg', 12, false, false),
  ('William', 'Smith', 28, 5, '555-7890', '/images/william3.jpg', NULL, false, false),
  ('Ava', 'Davis', 29, 6, '555-2345', '/images/ava3.jpg', NULL, true, false),
  ('Benjamin', 'Wilson', 30, 7, '555-6789', '/images/benjamin3.jpg', NULL, false, false),
  ('Olivia', 'Anderson', 31, 8, '555-4321', '/images/olivia4.jpg', NULL, false, false),
  ('Lucas', 'Johnson', 32, 9, '555-8765', '/images/lucas3.jpg', NULL, true, true),
  ('Sophia', 'Brown', 33, 10, '555-2109', '/images/sophia3.jpg', NULL, false, false),
  ('Chloe', 'Garcia', 34, 11, '555-6543', '/images/chloe2.jpg', NULL, false, false),
  ('William', 'Taylor', 35, 12, '555-1230', '/images/william4.jpg', NULL, false, false);

-- Insert fake data into statistics table (100 rows)
INSERT INTO statistics (is_official, game_id, player_id, user_id, kills, outs, catches)
SELECT
    TRUE,
    floor(random() * 33) + 1,  -- Random game_id between 1 and 33 (to match game_id test data)
    floor(random() * 36) + 1,  -- Random player_id between 1 and 36 (to match player_id test data)
    floor(random() * 9) + 1,  -- Random user_id between 1 and 9 (to match user_id test data)
    0,  -- Set kills to 0
    0,  -- Set outs to 0
    0  -- Set catches to 0
FROM generate_series(1, 100);  -- create 100 rows