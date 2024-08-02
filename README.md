# Live Football Scoreboard

This project implements a simple library for managing a live football scoreboard. It allows users to start matches, update scores, finish matches, and get a summary of ongoing matches, all sorted by specific criteria.

## Project Structure

## Setup Instructions

To get started with the project, you'll need to have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed. Then, follow these steps:

1. Clone the repository:

   ```
   git clone git@github.com:szumi112/MatchScoreboard.git
   ```

   ```
   cd live-football-scoreboard
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:

   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

- **Start a Match**: Enter the names of the home and away teams in the input fields and click \"Start Match\".

- **Update Score**: Modify the scores of ongoing matches directly in the match summary list.

- **Finish Match**: Click \"Finish Match\" to remove a match from the scoreboard.

- **Get Summary**: The match summary is automatically sorted by total score, and for matches with the same score, by the most recently started.

## Assumptions and Notes

- **In-Memory Storage**: The scoreboard is stored in memory using React state management, which means all data is lost upon refreshing the page.

- **Sorting Logic**: Matches are sorted first by total score and then by the time they were added to the scoreboard, ensuring the most recent matches appear first in case of ties.

- **Validation**: Basic validation is implemented to ensure team names are unique and not identical for a single match.

- **No Persistent Storage**: As per the exercise requirements, the library does not include any form of persistent storage or backend API.

- **TypeScript Usage**: The project uses TypeScript for type safety and better code maintenance.

## Testing

This project is set up with basic testing configurations using [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/). To run tests, use:

```
npm test
```

## Future Improvements

- **Persistent Storage**: Integrate a backend service for persistent data storage.

- **Enhanced Validation**: Add more comprehensive validation and error handling for user inputs.

- **User Interface**: Improve the UI/UX with better styling and user interactions.

## License

This project is open-source and available under the [MIT License](LICENSE).

## Contact

For any questions or feedback, please contact Mateusz Szumiło at mattszumilo@gmail.com.
