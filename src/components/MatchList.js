import React, { useMemo } from "react";
import MatchItem from "./MatchItem";

function MatchList({ summary, updateScore, finishMatch }) {
  const matchList = useMemo(
    () =>
      summary.map((match, index) => (
        <MatchItem
          key={index}
          match={match}
          updateScore={updateScore}
          finishMatch={finishMatch}
        />
      )),
    [summary, updateScore, finishMatch]
  );

  return (
    <div>
      {summary.length > 0 && <h2>Match Summary</h2>}
      <ul>{matchList}</ul>
    </div>
  );
}

export default MatchList;
