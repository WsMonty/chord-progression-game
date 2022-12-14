import React from 'react';
import { useSelector } from 'react-redux';
import { selectHighscore } from '../store';

const Highscore = () => {
  const highscore = useSelector(selectHighscore);
  const gamesWon = highscore.numberWon;
  const gamesLost = highscore.lost;
  const gamesWonWithHint = highscore.wonWithHint;
  const guesses = highscore.guesses;

  return (
    <div className="highscore">
      <h1 className="highscore_title">Highscore</h1>
      <div className="highscore_upperSection">
        <h3 className="highscore_stat">
          Played <span>{gamesWon + gamesLost}</span>
        </h3>
        <h3 className="highscore_stat">
          Won <span>{gamesWon}</span>
        </h3>
        <h3 className="highscore_stat">
          Lost <span>{gamesLost}</span>
        </h3>
        <h3 className="highscore_stat">
          Won with Hint <span>{gamesWonWithHint}</span>
        </h3>
      </div>
      <h3>Guess Distribution:</h3>
      <ul className="highscore_guesses_list">
        {Object.keys(guesses).map((guess, i) => {
          return (
            <li key={`guess-${guess}`}>
              <h3>
                {guess}. Guess: {guesses[i + 1]}
              </h3>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Highscore;
