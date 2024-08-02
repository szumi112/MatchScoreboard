import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./components/App";

describe("Live Football Scoreboard", () => {
  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  test("starts a new match and displays it with 0-0 score", () => {
    render(<App />);

    const homeTeamInput = screen.getByPlaceholderText("Home Team");
    const awayTeamInput = screen.getByPlaceholderText("Away Team");
    const startMatchButton = screen.getByText("Start Match");

    fireEvent.change(homeTeamInput, { target: { value: "Team A" } });
    fireEvent.change(awayTeamInput, { target: { value: "Team B" } });
    fireEvent.click(startMatchButton);

    expect(screen.getByText("Team A 0 - 0 Team B")).toBeInTheDocument();
  });

  test("updates the score of an existing match", () => {
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText("Home Team"), {
      target: { value: "Team C" },
    });
    fireEvent.change(screen.getByPlaceholderText("Away Team"), {
      target: { value: "Team D" },
    });
    fireEvent.click(screen.getByText("Start Match"));

    const homeScoreInput = screen.getAllByPlaceholderText("Home Score")[0];
    const awayScoreInput = screen.getAllByPlaceholderText("Away Score")[0];

    fireEvent.change(homeScoreInput, { target: { value: "2" } });
    fireEvent.change(awayScoreInput, { target: { value: "3" } });

    expect(screen.getByText("Team C 2 - 3 Team D")).toBeInTheDocument();
  });

  test("finishes an ongoing match and removes it from the summary", () => {
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText("Home Team"), {
      target: { value: "Team E" },
    });
    fireEvent.change(screen.getByPlaceholderText("Away Team"), {
      target: { value: "Team F" },
    });
    fireEvent.click(screen.getByText("Start Match"));

    const finishButton = screen.getAllByText("Finish Match")[0];
    fireEvent.click(finishButton);

    expect(screen.queryByText("Team E 0 - 0 Team F")).not.toBeInTheDocument();
  });

  test("prevents starting a match with duplicate team names", () => {
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText("Home Team"), {
      target: { value: "Team G" },
    });
    fireEvent.change(screen.getByPlaceholderText("Away Team"), {
      target: { value: "Team H" },
    });
    fireEvent.click(screen.getByText("Start Match"));

    fireEvent.change(screen.getByPlaceholderText("Home Team"), {
      target: { value: "Team G" },
    });
    fireEvent.change(screen.getByPlaceholderText("Away Team"), {
      target: { value: "Team I" },
    });
    fireEvent.click(screen.getByText("Start Match"));

    expect(screen.queryByText("Team G 0 - 0 Team I")).not.toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Home Team"), {
      target: { value: "Team I" },
    });
    fireEvent.change(screen.getByPlaceholderText("Away Team"), {
      target: { value: "Team H" },
    });
    fireEvent.click(screen.getByText("Start Match"));

    expect(screen.queryByText("Team I 0 - 0 Team H")).not.toBeInTheDocument();
  });
});
