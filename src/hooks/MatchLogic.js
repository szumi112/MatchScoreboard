import { useState, useCallback } from "react";

export function useScoreboard(initialScoreboard) {
  const [scoreboard] = useState(initialScoreboard);
  const [summary, setSummary] = useState([]);
  const [error, setError] = useState("");

  const updateSummary = useCallback(() => {
    setSummary(scoreboard.getSummary());
  }, [scoreboard]);

  const isDuplicateTeam = useCallback(
    (homeTeam, awayTeam) => {
      return summary.some(
        (match) =>
          match.home.name === homeTeam ||
          match.away.name === homeTeam ||
          match.home.name === awayTeam ||
          match.away.name === awayTeam
      );
    },
    [summary]
  );

  const startMatch = useCallback(
    (homeTeam, awayTeam) => {
      if (!homeTeam || !awayTeam) {
        setError("Both team names must be provided.");
        return;
      }

      if (homeTeam === awayTeam) {
        setError("Home and away teams cannot be the same.");
        return;
      }

      if (isDuplicateTeam(homeTeam, awayTeam)) {
        setError("One or both team names are already in use.");
        return;
      }

      scoreboard.startMatch(homeTeam, awayTeam);
      updateSummary();
      setError("");
    },
    [scoreboard, isDuplicateTeam, updateSummary]
  );

  const updateScore = useCallback(
    (homeTeam, awayTeam, homeScore, awayScore) => {
      scoreboard.updateScore(homeTeam, awayTeam, homeScore, awayScore);
      updateSummary();
    },
    [scoreboard, updateSummary]
  );

  const finishMatch = useCallback(
    (homeTeam, awayTeam) => {
      scoreboard.finishMatch(homeTeam, awayTeam);
      updateSummary();
    },
    [scoreboard, updateSummary]
  );

  return {
    summary,
    error,
    startMatch,
    updateScore,
    finishMatch,
  };
}
