import { Scoreboard } from "./Scoreboard";

describe("Scoreboard", () => {
  let scoreboard;

  beforeEach(() => {
    scoreboard = new Scoreboard();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  test("starts a new match with initial score 0-0", () => {
    scoreboard.startMatch("Mexico", "Canada");
    const summary = scoreboard.getSummary();
    expect(summary).toContainEqual({
      home: { name: "Mexico", score: 0 },
      away: { name: "Canada", score: 0 },
    });
  });

  test("updates the score of an ongoing match", () => {
    scoreboard.startMatch("Mexico", "Canada");
    scoreboard.updateScore("Mexico", "Canada", 0, 5);
    const summary = scoreboard.getSummary();
    expect(summary).toContainEqual({
      home: { name: "Mexico", score: 0 },
      away: { name: "Canada", score: 5 },
    });
  });

  test("finishes an ongoing match", () => {
    scoreboard.startMatch("Mexico", "Canada");
    scoreboard.finishMatch("Mexico", "Canada");
    const summary = scoreboard.getSummary();
    expect(summary).not.toContainEqual({
      home: { name: "Mexico", score: 0 },
      away: { name: "Canada", score: 0 },
    });
  });

  test("returns a summary of matches in progress ordered by total score", () => {
    const baseTime = new Date().getTime();

    scoreboard.startMatch("Mexico", "Canada", new Date(baseTime - 20000));
    scoreboard.updateScore("Mexico", "Canada", 0, 5);

    scoreboard.startMatch("Spain", "Brazil", new Date(baseTime - 15000));
    scoreboard.updateScore("Spain", "Brazil", 10, 2);

    scoreboard.startMatch("Germany", "France", new Date(baseTime - 10000));
    scoreboard.updateScore("Germany", "France", 2, 2);

    scoreboard.startMatch("Argentina", "Australia", new Date(baseTime - 5000));
    scoreboard.updateScore("Argentina", "Australia", 3, 1);

    scoreboard.startMatch("Uruguay", "Italy", new Date(baseTime));
    scoreboard.updateScore("Uruguay", "Italy", 6, 6);

    const summary = scoreboard.getSummary();
    expect(summary).toEqual([
      {
        home: { name: "Uruguay", score: 6 },
        away: { name: "Italy", score: 6 },
      },
      {
        home: { name: "Spain", score: 10 },
        away: { name: "Brazil", score: 2 },
      },
      {
        home: { name: "Mexico", score: 0 },
        away: { name: "Canada", score: 5 },
      },
      {
        home: { name: "Argentina", score: 3 },
        away: { name: "Australia", score: 1 },
      },
      {
        home: { name: "Germany", score: 2 },
        away: { name: "France", score: 2 },
      },
    ]);
  });
});
