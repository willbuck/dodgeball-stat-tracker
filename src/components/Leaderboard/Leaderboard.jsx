import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";

//this component is for the Leaderboard page
//the leaderboard page is all the statistics 
//for a given game 
function Leaderboard() {
    const dispatch = useDispatch();
    const leaderboardStore = useSelector((store) => store.leaderboardReducer);
    console.log('THE leaderboard store:', leaderboardStore)

    //as the page loads 
    //it will GET statistics from DB
    useEffect(() => {
        dispatch({
            type: 'GET_STATISTICS'
        })
    }, []);


  return (
    <>
      <h1>BROSIKI</h1>
    </>
  );
}

export default Leaderboard;
