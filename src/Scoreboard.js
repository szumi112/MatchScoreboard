export class Match {
  constructor(homeTeam, awayTeam, startTime = new Date()) {
    this.homeTeam = { name: homeTeam, score: 0 };
    this.awayTeam = { name: awayTeam, score: 0 };
    this.startTime = startTime;
  }

  updateScore(homeScore, awayScore) {
    this.homeTeam.score = homeScore;
    this.awayTeam.score = awayScore;
  }
}

export class Scoreboard {
  constructor() {
    this.matches = [];
  }

  startMatch(homeTeam, awayTeam, startTime = new Date()) {
    const match = new Match(homeTeam, awayTeam, startTime);
    this.matches.push(match);
  }

  updateScore(homeTeam, awayTeam, homeScore, awayScore) {
    const match = this.matches.find(
      (m) => m.homeTeam.name === homeTeam && m.awayTeam.name === awayTeam
    );
    if (match) {
      match.updateScore(homeScore, awayScore);
    }
  }

  finishMatch(homeTeam, awayTeam) {
    this.matches = this.matches.filter(
      (match) =>
        !(match.homeTeam.name === homeTeam && match.awayTeam.name === awayTeam)
    );
  }

  getSummary() {
    return this.matches
      .slice()
      .sort((a, b) => {
        const totalScoreA = a.homeTeam.score + a.awayTeam.score;
        const totalScoreB = b.homeTeam.score + b.awayTeam.score;
        if (totalScoreA === totalScoreB) {
          return b.startTime - a.startTime; // most recent first
        }
        return totalScoreB - totalScoreA; // highest score first
      })
      .map((match) => ({
        home: match.homeTeam,
        away: match.awayTeam,
      }));
  }
}
