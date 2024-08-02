import React, { useState, useCallback } from "react";
import { Scoreboard } from "../Scoreboard";
import MatchInput from "./MatchInput";
import MatchList from "./MatchList";
import { useScoreboard } from "../hooks/MatchLogic";

function App() {
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");

  const { summary, error, startMatch, updateScore, finishMatch } =
    useScoreboard(new Scoreboard());

  const handleStartMatch = useCallback(() => {
    startMatch(homeTeam, awayTeam);
    setHomeTeam("");
    setAwayTeam("");
  }, [homeTeam, awayTeam, startMatch]);

  return (
    <div className="App">
      <h1>Live Football Scoreboard</h1>
      <MatchInput
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        setHomeTeam={setHomeTeam}
        setAwayTeam={setAwayTeam}
        handleStartMatch={handleStartMatch}
        error={error}
      />
      <MatchList
        summary={summary}
        updateScore={updateScore}
        finishMatch={finishMatch}
      />
      <footer>
        <h5>Provided by:</h5>
        <h3>SPORTRADAR</h3>
      </footer>
    </div>
  );
}

export default App;
