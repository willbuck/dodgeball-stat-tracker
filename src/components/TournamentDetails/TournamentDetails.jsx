import { useEffect } from "react";
import  {useDispatch, useSelector} from "react-redux"

// This component is for the Tournament details page
//  It talks to the database to get all the games 
// in a sppeific tournment 
function TournamentDetails() {

    const dispatch  = useDispatch();
    const tournamentDetail = useSelector((store) => store.tournamentDetailsReducer);

    useEffect(()  => {
        dispatch({type:'GET_TOURNAMENT_DETAILS'})
    }, []);

    console.log('The storreee:', tournamentDetail);

  return (
    <>
      <h1>BROOOOO</h1>
      <h3>{tournamentDetail.map((details) => {
        return(
            <>
            <h3> 
                {details.start_time}
                {details.ball_type}
            </h3>
            </>
        )
      })}</h3>
    </>
  );
}
export default TournamentDetails;
