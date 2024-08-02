import React, { useCallback } from "react";

function MatchItem({ match, updateScore, finishMatch }) {
  const handleScoreChange = useCallback(
    (isHome) => (e) => {
      const score = parseInt(e.target.value, 10);
      if (!isNaN(score) && score >= 0) {
        updateScore(
          match.home.name,
          match.away.name,
          isHome ? score : match.home.score,
          isHome ? match.away.score : score
        );
      }
    },
    [match, updateScore]
  );

  return (
    <li>
      <h3>{`${match.home.name} ${match.home.score} - ${match.away.score} ${match.away.name}`}</h3>
      <div>
        <input
          type="number"
          placeholder="Home Score"
          value={match.home.score}
          onChange={handleScoreChange(true)}
          min="0"
        />
        <input
          type="number"
          placeholder="Away Score"
          value={match.away.score}
          onChange={handleScoreChange(false)}
          min="0"
        />
      </div>
      <button onClick={() => finishMatch(match.home.name, match.away.name)}>
        Finish Match
      </button>
    </li>
  );
}

export default MatchItem;
