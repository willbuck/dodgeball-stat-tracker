import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import Box from '@mui/material/Box';
import { Button, Stack } from '@mui/material';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Select } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ManageTournamentsModal(tournamentId) {
    const dispatch = useDispatch()

    const allUsers = useSelector((store) => store.manageUsersReducer)
    const allTournaments = useSelector((store) => store.tournamentsReducer)

    const organizerCandidates = allUsers.filter(user => user.auth_level === 4 || user.auth_level === 5);
    // console.log('all users:', allUsers);

    useEffect(() => {
        dispatch({ type: "FETCH_USER_LIST" });
    }, []);


    // Modal Functions
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const tournamentSelected = allTournaments.find((tournament) => tournament.id === tournamentId.tournamentId);

    const defaultDate = dayjs(tournamentSelected.start_date);

    // Input Fields' States
    const [name, setName] = useState(tournamentSelected.tournament_name);
    const [startDate, setStartDate] = useState(defaultDate);
    const [ballType, setBallType] = useState(tournamentSelected.ball_type);
    const [location, setLocation] = useState(tournamentSelected.location);
    const [courts, setCourts] = useState(tournamentSelected.courts);
    const [organizer, setOrganizer] = useState(tournamentSelected.tournament_organizer)
    const [description, setDescription] = useState(tournamentSelected.description)
    const id = tournamentSelected.id;
    

    const handleSubmit = (event) => {
        event.preventDefault()

        // Tournament info to send
        const tournamentEditData = {
            name,
            organizer,
            location,
            startDate,
            ballType,
            courts,
            description,
            id
        }

        

        // Dispatching info to Tournament saga
        dispatch({ type: 'EDIT_TOURNAMENT', payload: tournamentEditData })
        handleClose();
    }


    return (
        <div>
            <Button onClick={handleOpen}>Edit Details</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Stack>

                            {/* Name input*/}
                            <TextField
                                required
                                placeholder="Tournament Name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />

                            {/* Start Date input */}
                            <DatePicker
                                required
                                value={startDate}
                                placeholder={tournamentSelected.startDate}
                                onChange={(newDate) => setStartDate(newDate)}
                            />

                            {/* Location input */}
                            <TextField
                                required
                                placeholder="Location"
                                value={location}
                                onChange={(event) => setLocation(event.target.value)}
                            />

                            {/* Courts input */}
                            <TextField
                                required
                                placeholder="Courts"
                                type="number"
                                InputProps={{
                                    inputProps: { min: 2, max: 25 }
                                }}
                                value={courts}
                                onChange={(event) => setCourts(event.target.value)}
                            />

                            {/* Organizer Identity input */}

                            {/* <InputLabel id="tournament-organizer-label">Tournament Organizer</InputLabel>
                            <Select
                                required
                                labelId="tournament-organizer"
                                label="tournament organizer"
                                value={organizer}
                                onChange={(event) => setOrganizer(event.target.value)}
                            >
                                {organizerCandidates.map((user) => (
                                    <MenuItem value={user.id}>{user.username}</MenuItem>
                                ))}

                            </Select> */}

                            {/* Description input */}
                            <TextField
                                placeholder="Description"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />

                            <Button type="submit">Submit</Button>

                        </Stack>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}