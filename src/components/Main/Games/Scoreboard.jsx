// MUI Imports
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

// Style Tools
import { styled } from '@mui/system';


export default function Scoreboard(props) {
    // Deconstruct props
    const { handleScore, teams, teamOneScore, teamTwoScore, } = props

    // Component style
    const ComponentTheme = styled(Grid)(({ theme }) => ({
        '.scroll-container': {
            backgroundColor: 'primary.dark',
            '&:hover': {
                backgroundColor: 'primary.main',
                opacity: [0.9, 0.8, 0.7],
            },
        },
        display: "flex",
        '.container': {
            marginLeft: "10px",
        },
        '.game-detail .container': {
            display: "flex",
            justifyContent: "center",
        },
        '.scoreboard .container': {
            color: "text.primary",
            fontSize: "24px"
        },
        '.team-one .score .container': {
            
        },
        'team-two .score .container': {

        },
        '.team-one .team-name': {
            paddingLeft: "10px",
        },
        '.team-two .team-name': {
            alignSelf: "end",
            
        },
        ".team-one .team-score": {
            display: "flex",
            alignSelf: "center",
            justifyContent: "flex-end"
            
        },
        ".team-two .team-score": {
            display: "flex",
            alignSelf: "center",
            
        },
        ".team-one .score-button": {
            color: '#186BCC'
        },
        ".team-two .score-button": {
            justifyContent: "flex-end",
        },
        ".dash": {
            display: "flex",
            color: "text.primary", 
            fontSize: "24px",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "-35px",
            width: "20px"
        }
    }));

    return (
        <ComponentTheme
            className="scoreboard container"
            container
            item xs={12} component={Card} >

            {/* TEAM ONE SCORE */}
            <Grid
                className="team-one score container"
                container
                item xs={5} >

                <Grid
                    className="team-one team-name"
                    item
                    xs={8}
                    component={CardContent}>
                    {teams.teamOne.name}
                </Grid>

                <Grid className="team-one team-score"
                    item xs={4}
                    component={CardContent}>
                    {teamOneScore}
                </Grid>

                <Grid
                    item xs={6}
                    component={CardActions} >
                    <IconButton className="team-one score-button decrease"
                        onClick={() => handleScore("one", "minus")}>
                        <RemoveCircleIcon />
                    </IconButton>
                </Grid>

                <Grid item xs={6} component={CardActions}>
                    <IconButton className="team-one score-button increase"
                        onClick={() => handleScore("one", "plus")}>
                        <AddCircleIcon />
                    </IconButton>
                </Grid>
            </Grid>

            {/* DASH */}
            <Grid className="dash container" item xs={2} component={Typography}>
                -
            </Grid>

            {/* TEAM TWO SCORE */}
            <Grid container item xs={5} className="team-two score container">
                <Grid item xs={4} component={CardContent} className="team-two team-score" >
                    {teamTwoScore}
                </Grid>
                <Grid item xs={8} component={CardContent} className="team-two team-name" >
                    {teams.teamTwo.name}
                </Grid>

                <Grid item xs={6} component={CardActions} className="team-two score-button decrease">
                    <IconButton sx={{ color: '#186BCC' }} onClick={() => handleScore("two", "minus")}>
                        <RemoveCircleIcon />
                    </IconButton>
                </Grid>

                <Grid item xs={6} component={CardActions} className="team-two score-button increase">
                    <IconButton sx={{ color: '#186BCC' }} onClick={() => handleScore("two", "plus")}>
                        <AddCircleIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </ComponentTheme>

    )
}