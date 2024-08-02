import React, { useCallback } from "react";

function MatchInput({
  homeTeam,
  awayTeam,
  setHomeTeam,
  setAwayTeam,
  handleStartMatch,
  error,
}) {
  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleStartMatch();
      }
    },
    [handleStartMatch]
  );

  const handleInputChange = useCallback(
    (setter) => (e) => {
      setter(e.target.value);
    },
    []
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Home Team"
        value={homeTeam}
        onChange={handleInputChange(setHomeTeam)}
        onKeyDown={handleKeyPress}
      />
      <input
        type="text"
        placeholder="Away Team"
        value={awayTeam}
        onChange={handleInputChange(setAwayTeam)}
        onKeyDown={handleKeyPress}
      />
      <button onClick={handleStartMatch}>Start Match</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default MatchInput;
